import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Check, HelpCircle, RotateCw, Volume2, X } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { allWords, gradeWord } from '@/store/db';
import { useStore } from '@/store/useStore';
import { isDue } from '@/engine/forgetting';
import { todayStr } from '@/engine/date';
import { speak } from '@/lib/speech';
import type { Word, WordGrade } from '@/types';

const GRADES: { key: WordGrade; label: string; cls: string }[] = [
  { key: 'again', label: '不会', cls: 'bg-rose-500 text-white' },
  { key: 'vague', label: '模糊', cls: 'bg-amber-500 text-white' },
  { key: 'good', label: '认识', cls: 'bg-brand-500 text-white' },
  { key: 'easy', label: '熟练', cls: 'bg-emerald-500 text-white' },
];

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
  const [revealed, setRevealed] = useState(false);
  const [graded, setGraded] = useState<Record<WordGrade, number>>({ again: 0, vague: 0, good: 0, easy: 0 });

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
            认识 {graded.good + graded.easy} · 模糊 {graded.vague} · 不会 {graded.again}
          </p>
          <a href="#/learn/words" className="btn-primary mt-6">
            返回词表
          </a>
        </div>
      </div>
    );
  }

  function grade(g: WordGrade) {
    gradeWord(word!, g);
    setGraded((prev) => ({ ...prev, [g]: prev[g] + 1 }));
    setIdx(idx + 1);
    setRevealed(false);
  }

  return (
    <div className="flex min-h-screen flex-col pb-nav">
      <PageHeader title={`单词学习 ${idx + 1}/${queue.length}`} back="/learn/words" />
      <div className="flex flex-1 flex-col px-5 pt-4">
        <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full rounded-full bg-brand-500" style={{ width: `${(idx / queue.length) * 100}%` }} />
        </div>

        <div className="card flex flex-1 flex-col items-center justify-center p-6 text-center">
          <div className="flex items-center justify-center gap-2">
            <div className="text-4xl font-bold text-slate-800">{word.word}</div>
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

          {!revealed ? (
            <button onClick={() => setRevealed(true)} className="btn-ghost mt-10">
              <HelpCircle size={16} /> 点击显示释义
            </button>
          ) : (
            <div className="mt-6 w-full fade-in">
              <p className="text-lg text-slate-700">{word.coreMeaning}</p>
              {word.examMeanings.length > 0 && <p className="mt-1 text-sm text-slate-400">{word.examMeanings.join('；')}</p>}
              {word.exampleSentence && (
                <div className="mt-4 rounded-xl bg-slate-50 p-3 text-sm leading-6">
                  <p className="flex items-start gap-1.5 text-slate-700">
                    <button onClick={() => speak(word.exampleSentence!.en, 0.85)} className="mt-0.5 shrink-0 text-brand-500 hover:text-brand-700" aria-label="播放例句">
                      <Volume2 size={15} />
                    </button>
                    {word.exampleSentence.en}
                  </p>
                  <p className="mt-1 text-slate-400">{word.exampleSentence.zh}</p>
                </div>
              )}
              {(word.collocations.length > 0 || word.confusingWords.length > 0) && (
                <div className="mt-3 space-y-1 text-left text-sm text-slate-500">
                  {word.collocations.length > 0 && <p>搭配：{word.collocations.join('；')}</p>}
                  {word.confusingWords.length > 0 && <p>易混：{word.confusingWords.join('；')}</p>}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2 pb-4">
          {!revealed ? (
            <button onClick={() => setRevealed(true)} className="btn-primary col-span-4 py-3">
              <RotateCw size={16} /> 先想一想，再看答案
            </button>
          ) : (
            GRADES.map((g) => (
              <button key={g.key} onClick={() => grade(g.key)} className={`btn ${g.cls} flex-col py-3`}>
                {g.key === 'again' ? <X size={17} /> : g.key === 'easy' ? <Check size={17} /> : null}
                {g.label}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
