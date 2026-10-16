import type { ReactNode } from 'react';
import type { Reliability, SourceKind } from '@/types';

export function ProgressBar({ value, className = '', color = 'bg-brand-500' }: { value: number; className?: string; color?: string }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className={`h-2 w-full overflow-hidden rounded-full bg-slate-200 ${className}`}>
      <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${v}%` }} />
    </div>
  );
}

export function MasteryBar({ value, size = 'md' }: { value: number; size?: 'sm' | 'md' }) {
  const color = value >= 80 ? 'bg-emerald-500' : value >= 60 ? 'bg-brand-500' : value >= 40 ? 'bg-amber-500' : 'bg-rose-400';
  return (
    <div className="flex items-center gap-2">
      <ProgressBar value={value} color={color} className={size === 'sm' ? 'h-1.5' : ''} />
      <span className="w-8 shrink-0 text-right text-xs tabular-nums text-slate-500">{Math.round(value)}</span>
    </div>
  );
}

export function Chip({ children, color = 'slate' }: { children: ReactNode; color?: 'slate' | 'brand' | 'green' | 'amber' | 'red' | 'purple' }) {
  const map = {
    slate: 'bg-slate-100 text-slate-600',
    brand: 'bg-brand-50 text-brand-700',
    green: 'bg-emerald-50 text-emerald-700',
    amber: 'bg-amber-50 text-amber-700',
    red: 'bg-rose-50 text-rose-700',
    purple: 'bg-purple-50 text-purple-700',
  } as const;
  return <span className={`chip ${map[color]}`}>{children}</span>;
}

/** 来源可信度徽章：严格执行文档第十二章 */
export function SourceBadge({ reliability, source, isRealExam }: { reliability: Reliability; source: SourceKind; isRealExam: boolean }) {
  if (isRealExam && (reliability === 'A' || reliability === 'B')) {
    return <Chip color="green">历年真题{reliability === 'A' ? ' · 官方/A' : ' · 多源核验/B'}</Chip>;
  }
  if (reliability === 'C') return <Chip color="amber">待核验题目 · C</Chip>;
  if (source === 'demo') return <Chip color="purple">演示题（非真题）</Chip>;
  return <Chip color="red">AI模拟题 · D</Chip>;
}

export function StatCard({ label, value, sub }: { label: string; value: ReactNode; sub?: string }) {
  return (
    <div className="card p-3.5">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="mt-1 text-xl font-bold tabular-nums text-slate-800">{value}</div>
      {sub && <div className="mt-0.5 text-xs text-slate-400">{sub}</div>}
    </div>
  );
}

export function EmptyState({ icon, title, desc, action }: { icon?: ReactNode; title: string; desc?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/60 px-6 py-10 text-center">
      {icon && <div className="mb-2 text-slate-300">{icon}</div>}
      <div className="font-medium text-slate-600">{title}</div>
      {desc && <div className="mt-1 text-sm text-slate-400">{desc}</div>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function SectionTitle({ children, extra }: { children: ReactNode; extra?: ReactNode }) {
  return (
    <div className="mb-2 mt-5 flex items-center justify-between">
      <h2 className="text-base font-semibold text-slate-800">{children}</h2>
      {extra}
    </div>
  );
}
