import type { KnowledgeNode } from '@/types';

// 统一知识树：稳定 ID 关联一切内容，中文仅作 display_name（文档第三章）
export const KNOWLEDGE_TREE: KnowledgeNode[] = [
  // 01 Vocabulary
  { id: 'vocabulary', parentId: null, category: 'Vocabulary', displayName: '词汇', order: 1 },
  { id: 'vocabulary.collocation', parentId: 'vocabulary', category: 'Vocabulary', displayName: '高频搭配', order: 1 },
  { id: 'vocabulary.collocation.verb_preposition', parentId: 'vocabulary.collocation', category: 'Vocabulary', displayName: '动词+介词', order: 1 },
  { id: 'vocabulary.collocation.adj_preposition', parentId: 'vocabulary.collocation', category: 'Vocabulary', displayName: '形容词+介词', order: 2 },
  { id: 'vocabulary.collocation.verb_infinitive', parentId: 'vocabulary.collocation', category: 'Vocabulary', displayName: '动词+to do', order: 3 },
  { id: 'vocabulary.collocation.verb_gerund', parentId: 'vocabulary.collocation', category: 'Vocabulary', displayName: '动词+doing', order: 4 },
  { id: 'vocabulary.collocation.verb_sb_to_do', parentId: 'vocabulary.collocation', category: 'Vocabulary', displayName: '动词+sb+to do', order: 5 },
  { id: 'vocabulary.collocation.fixed_phrase', parentId: 'vocabulary.collocation', category: 'Vocabulary', displayName: '固定短语', order: 6 },
  { id: 'vocabulary.collocation.sentence_pattern', parentId: 'vocabulary.collocation', category: 'Vocabulary', displayName: '固定句型', order: 7 },
  { id: 'vocabulary.confusables', parentId: 'vocabulary', category: 'Vocabulary', displayName: '易混词', order: 2 },
  { id: 'vocabulary.word_family', parentId: 'vocabulary', category: 'Vocabulary', displayName: '词族派生', order: 3 },

  // 02 Grammar
  { id: 'grammar', parentId: null, category: 'Grammar', displayName: '语法', order: 2 },
  { id: 'grammar.verb', parentId: 'grammar', category: 'Grammar', displayName: '动词', order: 1 },
  { id: 'grammar.verb.tense', parentId: 'grammar.verb', category: 'Grammar', displayName: '时态', order: 1 },
  { id: 'grammar.verb.tense.simple_present', parentId: 'grammar.verb.tense', category: 'Grammar', displayName: '一般现在时', order: 1 },
  { id: 'grammar.verb.tense.simple_past', parentId: 'grammar.verb.tense', category: 'Grammar', displayName: '一般过去时', order: 2 },
  { id: 'grammar.verb.tense.simple_future', parentId: 'grammar.verb.tense', category: 'Grammar', displayName: '一般将来时', order: 3 },
  { id: 'grammar.verb.tense.present_continuous', parentId: 'grammar.verb.tense', category: 'Grammar', displayName: '现在进行时', order: 4 },
  { id: 'grammar.verb.tense.past_continuous', parentId: 'grammar.verb.tense', category: 'Grammar', displayName: '过去进行时', order: 5 },
  { id: 'grammar.verb.tense.present_perfect', parentId: 'grammar.verb.tense', category: 'Grammar', displayName: '现在完成时', order: 6 },
  { id: 'grammar.verb.tense.past_perfect', parentId: 'grammar.verb.tense', category: 'Grammar', displayName: '过去完成时', order: 7 },
  { id: 'grammar.verb.tense.present_perfect_continuous', parentId: 'grammar.verb.tense', category: 'Grammar', displayName: '现在完成进行时', order: 8 },
  { id: 'grammar.verb.tense.future_in_past', parentId: 'grammar.verb.tense', category: 'Grammar', displayName: '过去将来时', order: 9 },
  { id: 'grammar.verb.tense.future_perfect', parentId: 'grammar.verb.tense', category: 'Grammar', displayName: '将来完成时', order: 10 },
  { id: 'grammar.verb.passive', parentId: 'grammar.verb', category: 'Grammar', displayName: '被动语态', order: 2 },
  { id: 'grammar.non_finite', parentId: 'grammar.verb', category: 'Grammar', displayName: '非谓语动词', order: 3 },
  { id: 'grammar.non_finite.infinitive', parentId: 'grammar.non_finite', category: 'Grammar', displayName: '不定式 to do', order: 1 },
  { id: 'grammar.non_finite.gerund', parentId: 'grammar.non_finite', category: 'Grammar', displayName: '动名词 doing', order: 2 },
  { id: 'grammar.non_finite.participle', parentId: 'grammar.non_finite', category: 'Grammar', displayName: '分词 done/doing', order: 3 },
  { id: 'grammar.modal', parentId: 'grammar.verb', category: 'Grammar', displayName: '情态动词', order: 4 },
  { id: 'grammar.clause', parentId: 'grammar', category: 'Grammar', displayName: '从句', order: 2 },
  { id: 'grammar.clause.relative', parentId: 'grammar.clause', category: 'Grammar', displayName: '定语从句', order: 1 },
  { id: 'grammar.clause.adverbial', parentId: 'grammar.clause', category: 'Grammar', displayName: '状语从句', order: 2 },
  { id: 'grammar.clause.noun', parentId: 'grammar.clause', category: 'Grammar', displayName: '名词性从句', order: 3 },
  { id: 'grammar.agreement', parentId: 'grammar', category: 'Grammar', displayName: '主谓一致', order: 3 },
  { id: 'grammar.adj_adv', parentId: 'grammar', category: 'Grammar', displayName: '形容词和副词', order: 4 },
  { id: 'grammar.article', parentId: 'grammar', category: 'Grammar', displayName: '冠词', order: 5 },
  { id: 'grammar.pronoun', parentId: 'grammar', category: 'Grammar', displayName: '代词', order: 6 },
  { id: 'grammar.preposition', parentId: 'grammar', category: 'Grammar', displayName: '介词', order: 7 },
  { id: 'grammar.conjunction', parentId: 'grammar', category: 'Grammar', displayName: '连词', order: 8 },
  { id: 'grammar.noun', parentId: 'grammar', category: 'Grammar', displayName: '名词', order: 9 },
  { id: 'grammar.numeral', parentId: 'grammar', category: 'Grammar', displayName: '数词', order: 10 },
  { id: 'grammar.subjunctive', parentId: 'grammar', category: 'Grammar', displayName: '虚拟语气', order: 11 },
  { id: 'grammar.inversion', parentId: 'grammar', category: 'Grammar', displayName: '倒装', order: 12 },
  { id: 'grammar.emphasis', parentId: 'grammar', category: 'Grammar', displayName: '强调句', order: 13 },
  { id: 'grammar.tag_question', parentId: 'grammar', category: 'Grammar', displayName: '反意疑问句', order: 14 },
  { id: 'grammar.exclamation', parentId: 'grammar', category: 'Grammar', displayName: '感叹句', order: 15 },
  { id: 'grammar.sentence_pattern', parentId: 'grammar', category: 'Grammar', displayName: '五种基本句型', order: 16 },
  { id: 'grammar.word_formation', parentId: 'grammar', category: 'Grammar', displayName: '构词法', order: 17 },

  // 03 Phonetics
  { id: 'phonetics', parentId: null, category: 'Phonetics', displayName: '语音', order: 3 },
  { id: 'phonetics.vowel', parentId: 'phonetics', category: 'Phonetics', displayName: '元音辨音', order: 1 },
  { id: 'phonetics.consonant', parentId: 'phonetics', category: 'Phonetics', displayName: '辅音辨音', order: 2 },
  { id: 'phonetics.stress', parentId: 'phonetics', category: 'Phonetics', displayName: '单词重音', order: 3 },

  // 04 Cloze
  { id: 'cloze', parentId: null, category: 'Cloze', displayName: '完形填空', order: 4 },
  { id: 'cloze.C01', parentId: 'cloze', category: 'Cloze', displayName: '词义辨析', order: 1 },
  { id: 'cloze.C02', parentId: 'cloze', category: 'Cloze', displayName: '固定搭配', order: 2 },
  { id: 'cloze.C03', parentId: 'cloze', category: 'Cloze', displayName: '动词搭配', order: 3 },
  { id: 'cloze.C04', parentId: 'cloze', category: 'Cloze', displayName: '时态', order: 4 },
  { id: 'cloze.C05', parentId: 'cloze', category: 'Cloze', displayName: '非谓语', order: 5 },
  { id: 'cloze.C06', parentId: 'cloze', category: 'Cloze', displayName: '介词', order: 6 },
  { id: 'cloze.C07', parentId: 'cloze', category: 'Cloze', displayName: '连词', order: 7 },
  { id: 'cloze.C08', parentId: 'cloze', category: 'Cloze', displayName: '代词', order: 8 },
  { id: 'cloze.C09', parentId: 'cloze', category: 'Cloze', displayName: '上下文逻辑', order: 9 },
  { id: 'cloze.C10', parentId: 'cloze', category: 'Cloze', displayName: '篇章逻辑', order: 10 },

  // 05 Reading
  { id: 'reading', parentId: null, category: 'Reading', displayName: '阅读理解', order: 5 },
  { id: 'reading.R01', parentId: 'reading', category: 'Reading', displayName: '细节题', order: 1 },
  { id: 'reading.R02', parentId: 'reading', category: 'Reading', displayName: '主旨题', order: 2 },
  { id: 'reading.R03', parentId: 'reading', category: 'Reading', displayName: '推断题', order: 3 },
  { id: 'reading.R04', parentId: 'reading', category: 'Reading', displayName: '词义猜测', order: 4 },
  { id: 'reading.R05', parentId: 'reading', category: 'Reading', displayName: '作者态度', order: 5 },
  { id: 'reading.R06', parentId: 'reading', category: 'Reading', displayName: '指代题', order: 6 },

  // 06 Dialogue
  { id: 'dialogue', parentId: null, category: 'Dialogue', displayName: '补全对话', order: 6 },
  ...([
    ['D01', '问候'], ['D02', '介绍'], ['D03', '感谢'], ['D04', '道歉'], ['D05', '邀请'],
    ['D06', '建议'], ['D07', '请求'], ['D08', '问路'], ['D09', '购物'], ['D10', '餐厅'],
    ['D11', '看病'], ['D12', '打电话'], ['D13', '祝贺'], ['D14', '赞同'], ['D15', '告别'],
    ['D16', '天气'], ['D17', '住酒店'], ['D18', '银行与邮局'], ['D19', '求职面试'],
    ['D20', '校园学习'], ['D21', '交通出行'], ['D22', '兴趣爱好'],
  ] as const).map(([d, name], i) => ({
    id: `dialogue.${d}`,
    parentId: 'dialogue',
    category: 'Dialogue' as const,
    displayName: name,
    order: i + 1,
  })),

  // 07 Writing
  { id: 'writing', parentId: null, category: 'Writing', displayName: '写作', order: 7 },
  { id: 'writing.W1', parentId: 'writing', category: 'Writing', displayName: '格式', order: 1 },
  { id: 'writing.W2', parentId: 'writing', category: 'Writing', displayName: '功能表达', order: 2 },
  { id: 'writing.W3', parentId: 'writing', category: 'Writing', displayName: '连接表达', order: 3 },
  { id: 'writing.W4', parentId: 'writing', category: 'Writing', displayName: '安全句型', order: 4 },
];

// ============================================================
// 真题/第三方题使用扁平标签（如 grammar.tense），语法 22 讲使用层级
// knowledgeId（如 grammar.verb.tense）。本表把题目标签归一到标准知识树节点，
// 让真题的答题数据能正确归因到语法讲的掌握度与"真题示例"。
// ============================================================
const GRAMMAR_TAG_ALIASES: Record<string, string> = {
  'grammar.tense': 'grammar.verb.tense',
  'grammar.voice': 'grammar.verb.passive',
  'grammar.participle': 'grammar.non_finite',
  'grammar.infinitive': 'grammar.non_finite',
  'grammar.causative': 'grammar.non_finite',
  'grammar.modal': 'grammar.modal',
  'grammar.relative': 'grammar.clause.relative',
  'grammar.wh': 'grammar.clause.relative',
  'grammar.conditional': 'grammar.clause.adverbial',
  'grammar.so': 'grammar.clause.adverbial',
  'grammar.noun_clause': 'grammar.clause.noun',
  'grammar.sva': 'grammar.agreement',
  'grammar.subject_verb': 'grammar.agreement',
  'grammar.subject_verb_agreement': 'grammar.agreement',
  'grammar.comparison': 'grammar.adj_adv',
  'grammar.article': 'grammar.article',
  'grammar.pronoun': 'grammar.pronoun',
  'grammar.preposition': 'grammar.preposition',
  'grammar.conj': 'grammar.conjunction',
  'grammar.parallel': 'grammar.conjunction',
  'grammar.noun': 'grammar.noun',
  'grammar.subjunctive': 'grammar.subjunctive',
  'grammar.inversion': 'grammar.inversion',
  'grammar.emphasis': 'grammar.emphasis',
  'grammar.tag_question': 'grammar.tag_question',
  'grammar.exclamation': 'grammar.exclamation',
  'grammar.ellipsis': 'grammar.sentence_pattern',
  'grammar.part_of_speech': 'grammar.word_formation',
};

/** 把任意题目标签归一到知识树标准 id；非语法/无映射的标签原样返回 */
export function canonicalGrammarTag(tag: string): string {
  if (!tag.startsWith('grammar.')) return tag;
  if (GRAMMAR_TAG_ALIASES[tag]) return GRAMMAR_TAG_ALIASES[tag]!;
  // 逐级回退：grammar.tense.past_perfect → grammar.tense → grammar.verb.tense
  const parent = tag.slice(0, tag.lastIndexOf('.'));
  return GRAMMAR_TAG_ALIASES[parent] ?? tag;
}
