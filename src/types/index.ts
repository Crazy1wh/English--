// ============================================================
// 统一数据模型（V1 本地版存储于 localStorage；字段设计对齐未来 PostgreSQL）
// ============================================================

/** 内容来源 —— 严格区分，禁止把 AI 生成内容伪装成真题 */
export type SourceKind =
  | 'official' // 官方原卷
  | 'verified_real_exam' // 已验证真题
  | 'multi_source_verified' // 多来源交叉验证
  | 'third_party_unverified' // 单一第三方，待核验
  | 'manual' // 人工整理（非真题声明）
  | 'ai_generated' // AI 生成
  | 'demo'; // 开发演示数据

/** 来源可信度 A/B/C/D，仅 A/B 可显示“历年真题”，C=待核验，D=AI模拟题 */
export type Reliability = 'A' | 'B' | 'C' | 'D';

export type Section =
  | 'Phonetics'
  | 'Vocabulary'
  | 'Grammar'
  | 'Cloze'
  | 'Reading'
  | 'Dialogue'
  | 'Writing';

export type Difficulty = 'easy' | 'normal' | 'hard';

export type WordLevel = 'L1' | 'L2' | 'L3' | 'L4' | 'L5';

export type MasteryOwner =
  | { kind: 'word'; id: string }
  | { kind: 'grammar'; id: string }
  | { kind: 'exam_point'; id: string }
  | { kind: 'reading_skill'; id: string }
  | { kind: 'cloze_skill'; id: string }
  | { kind: 'question_type'; id: string }
  | { kind: 'dialogue_scene'; id: string };

// ---------------- 知识树 ----------------

export interface KnowledgeNode {
  id: string; // 稳定唯一 ID，如 grammar.verb.tense.present_perfect
  parentId: string | null;
  category: 'Vocabulary' | 'Grammar' | 'Phonetics' | 'Cloze' | 'Reading' | 'Dialogue' | 'Writing';
  displayName: string; // 中文展示名
  displayNameEn?: string;
  order: number;
}

// ---------------- 词汇 ----------------

export interface Word {
  id: string;
  word: string;
  phonetic: string;
  partOfSpeech: string; // n. v. adj. ...
  coreMeaning: string;
  examMeanings: string[];
  level: WordLevel;
  /** 0-100；无权威词频数据时为 0（unknown），展示为“暂无数据”，禁止臆造 */
  frequencyScore: number;
  phrases: string[];
  collocations: string[];
  synonyms: string[];
  antonyms: string[];
  confusingWords: string[];
  wordFamily: string[];
  exampleSentence: { en: string; zh: string } | null;
  source: SourceKind;
  examYears: number[]; // 仅在已验证真题中出现才填写
  knowledgeTags?: string[];
}

export type WordStatus = 'new' | 'learning' | 'review' | 'mastered';
export type WordGrade = 'again' | 'vague' | 'good' | 'easy'; // 不会 / 模糊 / 认识 / 熟练

export interface WordProgress {
  wordId: string;
  status: WordStatus;
  mastery: number; // 0-100，初始 50 在首次接触时建立
  intervalDays: number;
  due: string; // ISO date (yyyy-mm-dd)
  lastReviewAt: string | null;
  reps: number;
  lapses: number;
}

// ---------------- 语法 ----------------

export interface GrammarExample {
  en: string;
  zh: string;
}

export interface GrammarTopic {
  id: string; // G01..G22
  knowledgeId: string; // 知识树节点
  priority: 'P0' | 'P1' | 'P2';
  title: string;
  /** 1. 一句话核心规则 */
  rule: string;
  /** 2. 核心公式 */
  formula: string;
  /** 3. 典型例句 */
  examples: GrammarExample[];
  /** 4. 中文解释 */
  explanation: string;
  /** 5. 常见错误 */
  commonMistakes: string[];
  /** 6. 易混知识点 */
  confusions: { point: string; detail: string }[];
  /** 7. 真题示例（仅放已验证题目的 id；V1 种子数据保持空数组） */
  realExamQuestionIds: string[];
  relatedKnowledge: string[];
}

// ---------------- 高频考点 ----------------

export interface ExamPoint {
  id: string; // EP01..
  title: string;
  category: string;
  priority: 'P0' | 'P1' | 'P2';
  description: string;
  examples: GrammarExample[];
  relatedWords: string[];
  relatedGrammar: string[];
  relatedQuestions: string[];
  /** 只能通过已验证真题统计产生，初始 0，禁止 AI 填写 */
  realExamCount: number;
  examYears: number[];
}

// ---------------- 题目 ----------------

export interface OptionAnalysis {
  option: string;
  reason: string;
}

export interface Explanation {
  /** 一句话结论 */
  conclusion: string;
  keyPoint: string;
  whyCorrect: string;
  whyWrong: OptionAnalysis[];
  mnemonic?: string;
  relatedKnowledge: string[];
  // 阅读附加
  keywords?: string[];
  locationSentence?: string;
  evidence?: string;
  paraphrase?: string;
  wrongOptionReason?: string;
  // 语法附加
  rule?: string;
  ruleExample?: GrammarExample;
  // 词汇附加
  collocations?: string[];
  confusing?: string[];
}

export interface ClozeBlankTag {
  index: number; // 第几空
  skillTag: string; // C01..C10
}

export interface Question {
  id: string;
  exam: string | null;
  year: number | null;
  region: string | null;
  source: SourceKind;
  sourceUrl: string | null;
  reliability: Reliability;
  isRealExam: boolean; // 仅 reliability A/B 可为 true
  status: 'active' | 'needs_review';
  section: Section;
  /** R01..R06 / C01..C10 / D01..D15 / 语法知识节点 id 等 */
  questionType: string;
  /** 阅读理解/完形的文章 */
  passage?: string;
  /** 完形分组：同一篇文章共享 groupId，每空一道题 */
  groupId?: string;
  groupTitle?: string;
  clozeTags?: ClozeBlankTag[];
  questionText: string;
  options: string[]; // 语音/单选 A-D；补全对话为句子选项
  answer: string; // 正确选项字母，如 'B'
  explanation: Explanation;
  knowledgeTags: string[];
  skillTags: string[];
  difficulty: Difficulty;
  frequencyLevel: number | null; // 仅来自已验证真题统计，否则 null
  createdAt: string;
  updatedAt: string;
  // AI 生成审计字段
  generatedByAi: boolean;
  model: string | null;
  promptVersion: string | null;
}

// ---------------- 补全对话 / 写作内容 ----------------

export interface DialogueScene {
  id: string; // D01..
  knowledgeId: string;
  title: string;
  expressions: { en: string; zh: string }[];
}

export interface WritingKit {
  id: string; // invitation / suggestion ...
  knowledgeId: string;
  title: string;
  format: string[];
  functionalExpressions: string[];
  connectors: string[];
  safeSentences: string[];
  sampleEssay: { prompt: string; text: string };
}

// ---------------- 答题 / 错题 ----------------

/** E01..E10 错误分类 */
export type ErrorType =
  | 'E01'
  | 'E02'
  | 'E03'
  | 'E04'
  | 'E05'
  | 'E06'
  | 'E07'
  | 'E08'
  | 'E09'
  | 'E10';

export interface Attempt {
  id: string;
  questionId: string;
  at: string; // ISO
  selected: string;
  correct: boolean;
  durationSec: number;
  mode: 'practice' | 'mock' | 'wrong_review' | 'remediation';
  predictedErrorType: ErrorType | null;
  userErrorType: ErrorType | null;
  /** 本次触发掌握度更新的知识主体（审计用） */
}

export interface WrongQuestion {
  id: string; // `${questionId}@${firstAt}`
  questionId: string;
  firstAt: string;
  lastAt: string;
  predictedErrorType: ErrorType;
  userErrorType: ErrorType | null;
  consecutiveCorrect: number;
  /** 0=当天 1=次日 2=3天 3=7天 4=14天 */
  stage: number;
  nextReviewAt: string; // ISO date
  resolved: boolean;
}

// ---------------- 学习记录 / 设置 ----------------

export interface DayLog {
  date: string; // yyyy-mm-dd
  minutes: number;
  wordsLearned: number;
  wordsReviewed: number;
  answered: number;
  correct: number;
}

export interface AiConfig {
  baseUrl: string; // OpenAI-compatible，如 https://api.openai.com/v1
  apiKey: string;
  model: string;
}

export interface Settings {
  examDate: string; // yyyy-mm-dd
  dailyMinutes: 20 | 30 | 45 | 60 | 90;
  targetScore: number;
  ai: AiConfig;
}

export interface EssaySubmission {
  id: string;
  at: string;
  kitId: string | null;
  prompt: string;
  text: string;
  gradedBy: 'local' | string; // 'local' 或 `ai:${model}`
  scores: {
    content: number;
    structure: number;
    grammar: number;
    vocabulary: number;
    format: number;
  };
  totalEstimate: number; // 0-100 质量分（本地估算，非官方分值）
  mainErrors: string[];
  suggestions: string[];
  revisedText: string;
}

export interface MockResult {
  id: string;
  at: string;
  paperId: string;
  total: number;
  correctCount: number;
  questionCount: number;
  sectionStats: Record<string, { correct: number; total: number }>;
  durationSec: number;
}

// ---------------- 每日计划 ----------------

export interface PlanItem {
  key: string;
  activity:
    | 'review_words'
    | 'new_words'
    | 'grammar'
    | 'exam_point'
    | 'focused_practice'
    | 'reading_cloze'
    | 'wrong_questions';
  title: string;
  minutes: number;
  count: number;
  payload?: unknown;
}

export interface DailyPlan {
  date: string;
  stage: 'Foundation' | 'Strengthening' | 'Sprint' | 'Final';
  totalMinutes: number;
  items: PlanItem[];
  mustKnow: {
    words: string[];
    collocations: string[];
    grammarId: string;
    sentence: string;
  };
}
