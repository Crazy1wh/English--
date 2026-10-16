// ============================================================
// 间隔重复调度器 —— 第一版简化实现；接口保持稳定，未来可替换为 FSRS
// （文档第十八章：数据模型不要把算法写死）
// ============================================================

import type { WordGrade, WordProgress, WordStatus } from '@/types';
import { addDays, todayStr } from './date';

export interface SrsScheduler {
  readonly name: string;
  schedule(prev: WordProgress | null, grade: WordGrade): Pick<WordProgress, 'intervalDays' | 'due' | 'status' | 'reps' | 'lapses'>;
}

/** 不会：当天(10分钟内重遇) / 已在复习的卡降级为次日 */
const AGAIN_INTERVAL_DAYS = [0, 1];
/** 模糊：1 / 3 / 7 天，之后维持 7 */
const VAGUE_INTERVALS = [1, 3, 7];
/** 认识：3 / 7 / 15 / 30 天，之后每轮 +30 */
const GOOD_INTERVALS = [3, 7, 15, 30];
/** 熟练：7 / 20 / 45 / 90，之后每轮 +60 */
const EASY_INTERVALS = [7, 20, 45, 90];

function pickInterval(ladders: number[], reps: number, growth: number): number {
  if (reps < ladders.length) return ladders[reps]!;
  return ladders[ladders.length - 1]! + growth * (reps - ladders.length + 1);
}

function statusFor(intervalDays: number): WordStatus {
  if (intervalDays >= 21) return 'mastered';
  if (intervalDays >= 3) return 'review';
  return 'learning';
}

export class SimpleSrsScheduler implements SrsScheduler {
  readonly name = 'simple-v1';

  schedule(prev: WordProgress | null, grade: WordGrade): Pick<WordProgress, 'intervalDays' | 'due' | 'status' | 'reps' | 'lapses'> {
    const reps = prev?.reps ?? 0;
    const lapses = prev?.lapses ?? 0;

    if (grade === 'again') {
      // 新词学习中：当天再出现；已经进入复习周期的老卡：次日
      const interval = prev && prev.intervalDays >= 1 ? AGAIN_INTERVAL_DAYS[1]! : AGAIN_INTERVAL_DAYS[0]!;
      return {
        intervalDays: interval,
        due: addDays(todayStr(), interval),
        status: 'learning',
        reps: 0,
        lapses: lapses + 1,
      };
    }

    let interval: number;
    if (grade === 'vague') interval = pickInterval(VAGUE_INTERVALS, reps, 0);
    else if (grade === 'good') interval = pickInterval(GOOD_INTERVALS, reps, 30);
    else interval = pickInterval(EASY_INTERVALS, reps, 60);

    return {
      intervalDays: interval,
      due: addDays(todayStr(), interval),
      status: statusFor(interval),
      reps: reps + 1,
      lapses,
    };
  }
}

export const defaultScheduler: SrsScheduler = new SimpleSrsScheduler();
