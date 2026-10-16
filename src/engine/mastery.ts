import { ANSWER_MASTERY_DELTA, MASTERY_MAX, MASTERY_MIN, WORD_GRADE_MASTERY_DELTA } from './config';
import type { Difficulty, WordGrade } from '@/types';

export function clampMastery(v: number): number {
  return Math.max(MASTERY_MIN, Math.min(MASTERY_MAX, Math.round(v)));
}

/** 答题后更新掌握度（简单题答对 +2 … 困难题答错 -2），单次波动天然受限 */
export function updateMasteryAfterAnswer(current: number, difficulty: Difficulty, correct: boolean): number {
  const delta = ANSWER_MASTERY_DELTA[difficulty];
  return clampMastery(current + (correct ? delta.correct : delta.wrong));
}

/** 单词闪卡评分后更新掌握度 */
export function updateMasteryAfterWordGrade(current: number, grade: WordGrade): number {
  return clampMastery(current + WORD_GRADE_MASTERY_DELTA[grade]);
}

/** 批量汇总多个知识点掌握度 */
export function averageMastery(values: number[]): number {
  if (values.length === 0) return 0;
  return Math.round(values.reduce((s, v) => s + v, 0) / values.length);
}
