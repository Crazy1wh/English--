import { Link, useParams } from 'react-router-dom';
import { AlertTriangle, ArrowRight, Lightbulb, ListChecks, Quote } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Chip, EmptyState, MasteryBar } from '@/components/ui';
import { GRAMMAR_TOPICS, SEED_QUESTIONS } from '@/data';
import { getMastery } from '@/store/db';
import { useStore } from '@/store/useStore';
import { ERROR_TYPE_LABELS } from '@/engine/error-predict';

export function GrammarTopicPage() {
  const { id } = useParams();
  const s = useStore();
  const topic = GRAMMAR_TOPICS.find((g) => g.id === id);
  if (!topic) {
    return (
      <div className="pb-nav">
        <PageHeader title="语法专题" back="/learn/grammar" />
        <div className="px-4 pt-6">
          <EmptyState title="未找到该专题" />
        </div>
      </div>
    );
  }

  const relatedQuestions = SEED_QUESTIONS.filter((q) =>
    q.knowledgeTags.some((t) => t === topic.knowledgeId || t.startsWith(topic.knowledgeId + '.')),
  ).slice(0, 8);

  const recentWrongs = s.wrongs
    .filter((w) => relatedQuestions.some((q) => q.id === w.questionId))
    .slice(-5)
    .reverse();

  return (
    <div className="pb-nav">
      <PageHeader title={`${topic.id} ${topic.title}`} back="/learn/grammar" />
      <div className="space-y-4 px-4 pt-4">
        {/* 掌握度 */}
        <div className="card p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600">我的掌握度</span>
            <Chip color={getMastery('grammar', topic.id) >= 80 ? 'green' : 'amber'}>
              {getMastery('grammar', topic.id)} 分
            </Chip>
          </div>
          <MasteryBar value={getMastery('grammar', topic.id)} />
        </div>

        {/* 1. 一句话核心规则 */}
        <section className="card p-4">
          <h3 className="font-semibold text-slate-800">一句话核心规则</h3>
          <p className="mt-2 text-[15px] leading-7 text-slate-700">{topic.rule}</p>
        </section>

        {/* 2. 核心公式 */}
        <section className="card p-4">
          <h3 className="font-semibold text-slate-800">核心公式</h3>
          <p className="mt-2 rounded-xl bg-brand-50 p-3 font-mono text-sm leading-6 text-brand-800">{topic.formula}</p>
        </section>

        {/* 3. 典型例句 + 4. 中文解释 */}
        <section className="card p-4">
          <h3 className="font-semibold text-slate-800">典型例句与解释</h3>
          <ul className="mt-2 space-y-2">
            {topic.examples.map((e, i) => (
              <li key={i} className="rounded-xl bg-slate-50 p-3 text-sm">
                <p className="text-slate-800">{e.en}</p>
                <p className="mt-0.5 text-slate-400">{e.zh}</p>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm leading-6 text-slate-600">{topic.explanation}</p>
        </section>

        {/* 5. 常见错误 */}
        <section className="card p-4">
          <h3 className="flex items-center gap-1.5 font-semibold text-slate-800">
            <AlertTriangle size={16} className="text-rose-500" /> 常见错误
          </h3>
          <ul className="mt-2 space-y-1.5 text-sm text-slate-600">
            {topic.commonMistakes.map((m, i) => (
              <li key={i} className="rounded-lg bg-rose-50/60 px-3 py-2">{m}</li>
            ))}
          </ul>
        </section>

        {/* 6. 易混知识点 */}
        {topic.confusions.length > 0 && (
          <section className="card p-4">
            <h3 className="flex items-center gap-1.5 font-semibold text-slate-800">
              <Lightbulb size={16} className="text-amber-500" /> 易混知识点
            </h3>
            <div className="mt-2 space-y-2 text-sm">
              {topic.confusions.map((c, i) => (
                <div key={i} className="rounded-xl bg-amber-50/60 p-3">
                  <span className="font-medium text-slate-700">{c.point}：</span>
                  <span className="text-slate-600">{c.detail}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 7. 真题示例槽位 */}
        <section className="card p-4">
          <h3 className="flex items-center gap-1.5 font-semibold text-slate-800">
            <Quote size={16} className="text-slate-400" /> 真题示例
          </h3>
          {topic.realExamQuestionIds.length > 0 ? (
            <p className="mt-2 text-sm text-slate-600">已关联 {topic.realExamQuestionIds.length} 道核验真题。</p>
          ) : (
            <p className="mt-2 text-sm leading-6 text-slate-400">
              暂无已核验真题。真题必须通过 抓取→来源留存→多源比对→人工核验 后才会出现在这里，AI 不会用模拟题冒充真题。
            </p>
          )}
        </section>

        {/* 8. 立即练习 */}
        <section className="card p-4">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-1.5 font-semibold text-slate-800">
              <ListChecks size={16} className="text-brand-500" /> 立即练习（{relatedQuestions.length} 题）
            </h3>
          </div>
          {relatedQuestions.length > 0 ? (
            <Link
              to={`/practice/session?ids=${relatedQuestions.map((q) => q.id).join(',')}&title=${encodeURIComponent(topic.title + ' 练习')}`}
              className="btn-primary mt-3 w-full"
            >
              开始练习 <ArrowRight size={16} />
            </Link>
          ) : (
            <p className="mt-2 text-sm text-slate-400">本专题演示题正在补充中。</p>
          )}
        </section>

        {/* 10. 最近错误记录 */}
        {recentWrongs.length > 0 && (
          <section className="card p-4">
            <h3 className="font-semibold text-slate-800">最近错误记录</h3>
            <ul className="mt-2 space-y-2">
              {recentWrongs.map((w) => {
                const q = relatedQuestions.find((x) => x.id === w.questionId);
                return (
                  <li key={w.id} className="text-sm">
                    <p className="line-clamp-2 text-slate-600">{q?.questionText.replace(/<[^>]+>/g, '')}</p>
                    <div className="mt-1">
                      <Chip color="red">{ERROR_TYPE_LABELS[w.userErrorType ?? w.predictedErrorType]}</Chip>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
