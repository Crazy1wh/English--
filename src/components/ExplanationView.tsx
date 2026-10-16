import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, HelpCircle, Lightbulb, MessageCircle, Wand2 } from 'lucide-react';
import type { Question } from '@/types';
import { Chip } from './ui';
import { GRAMMAR_TOPICS } from '@/data';
import { useStore } from '@/store/useStore';
import { explainQuestion } from '@/lib/ai';
import { ERROR_TYPE_LABELS } from '@/engine/error-predict';
import type { ErrorType } from '@/types';

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

export function ExplanationView({ q, wrongId, onFixErrorType }: { q: Question; wrongId?: string; onFixErrorType?: (t: ErrorType) => void }) {
  const e = q.explanation;
  const s = useStore();
  const [aiText, setAiText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function ask(question: string) {
    setLoading(true);
    setAiText(null);
    const r = await explainQuestion(s.settings.ai, q, question);
    setAiText(`（${r.by === 'ai' ? 'AI 讲解' : '本地讲解'}）\n${r.text}`);
    setLoading(false);
  }

  const grammarTopic = GRAMMAR_TOPICS.find((g) => q.knowledgeTags.some((t) => t === g.knowledgeId || t.startsWith(g.knowledgeId + '.')));

  return (
    <div className="mt-4 space-y-3 rounded-2xl bg-slate-50 p-4 text-sm fade-in">
      <div className="flex flex-wrap items-center gap-2">
        <Chip color="green">正确答案 {q.answer}</Chip>
        <span className="font-medium text-slate-800">{e.conclusion}</span>
      </div>

      <div>
        <div className="mb-1 font-medium text-slate-700">核心考点</div>
        <p className="text-slate-600">{e.keyPoint}</p>
      </div>
      <p className="text-slate-600">{e.whyCorrect}</p>

      {e.whyWrong.length > 0 && (
        <div>
          <div className="mb-1 font-medium text-slate-700">干扰项分析</div>
          <ul className="space-y-1">
            {e.whyWrong.map((w) => (
              <li key={w.option} className="flex gap-2 text-slate-600">
                <span className="font-semibold text-rose-500">{w.option}.</span>
                <span>{w.reason}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 阅读四步法 */}
      {q.section === 'Reading' && (
        <div className="rounded-xl bg-white p-3 ring-1 ring-slate-200">
          <div className="mb-1 font-medium text-slate-700">定位与同义替换</div>
          {e.keywords && <p className="text-slate-600">关键词：{e.keywords.join('；')}</p>}
          {e.locationSentence && <p className="mt-1 text-slate-600">原文定位：<span className="rounded bg-amber-50 px-1">{e.locationSentence}</span></p>}
          {e.evidence && <p className="mt-1 text-slate-600">证据：{e.evidence}</p>}
          {e.paraphrase && <p className="mt-1 text-slate-600">同义替换：{e.paraphrase}</p>}
        </div>
      )}

      {/* 语法规则卡 */}
      {(e.rule || grammarTopic) && (
        <div className="rounded-xl bg-white p-3 ring-1 ring-slate-200">
          <div className="mb-1 flex items-center gap-1 font-medium text-slate-700">
            <BookOpen size={15} className="text-brand-500" /> 规则公式
          </div>
          <p className="text-slate-600">{e.rule ?? grammarTopic?.formula}</p>
          {e.ruleExample && (
            <p className="mt-1 text-slate-600">
              {e.ruleExample.en} <span className="text-slate-400">（{e.ruleExample.zh}）</span>
            </p>
          )}
        </div>
      )}

      {/* 词汇卡 */}
      {(e.collocations?.length || e.confusing?.length) && (
        <div className="rounded-xl bg-white p-3 ring-1 ring-slate-200">
          {e.collocations?.length ? (
            <p className="text-slate-600">常用搭配：{e.collocations.join('；')}</p>
          ) : null}
          {e.confusing?.length ? <p className="mt-1 text-slate-600">易混辨析：{e.confusing.join('；')}</p> : null}
        </div>
      )}

      {e.mnemonic && (
        <p className="flex items-start gap-1.5 text-slate-600">
          <Lightbulb size={15} className="mt-0.5 shrink-0 text-amber-500" /> 记忆技巧：{e.mnemonic}
        </p>
      )}

      {grammarTopic && (
        <Link to={`/learn/grammar/${grammarTopic.id}`} className="inline-flex items-center gap-1 text-brand-600">
          <BookOpen size={14} /> 去看语法专题：{grammarTopic.title}
        </Link>
      )}

      {/* 错误类型修正 */}
      {wrongId && onFixErrorType && (
        <div className="rounded-xl bg-white p-3 ring-1 ring-slate-200">
          <div className="mb-1.5 text-xs text-slate-500">这道题为什么错？（系统已预测，可修改）</div>
          <select
            className="input py-1.5 text-sm"
            defaultValue=""
            onChange={(ev) => ev.target.value && onFixErrorType(ev.target.value as ErrorType)}
          >
            <option value="" disabled>
              选择错误原因…
            </option>
            {(Object.keys(ERROR_TYPE_LABELS) as ErrorType[]).map((t) => (
              <option key={t} value={t}>
                {t} {ERROR_TYPE_LABELS[t]}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* AI / 本地讲解 */}
      <div className="rounded-xl border border-dashed border-slate-300 p-3">
        <div className="mb-2 flex items-center gap-1.5 text-xs text-slate-500">
          <MessageCircle size={14} /> 还不懂？追问（{s.settings.ai.baseUrl ? 'AI 已配置' : '未配置 AI，使用本地讲解'}）
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="btn-ghost px-3 py-1.5 text-xs" onClick={() => ask('我还是不懂，请用最简单的话再解释一遍。')}>
            <HelpCircle size={14} /> 再简单解释
          </button>
          {q.options.map((_, i) => (
            <button key={i} className="btn-ghost px-3 py-1.5 text-xs" onClick={() => ask(`为什么不能选${LETTERS[i]}？`)}>
              为什么不能选 {LETTERS[i]}
            </button>
          ))}
          <Link className="btn-ghost px-3 py-1.5 text-xs" to={`/practice?tag=${encodeURIComponent(q.knowledgeTags[0] ?? q.questionType)}`}>
            <Wand2 size={14} /> 练同类题
          </Link>
        </div>
        {loading && <p className="mt-2 text-xs text-slate-400">讲解生成中…</p>}
        {aiText && <pre className="mt-2 whitespace-pre-wrap font-sans text-sm text-slate-600">{aiText}</pre>}
      </div>
    </div>
  );
}
