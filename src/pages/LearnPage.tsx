import { Link } from 'react-router-dom';
import { BookText, ChevronRight, Library, MessagesSquare, PenTool, Sparkles, Volume2 } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { allWords, getMastery } from '@/store/db';
import { averageMastery } from '@/engine/mastery';
import { GRAMMAR_TOPICS, EXAM_POINTS, DIALOGUE_SCENES, WRITING_KITS } from '@/data';
import { MasteryBar } from '@/components/ui';
import { todayStr } from '@/engine/date';

export function LearnPage() {
  const s = useStore();
  const today = todayStr();
  const dueWords = Object.values(s.wordProgress).filter((p) => p.due <= today).length;
  const learned = Object.keys(s.wordProgress).length;
  const grammarRate = averageMastery(GRAMMAR_TOPICS.map((g) => getMastery('grammar', g.id)));

  const entries = [
    {
      to: '/learn/words',
      icon: BookText,
      title: '词汇',
      desc: `已学 ${learned}/${allWords().length} · 待复习 ${dueWords}`,
      color: 'bg-brand-50 text-brand-600',
    },
    {
      to: '/learn/grammar',
      icon: Library,
      title: '语法 22 讲',
      desc: `P0 高频优先 · 掌握度 ${grammarRate}`,
      color: 'bg-emerald-50 text-emerald-600',
      extra: <MasteryBar value={grammarRate} size="sm" />,
    },
    {
      to: '/learn/points',
      icon: Sparkles,
      title: '高频考点',
      desc: `${EXAM_POINTS.length} 个考点 · 真题统计接入前不显示频次`,
      color: 'bg-amber-50 text-amber-600',
    },
    {
      to: '/learn/dialogue',
      icon: MessagesSquare,
      title: '补全对话',
      desc: `${DIALOGUE_SCENES.length} 个情景常用表达`,
      color: 'bg-purple-50 text-purple-600',
    },
    {
      to: '/learn/writing',
      icon: PenTool,
      title: '短文写作',
      desc: `${WRITING_KITS.length} 类作文 · 功能句 + 安全句型 + 评分`,
      color: 'bg-rose-50 text-rose-600',
    },
    {
      to: '/learn/grammar/G22',
      icon: Volume2,
      title: '语音基础',
      desc: '元音/辅音辨音、单词重音（在刷题-语音中练习）',
      color: 'bg-sky-50 text-sky-600',
    },
  ];

  return (
    <div className="px-4 pb-nav pt-4">
      <h1 className="mb-4 text-xl font-bold text-slate-800">学习</h1>
      <div className="space-y-3">
        {entries.map((e) => (
          <Link key={e.to} to={e.to} className="card flex items-center gap-3 p-4 hover:bg-slate-50">
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${e.color}`}>
              <e.icon size={22} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-medium text-slate-800">{e.title}</div>
              <div className="mt-0.5 truncate text-xs text-slate-400">{e.desc}</div>
              {e.extra && <div className="mt-1.5 w-40">{e.extra}</div>}
            </div>
            <ChevronRight className="shrink-0 text-slate-300" size={18} />
          </Link>
        ))}
      </div>
      <p className="mt-4 rounded-xl bg-slate-100 p-3 text-xs leading-5 text-slate-500">
        内容说明：语法/对话/写作内容为人工编写的通用知识；词汇为手工演示词库（非官方 3800 词表），
        核验后的大纲词表与真题请在「我的 → 内容管理」中导入。
      </p>
    </div>
  );
}
