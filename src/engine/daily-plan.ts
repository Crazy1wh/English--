// ============================================================
// Daily Plan 生成器（文档第十五~十七章）
// PriorityScore = .30 Exam + .25 Weakness + .20 Forgetting
//               + .15 RealExamFrequency(无数据取中性) + .10 RecentErrors
// 计划随学习阶段、可学时间、掌握度、错题与记忆状态动态变化。
// ============================================================

import {
  BASE_60_MINUTES,
  NEUTRAL_FREQUENCY,
  PACE,
  PRIORITY_WEIGHTS,
  STAGE_RATIOS,
} from './config';
import { isDue, forgettingScore } from './forgetting';
import type {
  Attempt,
  DailyPlan,
  ExamPoint,
  GrammarTopic,
  PlanItem,
  Question,
  Settings,
  Word,
  WordProgress,
  WrongQuestion,
} from '@/types';
import { todayStr } from './date';
import type { StudyStage } from './stage';

export interface PlanInput {
  settings: Settings;
  stage: StudyStage;
  words: Word[];
  progress: WordProgress[];
  grammarTopics: Pick<GrammarTopic, 'id' | 'priority'>[];
  examPoints: Pick<ExamPoint, 'id' | 'priority' | 'realExamCount'>[];
  questions: Question[];
  wrongs: WrongQuestion[];
  attempts: Attempt[]; // 最近 7 天即可
  writingSentences: string[];
  date?: string;
}

const LEVEL_EXAM_WEIGHT: Record<Word['level'], number> = {
  L3: 95, // 四级核心：多义高频动词/搭配，直接影响做题
  L5: 88, // 高分易混：词汇辨析题常设陷阱
  L1: 85, // 基础辨析：初中已学但选择题高频的易混词
  L2: 80, // 四级基础：高频名/形/中频动词
  L4: 75, // 四级进阶：较正式、抽象，阅读识别为主
};

function clamp100(v: number) {
  return Math.max(0, Math.min(100, v));
}

function hashDate(seed: string, mod: number): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return h % mod;
}

/** 计算单个学习对象的综合优先级 */
export function priorityScore(p: {
  examWeight: number;
  mastery: number | null;
  forgetting: number;
  realExamFrequency: number | null;
  recentErrorRate: number; // 0-1
}): number {
  const weakness = p.mastery === null ? 50 : clamp100(100 - p.mastery);
  const freq = p.realExamFrequency === null ? NEUTRAL_FREQUENCY : clamp100(p.realExamFrequency);
  return (
    PRIORITY_WEIGHTS.examWeight * clamp100(p.examWeight) +
    PRIORITY_WEIGHTS.weakness * weakness +
    PRIORITY_WEIGHTS.forgetting * clamp100(p.forgetting) +
    PRIORITY_WEIGHTS.realExamFrequency * freq +
    PRIORITY_WEIGHTS.recentErrors * clamp100(p.recentErrorRate * 100)
  );
}

/** 按阶段比例把当日总时间切到 7 个活动 */
export function allocateMinutes(totalMin: number, stage: StudyStage): Record<keyof typeof BASE_60_MINUTES, number> {
  const ratio = STAGE_RATIOS[stage];
  const raw = {
    review_words: totalMin * (ratio.vocabReview + ratio.vocabNew * 0.25),
    new_words: totalMin * ratio.vocabNew * 0.75,
    grammar: totalMin * ratio.grammar,
    exam_point: totalMin * ratio.examPoint,
    focused_practice: totalMin * ratio.practice * 0.62,
    reading_cloze: totalMin * (ratio.readingCloze + ratio.practice * 0.38),
    wrong_questions: totalMin * Math.max(ratio.wrong, 0.06),
  };
  // 取整并把余数补给最大块，保证总时长等于用户设定
  const rounded = Object.fromEntries(Object.entries(raw).map(([k, v]) => [k, Math.round(v)])) as Record<
    keyof typeof BASE_60_MINUTES,
    number
  >;
  const sum = Object.values(rounded).reduce((a, b) => a + b, 0);
  const diff = totalMin - sum;
  const biggest = (Object.keys(rounded) as (keyof typeof BASE_60_MINUTES)[]).sort(
    (a, b) => rounded[b] - rounded[a],
  )[0]!;
  rounded[biggest] += diff;
  return rounded;
}

export function generatePlan(input: PlanInput): DailyPlan {
  const date = input.date ?? todayStr();
  const { settings, stage } = input;
  const minutes = allocateMinutes(settings.dailyMinutes, stage);

  const progressByWord = new Map(input.progress.map((p) => [p.wordId, p]));
  const masteryByWord = new Map(input.progress.map((p) => [p.wordId, p.mastery]));

  // 最近 7 天各知识点错误率
  const tagErrors = new Map<string, { e: number; n: number }>();
  for (const a of input.attempts) {
    const q = input.questions.find((x) => x.id === a.questionId);
    for (const tag of q?.knowledgeTags ?? []) {
      const b = tagErrors.get(tag) ?? { e: 0, n: 0 };
      b.n++;
      if (!a.correct) b.e++;
      tagErrors.set(tag, b);
    }
  }
  const recentErrorOf = (tags: string[]): number => {
    let max = 0;
    for (const t of tags) {
      const b = tagErrors.get(t);
      if (b && b.n > 0) max = Math.max(max, b.e / b.n);
    }
    return max;
  };

  // ---------- 词汇 ----------
  const dueWords = input.words.filter((w) => isDue(progressByWord.get(w.id) ?? null, date));
  const dueScored = dueWords
    .map((w) => {
      const p = progressByWord.get(w.id) ?? null;
      return {
        w,
        score: priorityScore({
          examWeight: LEVEL_EXAM_WEIGHT[w.level],
          mastery: masteryByWord.get(w.id) ?? null,
          forgetting: forgettingScore(p, date),
          realExamFrequency: w.frequencyScore > 0 ? w.frequencyScore : null,
          recentErrorRate: recentErrorOf(w.knowledgeTags ?? []),
        }),
      };
    })
    .sort((a, b) => b.score - a.score);

  const newWords = input.words
    .filter((w) => !progressByWord.has(w.id))
    .map((w) => ({
      w,
      score: priorityScore({
        examWeight: LEVEL_EXAM_WEIGHT[w.level],
        mastery: null,
        forgetting: 50,
        realExamFrequency: w.frequencyScore > 0 ? w.frequencyScore : null,
        recentErrorRate: recentErrorOf(w.knowledgeTags ?? []),
      }),
    }))
    .sort((a, b) => b.score - a.score);

  const reviewCap = Math.round(minutes.review_words * PACE.reviewWordPerMin);
  const newCap = Math.round(minutes.new_words * PACE.newWordPerMin);
  const reviewPicks = dueScored.slice(0, Math.max(0, reviewCap)).map((x) => x.w.id);
  const newPicks = newWords.slice(0, Math.max(0, newCap)).map((x) => x.w.id);

  // ---------- 语法 ----------
  const grammarId = pickGrammar(input, date);
  // ---------- 考点 ----------
  const examPointId = minutes.exam_point >= 3 ? pickExamPoint(input, date) : null;

  // ---------- 专项练习 ----------
  const focusedCount = Math.max(0, Math.round(minutes.focused_practice * PACE.questionPerMin));
  const weakTags = collectWeakTags(input);
  const focusedQuestionIds = pickFocusedQuestions(input, weakTags, focusedCount);

  // ---------- 阅读/完形 ----------
  const passageTarget = Math.max(0, Math.round(minutes.reading_cloze * PACE.passagePerMin));
  const passageIds = pickPassages(input, passageTarget);

  // ---------- 错题 ----------
  const dueWrongs = input.wrongs
    .filter((w) => !w.resolved && w.nextReviewAt <= date)
    .sort((a, b) => (a.consecutiveCorrect < b.consecutiveCorrect ? -1 : 1));
  const wrongCap = Math.max(0, Math.round(minutes.wrong_questions * PACE.wrongPerMin));
  const wrongPicks = dueWrongs.slice(0, wrongCap);

  // ---------- 组装 ----------
  const items: PlanItem[] = [];
  if (reviewPicks.length > 0)
    items.push({ key: 'review', activity: 'review_words', title: '复习到期词汇', minutes: minutes.review_words, count: reviewPicks.length, payload: { wordIds: reviewPicks } });
  if (newPicks.length > 0)
    items.push({ key: 'new', activity: 'new_words', title: '学习新词', minutes: minutes.new_words, count: newPicks.length, payload: { wordIds: newPicks } });
  if (grammarId && minutes.grammar >= 5)
    items.push({ key: 'grammar', activity: 'grammar', title: '语法精讲', minutes: minutes.grammar, count: 1, payload: { grammarId } });
  if (examPointId)
    items.push({ key: 'ep', activity: 'exam_point', title: '高频考点', minutes: minutes.exam_point, count: 1, payload: { examPointId } });
  if (focusedQuestionIds.length > 0)
    items.push({ key: 'focus', activity: 'focused_practice', title: '专项训练', minutes: minutes.focused_practice, count: focusedQuestionIds.length, payload: { questionIds: focusedQuestionIds, weakTags } });
  if (passageIds.length > 0)
    items.push({ key: 'passage', activity: 'reading_cloze', title: '阅读 / 完形', minutes: minutes.reading_cloze, count: passageIds.length, payload: { groupIds: passageIds } });
  if (wrongPicks.length > 0)
    items.push({ key: 'wrong', activity: 'wrong_questions', title: '到期错题', minutes: minutes.wrong_questions, count: wrongPicks.length, payload: { wrongIds: wrongPicks.map((w) => w.id) } });

  return {
    date,
    stage,
    totalMinutes: items.reduce((s, i) => s + i.minutes, 0),
    items,
    mustKnow: buildMustKnow(input, { dueWords: dueScored.map((x) => x.w), newWords: newWords.map((x) => x.w), grammarId }),
  };
}

function pickGrammar(input: PlanInput, date: string): string | null {
  if (input.grammarTopics.length === 0) return null;
  const order = { P0: 0, P1: 1, P2: 2 } as const;
  // P0 未学优先，其次每日轮换，保证覆盖而不是每天同一篇
  const sorted = [...input.grammarTopics].sort((a, b) => order[a.priority] - order[b.priority]);
  const idx = hashDate(date + 'grammar', sorted.length);
  // 优先取同优先级里由日期轮换到的那一篇
  const topPriority = sorted[0]!.priority;
  const pool = sorted.filter((t) => t.priority === topPriority);
  return pool[idx % pool.length]!.id;
}

function pickExamPoint(input: PlanInput, date: string): string | null {
  if (input.examPoints.length === 0) return null;
  const idx = hashDate(date + 'ep', input.examPoints.length);
  const sorted = [...input.examPoints].sort((a, b) => {
    if (a.priority !== b.priority) return a.priority === 'P0' ? -1 : 1;
    return b.realExamCount - a.realExamCount; // 真实统计驱动，初始全 0 时退化为稳定顺序
  });
  const pool = sorted.filter((e) => e.priority === sorted[0]!.priority);
  return pool[idx % pool.length]!.id;
}

function collectWeakTags(input: PlanInput): string[] {
  const stat = new Map<string, { e: number; n: number }>();
  for (const a of input.attempts) {
    const q = input.questions.find((x) => x.id === a.questionId);
    const tag = q?.knowledgeTags[0];
    if (!tag) continue;
    const b = stat.get(tag) ?? { e: 0, n: 0 };
    b.n++;
    if (!a.correct) b.e++;
    stat.set(tag, b);
  }
  return [...stat.entries()]
    .filter(([, b]) => b.n >= 2)
    .sort((a, b) => b[1].e / b[1].n - a[1].e / a[1].n)
    .slice(0, 3)
    .map(([t]) => t);
}

function pickFocusedQuestions(input: PlanInput, weakTags: string[], count: number): string[] {
  if (count === 0) return [];
  const scored = input.questions
    .filter((q) => ['Grammar', 'Vocabulary', 'Phonetics', 'Dialogue'].includes(q.section))
    .map((q) => {
      const weakHit = q.knowledgeTags.some((t) => weakTags.includes(t)) ? 40 : 0;
      const wrongBefore = input.attempts.some((a) => a.questionId === q.id && !a.correct) ? 20 : 0;
      const recentCorrect = input.attempts.some((a) => a.questionId === q.id && a.correct) ? -10 : 0;
      return { id: q.id, score: weakHit + wrongBefore + recentCorrect + Math.random() * 8 };
    });
  return scored.sort((a, b) => b.score - a.score).slice(0, count).map((x) => x.id);
}

function pickPassages(input: PlanInput, target: number): string[] {
  if (target === 0) return [];
  const groups = new Map<string, { section: string; id: string; count: number }>();
  for (const q of input.questions) {
    if ((q.section === 'Reading' || q.section === 'Cloze') && q.groupId) {
      const g = groups.get(q.groupId) ?? { section: q.section, id: q.groupId, count: 0 };
      g.count++;
      groups.set(q.groupId, g);
    }
  }
  const doneGroups = new Set(
    input.attempts
      .map((a) => input.questions.find((q) => q.id === a.questionId)?.groupId)
      .filter((g): g is string => !!g),
  );
  const sorted = [...groups.values()].sort((a, b) => {
    const ad = doneGroups.has(a.id) ? 1 : 0;
    const bd = doneGroups.has(b.id) ? 1 : 0;
    return ad - bd;
  });
  return sorted.slice(0, target).map((g) => g.id);
}

function buildMustKnow(
  input: PlanInput,
  picked: { dueWords: Word[]; newWords: Word[]; grammarId: string | null },
): DailyPlan['mustKnow'] {
  const date = input.date ?? todayStr();
  const wordPool = [...picked.dueWords, ...picked.newWords, ...input.words];
  const uniqWords: Word[] = [];
  for (const w of wordPool) {
    if (!uniqWords.some((x) => x.id === w.id)) uniqWords.push(w);
    if (uniqWords.length >= 5) break;
  }
  const start = hashDate(date + 'w', Math.max(1, wordPool.length - 5));
  const words = wordPool.slice(start, start + 5).map((w) => w.id);
  const fallbackWords = uniqWords.slice(0, 5).map((w) => w.id);
  const chosenWords = words.length === 5 ? words : fallbackWords;

  const collocationPool = input.words.flatMap((w) => w.collocations.map((c) => `${w.word}: ${c}`));
  const cStart = hashDate(date + 'c', Math.max(1, collocationPool.length - 2));
  const collocations = collocationPool.slice(cStart, cStart + 2);
  if (collocations.length < 2) {
    collocationPool.slice(0, 2).forEach((c) => {
      if (!collocations.includes(c) && collocations.length < 2) collocations.push(c);
    });
  }

  const grammarId =
    picked.grammarId ??
    input.grammarTopics[hashDate(date + 'grammar', Math.max(1, input.grammarTopics.length))]?.id ??
    input.grammarTopics[0]?.id ??
    '';
  const sentence =
    input.writingSentences[hashDate(date + 's', Math.max(1, input.writingSentences.length))] ??
    input.writingSentences[0] ??
    '';

  return { words: chosenWords, collocations, grammarId, sentence };
}

/** 标准 60 分钟基准（文档第十六章），用于展示比例来源 */
export const BASE_PLAN_60 = BASE_60_MINUTES;
