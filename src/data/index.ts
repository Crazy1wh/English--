import { KNOWLEDGE_TREE, canonicalGrammarTag } from './taxonomy';
import { SEED_WORDS as BASE_WORDS } from './words';
import { EXTRA_WORDS } from './words-extra';
import { CET4_WORDS } from './words-cet4';
import { GRAMMAR_TOPICS } from './grammar';
import { EXAM_POINTS } from './examPoints';
import { SEED_QUESTIONS as DEMO_QUESTIONS } from './questions';
import { REAL_QUESTIONS } from './real-questions';
import { MORE_QUESTIONS } from './more-questions';
import { SPECIAL_QUESTIONS } from './special-questions';
import { CET4_QUESTIONS } from './cet4-questions';
import { DIALOGUE_SCENES } from './dialogue';
import { WRITING_KITS, COMMON_CONNECTORS, ALL_SAFE_SENTENCES } from './writing';
import { MOCK_PAPERS } from './papers';
import type { Question, Word } from '@/types';

// 基础辨析词 + 四级扩充词（L2-L4）+ CET-4 高频词，按 id 去重
export const SEED_WORDS: Word[] = (() => {
  const seen = new Set<string>();
  const out: Word[] = [];
  for (const w of [...BASE_WORDS, ...EXTRA_WORDS, ...CET4_WORDS]) {
    if (!seen.has(w.id)) {
      seen.add(w.id);
      out.push(w);
    }
  }
  return out;
})();

// 演示题（82 道）+ 已核验真题 + 第三方模拟题 + 扩充题库 + 语法专项练习题
export const SEED_QUESTIONS: Question[] = [...DEMO_QUESTIONS, ...REAL_QUESTIONS, ...MORE_QUESTIONS, ...SPECIAL_QUESTIONS, ...CET4_QUESTIONS];

export {
  KNOWLEDGE_TREE,
  canonicalGrammarTag,
  GRAMMAR_TOPICS,
  EXAM_POINTS,
  DIALOGUE_SCENES,
  WRITING_KITS,
  COMMON_CONNECTORS,
  ALL_SAFE_SENTENCES,
  MOCK_PAPERS,
};

export const QUESTIONS_BY_ID: Map<string, Question> = new Map(SEED_QUESTIONS.map((q) => [q.id, q]));
