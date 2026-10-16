// ============================================================
// 分数预测（文档第二十三章）
// 第一版只输出“预测区间”，不展示虚假精确分；
// 数据不足时返回 null，由 UI 显示“完成一次模拟考试后生成预测”。
// ============================================================

import {
  MIN_ATTEMPTS_FOR_PRACTICE_PREDICTION,
  PREDICTION_HALF_WIDTH,
  SECTION_PREDICTION_WEIGHTS,
} from './config';
import type { Attempt, MockResult, Question } from '@/types';

export interface ScorePrediction {
  low: number;
  high: number;
  mid: number;
  basis: 'mock' | 'practice';
  confidence: number; // 0-1，随数据量提升
}

export interface PredictionInput {
  mocks: MockResult[];
  attempts: Attempt[];
  questionsById: Map<string, Question>;
  writingScores: number[]; // 作文本地/AI 估算 0-100
}

function sectionPercent(input: PredictionInput): Record<string, number> {
  const buckets: Record<string, { c: number; n: number }> = {};
  for (const a of input.attempts) {
    const q = input.questionsById.get(a.questionId);
    if (!q) continue;
    const b = (buckets[q.section] ??= { c: 0, n: 0 });
    b.n++;
    if (a.correct) b.c++;
  }
  const out: Record<string, number> = {};
  for (const [k, b] of Object.entries(buckets)) {
    if (b.n > 0) out[k] = b.c / b.n;
  }
  if (input.writingScores.length > 0) {
    out.Writing = input.writingScores.reduce((s, v) => s + v, 0) / input.writingScores.length / 100;
  }
  return out;
}

/** 按 SECTION_PREDICTION_WEIGHTS（默认参数，可配置）把各板块正确率映射到 150 分制 */
export function componentScore150(sectionPct: Record<string, number>): { score: number; coverage: number } {
  let score = 0;
  let coverage = 0;
  for (const [section, weight] of Object.entries(SECTION_PREDICTION_WEIGHTS)) {
    const pct = sectionPct[section];
    if (pct === undefined) {
      // 无数据的板块按中性 50% 临时占位，但不计入 coverage
      score += 0.5 * weight * 150;
    } else {
      score += pct * weight * 150;
      coverage += weight;
    }
  }
  return { score, coverage };
}

export function predictScore(input: PredictionInput): ScorePrediction | null {
  const latestMock = input.mocks[input.mocks.length - 1];
  const sectionPct = sectionPercent(input);
  const { score: component, coverage } = componentScore150(sectionPct);

  if (latestMock) {
    const mockScore = (latestMock.correctCount / Math.max(1, latestMock.questionCount)) * 150;
    // 有模考：以模考为主，板块表现做修正
    const blend = coverage >= 0.3 ? 0.65 * mockScore + 0.35 * component : mockScore;
    const confidence = Math.min(0.9, 0.5 + input.mocks.length * 0.1 + coverage * 0.2);
    const half = Math.max(4, Math.round(PREDICTION_HALF_WIDTH * (1.2 - confidence)));
    return pack(blend, half, 'mock', confidence);
  }

  if (input.attempts.length >= MIN_ATTEMPTS_FOR_PRACTICE_PREDICTION && coverage >= 0.5) {
    const confidence = Math.min(0.7, 0.3 + coverage * 0.3);
    const half = Math.max(5, Math.round(PREDICTION_HALF_WIDTH * (1.3 - confidence)));
    return pack(component, half, 'practice', confidence);
  }

  return null;
}

function pack(mid: number, half: number, basis: 'mock' | 'practice', confidence: number): ScorePrediction {
  const m = Math.max(0, Math.min(150, Math.round(mid)));
  return {
    low: Math.max(0, m - half),
    high: Math.min(150, m + half),
    mid: m,
    basis,
    confidence,
  };
}
