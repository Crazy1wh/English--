import type {
  Difficulty,
  Explanation,
  GrammarExample,
  Question,
  Section,
} from '@/types';

// ============================================================
// 演示题库（文档第十二/三十四章）：
// 全部为开发演示而人工编写，source='demo'、reliability='D'、
// isRealExam=false —— 前端只能显示“演示题（非真题）”。
// 真题库必须经 抓取→来源留存→多源比对→人工核验 流程导入，
// 且 reliability 为 A/B 才可显示“历年真题”。本文件不包含任何伪真题。
// ============================================================

interface QSeed {
  id: string;
  section: Section;
  questionType: string;
  text: string;
  options: string[];
  answer: string; // A/B/C/D
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
  mnemonic?: string;
  keywords?: string[];
  location?: string;
  evidence?: string;
  paraphrase?: string;
  rule?: string;
  ruleExample?: GrammarExample;
  collocations?: string[];
  confusing?: string[];
}

const STAMP = '2026-01-01T00:00:00.000Z';

function q(s: QSeed): Question {
  const explanation: Explanation = {
    conclusion: s.conclusion,
    keyPoint: s.keyPoint,
    whyCorrect: s.why,
    whyWrong: s.wrong.map(([option, reason]) => ({ option, reason })),
    mnemonic: s.mnemonic,
    relatedKnowledge: s.tags ?? [],
    keywords: s.keywords,
    locationSentence: s.location,
    evidence: s.evidence,
    paraphrase: s.paraphrase,
    rule: s.rule,
    ruleExample: s.ruleExample,
    collocations: s.collocations,
    confusing: s.confusing,
  };
  return {
    id: s.id,
    exam: null,
    year: null,
    region: null,
    source: 'demo',
    sourceUrl: null,
    reliability: 'D',
    isRealExam: false,
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
    frequencyLevel: null,
    createdAt: STAMP,
    updatedAt: STAMP,
    generatedByAi: false,
    model: null,
    promptVersion: null,
  };
}

const SEED: QSeed[] = [
  // ================= 语音（8） =================
  { id: 'demo.ph.01', section: 'Phonetics', questionType: 'phonetics.vowel', text: '选出划线部分读音不同的一项：A. ab<b>ou</b>t  B. ab<b>o</b>ve  C. <b>a</b>gree  D. <b>a</b>ble', options: ['about /ə/', 'above /ə/', 'agree /ə/', 'able /eɪ/'], answer: 'D', difficulty: 'easy', tags: ['phonetics.vowel'], conclusion: 'able 的 a 读 /eɪ/，其余都是弱读 /ə/。', keyPoint: 'a 在非重读音节常弱读为 /ə/，但 able 读 /ˈeɪbl/。', why: 'about/above/agree 的 a 都在非重读音节，发 /ə/；able 的 a 发 /eɪ/。', wrong: [['A', 'about 的 a 弱读 /ə/。'], ['B', 'above 的 a 弱读 /ə/。'], ['C', 'agree 的 a 弱读 /ə/。']] },
  { id: 'demo.ph.02', section: 'Phonetics', questionType: 'phonetics.vowel', text: 'A. br<b>ea</b>d  B. h<b>ea</b>d  C. h<b>ea</b>lth  D. m<b>ea</b>t', options: ['bread /e/', 'head /e/', 'health /e/', 'meat /iː/'], answer: 'D', difficulty: 'easy', tags: ['phonetics.vowel'], conclusion: 'meat 的 ea 读 /iː/，其余读 /e/。', keyPoint: 'ea 常见两读：/iː/（meat, easy）与 /e/（bread, head, health）。', why: 'meat /miːt/ 读长音；bread/head/health 读短音 /e/。', wrong: [['A', 'bread 读 /e/。'], ['B', 'head 读 /e/。'], ['C', 'health 读 /e/。']] },
  { id: 'demo.ph.03', section: 'Phonetics', questionType: 'phonetics.vowel', text: 'A. b<b>oo</b>k  B. l<b>oo</b>k  C. g<b>oo</b>d  D. f<b>oo</b>d', options: ['book /ʊ/', 'look /ʊ/', 'good /ʊ/', 'food /uː/'], answer: 'D', difficulty: 'easy', tags: ['phonetics.vowel'], conclusion: 'food 读 /uː/，其余读 /ʊ/。', keyPoint: 'oo 在 k/d 前多读短 /ʊ/，food/moon/school 读长 /uː/。', why: 'food /fuːd/ 为长音；book/look/good 为短音 /ʊ/。', wrong: [['A', 'book /ʊ/。'], ['B', 'look /ʊ/。'], ['C', 'good /ʊ/。']] },
  { id: 'demo.ph.04', section: 'Phonetics', questionType: 'phonetics.consonant', text: 'A. <b>ch</b>emistry  B. s<b>ch</b>ool  C. stoma<b>ch</b>  D. <b>ch</b>ild', options: ['chemistry /k/', 'school /k/', 'stomach /k/', 'child /tʃ/'], answer: 'D', difficulty: 'normal', tags: ['phonetics.consonant'], conclusion: 'child 的 ch 读 /tʃ/，其余读 /k/。', keyPoint: 'ch 多读 /tʃ/；chemistry/school/stomach/headache 中读 /k/。', why: 'child /tʃaɪld/；其余三个 ch 发 /k/。', wrong: [['A', 'chemistry 中 ch 读 /k/。'], ['B', 'school 中 ch 读 /k/。'], ['C', 'stomach 中 ch 读 /k/。']] },
  { id: 'demo.ph.05', section: 'Phonetics', questionType: 'phonetics.consonant', text: 'A. want<b>ed</b>  B. need<b>ed</b>  C. stopp<b>ed</b>  D. wait<b>ed</b>', options: ['wanted /ɪd/', 'needed /ɪd/', 'stopped /t/', 'waited /ɪd/'], answer: 'C', difficulty: 'normal', tags: ['phonetics.consonant'], conclusion: 'stopped 的 ed 读 /t/，其余读 /ɪd/。', keyPoint: '规则动词加 ed：清辅音后 /t/，浊音后 /d/，t/d 后加读 /ɪd/。', why: 'stop 以清辅音 /p/ 结尾，ed 读 /t/；want/need/wait 以 t/d 结尾，ed 读 /ɪd/。', wrong: [['A', 'wanted 在 t 后读 /ɪd/。'], ['B', 'needed 在 d 后读 /ɪd/。'], ['D', 'waited 在 t 后读 /ɪd/。']] },
  { id: 'demo.ph.06', section: 'Phonetics', questionType: 'phonetics.consonant', text: 'A. <b>th</b>ink  B. <b>th</b>ree  C. <b>th</b>is  D. mon<b>th</b>', options: ['think /θ/', 'three /θ/', 'this /ð/', 'month /θ/'], answer: 'C', difficulty: 'easy', tags: ['phonetics.consonant'], conclusion: 'this 的 th 读 /ð/，其余读 /θ/。', keyPoint: 'th：实词多读 /θ/（think, three）；this/that/the/they 等功能词读 /ð/。', why: 'this /ðɪs/ 为浊辅音；其余为清辅音 /θ/。', wrong: [['A', 'think 读 /θ/。'], ['B', 'three 读 /θ/。'], ['D', 'month 读 /θ/。']] },
  { id: 'demo.ph.07', section: 'Phonetics', questionType: 'phonetics.vowel', text: 'A. n<b>ow</b>  B. h<b>ow</b>  C. d<b>ow</b>n  D. kn<b>ow</b>', options: ['now /aʊ/', 'how /aʊ/', 'down /aʊ/', 'know /əʊ/'], answer: 'D', difficulty: 'easy', tags: ['phonetics.vowel'], conclusion: 'know 读 /əʊ/，其余读 /aʊ/。', keyPoint: 'ow 两读：/aʊ/（now/how/down）与 /əʊ/（know/show/window）。', why: 'know /nəʊ/；其余三个读 /aʊ/。', wrong: [['A', 'now 读 /aʊ/。'], ['B', 'how 读 /aʊ/。'], ['C', 'down 读 /aʊ/。']] },
  { id: 'demo.ph.08', section: 'Phonetics', questionType: 'phonetics.consonant', text: 'A. a<b>g</b>e  B. lar<b>g</b>e  C. oran<b>g</b>e  D. <b>g</b>ift', options: ['age /dʒ/', 'large /dʒ/', 'orange /dʒ/', 'gift /g/'], answer: 'D', difficulty: 'normal', tags: ['phonetics.consonant'], conclusion: 'gift 的 g 读 /g/，其余读 /dʒ/。', keyPoint: 'g 在 e/i/y 前常读 /dʒ/；gift/girl/get 等读 /g/。', why: 'gift /ɡɪft/ 读硬音；其余在 ge 中读 /dʒ/。', wrong: [['A', 'age 读 /dʒ/。'], ['B', 'large 读 /dʒ/。'], ['C', 'orange 读 /dʒ/。']] },

  // ================= 语法（30） =================
  { id: 'demo.g.01', section: 'Grammar', questionType: 'grammar.verb.tense', text: 'By the time we arrived, the meeting ____.', options: ['has begun', 'had begun', 'begins', 'began'], answer: 'B', difficulty: 'normal', tags: ['grammar.verb.tense.past_perfect'], conclusion: '"by the time + 过去时" 表示“过去的过去”，用过去完成时 had done。', keyPoint: '过去完成时：had + 过去分词。', why: '“会议开始”发生在“我们到达（arrived）”之前，是过去的过去，用 had begun。', wrong: [['A', 'has begun 是现在完成，不能与过去参照点连用。'], ['C', 'begins 是一般现在。'], ['D', 'began 是一般过去，不能体现“过去的过去”。']], rule: '过去完成时 = had + done，表示在过去某动作之前已经完成。', ruleExample: { en: 'When I got to the station, the train had left.', zh: '我到车站时火车已经开走了。' } },
  { id: 'demo.g.02', section: 'Grammar', questionType: 'grammar.verb.tense', text: 'Listen! Someone ____ at the door.', options: ['knocks', 'knocked', 'is knocking', 'was knocking'], answer: 'C', difficulty: 'easy', tags: ['grammar.verb.tense.present_continuous'], conclusion: 'Listen!/Look! 是现在进行时的标志。', keyPoint: '现在进行时：am/is/are + doing。', why: '“听！”说明此刻正在发生，用 is knocking。', wrong: [['A', 'knocks 表经常性动作。'], ['B', 'knocked 是过去时。'], ['D', 'was knocking 是过去进行。']] },
  { id: 'demo.g.03', section: 'Grammar', questionType: 'grammar.verb.tense', text: 'I ____ him three times since last week.', options: ['called', 'call', 'have called', 'had called'], answer: 'C', difficulty: 'normal', tags: ['grammar.verb.tense.present_perfect'], conclusion: 'since + 过去时间是现在完成时标志。', keyPoint: '现在完成时：have/has + done。', why: 'since last week 表示从过去持续到现在，用 have called。', wrong: [['A', 'called 是一般过去，不与 since 连用。'], ['B', 'call 一般现在。'], ['D', 'had called 是过去完成，需要过去参照点。']] },
  { id: 'demo.g.04', section: 'Grammar', questionType: 'grammar.verb.tense', text: 'She ____ in this school since 2018.', options: ['teaches', 'taught', 'is teaching', 'has taught'], answer: 'D', difficulty: 'normal', tags: ['grammar.verb.tense.present_perfect'], conclusion: 'since 2018 与现在完成时连用。', keyPoint: 'for + 时间段 / since + 时间点 → 现在完成时。', why: '从 2018 年持续到现在，用 has taught。', wrong: [['A', '一般现在不表持续到现在。'], ['B', '一般过去与现在无关。'], ['C', '现在进行不与 since 连用。']] },
  { id: 'demo.g.05', section: 'Grammar', questionType: 'grammar.verb.passive', text: 'The old library ____ next year.', options: ['will rebuild', 'will be rebuilt', 'rebuilt', 'was rebuilt'], answer: 'B', difficulty: 'normal', tags: ['grammar.verb.passive'], conclusion: '图书馆“被重建”，且 next year 表将来 → 一般将来时被动 will be done。', keyPoint: '将来时被动：will be + 过去分词。', why: 'library 是 rebuild 的承受者，时间是 next year，所以 will be rebuilt。', wrong: [['A', 'will rebuild 是主动，图书馆不能自己建。'], ['C', 'rebuilt 是过去式主动。'], ['D', 'was rebuilt 是过去时被动，时间不对。']] },
  { id: 'demo.g.06', section: 'Grammar', questionType: 'grammar.verb.passive', text: 'The letter ____ in French. I can’t read it.', options: ['writes', 'wrote', 'is written', 'writing'], answer: 'C', difficulty: 'easy', tags: ['grammar.verb.passive'], conclusion: '信是“被写”的，用一般现在时被动 is done。', keyPoint: '一般现在时被动：am/is/are + done。', why: 'letter 与 write 是被动关系，描述现状用 is written。', wrong: [['A', 'writes 主动且三单形式不符。'], ['B', 'wrote 过去主动。'], ['D', 'writing 不能单独作谓语。']] },
  { id: 'demo.g.07', section: 'Grammar', questionType: 'grammar.non_finite', text: 'Would you mind ____ the window?', options: ['open', 'to open', 'opening', 'opened'], answer: 'C', difficulty: 'easy', tags: ['grammar.non_finite.gerund', 'vocabulary.collocation.verb_gerund'], conclusion: 'mind 后接 doing。', keyPoint: '只接 doing：mind, enjoy, finish, avoid, suggest, practice。', why: 'mind doing sth 是固定搭配，故用 opening。', wrong: [['A', 'open 动词原形不能放 mind 后。'], ['B', 'to open 不与 mind 搭配。'], ['D', 'opened 是过去式。']], collocations: ['mind doing sth', 'enjoy/finish/avoid doing sth'] },
  { id: 'demo.g.08', section: 'Grammar', questionType: 'grammar.non_finite', text: 'My mother told me ____ too much time on games.', options: ['not to spend', 'to not spend', 'don’t spend', 'not spend'], answer: 'A', difficulty: 'normal', tags: ['grammar.non_finite.infinitive', 'vocabulary.collocation.verb_sb_to_do'], conclusion: 'tell sb not to do sth，not 放在 to 前面。', keyPoint: 'tell/ask/want sb (not) to do sth。', why: 'tell 后接带 to 的不定式作宾补，否定词 not 置于 to do 之前。', wrong: [['B', 'not 不能放在 to 后面。'], ['C', "don't spend 是谓语否定，不能作宾补。"], ['D', 'not spend 缺 to。']] },
  { id: 'demo.g.09', section: 'Grammar', questionType: 'grammar.non_finite', text: '____ from the hill, the city looks beautiful.', options: ['See', 'Seeing', 'Seen', 'To see'], answer: 'C', difficulty: 'hard', tags: ['grammar.non_finite.participle'], conclusion: '城市是“被看”的，逻辑上是被动关系，用过去分词 Seen。', keyPoint: '现在分词 doing 表主动，过去分词 done 表被动。', why: '句子主语 the city 与 see 是被动关系（城市被看），所以用 Seen。', wrong: [['A', 'See 是谓语动词，一句不能有两个谓语。'], ['B', 'Seeing 表主动，城市不能主动看。'], ['D', 'To see 表目的，语义不通。']] },
  { id: 'demo.g.10', section: 'Grammar', questionType: 'grammar.non_finite', text: 'I heard her ____ an English song at eight yesterday evening.', options: ['sing', 'to sing', 'singing', 'sung'], answer: 'C', difficulty: 'hard', tags: ['grammar.non_finite.participle'], conclusion: 'at eight yesterday 强调“当时正在唱”，hear sb doing sth。', keyPoint: 'hear/see sb doing sth（正在做）；hear/see sb do sth（全过程）。', why: '具体时刻八点她正在唱，用 singing。', wrong: [['A', 'sing 表听见全过程。'], ['B', 'hear 后宾补不用 to do（主动句）。'], ['D', 'sung 是过去分词，被动含义。']] },
  { id: 'demo.g.11', section: 'Grammar', questionType: 'grammar.modal', text: 'The light is on. He ____ be at home.', options: ['must', 'can', 'need', 'would'], answer: 'A', difficulty: 'easy', tags: ['grammar.modal'], conclusion: '肯定推测“一定”用 must。', keyPoint: 'must be 一定（肯定推测）；can’t be 不可能（否定推测）。', why: '灯亮着是有把握的肯定推测，用 must be。', wrong: [['B', 'can 表推测多用于否定/疑问句。'], ['C', 'need be 不表推测。'], ['D', 'would be 不表有把握推测。']] },
  { id: 'demo.g.12', section: 'Grammar', questionType: 'grammar.modal', text: 'You ____ smoke here. Look at the sign “No smoking”.', options: ['needn’t', 'mustn’t', 'wouldn’t', 'may not'], answer: 'B', difficulty: 'easy', tags: ['grammar.modal'], conclusion: '“禁止”吸烟用 mustn’t。', keyPoint: "mustn't 禁止；needn't 不必。", why: 'No smoking 标志表示严禁，用 mustn’t。', wrong: [['A', "needn't 是不必，不是禁止。"], ['C', "wouldn't 不愿意。"], ['D', 'may not 语气弱，不如 mustn’t 准确。']] },
  { id: 'demo.g.13', section: 'Grammar', questionType: 'grammar.clause.relative', text: 'The book ____ I bought yesterday is very useful.', options: ['who', 'whose', 'which', 'what'], answer: 'C', difficulty: 'easy', tags: ['grammar.clause.relative'], conclusion: '先行词是物 book，关系词在从句中作宾语，用 which/that。', keyPoint: '物用 which/that；人用 who/whom；所属用 whose。', why: 'bought 的宾语是 the book，指物，用 which。', wrong: [['A', 'who 只能指人。'], ['B', 'whose 表所属“谁的”。'], ['D', 'what 不能引导定语从句。']] },
  { id: 'demo.g.14', section: 'Grammar', questionType: 'grammar.clause.relative', text: 'I still remember the day ____ we first met.', options: ['which', 'that', 'when', 'where'], answer: 'C', difficulty: 'normal', tags: ['grammar.clause.relative'], conclusion: '先行词 the day 表时间，从句不缺主宾语，用关系副词 when。', keyPoint: 'when 表时间，where 表地点，why 表原因。', why: '从句 we met 完整，缺的是时间状语“在那天”，用 when。', wrong: [['A', 'which 在从句中要充当主/宾语，本句不缺。'], ['B', 'that 同样要充当主/宾语。'], ['D', 'where 表地点。']] },
  { id: 'demo.g.15', section: 'Grammar', questionType: 'grammar.clause.adverbial', text: 'I won’t go to the party ____ I am invited.', options: ['if', 'unless', 'because', 'though'], answer: 'B', difficulty: 'normal', tags: ['grammar.clause.adverbial'], conclusion: '“除非被邀请”用 unless = if...not。', keyPoint: 'unless（除非）引导条件状语从句，主将从现。', why: '句意为“除非受邀，否则不去”，选 unless。', wrong: [['A', 'if 在此语义相反（如果邀请就不去？）。'], ['C', 'because 因果不通。'], ['D', 'though 让步不通。']] },
  { id: 'demo.g.16', section: 'Grammar', questionType: 'grammar.clause.adverbial', text: 'He didn’t go to school yesterday ____ he was ill.', options: ['because', 'because of', 'although', 'unless'], answer: 'A', difficulty: 'easy', tags: ['grammar.clause.adverbial'], confusing: ['because + 句子', 'because of + 名词/doing'], conclusion: '后面是完整句子 he was ill，用连词 because。', keyPoint: 'because + 句子；because of + 名词/doing。', why: 'he was ill 是完整从句，需要连词 because。', wrong: [['B', 'because of 后只能接名词或 doing。'], ['C', 'although 虽然，逻辑不符。'], ['D', 'unless 除非，逻辑不符。']] },
  { id: 'demo.g.17', section: 'Grammar', questionType: 'grammar.clause.noun', text: 'Could you tell me ____?', options: ['where is the station', 'where the station is', 'where was the station', 'the station is where'], answer: 'B', difficulty: 'normal', tags: ['grammar.clause.noun'], conclusion: '宾语从句必须用陈述语序：引导词 + 主语 + 谓语。', keyPoint: '名词性从句一律陈述语序。', why: 'the station 作主语，is 在后，即 where the station is。', wrong: [['A', '疑问语序 is 提前，错误。'], ['C', '既疑问语序又过去时。'], ['D', '引导词位置错误。']] },
  { id: 'demo.g.18', section: 'Grammar', questionType: 'grammar.clause.noun', text: '____ he will come is still unknown.', options: ['If', 'That', 'Whether', 'What'], answer: 'C', difficulty: 'hard', tags: ['grammar.clause.noun'], conclusion: '主语从句表“是否”，且放在句首只能用 whether。', keyPoint: '主语从句、介词后、与 or not 连用只用 whether。', why: '句意为“他是否会来还不知道”，主语从句用 whether。', wrong: [['A', 'if 不能引导句首的主语从句。'], ['B', 'that 无词义，句子缺少“是否”含义。'], ['D', 'what 要在从句中充当成分，本句不缺。']] },
  { id: 'demo.g.19', section: 'Grammar', questionType: 'grammar.agreement', text: 'Neither my parents nor I ____ interested in the film.', options: ['is', 'am', 'are', 'be'], answer: 'B', difficulty: 'normal', tags: ['grammar.agreement'], conclusion: 'neither...nor 就近原则，谓语与最近的 I 一致，用 am。', keyPoint: '就近原则：either...or / neither...nor / not only...but also。', why: '离谓语最近的主语是 I，所以用 am。', wrong: [['A', 'is 与 I 不一致。'], ['C', 'are 是就远误判。'], ['D', 'be 原形不能这样使用。']] },
  { id: 'demo.g.20', section: 'Grammar', questionType: 'grammar.agreement', text: 'The teacher, together with her students, ____ planting trees.', options: ['is', 'are', 'were', 'have been'], answer: 'A', difficulty: 'normal', tags: ['grammar.agreement'], conclusion: 'together with 是附带成分，谓语与真正的主语 the teacher 一致，用 is。', keyPoint: '就远原则：with / together with / as well as / except。', why: '主语只是 the teacher（单数），所以 is planting。', wrong: [['B', '把 students 当主语了。'], ['C', 'were 同样错误地按复数。'], ['D', 'have been 复数完成时。']] },
  { id: 'demo.g.21', section: 'Grammar', questionType: 'grammar.adj_adv', text: 'Of the two girls, Lucy is ____.', options: ['tall', 'taller', 'the taller', 'tallest'], answer: 'C', difficulty: 'hard', tags: ['grammar.adj_adv'], conclusion: '两者中“较……的那一个”用 the + 比较级。', keyPoint: 'the + 比较级 + of the two 表示两者中更……的。', why: '限定在两人范围内较高的那位，用 the taller。', wrong: [['A', '原级不表比较。'], ['B', 'taller 缺 the（特指两者之一）。'], ['D', '最高级用于三者以上。']] },
  { id: 'demo.g.22', section: 'Grammar', questionType: 'grammar.article', text: 'He is ____ honest boy. Everyone trusts him.', options: ['a', 'an', 'the', '/'], answer: 'B', difficulty: 'easy', tags: ['grammar.article'], conclusion: 'honest 的 h 不发音，开头是元音 /ɒ/，用 an。', keyPoint: '用 a 还是 an 看音不看字母。', why: 'an honest boy，honest 以元音音素开头。', wrong: [['A', 'a 用于辅音音素开头。'], ['C', 'the 表特指，此处泛指“一个”。'], ['D', 'boy 可数单数不能零冠词。']] },
  { id: 'demo.g.23', section: 'Grammar', questionType: 'grammar.pronoun', text: 'The weather in Beijing is colder than ____ in Shanghai.', options: ['it', 'that', 'this', 'one'], answer: 'B', difficulty: 'hard', tags: ['grammar.pronoun'], conclusion: '比较级中用 that 指代前面出现的不可数名词 the weather。', keyPoint: 'that 可指代同名异物的不可数/单数名词。', why: '比较的是北京天气和上海天气（同名异物），用 that。', wrong: [['A', 'it 指同一个事物，天气不是同一个。'], ['C', 'this 不用于此类比较。'], ['D', 'one 代可数单数。']] },
  { id: 'demo.g.24', section: 'Grammar', questionType: 'grammar.preposition', text: 'My brother is good ____ math, but I do well ____ Chinese.', options: ['at; in', 'in; at', 'at; at', 'in; in'], answer: 'A', difficulty: 'normal', tags: ['grammar.preposition', 'vocabulary.collocation.adj_preposition'], conclusion: 'be good at（擅长）；do well in（在……方面做得好），介词不同。', keyPoint: '形容词/动词与介词的固定搭配。', why: 'good 搭配 at，do well 搭配 in。', wrong: [['B', '两个介词颠倒。'], ['C', 'do well at 不是固定搭配。'], ['D', 'good in 错误。']], collocations: ['be good at', 'do well in'] },
  { id: 'demo.g.25', section: 'Grammar', questionType: 'grammar.conjunction', text: 'Hurry up, ____ we’ll miss the early bus.', options: ['and', 'but', 'or', 'so'], answer: 'C', difficulty: 'easy', tags: ['grammar.conjunction'], conclusion: '祈使句 + or + 句子，表示“否则”。', keyPoint: 'or = otherwise 否则；and 表顺承。', why: '“快点，否则赶不上早班车”，选 or。', wrong: [['A', 'and 表并列顺承，语义相反。'], ['B', 'but 但是，不符。'], ['D', 'so 所以，不符。']] },
  { id: 'demo.g.26', section: 'Grammar', questionType: 'grammar.noun', text: 'There ____ a lot of ____ on the desk.', options: ['is; paper', 'are; paper', 'is; papers', 'are; papers'], answer: 'A', difficulty: 'hard', tags: ['grammar.noun', 'grammar.agreement'], conclusion: 'paper 作“纸”讲不可数，谓语用单数 is。', keyPoint: 'paper 纸（不可数）；papers 文件/试卷（可数复数）。', why: 'a lot of paper 指很多纸，不可数，故 is; paper。', wrong: [['B', 'paper 不可数不能配 are。'], ['C', 'papers 此处意为文件，语义不符。'], ['D', '复数+are 语义不符。']] },
  { id: 'demo.g.27', section: 'Grammar', questionType: 'grammar.subjunctive', text: 'If I ____ you, I ____ his advice.', options: ['am; will take', 'was; would take', 'were; would take', 'be; take'], answer: 'C', difficulty: 'normal', tags: ['grammar.subjunctive'], conclusion: '与现在事实相反：if 从句用过去式（be 一律用 were），主句 would do。', keyPoint: 'If I were you, I would do...（固定建议句型）。', why: '虚拟假设中 be 动词用 were，主句用 would + 动词原形。', wrong: [['A', 'am/will take 是真实条件句。'], ['B', '虚拟语气中不用 was。'], ['D', '形式都不对。']] },
  { id: 'demo.g.28', section: 'Grammar', questionType: 'grammar.emphasis', text: 'It was in the park ____ I met an old friend.', options: ['where', 'that', 'when', 'which'], answer: 'B', difficulty: 'normal', tags: ['grammar.emphasis'], conclusion: '强调地点状语仍用 that，不能用 where。', keyPoint: 'It is/was + 被强调部分 + that/who...', why: '去掉 It was...that 后句子完整（I met an old friend in the park），是强调句。', wrong: [['A', '强调句中不用 where（即便强调地点）。'], ['C', '强调句中不用 when。'], ['D', 'which 不用于强调句。']] },
  { id: 'demo.g.29', section: 'Grammar', questionType: 'grammar.tag_question', text: 'He hardly watches TV, ____?', options: ['doesn’t he', 'does he', 'isn’t he', 'is he'], answer: 'B', difficulty: 'hard', tags: ['grammar.tag_question'], conclusion: 'hardly 表否定，前否后肯；前句实义动词借 does，故 does he。', keyPoint: 'never/hardly/little/few/no 视为否定。', why: 'hardly 使前句为否定意义，反意部分用肯定 does he。', wrong: [['A', 'doesn’t he 是前肯后否。'], ['C', '不能用 be 动词 is。'], ['D', 'is he 动词类型错误。']] },
  { id: 'demo.g.30', section: 'Grammar', questionType: 'grammar.exclamation', text: '____ useful advice you gave me!', options: ['What', 'What a', 'How', 'How a'], answer: 'A', difficulty: 'hard', tags: ['grammar.exclamation'], conclusion: '中心词是不可数名词 advice，用 What 且不加 a。', keyPoint: 'What + adj. + 不可数名词 + 主谓！', why: 'advice 不可数，只能 What useful advice。', wrong: [['B', 'advice 不可数，不能加 a。'], ['C', 'How 后直接接形容词/副词，不能接名词短语。'], ['D', 'How a 结构不存在。']] },

  // ================= 词汇（12） =================
  { id: 'demo.v.01', section: 'Vocabulary', questionType: 'vocabulary.confusables', text: 'I ____ a present yesterday, but I didn’t ____ it.', options: ['accepted; receive', 'received; accept', 'received; receive', 'accepted; accept'], answer: 'B', difficulty: 'normal', tags: ['vocabulary.confusables'], confusing: ['receive 客观收到', 'accept 主观接受'], conclusion: '第一空“客观收到”用 received，第二空“主观接受”用 accept。', keyPoint: 'receive 收到（被动）；accept 接受（主动）。', why: '收到礼物是 receive，愿意接受才是 accept；didn’t 后用原形。', wrong: [['A', '顺序颠倒。'], ['C', '第二空语义应为“接受”。'], ['D', '第一空语义应为“收到”。']] },
  { id: 'demo.v.02', section: 'Vocabulary', questionType: 'vocabulary.confusables', text: 'Could you ____ me your dictionary? I’ll return it tomorrow.', options: ['borrow', 'lend', 'bring', 'take'], answer: 'B', difficulty: 'easy', tags: ['vocabulary.confusables'], confusing: ['borrow 借入', 'lend 借出'], conclusion: '对方把字典“借出”给我，用 lend。', keyPoint: 'borrow sth from sb 借入；lend sb sth / lend sth to sb 借出。', why: '请求对方借出来用 lend me your dictionary。', wrong: [['A', 'borrow 是自己向别人借，方向相反。'], ['C', 'bring 带来，不表借。'], ['D', 'take 拿走，不表借。']] },
  { id: 'demo.v.03', section: 'Vocabulary', questionType: 'vocabulary.confusables', text: 'Please ____ your hand if you want to ask a question.', options: ['rise', 'rose', 'raise', 'arise'], answer: 'C', difficulty: 'normal', tags: ['vocabulary.confusables'], confusing: ['rise 不及物（自己上升）', 'raise 及物（举起某物）'], conclusion: 'hand 是被举起的宾语，用及物动词 raise。', keyPoint: 'raise one’s hand 举手（及物）；rise 不及物。', why: 'raise your hand 是固定表达，祈使句用原形。', wrong: [['A', 'rise 不及物不能接宾语。'], ['B', 'rose 是 rise 的过去式，且不及物。'], ['D', 'arise 出现，语义不符。']] },
  { id: 'demo.v.04', section: 'Vocabulary', questionType: 'vocabulary.confusables', text: 'Can you ____ the difference between the two pictures?', options: ['say', 'speak', 'tell', 'talk'], answer: 'C', difficulty: 'normal', tags: ['vocabulary.confusables'], confusing: ['tell 分辨', 'say 说内容', 'speak 讲语言', 'talk 谈话'], conclusion: '“分辨出不同”用 tell（tell A from B）。', keyPoint: 'tell 有“分辨、判断”义。', why: 'tell the difference 是固定搭配。', wrong: [['A', 'say 强调说的内容。'], ['B', 'speak 后接语言或讲话。'], ['D', 'talk 交谈，不表分辨。']] },
  { id: 'demo.v.05', section: 'Vocabulary', questionType: 'vocabulary.confusables', text: 'Don’t worry. There is still ____ time left.', options: ['few', 'a few', 'little', 'a little'], answer: 'D', difficulty: 'normal', tags: ['vocabulary.confusables'], confusing: ['a little 一点（肯定）', 'little 几乎没有（否定）'], conclusion: 'time 不可数，且句意“还有一点”表肯定，用 a little。', keyPoint: 'little/a little 修饰不可数；few/a few 修饰可数。', why: 'Don’t worry 暗示时间还有一些，肯定含义用 a little。', wrong: [['A', 'few 修饰可数且含否定。'], ['B', 'a few 只修饰可数。'], ['C', 'little 含否定，与“别担心”矛盾。']] },
  { id: 'demo.v.06', section: 'Vocabulary', questionType: 'grammar.preposition', text: 'The sports meeting was put off ____ the heavy rain.', options: ['because', 'because of', 'although', 'since'], answer: 'B', difficulty: 'easy', tags: ['vocabulary.collocation.fixed_phrase', 'grammar.preposition'], confusing: ['because of + 名词', 'because + 句子'], conclusion: 'the heavy rain 是名词短语，用 because of。', keyPoint: 'because of + 名词/doing。', why: '空格后不是句子，是名词短语，选介词性的 because of。', wrong: [['A', 'because 后接完整句子。'], ['C', 'although 接句子且表让步。'], ['D', 'since 接句子表原因。']] },
  { id: 'demo.v.07', section: 'Vocabulary', questionType: 'vocabulary.confusables', text: '____ the bad weather, they kept working.', options: ['Although', 'Despite', 'Because', 'As'], answer: 'B', difficulty: 'normal', tags: ['vocabulary.confusables'], confusing: ['despite + 名词/doing', 'although + 句子'], conclusion: 'the bad weather 是名词短语，介词 despite 后接名词。', keyPoint: 'despite = in spite of + 名词；although + 从句。', why: '“尽管天气差”，后接名词短语用 Despite。', wrong: [['A', 'Although 后需要完整句子。'], ['C', 'Because 语义不通且需接句子。'], ['D', 'As 表原因时接句子。']] },
  { id: 'demo.v.08', section: 'Vocabulary', questionType: 'vocabulary.confusables', text: '____ I was reading, my mother was cooking.', options: ['During', 'While', 'Since', 'For'], answer: 'B', difficulty: 'normal', tags: ['vocabulary.confusables'], confusing: ['while + 句子（常进行时）', 'during + 名词'], conclusion: '后接完整从句且两个延续动作同时进行，用 While。', keyPoint: 'while 作连词 + 句子；during 作介词 + 名词。', why: 'I was reading 是句子，必须用连词 While。', wrong: [['A', 'During 是介词，不能接从句。'], ['C', 'Since 既然/自从，语义不符。'], ['D', 'For 表原因时语义牵强。']] },
  { id: 'demo.v.09', section: 'Vocabulary', questionType: 'vocabulary.confusables', text: 'This new coat ____ me 300 yuan.', options: ['spent', 'paid', 'cost', 'took'], answer: 'C', difficulty: 'normal', tags: ['vocabulary.confusables'], confusing: ['cost 物作主语', 'spend/pay 人作主语', 'take 常用于 it takes sb time'], conclusion: '物（coat）作主语表“花费金钱”用 cost。', keyPoint: 'sth costs sb money。', why: '主语是 coat，花费 300 元，用 cost。', wrong: [['A', 'spend 人作主语：sb spend...on。'], ['B', 'pay 人作主语：sb pay for。'], ['D', 'take 多用于 it takes sb + 时间。']] },
  { id: 'demo.v.10', section: 'Vocabulary', questionType: 'grammar.non_finite', text: 'Please remember ____ the door when you leave.', options: ['locking', 'to lock', 'lock', 'locked'], answer: 'B', difficulty: 'normal', tags: ['grammar.non_finite.infinitive'], confusing: ['remember to do 记得要做（未做）', 'remember doing 记得做过（已做）'], conclusion: '离开时锁门是“记得要去做”，用 to lock。', keyPoint: 'remember/forget + to do（未做）；+ doing（已做）。', why: 'when you leave 表明门还没锁，用不定式。', wrong: [['A', 'locking 表示记得锁过门了。'], ['C', 'lock 不能直接作 remember 宾语。'], ['D', 'locked 是过去式/过去分词。']] },
  { id: 'demo.v.11', section: 'Vocabulary', questionType: 'vocabulary.collocation.verb_preposition', text: 'I’m looking forward to ____ you soon.', options: ['see', 'seeing', 'saw', 'seen'], answer: 'B', difficulty: 'normal', tags: ['vocabulary.collocation.verb_preposition', 'vocabulary.collocation.verb_gerund'], conclusion: 'look forward to 中的 to 是介词，后接 doing。', keyPoint: 'look forward to doing sth。', why: 'to 是介词不是不定式符号，故 seeing。', wrong: [['A', 'see 是动词原形。'], ['C', 'saw 过去式。'], ['D', 'seen 过去分词。']], collocations: ['look forward to doing sth'] },
  { id: 'demo.v.12', section: 'Vocabulary', questionType: 'vocabulary.collocation.verb_sb_to_do', text: 'The doctor advised me ____ more exercise.', options: ['take', 'taking', 'to take', 'took'], answer: 'C', difficulty: 'easy', tags: ['vocabulary.collocation.verb_sb_to_do'], conclusion: 'advise sb to do sth 是固定搭配。', keyPoint: 'advise/allow/want/expect sb to do sth。', why: 'me 后用不定式 to take。', wrong: [['A', 'take 缺 to。'], ['B', 'advise doing（无 sb 时才用）。'], ['D', 'took 过去式不能作宾补。']], collocations: ['advise sb to do sth', 'advise doing sth'] },

  // ================= 完形填空（12，分两篇） =================
  {
    id: 'demo.cz.01', section: 'Cloze', questionType: 'C02', clozeTag: 'C02', groupId: 'cg1', groupTitle: '完形一：记单词的方法',
    passage: 'Tom is a college student. He has learned English for several years, but he always has __1__ remembering new words. One day, his teacher __2__ him that he should learn words in sentences. Tom decided __3__ a try. He wrote new words on small cards and read them aloud every morning. __4__, he found he could remember more words than before. He was so happy __5__ he wanted to share his way with his classmates. They all said his way was really __6__.',
    text: '第 1 空：he always has ____ remembering new words.', options: ['time', 'trouble', 'courage', 'interest'], answer: 'B', difficulty: 'normal', tags: ['vocabulary.collocation.fixed_phrase'],
    conclusion: 'have trouble (in) doing sth 做某事有困难。', keyPoint: '固定搭配题（C02）。', why: '前后是转折“学了好几年，但记单词有困难”，have trouble doing 固定搭配。', wrong: [['A', 'have time doing 不搭配，语义也相反。'], ['C', 'courage 不用于此结构。'], ['D', 'interest 搭配为 have interest in，不接 doing。']], collocations: ['have trouble/difficulty (in) doing sth'],
  },
  {
    id: 'demo.cz.02', section: 'Cloze', questionType: 'C01', clozeTag: 'C01', groupId: 'cg1', groupTitle: '完形一：记单词的方法',
    passage: 'Tom is a college student. He has learned English for several years, but he always has __1__ remembering new words. One day, his teacher __2__ him that he should learn words in sentences. Tom decided __3__ a try. He wrote new words on small cards and read them aloud every morning. __4__, he found he could remember more words than before. He was so happy __5__ he wanted to share his way with his classmates. They all said his way was really __6__.',
    text: '第 2 空：his teacher ____ him that he should learn words in sentences.', options: ['said', 'told', 'spoke', 'talked'], answer: 'B', difficulty: 'normal', tags: ['vocabulary.confusables'],
    conclusion: 'tell sb that... 告诉某人某事，接人作宾语用 told。', keyPoint: '词义辨析（C01）：say/speak/talk 都不能这样接 sb + that。', why: '空格后有人称宾语 him，tell sb (that) 结构成立。', wrong: [['A', 'say to sb that，少 to 且结构不符。'], ['C', 'speak 不接双宾语。'], ['D', 'talk to/with sb，不接 that 从句。']], confusing: ['say 强调内容', 'tell 告诉某人'],
  },
  {
    id: 'demo.cz.03', section: 'Cloze', questionType: 'C05', clozeTag: 'C05', groupId: 'cg1', groupTitle: '完形一：记单词的方法',
    passage: 'Tom is a college student. He has learned English for several years, but he always has __1__ remembering new words. One day, his teacher __2__ him that he should learn words in sentences. Tom decided __3__ a try. He wrote new words on small cards and read them aloud every morning. __4__, he found he could remember more words than before. He was so happy __5__ he wanted to share his way with his classmates. They all said his way was really __6__.',
    text: '第 3 空：Tom decided ____ a try.', options: ['have', 'having', 'to have', 'had'], answer: 'C', difficulty: 'easy', tags: ['grammar.non_finite.infinitive'],
    conclusion: 'decide to do sth，用 to have。', keyPoint: '非谓语（C05）。', why: 'decide 只接不定式。', wrong: [['A', 'have 原形不能作宾语。'], ['B', 'having 不与 decide 搭配。'], ['D', 'had 过去式错误。']], collocations: ['decide to do sth', 'have a try'],
  },
  {
    id: 'demo.cz.04', section: 'Cloze', questionType: 'C09', clozeTag: 'C09', groupId: 'cg1', groupTitle: '完形一：记单词的方法',
    passage: 'Tom is a college student. He has learned English for several years, but he always has __1__ remembering new words. One day, his teacher __2__ him that he should learn words in sentences. Tom decided __3__ a try. He wrote new words on small cards and read them aloud every morning. __4__, he found he could remember more words than before. He was so happy __5__ he wanted to share his way with his classmates. They all said his way was really __6__.',
    text: '第 4 空：____, he found he could remember more words than before.', options: ['However', 'Later', 'Instead', 'Although'], answer: 'B', difficulty: 'hard', tags: ['cloze.C09'],
    conclusion: '按时间发展，“后来”他发现方法有效，用 Later。', keyPoint: '上下文逻辑（C09）。', why: '先每天做卡片朗读，之后才有效果，时间顺承用 Later。', wrong: [['A', 'However 表转折，但前后不是转折。'], ['C', 'Instead 代替，语义不符。'], ['D', 'Although 是连词不能这样单独修饰整句。']],
  },
  {
    id: 'demo.cz.05', section: 'Cloze', questionType: 'C02', clozeTag: 'C02', groupId: 'cg1', groupTitle: '完形一：记单词的方法',
    passage: 'Tom is a college student. He has learned English for several years, but he always has __1__ remembering new words. One day, his teacher __2__ him that he should learn words in sentences. Tom decided __3__ a try. He wrote new words on small cards and read them aloud every morning. __4__, he found he could remember more words than before. He was so happy __5__ he wanted to share his way with his classmates. They all said his way was really __6__.',
    text: '第 5 空：He was so happy ____ he wanted to share his way...', options: ['that', 'as', 'when', 'if'], answer: 'A', difficulty: 'normal', tags: ['vocabulary.collocation.sentence_pattern'],
    conclusion: 'so...that... 如此……以至于……，固定句型。', keyPoint: '固定句型（C02/EP08）。', why: 'so happy 后接 that 引导结果状语从句。', wrong: [['B', 'so...as 不表结果。'], ['C', 'when 当……时，语义不通。'], ['D', 'if 如果，逻辑不通。']], collocations: ['so + adj./adv. + that 从句'],
  },
  {
    id: 'demo.cz.06', section: 'Cloze', questionType: 'C01', clozeTag: 'C01', groupId: 'cg1', groupTitle: '完形一：记单词的方法',
    passage: 'Tom is a college student. He has learned English for several years, but he always has __1__ remembering new words. One day, his teacher __2__ him that he should learn words in sentences. Tom decided __3__ a try. He wrote new words on small cards and read them aloud every morning. __4__, he found he could remember more words than before. He was so happy __5__ he wanted to share his way with his classmates. They all said his way was really __6__.',
    text: '第 6 空：They all said his way was really ____.', options: ['boring', 'helpful', 'terrible', 'strange'], answer: 'B', difficulty: 'easy', tags: ['cloze.C01'],
    conclusion: '方法有效，应是“有帮助的”，选 helpful。', keyPoint: '词义辨析+情感色彩（C01）。', why: '汤姆记住了更多词、很开心，同学评价应是正面的 helpful。', wrong: [['A', 'boring 无聊，感情色彩相反。'], ['C', 'terrible 糟糕，相反。'], ['D', 'strange 奇怪，与语境不符。']],
  },
  {
    id: 'demo.cz.07', section: 'Cloze', questionType: 'C08', clozeTag: 'C08', groupId: 'cg2', groupTitle: '完形二：冰面上的善意',
    passage: 'It was a cold winter morning. An old man fell down on the icy road. Many people walked past, but __1__ stopped. Just then, a young girl __2__ to help him stand up. She called a taxi and took him to the __3__. The doctor said the old man was not __4__ hurt. The old man wanted to give her some money, __5__ she refused with a smile. “It is my __6__ to help people in need,” she said.',
    text: '第 1 空：Many people walked past, but ____ stopped.', options: ['someone', 'everyone', 'nobody', 'anyone'], answer: 'C', difficulty: 'easy', tags: ['cloze.C08'],
    conclusion: 'but 转折：很多人路过却“没人”停下，用 nobody。', keyPoint: '不定代词（C08）。', why: '前后形成反差，nobody stopped 才需要女孩出手。', wrong: [['A', 'someone 有人，与 but 矛盾。'], ['B', 'everyone 每人，矛盾。'], ['D', 'anyone 任何人，语义不通。']],
  },
  {
    id: 'demo.cz.08', section: 'Cloze', questionType: 'C01', clozeTag: 'C01', groupId: 'cg2', groupTitle: '完形二：冰面上的善意',
    passage: 'It was a cold winter morning. An old man fell down on the icy road. Many people walked past, but __1__ stopped. Just then, a young girl __2__ to help him stand up. She called a taxi and took him to the __3__. The doctor said the old man was not __4__ hurt. The old man wanted to give her some money, __5__ she refused with a smile. “It is my __6__ to help people in need,” she said.',
    text: '第 2 空：a young girl ____ to help him stand up.', options: ['forgot', 'rushed', 'refused', 'happened'], answer: 'B', difficulty: 'normal', tags: ['cloze.C01'],
    conclusion: '女孩“冲上前”帮忙，rushed 体现紧急和善意。', keyPoint: '动词词义辨析（C01）。', why: '老人倒地，女孩立刻上前，rush to do 赶忙做某事。', wrong: [['A', 'forgot 忘记，与后文矛盾。'], ['C', 'refused 拒绝，矛盾。'], ['D', 'happened to do 碰巧做，不能体现主动性。']],
  },
  {
    id: 'demo.cz.09', section: 'Cloze', questionType: 'C09', clozeTag: 'C09', groupId: 'cg2', groupTitle: '完形二：冰面上的善意',
    passage: 'It was a cold winter morning. An old man fell down on the icy road. Many people walked past, but __1__ stopped. Just then, a young girl __2__ to help him stand up. She called a taxi and took him to the __3__. The doctor said the old man was not __4__ hurt. The old man wanted to give her some money, __5__ she refused with a smile. “It is my __6__ to help people in need,” she said.',
    text: '第 3 空：took him to the ____.', options: ['school', 'hospital', 'library', 'station'], answer: 'B', difficulty: 'easy', tags: ['cloze.C09'],
    conclusion: '老人摔倒受伤，应送去医院，下文 doctor 也印证。', keyPoint: '上下文线索（C09）。', why: '下一句出现 doctor，地点只能是 hospital。', wrong: [['A', 'school 学校，与受伤无关。'], ['C', 'library 图书馆。'], ['D', 'station 车站。']],
  },
  {
    id: 'demo.cz.10', section: 'Cloze', questionType: 'C01', clozeTag: 'C01', groupId: 'cg2', groupTitle: '完形二：冰面上的善意',
    passage: 'It was a cold winter morning. An old man fell down on the icy road. Many people walked past, but __1__ stopped. Just then, a young girl __2__ to help him stand up. She called a taxi and took him to the __3__. The doctor said the old man was not __4__ hurt. The old man wanted to give her some money, __5__ she refused with a smile. “It is my __6__ to help people in need,” she said.',
    text: '第 4 空：the old man was not ____ hurt.', options: ['hardly', 'seriously', 'nearly', 'luckily'], answer: 'B', difficulty: 'normal', tags: ['cloze.C01'],
    conclusion: '医生说伤得不重，seriously hurt 重伤。', keyPoint: '副词词义（C01）。', why: 'not seriously hurt 表示并无大碍，符合语境。', wrong: [['A', 'hardly 已含否定，不与 not 连用。'], ['C', 'nearly 几乎，语义不通。'], ['D', 'luckily 不能修饰 hurt。']],
  },
  {
    id: 'demo.cz.11', section: 'Cloze', questionType: 'C07', clozeTag: 'C07', groupId: 'cg2', groupTitle: '完形二：冰面上的善意',
    passage: 'It was a cold winter morning. An old man fell down on the icy road. Many people walked past, but __1__ stopped. Just then, a young girl __2__ to help him stand up. She called a taxi and took him to the __3__. The doctor said the old man was not __4__ hurt. The old man wanted to give her some money, __5__ she refused with a smile. “It is my __6__ to help people in need,” she said.',
    text: '第 5 空：wanted to give her some money, ____ she refused...', options: ['so', 'and', 'but', 'or'], answer: 'C', difficulty: 'easy', tags: ['cloze.C07'],
    conclusion: '给钱与拒绝是转折，用 but。', keyPoint: '连词逻辑（C07）。', why: '前后语义相反，用 but。', wrong: [['A', 'so 因果，不通。'], ['B', 'and 并列，不通。'], ['D', 'or 否则/选择，不通。']],
  },
  {
    id: 'demo.cz.12', section: 'Cloze', questionType: 'C02', clozeTag: 'C02', groupId: 'cg2', groupTitle: '完形二：冰面上的善意',
    passage: 'It was a cold winter morning. An old man fell down on the icy road. Many people walked past, but __1__ stopped. Just then, a young girl __2__ to help him stand up. She called a taxi and took him to the __3__. The doctor said the old man was not __4__ hurt. The old man wanted to give her some money, __5__ she refused with a smile. “It is my __6__ to help people in need,” she said.',
    text: '第 6 空：It is my ____ to help people in need.', options: ['pleasure', 'turn', 'habit', 'dream'], answer: 'A', difficulty: 'hard', tags: ['vocabulary.collocation.fixed_phrase'],
    conclusion: 'It is my pleasure to do sth 很乐意做某事，交际套语。', keyPoint: '固定搭配（C02）。', why: '微笑拒绝报酬后说“帮助人是我的荣幸”，pleasure 最贴切。', wrong: [['B', "It's one's turn 轮到某人，语义不符。"], ['C', 'habit 习惯，语气不当。'], ['D', 'dream 梦想，与语境不符。']], collocations: ['It is my pleasure to do sth'],
  },

  // ================= 阅读理解（12，三篇） =================
  {
    id: 'demo.rd.01', section: 'Reading', questionType: 'reading.R01', groupId: 'rg1', groupTitle: '阅读一：图书馆的夏天',
    passage: 'Last summer, 16-year-old Lisa worked as a volunteer in the town library. Every morning, she arrived at 8:30, organized returned books, and helped readers find what they needed. At first, Lisa thought the job would be boring. However, she soon discovered that every reader had a story. An old gentleman came every Tuesday to read history books. A mother borrowed picture books for her twin sons. A college student used the quiet reading room to prepare for exams.\nLisa especially enjoyed the children’s reading hour on Fridays. She read stories aloud and watched the children’s eyes light up. By the end of the summer, she had not only made new friends but also learned what she wanted to study in college: library science.',
    text: '细节题：What did Lisa usually do first after arriving at the library?', options: ['She read stories to children.', 'She organized returned books.', 'She helped a college student.', 'She chose her college subject.'], answer: 'B', difficulty: 'easy', tags: ['reading.R01'],
    conclusion: '原文直接说她到馆后整理还回的书。', keyPoint: '细节题：题干关键词 → 原文定位 → 同义替换。', why: '第二句：arrived at 8:30, organized returned books，直接对应。', wrong: [['A', '故事时间只在周五，不是每天到馆第一件事。'], ['C', '大学生是读者之一，不是她去帮忙的对象。'], ['D', '选专业是夏末才决定的。']],
    keywords: ['arrived at 8:30', 'organized returned books'], location: 'Every morning, she arrived at 8:30, organized returned books...', evidence: 'organized returned books', paraphrase: 'organize returned books = 整理归还的图书',
  },
  {
    id: 'demo.rd.02', section: 'Reading', questionType: 'reading.R06', groupId: 'rg1', groupTitle: '阅读一：图书馆的夏天',
    passage: 'Last summer, 16-year-old Lisa worked as a volunteer in the town library. Every morning, she arrived at 8:30, organized returned books, and helped readers find what they needed. At first, Lisa thought the job would be boring. However, she soon discovered that every reader had a story. An old gentleman came every Tuesday to read history books. A mother borrowed picture books for her twin sons. A college student used the quiet reading room to prepare for exams.\nLisa especially enjoyed the children’s reading hour on Fridays. She read stories aloud and watched the children’s eyes light up. By the end of the summer, she had not only made new friends but also learned what she wanted to study in college: library science.',
    text: '指代题：What does the underlined word “the job” refer to?', options: ['Reading history books', 'Working in the library', 'Preparing for exams', 'Studying library science'], answer: 'B', difficulty: 'normal', tags: ['reading.R06'],
    conclusion: 'the job 指代她在图书馆做志愿者这份工作。', keyPoint: '指代题：向前找最近的名词/动作。', why: '前句说 worked as a volunteer in the town library，the job 即指此。', wrong: [['A', '读历史书的是老先生。'], ['C', '备考的是大学生。'], ['D', '图书馆学是她后来想学的专业。']],
    keywords: ['the job'], location: 'At first, Lisa thought the job would be boring.', evidence: 'worked as a volunteer in the town library', paraphrase: 'the job = volunteering in the library',
  },
  {
    id: 'demo.rd.03', section: 'Reading', questionType: 'reading.R03', groupId: 'rg1', groupTitle: '阅读一：图书馆的夏天',
    passage: 'Last summer, 16-year-old Lisa worked as a volunteer in the town library. Every morning, she arrived at 8:30, organized returned books, and helped readers find what they needed. At first, Lisa thought the job would be boring. However, she soon discovered that every reader had a story. An old gentleman came every Tuesday to read history books. A mother borrowed picture books for her twin sons. A college student used the quiet reading room to prepare for exams.\nLisa especially enjoyed the children’s reading hour on Fridays. She read stories aloud and watched the children’s eyes light up. By the end of the summer, she had not only made new friends but also learned what she wanted to study in college: library science.',
    text: '推断题：Why did the children’s eyes “light up” on Fridays?', options: ['The library was brighter on Fridays.', 'They were excited by the stories.', 'They could borrow books free.', 'They wanted to leave quickly.'], answer: 'B', difficulty: 'normal', tags: ['reading.R03'],
    conclusion: '眼睛发亮是因为喜欢听故事、感到兴奋，需要合理推断。', keyPoint: '推断题：依据原文，不选原句照搬的无关项。', why: 'She read stories aloud and watched the children’s eyes light up，因果相连。', wrong: [['A', '文中未提灯光，无依据。'], ['C', '未提免费借书。'], ['D', '与孩子们的反应相反。']],
    keywords: ["children's eyes light up"], location: 'She read stories aloud and watched the children’s eyes light up.', evidence: 'read stories aloud → eyes light up', paraphrase: 'eyes light up = become excited/interested',
  },
  {
    id: 'demo.rd.04', section: 'Reading', questionType: 'reading.R02', groupId: 'rg1', groupTitle: '阅读一：图书馆的夏天',
    passage: 'Last summer, 16-year-old Lisa worked as a volunteer in the town library. Every morning, she arrived at 8:30, organized returned books, and helped readers find what they needed. At first, Lisa thought the job would be boring. However, she soon discovered that every reader had a story. An old gentleman came every Tuesday to read history books. A mother borrowed picture books for her twin sons. A college student used the quiet reading room to prepare for exams.\nLisa especially enjoyed the children’s reading hour on Fridays. She read stories aloud and watched the children’s eyes light up. By the end of the summer, she had not only made new friends but also learned what she wanted to study in college: library science.',
    text: '主旨题：What is the best title for the passage?', options: ['How to Borrow Library Books', 'A Summer at the Library', 'Different Kinds of Readers', 'Children Love Stories'], answer: 'B', difficulty: 'normal', tags: ['reading.R02'],
    conclusion: '全文围绕 Lisa 在图书馆做志愿者的一个夏天展开。', keyPoint: '主旨题：覆盖全文，不选只讲某一段的标题。', why: '首句 Last summer...library，结尾 By the end of the summer，首尾呼应。', wrong: [['A', '如何借书，文中未讲。'], ['C', '读者类型只是部分细节。'], ['D', '只对应周五活动，以偏概全。']],
    keywords: ['summer', 'volunteer', 'library'], location: '首句 + 末句', evidence: 'Last summer...volunteer...library; By the end of the summer', paraphrase: '标题须概括全文主线',
  },
  {
    id: 'demo.rd.05', section: 'Reading', questionType: 'reading.R01', groupId: 'rg2', groupTitle: '阅读二：在线学习',
    passage: 'More and more adults are choosing online courses to continue their education. Unlike traditional classes, online courses allow students to learn at any time and from almost anywhere. This is especially important for working people who cannot attend daytime classes.\nHowever, online learning also brings challenges. Without a teacher standing nearby, some students find it hard to stay focused. Others simply put off watching the recorded lessons until the course is almost over. Successful online learners usually share two habits: they make a fixed study plan and they finish each lesson with a short review note.\nExperts say that the medium is not the key — self-discipline is.',
    text: '细节题：What advantage of online courses is mentioned?', options: ['They are always free.', 'They offer flexible time and place.', 'They give every student a teacher nearby.', 'They never use recorded lessons.'], answer: 'B', difficulty: 'easy', tags: ['reading.R01'],
    conclusion: '第一段明确说可随时随地学习。', keyPoint: '细节定位 + 同义替换。', why: 'learn at any time and from almost anywhere = flexible time and place。', wrong: [['A', '免费未提及。'], ['C', '第二段说老师不在身边。'], ['D', '第二段明确有录播课。']],
    keywords: ['at any time', 'anywhere'], location: 'online courses allow students to learn at any time and from almost anywhere', evidence: 'at any time and from almost anywhere', paraphrase: 'at any time/anywhere ≈ flexible time and place',
  },
  {
    id: 'demo.rd.06', section: 'Reading', questionType: 'reading.R04', groupId: 'rg2', groupTitle: '阅读二：在线学习',
    passage: 'More and more adults are choosing online courses to continue their education. Unlike traditional classes, online courses allow students to learn at any time and from almost anywhere. This is especially important for working people who cannot attend daytime classes.\nHowever, online learning also brings challenges. Without a teacher standing nearby, some students find it hard to stay focused. Others simply put off watching the recorded lessons until the course is almost over. Successful online learners usually share two habits: they make a fixed study plan and they finish each lesson with a short review note.\nExperts say that the medium is not the key — self-discipline is.',
    text: '词义猜测：What does “put off” most probably mean?', options: ['推迟', '观看', '录制', '喜欢'], answer: 'A', difficulty: 'easy', tags: ['reading.R04'],
    conclusion: '把录播课拖到课程快结束，put off 意为“推迟”。', keyPoint: '猜词看上下文因果和搭配。', why: 'until the course is almost over 说明一直拖延，即推迟观看。', wrong: [['B', '观看与“拖到最后”矛盾。'], ['C', '录制不是学生做的事。'], ['D', '喜欢与 challenges 语境不符。']],
    keywords: ['put off', 'until the course is almost over'], location: 'Others simply put off watching the recorded lessons until...', evidence: 'until...almost over 提示拖延', paraphrase: 'put off = delay / postpone',
  },
  {
    id: 'demo.rd.07', section: 'Reading', questionType: 'reading.R03', groupId: 'rg2', groupTitle: '阅读二：在线学习',
    passage: 'More and more adults are choosing online courses to continue their education. Unlike traditional classes, online courses allow students to learn at any time and from almost anywhere. This is especially important for working people who cannot attend daytime classes.\nHowever, online learning also brings challenges. Without a teacher standing nearby, some students find it hard to stay focused. Others simply put off watching the recorded lessons until the course is almost over. Successful online learners usually share two habits: they make a fixed study plan and they finish each lesson with a short review note.\nExperts say that the medium is not the key — self-discipline is.',
    text: '推断题：What can we infer from the second paragraph?', options: ['Recorded lessons guarantee good grades.', 'Watching lessons is not the same as learning.', 'All online students make study plans.', 'Teachers dislike online courses.'], answer: 'B', difficulty: 'hard', tags: ['reading.R03'],
    conclusion: '有人看完了课却拖延、走神，说明“看了课”不等于“学到了”。', keyPoint: '推断必须基于原文，不能过度发挥。', why: '难以专注、拖到最后才看，都说明被动观看不等于有效学习。', wrong: [['A', '与原文挑战相悖。'], ['C', '只有成功学习者有计划，不是所有人。'], ['D', '老师态度文中未提。']],
    keywords: ['hard to stay focused', 'put off'], location: '第二段', evidence: 'stay focused / put off / review note', paraphrase: 'watching ≠ learning effectively',
  },
  {
    id: 'demo.rd.08', section: 'Reading', questionType: 'reading.R05', groupId: 'rg2', groupTitle: '阅读二：在线学习',
    passage: 'More and more adults are choosing online courses to continue their education. Unlike traditional classes, online courses allow students to learn at any time and from almost anywhere. This is especially important for working people who cannot attend daytime classes.\nHowever, online learning also brings challenges. Without a teacher standing nearby, some students find it hard to stay focused. Others simply put off watching the recorded lessons until the course is almost over. Successful online learners usually share two habits: they make a fixed study plan and they finish each lesson with a short review note.\nExperts say that the medium is not the key — self-discipline is.',
    text: '态度题：What is the experts’ main attitude?', options: ['Online courses should be banned.', 'Self-discipline matters more than the medium.', 'Traditional classes are worse.', 'Recorded lessons are useless.'], answer: 'B', difficulty: 'normal', tags: ['reading.R05'],
    conclusion: '末句直言：媒介不是关键，自律才是。', keyPoint: '态度题找总结句和情感词。', why: 'the medium is not the key — self-discipline is 直接给出观点。', wrong: [['A', '禁止线上课程，无中生有。'], ['C', '未比较好坏。'], ['D', '录播无用，过度否定。']],
    keywords: ['medium is not the key', 'self-discipline'], location: 'Experts say that the medium is not the key — self-discipline is.', evidence: 'self-discipline is the key', paraphrase: '态度：客观且强调自律',
  },
  {
    id: 'demo.rd.09', section: 'Reading', questionType: 'reading.R01', groupId: 'rg3', groupTitle: '阅读三：做志愿者值不值',
    passage: 'Some people say volunteering is a waste of time because the work is unpaid. Research suggests the opposite. A study following 2,000 adults found that those who volunteered regularly felt healthier and reported lower stress levels. Helping others seems to help the helper.\nVolunteering also builds skills that paid work needs: communication, teamwork and time management. For students, volunteer experience can make a college application more attractive. Of course, nobody should be forced to volunteer. But if you have a few free hours each week, giving them away may be the best deal you ever make.',
    text: '细节题：What did the study of 2,000 adults find?', options: ['Volunteers felt healthier and less stressed.', 'Volunteering caused money problems.', 'Most volunteers were students.', 'Unpaid work made people tired.'], answer: 'A', difficulty: 'easy', tags: ['reading.R01'],
    conclusion: '研究发现常做志愿者的人感觉更健康、压力更低。', keyPoint: '数字是最容易定位的关键词。', why: '原文 felt healthier and reported lower stress levels，原词对应。', wrong: [['B', '经济问题未提及。'], ['C', '研究对象是成年人，未说多数是学生。'], ['D', '疲惫与研究结论相反。']],
    keywords: ['2,000 adults', 'healthier', 'lower stress'], location: 'A study following 2,000 adults found that...', evidence: 'felt healthier and reported lower stress levels', paraphrase: 'lower stress = less stressed',
  },
  {
    id: 'demo.rd.10', section: 'Reading', questionType: 'reading.R04', groupId: 'rg3', groupTitle: '阅读三：做志愿者值不值',
    passage: 'Some people say volunteering is a waste of time because the work is unpaid. Research suggests the opposite. A study following 2,000 adults found that those who volunteered regularly felt healthier and reported lower stress levels. Helping others seems to help the helper.\nVolunteering also builds skills that paid work needs: communication, teamwork and time management. For students, volunteer experience can make a college application more attractive. Of course, nobody should be forced to volunteer. But if you have a few free hours each week, giving them away may be the best deal you ever make.',
    text: '词义猜测：“the opposite” refers to the view that volunteering is ____.', options: ['a waste of time', 'actually beneficial', 'always paid', 'forced on people'], answer: 'B', difficulty: 'normal', tags: ['reading.R04'],
    conclusion: '研究结论与“浪费时间”相反，即志愿服务有益。', keyPoint: '指代/猜词要紧扣前一句。', why: '后文列出健康、减压、技能、升学等好处，正与浪费时间相反。', wrong: [['A', '这正是被反对的观点。'], ['C', '志愿服务本身无报酬，不是“有偿”。'], ['D', '末段明确不应强迫。']],
    keywords: ['the opposite'], location: 'Research suggests the opposite.', evidence: 'felt healthier... builds skills...', paraphrase: 'the opposite = volunteering is valuable/beneficial',
  },
  {
    id: 'demo.rd.11', section: 'Reading', questionType: 'reading.R02', groupId: 'rg3', groupTitle: '阅读三：做志愿者值不值',
    passage: 'Some people say volunteering is a waste of time because the work is unpaid. Research suggests the opposite. A study following 2,000 adults found that those who volunteered regularly felt healthier and reported lower stress levels. Helping others seems to help the helper.\nVolunteering also builds skills that paid work needs: communication, teamwork and time management. For students, volunteer experience can make a college application more attractive. Of course, nobody should be forced to volunteer. But if you have a few free hours each week, giving them away may be the best deal you ever make.',
    text: '主旨题：The passage is mainly written to ____.', options: ['report a study on stress', 'argue that volunteering benefits volunteers', 'compare different volunteer jobs', 'explain how to enter college'], answer: 'B', difficulty: 'normal', tags: ['reading.R02'],
    conclusion: '先立靶子（浪费时间）再用研究和论据反驳，全文为“志愿者也受益”立论。', keyPoint: '议论文主旨看作者想让读者接受什么。', why: '标题句 Helping others seems to help the helper 与结尾 best deal 都支撑 B。', wrong: [['A', '研究只是论据之一。'], ['C', '未比较志愿工作种类。'], ['D', '升学只是一个小论据。']],
    keywords: ['Helping others seems to help the helper'], location: '首段末句 + 全文', evidence: 'healthier / builds skills / more attractive', paraphrase: 'main purpose = argue a viewpoint',
  },
  {
    id: 'demo.rd.12', section: 'Reading', questionType: 'reading.R05', groupId: 'rg3', groupTitle: '阅读三：做志愿者值不值',
    passage: 'Some people say volunteering is a waste of time because the work is unpaid. Research suggests the opposite. A study following 2,000 adults found that those who volunteered regularly felt healthier and reported lower stress levels. Helping others seems to help the helper.\nVolunteering also builds skills that paid work needs: communication, teamwork and time management. For students, volunteer experience can make a college application more attractive. Of course, nobody should be forced to volunteer. But if you have a few free hours each week, giving them away may be the best deal you ever make.',
    text: '态度题：The author’s attitude toward volunteering is ____.', options: ['supportive', 'doubtful', 'uninterested', 'fearful'], answer: 'A', difficulty: 'easy', tags: ['reading.R05'],
    conclusion: '作者用研究、技能、升学论据和 best deal 收尾，态度是支持的。', keyPoint: '从论据褒贬和结尾句判断态度。', why: 'best deal you ever make 是强烈肯定。', wrong: [['B', '怀疑与全文立场相反。'], ['C', '冷漠不符合作者立论姿态。'], ['D', '恐惧毫无依据。']],
    keywords: ['best deal'], location: 'giving them away may be the best deal you ever make', evidence: 'best deal', paraphrase: 'supportive = positive attitude',
  },

  // ================= 补全对话（10，两组） =================
  {
    id: 'demo.dg.01', section: 'Dialogue', questionType: 'dialogue.D11', clozeTag: undefined, groupId: 'dg1', groupTitle: '对话一：看医生',
    text: '补全对话（第 1 空）。A: Good morning, doctor.  B: Good morning. ____  A: I’ve had a bad cough for three days, and my throat hurts.',
    options: ['What’s wrong with you?', 'How old are you?', 'Nice to meet you.', 'Where do you live?'], answer: 'A', difficulty: 'easy', tags: ['dialogue.D11'],
    conclusion: '医生开场问“哪里不舒服”。', keyPoint: '看病场景 D11 固定问答。', why: '答语是症状描述，问句应为 What’s wrong with you。', wrong: [['B', '年龄与答语不符。'], ['C', '打招呼不是问诊。'], ['D', '住址无关。']],
  },
  {
    id: 'demo.dg.02', section: 'Dialogue', questionType: 'dialogue.D11', groupId: 'dg1', groupTitle: '对话一：看医生',
    text: '补全对话（第 2 空）。B: ____  A: Yes, I had a slight fever last night.',
    options: ['Do you like fruit?', 'Did you take any medicine?', 'Do you have a fever?', 'Have you eaten breakfast?'], answer: 'C', difficulty: 'easy', tags: ['dialogue.D11'],
    conclusion: '答语 Yes + 昨晚发烧，问的是是否发烧。', keyPoint: '一般疑问句要与答语信息匹配。', why: 'Do you have a fever 正好对应 had a slight fever。', wrong: [['A', '水果无关。'], ['B', '吃药不会用发烧回答。'], ['D', '早饭无关。']],
  },
  {
    id: 'demo.dg.03', section: 'Dialogue', questionType: 'dialogue.D11', groupId: 'dg1', groupTitle: '对话一：看医生',
    text: '补全对话（第 3 空）。B: Let me take your temperature. ... It’s 38.2℃. ____ Drink more water and take this medicine twice a day.',
    options: ['It’s nothing serious.', 'That’s too late.', 'You should go to school.', 'You look very well.'], answer: 'A', difficulty: 'normal', tags: ['dialogue.D11'],
    conclusion: '量完体温安抚病人“没什么大碍”。', keyPoint: '看病场景的安慰语。', why: '随后给出喝水吃药的医嘱，先说明不严重最自然。', wrong: [['B', '太晚了不合语境。'], ['C', '发烧还让上学不合理。'], ['D', '与发烧事实矛盾。']],
  },
  {
    id: 'demo.dg.04', section: 'Dialogue', questionType: 'dialogue.D11', groupId: 'dg1', groupTitle: '对话一：看医生',
    text: '补全对话（第 4 空）。A: ____  B: For about five days. Come back if you don’t feel better.',
    options: ['How often should I take it?', 'How long should I take the medicine?', 'How much is the medicine?', 'Where did you buy it?'], answer: 'B', difficulty: 'hard', tags: ['dialogue.D11'],
    conclusion: '答语 for five days 是持续时间，问 How long。', keyPoint: 'how long 问多久；how often 问频率。', why: 'For about five days 回答的是服药持续时间。', wrong: [['A', 'how often 的回答是 twice a day（已在医嘱中）。'], ['C', '价格应用钱数回答。'], ['D', '地点应用 where 回答。']],
  },
  {
    id: 'demo.dg.05', section: 'Dialogue', questionType: 'dialogue.D11', groupId: 'dg1', groupTitle: '对话一：看医生',
    text: '补全对话（第 5 空）。A: OK, thank you, doctor.  B: ____',
    options: ['You’re welcome. Take care.', 'I’m sorry to hear that.', 'Never mind, please.', 'See you next month.'], answer: 'A', difficulty: 'easy', tags: ['dialogue.D11'],
    conclusion: '回应感谢用 You’re welcome，并嘱咐保重。', keyPoint: '感谢与应答 D03。', why: '对方致谢，礼貌回不客气 + Take care。', wrong: [['B', '听到坏消息才这么说。'], ['C', '用于回应道歉。'], ['D', '预约一个月没有依据。']],
  },
  {
    id: 'demo.dg.06', section: 'Dialogue', questionType: 'dialogue.D05', groupId: 'dg2', groupTitle: '对话二：电话邀请',
    text: '补全对话（第 1 空）。A: Hello, this is Mike speaking. Is that Tom?  B: Hi, Mike! ____',
    options: ['Speaking!', 'Who are you?', 'Thanks a lot.', 'I’m Tom, yes.'], answer: 'A', difficulty: 'normal', tags: ['dialogue.D12', 'dialogue.D05'],
    conclusion: '电话中确认本人身份用 Speaking!（我就是）。', keyPoint: '电话用语 D12。', why: 'Is that Tom? 的标准应答是 Speaking!', wrong: [['B', '电话中不问 Who are you，应用 Who’s calling。'], ['C', '还没收到帮助谈不上感谢。'], ['D', '电话习惯不说 I’m...，用 This is.../Speaking。']],
  },
  {
    id: 'demo.dg.07', section: 'Dialogue', questionType: 'dialogue.D05', groupId: 'dg2', groupTitle: '对话二：电话邀请',
    text: '补全对话（第 2 空）。A: Tom, are you free this Saturday evening? ____  B: A party? Sounds great!',
    options: ['I’m having a party; would you like to come?', 'What about going shopping?', 'Can you help me with English?', 'I went to a party yesterday.'], answer: 'A', difficulty: 'easy', tags: ['dialogue.D05'],
    conclusion: '答语出现 A party?，邀请内容必须提到聚会。', keyPoint: '邀请场景 D05：Would you like to...', why: '只有 A 提到 party 且发出邀请。', wrong: [['B', '购物与答语不符。'], ['C', '求助与答语不符。'], ['D', '过去参加聚会不构成邀请。']],
  },
  {
    id: 'demo.dg.08', section: 'Dialogue', questionType: 'dialogue.D05', groupId: 'dg2', groupTitle: '对话二：电话邀请',
    text: '补全对话（第 3 空）。B: A party? Sounds great! ____  A: At my home, starting at 6:30.',
    options: ['Where will it be held?', 'Why are you so happy?', 'How many people will come?', 'Who else is Tom?'], answer: 'A', difficulty: 'normal', tags: ['dialogue.D05', 'dialogue.D08'],
    conclusion: '答语是地点+时间，问在哪里举办。', keyPoint: '问路/地点用 Where。', why: 'At my home 回答地点，选 Where will it be held。', wrong: [['B', '原因不能用地点回答。'], ['C', '人数应用数字回答。'], ['D', '语义混乱。']],
  },
  {
    id: 'demo.dg.09', section: 'Dialogue', questionType: 'dialogue.D05', groupId: 'dg2', groupTitle: '对话二：电话邀请',
    text: '补全对话（第 4 空）。A: ...Some old classmates will come.  B: ____ I have to visit my grandparents that evening.',
    options: ['I’m afraid I can’t make it.', 'Count me in, please.', 'I’ll be there on time.', 'That sounds boring.'], answer: 'A', difficulty: 'normal', tags: ['dialogue.D05'],
    conclusion: '要去看祖父母，所以礼貌拒绝：恐怕来不了。', keyPoint: '婉拒邀请：I’m afraid I can’t。', why: '后句说明另有安排，前句必须是拒绝。', wrong: [['B', '算我一个，与后句矛盾。'], ['C', '准时到，矛盾。'], ['D', '太生硬且与 Sounds great 情绪不符。']],
  },
  {
    id: 'demo.dg.10', section: 'Dialogue', questionType: 'dialogue.D15', groupId: 'dg2', groupTitle: '对话二：电话邀请',
    text: '补全对话（第 5 空）。B: Sorry, Mike. ____  A: Thanks. Have a good weekend!',
    options: ['I hope you have a wonderful time!', 'I don’t like parties at all.', 'Please don’t call me again.', 'The party must be boring.'], answer: 'A', difficulty: 'normal', tags: ['dialogue.D15', 'dialogue.D05'],
    conclusion: '不能参加时礼貌祝福对方玩得开心。', keyPoint: '告别/礼貌收尾 D15。', why: '答语 Thanks + Have a good weekend，是对祝福的回应。', wrong: [['B', '不喜欢聚会很无礼。'], ['C', '不要再打来，无礼。'], ['D', '说聚会无聊，不礼貌。']],
  },
];

export const SEED_QUESTIONS: Question[] = SEED.map(q);
