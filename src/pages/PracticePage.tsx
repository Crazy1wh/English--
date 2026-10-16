import { Link, useSearchParams } from 'react-router-dom';
import { BookOpen, FileText, MessagesSquare, PenLine, Volume2 } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Chip, EmptyState } from '@/components/ui';
import { allQuestions } from '@/store/db';
import { useStore } from '@/store/useStore';
import { tagName } from './HomePage';
import { weakTags } from '@/engine/analytics';
import { questionsById } from '@/store/db';

const SECTIONS = [
  { key: 'Phonetics', label: '语音辨音', icon: Volume2, color: 'bg-sky-50 text-sky-600' },
  { key: 'Vocabulary', label: '词汇与搭配', icon: BookOpen, color: 'bg-brand-50 text-brand-600' },
  { key: 'Grammar', label: '语法单选', icon: PenLine, color: 'bg-emerald-50 text-emerald-600' },
  { key: 'Cloze', label: '完形填空', icon: FileText, color: 'bg-amber-50 text-amber-600' },
  { key: 'Reading', label: '阅读理解', icon: BookOpen, color: 'bg-purple-50 text-purple-600' },
  { key: 'Dialogue', label: '补全对话', icon: MessagesSquare, color: 'bg-rose-50 text-rose-600' },
] as const;

export function PracticePage() {
  const s = useStore();
  const [params] = useSearchParams();
  const questions = allQuestions();
  const focusTag = params.get('tag');

  // 按篇分组（完形/阅读）
  const groups = new Map<string, { title: string; section: string; ids: string[] }>();
  for (const q of questions) {
    if (!q.groupId) continue;
    const g = groups.get(q.groupId) ?? { title: q.groupTitle ?? q.groupId, section: q.section, ids: [] };
    g.ids.push(q.id);
    groups.set(q.groupId, g);
  }

  const weak = weakTags(s.attempts, questionsById(), 2, 3);

  const sessionLink = (ids: string[], title: string, extra = '') =>
    `/practice/session?ids=${ids.join(',')}&title=${encodeURIComponent(title)}${extra}`;

  return (
    <div className="pb-nav">
      <PageHeader title="刷题" back="/" />
      <div className="space-y-4 px-4 pt-3">
        {focusTag && (
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-400">同类题专项</div>
                <div className="font-medium text-slate-800">{tagName(focusTag)}</div>
              </div>
              <Chip color="brand">
                {questions.filter((q) => q.knowledgeTags.some((t) => t === focusTag || t.startsWith(focusTag))).length} 题
              </Chip>
            </div>
            <Link
              className="btn-primary mt-3 w-full"
              to={sessionLink(
                questions.filter((q) => q.knowledgeTags.some((t) => t === focusTag || t.startsWith(focusTag) || focusTag.startsWith(t))).map((q) => q.id),
                tagName(focusTag) + ' 专项',
              )}
            >
              开始这组专项
            </Link>
          </div>
        )}

        {/* 题型入口 */}
        <div>
          <h2 className="mb-2 text-sm font-semibold text-slate-500">按题型刷</h2>
          <div className="grid grid-cols-2 gap-2">
            {SECTIONS.map((sec) => {
              const ids = questions.filter((q) => q.section === sec.key).map((q) => q.id);
              return (
                <Link key={sec.key} to={sessionLink(ids, sec.label)} className="card flex items-center gap-3 p-4 hover:bg-slate-50">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${sec.color}`}>
                    <sec.icon size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-800">{sec.label}</div>
                    <div className="text-xs text-slate-400">{ids.length} 题</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* 薄弱专项 */}
        {weak.length > 0 && (
          <div>
            <h2 className="mb-2 text-sm font-semibold text-slate-500">针对你的薄弱项</h2>
            <div className="card divide-y divide-slate-100">
              {weak.map((w) => {
                const ids = questions
                  .filter((q) => q.knowledgeTags.some((t) => t === w.tagId || t.startsWith(w.tagId) || w.tagId.startsWith(t)))
                  .map((q) => q.id);
                return (
                  <Link key={w.tagId} to={sessionLink(ids, tagName(w.tagId) + ' 补强')} className="flex items-center justify-between p-3.5">
                    <span className="text-sm text-slate-700">{tagName(w.tagId)}</span>
                    <span className="text-xs text-rose-500">正确率 {Math.round(w.accuracy * 100)}% →</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* 整篇训练 */}
        <div>
          <h2 className="mb-2 text-sm font-semibold text-slate-500">整篇训练（阅读 / 完形）</h2>
          <div className="space-y-2">
            {[...groups.values()].map((g) => (
              <Link key={g.title} to={sessionLink(g.ids, g.title)} className="card flex items-center justify-between p-4 hover:bg-slate-50">
                <div>
                  <div className="text-sm font-medium text-slate-800">{g.title}</div>
                  <div className="mt-0.5 text-xs text-slate-400">
                    {g.section === 'Reading' ? '阅读理解' : '完形填空'} · {g.ids.length} 题
                  </div>
                </div>
                <Chip color={g.section === 'Reading' ? 'purple' : 'amber'}>整篇</Chip>
              </Link>
            ))}
          </div>
        </div>

        <Link to="/wrongs" className="card block p-4">
          <h2 className="text-sm font-semibold text-slate-800">错题本</h2>
          <p className="mt-1 text-xs text-slate-400">
            到期错题 {s.wrongs.filter((w) => !w.resolved && w.nextReviewAt <= new Date().toISOString().slice(0, 10)).length} 道 · 按 当天→次日→3天→7天→14天 间隔复习
          </p>
        </Link>

        {questions.every((q) => !q.isRealExam) && (
          <EmptyState title="当前题库暂无已核验真题" desc="真题需经 来源留存→多源比对→人工核验 流程导入后，会在此与演示题区分展示" />
        )}
      </div>
    </div>
  );
}
