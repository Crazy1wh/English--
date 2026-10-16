// ============================================================
// 错题间隔复习（文档第十九章）
// 答错 → 当天 → 次日 → 3天 → 7天 → 14天；连对 3 次基本掌握；
// 关联知识点 mastery < 80 仍随机抽查。
// ============================================================

import { WRONG_MASTER_STREAK, WRONG_REVIEW_INTERVAL_DAYS } from './config';
import { addDays, todayStr } from './date';
import type { WrongQuestion } from '@/types';

export function isWrongDue(w: WrongQuestion, today = todayStr()): boolean {
  return !w.resolved && w.nextReviewAt <= today;
}

/** 新答错：建立或重置错题 */
export function scheduleWrongAfterError(existing: WrongQuestion | undefined, nowIso: string): WrongQuestion {
  if (existing) {
    return {
      ...existing,
      lastAt: nowIso,
      consecutiveCorrect: 0,
      stage: 0,
      nextReviewAt: addDays(todayStr(), WRONG_REVIEW_INTERVAL_DAYS[0]!),
      resolved: false,
    };
  }
  throw new Error('use createWrong() for new wrong questions');
}

export function createWrong(questionId: string, errorType: WrongQuestion['predictedErrorType'], nowIso: string): WrongQuestion {
  return {
    id: `${questionId}@${nowIso}`,
    questionId,
    firstAt: nowIso,
    lastAt: nowIso,
    predictedErrorType: errorType,
    userErrorType: null,
    consecutiveCorrect: 0,
    stage: 0,
    nextReviewAt: addDays(todayStr(), WRONG_REVIEW_INTERVAL_DAYS[0]!),
    resolved: false,
  };
}

/** 错题复习答对：推进一档；连对 3 次 → 基本掌握 */
export function scheduleWrongAfterCorrect(w: WrongQuestion): WrongQuestion {
  const consecutiveCorrect = w.consecutiveCorrect + 1;
  if (consecutiveCorrect >= WRONG_MASTER_STREAK) {
    return { ...w, consecutiveCorrect, resolved: true };
  }
  const stage = Math.min(w.stage + 1, WRONG_REVIEW_INTERVAL_DAYS.length - 1);
  return {
    ...w,
    consecutiveCorrect,
    stage,
    nextReviewAt: addDays(todayStr(), WRONG_REVIEW_INTERVAL_DAYS[stage]!),
  };
}

/** 错题复习再次答错：打回当天 */
export function scheduleWrongAfterWrong(w: WrongQuestion): WrongQuestion {
  return {
    ...w,
    consecutiveCorrect: 0,
    stage: 0,
    nextReviewAt: addDays(todayStr(), WRONG_REVIEW_INTERVAL_DAYS[0]!),
  };
}

/** 已基本掌握但关联知识点薄弱（<80）时，仍允许被随机抽查 */
export function spotCheckEligible(w: WrongQuestion, relatedMastery: number): boolean {
  return w.resolved && relatedMastery < 80;
}
