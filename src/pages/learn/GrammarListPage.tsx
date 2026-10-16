import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Chip, MasteryBar } from '@/components/ui';
import { GRAMMAR_TOPICS } from '@/data';
import { getMastery } from '@/store/db';
import { useStore } from '@/store/useStore';

const PRIORITY_LABEL = { P0: { label: 'P0 高频', color: 'red' as const }, P1: { label: 'P1', color: 'amber' as const }, P2: { label: 'P2', color: 'slate' as const } };

export function GrammarListPage() {
  useStore(); // 掌握度更新后重渲染
  const groups: Array<['P0' | 'P1' | 'P2', string]> = [
    ['P0', 'P0 高频语法 · 必须拿下'],
    ['P1', 'P1 常考语法'],
    ['P2', 'P2 小题型'],
  ];
  return (
    <div className="pb-nav">
      <PageHeader title="语法 22 讲" back="/learn" />
      <div className="px-4 pt-3">
        {groups.map(([p, title]) => (
          <div key={p}>
            <h2 className="mb-2 mt-3 text-sm font-semibold text-slate-500">{title}</h2>
            <div className="space-y-2">
              {GRAMMAR_TOPICS.filter((g) => g.priority === p).map((g) => (
                <Link key={g.id} to={`/learn/grammar/${g.id}`} className="card block p-3.5 hover:bg-slate-50">
                  <div className="flex items-center gap-2">
                    <span className="w-9 shrink-0 text-sm font-bold text-brand-500">{g.id}</span>
                    <span className="flex-1 font-medium text-slate-800">{g.title}</span>
                    <Chip color={PRIORITY_LABEL[g.priority].color}>{PRIORITY_LABEL[g.priority].label}</Chip>
                    <ChevronRight size={15} className="text-slate-300" />
                  </div>
                  <div className="mt-2 pl-11">
                    <MasteryBar value={getMastery('grammar', g.id)} size="sm" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
