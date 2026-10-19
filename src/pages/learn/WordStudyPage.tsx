import { useMemo, useState, type ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Check, ChevronRight, RotateCcw, Volume2, X } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { allWords, gradeWord } from '@/store/db';
import { useStore } from '@/store/useStore';
import { isDue } from '@/engine/forgetting';
import { todayStr } from '@/engine/date';
import { speak } from '@/lib/speech';
import type { Word, WordGrade } from '@/types';

// 学习流程（仿不背单词的两段式）：
// 1) 正面：只看单词/音标，自评「认识 / 不认识」；
// 2) 翻面：展示释义、例句、搭配、派生等；
//    - 自评「认识」但发现记错 → 点「记错了」（按不会处理）
//    - 确实认识 → 「认识，下一词」；自评「不认识」→ 「记住了，下一词」。

type Phase = 'ask' | 'answer';
type Claim = 'know' | 'unknown';

export function WordStudyPage() {
  const s = useStore();
  const [params] = useSearchParams();
  const today = todayStr();

  const queue: Word[] = useMemo(() => {
    const ids = params.get('ids')?.split(',').filter(Boolean);
    const words = allWords();
    if (ids && ids.length) return ids.map((id) => words.find((w) => w.id === id)).filter((w): w is Word => !!w);
    // 默认：到期词 + 少量新词
    const due = words.filter((w) => isDue(s.wordProgress[w.id] ?? null, today));
    const fresh = words.filter((w) => !s.wordProgress[w.id]).slice(0, 10);
    return [...due, ...fresh];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>('ask');
  const [claim, setClaim] = useState<Claim>('know');
  const [counts, setCounts] = useState({ known: 0, unknown: 0 });

  const word = queue[idx];

  if (queue.length === 0) {
    return (
      <div className="pb-nav">
        <PageHeader title="单词学习" back="/learn/words" />
        <div className="px-4 pt-16 text-center text-slate-500">
          <Check size={40} className="mx-auto text-emerald-400" />
          <p className="mt-3">当前没有需要学习的单词</p>
        </div>
      </div>
    );
  }

  if (!word) {
    return (
      <div className="pb-nav">
        <PageHeader title="单词学习" back="/learn/words" />
        <div className="flex flex-col items-center px-6 pt-20 text-center">
          <div className="text-4xl">🎉</div>
          <h2 className="mt-3 text-lg font-semibold">本组完成</h2>
          <p className="mt-1 text-sm text-slate-500">
            认识 {counts.known} · 不认识/记错 {counts.unknown}
          </p>
          <a href="#/learn/words" className="btn-primary mt-6">
            返回词表
          </a>
        </div>
      </div>
    );
  }

  function answer(self: Claim) {
    setClaim(self);
    setPhase('answer');
  }

  // g 为本词最终评级：again=不会（稍后重现），good=认识
  function next(g: WordGrade) {
    gradeWord(word!, g);
    setCounts((prev) => (g === 'again' ? { ...prev, unknown: prev.unknown + 1 } : { ...prev, known: prev.known + 1 }));
    setIdx(idx + 1);
    setPhase('ask');
  }

  const collocations = [...word.collocations, ...word.phrases];

  return (
    <div className="flex min-h-screen flex-col pb-nav">
      <PageHeader title={`单词学习 ${idx + 1}/${queue.length}`} back="/learn/words" />
      <div className="flex flex-1 flex-col px-5 pt-4">
        <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full rounded-full bg-brand-500" style={{ width: `${(idx / queue.length) * 100}%` }} />
        </div>

        <div className="card flex max-h-[70vh] flex-1 flex-col overflow-y-auto p-6">
          {/* 单词头 */}
          <div className="flex flex-col items-center pt-2 text-center">
            <div className="flex items-center justify-center gap-2">
              <div className="text-4xl font-bold tracking-tight text-slate-800">{word.word}</div>
              <button
                onClick={() => speak(word.word)}
                className="rounded-full p-1.5 text-brand-500 hover:bg-brand-50"
                aria-label="播放单词发音"
              >
                <Volume2 size={20} />
              </button>
            </div>
            <div className="mt-2 text-slate-400">
              {word.phonetic} · {word.partOfSpeech}
            </div>
          </div>

          {phase === 'ask' ? (
            <div className="flex flex-1 flex-col items-center justify-center py-10">
              <p className="text-sm leading-6 text-slate-400">
                先在脑中回想这个词的意思
                <br />
                再根据第一反应选择
              </p>
            </div>
          ) : (
            <div className="mt-5 w-full fade-in">
              {/* 自评反馈条 */}
              {claim === 'know' ? (
                <div className="mb-4 rounded-lg bg-emerald-50 px-3 py-2 text-center text-sm text-emerald-700">
                  你选择了「认识」，请对照释义确认；若发现记错，请点下方「记错了」
                </div>
              ) : (
                <div className="mb-4 rounded-lg bg-rose-50 px-3 py-2 text-center text-sm text-rose-600">
                  没关系，结合例句和搭配记一遍
                </div>
              )}

              {/* 释义 */}
              <p className="text-center text-xl font-semibold text-slate-800">{word.coreMeaning}</p>
              {word.examMeanings.length > 0 && (
                <p className="mt-1 text-center text-sm text-slate-400">{word.examMeanings.join('；')}</p>
              )}

              {/* 例句 */}
              {word.exampleSentence && (
                <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                  <p className="flex items-start gap-2 text-[15px] leading-7 text-slate-800">
                    <button
                      onClick={() => speak(word.exampleSentence!.en, 0.85)}
                      className="mt-1 shrink-0 text-brand-500 hover:text-brand-700"
                      aria-label="播放例句"
                    >
                      <Volume2 size={15} />
                    </button>
                    <span>{word.exampleSentence.en}</span>
                  </p>
                  <p className="mt-1.5 pl-6 text-sm leading-6 text-slate-400">{word.exampleSentence.zh}</p>
                </div>
              )}

              {/* 词组搭配 */}
              {collocations.length > 0 && (
                <DetailBlock title="词组搭配">
                  {collocations.map((c) => (
                    <DetailRow key={c} text={c} onSpeak={speak} />
                  ))}
                </DetailBlock>
              )}

              {/* 派生 / 词族 */}
              {word.wordFamily.length > 0 && (
                <DetailBlock title="派生 / 词族">
                  {word.wordFamily.map((c) => (
                    <p key={c} className="text-sm leading-7 text-slate-600">
                      {c}
                    </p>
                  ))}
                </DetailBlock>
              )}

              {/* 近义 / 反义 */}
              {(word.synonyms.length > 0 || word.antonyms.length > 0) && (
                <DetailBlock title="近义 / 反义">
                  {word.synonyms.length > 0 && (
                    <p className="text-sm leading-7 text-slate-600">近义：{word.synonyms.join('，')}</p>
                  )}
                  {word.antonyms.length > 0 && <p className="text-sm leading-7 text-slate-600">反义：{word.antonyms.join('，')}</p>}
                </DetailBlock>
              )}

              {/* 易混词 */}
              {word.confusingWords.length > 0 && (
                <DetailBlock title="易混辨析">
                  {word.confusingWords.map((c) => (
                    <p key={c} className="text-sm leading-7 text-slate-600">
                      {c}
                    </p>
                  ))}
                </DetailBlock>
              )}
            </div>
          )}
        </div>

        {/* 底部操作区 */}
        {phase === 'ask' ? (
          <div className="mt-4 grid grid-cols-2 gap-3 pb-4">
            <button onClick={() => answer('unknown')} className="btn flex-col bg-rose-500 py-4 text-white">
              <X size={18} />
              不认识
            </button>
            <button onClick={() => answer('know')} className="btn flex-col bg-emerald-500 py-4 text-white">
              <Check size={18} />
              认识
            </button>
          </div>
        ) : claim === 'know' ? (
          <div className="mt-4 grid grid-cols-2 gap-3 pb-4">
            <button onClick={() => next('again')} className="btn flex-col bg-rose-500 py-4 text-white">
              <RotateCcw size={17} />
              记错了
            </button>
            <button onClick={() => next('good')} className="btn flex-col bg-emerald-500 py-4 text-white">
              认识正确
              <ChevronRight size={17} />
            </button>
          </div>
        ) : (
          <div className="mt-4 pb-4">
            <button onClick={() => next('again')} className="btn-primary w-full py-4">
              记住了，下一词 <ChevronRight size={17} className="inline" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function DetailBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-4 border-t border-slate-100 pt-3">
      <p className="mb-1 text-xs font-medium text-slate-400">{title}</p>
      {children}
    </div>
  );
}

function DetailRow({ text, onSpeak }: { text: string; onSpeak: (t: string, rate?: number) => void }) {
  return (
    <button
      onClick={() => onSpeak(text, 0.9)}
      className="flex w-full items-center gap-2 py-0.5 text-left text-sm leading-7 text-slate-700 hover:text-brand-600"
    >
      <Volume2 size={13} className="shrink-0 text-slate-300" />
      {text}
    </button>
  );
}
