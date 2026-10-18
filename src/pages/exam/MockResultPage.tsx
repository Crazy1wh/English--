import { Link, useParams } from 'react-router-dom';
import { PageHeader } from '@/components/PageHeader';
import { Chip, EmptyState } from '@/components/ui';
import { useStore } from '@/store/useStore';
import { getPrediction, paperIsReal } from '@/store/db';
import { SECTION_LABEL } from './MockExamPage';

export function MockResultPage() {
  const { resultId } = useParams();
  const s = useStore();
  const result = s.mocks.find((m) => m.id === resultId);
  const prediction = getPrediction();

  if (!result) {
    return (
      <div className="pb-nav">
        <PageHeader title="模考结果" back="/exams" />
        <div className="px-4 pt-6"><EmptyState title="未找到该次考试记录" /></div>
      </div>
    );
  }

  const pct = result.questionCount ? Math.round((result.correctCount / result.questionCount) * 100) : 0;
  const minutes = Math.round(result.durationSec / 60);
  const isReal = paperIsReal(result.paperId);

  return (
    <div className="pb-nav">
      <PageHeader title="模考结果" back="/exams" />
      <div className="space-y-4 px-4 pt-3">
        <section className="card p-6 text-center">
          <div className="text-xs text-slate-400">
            {isReal ? '真题卷折算分（收录题量非完整原卷，按正确率折算 150）' : '模拟卷折算分（满分 150，非官方难度）'}
          </div>
          <div className="mt-1 text-5xl font-bold text-brand-600">{result.total}</div>
          <div className="mt-2 text-sm text-slate-500">
            答对 {result.correctCount}/{result.questionCount} · 正确率 {pct}% · 用时 {minutes} 分钟
          </div>
        </section>

        <section className="card p-4">
          <h3 className="mb-3 font-semibold text-slate-800">各题型正确率</h3>
          <div className="space-y-2.5">
            {Object.entries(result.sectionStats).map(([sec, st]) => (
              <div key={sec} className="flex items-center gap-3 text-sm">
                <span className="w-20 shrink-0 text-slate-600">{SECTION_LABEL[sec] ?? sec}</span>
                <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${st.correct / st.total >= 0.7 ? 'bg-emerald-400' : st.correct / st.total >= 0.4 ? 'bg-amber-400' : 'bg-rose-400'}`}
                    style={{ width: `${(st.correct / st.total) * 100}%` }}
                  />
                </div>
                <span className="w-14 shrink-0 text-right text-xs tabular-nums text-slate-400">
                  {st.correct}/{st.total}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="card p-4">
          <h3 className="font-semibold text-slate-800">系统预测分数区间</h3>
          {prediction ? (
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-emerald-600">
                {prediction.low}–{prediction.high}
              </span>
              <span className="text-xs text-slate-400">满分 150 · 基于全部练习数据的置信区间，不是保证</span>
            </div>
          ) : (
            <p className="mt-2 text-sm text-slate-400">数据不足（建议累计 60+ 题再看预测区间）。</p>
          )}
          <div className="mt-3">
            <Chip color={isReal ? 'green' : 'amber'}>
              {isReal ? '已核验真题片段，难度参考价值较高（非完整原卷）' : '本次为模拟/演示卷，难度不代表真题'}
            </Chip>
          </div>
        </section>

        <div className="grid grid-cols-2 gap-2">
          <Link to={`/exams/mock/${result.paperId}`} className="btn-outline">再考一次</Link>
          <Link to="/profile" className="btn-primary">看我的学习报告</Link>
        </div>
      </div>
    </div>
  );
}
