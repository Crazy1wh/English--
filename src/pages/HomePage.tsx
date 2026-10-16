import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  BookMarked,
  CheckCircle2,
  Circle,
  Clock,
  Flame,
  Target,
  TrendingUp,
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import {
  allQuestions,
  allWords,
  buildDailyPlan,
  getPrediction,
  masteryStats,
  markPlanDone,
  questionsById,
} from '@/store/db';
import { daysUntil, todayStr } from '@/engine/date';
import { stageLabel } from '@/engine/stage';
import { studyStreak, weakTags, fastestProgress } from '@/engine/analytics';
import { KNOWLEDGE_TREE, EXAM_POINTS, GRAMMAR_TOPICS } from '@/data';
import type { PlanItem } from '@/types';
import { Chip, ProgressBar, SectionTitle } from '@/components/ui';

export function HomePage() {
  const s = useStore();
  const navigate = useNavigate();
  const plan = useMemo(() => buildDailyPlan(), [s]);
  const prediction = getPrediction();
  const stats = masteryStats();
  const days = daysUntil(s.settings.examDate);
  const today = todayStr();
  const todayLog = s.dayLogs[today];
  const streak = studyStreak(Object.keys(s.dayLogs));
  const dueWords = Object.values(s.wordProgress).filter((p) => p.due <= today).length;
  const dueWrongs = s.wrongs.filter((w) => !w.resolved && w.nextReviewAt <= today).length;
  const doneKeys = s.donePlanKeys[today] ?? [];

  const weak = weakTags(s.attempts, questionsById(), 2, 5);
  const progress = fastestProgress(s.attempts, questionsById(), today, 5);

  function itemRoute(item: PlanItem): string {
    const payload = item.payload as Record<string, unknown>;
    switch (item.activity) {
      case 'review_words':
      case 'new_words':
        return `/learn/words/study?ids=${(payload.wordIds as string[]).join(',')}`;
      case 'grammar':
        return `/learn/grammar/${payload.grammarId as string}`;
      case 'exam_point':
        return '/learn/points';
      case 'focused_practice':
        return `/practice/session?ids=${(payload.questionIds as string[]).join(',')}&title=${encodeURIComponent('专项训练')}`;
      case 'reading_cloze': {
        const ids = (payload.groupIds as string[]).flatMap((gid) =>
          allQuestions().filter((q) => q.groupId === gid).map((q) => q.id),
        );
        return `/practice/session?ids=${ids.join(',')}&title=${encodeURIComponent('阅读 / 完形')}`;
      }
      case 'wrong_questions': {
        const qids = (payload.wrongIds as string[])
          .map((wid) => s.wrongs.find((w) => w.id === wid)?.questionId)
          .filter(Boolean) as string[];
        return `/practice/session?wrong=1&ids=${qids.join(',')}&title=${encodeURIComponent('错题复习')}`;
      }
    }
  }

  function continueLearning() {
    const next = plan.items.find((i) => !doneKeys.includes(i.key));
    if (!next) return;
    markPlanDone(today, next.key);
    navigate(itemRoute(next));
  }

  const totalPlanMin = plan.items.reduce((sum, i) => sum + i.minutes, 0);
  const doneMin = plan.items.filter((i) => doneKeys.includes(i.key)).reduce((sum, i) => sum + i.minutes, 0);
  const wordsById = useMemo(() => new Map(allWords().map((w) => [w.id, w])), [s]);
  const mustWords = plan.mustKnow.words.map((id) => wordsById.get(id)?.word).filter(Boolean) as string[];

  return (
    <div className="px-4 pb-nav pt-4">
      {/* 顶部考试倒计时 */}
      <div className="rounded-2xl bg-gradient-to-br from-brand-600 to-brand-500 p-5 text-white shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-brand-100">距考试还有</div>
            <div className="mt-0.5 flex items-baseline gap-1">
              <span className="text-4xl font-bold tabular-nums">{days >= 0 ? days : 0}</span>
              <span className="text-sm text-brand-100">天</span>
            </div>
          </div>
          <div className="text-right text-xs text-brand-100">
            <Chip color="brand">{stageLabel(plan.stage)}</Chip>
            <div className="mt-2 flex items-center justify-end gap-1">
              <Target size={13} /> 目标 {s.settings.targetScore} 分
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-end justify-between border-t border-white/20 pt-3">
          <div>
            <div className="text-xs text-brand-100">预测英语</div>
            {prediction ? (
              <div className="text-2xl font-bold tabular-nums">
                {prediction.low}-{prediction.high}
                <span className="ml-1 text-xs font-normal text-brand-100">
                  分 · {prediction.basis === 'mock' ? '基于模考' : '基于练习'}
                </span>
              </div>
            ) : (
              <div className="mt-0.5 text-xs text-brand-50">数据不足，完成一次模拟考试后生成预测</div>
            )}
          </div>
          <Link to="/exams" className="rounded-lg bg-white/15 px-3 py-1.5 text-xs hover:bg-white/25">
            去模考
          </Link>
        </div>
      </div>

      {/* 今日学习 */}
      <SectionTitle
        extra={
          <span className="flex items-center gap-1 text-xs text-slate-400">
            <Clock size={13} /> 预计 {totalPlanMin} 分钟 · 已完成 {doneMin}
          </span>
        }
      >
        今日学习
      </SectionTitle>
      <div className="card p-4">
        <ProgressBar value={plan.items.length ? (doneKeys.length / plan.items.length) * 100 : 0} className="mb-3" />
        <div className="space-y-1">
          {plan.items.map((item) => {
            const done = doneKeys.includes(item.key);
            return (
              <button
                key={item.key}
                onClick={() => {
                  markPlanDone(today, item.key);
                  navigate(itemRoute(item));
                }}
                className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left hover:bg-slate-50"
              >
                {done ? <CheckCircle2 size={20} className="shrink-0 text-emerald-500" /> : <Circle size={20} className="shrink-0 text-slate-300" />}
                <span className={`flex-1 text-sm ${done ? 'text-slate-400 line-through' : 'text-slate-700'}`}>{item.title}</span>
                <span className="text-xs text-slate-400">
                  {item.count > 1 || item.activity.includes('words') || item.activity === 'focused_practice' || item.activity === 'wrong_questions' ? `${item.count} · ` : ''}
                  {item.minutes}分钟
                </span>
                <ArrowRight size={15} className="text-slate-300" />
              </button>
            );
          })}
          {plan.items.length === 0 && <p className="py-4 text-center text-sm text-slate-400">今天的内容都完成了，回来复习错题吧</p>}
        </div>
        <button onClick={continueLearning} className="btn-primary mt-3 w-full py-3 text-base">
          继续学习 <ArrowRight size={18} />
        </button>
      </div>

      {/* 今日必会 */}
      <SectionTitle>今日必会</SectionTitle>
      <div className="card p-4">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="col-span-2">
            <div className="mb-1 text-xs text-slate-400">5 个核心词</div>
            <div className="flex flex-wrap gap-1.5">
              {mustWords.map((w) => (
                <Link key={w} to="/learn/words" className="chip bg-brand-50 text-brand-700">
                  {w}
                </Link>
              ))}
            </div>
          </div>
          <div className="col-span-2">
            <div className="mb-1 text-xs text-slate-400">2 个固定搭配</div>
            <ul className="space-y-1 text-slate-600">
              {plan.mustKnow.collocations.map((c) => (
                <li key={c}>· {c}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-1 text-xs text-slate-400">语法点</div>
            <Link to={`/learn/grammar/${plan.mustKnow.grammarId}`} className="text-brand-600">
              {GRAMMAR_TOPICS.find((g) => g.id === plan.mustKnow.grammarId)?.title ?? '—'}
            </Link>
          </div>
          <div>
            <div className="mb-1 text-xs text-slate-400">安全句型</div>
            <p className="text-[13px] leading-5 text-slate-600">{plan.mustKnow.sentence}</p>
          </div>
        </div>
      </div>

      {/* 薄弱项 */}
      <SectionTitle extra={<Link to="/profile" className="text-xs text-brand-600">全部统计</Link>}>薄弱项</SectionTitle>
      <div className="card p-4">
        {weak.length === 0 && <p className="py-2 text-sm text-slate-400">多做几道题后，这里会显示最需要补的知识点。</p>}
        <div className="space-y-2.5">
          {weak.map((w) => {
            const name = tagName(w.tagId);
            return (
              <div key={w.tagId}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-slate-600">{name}</span>
                  <span className="text-slate-400">
                    {w.correct}/{w.total} · {Math.round(w.accuracy * 100)}%
                  </span>
                </div>
                <ProgressBar value={w.accuracy * 100} color="bg-rose-400" className="h-1.5" />
              </div>
            );
          })}
        </div>
      </div>

      {/* 最近进步 */}
      {progress.length > 0 && (
        <>
          <SectionTitle>最近进步</SectionTitle>
          <div className="card flex items-center gap-3 p-4">
            <TrendingUp className="text-emerald-500" size={20} />
            <div className="flex-1 text-sm text-slate-600">
              进步最快：<span className="font-medium text-slate-800">{tagName(progress[0]!.tagId)}</span>
              <span className="ml-1 text-emerald-600">+{Math.round(progress[0]!.delta * 100)}%</span>
            </div>
          </div>
        </>
      )}

      {/* 快捷统计 */}
      <div className="mt-5 grid grid-cols-3 gap-2">
        <div className="card flex flex-col items-center p-3">
          <Flame size={18} className="text-orange-500" />
          <span className="mt-1 text-lg font-bold tabular-nums">{streak}</span>
          <span className="text-xs text-slate-400">连续天数</span>
        </div>
        <div className="card flex flex-col items-center p-3">
          <Clock size={18} className="text-brand-500" />
          <span className="mt-1 text-lg font-bold tabular-nums">{Math.round(todayLog?.minutes ?? 0)}</span>
          <span className="text-xs text-slate-400">今日分钟</span>
        </div>
        <Link to="/wrongs" className="card flex flex-col items-center p-3">
          <BookMarked size={18} className="text-rose-400" />
          <span className="mt-1 text-lg font-bold tabular-nums">{dueWrongs}</span>
          <span className="text-xs text-slate-400">到期错题</span>
        </Link>
      </div>
      <p className="mt-3 text-center text-xs text-slate-400">
        已学词 {stats.learnedWords}/{stats.totalWords} · 待复习 {dueWords} · 本平台演示数据均非真题
      </p>
    </div>
  );
}

// 小工具：根据知识 id 找中文名
export function tagName(tagId: string): string {
  const node = KNOWLEDGE_TREE.find((n) => n.id === tagId);
  if (node) return node.displayName;
  const g = GRAMMAR_TOPICS.find((x) => tagId === x.knowledgeId || tagId.startsWith(x.knowledgeId + '.'));
  if (g) return g.title;
  const ep = EXAM_POINTS.find((x) => x.id === tagId);
  if (ep) return ep.title;
  const sectionNames: Record<string, string> = {
    Phonetics: '语音',
    Vocabulary: '词汇',
    Grammar: '语法',
    Cloze: '完形填空',
    Reading: '阅读理解',
    Dialogue: '补全对话',
    Writing: '写作',
  };
  return sectionNames[tagId] ?? tagId;
}


