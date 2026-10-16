import { Link } from 'react-router-dom';
import { AlertCircle, CheckCircle2, Clock, Play } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Chip, EmptyState } from '@/components/ui';
import { questionsById, setUserErrorType } from '@/store/db';
import { useStore } from '@/store/useStore';
import { ERROR_TYPE_LABELS } from '@/engine/error-predict';
import type { ErrorType } from '@/types';
import { todayStr } from '@/engine/date';

export function WrongsPage() {
  const s = useStore();
  const qmap = questionsById();
  const today = todayStr();
  const openWrongs = s.wrongs.filter((w) => !w.resolved);
  const dueWrongs = openWrongs.filter((w) => w.nextReviewAt <= today);
  const laterWrongs = openWrongs.filter((w) => w.nextReviewAt > today);

  return (
    <div className="pb-nav">
      <PageHeader title="错题本" back="/practice" />
      <div className="space-y-4 px-4 pt-3">
        <div className="card flex items-center justify-between p-4">
          <div>
            <div className="text-sm text-slate-500">今日到期复习</div>
            <div className="text-2xl font-bold text-rose-500">{dueWrongs.length}</div>
          </div>
          {dueWrongs.length > 0 ? (
            <Link
              to={`/practice/session?wrong=1&ids=${dueWrongs.map((w) => w.questionId).join(',')}&title=${encodeURIComponent('错题复习')}`}
              className="btn-primary"
            >
              <Play size={16} /> 开始复习
            </Link>
          ) : (
            <Chip color="green">今日已清空</Chip>
          )}
        </div>

        <div>
          <h2 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-slate-500">
            <AlertCircle size={14} className="text-rose-400" /> 待复习错题（{openWrongs.length}）
          </h2>
          <div className="space-y-2">
            {dueWrongs.map((w) => {
              const q = qmap.get(w.questionId);
              if (!q) return null;
              return (
                <div key={w.id} className="card p-3.5">
                  <p className="line-clamp-2 text-sm text-slate-700">{q.questionText.replace(/<[^>]+>/g, '')}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Chip color="red">{ERROR_TYPE_LABELS[w.userErrorType ?? w.predictedErrorType]}</Chip>
                    <span className="text-xs text-slate-400">
                      {w.resolved ? '已掌握' : `复习阶段 第${w.stage + 1} 次`}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <label className="flex items-center gap-1.5 text-xs text-slate-400">
                      修正错误类型
                      <select
                        className="input py-1 text-xs"
                        value={w.userErrorType ?? ''}
                        onChange={(e) => setUserErrorType(w.id, (e.target.value || null) as ErrorType | null)}
                      >
                        <option value="">用系统判断：{ERROR_TYPE_LABELS[w.predictedErrorType]}</option>
                        {Object.entries(ERROR_TYPE_LABELS).map(([val, label]) => (
                          <option key={val} value={val}>{label}</option>
                        ))}
                      </select>
                    </label>
                    <Link
                      to={`/practice/session?wrong=1&ids=${w.questionId}&title=${encodeURIComponent('错题复习')}`}
                      className="btn-outline px-3 py-1.5 text-xs"
                    >
                      复习
                    </Link>
                  </div>
                </div>
              );
            })}
            {dueWrongs.length === 0 && (
              <EmptyState
                icon={<CheckCircle2 size={36} className="mx-auto text-emerald-400" />}
                title="没有到期错题"
                desc="间隔复习会在 次日/3天/7天/14天 后自动把错题再安排回来"
              />
            )}
          </div>
        </div>

        {laterWrongs.length > 0 && (
          <div>
            <h2 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-slate-500">
              <Clock size={14} className="text-slate-400" /> 以后再复习（{laterWrongs.length}）
            </h2>
            <div className="space-y-2">
              {laterWrongs.map((w) => {
                const q = qmap.get(w.questionId);
                if (!q) return null;
                return (
                  <div key={w.id} className="card flex items-center justify-between p-3 opacity-75">
                    <p className="line-clamp-1 flex-1 pr-2 text-sm text-slate-500">{q.questionText.replace(/<[^>]+>/g, '')}</p>
                    <span className="shrink-0 text-xs text-slate-400">{w.nextReviewAt}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {s.wrongs.length === 0 && <EmptyState title="还没有错题" desc="刷题中答错的题会自动进入错题本" />}
      </div>
    </div>
  );
}
