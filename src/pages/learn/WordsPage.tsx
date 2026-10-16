import { useMemo, useState } from 'react';
import { ChevronRight, Play, RotateCcw } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Chip, EmptyState, MasteryBar } from '@/components/ui';
import { allWords } from '@/store/db';
import { useStore } from '@/store/useStore';
import { isDue } from '@/engine/forgetting';
import { todayStr } from '@/engine/date';
import type { Word, WordLevel } from '@/types';

const LEVELS: { key: WordLevel | 'all' | 'due' | 'new'; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'due', label: '待复习' },
  { key: 'new', label: '未学' },
  { key: 'L1', label: 'L1 核心' },
  { key: 'L2', label: 'L2 成考' },
  { key: 'L3', label: 'L3 阅读' },
  { key: 'L4', label: 'L4 高频' },
  { key: 'L5', label: 'L5 拔高' },
];

const LEVEL_COLOR: Record<string, 'red' | 'brand' | 'purple' | 'amber' | 'green'> = {
  L1: 'red',
  L2: 'brand',
  L3: 'purple',
  L4: 'amber',
  L5: 'green',
};

export function WordsPage() {
  const s = useStore();
  const [tab, setTab] = useState<(typeof LEVELS)[number]['key']>('all');
  const [selected, setSelected] = useState<Word | null>(null);
  const words = allWords();
  const today = todayStr();

  const filtered = useMemo(() => {
    return words.filter((w) => {
      const p = s.wordProgress[w.id];
      if (tab === 'due') return isDue(p ?? null, today);
      if (tab === 'new') return !p;
      if (tab === 'all') return true;
      return w.level === tab;
    });
  }, [words, tab, s, today]);

  const dueIds = words.filter((w) => isDue(s.wordProgress[w.id] ?? null, today)).map((w) => w.id);
  const newIds = words.filter((w) => !s.wordProgress[w.id]).slice(0, 20).map((w) => w.id);

  return (
    <div className="pb-nav">
      <PageHeader title="词汇" back="/learn" />
      <div className="px-4 pt-3">
        <div className="rounded-xl bg-slate-100 p-3 text-xs leading-5 text-slate-500">
          词库按成考专升本所需词汇（约 3800，高中→大学四级难度）分级：L1 核心生存词、L2 成考基础、L3 阅读识别词、L4 高频核心词、L5 拔高易混词。
          均为手工整理的通用词表（source: manual），非真题词频统计，frequencyScore 暂不排序；官方大纲词表可在内容管理中导入。
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <a href={`#/learn/words/study?ids=${dueIds.join(',')}`} className="card flex items-center gap-2 p-3">
            <RotateCcw size={18} className="text-amber-500" />
            <div>
              <div className="text-sm font-medium">复习到期词</div>
              <div className="text-xs text-slate-400">{dueIds.length} 个</div>
            </div>
          </a>
          <a href={`#/learn/words/study?ids=${newIds.join(',')}`} className="card flex items-center gap-2 p-3">
            <Play size={18} className="text-brand-500" />
            <div>
              <div className="text-sm font-medium">学习新词</div>
              <div className="text-xs text-slate-400">{newIds.length} 个</div>
            </div>
          </a>
        </div>

        <div className="sticky top-[52px] z-10 -mx-4 mt-3 flex gap-1.5 overflow-x-auto bg-slate-50/95 px-4 py-2 backdrop-blur">
          {LEVELS.map((l) => (
            <button
              key={l.key}
              onClick={() => setTab(l.key)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium ${tab === l.key ? 'bg-brand-600 text-white' : 'bg-white text-slate-500 ring-1 ring-slate-200'}`}
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="mt-2 space-y-2">
          {filtered.map((w) => {
            const p = s.wordProgress[w.id];
            return (
              <button key={w.id} onClick={() => setSelected(w)} className="card flex w-full items-center gap-3 p-3 text-left">
                <Chip color={LEVEL_COLOR[w.level] ?? 'slate'}>{w.level}</Chip>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-slate-800">
                    {w.word} <span className="text-xs font-normal text-slate-400">{w.phonetic}</span>
                  </div>
                  <div className="truncate text-xs text-slate-500">{w.coreMeaning}</div>
                </div>
                {p ? (
                  <div className="w-16 shrink-0">
                    <MasteryBar value={p.mastery} size="sm" />
                  </div>
                ) : (
                  <span className="text-xs text-slate-300">未学</span>
                )}
                <ChevronRight size={15} className="text-slate-300" />
              </button>
            );
          })}
          {filtered.length === 0 && <EmptyState title="这个分类下暂时没有词" desc="可在内容管理中导入核验后的词表" />}
        </div>
      </div>

      {selected && <WordDetail word={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function WordDetail({ word, onClose }: { word: Word; onClose: () => void }) {
  const s = useStore();
  const p = s.wordProgress[word.id];
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 sm:items-center" onClick={onClose}>
      <div
        className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white p-5 sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-2xl font-bold text-slate-800">{word.word}</h3>
            <p className="mt-1 text-sm text-slate-400">
              {word.phonetic} · {word.partOfSpeech} · <Chip color="brand">{word.level}</Chip>
            </p>
          </div>
          <button onClick={onClose} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100">
            ✕
          </button>
        </div>

        <p className="mt-3 text-slate-700">{word.coreMeaning}</p>
        {word.examMeanings.length > 0 && <p className="mt-1 text-sm text-slate-500">其他释义：{word.examMeanings.join('；')}</p>}

        {word.exampleSentence && (
          <div className="mt-3 rounded-xl bg-slate-50 p-3 text-sm">
            <p className="text-slate-700">{word.exampleSentence.en}</p>
            <p className="mt-1 text-slate-400">{word.exampleSentence.zh}</p>
          </div>
        )}

        <div className="mt-3 space-y-2 text-sm">
          {word.collocations.length > 0 && <Detail label="高频搭配" items={word.collocations} />}
          {word.phrases.length > 0 && <Detail label="短语" items={word.phrases} />}
          {word.confusingWords.length > 0 && <Detail label="易混词" items={word.confusingWords} />}
          {word.synonyms.length > 0 && <Detail label="近义词" items={word.synonyms} />}
          {word.antonyms.length > 0 && <Detail label="反义词" items={word.antonyms} />}
          {word.wordFamily.length > 0 && <Detail label="词族" items={word.wordFamily} />}
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
          <span>来源：{word.source} · 词频数据：暂无</span>
          {p && <span>掌握度 {p.mastery} · 下次复习 {p.due}</span>}
        </div>
        <a href={`#/learn/words/study?ids=${word.id}`} className="btn-primary mt-3 w-full">
          立刻学习这个词
        </a>
      </div>
    </div>
  );
}

function Detail({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <span className="mr-2 text-slate-400">{label}：</span>
      {items.map((i) => (
        <span key={i} className="mr-1.5 inline-block rounded bg-slate-100 px-2 py-0.5 text-slate-600">
          {i}
        </span>
      ))}
    </div>
  );
}
