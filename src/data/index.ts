import { KNOWLEDGE_TREE } from './taxonomy';
import { SEED_WORDS as BASE_WORDS } from './words';
import { EXTRA_WORDS } from './words-extra';
import { GRAMMAR_TOPICS } from './grammar';
import { EXAM_POINTS } from './examPoints';
import { SEED_QUESTIONS as DEMO_QUESTIONS } from './questions';
import { REAL_QUESTIONS } from './real-questions';
import { MORE_QUESTIONS } from './more-questions';
import { DIALOGUE_SCENES } from './dialogue';
import { WRITING_KITS, COMMON_CONNECTORS, ALL_SAFE_SENTENCES } from './writing';
import { MOCK_PAPERS } from './papers';
import type { Question, Word } from '@/types';

// 基础演示词（104）+ 成考专升本核心扩充词（L3/L4/L5），按 id 去重
export const SEED_WORDS: Word[] = (() => {
  const seen = new Set<string>();
  const out: Word[] = [];
  for (const w of [...BASE_WORDS, ...EXTRA_WORDS]) {
    if (!seen.has(w.id)) {
      seen.add(w.id);
      out.push(w);
    }
  }
  return out;
})();

// 演示题（82 道）+ 已核验真题 + 第三方模拟题 + 扩充题库
export const SEED_QUESTIONS: Question[] = [...DEMO_QUESTIONS, ...REAL_QUESTIONS, ...MORE_QUESTIONS];

export {
  KNOWLEDGE_TREE,
  GRAMMAR_TOPICS,
  EXAM_POINTS,
  DIALOGUE_SCENES,
  WRITING_KITS,
  COMMON_CONNECTORS,
  ALL_SAFE_SENTENCES,
  MOCK_PAPERS,
};

export const QUESTIONS_BY_ID: Map<string, Question> = new Map(SEED_QUESTIONS.map((q) => [q.id, q]));
