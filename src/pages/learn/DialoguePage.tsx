import { useState } from 'react';
import { MessagesSquare } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { EmptyState, MasteryBar } from '@/components/ui';
import { DIALOGUE_SCENES, SEED_QUESTIONS } from '@/data';
import { getMastery } from '@/store/db';
import { useStore } from '@/store/useStore';
import type { DialogueScene } from '@/types';
import { Link } from 'react-router-dom';

export function DialoguePage() {
  useStore();
  const [active, setActive] = useState<DialogueScene | null>(null);
  return (
    <div className="pb-nav">
      <PageHeader title={`补全对话 · ${DIALOGUE_SCENES.length} 情景`} back="/learn" />
      <div className="px-4 pt-3">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {DIALOGUE_SCENES.map((d) => (
            <button key={d.id} onClick={() => setActive(d)} className="card p-3 text-left hover:bg-slate-50">
              <MessagesSquare size={18} className="text-purple-500" />
              <div className="mt-1.5 text-sm font-medium text-slate-800">{d.title}</div>
              <div className="mt-1 text-xs text-slate-400">{d.id}</div>
            </button>
          ))}
        </div>

        {active && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 sm:items-center" onClick={() => setActive(null)}>
            <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white p-5 sm:rounded-3xl" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-lg font-semibold">{active.title}</h3>
              <div className="mt-2 mb-3 flex items-center gap-3 text-xs text-slate-400">
                <span>掌握度</span>
                <div className="w-32">
                  <MasteryBar value={getMastery('dialogue_scene', active.id)} size="sm" />
                </div>
              </div>
              <ul className="space-y-2">
                {active.expressions.map((e, i) => (
                  <li key={i} className="rounded-xl bg-slate-50 p-3 text-sm">
                    <p className="text-slate-800">{e.en}</p>
                    <p className="mt-0.5 text-slate-400">{e.zh}</p>
                  </li>
                ))}
              </ul>
              {SEED_QUESTIONS.some((q) => q.knowledgeTags.includes(active.knowledgeId)) ? (
                <Link
                  to={`/practice/session?ids=${SEED_QUESTIONS.filter((q) => q.knowledgeTags.includes(active.knowledgeId)).map((q) => q.id).join(',')}&title=${encodeURIComponent(active.title)}`}
                  className="btn-primary mt-4 w-full"
                >
                  练这个情景
                </Link>
              ) : (
                <div className="mt-4">
                  <EmptyState title="该情景暂无演示题" desc="可在内容管理中导入更多对话题目" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
