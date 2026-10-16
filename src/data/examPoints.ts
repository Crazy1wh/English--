import type { ExamPoint } from '@/types';

// 高频考点框架（文档第七章）。
// realExamCount / examYears 初始为 0/空：只能由“已验证真题”统计回填，禁止 AI 编造。
export const EXAM_POINTS: ExamPoint[] = [
  {
    id: 'EP01', title: '动词搭配', category: '词汇', priority: 'P0',
    description: '动词与介词、副词的固定组合是单选和完形的高频得分点。',
    examples: [
      { en: 'look forward to doing sth', zh: '盼望做某事（to 是介词，后接 doing）' },
      { en: 'put off / give up / take up', zh: '推迟 / 放弃 / 开始从事' },
      { en: 'get along with sb', zh: '与某人相处' },
    ],
    relatedWords: ['word.look', 'word.get', 'word.take', 'word.give'],
    relatedGrammar: ['G03'], relatedQuestions: [],
    realExamCount: 0, examYears: [],
  },
  {
    id: 'EP02', title: '介词搭配', category: '词汇', priority: 'P0',
    description: '形容词/名词/动词后的固定介词，考点重复率高，靠背记拿分。',
    examples: [
      { en: 'be good at / be interested in / be afraid of', zh: '擅长 / 对……感兴趣 / 害怕' },
      { en: 'be proud of / be different from', zh: '为……自豪 / 与……不同' },
      { en: 'at 6 o’clock; on Monday; in 2024', zh: '时间介词基本规则' },
    ],
    relatedWords: ['word.used_to'], relatedGrammar: ['G12'], relatedQuestions: [],
    realExamCount: 0, examYears: [],
  },
  {
    id: 'EP03', title: 'doing / to do', category: '语法', priority: 'P0',
    description: '非谓语选择：固定搭配 + 与逻辑主语的主被动关系，每年必考。',
    examples: [
      { en: 'enjoy/finish/avoid/mind/suggest + doing', zh: '只接 doing 的动词' },
      { en: 'decide/hope/refuse/promise + to do', zh: '只接 to do 的动词' },
      { en: 'remember/stop/forget doing ↔ to do', zh: '意思不同，重点辨析' },
    ],
    relatedWords: ['word.enjoy', 'word.finish', 'word.remember', 'word.stop'],
    relatedGrammar: ['G03'], relatedQuestions: [],
    realExamCount: 0, examYears: [],
  },
  {
    id: 'EP04', title: '时态标志词', category: '语法', priority: 'P0',
    description: '看到时间标志词立即反推时态，是时态题最快的解法。',
    examples: [
      { en: 'always/usually/every day → 一般现在', zh: '' },
      { en: 'already/yet/ever/never/since/for → 现在完成', zh: '' },
      { en: 'yesterday/ago/in 2010/just now → 一般过去', zh: '' },
      { en: 'Look!/Listen!/at this time yesterday → 进行时', zh: '' },
    ],
    relatedWords: [], relatedGrammar: ['G01'], relatedQuestions: [],
    realExamCount: 0, examYears: [],
  },
  {
    id: 'EP05', title: '连词和逻辑关系', category: '语法/完形', priority: 'P0',
    description: '通过前后句逻辑（转折/因果/递进/条件）选连词，完形必考。',
    examples: [
      { en: 'but / however / while（转折）', zh: '' },
      { en: 'because / since / as / so（因果）', zh: '' },
      { en: 'if / unless / as long as（条件）', zh: '' },
      { en: 'and / besides / what’s more（递进）', zh: '' },
    ],
    relatedWords: ['word.although', 'word.because'], relatedGrammar: ['G06', 'G13'], relatedQuestions: [],
    realExamCount: 0, examYears: [],
  },
  {
    id: 'EP06', title: '阅读同义替换', category: '阅读', priority: 'P0',
    description: '正确选项几乎从不照抄原文，而是换一种说法。识别 paraphrase 是阅读第一能力。',
    examples: [
      { en: 'hardly ever ≈ seldom；important ≈ of great importance', zh: '' },
      { en: 'look after ≈ take care of；give up ≈ stop trying', zh: '' },
    ],
    relatedWords: [], relatedGrammar: [], relatedQuestions: [],
    realExamCount: 0, examYears: [],
  },
  {
    id: 'EP07', title: '熟词生义', category: '阅读', priority: 'P1',
    description: '认识的词在文中出现陌生含义，需结合上下文判断。',
    examples: [
      { en: 'run：跑 → 经营(run a shop) / 运转', zh: '' },
      { en: 'fine：好的 → 罚款；weather 还可作动词“经受”', zh: '' },
      { en: 'leave：离开 → 留下 / 遗忘', zh: '' },
    ],
    relatedWords: ['word.run', 'word.leave'], relatedGrammar: [], relatedQuestions: [],
    realExamCount: 0, examYears: [],
  },
  {
    id: 'EP08', title: '固定句型', category: '语法/写作', priority: 'P0',
    description: '完形、单选、作文三处通吃的句型，背熟直接套。',
    examples: [
      { en: 'It takes sb some time to do sth', zh: '做某事花费某人多久' },
      { en: 'It is + adj. + (for sb) + to do sth', zh: '（对某人来说）做某事是……的' },
      { en: 'not ... until ...', zh: '直到……才……' },
      { en: 'so ... that ... / such ... that ...', zh: '如此……以至于……' },
    ],
    relatedWords: ['word.take'], relatedGrammar: ['G21'], relatedQuestions: [],
    realExamCount: 0, examYears: [],
  },
  {
    id: 'EP09', title: '完形逻辑词', category: '完形', priority: 'P1',
    description: '靠上下文信号解题：指代、转折、因果、举例、顺序词。',
    examples: [
      { en: 'however, instead, therefore, for example', zh: '' },
      { en: 'first, then, finally; this, that, such', zh: '' },
    ],
    relatedWords: [], relatedGrammar: ['G13'], relatedQuestions: [],
    realExamCount: 0, examYears: [],
  },
  {
    id: 'EP10', title: '写作功能句', category: '写作', priority: 'P1',
    description: '开头、衔接、结尾的安全句型，保证作文结构完整、少犯错。',
    examples: [
      { en: 'I am writing to tell you / invite you to...', zh: '写信开头' },
      { en: 'Here are some suggestions for you.', zh: '建议类过渡' },
      { en: 'I am looking forward to your reply.', zh: '信件结尾' },
      { en: 'In a word, we should...', zh: '观点类结尾' },
    ],
    relatedWords: [], relatedGrammar: ['G21'], relatedQuestions: [],
    realExamCount: 0, examYears: [],
  },
];
