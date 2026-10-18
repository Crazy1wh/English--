import { useState } from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { allQuestions, allWords, importQuestions, importWords } from '@/store/db';
import { useStore } from '@/store/useStore';
import type { Question, Reliability, SourceKind, Word } from '@/types';

type Mode = 'merge' | 'replace';
const SOURCES: SourceKind[] = [
  'official',
  'verified_real_exam',
  'multi_source_verified',
  'third_party_unverified',
  'manual',
  'ai_generated',
  'demo',
];
const RELIABILITIES: Reliability[] = ['A', 'B', 'C', 'D'];
/** 只有这些来源 + A/B 可信度才允许标记真题 */
const REAL_EXAM_SOURCES: SourceKind[] = ['official', 'verified_real_exam', 'multi_source_verified'];

export function AdminPage() {
  const s = useStore();
  const [wordJson, setWordJson] = useState('');
  const [questionJson, setQuestionJson] = useState('');
  const [mode, setMode] = useState<Mode>('merge');
  const [feedback, setFeedback] = useState<{ ok: boolean; text: string } | null>(null);

  function report(ok: boolean, text: string) {
    setFeedback({ ok, text });
  }

  function validateWords(items: Partial<Word>[]): string | null {
    for (const [i, it] of items.entries()) {
      if (!it.id) return `第 ${i + 1} 条缺少 id`;
      if (!it.word) return `第 ${i + 1} 条缺少 word`;
      if (!it.source || !SOURCES.includes(it.source)) {
        return `第 ${i + 1} 条缺少合法 source（允许：${SOURCES.join(' / ')}）`;
      }
      // 词表没有真题标记字段；examYears 只能在已验证真题来源下填写
      if (it.examYears && it.examYears.length > 0 && !REAL_EXAM_SOURCES.includes(it.source)) {
        return `第 ${i + 1} 条：只有已验证真题来源才允许填写 examYears（禁止编造考频/年份）`;
      }
    }
    return null;
  }

  function validateQuestions(items: Partial<Question>[]): string | null {
    for (const [i, it] of items.entries()) {
      if (!it.id) return `第 ${i + 1} 条缺少 id`;
      if (!it.source || !SOURCES.includes(it.source)) {
        return `第 ${i + 1} 条缺少合法 source（允许：${SOURCES.join(' / ')}）`;
      }
      if (!it.reliability || !RELIABILITIES.includes(it.reliability)) {
        return `第 ${i + 1} 条缺少合法 reliability（A/B/C/D）`;
      }
      if (typeof it.isRealExam !== 'boolean') {
        return `第 ${i + 1} 条必须显式声明 isRealExam: true/false`;
      }
      if (it.isRealExam && it.reliability !== 'A' && it.reliability !== 'B') {
        return `第 ${i + 1} 条：reliability 必须为 A/B 且经核验才能标记 isRealExam=true（防止模拟题冒充真题）`;
      }
      if (it.isRealExam && !REAL_EXAM_SOURCES.includes(it.source)) {
        return `第 ${i + 1} 条：真题 source 必须是 official / verified_real_exam / multi_source_verified`;
      }
    }
    return null;
  }

  function doImportWords() {
    try {
      const parsed = JSON.parse(wordJson) as unknown;
      if (!Array.isArray(parsed)) throw new Error('内容必须是数组');
      let normalized: Word[];
      try {
        normalized = parsed.map((it) => normalizeWord(it as Partial<Word>));
      } catch (e) {
        return report(false, '词汇导入被拒绝：' + (e as Error).message);
      }
      const err = validateWords(normalized);
      if (err) return report(false, '词汇导入被拒绝：' + err);
      importWords(normalized, mode);
      report(true, `已${mode === 'replace' ? '替换' : '合并'} ${normalized.length} 个词（当前共 ${allWords().length} 个）`);
      setWordJson('');
    } catch (e) {
      report(false, '词汇 JSON 解析失败：' + (e as Error).message);
    }
  }

  function doImportQuestions() {
    try {
      const parsed = JSON.parse(questionJson) as unknown;
      if (!Array.isArray(parsed)) throw new Error('内容必须是数组');
      let normalized: Question[];
      try {
        normalized = parsed.map((it, i) => normalizeQuestion(it as Partial<Question> & Record<string, unknown>, i));
      } catch (e) {
        return report(false, '题目导入被拒绝：' + (e as Error).message);
      }
      const err = validateQuestions(normalized);
      if (err) return report(false, '题目导入被拒绝：' + err);
      for (const [i, q] of normalized.entries()) {
        if (!q.questionText || q.options.length === 0 || q.answer == null) {
          return report(false, `第 ${i + 1} 题缺少 questionText/options/answer`);
        }
        if (!q.options[q.answer.charCodeAt(0) - 65]) {
          return report(false, `第 ${i + 1} 题 answer="${q.answer}" 超出 options 范围`);
        }
        if (!q.explanation) return report(false, `第 ${i + 1} 题缺少 explanation（每道题必须有解析）`);
      }
      importQuestions(normalized, mode);
      report(true, `已${mode === 'replace' ? '替换' : '合并'} ${normalized.length} 道题（当前共 ${allQuestions().length} 道）`);
      setQuestionJson('');
    } catch (e) {
      report(false, '题目 JSON 解析失败：' + (e as Error).message);
    }
  }

  const realCount = allQuestions().filter((q) => q.isRealExam).length;

  const wordExample = [
    '[',
    '  {',
    '    "id": "w.custom.001",',
    '    "word": "example",',
    '    "phonetic": "/ɪɡˈzɑːmpl/",',
    '    "partOfSpeech": "n.",',
    '    "coreMeaning": "例子；榜样",',
    '    "level": "L2",',
    '    "source": "manual",',
    '    "examYears": []',
    '  }',
    ']',
  ].join('\n');

  const questionExample = [
    '[',
    '  {',
    '    "id": "q.custom.001",',
    '    "section": "Grammar",',
    '    "questionType": "single_choice",',
    '    "questionText": "...题干...",',
    '    "options": ["A选项", "B选项", "C选项", "D选项"],',
    '    "answer": "B",',
    '    "knowledgeTags": ["grammar.verb.tense"],',
    '    "explanation": { "conclusion": "选B", "keyPoint": "考点", "whyCorrect": "...", "whyWrong": [] } ,',
    '    "source": "manual",',
    '    "reliability": "D",',
    '    "isRealExam": false',
    '  }',
    ']',
  ].join('\n');

  return (
    <div className="pb-nav">
      <PageHeader title="内容管理 / 导入" back="/profile" />
      <div className="space-y-4 px-4 pt-3">
        <div className="card space-y-1 p-4 text-sm text-slate-600">
          <p>
            当前词库：<b>{allWords().length}</b>（其中自定义 {s.customWords.length}）
          </p>
          <p>
            当前题目：<b>{allQuestions().length}</b>（其中自定义 {s.customQuestions.length}，已核验真题 {realCount}）
          </p>
        </div>

        <div className="card p-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-600">导入方式</span>
            {(['merge', 'replace'] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`rounded-lg px-3 py-1.5 text-xs ${mode === m ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-500'}`}
              >
                {m === 'merge' ? '合并（推荐）' : '替换全部自定义'}
              </button>
            ))}
          </div>
          {mode === 'replace' && (
            <p className="mt-2 flex items-start gap-1 text-xs text-amber-600">
              <AlertTriangle size={13} className="mt-0.5 shrink-0" /> replace 只覆盖此前导入的自定义内容，不影响内置演示数据。
            </p>
          )}
        </div>

        <ImportBox
          title="导入词汇（JSON 数组）"
          placeholder={wordExample}
          value={wordJson}
          onChange={setWordJson}
          onImport={doImportWords}
        />

        <ImportBox
          title="导入题目（JSON 数组，每题必须带 explanation）"
          placeholder={questionExample}
          value={questionJson}
          onChange={setQuestionJson}
          onImport={doImportQuestions}
        />

        {feedback && (
          <div className={`card flex items-start gap-2 p-4 text-sm ${feedback.ok ? 'text-emerald-600' : 'text-rose-600'}`}>
            {feedback.ok ? <CheckCircle2 size={16} className="mt-0.5" /> : <AlertTriangle size={16} className="mt-0.5" />}
            <span>{feedback.text}</span>
          </div>
        )}

        <p className="rounded-xl bg-slate-100 p-3 text-xs leading-5 text-slate-500">
          可信度纪律（规格第十二 / 三十四章）：source、reliability、isRealExam 为强制字段且会被校验；
          只有经核验的 A/B 级真题才允许 isRealExam=true，AI 生成或抓取未核验内容一律 C/D 级，前端会显示「演示题 / 待核验」。
        </p>
      </div>
    </div>
  );
}

function ImportBox({
  title,
  placeholder,
  value,
  onChange,
  onImport,
}: {
  title: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  onImport: () => void;
}) {
  return (
    <section className="card p-4">
      <h3 className="mb-2 text-sm font-semibold text-slate-700">{title}</h3>
      <textarea
        className="input h-40 font-mono text-xs leading-5"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button className="btn-primary mt-2 w-full" disabled={!value.trim()} onClick={onImport}>
        校验并导入
      </button>
    </section>
  );
}

// ---------------- 导入归一化 ----------------
// 用户/外部 JSON 只要求核心字段，其余按安全默认值补齐，
// 并兼容历史写法（options 对象、explanation 旧字段名），避免缺字段导致页面崩溃。

const WORD_LEVELS = ['L1', 'L2', 'L3', 'L4', 'L5'] as const;
const SECTIONS = ['Phonetics', 'Vocabulary', 'Grammar', 'Cloze', 'Reading', 'Dialogue', 'Writing'] as const;
const DIFFICULTIES = ['easy', 'normal', 'hard'] as const;

function asString(v: unknown, fallback = ''): string {
  return typeof v === 'string' ? v : v == null ? fallback : String(v);
}
function asStringArray(v: unknown): string[] {
  return Array.isArray(v) ? v.map((x) => String(x)) : [];
}

export function normalizeWord(it: Partial<Word> & Record<string, unknown>, index = 0): Word {
  const word = asString(it.word).trim();
  if (!word) throw new Error(`第 ${index + 1} 条缺少 word`);
  const level = WORD_LEVELS.includes(it.level as (typeof WORD_LEVELS)[number]) ? (it.level as Word['level']) : 'L2';
  const example = it.exampleSentence && typeof it.exampleSentence === 'object'
    ? { en: asString((it.exampleSentence as Record<string, unknown>).en), zh: asString((it.exampleSentence as Record<string, unknown>).zh) }
    : null;
  return {
    id: asString(it.id) || `word.${word.replace(/\s+/g, '_')}`,
    word,
    phonetic: asString(it.phonetic),
    partOfSpeech: asString(it.partOfSpeech),
    coreMeaning: asString(it.coreMeaning),
    examMeanings: asStringArray(it.examMeanings),
    level,
    frequencyScore: typeof it.frequencyScore === 'number' ? it.frequencyScore : 0,
    phrases: asStringArray(it.phrases),
    collocations: asStringArray(it.collocations),
    synonyms: asStringArray(it.synonyms),
    antonyms: asStringArray(it.antonyms),
    confusingWords: asStringArray(it.confusingWords),
    wordFamily: asStringArray(it.wordFamily),
    exampleSentence: example?.en ? example : null,
    source: (asString(it.source) || 'manual') as Word['source'],
    examYears: Array.isArray(it.examYears) ? it.examYears.filter((y): y is number => typeof y === 'number') : [],
    knowledgeTags: asStringArray(it.knowledgeTags),
  };
}

/** 兼容 options: string[] 与 {A:'...', B:'...'} 两种写法 */
function normalizeOptions(v: unknown): string[] {
  if (Array.isArray(v)) return v.map((x) => String(x));
  if (v && typeof v === 'object') {
    const obj = v as Record<string, unknown>;
    return 'ABCDEFG'.split('').filter((k) => obj[k] != null).map((k) => String(obj[k]));
  }
  return [];
}

function normalizeExplanation(v: unknown): Question['explanation'] {
  const e = (v && typeof v === 'object' ? v : {}) as Record<string, unknown>;
  // 兼容旧格式 {answer, why, knowledgePoint}
  const whyWrong = Array.isArray(e.whyWrong)
    ? e.whyWrong
        .map((x) => x as Record<string, unknown>)
        .filter((x) => x && typeof x.option === 'string')
        .map((x) => ({ option: String(x.option), reason: asString(x.reason) }))
    : [];
  return {
    conclusion: asString(e.conclusion) || (e.answer ? `正确答案：${asString(e.answer)}` : ''),
    keyPoint: asString(e.keyPoint) || asString(e.knowledgePoint),
    whyCorrect: asString(e.whyCorrect) || asString(e.why),
    whyWrong,
    relatedKnowledge: asStringArray(e.relatedKnowledge),
    mnemonic: typeof e.mnemonic === 'string' ? e.mnemonic : undefined,
  };
}

export function normalizeQuestion(it: Partial<Question> & Record<string, unknown>, index = 0): Question {
  const section = SECTIONS.includes(it.section as (typeof SECTIONS)[number])
    ? (it.section as Question['section'])
    : 'Grammar';
  const options = normalizeOptions(it.options);
  if (options.length === 0) throw new Error(`第 ${index + 1} 题 options 必须为非空数组（或 A-D 对象）`);
  const answer = asString(it.answer).toUpperCase();
  if (!answer || !/^[A-G]$/.test(answer)) throw new Error(`第 ${index + 1} 题 answer 必须是 A-G 的选项字母`);
  const difficulty = DIFFICULTIES.includes(it.difficulty as (typeof DIFFICULTIES)[number])
    ? (it.difficulty as Question['difficulty'])
    : 'normal';
  const now = new Date().toISOString();
  return {
    id: asString(it.id),
    exam: typeof it.exam === 'string' ? it.exam : null,
    year: typeof it.year === 'number' ? it.year : null,
    region: typeof it.region === 'string' ? it.region : null,
    source: (asString(it.source) || 'manual') as Question['source'],
    sourceUrl: typeof it.sourceUrl === 'string' ? it.sourceUrl : null,
    reliability: (['A', 'B', 'C', 'D'].includes(asString(it.reliability)) ? asString(it.reliability) : 'D') as Question['reliability'],
    isRealExam: it.isRealExam === true,
    status: it.status === 'needs_review' ? 'needs_review' : 'active',
    section,
    questionType: asString(it.questionType, 'single_choice'),
    passage: typeof it.passage === 'string' ? it.passage : undefined,
    groupId: typeof it.groupId === 'string' ? it.groupId : undefined,
    groupTitle: typeof it.groupTitle === 'string' ? it.groupTitle : undefined,
    questionText: asString(it.questionText),
    options,
    answer,
    explanation: normalizeExplanation(it.explanation),
    knowledgeTags: asStringArray(it.knowledgeTags),
    skillTags: asStringArray(it.skillTags),
    difficulty,
    frequencyLevel: typeof it.frequencyLevel === 'number' ? it.frequencyLevel : null,
    createdAt: asString(it.createdAt, now),
    updatedAt: asString(it.updatedAt, now),
    generatedByAi: it.generatedByAi === true,
    model: typeof it.model === 'string' ? it.model : null,
    promptVersion: typeof it.promptVersion === 'string' ? it.promptVersion : null,
  };
}
