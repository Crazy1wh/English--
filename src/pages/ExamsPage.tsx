import { Link } from 'react-router-dom';
import { ChevronRight, Clock, FileQuestion, ShieldAlert } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Chip, EmptyState } from '@/components/ui';
import { MOCK_PAPERS } from '@/data';
import { questionsById } from '@/store/db';
import { useStore } from '@/store/useStore';

export function ExamsPage() {
  const s = useStore();
  const qmap = questionsById();
  // 真题卷：paper 的题目全部（或大部分）为已核验真题
  const realPapers = MOCK_PAPERS.filter((p) => {
    const qs = p.questionIds.map((id) => qmap.get(id)).filter(Boolean);
    return qs.length > 0 && qs.every((q) => q!.isRealExam);
  });
  const mockPapers = MOCK_PAPERS.filter((p) => !realPapers.includes(p));

  const PaperCard = ({ p }: { p: (typeof MOCK_PAPERS)[number] }) => {
    const results = s.mocks.filter((m) => m.paperId === p.id);
    const last = results[results.length - 1];
    const qs = p.questionIds.map((id) => qmap.get(id)).filter(Boolean);
    const allReal = qs.length > 0 && qs.every((q) => q!.isRealExam);
    return (
      <Link key={p.id} to={`/exams/mock/${p.id}`} className="card block p-4 hover:bg-slate-50">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-slate-800">{p.title}</h3>
          <ChevronRight size={16} className="text-slate-300" />
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-400">
          {allReal ? (
            <Chip color="green">历年真题 · 已核验</Chip>
          ) : p.source === 'third_party_unverified' ? (
            <Chip color="amber">模拟卷 · 非真题</Chip>
          ) : (
            <Chip color="amber">演示卷 · 非真题</Chip>
          )}
          <span className="flex items-center gap-1"><Clock size={12} /> {p.durationMin} 分钟</span>
          <span>满分 {p.totalScore}</span>
          <span>{p.questionIds.length} 题</span>
        </div>
        {last && <p className="mt-2 text-xs text-emerald-600">上次折算 {last.total} 分 · {last.at.slice(0, 10)}</p>}
      </Link>
    );
  };

  return (
    <div className="pb-nav">
      <PageHeader title="真题 / 模考" back="/" />
      <div className="space-y-4 px-4 pt-3">
        {/* 历年真题 */}
        <section>
          <h2 className="mb-2 text-sm font-semibold text-slate-500">历年真题</h2>
          <div className="space-y-2">
            {realPapers.length > 0 ? (
              realPapers.map((p) => <PaperCard key={p.id} p={p} />)
            ) : (
              <div className="card p-6 text-center">
                <ShieldAlert size={36} className="mx-auto text-amber-400" />
                <h3 className="mt-2 font-medium text-slate-700">真题区等待核验内容</h3>
                <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-slate-400">
                  真题必须经过：来源留存（年份/地区/试卷类型）→ 多源比对 → 人工核验，
                  以 reliability A/B 导入后才会出现在这里。
                </p>
              </div>
            )}
          </div>
        </section>

        {/* 模拟卷 */}
        <section>
          <h2 className="mb-2 text-sm font-semibold text-slate-500">模拟考试</h2>
          <div className="space-y-2">
            {mockPapers.map((p) => <PaperCard key={p.id} p={p} />)}
          </div>
        </section>

        {realPapers.length === 0 && (
          <EmptyState icon={<FileQuestion size={32} className="mx-auto text-slate-300" />} title="暂无真题" desc="可在「我的 → 内容管理」导入已核验试卷（JSON，reliability=A/B）" />
        )}
      </div>
    </div>
  );
}
