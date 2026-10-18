// ============================================================
// 本地仓储层（Repository）—— V1 用 localStorage 持久化。
// 所有算法在 src/engine 中，组件只通过本层读写数据；
// 未来切换 PostgreSQL/Prisma 时，只需替换本文件实现，UI 与引擎不动。
// ============================================================

import {
  ALL_SAFE_SENTENCES,
  DIALOGUE_SCENES,
  EXAM_POINTS,
  GRAMMAR_TOPICS,
  MOCK_PAPERS,
  QUESTIONS_BY_ID,
  SEED_QUESTIONS,
  SEED_WORDS,
  canonicalGrammarTag,
} from '@/data';
import {
  INITIAL_MASTERY,
  REMEDIATION_STREAK_THRESHOLD,
} from '@/engine/config';
import { addDays, nowIso, todayStr, toDateStr } from '@/engine/date';
import { generatePlan } from '@/engine/daily-plan';
import { predictScore } from '@/engine/score-prediction';
import { clampMastery, averageMastery } from '@/engine/mastery';
import { defaultScheduler } from '@/engine/spaced-repetition';
import {
  createWrong,
  scheduleWrongAfterCorrect,
  scheduleWrongAfterError,
  scheduleWrongAfterWrong,
} from '@/engine/wrong-review';
import { updateMasteryAfterAnswer, updateMasteryAfterWordGrade } from '@/engine/mastery';
import { predictErrorType } from '@/engine/error-predict';
import { stageOf } from '@/engine/stage';
import type {
  Attempt,
  DailyPlan,
  DayLog,
  Difficulty,
  EssaySubmission,
  MockResult,
  Question,
  Settings,
  Word,
  WordGrade,
  WordProgress,
  WrongQuestion,
} from '@/types';

const STORAGE_KEY = 'chengkao-english-v1';
const STORE_VERSION = 1;

export interface PersistState {
  version: number;
  settings: Settings;
  wordProgress: Record<string, WordProgress>;
  /** key: `${ownerKind}:${id}`，如 grammar:G01 / reading_skill:R01 */
  masteryMap: Record<string, number>;
  attempts: Attempt[];
  wrongs: WrongQuestion[];
  dayLogs: Record<string, DayLog>;
  essays: EssaySubmission[];
  mocks: MockResult[];
  customWords: Word[];
  customQuestions: Question[];
  /** 当日已完成的 plan item key */
  donePlanKeys: Record<string, string[]>;
}

function defaultSettings(): Settings {
  return {
    // 占位日期（非官方考试日期），用户需在“我的-设置”中改成真实考试日期
    examDate: addDays(todayStr(), 60),
    dailyMinutes: 60,
    targetScore: 90,
    ai: { baseUrl: '', apiKey: '', model: '' },
  };
}

function defaultState(): PersistState {
  return {
    version: STORE_VERSION,
    settings: defaultSettings(),
    wordProgress: {},
    masteryMap: {},
    attempts: [],
    wrongs: [],
    dayLogs: {},
    essays: [],
    mocks: [],
    customWords: [],
    customQuestions: [],
    donePlanKeys: {},
  };
}

function load(): PersistState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw) as PersistState;
    return { ...defaultState(), ...parsed, settings: { ...defaultSettings(), ...parsed.settings, ai: { ...defaultSettings().ai, ...parsed.settings?.ai } } };
  } catch {
    return defaultState();
  }
}

// ---------------- 简单发布订阅 + useSyncExternalStore ----------------

let state: PersistState = load();
const listeners = new Set<() => void>();

/** 存储健康状态：配额超限/隐私模式写入失败时 degraded=true，供设置页提示用户导出 */
let storageDegraded = false;
/** 本次会话因配额压力裁剪掉的旧记录条数（仅用于提示） */
let storagePruned = 0;

function isQuotaError(e: unknown): boolean {
  if (!e || typeof e !== 'object') return false;
  const err = e as { name?: string; code?: number };
  return err.name === 'QuotaExceededError' || err.name === 'NS_ERROR_DOM_QUOTA_REACHED' || err.code === 22 || err.code === 1014;
}

function daysAgoDate(days: number): string {
  return new Date(Date.now() - days * 86_400_000).toISOString().slice(0, 10);
}

/**
 * 裁剪冷数据以腾出 localStorage 空间。
 * 安全边界：只删不影响当前学习闭环的旧数据——
 *  - 计划/趋势只看近 7 天，预测分为聚合正确率，故 365 天前的答题记录可删；
 *  - 已 resolved 的错题不再参与复习状态机，90 天后可删；
 *  - 自定义词/题（用户内容）与设置永不裁剪。
 */
function pruneState(s: PersistState, aggressive: boolean): number {
  const attemptCutoff = new Date(daysAgoDate(aggressive ? 120 : 365)).toISOString();
  const wrongCutoff = daysAgoDate(aggressive ? 30 : 90);
  const dayCutoff = daysAgoDate(aggressive ? 150 : 400);

  const before = s.attempts.length;
  s.attempts = s.attempts.filter((a) => a.at >= attemptCutoff);
  s.wrongs = s.wrongs.filter((w) => !(w.resolved && w.lastAt.slice(0, 10) < wrongCutoff));
  for (const k of Object.keys(s.dayLogs)) {
    if (k < dayCutoff) delete s.dayLogs[k];
  }
  if (aggressive) s.essays = s.essays.slice(0, 100); // addEssay 为 unshift，保留最新 100 篇
  return before - s.attempts.length;
}

function writeStorage(s: PersistState): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    return true;
  } catch (e) {
    if (!isQuotaError(e)) console.error('持久化失败', e);
    return false;
  }
}

function persist() {
  if (writeStorage(state)) {
    storageDegraded = false;
  } else {
    // 写入失败（大概率为配额超限）：裁剪冷数据后重试，再失败则更激进裁剪
    storagePruned += Math.max(0, pruneState(state, false));
    if (!writeStorage(state)) {
      storagePruned += Math.max(0, pruneState(state, true));
      storageDegraded = !writeStorage(state);
    } else {
      storageDegraded = false;
    }
    if (storageDegraded) console.error('持久化失败：本地存储不可用或空间不足，请在设置中导出备份后清理数据');
  }
  listeners.forEach((l) => l());
}

export interface StorageHealth {
  /** 是否无法可靠写入（配额超限 / 隐私模式 / 浏览器禁用存储） */
  degraded: boolean;
  /** 当前持久化占用，单位 KB（0 表示尚未写入） */
  approxKb: number;
  /** 本次会话因空间压力裁剪的旧记录条数 */
  pruned: number;
}

export function getStorageHealth(): StorageHealth {
  let approxKb = 0;
  try {
    approxKb = Math.round((localStorage.getItem(STORAGE_KEY)?.length ?? 0) / 1024);
  } catch {
    // ignore
  }
  return { degraded: storageDegraded, approxKb, pruned: storagePruned };
}

function setState(mut: (draft: PersistState) => void) {
  const next: PersistState = structuredClone(state);
  mut(next);
  state = next;
  persist();
}

export const store = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getState: () => state,
};

// ---------------- 内容（内置 + 导入合并） ----------------

export function allWords(): Word[] {
  const seen = new Set<string>();
  const out: Word[] = [];
  for (const w of [...state.customWords, ...SEED_WORDS]) {
    if (!seen.has(w.id)) {
      seen.add(w.id);
      out.push(w);
    }
  }
  return out;
}

export function allQuestions(): Question[] {
  const seen = new Set<string>();
  const out: Question[] = [];
  for (const q of [...state.customQuestions, ...SEED_QUESTIONS]) {
    if (!seen.has(q.id)) {
      seen.add(q.id);
      out.push(q);
    }
  }
  return out;
}

export function questionsById(): Map<string, Question> {
  return new Map(allQuestions().map((q) => [q.id, q]));
}

// ---------------- Mastery ----------------

export function masteryKey(kind: string, id: string) {
  return `${kind}:${id}`;
}

export function getMastery(kind: string, id: string): number {
  return state.masteryMap[masteryKey(kind, id)] ?? INITIAL_MASTERY;
}

function bumpMastery(draft: PersistState, kind: string, id: string, difficulty: Difficulty, correct: boolean) {
  const key = masteryKey(kind, id);
  const cur = draft.masteryMap[key] ?? INITIAL_MASTERY;
  draft.masteryMap[key] = updateMasteryAfterAnswer(cur, difficulty, correct);
}

/** 一道题关联的全部掌握度主体 */
export function ownerKeysForQuestion(q: Question): { kind: string; id: string }[] {
  const owners: { kind: string; id: string }[] = [{ kind: 'question_type', id: q.section }];
  if (q.section === 'Cloze') {
    for (const tag of q.skillTags.filter((t) => /^C\d{2}$/.test(t))) owners.push({ kind: 'cloze_skill', id: tag });
    for (const t of q.knowledgeTags.filter((t) => t.startsWith('cloze.'))) owners.push({ kind: 'cloze_skill', id: t.split('.')[1]! });
  }
  if (q.section === 'Reading') {
    for (const tag of q.knowledgeTags.filter((t) => /reading\.R\d{2}/.test(t))) owners.push({ kind: 'reading_skill', id: tag.split('.')[1]! });
  }
  if (q.section === 'Dialogue') {
    for (const tag of q.knowledgeTags.filter((t) => t.startsWith('dialogue.'))) owners.push({ kind: 'dialogue_scene', id: tag.split('.')[1]! });
  }
  if (q.section === 'Grammar' || q.knowledgeTags.some((t) => t.startsWith('grammar.'))) {
    for (const rawTag of q.knowledgeTags.filter((t) => t.startsWith('grammar.'))) {
      const tag = canonicalGrammarTag(rawTag);
      const topic = GRAMMAR_TOPICS.find((g) => tag === g.knowledgeId || tag.startsWith(g.knowledgeId + '.'));
      if (topic) owners.push({ kind: 'grammar', id: topic.id });
    }
  }
  if (q.section === 'Vocabulary' || q.knowledgeTags.some((t) => t.startsWith('vocabulary.'))) {
    owners.push({ kind: 'question_type', id: 'Vocabulary' });
    const ep = EXAM_POINTS.find((e) =>
      q.knowledgeTags.some((t) => t.includes('collocation') && e.relatedGrammar.includes('G12')),
    );
    if (ep) owners.push({ kind: 'exam_point', id: ep.id });
  }
  // 去重
  const seen = new Set<string>();
  return owners.filter((o) => {
    const k = `${o.kind}:${o.id}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

// ---------------- 答题闭环 ----------------

export interface RecordResult {
  attempt: Attempt;
  wrong: WrongQuestion | null;
  predictedType: ReturnType<typeof predictErrorType>;
}

export function recordAttempt(
  question: Question,
  selected: string,
  durationSec: number,
  mode: Attempt['mode'],
): RecordResult {
  const correct = selected === question.answer;
  const predictedType = predictErrorType(question);
  const attempt: Attempt = {
    id: `a.${Date.now()}.${Math.random().toString(36).slice(2, 8)}`,
    questionId: question.id,
    at: nowIso(),
    selected,
    correct,
    durationSec,
    mode,
    predictedErrorType: correct ? null : predictedType,
    userErrorType: null,
  };

  let wrongResult: WrongQuestion | null = null;

  setState((draft) => {
    draft.attempts.push(attempt);
    // 掌握度更新
    for (const owner of ownerKeysForQuestion(question)) {
      bumpMastery(draft, owner.kind, owner.id, question.difficulty, correct);
    }
    // 错题本
    if (!correct) {
      const existing = [...draft.wrongs].reverse().find((w) => w.questionId === question.id);
      if (existing) {
        const idx = draft.wrongs.findIndex((w) => w.id === existing.id);
        draft.wrongs[idx] = scheduleWrongAfterError(existing, nowIso());
        draft.wrongs[idx]!.predictedErrorType = predictedType;
        wrongResult = draft.wrongs[idx]!;
      } else {
        const created = createWrong(question.id, predictedType, nowIso());
        draft.wrongs.push(created);
        wrongResult = created;
      }
    }
    // 当日学习日志（每题按 0.75 分钟估时，真实计时更准）
    const d = draft.dayLogs[todayStr()] ?? emptyDay();
    d.answered += 1;
    if (correct) d.correct += 1;
    d.minutes += Math.max(0.25, Math.round((durationSec / 60) * 4) / 4);
    draft.dayLogs[todayStr()] = d;
  });

  return { attempt, wrong: wrongResult, predictedType };
}

/** 错题复习中答对/答错推进间隔 */
export function reviewWrong(wrong: WrongQuestion, correct: boolean, question: Question) {
  setState((draft) => {
    const idx = draft.wrongs.findIndex((w) => w.id === wrong.id);
    if (idx < 0) return;
    draft.wrongs[idx] = correct
      ? scheduleWrongAfterCorrect(draft.wrongs[idx]!)
      : scheduleWrongAfterWrong(draft.wrongs[idx]!);
    for (const owner of ownerKeysForQuestion(question)) {
      bumpMastery(draft, owner.kind, owner.id, question.difficulty, correct);
    }
  });
}

export function setUserErrorType(wrongId: string, errorType: Attempt['userErrorType']) {
  setState((draft) => {
    const w = draft.wrongs.find((x) => x.id === wrongId);
    if (w) w.userErrorType = errorType;
  });
}

// ---------------- 单词闪卡 ----------------

export function gradeWord(word: Word, grade: WordGrade) {
  setState((draft) => {
    const prev = draft.wordProgress[word.id] ?? null;
    const scheduled = defaultScheduler.schedule(prev, grade);
    const cur = prev?.mastery ?? INITIAL_MASTERY;
    const progress: WordProgress = {
      wordId: word.id,
      status: scheduled.status,
      mastery: updateMasteryAfterWordGrade(cur, grade),
      intervalDays: scheduled.intervalDays,
      due: scheduled.due,
      lastReviewAt: nowIso(),
      reps: scheduled.reps,
      lapses: scheduled.lapses,
    };
    draft.wordProgress[word.id] = progress;
    const d = draft.dayLogs[todayStr()] ?? emptyDay();
    if (prev) d.wordsReviewed += 1;
    else d.wordsLearned += 1;
    draft.dayLogs[todayStr()] = d;
  });
}

export function getWordProgress(wordId: string): WordProgress | null {
  return state.wordProgress[wordId] ?? null;
}

// ---------------- 学习时间 ----------------

export function addStudyMinutes(minutes: number) {
  setState((draft) => {
    const d = draft.dayLogs[todayStr()] ?? emptyDay();
    d.minutes += minutes;
    draft.dayLogs[todayStr()] = d;
  });
}

// ---------------- 计划完成标记 ----------------

export function markPlanDone(date: string, itemKey: string) {
  setState((draft) => {
    const set = new Set(draft.donePlanKeys[date] ?? []);
    set.add(itemKey);
    draft.donePlanKeys[date] = [...set];
  });
}

export function unmarkPlanDone(date: string, itemKey: string) {
  setState((draft) => {
    draft.donePlanKeys[date] = (draft.donePlanKeys[date] ?? []).filter((k) => k !== itemKey);
  });
}

// ---------------- 作文 / 模考 / 设置 ----------------

export function addEssay(essay: EssaySubmission) {
  setState((draft) => void draft.essays.unshift(essay));
}

export function saveMock(result: MockResult) {
  setState((draft) => void draft.mocks.push(result));
}

export function updateSettings(patch: Partial<Settings>) {
  setState((draft) => {
    draft.settings = { ...draft.settings, ...patch, ai: { ...draft.settings.ai, ...patch.ai } };
  });
}

// ---------------- 导入 / 导出 / 重置 ----------------

export function importWords(words: Word[], mode: 'merge' | 'replace' = 'merge') {
  setState((draft) => {
    if (mode === 'replace') draft.customWords = words;
    else {
      const map = new Map([...draft.customWords, ...words].map((w) => [w.id, w]));
      draft.customWords = [...map.values()];
    }
  });
}

export function importQuestions(questions: Question[], mode: 'merge' | 'replace' = 'merge') {
  setState((draft) => {
    if (mode === 'replace') draft.customQuestions = questions;
    else {
      const map = new Map([...draft.customQuestions, ...questions].map((q) => [q.id, q]));
      draft.customQuestions = [...map.values()];
    }
  });
}

export function exportData(): string {
  return JSON.stringify(state, null, 2);
}

export function restoreData(json: string) {
  const parsed = JSON.parse(json) as Partial<PersistState>;
  if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.attempts) || !parsed.settings) {
    throw new Error('备份文件结构不正确：缺少 settings 或 attempts');
  }
  state = { ...defaultState(), ...parsed, settings: { ...defaultSettings(), ...parsed.settings, ai: { ...defaultSettings().ai, ...parsed.settings.ai } } } as PersistState;
  persist();
}

export function resetAll() {
  state = defaultState();
  persist();
}

// ---------------- 派生：每日计划 / 预测分 / 统计 ----------------

function emptyDay(): DayLog {
  return { date: todayStr(), minutes: 0, wordsLearned: 0, wordsReviewed: 0, answered: 0, correct: 0 };
}

export function buildDailyPlan(): DailyPlan {
  const sevenDaysAgo = addDays(todayStr(), -7);
  const attempts = state.attempts.filter((a) => a.at.slice(0, 10) >= sevenDaysAgo);
  return generatePlan({
    settings: state.settings,
    stage: stageOf(state.settings),
    words: allWords(),
    progress: Object.values(state.wordProgress),
    grammarTopics: GRAMMAR_TOPICS.map((g) => ({ id: g.id, priority: g.priority })),
    examPoints: EXAM_POINTS.map((e) => ({ id: e.id, priority: e.priority, realExamCount: e.realExamCount })),
    questions: allQuestions(),
    wrongs: state.wrongs,
    attempts,
    writingSentences: ALL_SAFE_SENTENCES,
  });
}

export function getPrediction() {
  return predictScore({
    mocks: state.mocks,
    attempts: state.attempts,
    questionsById: questionsById(),
    writingScores: state.essays.map((e) => e.totalEstimate),
  });
}

export function getPaperQuestions(paperId: string) {
  const paper = MOCK_PAPERS.find((p) => p.id === paperId);
  if (!paper) return [];
  return paper.questionIds.map((id) => questionsById().get(id)).filter((q): q is Question => !!q);
}

/** 一张卷是否为"已核验真题卷"：以题目级 isRealExam 为准（paper 元数据不可靠时仍然正确） */
export function paperIsReal(paperId: string): boolean {
  const qs = getPaperQuestions(paperId);
  return qs.length > 0 && qs.every((q) => q.isRealExam);
}

export function masteryStats() {
  const words = Object.values(state.wordProgress);
  const wordRate = words.length === 0 ? 0 : averageMastery(words.map((w) => w.mastery));
  const grammarRate = averageMastery(GRAMMAR_TOPICS.map((g) => getMastery('grammar', g.id)));
  const readingRate = averageMastery(
    ['R01', 'R02', 'R03', 'R04', 'R05', 'R06'].map((r) => getMastery('reading_skill', r)),
  );
  const clozeRate = averageMastery(
    Array.from({ length: 10 }, (_, i) => getMastery('cloze_skill', `C${String(i + 1).padStart(2, '0')}`)),
  );
  const dialogueRate = averageMastery(
    DIALOGUE_SCENES.map((d) => getMastery('dialogue_scene', d.id)),
  );
  const writing = state.essays[0]?.totalEstimate ?? null;
  return { wordRate, grammarRate, readingRate, clozeRate, dialogueRate, writing, learnedWords: words.length, totalWords: allWords().length };
}

export function clamp01(v: number) {
  return Math.max(0, Math.min(100, v));
}
export { toDateStr, QUESTIONS_BY_ID, REMEDIATION_STREAK_THRESHOLD, clampMastery };
