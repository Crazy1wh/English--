import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2, Sparkles } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Chip, EmptyState } from '@/components/ui';
import { WRITING_KITS } from '@/data';
import { addEssay } from '@/store/db';
import { useStore } from '@/store/useStore';
import { gradeEssay, type EssayGrade } from '@/lib/ai';
import { nowIso } from '@/engine/date';
import type { EssaySubmission } from '@/types';

export function WritingKitPage() {
  const { id } = useParams();
  const s = useStore();
  const kit = WRITING_KITS.find((k) => k.id === id);
  const [text, setText] = useState('');
  const [result, setResult] = useState<EssayGrade | null>(null);
  const [loading, setLoading] = useState(false);

  if (!kit) {
    return (
      <div className="pb-nav">
        <PageHeader title="写作" back="/learn/writing" />
        <div className="px-4 pt-6"><EmptyState title="未找到该写作类型" /></div>
      </div>
    );
  }

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const aiReady = !!s.settings.ai.baseUrl && !!s.settings.ai.apiKey;

  async function grade() {
    setLoading(true);
    // 已配置 OpenAI-compatible 端点则走 AI，否则 gradeEssay 内部自动降级为本地评分
    const r = await gradeEssay(s.settings.ai, kit!.sampleEssay.prompt, text);
    setResult(r);
    const essay: EssaySubmission = {
      id: `e.${Date.now()}`,
      at: nowIso(),
      kitId: kit!.id,
      prompt: kit!.sampleEssay.prompt,
      text,
      gradedBy: r.by === 'ai' ? `ai:${s.settings.ai.model}` : 'local',
      scores: r.scores,
      totalEstimate: r.totalEstimate,
      mainErrors: r.mainErrors,
      suggestions: r.suggestions,
      revisedText: r.revisedText,
    };
    addEssay(essay);
    setLoading(false);
  }

  return (
    <div className="pb-nav">
      <PageHeader title={kit.title} back="/learn/writing" />
      <div className="space-y-4 px-4 pt-4">
        {/* W1 格式 */}
        <section className="card p-4">
          <h3 className="font-semibold text-slate-800">格式骨架</h3>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-slate-600">
            {kit.format.map((f, i) => <li key={i}>{f}</li>)}
          </ol>
        </section>

        {/* W2 功能表达 */}
        <section className="card p-4">
          <h3 className="font-semibold text-slate-800">功能表达</h3>
          <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
            {kit.functionalExpressions.map((f, i) => (
              <li key={i} className="rounded-lg bg-brand-50/70 px-3 py-1.5">{f}</li>
            ))}
          </ul>
        </section>

        {/* W3 连接 + W4 安全句型 */}
        <section className="card p-4">
          <h3 className="font-semibold text-slate-800">连接表达 & 安全句型</h3>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {kit.connectors.map((c) => <Chip key={c} color="amber">{c}</Chip>)}
          </div>
          <ul className="mt-3 space-y-1.5 text-sm text-slate-700">
            {kit.safeSentences.map((f, i) => (
              <li key={i} className="rounded-lg bg-emerald-50/70 px-3 py-1.5">{f}</li>
            ))}
          </ul>
        </section>

        {/* 范文 */}
        {kit.sampleEssay.text && (
          <section className="card p-4">
            <h3 className="font-semibold text-slate-800">参考范文</h3>
            <p className="mb-2 mt-1 text-xs text-slate-400">{kit.sampleEssay.prompt}</p>
            <pre className="whitespace-pre-wrap font-sans text-sm leading-7 text-slate-600">{kit.sampleEssay.text}</pre>
          </section>
        )}

        {/* 写作练习 + 评分 */}
        <section className="card p-4">
          <h3 className="font-semibold text-slate-800">动手写并评分</h3>
          <p className="mb-2 mt-1 text-xs text-slate-400">{kit.sampleEssay.prompt}</p>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={10}
            placeholder="在这里写你的作文…建议 90-120 词"
            className="input leading-6"
          />
          <div className="mt-1 flex items-center justify-between text-xs text-slate-400">
            <span>{wordCount} 词</span>
            <span>{aiReady ? `AI：${s.settings.ai.model}` : '未配置 AI，使用本地启发式评分'}</span>
          </div>
          <button className="btn-primary mt-3 w-full" disabled={wordCount < 10 || loading} onClick={grade}>
            {loading ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
            {aiReady ? 'AI 评分 + 修改建议' : '本地评分（配置 AI 后可获得修改版作文）'}
          </button>

          {result && (
            <div className="mt-4 space-y-3 rounded-2xl bg-slate-50 p-4 fade-in">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">估算质量分（0-100，非官方分值）</span>
                <span className="text-2xl font-bold text-brand-600">{result.totalEstimate}</span>
              </div>
              <div className="space-y-1.5 text-sm">
                {([
                  ['content', '内容完整度'],
                  ['structure', '结构'],
                  ['grammar', '语法'],
                  ['vocabulary', '词汇'],
                  ['format', '格式'],
                ] as const).map(([k, label]) => (
                  <div key={k} className="flex items-center gap-2">
                    <span className="w-20 text-slate-500">{label}</span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
                      <div className="h-full rounded-full bg-brand-500" style={{ width: `${result.scores[k]}%` }} />
                    </div>
                    <span className="w-8 text-right tabular-nums text-slate-400">{result.scores[k]}</span>
                  </div>
                ))}
              </div>
              {result.mainErrors.length > 0 && (
                <div>
                  <div className="text-sm font-medium text-rose-600">主要错误</div>
                  <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm text-slate-600">
                    {result.mainErrors.map((e, i) => <li key={i}>{e}</li>)}
                  </ul>
                </div>
              )}
              <div>
                <div className="text-sm font-medium text-slate-700">修改建议</div>
                <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm text-slate-600">
                  {result.suggestions.map((e, i) => <li key={i}>{e}</li>)}
                </ul>
              </div>
              {result.revisedText && (
                <div>
                  <div className="text-sm font-medium text-emerald-700">考场可用的修改版（保持成考难度）</div>
                  <pre className="mt-1 whitespace-pre-wrap rounded-xl bg-white p-3 font-sans text-sm leading-6 text-slate-600">{result.revisedText}</pre>
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
