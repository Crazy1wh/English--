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
      const parsed = JSON.parse(wordJson) as Word[];
      if (!Array.isArray(parsed)) throw new Error('内容必须是数组');
      const err = validateWords(parsed);
      if (err) return report(false, '词汇导入被拒绝：' + err);
      importWords(parsed, mode);
      report(true, `已${mode === 'replace' ? '替换' : '合并'} ${parsed.length} 个词（当前共 ${allWords().length} 个）`);
      setWordJson('');
    } catch (e) {
      report(false, '词汇 JSON 解析失败：' + (e as Error).message);
    }
  }

  function doImportQuestions() {
    try {
      const parsed = JSON.parse(questionJson) as Question[];
      if (!Array.isArray(parsed)) throw new Error('内容必须是数组');
      const err = validateQuestions(parsed);
      if (err) return report(false, '题目导入被拒绝：' + err);
      for (const [i, q] of parsed.entries()) {
        if (!q.questionText || !q.options || q.answer == null) {
          return report(false, `第 ${i + 1} 题缺少 questionText/options/answer`);
        }
        if (!q.explanation) return report(false, `第 ${i + 1} 题缺少 explanation（每道题必须有解析）`);
      }
      importQuestions(parsed, mode);
      report(true, `已${mode === 'replace' ? '替换' : '合并'} ${parsed.length} 道题（当前共 ${allQuestions().length} 道）`);
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
    '    "questionText": "...",',
    '    "options": {"A": "...", "B": "...", "C": "...", "D": "..."},',
    '    "answer": "B",',
    '    "knowledgeTags": ["G03"],',
    '    "explanation": { "answer": "B", "why": "...", "knowledgePoint": "..." },',
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
