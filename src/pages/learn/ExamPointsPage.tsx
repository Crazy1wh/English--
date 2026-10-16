import { PageHeader } from '@/components/PageHeader';
import { Chip } from '@/components/ui';
import { EXAM_POINTS } from '@/data';
import { getMastery } from '@/store/db';
import { useStore } from '@/store/useStore';
import { MasteryBar } from '@/components/ui';

export function ExamPointsPage() {
  useStore();
  return (
    <div className="pb-nav">
      <PageHeader title="高频考点" back="/learn" />
      <div className="space-y-3 px-4 pt-3">
        <p className="rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-700">
          考点框架覆盖 EP01-EP10。<b>真题次数（realExamCount）只能由已验证真题统计回填，初始全部为 0</b>，
          AI 不会编造频次。导入 A/B 级真题库后这里会自动出现统计。
        </p>
        {EXAM_POINTS.map((ep) => (
          <section key={ep.id} className="card p-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-brand-500">{ep.id}</span>
              <h3 className="flex-1 font-semibold text-slate-800">{ep.title}</h3>
              <Chip color={ep.priority === 'P0' ? 'red' : 'amber'}>{ep.priority}</Chip>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">{ep.description}</p>
            <ul className="mt-2 space-y-1 rounded-xl bg-slate-50 p-3 text-sm text-slate-600">
              {ep.examples.map((e, i) => (
                <li key={i}>
                  <span className="font-medium">{e.en}</span>
                  {e.zh && <span className="text-slate-400">（{e.zh}）</span>}
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
              <span>真题出现次数：{ep.realExamCount === 0 ? '暂无统计' : ep.realExamCount}</span>
              <div className="w-32">
                <MasteryBar value={getMastery('exam_point', ep.id)} size="sm" />
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
