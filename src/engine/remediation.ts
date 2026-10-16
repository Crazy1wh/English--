// ============================================================
// Remediation Flow（文档第二十章）
// 同知识点连续答错 3 次 → 暂停刷题 → 3 分钟知识卡 → 2 道简单题 → 恢复
// ============================================================

import { REMEDIATION_STREAK_THRESHOLD } from './config';

export interface RemediationEvent {
  tagId: string;
  correct: boolean;
}

/**
 * 维护“某知识点连续答错题数”。
 * 答对该知识点的题会清零；达到阈值时 UI 必须进入补救流程。
 */
export class RemediationTracker {
  private streaks = new Map<string, number>();

  record(tagId: string, correct: boolean): number {
    const prev = this.streaks.get(tagId) ?? 0;
    const next = correct ? 0 : prev + 1;
    this.streaks.set(tagId, next);
    return next;
  }

  shouldTrigger(tagId: string): boolean {
    return (this.streaks.get(tagId) ?? 0) >= REMEDIATION_STREAK_THRESHOLD;
  }

  /** 完成补救流程后清零 */
  clear(tagId: string) {
    this.streaks.delete(tagId);
  }

  peek(tagId: string): number {
    return this.streaks.get(tagId) ?? 0;
  }
}

/** 纯函数版：给定按时间排序的事件，返回当前需要补救的知识点 id 列表 */
export function detectRemediationTags(events: RemediationEvent[], threshold = REMEDIATION_STREAK_THRESHOLD): string[] {
  const streaks = new Map<string, number>();
  const fired = new Set<string>();
  for (const e of events) {
    const next = e.correct ? 0 : (streaks.get(e.tagId) ?? 0) + 1;
    streaks.set(e.tagId, next);
    if (next >= threshold) fired.add(e.tagId);
    if (e.correct) fired.delete(e.tagId);
  }
  return [...fired];
}
