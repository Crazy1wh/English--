import type { Explanation, Question } from '@/types';

// ============================================================
// 语法专项练习题（人工编写，非真题）
// 针对题量为 0 / 偏少的 P1-P2 语法讲：G15 数词、G16 虚拟语气、
// G17 倒装、G22 构词法。
// 内容为通用英语语言知识（source='manual' / reliability='D' /
// isRealExam=false），与真题严格区分，不伪装成真题。
// ============================================================

const STAMP = '2026-10-18T00:00:00.000Z';

interface SQSeed {
  id: string;
  tag: string; // 语法知识树节点，如 grammar.numeral
  text: string;
  options: string[];
  answer: string;
  conclusion: string;
  keyPoint: string;
  why: string;
  wrong: [string, string][];
}

function sq(s: SQSeed): Question {
  const explanation: Explanation = {
    conclusion: s.conclusion,
    keyPoint: s.keyPoint,
    whyCorrect: s.why,
    whyWrong: s.wrong.map(([option, reason]) => ({ option, reason })),
    relatedKnowledge: [s.tag],
  };
  return {
    id: s.id,
    exam: null,
    year: null,
    region: null,
    source: 'manual',
    sourceUrl: null,
    reliability: 'D',
    isRealExam: false,
    status: 'active',
    section: 'Grammar',
    questionType: s.tag,
    questionText: s.text,
    options: s.options,
    answer: s.answer,
    explanation,
    knowledgeTags: [s.tag],
    skillTags: [],
    difficulty: 'normal',
    frequencyLevel: null,
    createdAt: STAMP,
    updatedAt: STAMP,
    generatedByAi: false,
    model: null,
    promptVersion: null,
  };
}

// G15 数词
const NUMERAL: SQSeed[] = [
  {
    id: 'sp.g15.01', tag: 'grammar.numeral',
    text: 'Two ___ of the students in our school are girls.',
    options: ['third', 'three', 'thirds', 'threes'],
    answer: 'C',
    conclusion: '分数表达：分子用基数词，分母用序数词；分子大于 1，分母加 -s。',
    keyPoint: 'two thirds 三分之二',
    why: '三分之二写作 two thirds，分子 two > 1，分母 third 要加 s。',
    wrong: [['A', 'third 是单数分母，只用于 one third。'], ['B', 'three 是基数词，不能直接作分母。'], ['D', 'threes 不构成分数写法。']],
  },
  {
    id: 'sp.g15.02', tag: 'grammar.numeral',
    text: '___ people took part in the sports meeting last Friday.',
    options: ['Hundred of', 'Hundreds of', 'Hundreds', 'Two hundreds'],
    answer: 'B',
    conclusion: 'hundred/thousand/million 表概数"数百"时用 hundreds of。',
    keyPoint: '具体数字不加 s；概数加 s + of',
    why: '表"成百上千的人"用 hundreds of people；有具体数字时才是 two hundred（不加 s）。',
    wrong: [['A', 'hundred of 结构错误。'], ['C', 'hundreds 后缺 of 不能接名词。'], ['D', '具体数字 two hundred 不加 s。']],
  },
  {
    id: 'sp.g15.03', tag: 'grammar.numeral',
    text: 'Mr. Green lives on ___ floor of the building.',
    options: ['nine', 'the nine', 'ninth', 'the ninth'],
    answer: 'D',
    conclusion: '表顺序"第几层"用 the + 序数词。',
    keyPoint: 'the + 序数词 + floor',
    why: '九楼即 the ninth floor，序数词前通常加 the。',
    wrong: [['A', 'nine 是基数词，不表顺序。'], ['B', 'the nine 结构不存在。'], ['C', 'ninth 缺定冠词 the。']],
  },
  {
    id: 'sp.g15.04', tag: 'grammar.numeral',
    text: 'About ___ of the workers in this factory are from the countryside.',
    options: ['three fifth', 'three fifths', 'third fifth', 'third fifths'],
    answer: 'B',
    conclusion: '五分之三写作 three fifths。',
    keyPoint: '分子基数，分母序数，分子>1 分母加 s',
    why: '分子用基数词 three，分母用序数词 fifth，因分子大于 1，fifth 变 fifths。',
    wrong: [['A', 'fifth 没有加 s。'], ['C', '分子不能用序数词 third。'], ['D', '分子分母都写成了序数词。']],
  },
  {
    id: 'sp.g15.05', tag: 'grammar.numeral',
    text: '—What time is it by your watch? —It is ___.',
    options: ['half past three', 'three half', 'half to three', 'half three'],
    answer: 'A',
    conclusion: '三点半的规范写法是 half past three。',
    keyPoint: 'half past + 小时',
    why: '分钟 ≤30 用 past：half past three 表示三点半。',
    wrong: [['B', 'three half 不是英语时间表达。'], ['C', 'half to three 逻辑错误，to 表示"差……到下一点"。'], ['D', 'half three 缺少介词。']],
  },
];

// G16 虚拟语气
const SUBJUNCTIVE: SQSeed[] = [
  {
    id: 'sp.g16.01', tag: 'grammar.subjunctive',
    text: 'If I ___ you, I would accept the offer and work in that city.',
    options: ['am', 'was', 'were', 'will be'],
    answer: 'C',
    conclusion: '与现在事实相反的假设，if 从句用过去式，be 动词一律用 were。',
    keyPoint: 'If I were you, ... would do',
    why: 'If I were you 是固定虚拟句式，正式英语中各人称都用 were。',
    wrong: [['A', 'am 用于真实条件句。'], ['B', '口语中偶见 was，但规范虚拟语气用 were。'], ['D', 'will be 是将来时真实语气。']],
  },
  {
    id: 'sp.g16.02', tag: 'grammar.subjunctive',
    text: 'If he ___ harder last term, he would have passed the final exam.',
    options: ['studied', 'had studied', 'studies', 'has studied'],
    answer: 'B',
    conclusion: '与过去事实相反：if 从句用 had done，主句 would have done。',
    keyPoint: 'if ... had done, ... would have done',
    why: 'last term 指过去，实际没有努力，从句用过去完成时 had studied。',
    wrong: [['A', 'studied 用于与现在相反。'], ['C', 'studies 是一般现在时。'], ['D', 'has studied 是现在完成时，不用于虚拟。']],
  },
  {
    id: 'sp.g16.03', tag: 'grammar.subjunctive',
    text: 'The doctor suggested that the patient ___ up smoking at once.',
    options: ['gives', 'gave', 'give', 'would give'],
    answer: 'C',
    conclusion: 'suggest（建议）后的宾语从句用 (should) + 动词原形。',
    keyPoint: 'suggest that sb. (should) do',
    why: '一坚持二命令三建议四要求后的从句用虚拟语气，should 可省略，故用 give。',
    wrong: [['A', 'gives 是陈述语气第三人称单数。'], ['B', 'gave 是过去式。'], ['D', 'would give 不是该句式结构。']],
  },
  {
    id: 'sp.g16.04', tag: 'grammar.subjunctive',
    text: 'I wish I ___ how to drive a car; it would be very useful.',
    options: ['know', 'knew', 'have known', 'will know'],
    answer: 'B',
    conclusion: 'wish 后表与现在相反的愿望，从句动词用过去式。',
    keyPoint: 'I wish I knew ...',
    why: '实际现在不会开车，wish 后的从句退到一般过去时，用 knew。',
    wrong: [['A', 'know 是现在时，不表愿望反差。'], ['C', 'have known 表与过去相反时应为 had known。'], ['D', 'will know 是将来时。']],
  },
  {
    id: 'sp.g16.05', tag: 'grammar.subjunctive',
    text: 'If it ___ rain tomorrow, the sports meeting would be put off.',
    options: ['rains', 'will rain', 'should rain', 'is going to rain'],
    answer: 'C',
    conclusion: '与将来事实相反的假设，从句可用 should + 动词原形。',
    keyPoint: 'if ... should do, ... would do',
    why: '主句 would be put off 提示虚拟语气，从句用 should rain 表将来可能性极小的假设。',
    wrong: [['A', 'rains 用于真实条件句（主将从现）。'], ['B', 'if 从句不用 will。'], ['D', 'be going to 不用于虚拟条件句。']],
  },
];

// G17 倒装
const INVERSION: SQSeed[] = [
  {
    id: 'sp.g17.01', tag: 'grammar.inversion',
    text: 'Never ___ such a wonderful place before I came to this city.',
    options: ['I have seen', 'have I seen', 'I saw', 'did I saw'],
    answer: 'B',
    conclusion: '否定词 Never 置于句首，句子用部分倒装：助动词 + 主语。',
    keyPoint: 'Never + 助动词 + 主语 + 过去分词',
    why: 'before 提示完成时，Never 开头倒装，助动词 have 提前到主语 I 之前，即 have I seen。',
    wrong: [['A', '陈述句语序，未倒装。'], ['C', '一般过去时且未倒装。'], ['D', 'did 后应接动词原形 see，形式本身也错误。']],
  },
  {
    id: 'sp.g17.02', tag: 'grammar.inversion',
    text: 'Only by practicing every day ___ improve your spoken English.',
    options: ['you can', 'can you', 'you will', 'you'],
    answer: 'B',
    conclusion: 'Only + 状语置于句首，主句部分倒装，情态动词提前。',
    keyPoint: 'Only + 状语 + 助动词/情态动词 + 主语',
    why: 'Only by practicing... 位于句首，情态动词 can 提到主语 you 前，用 can you。',
    wrong: [['A', '正常语序，Only 置句首时必须倒装。'], ['C', 'will 在此语气不通，且未倒装。'], ['D', '缺助动词，句子结构不完整。']],
  },
  {
    id: 'sp.g17.03', tag: 'grammar.inversion',
    text: 'Hardly ___ the classroom when the bell rang.',
    options: ['I entered', 'did I enter', 'had I entered', 'I had entered'],
    answer: 'C',
    conclusion: 'Hardly ... when ... 表示"一……就……"，Hardly 置句首时用过去完成时倒装。',
    keyPoint: 'Hardly had + 主语 + done ... when ...',
    why: '"进教室"发生在"铃响"之前，用过去完成时；Hardly 句首倒装，即 had I entered。',
    wrong: [['A', '时态和语序都不对。'], ['B', 'did 后接原形且时态应为过去完成。'], ['D', '语序未倒装。']],
  },
  {
    id: 'sp.g17.04', tag: 'grammar.inversion',
    text: 'Look! ___. Let\'s get on quickly.',
    options: ['Here the bus comes', 'Here comes the bus', 'The bus comes here', 'Comes here the bus'],
    answer: 'B',
    conclusion: 'here/there 置于句首且主语是名词时，用全部倒装。',
    keyPoint: 'Here + 动词 + 名词主语',
    why: '主语 the bus 是名词，Here comes the bus 为全倒装；若主语是代词则说 Here it comes。',
    wrong: [['A', '主语为名词时不能用正常语序。'], ['C', 'here 未提前，不符合提示语境。'], ['D', '全倒装应是 Here comes ...，不是 Comes here ...。']],
  },
  {
    id: 'sp.g17.05', tag: 'grammar.inversion',
    text: 'Not only ___ English well, but he also speaks good French.',
    options: ['he speaks', 'speaks he', 'does he speak', 'he does speak'],
    answer: 'C',
    conclusion: 'Not only 置于句首，其后的分句用部分倒装。',
    keyPoint: 'Not only + 助动词 + 主语 + 动词原形',
    why: '一般现在时、主语第三人称单数，借助 does 提前，动词还原为 speak，即 does he speak。',
    wrong: [['A', '未倒装。'], ['B', '实义动词不能直接提到主语前构成倒装。'], ['D', '助动词位置错误。']],
  },
];

// G22 构词法
const WORD_FORMATION: SQSeed[] = [
  {
    id: 'sp.g22.01', tag: 'grammar.word_formation',
    text: 'It is ___ to speak loudly in the reading room.',
    options: ['impolite', 'unpolite', 'dispolite', 'inpolite'],
    answer: 'A',
    conclusion: 'polite 的否定前缀用 im-（在 b/m/p 前 in- 同化为 im-）。',
    keyPoint: 'im- 用在 b/m/p 前：impolite, impossible',
    why: 'polite 以 p 开头，否定形式为 impolite，意为"不礼貌的"。',
    wrong: [['B', 'un- 不用于 p 开头的该词。'], ['C', 'dis- 不与 polite 搭配。'], ['D', 'in- 在 p 前要同化为 im-。']],
  },
  {
    id: 'sp.g22.02', tag: 'grammar.word_formation',
    text: 'His ___ in the exam made both his parents and teacher unhappy.',
    options: ['careless', 'carefulness', 'carelessness', 'carelessly'],
    answer: 'C',
    conclusion: '物主代词 His 后需要名词；careless 的名词形式是 carelessness。',
    keyPoint: '-less 形容词 + -ness → 名词',
    why: 'care（小心）→ careful/careless（形容词）→ carelessness（粗心，名词），此处作主语。',
    wrong: [['A', 'careless 是形容词，不能作主语中心词。'], ['B', 'carefulness 意为"细心"，与句意相反。'], ['D', 'carelessly 是副词。']],
  },
  {
    id: 'sp.g22.03', tag: 'grammar.word_formation',
    text: 'The teacher asked the students to ___ the composition after correcting the mistakes.',
    options: ['rewrite', 'unwrite', 'diswrite', 'inwrite'],
    answer: 'A',
    conclusion: '前缀 re- 表示"再、重新"，rewrite 即重写。',
    keyPoint: 're- + 动词 = 重新做',
    why: '改完错误后重新写作文，用 rewrite（re- 再 + write 写）。',
    wrong: [['B', 'un- 表否定/相反，不与 write 构词。'], ['C', 'dis- 不与 write 搭配。'], ['D', 'in- 不与 write 搭配。']],
  },
  {
    id: 'sp.g22.04', tag: 'grammar.word_formation',
    text: 'Which of the following is a compound word（合成词）?',
    options: ['unhappy', 'blackboard', 'happiness', 'careful'],
    answer: 'B',
    conclusion: 'blackboard 由 black + board 两个独立单词合成。',
    keyPoint: '合成词 = 单词 + 单词',
    why: 'black（黑色的）+ board（木板）→ blackboard（黑板）；其余都是加词缀的派生词。',
    wrong: [['A', 'unhappy 是加前缀 un- 的派生词。'], ['C', 'happiness 是加后缀 -ness 的派生词。'], ['D', 'careful 是加后缀 -ful 的派生词。']],
  },
  {
    id: 'sp.g22.05', tag: 'grammar.word_formation',
    text: 'When she heard the bad news, she looked at me ___ and said nothing.',
    options: ['sad', 'sadly', 'sadness', 'sadder'],
    answer: 'B',
    conclusion: '修饰动词短语 looked at 要用副词；sad + -ly → sadly。',
    keyPoint: '形容词 + -ly → 副词，修饰动词',
    why: '空格修饰动词 looked，需用副词 sadly（悲伤地）。',
    wrong: [['A', 'sad 是形容词，不能修饰动词。'], ['C', 'sadness 是名词。'], ['D', 'sadder 是形容词比较级。']],
  },
];

export const SPECIAL_QUESTIONS: Question[] = [
  ...NUMERAL.map(sq),
  ...SUBJUNCTIVE.map(sq),
  ...INVERSION.map(sq),
  ...WORD_FORMATION.map(sq),
];
