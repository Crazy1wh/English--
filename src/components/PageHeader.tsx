import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import type { ReactNode } from 'react';

export function PageHeader({ title, right, back }: { title: string; right?: ReactNode; back?: string }) {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-30 flex items-center gap-2 border-b border-slate-200 bg-white/90 px-3 py-3 backdrop-blur">
      <button
        onClick={() => (back ? navigate(back) : navigate(-1))}
        className="-ml-1 rounded-lg p-1.5 text-slate-500 hover:bg-slate-100"
        aria-label="返回"
      >
        <ChevronLeft size={22} />
      </button>
      <h1 className="flex-1 truncate text-base font-semibold text-slate-800">{title}</h1>
      {right}
    </header>
  );
}
