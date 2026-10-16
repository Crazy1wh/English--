import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Database, Flame, Settings as SettingsIcon, Target, TrendingUp } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { allWords, getPrediction, masteryStats, questionsById } from '@/store/db';
import { isDue } from '@/engine/forgetting';
import { fastestProgress, recentAccuracy, studyStreak, weakTags } from '@/engine/analytics';
import { todayStr } from '@/engine/date';
import { tagName } from './HomePage';
import { MasteryBar } from '@/components/ui';

export function ProfilePage() {
  const s = useStore();
  const today = todayStr();
  const stats = masteryStats();
  const prediction = getPrediction();
  const qmap = questionsById();

  const activeDates = [
    ...new Set([
      ...s.attempts.map((a) => a.at.slice(0, 10)),
      ...Object.keys(s.dayLogs),
      ...Object.values(s.wordProgress).map((w) => w.lastReviewAt).filter((d): d is string => !!d),
    ]),
  ];
  const streak = studyStreak(activeDates, today);
  const todayMin = s.dayLogs[today]?.minutes ?? 0;
  const weekAcc = recentAccuracy(s.attempts, 7, today);
  const weak = weakTags(s.attempts, qmap, 2, 5);
  const progress = fastestProgress(s.attempts, qmap, today, 5);
  const dueWords = allWords().filter((w) => isDue(s.wordProgress[w.id] ?? null, today)).length;
  const dueWrongs = s.wrongs.filter((w) => !w.resolved && w.nextReviewAt <= today).length;

  const realExamAttempts = s.attempts.filter((a) => qmap.get(a.questionId)?.isRealExam);
  const realCorrect = realExamAttempts.filter((a) => a.correct).length;

  const rates: Array<[string, number]> = [
    ['词汇', stats.wordRate],
    ['语法', stats.grammarRate],
    ['完形', stats.clozeRate],
    ['阅读', stats.readingRate],
    ['对话', stats.dialogueRate],
    ['写作', stats.writing ?? 0],
  ];

  return (
    <div className="px-4 pb-nav pt-4">
      <h1 className="mb-4 text-xl font-bold text-slate-800">我的</h1>

      {/* 分数预测 */}
      <section className="card p-5">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-sm text-slate-500">
            <Target size={15} className="text-brand-500" /> 预测分数区间（满分 150）
          </span>
          <span className="text-xs text-slate-300">目标 {s.settings.targetScore}</span>
        </div>
        {prediction ? (
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-4xl font-bold text-brand-600">
              {prediction.low}–{prediction.high}
            </span>
            <span className="text-xs text-slate-400">
              中位 {prediction.mid} · 置信 {Math.round(prediction.confidence * 100)}% · 依据{prediction.basis === 'mock' ? '模考' : '练习'}
            </span>
          </div>
        ) : (
          <p className="mt-2 text-sm text-slate-400">数据不足，累计 60+ 题（含一次模考）后生成预测区间</p>
        )}
      </section>

      {/* 核心数据 */}
      <section className="mt-3 grid grid-cols-4 gap-2 text-center">
        <Metric label="连续天数" value={`${streak}`} unit="天" icon={<Flame size={14} className="text-orange-400" />} />
        <Metric label="今日时长" value={`${todayMin}`} unit="分" />
        <Metric label="累计答题" value={`${s.attempts.length}`} unit="题" />
        <Metric label="近7天正确率" value={s.attempts.length ? `${Math.round(weekAcc * 100)}` : '—'} unit="%" />
      </section>

      {/* 真题正确率 */}
      <section className="card mt-3 flex items-center justify-between p-4">
        <span className="text-sm text-slate-600">真题正确率</span>
        <span className="text-sm font-medium">
          {realExamAttempts.length > 0 ? `${Math.round((realCorrect / realExamAttempts.length) * 100)}%（${realExamAttempts.length} 题）` : '暂无真题数据'}
        </span>
      </section>

      {/* 板块掌握率 */}
      <section className="card mt-3 p-4">
        <h3 className="mb-3 text-sm font-semibold text-slate-700">板块掌握率</h3>
        <div className="space-y-2.5">
          {rates.map(([label, v]) => (
            <div key={label} className="flex items-center gap-3 text-sm">
              <span className="w-10 shrink-0 text-slate-500">{label}</span>
              <div className="flex-1"><MasteryBar value={v} size="sm" /></div>
              <span className="w-8 text-right text-xs tabular-nums text-slate-400">{v}</span>
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs text-slate-400">
          词汇 {stats.learnedWords}/{stats.totalWords} 个已学 · 待复习 {dueWords} 个 · 到期错题 {dueWrongs} 道
        </p>
      </section>

      {/* 薄弱 Top5 / 进步 Top5 */}
      <div className="mt-3 grid gap-3">
        <section className="card p-4">
          <h3 className="mb-2 text-sm font-semibold text-rose-500">薄弱知识点 Top5</h3>
          {weak.length === 0 ? (
            <p className="text-xs text-slate-400">再做几道题，这里会列出正确率最低的知识点</p>
          ) : (
            <ul className="space-y-1.5 text-sm">
              {weak.map((w) => (
                <li key={w.tagId} className="flex justify-between text-slate-600">
                  <span>{tagName(w.tagId)}</span>
                  <span className="text-xs text-rose-400">{Math.round(w.accuracy * 100)}%（{w.total} 题）</span>
                </li>
              ))}
            </ul>
          )}
        </section>
        <section className="card p-4">
          <h3 className="mb-2 flex items-center gap-1 text-sm font-semibold text-emerald-600">
            <TrendingUp size={14} /> 进步最快 Top5
          </h3>
          {progress.length === 0 ? (
            <p className="text-xs text-slate-400">持续学习一周后这里会显示进步曲线</p>
          ) : (
            <ul className="space-y-1.5 text-sm">
              {progress.map((p) => (
                <li key={p.tagId} className="flex justify-between text-slate-600">
                  <span>{tagName(p.tagId)}</span>
                  <span className="text-xs text-emerald-500">+{Math.round(p.delta * 100)}% → {Math.round(p.current * 100)}%</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* 入口 */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Link to="/settings" className="card flex items-center gap-2 p-4 hover:bg-slate-50">
          <SettingsIcon size={18} className="text-slate-500" />
          <span className="text-sm font-medium">设置</span>
        </Link>
        <Link to="/admin" className="card flex items-center gap-2 p-4 hover:bg-slate-50">
          <Database size={18} className="text-slate-500" />
          <span className="text-sm font-medium">内容管理 / 导入</span>
        </Link>
      </div>

      <p className="mt-4 text-center text-xs text-slate-300">数据仅保存在本浏览器（localStorage），可在设置中导出备份</p>
    </div>
  );
}

function Metric({ label, value, unit, icon }: { label: string; value: string; unit: string; icon?: ReactNode }) {
  return (
    <div className="card p-3">
      <div className="flex items-center justify-center gap-1 text-xs text-slate-400">
        {icon}{label}
      </div>
      <div className="mt-1 text-lg font-bold text-slate-800">
        {value}<span className="ml-0.5 text-xs font-normal text-slate-400">{unit}</span>
      </div>
    </div>
  );
}
