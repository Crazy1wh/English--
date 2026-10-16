import { useNavigate, useParams } from 'react-router-dom';
import { QuestionRunner, type SessionSummary } from '@/components/QuestionRunner';
import { getPaperQuestions, saveMock } from '@/store/db';
import { MOCK_PAPERS } from '@/data';
import { nowIso } from '@/engine/date';
import { EmptyState } from '@/components/ui';
import type { MockResult } from '@/types';

const SECTION_LABEL: Record<string, string> = {
  Phonetics: '语音',
  Vocabulary: '词汇',
  Grammar: '语法',
  Cloze: '完形填空',
  Reading: '阅读理解',
  Dialogue: '补全对话',
  Writing: '写作',
};

export function MockExamPage() {
  const { paperId } = useParams();
  const navigate = useNavigate();
  const paper = MOCK_PAPERS.find((p) => p.id === paperId);
  const questions = getPaperQuestions(paperId ?? '');

  if (!paper || questions.length === 0) {
    return (
      <div className="px-4 pt-10">
        <EmptyState title="试卷不存在或缺少题目" />
      </div>
    );
  }

  function finished(summary: SessionSummary) {
    const currentPaper = paper;
    if (!currentPaper) return;
    const correctCount = summary.answers.filter((a) => a.correct).length;
    const sectionStats: MockResult['sectionStats'] = {};
    for (const a of summary.answers) {
      const q = questions.find((x) => x.id === a.questionId);
      if (!q) continue;
      const st = (sectionStats[q.section] ??= { correct: 0, total: 0 });
      st.total += 1;
      if (a.correct) st.correct += 1;
    }
    // 演示卷：按正确率线性折算 150 分（页面会明确标注，不作为真实考分预测的唯一依据）
    const total = Math.round((correctCount / summary.answers.length) * currentPaper.totalScore);
    const result: MockResult = {
      id: `mock.${Date.now()}`,
      at: nowIso(),
      paperId: currentPaper.id,
      total,
      correctCount,
      questionCount: summary.answers.length,
      sectionStats,
      durationSec: summary.durationSec,
    };
    saveMock(result);
    navigate(`/exams/mock/${currentPaper.id}/result/${result.id}`);
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-3">
      <div className="mx-4 mb-2 rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-700">
        {paper.note}
        {Object.entries(SECTION_LABEL).length > 0 && <span className="block">考试中不显示答案解析，交卷后统一查看。</span>}
      </div>
      <QuestionRunner
        questions={questions}
        mode="mock"
        title={paper.title}
        showExplanation={false}
        exitTo="/exams"
        onFinished={finished}
      />
    </div>
  );
}

export { SECTION_LABEL };
