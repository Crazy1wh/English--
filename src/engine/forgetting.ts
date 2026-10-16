import { daysBetween } from './date';
import type { WordProgress } from '@/types';

/**
 * 遗忘紧迫度 0-100（Forgetting）。
 * 未学过：中性 50；
 * 已学：elapsed / interval 比值越高越紧迫，到期后趋近 100。
 * 第一版使用线性近似，未来可替换为记忆曲线/FSRS 可提取稳定性。
 */
export function forgettingScore(progress: WordProgress | null, today: string): number {
  if (!progress || !progress.lastReviewAt) return 50;
  const elapsed = Math.max(0, daysBetween(today, progress.lastReviewAt.slice(0, 10)));
  const interval = Math.max(1, progress.intervalDays);
  const ratio = elapsed / interval;
  return Math.max(0, Math.min(100, Math.round(30 + ratio * 70)));
}

/** 单词今日是否到期 */
export function isDue(progress: WordProgress | null, today: string): boolean {
  if (!progress) return false;
  return daysBetween(progress.due, today) <= 0;
}
