// ============================================================
// 学习引擎可调参数（第一版默认配置，后续可在 Admin 后台调整，不写死在核心流程里）
// ============================================================

import type { Difficulty } from '@/types';

/** 掌握度初始值 */
export const INITIAL_MASTERY = 50;
export const MASTERY_MIN = 0;
export const MASTERY_MAX = 100;

/** 答题掌握度增减表（文档第十四章） */
export const ANSWER_MASTERY_DELTA: Record<Difficulty, { correct: number; wrong: number }> = {
  easy: { correct: 2, wrong: -5 },
  normal: { correct: 3, wrong: -4 },
  hard: { correct: 4, wrong: -2 },
};

/** 单词闪卡评分对应的掌握度变化 */
export const WORD_GRADE_MASTERY_DELTA = {
  again: -6,
  vague: 1,
  good: 3,
  easy: 5,
} as const;

/** Daily Plan 综合优先级权重（文档第十五章，合计 1.0） */
export const PRIORITY_WEIGHTS = {
  examWeight: 0.3,
  weakness: 0.25,
  forgetting: 0.2,
  realExamFrequency: 0.15,
  recentErrors: 0.1,
} as const;

/** 无真题统计数据时的中性值，禁止 AI 编造频率 */
export const NEUTRAL_FREQUENCY = 50;

/** 学习阶段时间窗口与精力分配（文档第二十一章，可配置） */
export interface StageRatio {
  vocabNew: number;
  vocabReview: number;
  grammar: number;
  examPoint: number;
  practice: number; // 专项/真题刷题
  readingCloze: number;
  wrong: number;
  writing: number;
}

export const STAGE_RATIOS: Record<'Foundation' | 'Strengthening' | 'Sprint' | 'Final', StageRatio> = {
  Foundation: { vocabNew: 0.25, vocabReview: 0.1, grammar: 0.25, examPoint: 0.05, practice: 0.2, readingCloze: 0.1, wrong: 0, writing: 0.05 },
  Strengthening: { vocabNew: 0.12, vocabReview: 0.08, grammar: 0.2, examPoint: 0.05, practice: 0.3, readingCloze: 0.15, wrong: 0, writing: 0.1 },
  Sprint: { vocabNew: 0.02, vocabReview: 0.08, grammar: 0.08, examPoint: 0.15, practice: 0.4, readingCloze: 0.12, wrong: 0.1, writing: 0.05 },
  Final: { vocabNew: 0, vocabReview: 0.15, grammar: 0.05, examPoint: 0.1, practice: 0.35, readingCloze: 0.1, wrong: 0.2, writing: 0.05 },
};

/** 60 分钟标准计划的基准分钟数（文档第十六章），其他时长按比例缩放 */
export const BASE_60_MINUTES = {
  review_words: 5,
  new_words: 10,
  grammar: 10,
  exam_point: 5,
  focused_practice: 10,
  reading_cloze: 15,
  wrong_questions: 5,
} as const;

/** 单位时间产出估算（个/分钟） */
export const PACE = {
  reviewWordPerMin: 3,
  newWordPerMin: 1.3,
  questionPerMin: 0.85,
  passagePerMin: 1 / 8,
  wrongPerMin: 0.7,
};

/** 错题复习间隔（天）：当天 / 次日 / 3 / 7 / 14（文档第十九章） */
export const WRONG_REVIEW_INTERVAL_DAYS = [0, 1, 3, 7, 14];
/** 连续答对次数后标记基本掌握 */
export const WRONG_MASTER_STREAK = 3;
/** 掌握度低于该值时，已掌握错题仍会被随机抽查 */
export const SPOT_CHECK_MASTERY_THRESHOLD = 80;

/** Remediation：同知识点连续答错阈值（文档第二十章） */
export const REMEDIATION_STREAK_THRESHOLD = 3;

/** 分数预测：各题型默认权重（算法默认参数，非官方分值声明，可在配置中调整） */
export const SECTION_PREDICTION_WEIGHTS: Record<string, number> = {
  Phonetics: 0.05,
  Vocabulary: 0.15,
  Grammar: 0.15,
  Cloze: 0.15,
  Reading: 0.3,
  Dialogue: 0.1,
  Writing: 0.1,
};

export const PREDICTION_HALF_WIDTH = 7; // 预测区间半宽
export const MIN_ATTEMPTS_FOR_PRACTICE_PREDICTION = 30;
