import { useMemo, useRef, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ChevronRight, Flag, XCircle } from 'lucide-react';
import type { Attempt, ErrorType, Question, WrongQuestion } from '@/types';
import { recordAttempt, reviewWrong, setUserErrorType, allQuestions } from '@/store/db';
import { RemediationTracker } from '@/engine/remediation';
import { GRAMMAR_TOPICS } from '@/data';
import { ExplanationView } from './ExplanationView';
import { SourceBadge } from './ui';

export interface SessionAnswer {
  questionId: string;
  selected: string;
  correct: boolean;
  durationSec: number;
}

export interface SessionSummary {
  answers: SessionAnswer[];
  durationSec: number;
}

interface Props {
  questions: Question[];
  mode: Attempt['mode'];
  title: string;
  wrongs?: Map<string, WrongQuestion>;
  onFinished?: (s: SessionSummary) => void;
  showExplanation?: boolean; // mock=false
  exitTo: string;
}

export function QuestionRunner({ questions, mode, title, wrongs, onFinished, showExplanation = true, exitTo }: Props) {
  const navigate = useNavigate();
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answers, setAnswers] = useState<SessionAnswer[]>([]);
  const [wrongId, setWrongId] = useState<string | undefined>();
  const [remediation, setRemediation] = useState<string | null>(null);
  const startAtRef = useRef<number>(Date.now());
  const sessionStartRef = useRef<number>(Date.now());
  const trackerRef = useRef(new RemediationTracker());
  const recorded = useRef(new Set<number>());

  const q = questions[idx];

  const finished = idx >= questions.length;

  function finish(allAnswers: SessionAnswer[]) {
    const summary: SessionSummary = {
      answers: allAnswers,
      durationSec: Math.round((Date.now() - sessionStartRef.current) / 1000),
    };
    if (onFinished) onFinished(summary);
  }

  function choose(letter: string) {
    if (selected || !q) return;
    setSelected(letter);
    if (recorded.current.has(idx)) return;
    recorded.current.add(idx);
    const durationSec = Math.max(1, Math.round((Date.now() - startAtRef.current) / 1000));
    const correct = letter === q.answer;

    if (mode === 'wrong_review' && wrongs) {
      const w = wrongs.get(q.id);
      if (w) reviewWrong(w, correct, q);
    } else {
      const r = recordAttempt(q, letter, durationSec, mode === 'wrong_review' ? 'practice' : mode);
      if (!correct) setWrongId(r.wrong?.id);
    }

    const tag = q.knowledgeTags[0] ?? q.questionType;
    trackerRef.current.record(tag, correct);
    const next = [...answers, { questionId: q.id, selected: letter, correct, durationSec }];
    setAnswers(next);

    if (mode !== 'mock' && !correct && trackerRef.current.shouldTrigger(tag)) {
      setRemediation(tag);
    }
  }

  function nextQuestion() {
    if (idx + 1 >= questions.length) {
      setIdx(questions.length);
      finish(answers);
    } else {
      setIdx(idx + 1);
      setSelected(null);
      setWrongId(undefined);
      startAtRef.current = Date.now();
    }
  }

  if (finished) {
    return (
      <SessionDone
        answers={answers}
        durationSec={Math.round((Date.now() - sessionStartRef.current) / 1000)}
        mode={mode}
        onExit={() => navigate(exitTo)}
        onAgain={() => window.location.reload()}
        customDone={!onFinished ? undefined : (
          <button className="btn-primary w-full" onClick={() => finish(answers)}>
            查看结果
          </button>
        )}
      />
    );
  }

  if (!q) return null;

  return (
    <div className="px-4 pb-nav pt-4">
      {/* 进度条 */}
      <div className="mb-3 flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full rounded-full bg-brand-500 transition-all" style={{ width: `${(idx / questions.length) * 100}%` }} />
        </div>
        <span className="text-xs tabular-nums text-slate-400">
          {idx + 1}/{questions.length}
        </span>
      </div>
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs text-slate-400">{title}</span>
        <SourceBadge reliability={q.reliability} source={q.source} isRealExam={q.isRealExam} />
      </div>

      {remediation ? (
        <RemediationPanel
          tag={remediation}
          onDone={() => {
            trackerRef.current.clear(remediation);
            setRemediation(null);
          }}
        />
      ) : (
        <>
          {q.passage && (q.section === 'Reading' || q.section === 'Cloze') && (
            <div className="card mb-3 max-h-[38vh] overflow-y-auto whitespace-pre-line bg-amber-50/40 p-4 text-[15px] leading-7 text-slate-700">
              {q.passage}
            </div>
          )}

          <div className="card p-4">
            <p className="whitespace-pre-line text-[15px] leading-7 text-slate-800">{q.questionText}</p>
            <div className="mt-4 space-y-2.5">
              {q.options.map((opt, i) => {
                const letter = 'ABCDEFG'[i]!;
                const isChosen = selected === letter;
                const isAnswer = q.answer === letter;
                let cls = 'border-slate-200 bg-white hover:border-brand-300';
                if (selected) {
                  if (isAnswer) cls = 'border-emerald-400 bg-emerald-50';
                  else if (isChosen) cls = 'border-rose-400 bg-rose-50';
                  else cls = 'border-slate-200 bg-white opacity-70';
                }
                return (
                  <button
                    key={i}
                    disabled={!!selected}
                    onClick={() => choose(letter)}
                    className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left text-sm transition ${cls}`}
                  >
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
                        selected && isAnswer
                          ? 'border-emerald-500 bg-emerald-500 text-white'
                          : selected && isChosen
                            ? 'border-rose-500 bg-rose-500 text-white'
                            : 'border-slate-300 text-slate-500'
                      }`}
                    >
                      {selected && isAnswer ? <CheckCircle2 size={14} /> : selected && isChosen ? <XCircle size={14} /> : letter}
                    </span>
                    <span className="leading-6 text-slate-700">{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {selected && showExplanation && (
            <>
              <ExplanationView
                q={q}
                wrongId={wrongId}
                onFixErrorType={(t: ErrorType) => wrongId && setUserErrorType(wrongId, t)}
              />
              <button className="btn-primary mt-4 w-full py-3 text-base" onClick={nextQuestion}>
                {idx + 1 >= questions.length ? '完成本组练习' : '下一题'} <ChevronRight size={18} />
              </button>
            </>
          )}
          {selected && !showExplanation && (
            <button className="btn-primary mt-4 w-full py-3 text-base" onClick={nextQuestion}>
              {idx + 1 >= questions.length ? '交卷' : '下一题'} <ChevronRight size={18} />
            </button>
          )}
        </>
      )}
    </div>
  );
}

// ---------------- 结束总结 ----------------

function SessionDone({
  answers,
  durationSec,
  mode,
  onExit,
  onAgain,
  customDone,
}: {
  answers: SessionAnswer[];
  durationSec: number;
  mode: string;
  onExit: () => void;
  onAgain: () => void;
  customDone?: ReactNode;
}) {
  const correct = answers.filter((a) => a.correct).length;
  const pct = answers.length ? Math.round((correct / answers.length) * 100) : 0;
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-brand-50 text-3xl font-bold text-brand-600">
        {pct}
        <span className="text-base">分</span>
      </div>
      <h2 className="text-lg font-semibold text-slate-800">
        {mode === 'mock' ? '交卷成功' : '本组完成！'}
      </h2>
      <p className="mt-1 text-sm text-slate-500">
        答对 {correct} / {answers.length} 题 · 用时 {Math.round(durationSec / 60)} 分钟
      </p>
      <div className="mt-6 w-full max-w-xs space-y-3">
        {customDone}
        <button className="btn-ghost w-full" onClick={onAgain}>
          <Flag size={15} /> 再来一组
        </button>
        <button className="btn-outline w-full" onClick={onExit}>
          返回
        </button>
      </div>
    </div>
  );
}

// ---------------- Remediation 补救流程 ----------------

function RemediationPanel({ tag, onDone }: { tag: string; onDone: () => void }) {
  const topic = useMemo(
    () => GRAMMAR_TOPICS.find((g) => tag === g.knowledgeId || tag.startsWith(g.knowledgeId + '.') || g.knowledgeId.startsWith(tag)),
    [tag],
  );
  const easyQuestions = useMemo(() => {
    return allQuestions()
      .filter((q) => q.difficulty === 'easy' && q.knowledgeTags.some((t) => t === tag || t.startsWith(tag)))
      .slice(0, 2);
  }, [tag]);
  const [step, setStep] = useState(0); // 0=知识卡 1,2=简单题 3=完成
  const [pick, setPick] = useState<string | null>(null);

  const q = easyQuestions[step - 1];

  return (
    <div className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-4 fade-in">
      <div className="mb-2 flex items-center gap-2 font-semibold text-amber-800">
        <Flag size={16} /> 连续错题补救
      </div>
      <p className="text-sm text-amber-800">
        你可能还没有掌握这个知识点，我们先花 3 分钟重新学习，再做两道简单题。
      </p>

      {step === 0 && topic && (
        <div className="mt-3 rounded-xl bg-white p-4 text-sm">
          <div className="font-semibold text-slate-800">{topic.title}</div>
          <p className="mt-2 text-slate-600">{topic.rule}</p>
          <p className="mt-2 rounded-lg bg-slate-50 p-2 text-slate-600">公式：{topic.formula}</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
            {topic.examples.slice(0, 2).map((e, i) => (
              <li key={i}>
                {e.en} <span className="text-slate-400">（{e.zh}）</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {step === 0 && !topic && (
        <div className="mt-3 rounded-xl bg-white p-4 text-sm text-slate-600">
          建议回看该考点的核心规则与例句，再做下面两道基础题。
        </div>
      )}

      {q && step <= easyQuestions.length && (
        <div className="mt-3 rounded-xl bg-white p-4">
          <div className="mb-2 text-xs text-slate-400">简单题 {step}/{easyQuestions.length}</div>
          <p className="text-sm text-slate-800">{q.questionText}</p>
          <div className="mt-3 space-y-2">
            {q.options.map((opt, i) => {
              const letter = 'ABCD'[i]!;
              const isAnswer = q.answer === letter;
              let cls = 'border-slate-200';
              if (pick) {
                if (isAnswer) cls = 'border-emerald-400 bg-emerald-50';
                else if (pick === letter) cls = 'border-rose-400 bg-rose-50';
              }
              return (
                <button
                  key={i}
                  disabled={!!pick}
                  onClick={() => {
                    setPick(letter);
                    recordAttempt(q, letter, 30, 'remediation');
                  }}
                  className={`flex w-full items-center gap-2 rounded-lg border p-2.5 text-left text-sm ${cls}`}
                >
                  <span className="font-semibold text-slate-500">{letter}.</span> {opt}
                </button>
              );
            })}
          </div>
          {pick && (
            <button
              className="btn-primary mt-3 w-full"
              onClick={() => {
                setStep(step + 1);
                setPick(null);
              }}
            >
              {step >= easyQuestions.length ? '恢复训练' : '下一题'}
            </button>
          )}
        </div>
      )}

      {step === 0 && (
        <button className="btn-primary mt-3 w-full" onClick={() => (easyQuestions.length ? setStep(1) : onDone())}>
          {easyQuestions.length ? '做 2 道简单题' : '我明白了，继续'}
        </button>
      )}
      {step > easyQuestions.length && (
        <button className="btn-primary mt-3 w-full" onClick={onDone}>
          回到刚才的训练
        </button>
      )}
    </div>
  );
}
