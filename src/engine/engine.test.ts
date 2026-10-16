import { describe, expect, it } from 'vitest';
import { updateMasteryAfterAnswer, updateMasteryAfterWordGrade, clampMastery } from './mastery';
import { SimpleSrsScheduler } from './spaced-repetition';
import {
  createWrong,
  scheduleWrongAfterCorrect,
  scheduleWrongAfterWrong,
  spotCheckEligible,
} from './wrong-review';
import { detectRemediationTags, RemediationTracker } from './remediation';
import { predictScore } from './score-prediction';
import { allocateMinutes, generatePlan, priorityScore } from './daily-plan';
import { forgettingScore } from './forgetting';
import { addDays, todayStr } from './date';
import type { Attempt, MockResult, Question, Settings, Word, WordProgress, WrongQuestion } from '@/types';

const today = todayStr();

function makeWord(partial: Partial<Word> & Pick<Word, 'id' | 'word'>): Word {
  return {
    phonetic: '',
    partOfSpeech: 'v.',
    coreMeaning: '',
    examMeanings: [],
    level: 'L2',
    frequencyScore: 0,
    phrases: [],
    collocations: [],
    synonyms: [],
    antonyms: [],
    confusingWords: [],
    wordFamily: [],
    exampleSentence: null,
    source: 'demo',
    examYears: [],
    ...partial,
  };
}

function makeQuestion(partial: Partial<Question> & Pick<Question, 'id' | 'section'>): Question {
  return {
    exam: null,
    year: null,
    region: null,
    source: 'ai_generated',
    sourceUrl: null,
    reliability: 'D',
    isRealExam: false,
    status: 'active',
    questionType: partial.knowledgeTags?.[0] ?? 'test',
    questionText: 'q',
    options: ['A', 'B', 'C', 'D'],
    answer: 'B',
    explanation: { conclusion: '', keyPoint: '', whyCorrect: '', whyWrong: [], relatedKnowledge: [] },
    knowledgeTags: [],
    skillTags: [],
    difficulty: 'normal',
    frequencyLevel: null,
    createdAt: '',
    updatedAt: '',
    generatedByAi: true,
    model: null,
    promptVersion: null,
    ...partial,
  };
}

describe('mastery', () => {
  it('按规则表更新掌握度并限制在 0-100', () => {
    expect(updateMasteryAfterAnswer(50, 'easy', true)).toBe(52);
    expect(updateMasteryAfterAnswer(50, 'normal', true)).toBe(53);
    expect(updateMasteryAfterAnswer(50, 'hard', true)).toBe(54);
    expect(updateMasteryAfterAnswer(50, 'easy', false)).toBe(45);
    expect(updateMasteryAfterAnswer(50, 'normal', false)).toBe(46);
    expect(updateMasteryAfterAnswer(50, 'hard', false)).toBe(48);
    expect(clampMastery(120)).toBe(100);
    expect(clampMastery(-9)).toBe(0);
    expect(updateMasteryAfterWordGrade(50, 'again')).toBe(44);
  });

  it('单题不会造成巨大波动（边界安全）', () => {
    for (let m = 0; m <= 100; m++) {
      const next = updateMasteryAfterAnswer(m, 'easy', false);
      expect(Math.abs(next - m)).toBeLessThanOrEqual(5);
    }
  });
});

describe('spaced repetition', () => {
  const srs = new SimpleSrsScheduler();

  it('新词“不会”当天到期且重置 reps', () => {
    const r = srs.schedule(null, 'again');
    expect(r.due).toBe(today);
    expect(r.status).toBe('learning');
    expect(r.reps).toBe(0);
  });

  it('“认识”按 3/7/15/30 递增', () => {
    let p: WordProgress | null = null;
    const expected = [3, 7, 15, 30];
    for (const e of expected) {
      const r = srs.schedule(p, 'good');
      expect(r.intervalDays).toBe(e);
      expect(r.due).toBe(addDays(today, e));
      p = {
        wordId: 'w',
        status: r.status,
        mastery: 60,
        intervalDays: r.intervalDays,
        due: r.due,
        lastReviewAt: new Date().toISOString(),
        reps: r.reps,
        lapses: r.lapses,
      };
    }
  });

  it('复习中老卡“不会”降级为次日', () => {
    const p: WordProgress = {
      wordId: 'w',
      status: 'review',
      mastery: 70,
      intervalDays: 15,
      due: today,
      lastReviewAt: new Date().toISOString(),
      reps: 3,
      lapses: 0,
    };
    const r = srs.schedule(p, 'again');
    expect(r.intervalDays).toBe(1);
    expect(r.lapses).toBe(1);
  });
});

describe('wrong question review', () => {
  it('当天→次日→3天→7天→14天，连对3次掌握', () => {
    let w: WrongQuestion = createWrong('q1', 'E03', new Date().toISOString());
    expect(w.nextReviewAt).toBe(today);
    w = scheduleWrongAfterCorrect(w);
    expect(w.nextReviewAt).toBe(addDays(today, 1));
    w = scheduleWrongAfterCorrect(w);
    expect(w.nextReviewAt).toBe(addDays(today, 3));
    expect(w.resolved).toBe(false);
    w = scheduleWrongAfterCorrect(w);
    expect(w.resolved).toBe(true);
    expect(w.consecutiveCorrect).toBe(3);
  });

  it('复习中再次答错打回当天并清零连击', () => {
    let w = createWrong('q2', 'E05', new Date().toISOString());
    w = scheduleWrongAfterCorrect(w);
    w = scheduleWrongAfterWrong(w);
    expect(w.nextReviewAt).toBe(today);
    expect(w.consecutiveCorrect).toBe(0);
  });

  it('已掌握但知识点 mastery<80 仍可抽查', () => {
    const w = scheduleWrongAfterCorrect(
      scheduleWrongAfterCorrect(scheduleWrongAfterCorrect(createWrong('q3', 'E03', new Date().toISOString()))),
    );
    expect(w.resolved).toBe(true);
    expect(spotCheckEligible(w, 65)).toBe(true);
    expect(spotCheckEligible(w, 90)).toBe(false);
  });
});

describe('remediation', () => {
  it('同一知识点连续答错 3 次触发补救，答对后解除', () => {
    expect(detectRemediationTags([
      { tagId: 'g1', correct: false },
      { tagId: 'g1', correct: false },
    ])).toEqual([]);
    expect(detectRemediationTags([
      { tagId: 'g1', correct: false },
      { tagId: 'g2', correct: true },
      { tagId: 'g1', correct: false },
      { tagId: 'g1', correct: false },
    ])).toEqual(['g1']);
    expect(detectRemediationTags([
      { tagId: 'g1', correct: false },
      { tagId: 'g1', correct: false },
      { tagId: 'g1', correct: false },
      { tagId: 'g1', correct: true },
    ])).toEqual([]);
  });

  it('tracker 状态机', () => {
    const t = new RemediationTracker();
    t.record('g', false);
    t.record('g', false);
    expect(t.shouldTrigger('g')).toBe(false);
    t.record('g', false);
    expect(t.shouldTrigger('g')).toBe(true);
    t.clear('g');
    expect(t.shouldTrigger('g')).toBe(false);
  });
});

describe('score prediction', () => {
  const questions = [
    makeQuestion({ id: 'g', section: 'Grammar' }),
    makeQuestion({ id: 'r', section: 'Reading' }),
  ];
  const byId = new Map(questions.map((q) => [q.id, q]));

  it('数据不足返回 null', () => {
    expect(predictScore({ mocks: [], attempts: [], questionsById: byId, writingScores: [] })).toBeNull();
  });

  it('有模考时输出区间而非精确分', () => {
    const mock: MockResult = {
      id: 'm',
      at: '',
      paperId: 'p',
      total: 0,
      correctCount: 30,
      questionCount: 50,
      sectionStats: {},
      durationSec: 3600,
    };
    const p = predictScore({ mocks: [mock], attempts: [], questionsById: byId, writingScores: [] })!;
    expect(p.basis).toBe('mock');
    expect(p.high - p.low).toBeGreaterThanOrEqual(8);
    expect(p.low).toBeGreaterThanOrEqual(0);
    expect(p.high).toBeLessThanOrEqual(150);
    // 60% 正确率 → 约 90 分
    expect(Math.abs(p.mid - 90)).toBeLessThanOrEqual(3);
  });

  it('足够练习记录后可基于练习估算', () => {
    const attempts: Attempt[] = [];
    for (let i = 0; i < 20; i++) attempts.push({ id: `a${i}`, questionId: 'g', at: new Date().toISOString(), selected: 'B', correct: true, durationSec: 20, mode: 'practice', predictedErrorType: null, userErrorType: null });
    for (let i = 0; i < 20; i++) attempts.push({ id: `b${i}`, questionId: 'r', at: new Date().toISOString(), selected: 'B', correct: true, durationSec: 20, mode: 'practice', predictedErrorType: null, userErrorType: null });
    const p = predictScore({ mocks: [], attempts, questionsById: byId, writingScores: [80] });
    // coverage: Grammar .15 + Reading .3 + Writing .1 = .55 ≥ .5
    expect(p).not.toBeNull();
    expect(p!.basis).toBe('practice');
  });
});

describe('daily plan', () => {
  const settings = (dailyMinutes: Settings['dailyMinutes']): Settings => ({
    examDate: addDays(today, 60),
    dailyMinutes,
    targetScore: 90,
    ai: { baseUrl: '', apiKey: '', model: '' },
  });

  const words: Word[] = Array.from({ length: 40 }, (_, i) =>
    makeWord({ id: `w${i}`, word: `word${i}`, level: i < 10 ? 'L1' : 'L2', collocations: i % 3 === 0 ? ['do sth'] : [] }),
  );

  it('时间分配按阶段比例且总时长等于设定', () => {
    const m = allocateMinutes(60, 'Foundation');
    const sum = Object.values(m).reduce((a, b) => a + b, 0);
    expect(sum).toBe(60);
    const sprint = allocateMinutes(60, 'Sprint');
    expect(sprint.focused_practice).toBeGreaterThan(m.focused_practice);
    const final = allocateMinutes(60, 'Final');
    expect(final.new_words).toBe(0);
  });

  it('综合优先级：薄弱+高权重优先；无频率数据取中性', () => {
    const strong = priorityScore({ examWeight: 100, mastery: 95, forgetting: 10, realExamFrequency: null, recentErrorRate: 0 });
    const weak = priorityScore({ examWeight: 100, mastery: 20, forgetting: 90, realExamFrequency: null, recentErrorRate: 0.8 });
    expect(weak).toBeGreaterThan(strong);
    const withFreq = priorityScore({ examWeight: 50, mastery: 50, forgetting: 50, realExamFrequency: 100, recentErrorRate: 0 });
    const noFreq = priorityScore({ examWeight: 50, mastery: 50, forgetting: 50, realExamFrequency: null, recentErrorRate: 0 });
    expect(withFreq).toBeGreaterThan(noFreq);
  });

  it('生成包含今日必会且计划总时长合理', () => {
    const plan = generatePlan({
      settings: settings(60),
      stage: 'Strengthening',
      words,
      progress: [],
      grammarTopics: [{ id: 'G01', priority: 'P0' }],
      examPoints: [{ id: 'EP01', priority: 'P0', realExamCount: 0 }],
      questions: [],
      wrongs: [],
      attempts: [],
      writingSentences: ['It is important to do sth.'],
    });
    expect(plan.mustKnow.words).toHaveLength(5);
    expect(plan.mustKnow.collocations.length).toBeGreaterThanOrEqual(1);
    expect(plan.mustKnow.grammarId).toBe('G01');
    expect(plan.totalMinutes).toBeLessThanOrEqual(60);
    const newItem = plan.items.find((i) => i.activity === 'new_words');
    expect(newItem).toBeTruthy();
  });

  it('到期复习词进入复习队列且优先于新词', () => {
    const progress: WordProgress[] = [
      { wordId: 'w0', status: 'review', mastery: 55, intervalDays: 3, due: addDays(today, -1), lastReviewAt: addDays(today, -4), reps: 1, lapses: 0 },
    ];
    const plan = generatePlan({
      settings: settings(20),
      stage: 'Foundation',
      words,
      progress,
      grammarTopics: [],
      examPoints: [],
      questions: [],
      wrongs: [],
      attempts: [],
      writingSentences: [],
    });
    const reviewItem = plan.items.find((i) => i.activity === 'review_words');
    expect(reviewItem?.count).toBe(1);
  });

  it('遗忘分随超期增加', () => {
    const p: WordProgress = {
      wordId: 'w', status: 'learning', mastery: 60, intervalDays: 10,
      due: addDays(today, 5), lastReviewAt: today, reps: 1, lapses: 0,
    };
    expect(forgettingScore(p, addDays(today, 10))).toBe(100);
    expect(forgettingScore(p, today)).toBeLessThan(100);
  });
});
