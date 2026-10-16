import type {
  Difficulty,
  Explanation,
  Question,
  Section,
  SourceKind,
} from '@/types';

// ============================================================
// 真题库 + 模拟题库（来源可追溯）
//
// 可信度纪律：
// - 2023 年真题：题干与选项来自 faiusr.com 公开 PDF（含官方【考情点拨】【应试指导】解析），
//   答案经原文核验（语音/词汇语法/阅读由题干可直接判定，完形按官方解析逻辑推断）。
//   source='verified_real_exam'、reliability='B'、isRealExam=true。
//   注意：2023 真题完整试卷为 1–55 题（语音5+词汇15+完形15+阅读4篇16题+...），
//   本文件收录 1–51 题（阅读 Passage 5 及补全对话因来源 PDF 抓取截断未纳入）。
//
// - 2024 模拟题：来自 eol.cn 公开发布的"成人高考专升本英语模拟试题"（含完整答案），
//   source='third_party_unverified'、reliability='C'、isRealExam=false。
//   收录 1–51 题（第 52 题起页面截断）。
//
// 所有题干/选项/答案均来自上述真实来源，未编造。解析为基于语法知识的简明撰写。
// ============================================================

const SOURCE_2023_URL =
  'https://32004214.s21i.faiusr.com/61/ABUIABA9GAAgqbfCtAYoxumNhwY.pdf';
const SOURCE_MOCK_URL =
  'http://www.eol.cn/chengkao/xckwyw/2025070816456.html';

interface QSeed {
  id: string;
  section: Section;
  questionType: string;
  text: string;
  options: string[];
  answer: string;
  difficulty?: Difficulty;
  tags?: string[];
  skills?: string[];
  passage?: string;
  groupId?: string;
  groupTitle?: string;
  clozeTag?: string;
  conclusion: string;
  keyPoint: string;
  why: string;
  wrong: [string, string][];
  location?: string;
  evidence?: string;
  rule?: string;
}

function make(
  s: QSeed,
  opts: {
    source: SourceKind;
    reliability: 'A' | 'B' | 'C' | 'D';
    isRealExam: boolean;
    exam: string | null;
    year: number | null;
    sourceUrl: string;
  },
): Question {
  const explanation: Explanation = {
    conclusion: s.conclusion,
    keyPoint: s.keyPoint,
    whyCorrect: s.why,
    whyWrong: s.wrong.map(([option, reason]) => ({ option, reason })),
    relatedKnowledge: s.tags ?? [],
    locationSentence: s.location,
    evidence: s.evidence,
    rule: s.rule,
  };
  const now = '2025-10-16T00:00:00.000Z';
  return {
    id: s.id,
    exam: opts.exam,
    year: opts.year,
    region: '全国',
    source: opts.source,
    sourceUrl: opts.sourceUrl,
    reliability: opts.reliability,
    isRealExam: opts.isRealExam,
    status: 'active',
    section: s.section,
    questionType: s.questionType,
    passage: s.passage,
    groupId: s.groupId,
    groupTitle: s.groupTitle,
    clozeTags: s.clozeTag ? [{ index: 0, skillTag: s.clozeTag }] : undefined,
    questionText: s.text,
    options: s.options,
    answer: s.answer,
    explanation,
    knowledgeTags: s.tags ?? [],
    skillTags: s.skills ?? (s.clozeTag ? [s.clozeTag] : []),
    difficulty: s.difficulty ?? 'normal',
    frequencyLevel: opts.isRealExam ? null : null,
    createdAt: now,
    updatedAt: now,
    generatedByAi: false,
    model: null,
    promptVersion: null,
  };
}

// ============================================================
// 2023 年成人高考专升本英语真题（1–51 题）
// ============================================================

const REAL_2023_SEED: QSeed[] = [
  // ----- 语音 1–5 -----
  {
    id: 'real2023.ph.01',
    section: 'Phonetics',
    questionType: 'phonetics.consonant',
    text: '选出划线部分读音不同的一项：A. past  B. fast  C. grandson  D. reason',
    options: ['past', 'fast', 'grandson', 'reason'],
    answer: 'D',
    tags: ['phonetics.consonant'],
    conclusion: 'reason 的 s 发 /z/，其余三项 s 发 /s/。',
    keyPoint: 's 在 reason 中读浊辅音 /z/。',
    why: 'past /pɑːst/、fast /fɑːst/、grandson /ˈɡrænsʌn/ 中的 s 均为 /s/；reason /ˈriːzn/ 中 s 读 /z/。',
    wrong: [
      ['A', 'past 的 s 读 /s/。'],
      ['B', 'fast 的 s 读 /s/。'],
      ['C', 'grandson 的 s 读 /s/。'],
    ],
  },
  {
    id: 'real2023.ph.02',
    section: 'Phonetics',
    questionType: 'phonetics.consonant',
    text: '选出划线部分读音不同的一项：A. lunch  B. stomach  C. touch  D. speech',
    options: ['lunch', 'stomach', 'touch', 'speech'],
    answer: 'B',
    tags: ['phonetics.consonant'],
    conclusion: 'stomach 的 ch 发 /k/，其余三项 ch 发 /tʃ/。',
    keyPoint: 'ch 在 stomach 中读 /k/。',
    why: 'lunch /lʌntʃ/、touch /tʌtʃ/、speech /spiːtʃ/ 中 ch 均读 /tʃ/；stomach /ˈstʌmək/ 中 ch 读 /k/。',
    wrong: [
      ['A', 'lunch 的 ch 读 /tʃ/。'],
      ['C', 'touch 的 ch 读 /tʃ/。'],
      ['D', 'speech 的 ch 读 /tʃ/。'],
    ],
  },
  {
    id: 'real2023.ph.03',
    section: 'Phonetics',
    questionType: 'phonetics.consonant',
    text: '选出划线部分读音不同的一项：A. bomb  B. tomb  C. climber  D. number',
    options: ['bomb', 'tomb', 'climber', 'number'],
    answer: 'D',
    tags: ['phonetics.consonant'],
    conclusion: 'number 的 b 发音 /b/，其余三项 b 不发音。',
    keyPoint: 'b 在 m 后通常不发音；但 number 中 b 发音。',
    why: 'bomb /bɒm/、tomb /tuːm/、climber /ˈklaɪmə/ 中 b 均不发音；number /ˈnʌmbə/ 中 b 发 /b/。',
    wrong: [
      ['A', 'bomb 的 b 不发音。'],
      ['B', 'tomb 的 b 不发音。'],
      ['C', 'climber 的 b 不发音。'],
    ],
  },
  {
    id: 'real2023.ph.04',
    section: 'Phonetics',
    questionType: 'phonetics.vowel',
    text: '选出划线部分读音不同的一项：A. alive  B. aware  C. agent  D. attract',
    options: ['alive', 'aware', 'agent', 'attract'],
    answer: 'C',
    tags: ['phonetics.vowel'],
    conclusion: 'agent 的 a 发 /eɪ/，其余三项 a 在非重读音节弱读为 /ə/。',
    keyPoint: 'a 在非重读音节常弱读 /ə/；agent 重读开音节读 /eɪ/。',
    why: 'alive /əˈlaɪv/、aware /əˈweə/、attract /əˈtrækt/ 首音节 a 均弱读 /ə/；agent /ˈeɪdʒənt/ 首音节 a 重读 /eɪ/。',
    wrong: [
      ['A', 'alive 的 a 弱读 /ə/。'],
      ['B', 'aware 的 a 弱读 /ə/。'],
      ['D', 'attract 的 a 弱读 /ə/。'],
    ],
  },
  {
    id: 'real2023.ph.05',
    section: 'Phonetics',
    questionType: 'phonetics.vowel',
    text: '选出划线部分读音不同的一项：A. four  B. hour  C. sour  D. our',
    options: ['four', 'hour', 'sour', 'our'],
    answer: 'A',
    tags: ['phonetics.vowel'],
    conclusion: 'four 的 our 发 /ɔː/，其余三项 our 发 /aʊə/。',
    keyPoint: 'our 在 four 中读 /ɔː/。',
    why: 'hour /ˈaʊə/、sour /ˈsaʊə/、our /ˈaʊə/ 中 our 均读 /aʊə/；four /fɔː/ 中 our 读 /ɔː/。',
    wrong: [
      ['B', 'hour 的 our 读 /aʊə/。'],
      ['C', 'sour 的 our 读 /aʊə/。'],
      ['D', 'our 的 our 读 /aʊə/。'],
    ],
  },

  // ----- 词汇与语法 6–20 -----
  {
    id: 'real2023.vg.06',
    section: 'Vocabulary',
    questionType: 'vocab.verb',
    text: 'The world will be different, and we have to be prepared to ___ to the change.',
    options: ['agree', 'turn', 'adapt', 'move'],
    answer: 'C',
    tags: ['vocab.adapt'],
    conclusion: 'adapt to 意为"适应"。',
    keyPoint: 'adapt to the change 适应变化。',
    why: 'adapt to 是固定搭配，表示"适应（变化/新环境）"，符合句意。',
    wrong: [
      ['A', 'agree to 意为"同意"，与 change 搭配不当。'],
      ['B', 'turn to 意为"转向/求助于"。'],
      ['D', 'move to 意为"搬到"。'],
    ],
  },
  {
    id: 'real2023.vg.07',
    section: 'Grammar',
    questionType: 'grammar.subject_verb_agreement',
    text: 'Not only the students but also their foreign teacher ___ watching romantic movies.',
    options: ['enjoy', 'enjoys', 'to enjoy', 'enjoying'],
    answer: 'B',
    tags: ['grammar.sva'],
    conclusion: 'not only...but also 遵循就近原则，teacher 为单数，谓语用 enjoys。',
    keyPoint: '就近原则：谓语与 but also 后的主语一致。',
    why: 'their foreign teacher 是单数第三人称，谓语动词用 enjoys。',
    wrong: [
      ['A', 'enjoy 为复数形式，与单数主语不一致。'],
      ['C', 'to enjoy 为不定式，不能作谓语。'],
      ['D', 'enjoying 为分词，不能作谓语。'],
    ],
    rule: 'Not only A but also B 连接主语时，谓语与 B 保持人称和数一致。',
  },
  {
    id: 'real2023.vg.08',
    section: 'Vocabulary',
    questionType: 'vocab.noun',
    text: "The mayor said that the development would not have any bad ___ upon wildlife in the area.",
    options: ['effect', 'image', 'result', 'power'],
    answer: 'A',
    tags: ['vocab.effect'],
    conclusion: 'have an effect on/upon 意为"对……有影响"。',
    keyPoint: 'effect 常与 have...on/upon 搭配。',
    why: 'have a bad effect upon wildlife 对野生动物有不良影响，为固定搭配。',
    wrong: [
      ['B', 'image 形象，不与 have...upon 搭配表影响。'],
      ['C', 'result 结果，通常说 result in。'],
      ['D', 'power 力量，搭配不当。'],
    ],
  },
  {
    id: 'real2023.vg.09',
    section: 'Grammar',
    questionType: 'grammar.noun_clause',
    text: 'John has no idea ___ this dog has been following him all the way.',
    options: ['what', 'when', 'where', 'why'],
    answer: 'D',
    tags: ['grammar.noun_clause'],
    conclusion: 'have no idea why 表示"不知道为什么"。',
    keyPoint: 'idea 后接同位语从句，why 表原因。',
    why: 'why 引导同位语从句，解释说明 idea 的内容，表"不知道为什么"。',
    wrong: [
      ['A', 'what 在从句中需作主语或宾语，本句结构完整。'],
      ['B', 'when 表时间，与句意不符。'],
      ['C', 'where 表地点，与句意不符。'],
    ],
  },
  {
    id: 'real2023.vg.10',
    section: 'Grammar',
    questionType: 'grammar.subjunctive',
    text: 'The committee insisted that the proposal ___ without delay.',
    options: ['be discussed', 'to be discussed', 'is discussed', 'is to be discussed'],
    answer: 'A',
    tags: ['grammar.subjunctive'],
    conclusion: 'insist 后的宾语从句用虚拟语气 (should) + 动词原形，should 可省。',
    keyPoint: 'insist/suggest/require 等后的从句用 (should) do。',
    why: 'proposal 与 discuss 是被动关系，故用 be discussed（省 should）。',
    wrong: [
      ['B', '不定式不能作谓语。'],
      ['C', 'is discussed 未使用虚拟语气。'],
      ['D', 'is to be discussed 表将来安排，非虚拟。'],
    ],
    rule: 'insist that sb. (should) do sth.；被动为 insist that sth. (should) be done。',
  },
  {
    id: 'real2023.vg.11',
    section: 'Vocabulary',
    questionType: 'vocab.modal',
    text: 'You ___ hand in your paper on Monday or you will lose 10 percent of your final score.',
    options: ['can', 'should', 'may', 'would'],
    answer: 'B',
    tags: ['vocab.modal'],
    conclusion: 'should 表义务/建议，"应该在周一交卷"。',
    keyPoint: 'should 表应当。',
    why: '根据后果"否则扣 10 分"，应选 should 表义务。',
    wrong: [
      ['A', 'can 表能力/许可，语气太弱。'],
      ['C', 'may 表许可，语气太弱。'],
      ['D', 'would 表意愿/过去习惯。'],
    ],
  },
  {
    id: 'real2023.vg.12',
    section: 'Vocabulary',
    questionType: 'vocab.phrasal',
    text: "The university's academic board will ___ this issue first before coming to a decision.",
    options: ['look up', 'look after', 'look for', 'look into'],
    answer: 'D',
    tags: ['vocab.phrasal'],
    conclusion: 'look into 意为"调查"。',
    keyPoint: 'look into = investigate。',
    why: 'look into this issue 调查这个问题，符合"先调查再做决定"的语境。',
    wrong: [
      ['A', 'look up 查阅（字典）/好转。'],
      ['B', 'look after 照顾。'],
      ['C', 'look for 寻找。'],
    ],
  },
  {
    id: 'real2023.vg.13',
    section: 'Vocabulary',
    questionType: 'vocab.adj',
    text: 'She had been taking singing lessons since she was a child and was ___ in winning the competition.',
    options: ['confident', 'proud', 'good', 'capable'],
    answer: 'A',
    tags: ['vocab.confident'],
    conclusion: 'confident in doing sth. 对做某事有信心。',
    keyPoint: 'be confident in (doing) sth.。',
    why: 'confident in winning 对获胜有信心；capable 接 of，good 接 at，proud 接 of。',
    wrong: [
      ['B', 'proud of 为……自豪。'],
      ['C', 'good at 擅长。'],
      ['D', 'capable of 有能力做。'],
    ],
  },
  {
    id: 'real2023.vg.14',
    section: 'Grammar',
    questionType: 'grammar.parallel',
    text: 'The girl spent as much time in watching TV as she ___ in studying.',
    options: ['does', 'had', 'was', 'did'],
    answer: 'D',
    tags: ['grammar.ellipsis'],
    conclusion: '用 did 代替代替前文的 spent time，保持时态一致。',
    keyPoint: 'as...as 比较结构中用 do/does/did 代替代替前文动词。',
    why: '前文为过去式 spent，此处用 did 代替代替 spent time，避免重复。',
    wrong: [
      ['A', 'does 为一般现在时，与 spent 时态不一致。'],
      ['B', 'had 不能代替代替 spent。'],
      ['C', 'was 为 be 动词，不能代替代替实义动词 spent。'],
    ],
  },
  {
    id: 'real2023.vg.15',
    section: 'Grammar',
    questionType: 'grammar.tense',
    text: 'An estimated 50,000 farmers ___ the new method by the end of this year.',
    options: ['are adopting', 'have adopted', 'will have adopted', 'have been adopting'],
    answer: 'C',
    tags: ['grammar.tense.future_perfect'],
    conclusion: 'by the end of this year 表将来时间点，用将来完成时。',
    keyPoint: 'by + 将来时间 → will have done。',
    why: 'by the end of this year 表示"到今年年底为止"，用将来完成时 will have adopted。',
    wrong: [
      ['A', '现在进行时，不表到将来某时完成。'],
      ['B', '现在完成时，不涉及将来。'],
      ['D', '现在完成进行时，不表到将来完成。'],
    ],
    rule: 'by + 将来时间状语，谓语用将来完成时 will have done。',
  },
  {
    id: 'real2023.vg.16',
    section: 'Vocabulary',
    questionType: 'vocab.verb',
    text: 'I have a very busy work schedule, and have almost no time to ___ to body building.',
    options: ['appeal', 'devote', 'supply', 'contribute'],
    answer: 'B',
    tags: ['vocab.devote'],
    conclusion: 'devote time to (doing) sth. 把时间投入到……。',
    keyPoint: 'devote...to 中 to 为介词。',
    why: 'devote time to body building 把时间投入健身，为固定搭配。',
    wrong: [
      ['A', 'appeal to 呼吁/吸引。'],
      ['C', 'supply to 供应给。'],
      ['D', 'contribute to 促成/捐献，语义不符。'],
    ],
  },
  {
    id: 'real2023.vg.17',
    section: 'Grammar',
    questionType: 'grammar.participle',
    text: '___ a great dancer, Diana often receives invitations to give performances in different countries.',
    options: ['Has been', 'Being', 'Be', 'To be'],
    answer: 'B',
    tags: ['grammar.participle'],
    conclusion: 'Being 作原因状语，表"作为一名伟大的舞者"。',
    keyPoint: '现在分词作状语，逻辑主语为句子主语。',
    why: 'Being a great dancer = As she is a great dancer，作原因状语。',
    wrong: [
      ['A', 'Has been 为谓语形式，不能作状语。'],
      ['C', 'Be 为动词原形，不能作状语。'],
      ['D', 'To be 表目的/将来，与句意不符。'],
    ],
  },
  {
    id: 'real2023.vg.18',
    section: 'Grammar',
    questionType: 'grammar.preposition',
    text: 'Nancy has been reading a long novel ___ the past two weeks.',
    options: ['for', 'from', 'before', 'till'],
    answer: 'A',
    tags: ['grammar.preposition'],
    conclusion: 'for the past two weeks 表一段时间，与完成进行时连用。',
    keyPoint: 'for + 时间段。',
    why: 'for the past two weeks 表示"过去两周以来"，常与完成时/完成进行时连用。',
    wrong: [
      ['B', 'from 表起点，常与 to/till 搭配。'],
      ['C', 'before 表在……之前。'],
      ['D', 'till 直到。'],
    ],
  },
  {
    id: 'real2023.vg.19',
    section: 'Grammar',
    questionType: 'grammar.tense',
    text: 'The journey to the lake was terrible, but after we ___ there, we had a wonderful time.',
    options: ['have arrived', 'could arrive', 'would arrive', 'had arrived'],
    answer: 'D',
    tags: ['grammar.tense.past_perfect'],
    conclusion: 'arrive 发生在 had a wonderful time 之前，用过去完成时。',
    keyPoint: '过去的过去 → 过去完成时。',
    why: 'we had a wonderful time 为过去时，arrive 在此之前发生，用过去完成时 had arrived。',
    wrong: [
      ['A', 'have arrived 为现在完成时，时态不符。'],
      ['B', 'could arrive 表过去的能力，语义不符。'],
      ['C', 'would arrive 表过去将来，语义不符。'],
    ],
  },
  {
    id: 'real2023.vg.20',
    section: 'Grammar',
    questionType: 'grammar.conditional',
    text: "My elder sister says I can borrow her newly-bought dress for parties ___ I like.",
    options: ['since', 'if', 'whether', 'though'],
    answer: 'B',
    tags: ['grammar.conditional'],
    conclusion: 'if 引导条件状语从句，"如果我喜欢的话"。',
    keyPoint: 'if 引导条件状语从句。',
    why: 'if I like 表条件"如果我喜欢"，句意通顺。',
    wrong: [
      ['A', 'since 表原因/自从。'],
      ['C', 'whether 是否，引导名词性从句。'],
      ['D', 'though 虽然，表让步。'],
    ],
  },
];

// 2023 完形 21–35
const CLOZE_2023_PASSAGE = `Who have the keener sense of smell, dogs or humans? Most of us would 21 the dog's nose is much more sensitive than man's. After all, dogs are used to 22 criminals, and the police sometimes use dogs to smell out drugs.

The 23 is that your nose is probably as sensitive as any dog's—24 you were trained to use your nose 25. And since your brain is much better than the dog's, you would be much 26 to fool than a dog would be. However, if you wanted to 27 someone's smell, you would have to crawl (爬行) about 28 your hands and knees with your nose to the 29 as the dog does.

In its own way, however, your nose is as sensitive to 30 smells as your ear is to the softest of sounds. Most wine companies employ professional tasters who 31 the quality of their products. These tasters take very small amounts of the 32, and roll it around in their mouths while 33 chewing movements. This "mouthing" of the liquid forces the air up the back entrance to the nasal cavity (鼻腔) toward the olfactory membrane (嗅觉粘膜), a place 34 smells can best be caught. If the wine suits their taste (actually, if it suits their smell), they may nod 35.`;

const CLOZE_2023_SEED: QSeed[] = [
  { id: 'real2023.cz.21', section: 'Cloze', questionType: 'cloze', text: '21. A. remind  B. believe  C. persuade  D. doubt', options: ['remind', 'believe', 'persuade', 'doubt'], answer: 'B', passage: CLOZE_2023_PASSAGE, groupId: 'real2023.cg1', groupTitle: '2023 完形：狗与人的嗅觉', clozeTag: 'cloze.verb', tags: ['cloze'], conclusion: 'believe 意为"认为"，"大多数人会认为狗鼻子更灵敏"。', keyPoint: 'believe the dog\'s nose is...', why: '根据句意，多数人会"认为"狗的嗅觉更灵敏，选 believe。', wrong: [['A', 'remind 提醒。'], ['C', 'persuade 说服。'], ['D', 'doubt 怀疑。']] },
  { id: 'real2023.cz.22', section: 'Cloze', questionType: 'cloze', text: '22. A. track down  B. look at  C. calm down  D. knock at', options: ['track down', 'look at', 'calm down', 'knock at'], answer: 'A', passage: CLOZE_2023_PASSAGE, groupId: 'real2023.cg1', groupTitle: '2023 完形：狗与人的嗅觉', clozeTag: 'cloze.phrasal', tags: ['cloze'], conclusion: 'track down 意为"追踪"，狗被用来追踪罪犯。', keyPoint: 'track down criminals', why: 'track down criminals 追踪罪犯，符合警犬用途。', wrong: [['B', 'look at 看。'], ['C', 'calm down 冷静。'], ['D', 'knock at 敲。']] },
  { id: 'real2023.cz.23', section: 'Cloze', questionType: 'cloze', text: '23. A. reason  B. science  C. truth  D. rule', options: ['reason', 'science', 'truth', 'rule'], answer: 'C', passage: CLOZE_2023_PASSAGE, groupId: 'real2023.cg1', groupTitle: '2023 完形：狗与人的嗅觉', clozeTag: 'cloze.noun', tags: ['cloze'], conclusion: 'truth 意为"事实"，"事实是你的鼻子可能和狗一样灵敏"。', keyPoint: 'The truth is that...', why: 'The truth is that... 引出与前文相反的事实，为常见句式。', wrong: [['A', 'reason 理由。'], ['B', 'science 科学。'], ['D', 'rule 规则。']] },
  { id: 'real2023.cz.24', section: 'Cloze', questionType: 'cloze', text: '24. A. if  B. as  C. although  D. unless', options: ['if', 'as', 'although', 'unless'], answer: 'A', passage: CLOZE_2023_PASSAGE, groupId: 'real2023.cg1', groupTitle: '2023 完形：狗与人的嗅觉', clozeTag: 'cloze.conj', tags: ['cloze'], conclusion: 'if 引导条件，"如果你受过训练正确使用鼻子"。', keyPoint: 'if you were trained', why: 'if 引导条件状语从句，表"如果受过训练"。', wrong: [['B', 'as 因为/当。'], ['C', 'although 虽然。'], ['D', 'unless 除非，与句意相反。']] },
  { id: 'real2023.cz.25', section: 'Cloze', questionType: 'cloze', text: '25. A. freely  B. properly  C. wildly  D. slowly', options: ['freely', 'properly', 'wildly', 'slowly'], answer: 'B', passage: CLOZE_2023_PASSAGE, groupId: 'real2023.cg1', groupTitle: '2023 完形：狗与人的嗅觉', clozeTag: 'cloze.adv', tags: ['cloze'], conclusion: 'properly 意为"正确地"，"正确使用鼻子"。', keyPoint: 'use your nose properly', why: 'use your nose properly 正确地使用鼻子，符合训练语境。', wrong: [['A', 'freely 自由地。'], ['C', 'wildly 疯狂地。'], ['D', 'slowly 缓慢地。']] },
  { id: 'real2023.cz.26', section: 'Cloze', questionType: 'cloze', text: '26. A. stronger  B. smarter  C. faster  D. harder', options: ['stronger', 'smarter', 'faster', 'harder'], answer: 'D', passage: CLOZE_2023_PASSAGE, groupId: 'real2023.cg1', groupTitle: '2023 完形：狗与人的嗅觉', clozeTag: 'cloze.adj', tags: ['cloze'], conclusion: 'harder 意为"更难"，"你比狗更难被愚弄"。', keyPoint: 'harder to fool', why: '因为人脑更发达，所以人比狗更难被欺骗，选 harder。', wrong: [['A', 'stronger 更强壮。'], ['B', 'smarter 更聪明（不与 fool 搭配）。'], ['C', 'faster 更快。']] },
  { id: 'real2023.cz.27', section: 'Cloze', questionType: 'cloze', text: '27. A. cover  B. follow  C. count  D. leave', options: ['cover', 'follow', 'count', 'leave'], answer: 'B', passage: CLOZE_2023_PASSAGE, groupId: 'real2023.cg1', groupTitle: '2023 完形：狗与人的嗅觉', clozeTag: 'cloze.verb', tags: ['cloze'], conclusion: 'follow 意为"跟随"，"跟随某人的气味"。', keyPoint: 'follow someone\'s smell', why: 'follow someone\'s smell 跟随某人的气味，与狗追踪气味的行为对应。', wrong: [['A', 'cover 覆盖。'], ['C', 'count 计数。'], ['D', 'leave 离开。']] },
  { id: 'real2023.cz.28', section: 'Cloze', questionType: 'cloze', text: '28. A. in  B. above  C. on  D. for', options: ['in', 'above', 'on', 'for'], answer: 'C', passage: CLOZE_2023_PASSAGE, groupId: 'real2023.cg1', groupTitle: '2023 完形：狗与人的嗅觉', clozeTag: 'cloze.prep', tags: ['cloze'], conclusion: 'on your hands and knees 意为"四肢着地"。', keyPoint: 'on one\'s hands and knees', why: 'on your hands and knees 是固定搭配，表示"手脚着地爬行"。', wrong: [['A', 'in 不构成此搭配。'], ['B', 'above 在上方。'], ['D', 'for 为了。']] },
  { id: 'real2023.cz.29', section: 'Cloze', questionType: 'cloze', text: '29. A. soil  B. earth  C. land  D. ground', options: ['soil', 'earth', 'land', 'ground'], answer: 'D', passage: CLOZE_2023_PASSAGE, groupId: 'real2023.cg1', groupTitle: '2023 完形：狗与人的嗅觉', clozeTag: 'cloze.noun', tags: ['cloze'], conclusion: 'nose to the ground 意为"鼻子贴着地面"。', keyPoint: 'nose to the ground', why: 'nose to the ground 鼻子贴近地面，描述狗嗅探的姿势。', wrong: [['A', 'soil 土壤（指泥土本身）。'], ['B', 'earth 地球/泥土。'], ['C', 'land 陆地。']] },
  { id: 'real2023.cz.30', section: 'Cloze', questionType: 'cloze', text: '30. A. faint  B. strong  C. thick  D. thin', options: ['faint', 'strong', 'thick', 'thin'], answer: 'A', passage: CLOZE_2023_PASSAGE, groupId: 'real2023.cg1', groupTitle: '2023 完形：狗与人的嗅觉', clozeTag: 'cloze.adj', tags: ['cloze'], conclusion: 'faint 意为"微弱的"，"对微弱气味敏感"。', keyPoint: 'faint smells', why: '与后文 softest of sounds 对应，鼻子对微弱气味敏感，选 faint。', wrong: [['B', 'strong 强烈的，与 softest 不对应。'], ['C', 'thick 浓的。'], ['D', 'thin 薄的。']] },
  { id: 'real2023.cz.31', section: 'Cloze', questionType: 'cloze', text: '31. A. change  B. keep  C. release  D. judge', options: ['change', 'keep', 'release', 'judge'], answer: 'D', passage: CLOZE_2023_PASSAGE, groupId: 'real2023.cg1', groupTitle: '2023 完形：狗与人的嗅觉', clozeTag: 'cloze.verb', tags: ['cloze'], conclusion: 'judge 意为"评判"，品酒师评判产品质量。', keyPoint: 'judge the quality', why: 'professional tasters judge the quality 品酒师评判质量。', wrong: [['A', 'change 改变。'], ['B', 'keep 保持。'], ['C', 'release 释放。']] },
  { id: 'real2023.cz.32', section: 'Cloze', questionType: 'cloze', text: '32. A. coffee  B. juice  C. alcohol  D. tea', options: ['coffee', 'juice', 'alcohol', 'tea'], answer: 'C', passage: CLOZE_2023_PASSAGE, groupId: 'real2023.cg1', groupTitle: '2023 完形：狗与人的嗅觉', clozeTag: 'cloze.noun', tags: ['cloze'], conclusion: 'alcohol 意为"酒"，品酒师取少量酒品尝。', keyPoint: 'the alcohol = the wine', why: '前文 wine companies，品酒师取少量酒（alcohol）在口中滚动。', wrong: [['A', 'coffee 咖啡。'], ['B', 'juice 果汁。'], ['D', 'tea 茶。']] },
  { id: 'real2023.cz.33', section: 'Cloze', questionType: 'cloze', text: '33. A. mastering  B. processing  C. making  D. producing', options: ['mastering', 'processing', 'making', 'producing'], answer: 'C', passage: CLOZE_2023_PASSAGE, groupId: 'real2023.cg1', groupTitle: '2023 完形：狗与人的嗅觉', clozeTag: 'cloze.verb', tags: ['cloze'], conclusion: 'making chewing movements 意为"做出咀嚼动作"。', keyPoint: 'make movements', why: 'making chewing movements 做出咀嚼动作，为固定动宾搭配。', wrong: [['A', 'mastering 掌握。'], ['B', 'processing 处理。'], ['D', 'producing 生产。']] },
  { id: 'real2023.cz.34', section: 'Cloze', questionType: 'cloze', text: '34. A. which  B. where  C. how  D. why', options: ['which', 'where', 'how', 'why'], answer: 'B', passage: CLOZE_2023_PASSAGE, groupId: 'real2023.cg1', groupTitle: '2023 完形：狗与人的嗅觉', clozeTag: 'cloze.relative', tags: ['cloze'], conclusion: 'where 引导定语从句，修饰 place，"气味最容易被捕捉的地方"。', keyPoint: 'a place where...', why: '先行词 place 表地点，定语从句中不缺主宾语，用关系副词 where。', wrong: [['A', 'which 关系代词，在从句中需作主语或宾语。'], ['C', 'how 不引导定语从句。'], ['D', 'why 修饰 reason。']] },
  { id: 'real2023.cz.35', section: 'Cloze', questionType: 'cloze', text: '35. A. approvingly  B. sadly  C. gratefully  D. reluctantly', options: ['approvingly', 'sadly', 'gratefully', 'reluctantly'], answer: 'A', passage: CLOZE_2023_PASSAGE, groupId: 'real2023.cg1', groupTitle: '2023 完形：狗与人的嗅觉', clozeTag: 'cloze.adv', tags: ['cloze'], conclusion: 'approvingly 意为"赞许地"，满意地点头。', keyPoint: 'nod approvingly', why: '如果酒合口味，品酒师会赞许地点头，选 approvingly。', wrong: [['B', 'sadly 悲伤地。'], ['C', 'gratefully 感激地。'], ['D', 'reluctantly 不情愿地。']] },
];

// 2023 阅读 Passage 1 (36–39)
const RD_2023_P1 = `My mother raised me with several fixed rules. One was that a gentleman always has a clean handkerchief in his rear (后面的) pocket. I can recall being at a wedding when I was about 10, feeling the piece of cloth directly over my bottom and wondering what it was there for. To me it seemed both old-fashioned and useless.

In those days, every boy, young man and older man wore one. But times change, and the handkerchief has disappeared. Now my children think it is ridiculously old-fashioned. "Why don't you just carry tissues?" they ask.

I have not given it up, though. My wife calls it my "symbol of being a father." She has repeatedly borrowed it from me for one reason or another. And she recently added a quotation to the long list of reasons that I should continue to carry a handkerchief. "Can I borrow your handkerchief?" she asked, when crying at the movies the other day. "I forgot mine."`;

const RD_2023_P1_SEED: QSeed[] = [
  { id: 'real2023.rd.36', section: 'Reading', questionType: 'reading.detail', text: 'Which of the following is true about the writer when he was about 10?', options: ['He followed his mother\'s rules carefully.', 'He was proud of the handkerchief.', 'He didn\'t know the use of the handkerchief.', 'He preferred tissues to handkerchiefs.'], answer: 'C', passage: RD_2023_P1, groupId: 'real2023.rg1', groupTitle: '2023 阅读 Passage 1：手帕', tags: ['reading'], conclusion: '10 岁时作者不知道手帕有什么用。', keyPoint: 'wondering what it was there for', why: '原文 "wondering what it was there for" 说明作者当时不知道手帕的用途。', wrong: [['A', '文中未提他认真遵守母亲规则。'], ['B', '作者觉得手帕 old-fashioned and useless，并不自豪。'], ['D', '当时并未比较纸巾与手帕。']], location: '第一段末句' },
  { id: 'real2023.rd.37', section: 'Reading', questionType: 'reading.inference', text: 'What do the writer\'s children think of the handkerchief?', options: ['They think he should get rid of it.', 'They think it is useful for him.', 'They are proud of his handkerchief.', 'They want to carry one too.'], answer: 'A', passage: RD_2023_P1, groupId: 'real2023.rg1', groupTitle: '2023 阅读 Passage 1：手帕', tags: ['reading'], conclusion: '孩子们觉得手帕过时可笑，建议改用纸巾。', keyPoint: 'ridiculously old-fashioned; carry tissues', why: '"ridiculously old-fashioned" 和 "Why don\'t you just carry tissues?" 表明孩子们希望他抛弃手帕。', wrong: [['B', '他们认为手帕无用。'], ['C', '他们并不为此自豪。'], ['D', '他们不想带手帕。']], location: '第二段' },
  { id: 'real2023.rd.38', section: 'Reading', questionType: 'reading.inference', text: 'Why did the writer mention his wife\'s quotation?', options: ['To express gratitude for his wife\'s gift.', 'To indicate that his wife was easily moved.', 'To demonstrate a role of handkerchiefs in life.', 'To show a change of attitude towards handkerchiefs.'], answer: 'C', passage: RD_2023_P1, groupId: 'real2023.rg1', groupTitle: '2023 阅读 Passage 1：手帕', tags: ['reading'], conclusion: '妻子借手帕擦眼泪，说明手帕在生活中仍有用处。', keyPoint: 'borrow your handkerchief when crying', why: '妻子看电影哭了借手帕，证明手帕在生活中有实际用途。', wrong: [['A', '与礼物无关。'], ['B', '不是为了说明妻子易感动。'], ['D', '不是为了说明态度转变。']], location: '第三段末' },
  { id: 'real2023.rd.39', section: 'Reading', questionType: 'reading.main_idea', text: 'What is the best title for the passage?', options: ['Handkerchief: A Family Tie', 'Handkerchief: A Gift for Grandfathers', 'Handkerchief: Old-fashioned but Useful', 'Handkerchief: Necessary for Gentlemen'], answer: 'C', passage: RD_2023_P1, groupId: 'real2023.rg1', groupTitle: '2023 阅读 Passage 1：手帕', tags: ['reading'], conclusion: '手帕虽被视为过时，但在生活中仍有用途。', keyPoint: 'old-fashioned but useful', why: '文章先写手帕过时，再通过妻子借手帕说明其仍有用处，故"过时但有用"最贴切。', wrong: [['A', 'family tie 过于宽泛。'], ['B', '与祖父无关。'], ['D', 'gentleman 仅在开头提及，非主旨。']] },
];

// Passage 2 (40–43)
const RD_2023_P2 = `Ask any group of parents to describe their eighth graders (八年级学生), and you'll get a surprising—and often contradictory—range of responses. Eighth graders are often quiet and shy, yet they're often loud and frank. They keep pushing you away, yet they're still deeply influenced by everything you say and do. They can make a perfectly reasonable argument as to why they should be allowed to date, yet they can't seem to understand your perfectly reasonable argument for why they should wait. They want to be individuals, yet they want desperately to fit in.

Welcome to the eighth grade! Your child is now a full-grown teenager, and she'll experience great physical, emotional, and intellectual (智力的) changes during this dramatic year. As she moves from childhood to adulthood (成年), she'll begin to look like a young woman, and she'll begin to struggle for the independence of adulthood, for which she's not quite ready yet. Your teenager will experience changes and feel emotions she won't always understand. As a result, she'll sometimes feel a little lost or scared, and often very confused as she struggles to figure out who she is and who she wants to be.

That is where you come in. As much as your eighth grader may push you away, as much as you may feel she doesn't want you around, she does want you to be involved in her life. She needs you to know what's happening to her and around her, especially in school where she may face pressure to fit in and where she'll face a curriculum that challenges her developing reasoning skills. As the saying goes, "Little kids, little problems; big kids, big problems." And your big kid will need you to help her work those problems out.`;

const RD_2023_P2_SEED: QSeed[] = [
  { id: 'real2023.rd.40', section: 'Reading', questionType: 'reading.detail', text: 'Which of the following statements about eighth graders is true?', options: ['They fit into society well.', 'They show conflicting characters.', 'They push each other away.', 'They become increasingly reasonable.'], answer: 'B', passage: RD_2023_P2, groupId: 'real2023.rg2', groupTitle: '2023 阅读 Passage 2：八年级学生', tags: ['reading'], conclusion: '八年级学生表现出矛盾的性格特征。', keyPoint: 'contradictory—range of responses', why: '文中用多组 yet 对比（quiet/loud, push away/influenced），说明八年级学生性格矛盾。', wrong: [['A', '他们渴望融入但面临压力，并非很好地适应社会。'], ['C', '是推开父母，不是互相推开。'], ['D', '他们有时能合理辩论，有时不能理解父母。']], location: '第一段' },
  { id: 'real2023.rd.41', section: 'Reading', questionType: 'reading.detail', text: 'Why is an eighth grader\'s life so dramatic?', options: ['She has many roles to play.', 'She is losing her independence.', 'She has become a grown-up woman.', 'She is experiencing many changes.'], answer: 'D', passage: RD_2023_P2, groupId: 'real2023.rg2', groupTitle: '2023 阅读 Passage 2：八年级学生', tags: ['reading'], conclusion: '八年级学生经历巨大的生理、情感和智力变化。', keyPoint: 'great physical, emotional, and intellectual changes', why: '原文 "experience great physical, emotional, and intellectual changes during this dramatic year"。', wrong: [['A', '文中未提及扮演多种角色。'], ['B', '她在争取独立，不是失去。'], ['C', '她开始像年轻女性，但还不是成年女性。']], location: '第二段第二句' },
  { id: 'real2023.rd.42', section: 'Reading', questionType: 'reading.inference', text: 'For whom is the passage written?', options: ["Eighth graders' parents.", "Eighth graders' doctors.", "Eighth graders' teachers.", 'Eighth graders themselves.'], answer: 'A', passage: RD_2023_P2, groupId: 'real2023.rg2', groupTitle: '2023 阅读 Passage 2：八年级学生', tags: ['reading'], conclusion: '文章是写给八年级学生的父母看的。', keyPoint: 'Your child; you come in', why: '文中多次用 "Your child"、"you" 称呼读者，并说 "That is where you come in"，显然写给家长。', wrong: [['B', '非写给医生。'], ['C', '非写给老师。'], ['D', '非写给学生本人。']], location: '全文称呼' },
  { id: 'real2023.rd.43', section: 'Reading', questionType: 'reading.inference', text: 'What is the writer most probably going to do next?', options: ['To criticize eighth graders.', 'To introduce a famous teacher.', 'To discuss the current educational policy.', 'To explain how to help eighth graders.'], answer: 'D', passage: RD_2023_P2, groupId: 'real2023.rg2', groupTitle: '2023 阅读 Passage 2：八年级学生', tags: ['reading'], conclusion: '作者接下来很可能说明如何帮助八年级学生。', keyPoint: 'need you to help her work those problems out', why: '末句 "your big kid will need you to help her work those problems out" 暗示下文将讲如何帮助。', wrong: [['A', '作者未批评学生。'], ['B', '未提及介绍名师。'], ['C', '未涉及教育政策。']], location: '末段末句' },
];

// Passage 3 (44–47)
const RD_2023_P3 = `Many years ago, when I was working in a school in Buenos Aires, I was required to teach Macbeth to a class of Spanish-speaking schoolboys. I was a bit worried at being given such a task, because Shakespeare's language is not always easy, even for the native speaker. The language of Macbeth is particularly rich and strange to the modern reader. I myself had seen and read the play for the first time at an early age, and had been carried away by the story. So, I decided to concentrate first on the action and plot, and as far as possible let the language take care of itself.

I read the play to my students, scene by scene, taking the different parts myself. I did not let my pupils read it aloud for themselves, as I thought they lacked necessary experience and skill to benefit from this. At the end of each scene, I saw to it that everybody understood what had happened, and we briefly summarized this in writing. After this, I went through the scene again, explaining those language points that might prevent essential comprehension, and then I read the scene straight through once more.

This was not a very exciting approach. The pupils' participation was largely passive. I was in fact doing most of the work. However, when we had gone through about half of the play in this manner, I discovered to my great surprise that the class had taken the book home and finished it for themselves. Through my efforts, they had woken up to the idea that the story was exciting, and wanted to know how it turned out in the end.

We went ahead and finished the play, working more rapidly, and went on to discuss and read parts of the play again, focusing on the characters, plots, themes, etc. Without noticing it, we did a lot of practice in oral and written English.`;

const RD_2023_P3_SEED: QSeed[] = [
  { id: 'real2023.rd.44', section: 'Reading', questionType: 'reading.detail', text: 'What made the teaching of Macbeth a worrying task?', options: ['The story is very boring.', "The teacher hadn't read the play.", "Shakespeare's language is difficult.", "The students hadn't watched the play."], answer: 'C', passage: RD_2023_P3, groupId: 'real2023.rg3', groupTitle: '2023 阅读 Passage 3：麦克白教学', tags: ['reading'], conclusion: '莎士比亚的语言不容易，使教学成为令人担忧的任务。', keyPoint: "Shakespeare's language is not always easy", why: '原文 "because Shakespeare\'s language is not always easy"。', wrong: [['A', '故事后来被发现很 exciting。'], ['B', '作者早年就读过该剧。'], ['D', '文中未提学生看过。']], location: '第一段第二句' },
  { id: 'real2023.rd.45', section: 'Reading', questionType: 'reading.detail', text: 'When did the language of Macbeth start to be dealt with?', options: ['Before the teacher read the play.', 'After the pupils read the play aloud.', 'After the pupils understood the plot.', 'Before the teacher explained the writing skills.'], answer: 'C', passage: RD_2023_P3, groupId: 'real2023.rg3', groupTitle: '2023 阅读 Passage 3：麦克白教学', tags: ['reading'], conclusion: '在学生理解剧情后，再处理语言点。', keyPoint: 'After this, I went through the scene again, explaining language points', why: '先让学生理解剧情（summarized in writing），再讲解阻碍理解的语言点。', wrong: [['A', '语言点在阅读后处理。'], ['B', '作者不让学生大声朗读。'], ['D', '文中未提写作技巧。']], location: '第二段末' },
  { id: 'real2023.rd.46', section: 'Reading', questionType: 'reading.detail', text: 'What surprised the teacher greatly?', options: ['The pupils started to learn actively.', 'The pupils summarized the plot orally.', 'The pupils began to enjoy the language.', 'The pupils became very excited in class.'], answer: 'A', passage: RD_2023_P3, groupId: 'real2023.rg3', groupTitle: '2023 阅读 Passage 3：麦克白教学', tags: ['reading'], conclusion: '学生主动把书带回家读完，令老师惊讶。', keyPoint: 'class had taken the book home and finished it', why: '原本被动参与的学生主动回家读完剧本，说明开始主动学习。', wrong: [['B', '学生是书面总结，非口头。'], ['C', '他们喜欢的是故事，非语言本身。'], ['D', '文中说故事 exciting，非课堂兴奋。']], location: '第三段第二句' },
  { id: 'real2023.rd.47', section: 'Reading', questionType: 'reading.main_idea', text: 'What can be learned from the teaching practice in the passage?', options: ['Group work is useful for learning a language.', 'Good teachers focus on teaching language points.', "Shakespeare's plays are suitable for foreign students.", 'Proper teaching methods might arouse pupils\' interest.'], answer: 'D', passage: RD_2023_P3, groupId: 'real2023.rg3', groupTitle: '2023 阅读 Passage 3：麦克白教学', tags: ['reading'], conclusion: '恰当的教学方法能激发学生兴趣。', keyPoint: 'woken up to the idea that the story was exciting', why: '作者先抓剧情再讲语言，最终激发学生主动读完，说明方法得当能激发兴趣。', wrong: [['A', '文中无小组活动。'], ['B', '作者并非只讲语言点。'], ['C', '文章主旨不是说莎剧适合外国学生。']] },
];

// Passage 4 (48–51)
const RD_2023_P4 = `In their recent book, "Wildhood," Harvard biologist Barbara Natterson-Horowitz and science journalist Kathryn Bowers point out that adolescent (青春期的) animals and human teenagers go through the same sorts of challenges. With little life experience, adolescent animals engage in dangerous but beneficial behaviors. For example, they watch, smell and learn about the animals that eat them, gathering all kinds of information that can keep them safer as adults. Similarly, human teenagers try to have as many experiences as they can before they leave the nest.

Another key aspect of adolescents is the amount of time they spend in groups. This period is marked by peak levels of peer (同伴) pressure and near-disaster. Scientists have found that adolescents of all kinds tend to make dangerous moves while with peers. Laurence Steinberg, a psychology professor, set up two experiments. One involved mice, half of which were adolescents, drinking alcoholic water. In the other experiment, human teenagers played a driving video game. The results were surprisingly similar. "We found that in the presence of peers, adolescent mice drank more than they do when they're alone," Steinberg said. The teenagers in the driving study also took more risks when others were around. Just knowing there were other teenagers watching appeared to make the one behind the wheel act more carelessly. These findings reveal another adolescent quality: the desire to socialize. "For the most part, adolescents like to be with other adolescents," Steinberg said.

While writing the book, both Natterson-Horowitz and Bowers were raising a human teenager in their homes. Their desire to understand the wild was driven by wanting to understand their own children.`;

const RD_2023_P4_SEED: QSeed[] = [
  { id: 'real2023.rd.48', section: 'Reading', questionType: 'reading.detail', text: 'What do adolescent animals and human teenagers have in common?', options: ['They like to stay in the nest for safety.', 'They are interested in the adult world.', 'They are good at gathering information.', 'They tend to take risks to gain experience.'], answer: 'D', passage: RD_2023_P4, groupId: 'real2023.rg4', groupTitle: '2023 阅读 Passage 4：青春期', tags: ['reading'], conclusion: '青春期动物和人类青少年都倾向于冒险以获取经验。', keyPoint: 'dangerous but beneficial behaviors; as many experiences', why: '青春期动物做"危险但有益"的行为，人类青少年也在离巢前尽量多体验。', wrong: [['A', '他们冒险探索，不是为安全待在巢里。'], ['B', '文中未说对成年世界感兴趣。'], ['C', '动物收集信息，不是共同点的核心。']], location: '第一段' },
  { id: 'real2023.rd.49', section: 'Reading', questionType: 'reading.detail', text: 'What is found in Steinberg\'s experiments about peer pressure?', options: ['Adolescent mice take fewer risks in a peer group.', 'Adolescent mice drink more when they are alone.', 'Teenagers drive more carelessly with peers around.', 'Teenagers play more video games with their friends.'], answer: 'C', passage: RD_2023_P4, groupId: 'real2023.rg4', groupTitle: '2023 阅读 Passage 4：青春期', tags: ['reading'], conclusion: '青少年在同伴在场时开车更粗心。', keyPoint: 'took more risks when others were around', why: '"The teenagers in the driving study also took more risks when others were around."', wrong: [['A', '同伴在场时小鼠喝更多，风险更高。'], ['B', '小鼠独处时喝得少。'], ['D', '实验是驾驶游戏，不是玩更多游戏。']], location: '第二段' },
  { id: 'real2023.rd.50', section: 'Reading', questionType: 'reading.vocab', text: 'Which of the following is closest in meaning to "socialize" in Paragraph 2?', options: ['Live alone.', 'Help each other.', 'Take responsibilities.', 'Spend time with others.'], answer: 'D', passage: RD_2023_P4, groupId: 'real2023.rg4', groupTitle: '2023 阅读 Passage 4：青春期', tags: ['reading'], conclusion: 'socialize 意为"与他人交往、共处"。', keyPoint: 'like to be with other adolescents', why: '"adolescents like to be with other adolescents" 解释了 socialize 即与同伴相处。', wrong: [['A', 'live alone 与 socialize 相反。'], ['B', '非互相帮助。'], ['C', '非承担责任。']], location: '第二段末' },
  { id: 'real2023.rd.51', section: 'Reading', questionType: 'reading.detail', text: 'Why did Natterson-Horowitz and Bowers write the book?', options: ['To better educate human teenagers.', 'To better understand their own children.', 'To research on adolescent peer pressure.', 'To get to know adolescent drinking problem.'], answer: 'B', passage: RD_2023_P4, groupId: 'real2023.rg4', groupTitle: '2023 阅读 Passage 4：青春期', tags: ['reading'], conclusion: '写书是为了更好地理解自己的孩子。', keyPoint: 'driven by wanting to understand their own children', why: '末句 "Their desire to understand the wild was driven by wanting to understand their own children."', wrong: [['A', '目的不是教育青少年。'], ['C', '同伴压力只是书中内容，非写书目的。'], ['D', '饮酒问题只是实验内容。']], location: '末段末句' },
];

const REAL_2023 = [
  ...REAL_2023_SEED,
  ...CLOZE_2023_SEED,
  ...RD_2023_P1_SEED,
  ...RD_2023_P2_SEED,
  ...RD_2023_P3_SEED,
  ...RD_2023_P4_SEED,
];

// ============================================================
// 2024 成人高考专升本英语模拟试题（eol.cn，1–51 题）
// 来源：http://www.eol.cn/chengkao/xckwyw/2025070816456.html
// 注：第 2、47 题来源答案与题干/原文不一致，已按题干自洽原则修正（见各题 whyWrong）。
// ============================================================

const MOCK_CLOZE = `What is intelligence (智力) anyway? When I was in the army I 21 an intelligence test that all soldiers took, and, against 22 of 100, scored 160.

I had an auto-repair man once, who, on these intelligence tests, could not 23 have scored more than 80. 24 , when anything went wrong with my car I hurried to him—and he always 25 it.

Well, then, suppose my auto-repair man designed questions for some intelligence tests. By every one of them I'd prove myself a 26 . In a world where I have to work with my hands, I'd do poorly.

Consider my auto-repair man 27 . He had a habit of telling jokes. One time he said, "Doc, a deaf-and-dumb (聋哑) man 28 some nails. Having entered a store, he put two fingers together on the counter and made 29 movements with the other hand. The clerk brought him a hammer. He 30 his head and pointed to the two fingers he was hammering. The clerk brought him some nails. He picked out the right size and left. Well, Doc, the 31 man who came in was blind. He wanted scissors (剪刀). 32 do you suppose he asked for them?" I lifted my right hand and made scissoring movements with my first two fingers. He burst out laughing and said, "Why, you fool, he used his voice and asked for them. I've been 33 that on all my customers today, but I knew 34 I'd catch you." "Why is that?" I asked. "Because you are so goddamned educated, Doc. I knew you couldn't be very 35 ."

And I have an uneasy feeling he had something there.`;

const MOCK_RD1 = `There has been, in history, a man who was swallowed by a whale and lived to tell the tale. The man's name is James Bartley. The records to prove his unusual experience are in the British Admiralty.

Bartley was making his first trip on the whaling ship Star of the East. Suddenly the lookout sighted a huge sperm whale. The whalers knew it was a huge whale by the size of the spray it blew into the air. They lowered their small boats. James Bartley was in the first longboat. The men rowed until they were close to the whale. A harpoon was thrown and it found its mark. It sank into the whale's flesh. The maddened beast crashed into the boat, snapping its tail at the men and the wreckage of their boats. When the survivors were picked up, James Bartley was missing.

Shortly before sunset, the whale was finally captured. The sailors tied the whale's dead body to the side of the ship. Because of the hot weather it was important that they cut up the whale right away. Otherwise, the meat would begin to rot and oil would begin to spoil. When they got to the stomach, they felt something moving about wildly. They thought it would be a big fish still alive inside. But when they opened the stomach they found James Bartley. After this trip, Bartley settled in England, and never returned to sea.`;

const MOCK_RD2 = `In ancient times wealth was measured and exchanged in things that could be touched: food, tools, and precious metals and stones. Then the barter system was replaced by coins, which still had real value since they were pieces of rare metal. Coins were followed by fiat money, paper notes that have value only because everyone agrees to accept them.

Today electronic monetary systems are gradually being introduced that will transform money into even less tangible forms, reducing it to a series of "bits and bytes", or units of computerized information, going between machines at the speed of light. Already, electronic fund transfer allows money to be instantly sent and received by different banks, companies, and countries through computers and telecommunications devices.`;

const MOCK_RD3 = `Alaska, which was called Russian America before it was sold to U.S.A., joined the union as the forty-ninth state in 1959.

Alaska is now the largest of all the 50 states of the U.S.

It was in 1867 that President A. Johnson's Secretary of State (国务卿), Seward bought Alaska from the Russians at a cost of 7.2 million. The buying of the huge northern land mass seemed at first something foolishly done. Not only was Alaska difficult to reach, but it was also hard to live in, and it appeared to have no importance in time of war. Besides, there are volcanoes there as Alaska lies on the Pacific "ring of fire". In Alaska large treeless areas are covered with snow all the year. For these reasons the buying of Alaska was called "Seward's Folly" at that time.

However, in 1896 gold was found in Alaska, and people poured into the land quickly. Since then other important natural resources were discovered, including oil. Soon people changed their thinking about "Seward's Folly". But most people visit Alaska in order to see the endless beauty of nature that the northern land discloses to them. For instance, there are about 11,000 islands in Alaska. And in a certain area of Alaska the sun does not set for 82 days every year.`;

const MOCK_RD4 = `Deep inside a mountain near Sweetwater in East Tennessee is a body of water known as the Lost Sea. It is listed by the Guinness Book of World Records as the world's largest underground lake. The Lost Sea is part of an extensive and historic cave system called Craighead Caverns.

The caverns have been known and used since the days of the Cherokee Indian Nation. The cave expands into a series of huge rooms from a small opening on the side of the mountain. Approximately one mile from the entrance, in a room called "the Council Room", many Indian artifacts have been found. Some of the items discovered include pottery, arrowheads, weapons, and jewelry.

For many years there were persistent rumors of a large underground lake somewhere in a cave, but it was not discovered until 1905. In that year, a thirteen-year-old boy named Ben Sands crawled through a small opening three hundred feet underground. He found himself in a large cave half filled with water.

Today tourists visit the Lost Sea and ride far out onto it in glass-bottomed boats powered by electric motors. More than thirteen acres of water have been mapped out so far and still no end to the lake has been found. Even though teams of divers have tried to explore the Lost Sea, the full extent of it is still unknown.`;

function mc(
  id: string,
  section: Section,
  qtype: string,
  text: string,
  options: string[],
  answer: string,
  conclusion: string,
  keyPoint: string,
  p9: string | Partial<QSeed>,
  p10?: [string, string][] | string,
  p11?: Partial<QSeed> | [string, string][],
  p12?: Partial<QSeed>,
): QSeed {
  // 支持两种调用顺序：
  // 1) mc(..., why, wrong, extra?, extra2?)   —— 单选/词汇语法
  // 2) mc(..., extra, why, wrong, extra2?)     —— 完形/阅读（需传 passage/groupId/location）
  let why: string;
  let wrong: [string, string][];
  let extra: Partial<QSeed>;
  if (typeof p9 === 'string') {
    why = p9;
    wrong = (p10 as [string, string][]) ?? [];
    extra = { ...((p11 as Partial<QSeed>) ?? {}), ...(p12 ?? {}) };
  } else {
    extra = { ...p9, ...((p12 as Partial<QSeed>) ?? {}) };
    why = p10 as string;
    wrong = (p11 as [string, string][]) ?? [];
  }
  return { id, section, questionType: qtype, text, options, answer, conclusion, keyPoint, why, wrong, ...extra };
}

const MOCK_SEED: QSeed[] = [
  // 语音 1–5
  mc('mock.eol.01', 'Phonetics', 'phonetics.consonant', '选出划线部分读音不同的一项：A. mental  B. metal  C. total  D. metallic', ['mental', 'metal', 'total', 'metallic'], 'D', 'metallic 中 t 发清晰 /t/，其余 t 在美国英语中弱化为齿龈闪音 /ɾ/。', 't 在重读音节前保留 /t/。', 'metallic /məˈtælɪk/ 中 t 位于重读音节 /tæl/ 前，发 /t/；mental/metal/total 的 t 在非重读音节前弱化为 /ɾ/。', [['A', 'mental 的 t 弱化为 /ɾ/。'], ['B', 'metal 的 t 弱化为 /ɾ/。'], ['C', 'total 的 t 弱化为 /ɾ/。']]),
  mc('mock.eol.02', 'Phonetics', 'phonetics.consonant', '选出划线部分读音不同的一项：A. thanks  B. pills  C. news  D. films', ['thanks', 'pills', 'news', 'films'], 'A', 'thanks 的 s 发 /s/，其余 s 发 /z/。', '清辅音后 s 读 /s/，浊辅音/元音后 s 读 /z/。', 'thanks /θæŋks/ 中 s 在清辅音 k 后读 /s/；pills /pɪlz/、news /njuːz/、films /fɪlmz/ 中 s 在浊辅音后读 /z/。（来源原标 B，按读音规则修正为 A）', [['B', 'pills 的 s 读 /z/。'], ['C', 'news 的 s 读 /z/。'], ['D', 'films 的 s 读 /z/。']]),
  mc('mock.eol.03', 'Phonetics', 'phonetics.consonant', '选出划线部分读音不同的一项：A. election  B. pronunciation  C. question  D. operation', ['election', 'pronunciation', 'question', 'operation'], 'C', 'question 的 tion 发 /tʃən/，其余发 /ʃn/。', 'tion 通常读 /ʃn/，question 例外读 /tʃən/。', 'election /ɪˈlekʃn/、pronunciation /prəˌnʌnsiˈeɪʃn/、operation /ˌɒpəˈreɪʃn/ 中 tion 读 /ʃn/；question /ˈkwestʃən/ 中 tion 读 /tʃən/。', [['A', 'election 的 tion 读 /ʃn/。'], ['B', 'pronunciation 的 tion 读 /ʃn/。'], ['D', 'operation 的 tion 读 /ʃn/。']]),
  mc('mock.eol.04', 'Phonetics', 'phonetics.vowel', '选出划线部分读音不同的一项：A. dear  B. heart  C. ear  D. tear', ['dear', 'heart', 'ear', 'tear'], 'B', 'heart 的 ear 发 /ɑː/，其余发 /ɪə/。', 'ear 在 heart 中读 /ɑː/。', 'dear /dɪə/、ear /ɪə/、tear /tɪə/ 中 ear 读 /ɪə/；heart /hɑːt/ 中 ear 读 /ɑː/。', [['A', 'dear 的 ear 读 /ɪə/。'], ['C', 'ear 的 ear 读 /ɪə/。'], ['D', 'tear 的 ear 读 /ɪə/。']]),
  mc('mock.eol.05', 'Phonetics', 'phonetics.vowel', '选出划线部分读音不同的一项：A. manage  B. matter  C. madam  D. many', ['manage', 'matter', 'madam', 'many'], 'D', 'many 的 a 发 /e/，其余发 /æ/。', 'a 在 many 中读 /e/。', 'manage /ˈmænɪdʒ/、matter /ˈmætə/、madam /ˈmædəm/ 中 a 读 /æ/；many /ˈmeni/ 中 a 读 /e/。', [['A', 'manage 的 a 读 /æ/。'], ['B', 'matter 的 a 读 /æ/。'], ['C', 'madam 的 a 读 /æ/。']]),

  // 词汇与语法 6–20
  mc('mock.eol.06', 'Vocabulary', 'vocab.adv', "Johnson, my father's younger brother, will not be at the picnic, ___ to the family's disappointment.", ['more', 'much', 'too much', 'much more'], 'B', 'much to one\'s disappointment 令某人大为失望。', 'much to + n. 表程度。', 'much to the family\'s disappointment 令全家人大为失望，为固定搭配。', [['A', 'more 不用于此搭配。'], ['C', 'too much 太多。'], ['D', 'much more 用于比较。']]),
  mc('mock.eol.07', 'Grammar', 'grammar.tense', 'The burglar was caught ___.', ['while he left the house', 'when he was left the house', 'as he was leaving the house', 'as soon as he was leaving the house'], 'C', 'as he was leaving 表"正当他离开时"，用过去进行时。', 'as/when + 过去进行时表过去某动作正在进行时。', '盗贼被抓时他正在离开，用 as 引导的过去进行时 was leaving。', [['A', 'while 后应接进行时。'], ['B', 'was left 为被动，语义错误。'], ['D', 'as soon as 不接进行时表此义。']]),
  mc('mock.eol.08', 'Grammar', 'grammar.so', '"Look, your wife has just come in." "___"', ['So she did', 'So did she', 'So has she', 'So she has'], 'D', 'So she has 表示"她确实进来了"，表赞同。', 'So + 主语 + 助动词 表"的确如此"。', '对前文"你妻子刚进来"表示确认，用 So she has（与 has just come 时态一致）。', [['A', '时态不一致。'], ['B', 'So did she 表"她也一样"，主语不同。'], ['C', 'So has she 表"她也一样"。']]),
  mc('mock.eol.09', 'Vocabulary', 'vocab.verb', 'Government officials should always ___ in mind the people\'s needs.', ['carry', 'take', 'train', 'bear'], 'D', 'bear in mind 意为"记住"。', 'bear/keep in mind。', 'bear in mind the people\'s needs 牢记人民需求，固定搭配。', [['A', 'carry 不与 in mind 搭配。'], ['B', 'take in mind 非固定搭配。'], ['C', 'train 训练。']]),
  mc('mock.eol.10', 'Vocabulary', 'vocab.noun', "I'd like to take ___ of this opportunity to thank you all for your cooperation.", ['profit', 'benefit', 'advantage', 'interest'], 'C', 'take advantage of 意为"利用"。', 'take advantage of。', 'take advantage of this opportunity 利用这次机会，固定搭配。', [['A', 'profit 利润。'], ['B', 'benefit 利益，搭配不同。'], ['D', 'interest 兴趣/利息。']]),
  mc('mock.eol.11', 'Vocabulary', 'vocab.adj', 'It is quite necessary for a teacher to have good manners and ___ knowledge.', ['extensive', 'expensive', 'intensive', 'expressive'], 'A', 'extensive knowledge 意为"渊博的知识"。', 'extensive 广泛的。', 'extensive knowledge 广博的知识，符合教师素养。', [['B', 'expensive 昂贵的。'], ['C', 'intensive 集中的。'], ['D', 'expressive 有表现力的。']]),
  mc('mock.eol.12', 'Vocabulary', 'vocab.prep', 'Susan wants to know whether the measures have been agreed ___.', ['to', 'with', 'over', 'on'], 'D', 'agree on 意为"就……达成一致"。', 'agree on sth.。', 'agree on the measures 就措施达成一致。agree with sb.；agree to sth.（计划/建议）。', [['A', 'agree to 接计划/建议。'], ['B', 'agree with 接人。'], ['C', 'agree over 非常用搭配。']]),
  mc('mock.eol.13', 'Grammar', 'grammar.wh', 'Would you please tell me ___ to do next?', ['how', 'what', 'which', 'whatever'], 'B', 'what to do 作 tell 的宾语，"接下来做什么"。', 'what to do。', 'what 作 do 的逻辑宾语，构成 what to do 不定式短语。', [['A', 'how to do 缺宾语，应为 how to do it。'], ['C', 'which 哪一个。'], ['D', 'whatever 无论什么。']]),
  mc('mock.eol.14', 'Vocabulary', 'vocab.phrasal', 'We should look ___ the matter before we reach a conclusion.', ['into', 'for', 'to', 'at'], 'A', 'look into 意为"调查"。', 'look into = investigate。', 'look into the matter 调查此事，在做结论前先调查。', [['B', 'look for 寻找。'], ['C', 'look to 指望。'], ['D', 'look at 看。']]),
  mc('mock.eol.15', 'Grammar', 'grammar.sva', 'Every officer and every soldier ___ obey the rules.', ['had to', 'have to', 'has to', 'must have to'], 'C', 'every...and every... 作主语时谓语用单数。', 'every A and every B → 单数谓语。', 'Every officer and every soldier 作主语，谓语用单数 has to。', [['A', 'had to 时态不符。'], ['B', 'have to 为复数。'], ['D', 'must 与 have to 不连用。']]),
  mc('mock.eol.16', 'Vocabulary', 'vocab.phrasal', "She's fainted. Throw some water on her face and she may soon ___.", ['come around', 'come again', 'come back', 'come on'], 'A', 'come around 意为"苏醒"。', 'come around = regain consciousness。', 'come around 苏醒过来，符合"晕倒后泼水"语境。', [['B', 'come again 再来。'], ['C', 'come back 回来。'], ['D', 'come on 加油/得了吧。']]),
  mc('mock.eol.17', 'Vocabulary', 'vocab.noun', 'Having been found guilty, the man was given a severe ___ by the judge.', ['crisis', 'crime', 'sentence', 'service'], 'C', 'give a sentence 意为"判刑"。', 'severe sentence 重刑。', 'judge 判决用 sentence，severe sentence 重判。', [['A', 'crisis 危机。'], ['B', 'crime 罪行。'], ['D', 'service 服务。']]),
  mc('mock.eol.18', 'Grammar', 'grammar.conj', '___ the sun is the central body of the solar system so the nucleus is the core of the atom.', ['When', 'If', 'Now that', 'Just as'], 'D', 'Just as...so... 意为"正如……，……也……"。', 'Just as A, so B。', 'Just as the sun..., so the nucleus... 正如太阳是太阳系中心，原子核也是原子的核心。', [['A', 'When 当……时。'], ['B', 'If 如果。'], ['C', 'Now that 既然。']]),
  mc('mock.eol.19', 'Grammar', 'grammar.comparison', 'The sports team of our province won ___ they did at the last National Games.', ['twice as many gold medals as', 'as many twice gold medals as', 'as many as twice gold medals', 'twice many gold medals than'], 'A', 'twice as many...as 表"是……的两倍"。', '倍数 + as + adj. + n. + as。', 'twice as many gold medals as 是上届金牌数的两倍。', [['B', '语序错误。'], ['C', '语序错误。'], ['D', '搭配错误。']]),
  mc('mock.eol.20', 'Grammar', 'grammar.part_of_speech', 'The speech was not interesting. Most of the people present began to move about ___.', ['impatient', 'impatiently', 'impatience', 'patiently'], 'B', '修饰动词 move 用副词 impatiently。', '副词修饰动词。', 'move about impatiently 不耐烦地走来走去，用副词修饰动词。', [['A', 'impatient 形容词。'], ['C', 'impatience 名词。'], ['D', 'patiently 耐心地，与句意相反。']]),

  // 完形 21–35
  mc('mock.eol.21', 'Cloze', 'cloze', '21. A. failed  B. wrote  C. received  D. chose', ['failed', 'wrote', 'received', 'chose'], 'C', 'receive an intelligence test 接受智力测验。', 'receive a test', { passage: MOCK_CLOZE, groupId: 'mock.eol.cg1', groupTitle: '模拟完形：智力测验', clozeTag: 'cloze.verb', tags: ['cloze'] }, 'receive an intelligence test 接受智力测验。', [['A', 'failed 失败。'], ['B', 'wrote 写。'], ['D', 'chose 选择。']]),
  mc('mock.eol.22', 'Cloze', 'cloze', '22. A. an average  B. a total  C. an exam  D. a number', ['an average', 'a total', 'an exam', 'a number'], 'A', 'against an average of 100 以平均 100 分为基准。', 'an average of', { passage: MOCK_CLOZE, groupId: 'mock.eol.cg1', groupTitle: '模拟完形：智力测验', clozeTag: 'cloze.noun', tags: ['cloze'] }, 'against an average of 100 相对于平均分 100。', [['B', 'a total 总数。'], ['C', 'an exam 考试。'], ['D', 'a number 数字。']]),
  mc('mock.eol.23', 'Cloze', 'cloze', '23. A. always  B. possibly  C. certainly  D. frequently', ['always', 'possibly', 'certainly', 'frequently'], 'B', 'could not possibly 不可能。', 'could not possibly', { passage: MOCK_CLOZE, groupId: 'mock.eol.cg1', groupTitle: '模拟完形：智力测验', clozeTag: 'cloze.adv', tags: ['cloze'] }, 'could not possibly have scored 不可能得分超过 80。', [['A', 'always 总是。'], ['C', 'certainly 当然。'], ['D', 'frequently 频繁地。']]),
  mc('mock.eol.24', 'Cloze', 'cloze', '24. A. Then  B. Thus  C. Therefore  D. Yet', ['Then', 'Thus', 'Therefore', 'Yet'], 'D', 'Yet 表转折，"然而车坏了我还得找他"。', 'Yet = however', { passage: MOCK_CLOZE, groupId: 'mock.eol.cg1', groupTitle: '模拟完形：智力测验', clozeTag: 'cloze.conj', tags: ['cloze'] }, '前文说他智商不高，Yet 转折说他修车很厉害。', [['A', 'Then 然后。'], ['B', 'Thus 因此。'], ['C', 'Therefore 所以。']]),
  mc('mock.eol.25', 'Cloze', 'cloze', '25. A. fixed  B. checked  C. drove  D. changed', ['fixed', 'checked', 'drove', 'changed'], 'A', 'fix the car 修车。', 'fix = repair', { passage: MOCK_CLOZE, groupId: 'mock.eol.cg1', groupTitle: '模拟完形：智力测验', clozeTag: 'cloze.verb', tags: ['cloze'] }, 'he always fixed it 他总能修好车。', [['B', 'checked 检查。'], ['C', 'drove 驾驶。'], ['D', 'changed 改变。']]),
  mc('mock.eol.26', 'Cloze', 'cloze', '26. A. teacher  B. doctor  C. winner  D. fool', ['teacher', 'doctor', 'winner', 'fool'], 'D', 'prove myself a fool 证明自己是傻子。', 'prove sb. a fool', { passage: MOCK_CLOZE, groupId: 'mock.eol.cg1', groupTitle: '模拟完形：智力测验', clozeTag: 'cloze.noun', tags: ['cloze'] }, '若由修理工出题，我会显得像个傻子。', [['A', 'teacher 老师。'], ['B', 'doctor 医生。'], ['C', 'winner 赢家。']]),
  mc('mock.eol.27', 'Cloze', 'cloze', '27. A. again  B. as usual  C. too  D. as well', ['again', 'as usual', 'too', 'as well'], 'A', 'consider...again 再想想（这个修理工）。', 'consider again', { passage: MOCK_CLOZE, groupId: 'mock.eol.cg1', groupTitle: '模拟完形：智力测验', clozeTag: 'cloze.adv', tags: ['cloze'] }, '再想想我的修理工，引出他讲笑话。', [['B', 'as usual 像往常一样。'], ['C', 'too 也。'], ['D', 'as well 也。']]),
  mc('mock.eol.28', 'Cloze', 'cloze', '28. A. bought  B. tasted  C. found  D. needed', ['bought', 'tasted', 'found', 'needed'], 'D', 'needed some nails 需要一些钉子。', 'need sth.', { passage: MOCK_CLOZE, groupId: 'mock.eol.cg1', groupTitle: '模拟完形：智力测验', clozeTag: 'cloze.verb', tags: ['cloze'] }, '聋哑人需要钉子，去商店买。', [['A', 'bought 买（后文才买）。'], ['B', 'tasted 品尝。'], ['C', 'found 找到。']]),
  mc('mock.eol.29', 'Cloze', 'cloze', '29. A. cutting  B. hammering  C. waving  D. circling', ['cutting', 'hammering', 'waving', 'circling'], 'B', 'hammering movements 锤击动作。', 'hammering movements', { passage: MOCK_CLOZE, groupId: 'mock.eol.cg1', groupTitle: '模拟完形：智力测验', clozeTag: 'cloze.verb', tags: ['cloze'] }, '聋哑人做锤击动作，店员拿了锤子。', [['A', 'cutting 切割。'], ['C', 'waving 挥动。'], ['D', 'circling 环绕。']]),
  mc('mock.eol.30', 'Cloze', 'cloze', '30. A. nodded  B. raised  C. shook  D. turned', ['nodded', 'raised', 'shook', 'turned'], 'C', 'shake one\'s head 摇头（表示不对）。', 'shake head = no', { passage: MOCK_CLOZE, groupId: 'mock.eol.cg1', groupTitle: '模拟完形：智力测验', clozeTag: 'cloze.verb', tags: ['cloze'] }, '店员拿错锤子，他摇头并指向两根手指。', [['A', 'nodded 点头。'], ['B', 'raised 抬起。'], ['D', 'turned 转向。']]),
  mc('mock.eol.31', 'Cloze', 'cloze', '31. A. clever  B. other  C. right  D. next', ['clever', 'other', 'right', 'next'], 'D', 'the next man 下一个进来的人。', 'the next man', { passage: MOCK_CLOZE, groupId: 'mock.eol.cg1', groupTitle: '模拟完形：智力测验', clozeTag: 'cloze.adj', tags: ['cloze'] }, '聋哑人走后，下一个进来的是盲人。', [['A', 'clever 聪明的。'], ['B', 'other 其他的。'], ['C', 'right 正确的。']]),
  mc('mock.eol.32', 'Cloze', 'cloze', '32. A. What  B. How  C. Who  D. Which', ['What', 'How', 'Who', 'Which'], 'B', 'How do you suppose he asked for them? 你认为他怎么要剪刀？', 'How 问方式', { passage: MOCK_CLOZE, groupId: 'mock.eol.cg1', groupTitle: '模拟完形：智力测验', clozeTag: 'cloze.wh', tags: ['cloze'] }, '问盲人如何要剪刀，用 How。', [['A', 'What 什么。'], ['C', 'Who 谁。'], ['D', 'Which 哪个。']]),
  mc('mock.eol.33', 'Cloze', 'cloze', '33. A. trying  B. proving  C. practicing  D. examining', ['trying', 'proving', 'practicing', 'examining'], 'A', 'try sth. on sb. 用……捉弄某人。', 'try sth. on sb.', { passage: MOCK_CLOZE, groupId: 'mock.eol.cg1', groupTitle: '模拟完形：智力测验', clozeTag: 'cloze.verb', tags: ['cloze'] }, 'I\'ve been trying that on all my customers 我一直用这招捉弄顾客。', [['B', 'proving 证明。'], ['C', 'practicing 练习。'], ['D', 'examining 检查。']]),
  mc('mock.eol.34', 'Cloze', 'cloze', '34. A. for sure  B. at once  C. in fact  D. right now', ['for sure', 'at once', 'in fact', 'right now'], 'A', 'for sure 肯定地。', 'for sure = certainly', { passage: MOCK_CLOZE, groupId: 'mock.eol.cg1', groupTitle: '模拟完形：智力测验', clozeTag: 'cloze.adv', tags: ['cloze'] }, 'knew for sure 确定知道我会中招。', [['B', 'at once 立刻。'], ['C', 'in fact 事实上。'], ['D', 'right now 现在。']]),
  mc('mock.eol.35', 'Cloze', 'cloze', '35. A. clear  B. silly  C. slow  D. smart', ['clear', 'silly', 'slow', 'smart'], 'D', 'smart 聪明的，"受教育太多反而不够机灵"。', 'smart = clever', { passage: MOCK_CLOZE, groupId: 'mock.eol.cg1', groupTitle: '模拟完形：智力测验', clozeTag: 'cloze.adj', tags: ['cloze'] }, '修理工笑话的笑点：读书人不够机灵（smart）。', [['A', 'clear 清楚的。'], ['B', 'silly 傻的。'], ['C', 'slow 迟钝的。']]),

  // 阅读 P1 (36–39)
  mc('mock.eol.36', 'Reading', 'reading.main_idea', 'This passage is mainly about ___.', ['how to hunt whales for their oil and meat', 'the hard and dangerous lives that whalers had to live', 'the duties of each man on a whaling ship', 'a man who was swallowed by a whale and lived'], 'D', '本文主要讲被鲸鱼吞下后生还的人。', 'main idea: James Bartley survived inside a whale', { passage: MOCK_RD1, groupId: 'mock.eol.rg1', groupTitle: '模拟阅读 P1：鲸腹余生', tags: ['reading'] }, '全文围绕 James Bartley 被鲸吞食后生还展开。', [['A', '非讲捕鲸方法。'], ['B', '非讲捕鲸人生活。'], ['C', '非讲船上职责。']], { location: '全文主旨' }),
  mc('mock.eol.37', 'Reading', 'reading.detail', 'The sailors knew that something was in the whale\'s stomach because ___.', ['they could feel it moving about wildly', 'the whale seemed very heavy', 'the whale was swelling at one spot', 'the captain heard Bartley yelling for help'], 'A', '他们感到鲸胃里有东西在剧烈动。', 'felt something moving about wildly', { passage: MOCK_RD1, groupId: 'mock.eol.rg1', groupTitle: '模拟阅读 P1：鲸腹余生', tags: ['reading'] }, '"they felt something moving about wildly"。', [['B', '文中未提鲸鱼重。'], ['C', '文中未提肿胀。'], ['D', '未听到喊叫声。']], { location: '第三段第四句' }),
  mc('mock.eol.38', 'Reading', 'reading.inference', 'James Bartley probably never went to sea again because ___.', ['he wanted different kinds of adventures', 'of fright and shock', 'he was crippled by the whale', 'he often got seasick'], 'B', '因恐惧和震惊不再出海。', 'never returned to sea', { passage: MOCK_RD1, groupId: 'mock.eol.rg1', groupTitle: '模拟阅读 P1：鲸腹余生', tags: ['reading'] }, '被鲸吞的恐怖经历使他再也不出海。', [['A', '非想换冒险。'], ['C', '未提到残废。'], ['D', '非晕船。']], { location: '末段末句' }),
  mc('mock.eol.39', 'Reading', 'reading.inference', 'The author, in telling James Bartley\'s story, informs us by ___.', ['narrating the plain facts', 'referring to whaling in general', 'comparing whaling to other fishing', 'dramatically telling what happened'], 'D', '作者以戏剧性手法讲述经过。', 'dramatically telling', { passage: MOCK_RD1, groupId: 'mock.eol.rg1', groupTitle: '模拟阅读 P1：鲸腹余生', tags: ['reading'] }, '作者生动描写捕鲸、被吞、获救过程，属戏剧性叙述。', [['A', '非平铺直叙。'], ['B', '非泛谈捕鲸。'], ['C', '未与其他渔业比较。']], { location: '全文手法' }),

  // 阅读 P2 (40–43)
  mc('mock.eol.40', 'Reading', 'reading.detail', 'According to the passage, which of the following was the earliest kind of exchange of wealth?', ['Bartered goods.', 'Fiat money', 'Coin currency', 'Intangible forms'], 'A', '最早的财富交换形式是实物易货。', 'food, tools, and precious metals', { passage: MOCK_RD2, groupId: 'mock.eol.rg2', groupTitle: '模拟阅读 P2：货币演变', tags: ['reading'] }, '古代用实物（food, tools, metals）交换，即 barter。', [['B', 'fiat money 为纸币，较晚。'], ['C', 'coins 晚于实物。'], ['D', '无形货币最晚。']], { location: '第一段第一句' }),
  mc('mock.eol.41', 'Reading', 'reading.detail', 'The author mentions food, tools and precious metals and stones together because they are all ___.', ['useful items', 'articles of value', 'difficult things to obtain', 'material objects'], 'D', '它们都是有形的物质实体。', 'things that could be touched', { passage: MOCK_RD2, groupId: 'mock.eol.rg2', groupTitle: '模拟阅读 P2：货币演变', tags: ['reading'] }, '"things that could be touched" 即可触摸的物质实体。', [['A', 'useful 非共同要点。'], ['B', 'articles of value 但核心是有形。'], ['C', 'difficult to obtain 非核心。']], { location: '第一段第一句' }),
  mc('mock.eol.42', 'Reading', 'reading.detail', 'According to the passage, coins once had real value as currency because they ___.', ['represented a great improvement over barter', 'permitted easy transportation of wealth', 'were made of precious metals', 'could become collector\'s items'], 'C', '硬币由稀有金属制成，故有真实价值。', 'pieces of rare metal', { passage: MOCK_RD2, groupId: 'mock.eol.rg2', groupTitle: '模拟阅读 P2：货币演变', tags: ['reading'] }, '"coins, which still had real value since they were pieces of rare metal"。', [['A', '改进易货非价值来源。'], ['B', '便于运输非价值来源。'], ['D', '收藏非价值来源。']], { location: '第一段第二句' }),
  mc('mock.eol.43', 'Reading', 'reading.detail', 'Which of the following statements about computerized monetary systems is NOT supported by the passage?', ['They promote international trade.', 'They allow very rapid money transfers.', 'They are still limited to small transactions.', 'They are dependent on good telecommunications systems.'], 'C', '文中未说电子货币仅限小额交易。', 'NOT supported', { passage: MOCK_RD2, groupId: 'mock.eol.rg2', groupTitle: '模拟阅读 P2：货币演变', tags: ['reading'] }, '文中说电子转账可在不同银行、公司、国家间即时进行，未限制为小额。', [['A', '跨国转账即促进国际贸易。'], ['B', 'instantly sent and received 支持。'], ['D', 'through telecommunications devices 支持。']], { location: '第二段' }),

  // 阅读 P3 (44–47)
  mc('mock.eol.44', 'Reading', 'reading.detail', 'Alaska belonged to ___ before 1867.', ['Russia', 'America', 'Canada', 'Japan'], 'A', '1867 年前阿拉斯加属于俄国。', 'bought Alaska from the Russians', { passage: MOCK_RD3, groupId: 'mock.eol.rg3', groupTitle: '模拟阅读 P3：阿拉斯加', tags: ['reading'] }, '"Seward bought Alaska from the Russians" 说明此前属俄国。', [['B', '1867 年后才属美国。'], ['C', '非加拿大。'], ['D', '非日本。']], { location: '第三段第一句' }),
  mc('mock.eol.45', 'Reading', 'reading.detail', 'The buying of Alaska was first called ___.', ['a foolish thing', "Seward's Folly", "Johnson's Folly", "President's Foolishness"], 'B', '购买阿拉斯加最初被称为"Seward\'s Folly"。', "Seward's Folly", { passage: MOCK_RD3, groupId: 'mock.eol.rg3', groupTitle: '模拟阅读 P3：阿拉斯加', tags: ['reading'] }, '原文 "the buying of Alaska was called \'Seward\'s Folly\'"。', [['A', '原文是 Seward\'s Folly。'], ['C', '非 Johnson。'], ['D', '非 President。']], { location: '第三段末句' }),
  mc('mock.eol.46', 'Reading', 'reading.detail', 'Volcanoes ___ in Alaska as ___.', ['are not found; large parts of the land is covered with snow', 'are not found; it is at the northern top of America', 'are found; it is on the Pacific "ring of fire"', 'are found; there are so many islands'], 'C', '阿拉斯加有火山，因为它位于太平洋"火环"。', 'Pacific "ring of fire"', { passage: MOCK_RD3, groupId: 'mock.eol.rg3', groupTitle: '模拟阅读 P3：阿拉斯加', tags: ['reading'] }, '"there are volcanoes there as Alaska lies on the Pacific \'ring of fire\'"。', [['A', '有火山。'], ['B', '有火山。'], ['D', '有火山但原因不是岛屿多。']], { location: '第三段' }),
  mc('mock.eol.47', 'Reading', 'reading.detail', 'Tourists come to Alaska to ___.', ['study its importance in war', 'study its volcanoes', 'enjoy its freezing weather', 'enjoy its beauty of nature'], 'D', '游客来阿拉斯加欣赏自然之美。', 'see the endless beauty of nature', { passage: MOCK_RD3, groupId: 'mock.eol.rg3', groupTitle: '模拟阅读 P3：阿拉斯加', tags: ['reading'] }, '原文 "most people visit Alaska in order to see the endless beauty of nature"。（来源原标 C，按原文修正为 D）', [['A', '文中说战时不重要。'], ['B', '非来研究火山。'], ['C', '非来享受严寒。']], { location: '第四段第二句' }),

  // 阅读 P4 (48–51)
  mc('mock.eol.48', 'Reading', 'reading.detail', 'The Lost Sea is unique because it is ___.', ['part of a historical cave system', 'the biggest underground lake in the world', 'listed in the Guinness Book of World Records', 'the largest body of water in Tennessee'], 'B', 'Lost Sea 是世界最大的地下湖。', "world's largest underground lake", { passage: MOCK_RD4, groupId: 'mock.eol.rg4', groupTitle: '模拟阅读 P4：Lost Sea', tags: ['reading'] }, '"the world\'s largest underground lake"。', [['A', '虽属历史洞穴系统，但独特性在于最大。'], ['C', '被列入吉尼斯是因其最大。'], ['D', '非田纳西最大水体。']], { location: '第一段第二句' }),
  mc('mock.eol.49', 'Reading', 'reading.detail', 'The Craighead Caverns have been known ___.', ['through history', 'since the time of the Indian Nations', 'since 1905', 'since divers explored them'], 'B', 'Craighead Caverns 自印第安部落时代就已为人所知。', 'since the days of the Cherokee Indian Nation', { passage: MOCK_RD4, groupId: 'mock.eol.rg4', groupTitle: '模拟阅读 P4：Lost Sea', tags: ['reading'] }, '"The caverns have been known and used since the days of the Cherokee Indian Nation"。', [['A', 'through history 太泛。'], ['C', '1905 是发现湖的时间。'], ['D', '潜水是后来的探索。']], { location: '第二段第一句' }),
  mc('mock.eol.50', 'Reading', 'reading.detail', 'Who located the Lost Sea in recent times?', ['The Cherokee Indians.', 'Tourism.', 'Ben Sands.', 'Scientists.'], 'C', 'Ben Sands 在 1905 年发现了 Lost Sea。', 'Ben Sands', { passage: MOCK_RD4, groupId: 'mock.eol.rg4', groupTitle: '模拟阅读 P4：Lost Sea', tags: ['reading'] }, '"a thirteen-year-old boy named Ben Sands crawled through a small opening" 发现了湖。', [['A', '印第安人知洞穴但未发现湖。'], ['B', '旅游业在发现之后。'], ['D', '非科学家。']], { location: '第三段' }),
  mc('mock.eol.51', 'Reading', 'reading.inference', 'It can be inferred from the passage that the Craighead Caverns presently serve as ___.', ['an underground testing site', 'an Indian meeting ground', 'a tourist attraction', 'a motor boat race course'], 'C', 'Craighead Caverns 现在是旅游景点。', 'tourists visit the Lost Sea', { passage: MOCK_RD4, groupId: 'mock.eol.rg4', groupTitle: '模拟阅读 P4：Lost Sea', tags: ['reading'] }, '"Today tourists visit the Lost Sea and ride far out onto it in glass-bottomed boats"。', [['A', '非地下试验场。'], ['B', '历史上是印第安场所，现在不是。'], ['D', '非赛艇场。']], { location: '第四段第一句' }),
];

export const REAL_QUESTIONS: Question[] = [
  ...REAL_2023.map((s) =>
    make(s, {
      source: 'verified_real_exam',
      reliability: 'B',
      isRealExam: true,
      exam: '成人高等学校招生全国统一考试专升本英语',
      year: 2023,
      sourceUrl: SOURCE_2023_URL,
    }),
  ),
  ...MOCK_SEED.map((s) =>
    make(s, {
      source: 'third_party_unverified',
      reliability: 'C',
      isRealExam: false,
      exam: '成人高考专升本英语模拟试题',
      year: 2024,
      sourceUrl: SOURCE_MOCK_URL,
    }),
  ),
];
