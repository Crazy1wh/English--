import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { QuestionRunner } from '@/components/QuestionRunner';
import { allQuestions } from '@/store/db';
import type { Question, WrongQuestion } from '@/types';
import { useStore } from '@/store/useStore';
import { EmptyState } from '@/components/ui';

export function QuestionSessionPage() {
  const [params] = useSearchParams();
  const s = useStore();
  const isWrong = params.get('wrong') === '1';
  const title = params.get('title') ?? '专项练习';

  const { questions, wrongsMap } = useMemo(() => {
    const all = allQuestions();
    let ids = params.get('ids')?.split(',').filter(Boolean) ?? [];
    const section = params.get('section');
    if (ids.length === 0 && section) {
      // 按题型随机抽题组卷：阅读/完形按整篇 group 抽，其余按单题抽，避免一次刷上百题
      const limit = Math.max(1, Number(params.get('limit') ?? '20') || 20);
      const pool = all.filter((q) => q.section === section);
      if (section === 'Reading' || section === 'Cloze') {
        const groups = Array.from(new Set(pool.map((q) => q.groupId).filter(Boolean))) as string[];
        for (const g of groups.sort(() => Math.random() - 0.5)) {
          const gIds = pool.filter((q) => q.groupId === g).map((q) => q.id);
          if (ids.length + gIds.length > limit && ids.length > 0) break;
          ids.push(...gIds);
        }
      } else {
        ids = pool.sort(() => Math.random() - 0.5).slice(0, limit).map((q) => q.id);
      }
    }
    if (ids.length === 0 && isWrong) {
      ids = s.wrongs.filter((w) => !w.resolved).map((w) => w.questionId);
    }
    const map = new Map<string, Question>();
    for (const q of all) map.set(q.id, q);
    const picked = ids.map((id) => map.get(id)).filter((q): q is Question => !!q);
    const wrongsMap = new Map<string, WrongQuestion>();
    for (const w of s.wrongs) wrongsMap.set(w.questionId, w);
    return { questions: picked, wrongsMap };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (questions.length === 0) {
    return (
      <div className="px-4 pt-10">
        <EmptyState title="没有可做的题目" desc="换一个题型，或先在内容管理中导入题目" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-3">
      <QuestionRunner
        questions={questions}
        mode={isWrong ? 'wrong_review' : 'practice'}
        wrongs={isWrong ? wrongsMap : undefined}
        title={title}
        showExplanation
        exitTo={isWrong ? '/wrongs' : '/practice'}
      />
    </div>
  );
}
