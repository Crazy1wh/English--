import { Link } from 'react-router-dom';
import { ChevronRight, PenTool } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { WRITING_KITS, COMMON_CONNECTORS } from '@/data';

export function WritingListPage() {
  return (
    <div className="pb-nav">
      <PageHeader title="短文写作" back="/learn" />
      <div className="space-y-3 px-4 pt-3">
        <p className="rounded-xl bg-slate-100 p-3 text-xs leading-5 text-slate-500">
          写作先保底：内容完整、格式正确、语法正确、意思清楚。不追求复杂高级句，先用安全句型稳稳拿分。
        </p>
        <div className="grid grid-cols-2 gap-2">
          {WRITING_KITS.map((k) => (
            <Link key={k.id} to={`/learn/writing/${k.id}`} className="card flex items-center gap-2 p-4 hover:bg-slate-50">
              <PenTool size={18} className="shrink-0 text-rose-500" />
              <span className="flex-1 text-sm font-medium text-slate-800">{k.title}</span>
              <ChevronRight size={15} className="text-slate-300" />
            </Link>
          ))}
        </div>

        <h2 className="mb-2 mt-4 text-sm font-semibold text-slate-500">W3 通用连接表达</h2>
        <div className="card space-y-2 p-4 text-sm text-slate-600">
          {COMMON_CONNECTORS.map((c) => (
            <p key={c}>· {c}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
