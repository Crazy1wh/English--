import type { Settings } from '@/types';
import { daysUntil } from './date';

export type StudyStage = 'Foundation' | 'Strengthening' | 'Sprint' | 'Final';

/** 根据考试日期判定学习阶段（文档第二十一章） */
export function stageFromExamDate(examDate: string): StudyStage {
  const d = daysUntil(examDate);
  if (d > 90) return 'Foundation';
  if (d >= 30) return 'Strengthening';
  if (d >= 7) return 'Sprint';
  return 'Final';
}

export function stageLabel(stage: StudyStage): string {
  return { Foundation: '基础期', Strengthening: '强化期', Sprint: '冲刺期', Final: '终极冲刺' }[stage];
}

export function stageOf(settings: Settings): StudyStage {
  return stageFromExamDate(settings.examDate);
}
