import type { Attempt, Question } from '@/types';
import { addDays, todayStr } from './date';

export function accuracy(attempts: Attempt[]): number {
  if (attempts.length === 0) return 0;
  return attempts.filter((a) => a.correct).length / attempts.length;
}

export function sectionStats(
  attempts: Attempt[],
  questionsById: Map<string, Question>,
): Record<string, { correct: number; total: number }> {
  const out: Record<string, { correct: number; total: number }> = {};
  for (const a of attempts) {
    const q = questionsById.get(a.questionId);
    if (!q) continue;
    const s = (out[q.section] ??= { correct: 0, total: 0 });
    s.total++;
    if (a.correct) s.correct++;
  }
  return out;
}

/** 最近 N 天答题正确率 */
export function recentAccuracy(attempts: Attempt[], days: number, now = todayStr()): number {
  const from = addDays(now, -(days - 1));
  const slice = attempts.filter((a) => a.at.slice(0, 10) >= from);
  return accuracy(slice);
}

/** 按知识点（题目主标签）统计正确率 */
export function tagAccuracy(
  attempts: Attempt[],
  questionsById: Map<string, Question>,
): Map<string, { correct: number; total: number; tagId: string }> {
  const map = new Map<string, { correct: number; total: number; tagId: string }>();
  for (const a of attempts) {
    const q = questionsById.get(a.questionId);
    if (!q) continue;
    const tagId = q.knowledgeTags[0] ?? q.questionType;
    const s = map.get(tagId) ?? { correct: 0, total: 0, tagId };
    s.total++;
    if (a.correct) s.correct++;
    map.set(tagId, s);
  }
  return map;
}

/** 薄弱知识点：有答题记录且正确率最低 */
export function weakTags(
  attempts: Attempt[],
  questionsById: Map<string, Question>,
  minAttempts = 2,
  limit = 5,
): { tagId: string; correct: number; total: number; accuracy: number }[] {
  return [...tagAccuracy(attempts, questionsById).values()]
    .filter((s) => s.total >= minAttempts)
    .map((s) => ({ ...s, accuracy: s.correct / s.total }))
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, limit);
}

/** 进步最快：最近 7 天正确率相对再前 7 天提升最大 */
export function fastestProgress(
  attempts: Attempt[],
  questionsById: Map<string, Question>,
  now = todayStr(),
  limit = 5,
): { tagId: string; delta: number; current: number }[] {
  const recentFrom = addDays(now, -6);
  const prevFrom = addDays(now, -13);
  const buckets = new Map<string, { r: number; rn: number; p: number; pn: number }>();
  for (const a of attempts) {
    const q = questionsById.get(a.questionId);
    if (!q) continue;
    const day = a.at.slice(0, 10);
    if (day < prevFrom) continue;
    const tagId = q.knowledgeTags[0] ?? q.questionType;
    const b = buckets.get(tagId) ?? { r: 0, rn: 0, p: 0, pn: 0 };
    if (day >= recentFrom) {
      b.rn++;
      if (a.correct) b.r++;
    } else {
      b.pn++;
      if (a.correct) b.p++;
    }
    buckets.set(tagId, b);
  }
  return [...buckets.entries()]
    .filter(([, b]) => b.rn >= 2 && b.pn >= 2)
    .map(([tagId, b]) => ({
      tagId,
      current: b.r / b.rn,
      delta: b.r / b.rn - b.p / b.pn,
    }))
    .sort((a, b) => b.delta - a.delta)
    .slice(0, limit);
}

/** 连续学习天数 */
export function studyStreak(activeDates: string[], now = todayStr()): number {
  const set = new Set(activeDates);
  let streak = 0;
  let cursor = now;
  // 今天没学也不断（从昨天算起）
  if (!set.has(cursor)) cursor = addDays(cursor, -1);
  while (set.has(cursor)) {
    streak++;
    cursor = addDays(cursor, -1);
  }
  return streak;
}
