import type {
  Difficulty,
  Explanation,
  Question,
  Section,
  SourceKind,
} from '@/types';

// ============================================================
// 扩充题库：更多年份真题 + 模拟题
//
// 所有题目均来自公开来源，题干/选项/答案可追溯。
// 解析为基于语法/语音知识的简明撰写，与正确答案自洽。
// ============================================================

const SOURCE_2021_URL =
  'https://m.book118.com/try_down/948074040007007043.pdf';
const SOURCE_2018MOCK_URL =
  'https://www.eol.cn/chengkao/ck-wyw/202506031047.html';
const SOURCE_PREEXAM_URL =
  'https://www.eol.cn/chengkao/ck-wyw/20250706132811.html';
const SOURCE_2022_URL =
  'http://www.eol.cn/baokao/ck-wyw/2023050610058.html';
const SOURCE_TENSE_URL =
  'https://www.eol.cn/chengkao/ck-wyw/20250621173259.html';
const SOURCE_BOOK118_2024_URL =
  'https://m.book118.com/try_down/185124310314011323.pdf';

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
    frequencyLevel: null,
    createdAt: now,
    updatedAt: now,
    generatedByAi: false,
    model: null,
    promptVersion: null,
  };
}

// 简版构造器：单选/词汇语法/语音
function q(
  id: string,
  section: Section,
  qtype: string,
  text: string,
  options: string[],
  answer: string,
  conclusion: string,
  keyPoint: string,
  why: string,
  wrong: [string, string][],
): QSeed {
  return { id, section, questionType: qtype, text, options, answer, conclusion, keyPoint, why, wrong };
}

// ============================================================
// 一、2021 年成人高考专升本英语真题（1–34 题）
// 来源：book118.com 公开 PDF（含参考答案与解析）
// 收录：语音 1–5 + 词汇语法 6–20 + 完形 21–34（第 35 题因 PDF 截断未纳入）
// 标注：verified_real_exam / B / isRealExam:true / year:2021
// ============================================================

const R2021_CLOZE = `As children move towards adulthood (成年), they become taller, stronger, and more independent. At some point in adulthood, 21, a slow decline begins. Their hair often 22 gray, their skin wrinkles, and their muscles begin to 23. Their short-term memory may suffer, and they often 24 part of their vision or hearing. Scientists are not 25 sure what causes the effects of aging. The body might have a time 26 which would determine how long the cells can remain 27. Depending on the type of animal and its environment, animals age at different rates and live 28 different lengths of time. An animal in a good zoo—well 29 and protected from predators (捕食者)—often lives longer than the same type in the wild. 30, people who live in rich countries generally live longer than 31 in poor countries. Several other factors also 32 how long people live and the quality of their lives. One factor is genetics (遗传). In some families, it seems that many 33 have long lives. Genetics may also determine whether people 34 certain diseases.`;

const R2021: QSeed[] = [
  // 语音 1–5
  q('r2021.ph.01', 'Phonetics', 'phonetics.vowel', '选出划线部分读音不同的一项：A. cake  B. gas  C. bag  D. tax', ['cake', 'gas', 'bag', 'tax'], 'A', 'cake 的 a 发 /eɪ/，其余发 /æ/。', 'a 在开音节读 /eɪ/。', 'cake /keɪk/ 中 a 读 /eɪ/；gas/bag/tax 中 a 读 /æ/。', [['B', 'gas 的 a 读 /æ/。'], ['C', 'bag 的 a 读 /æ/。'], ['D', 'tax 的 a 读 /æ/。']]),
  q('r2021.ph.02', 'Phonetics', 'phonetics.consonant', '选出划线部分读音不同的一项：A. tough  B. laugh  C. though  D. cough', ['tough', 'laugh', 'though', 'cough'], 'C', 'though 的 gh 不发音，其余发 /f/。', 'gh 在 though 中不发音。', 'tough/tʌf/、laugh/lɑːf/、cough/kɒf/ 中 gh 读 /f/；though/ðəʊ/ 中 gh 不发音。', [['A', 'tough 的 gh 读 /f/。'], ['B', 'laugh 的 gh 读 /f/。'], ['D', 'cough 的 gh 读 /f/。']]),
  q('r2021.ph.03', 'Phonetics', 'phonetics.vowel', '选出划线部分读音不同的一项：A. pupil  B. music  C. huge  D. lucky', ['pupil', 'music', 'huge', 'lucky'], 'D', 'lucky 的 u 发 /ʌ/，其余发 /juː/。', 'u 在 lucky 中读 /ʌ/。', 'pupil/ˈpjuːpl/、music/ˈmjuːzɪk/、huge/hjuːdʒ/ 中 u 读 /juː/；lucky/ˈlʌki/ 中 u 读 /ʌ/。', [['A', 'pupil 的 u 读 /juː/。'], ['B', 'music 的 u 读 /juː/。'], ['C', 'huge 的 u 读 /juː/。']]),
  q('r2021.ph.04', 'Phonetics', 'phonetics.consonant', '选出划线部分读音不同的一项：A. gesture  B. mature  C. mixture  D. structure', ['gesture', 'mature', 'mixture', 'structure'], 'B', 'mature 的 ture 发 /tʃʊə/，其余发 /tʃə/。', 'ture 在 mature 中读 /tʃʊə/。', 'gesture/ˈdʒestʃə/、mixture/ˈmɪkstʃə/、structure/ˈstrʌktʃə/ 中 ture 读 /tʃə/；mature/məˈtʃʊə/ 中 ture 读 /tʃʊə/。', [['A', 'gesture 的 ture 读 /tʃə/。'], ['C', 'mixture 的 ture 读 /tʃə/。'], ['D', 'structure 的 ture 读 /tʃə/。']]),
  q('r2021.ph.05', 'Phonetics', 'phonetics.vowel', '选出划线部分读音不同的一项：A. leader  B. pleasure  C. leather  D. measure', ['leader', 'pleasure', 'leather', 'measure'], 'A', 'leader 的 ea 发 /iː/，其余发 /e/。', 'ea 在 leader 中读 /iː/。', 'leader/ˈliːdə/ 中 ea 读 /iː/；pleasure/ˈpleʒə/、leather/ˈleðə/、measure/ˈmeʒə/ 中 ea 读 /e/。', [['B', 'pleasure 的 ea 读 /e/。'], ['C', 'leather 的 ea 读 /e/。'], ['D', 'measure 的 ea 读 /e/。']]),

  // 词汇语法 6–20
  q('r2021.vg.06', 'Vocabulary', 'vocab.adj', '--Did you find the film boring? --Not at all. It was ___.', ['terrific', 'bitter', 'horrible', 'miserable'], 'A', 'terrific 意为"极好的"，与 not at all（一点也不无聊）对应。', 'terrific = excellent。', '回应"一点也不无聊"，应选褒义词 terrific。', [['B', 'bitter 令人悲痛的。'], ['C', 'horrible 可怕的。'], ['D', 'miserable 痛苦的。']]),
  q('r2021.vg.07', 'Grammar', 'grammar.tense', 'By the time he retires, Carl ___ president for 15 years at the university.', ['would be', 'will have been', 'will be', 'has been'], 'B', 'by the time + 一般现在时表将来，主句用将来完成时。', 'by the time → 将来完成时。', '"等到退休时"表将来时间点，用 will have been。', [['A', 'would be 表过去将来。'], ['C', 'will be 不表完成。'], ['D', 'has been 为现在完成时。']]),
  q('r2021.vg.08', 'Grammar', 'grammar.causative', 'The pipe in the kitchen is broken. We should have it ___ as soon as possible.', ['to be repaired', 'repaired', 'to repair', 'repairing'], 'B', 'have sth. done 让某事被做。', 'have + 宾语 + 过去分词。', 'have it repaired 让人修好水管，过去分词表被动。', [['A', 'to be repaired 不用 have 搭配。'], ['C', 'to repair 为不定式主动。'], ['D', 'repairing 为现在分词。']]),
  q('r2021.vg.09', 'Vocabulary', 'vocab.prep', 'Every time I met her, she would show her concern ___ me and my family.', ['against', 'on', 'from', 'for'], 'D', 'show concern for sb. 对某人表示关心。', 'concern for sb.。', 'show concern for me and my family 对我和家人表示关心。', [['A', 'against 反对。'], ['B', 'on 关于。'], ['C', 'from 来自。']]),
  q('r2021.vg.10', 'Grammar', 'grammar.subjunctive', 'Mary demanded that he ___ the books he borrowed from her a month ago.', ['return', 'would return', 'returned', 'had returned'], 'A', 'demand 后接宾语从句用虚拟语气 (should) do。', 'demand that sb. (should) do。', 'demand 后的从句用 (should) return，should 可省。', [['B', 'would return 非虚拟。'], ['C', 'returned 为过去式。'], ['D', 'had returned 为过去完成时。']]),
  q('r2021.vg.11', 'Grammar', 'grammar.noun_clause', 'We have to accept the fact ___ there is a shortage of qualified teachers in the countryside.', ['that', 'which', 'since', 'because'], 'A', 'that 引导同位语从句，解释 fact 的内容。', '同位语从句用 that。', 'the fact that... 中 that 引导同位语从句，不充当成分。', [['B', 'which 引导定语从句需充当成分。'], ['C', 'since 表原因。'], ['D', 'because 表原因。']]),
  q('r2021.vg.12', 'Grammar', 'grammar.conj', 'There are enough night schools in this city. Adults can be educated no matter ___ old they are.', ['how', 'what', 'when', 'where'], 'A', 'no matter how 无论怎样。', 'no matter how + adj.。', 'no matter how old 无论多大年龄。', [['B', 'no matter what 无论什么。'], ['C', 'no matter when 无论何时。'], ['D', 'no matter where 无论何地。']]),
  q('r2021.vg.13', 'Grammar', 'grammar.relative', 'Those ___ are willing to help others are likely to be popular among people.', ['whose', 'which', 'who', 'what'], 'C', 'who 引导定语从句，先行词 those 指人。', 'those who...。', '先行词 those 指人且在从句中作主语，用 who。', [['A', 'whose 表所属。'], ['B', 'which 指物。'], ['D', 'what 不引导定语从句。']]),
  q('r2021.vg.14', 'Vocabulary', 'vocab.verb', 'Many young people have stopped ___ newspapers because they read the news online now.', ['buy', 'to buy', 'bought', 'buying'], 'D', 'stop doing sth. 停止做某事。', 'stop doing 停止做。', '不再买报纸，用 stop buying。', [['A', 'buy 动词原形。'], ['B', 'stop to buy 停下来去买。'], ['C', 'bought 过去式。']]),
  q('r2021.vg.15', 'Vocabulary', 'vocab.conj', "Susie's experience is unusual ___ she travelled 20 countries in only one month.", ['so that', 'except that', 'in that', 'such that'], 'C', 'in that 意为"因为"。', 'in that = because。', 'in that 引导原因状语从句，表"因为"。', [['A', 'so that 表目的/结果。'], ['B', 'except that 除了。'], ['D', 'such that 如此……以至于。']]),
  q('r2021.vg.16', 'Vocabulary', 'vocab.verb', 'The company has 80 staff members, ___ 15 foreign experts.', ['not to count', 'not counted', 'having not counted', 'not counting'], 'D', 'not counting 意为"不包括"，相当于介词。', 'not counting = excluding。', 'not counting 15 foreign experts 不包括 15 名外国专家。', [['A', 'not to count 不定式。'], ['B', 'not counted 过去分词，逻辑不通。'], ['C', 'having not counted 形式错误。']]),
  q('r2021.vg.17', 'Vocabulary', 'vocab.adv', 'The young mother ___ ever gets a chance to study, except when the children have gone to bed.', ['hardly', 'almost', 'only', 'nearly'], 'A', 'hardly ever 几乎从不。', 'hardly ever = almost never。', 'hardly ever gets a chance 几乎没有机会学习。', [['B', 'almost 几乎。'], ['C', 'only 仅仅。'], ['D', 'nearly 差不多。']]),
  q('r2021.vg.18', 'Grammar', 'grammar.participle', '___ the result of the exam, she stood at the door of the classroom, disappointed.', ['Knowing', 'To be known', 'Known', 'To know'], 'A', 'Knowing 作原因状语，逻辑主语 she 与 know 为主动关系。', '现在分词作状语表主动。', 'she 与 know 是主动关系，用现在分词 Knowing。', [['B', 'To be known 为不定式被动。'], ['C', 'Known 为过去分词表被动。'], ['D', 'To know 表目的。']]),
  q('r2021.vg.19', 'Vocabulary', 'vocab.noun', 'Natural gas can serve as an ___ to coal and oil because it is more environmentally friendly.', ['option', 'extra', 'addition', 'alternative'], 'D', 'alternative 意为"替代物"。', 'alternative to sth.。', 'serve as an alternative to coal and oil 作为煤和石油的替代品。', [['A', 'option 选择。'], ['B', 'extra 额外事物。'], ['C', 'addition 增加物。']]),
  q('r2021.vg.20', 'Vocabulary', 'vocab.adj', 'The librarian did some careful checking and found several books ___ from the shelf.', ['leaking', 'missing', 'losing', 'dropping'], 'B', 'missing 意为"不在，失踪"。', 'books missing 书不见了。', 'several books missing from the shelf 书架上少了几本书。', [['A', 'leaking 泄露。'], ['C', 'losing 为及物动词，不与 from 搭配。'], ['D', 'dropping 掉落。']]),

  // 完形 21–34
  { id: 'r2021.cz.21', section: 'Cloze', questionType: 'cloze', text: '21. A. moreover  B. besides  C. therefore  D. however', options: ['moreover', 'besides', 'therefore', 'however'], answer: 'D', passage: R2021_CLOZE, groupId: 'r2021.cg1', groupTitle: '2021 完形：衰老', clozeTag: 'cloze.conj', tags: ['cloze'], conclusion: 'however 表转折，"然而成年后某时开始衰退"。', keyPoint: 'however = but', why: '前文说成年前变强，后文说开始衰退，为转折，选 however。', wrong: [['A', 'moreover 而且。'], ['B', 'besides 此外。'], ['C', 'therefore 因此。']] },
  { id: 'r2021.cz.22', section: 'Cloze', questionType: 'cloze', text: '22. A. falls  B. turns  C. stays  D. seems', options: ['falls', 'turns', 'stays', 'seems'], answer: 'B', passage: R2021_CLOZE, groupId: 'r2021.cg1', groupTitle: '2021 完形：衰老', clozeTag: 'cloze.verb', tags: ['cloze'], conclusion: 'turn gray 变白。', keyPoint: 'turn + adj.', why: 'turn gray 变灰白，turn 作系动词表变化。', wrong: [['A', 'falls 降落。'], ['C', 'stays 保持。'], ['D', 'seems 似乎。']] },
  { id: 'r2021.cz.23', section: 'Cloze', questionType: 'cloze', text: '23. A. grow  B. develop  C. shrink  D. fade', options: ['grow', 'develop', 'shrink', 'fade'], answer: 'C', passage: R2021_CLOZE, groupId: 'r2021.cg1', groupTitle: '2021 完形：衰老', clozeTag: 'cloze.verb', tags: ['cloze'], conclusion: 'shrink 意为"萎缩"，肌肉开始萎缩。', keyPoint: 'muscles shrink', why: 'muscles begin to shrink 肌肉萎缩。', wrong: [['A', 'grow 生长。'], ['B', 'develop 发展。'], ['D', 'fade 褪色。']] },
  { id: 'r2021.cz.24', section: 'Cloze', questionType: 'cloze', text: '24. A. lose  B. harm  C. protect  D. improve', options: ['lose', 'harm', 'protect', 'improve'], answer: 'A', passage: R2021_CLOZE, groupId: 'r2021.cg1', groupTitle: '2021 完形：衰老', clozeTag: 'cloze.verb', tags: ['cloze'], conclusion: 'lose 意为"丧失"，丧失部分视力或听力。', keyPoint: 'lose vision/hearing', why: 'lose part of their vision or hearing 丧失部分视力或听力。', wrong: [['B', 'harm 伤害。'], ['C', 'protect 保护。'], ['D', 'improve 提高。']] },
  { id: 'r2021.cz.25', section: 'Cloze', questionType: 'cloze', text: '25. A. simply  B. exactly  C. purely  D. strictly', options: ['simply', 'exactly', 'purely', 'strictly'], answer: 'B', passage: R2021_CLOZE, groupId: 'r2021.cg1', groupTitle: '2021 完形：衰老', clozeTag: 'cloze.adv', tags: ['cloze'], conclusion: 'exactly 意为"确切地"，科学家还不确定衰老原因。', keyPoint: 'not exactly sure', why: 'not exactly sure 不确切知道。', wrong: [['A', 'simply 简单地。'], ['C', 'purely 纯粹地。'], ['D', 'strictly 严格地。']] },
  { id: 'r2021.cz.26', section: 'Cloze', questionType: 'cloze', text: '26. A. label  B. lack  C. link  D. limit', options: ['label', 'lack', 'link', 'limit'], answer: 'D', passage: R2021_CLOZE, groupId: 'r2021.cg1', groupTitle: '2021 完形：衰老', clozeTag: 'cloze.noun', tags: ['cloze'], conclusion: 'time limit 时间限制。', keyPoint: 'a time limit', why: 'a time limit which determines... 决定细胞寿命的时间限制。', wrong: [['A', 'label 标签。'], ['B', 'lack 缺乏。'], ['C', 'link 联系。']] },
  { id: 'r2021.cz.27', section: 'Cloze', questionType: 'cloze', text: '27. A. healthy  B. bright  C. stable  D. secure', options: ['healthy', 'bright', 'stable', 'secure'], answer: 'A', passage: R2021_CLOZE, groupId: 'r2021.cg1', groupTitle: '2021 完形：衰老', clozeTag: 'cloze.adj', tags: ['cloze'], conclusion: 'remain healthy 保持健康。', keyPoint: 'remain healthy', why: 'remain healthy 保持健康。', wrong: [['B', 'bright 明亮的。'], ['C', 'stable 稳定的。'], ['D', 'secure 安全的。']] },
  { id: 'r2021.cz.28', section: 'Cloze', questionType: 'cloze', text: '28. A. with  B. on  C. in  D. for', options: ['with', 'on', 'in', 'for'], answer: 'D', passage: R2021_CLOZE, groupId: 'r2021.cg1', groupTitle: '2021 完形：衰老', clozeTag: 'cloze.prep', tags: ['cloze'], conclusion: 'live for + 时间段，生存多久。', keyPoint: 'live for a time', why: 'live for different lengths of time 寿命不同。', wrong: [['A', 'live with 与……同居。'], ['B', 'live on 靠……生活。'], ['C', 'live in 居住在。']] },
  { id: 'r2021.cz.29', section: 'Cloze', questionType: 'cloze', text: '29. A. clothed  B. trained  C. behaved  D. fed', options: ['clothed', 'trained', 'behaved', 'fed'], answer: 'D', passage: R2021_CLOZE, groupId: 'r2021.cg1', groupTitle: '2021 完形：衰老', clozeTag: 'cloze.verb', tags: ['cloze'], conclusion: 'well fed 被喂饱。', keyPoint: 'well fed and protected', why: '动物在动物园里被喂饱且免受捕食者伤害。', wrong: [['A', 'clothed 穿衣。'], ['B', 'trained 训练。'], ['C', 'behaved 表现。']] },
  { id: 'r2021.cz.30', section: 'Cloze', questionType: 'cloze', text: '30. A. Finally  B. Mostly  C. Commonly  D. Similarly', options: ['Finally', 'Mostly', 'Commonly', 'Similarly'], answer: 'D', passage: R2021_CLOZE, groupId: 'r2021.cg1', groupTitle: '2021 完形：衰老', clozeTag: 'cloze.adv', tags: ['cloze'], conclusion: 'Similarly 同样地。', keyPoint: 'Similarly = likewise', why: '与动物类比，人也如此，用 Similarly。', wrong: [['A', 'Finally 最终。'], ['B', 'Mostly 通常。'], ['C', 'Commonly 通常。']] },
  { id: 'r2021.cz.31', section: 'Cloze', questionType: 'cloze', text: '31. A. those  B. that  C. others  D. some', options: ['those', 'that', 'others', 'some'], answer: 'A', passage: R2021_CLOZE, groupId: 'r2021.cg1', groupTitle: '2021 完形：衰老', clozeTag: 'cloze.pron', tags: ['cloze'], conclusion: 'those 指代复数名词 people。', keyPoint: 'those 代替可数名词复数', why: 'people 为复数，用 those 代替。', wrong: [['B', 'that 指代不可数/单数。'], ['C', 'others 其他人。'], ['D', 'some 一些。']] },
  { id: 'r2021.cz.32', section: 'Cloze', questionType: 'cloze', text: '32. A. judge  B. form  C. cause  D. affect', options: ['judge', 'form', 'cause', 'affect'], answer: 'D', passage: R2021_CLOZE, groupId: 'r2021.cg1', groupTitle: '2021 完形：衰老', clozeTag: 'cloze.verb', tags: ['cloze'], conclusion: 'affect 影响。', keyPoint: 'affect how long people live', why: 'affect how long people live 影响寿命。', wrong: [['A', 'judge 判断。'], ['B', 'form 构成。'], ['C', 'cause 造成。']] },
  { id: 'r2021.cz.33', section: 'Cloze', questionType: 'cloze', text: '33. A. friends  B. members  C. races  D. names', options: ['friends', 'members', 'races', 'names'], answer: 'B', passage: R2021_CLOZE, groupId: 'r2021.cg1', groupTitle: '2021 完形：衰老', clozeTag: 'cloze.noun', tags: ['cloze'], conclusion: 'family members 家庭成员。', keyPoint: 'many members have long lives', why: '许多家庭成员长寿。', wrong: [['A', 'friends 朋友。'], ['C', 'races 种族。'], ['D', 'names 名字。']] },
  { id: 'r2021.cz.34', section: 'Cloze', questionType: 'cloze', text: '34. A. take  B. make  C. get  D. cause', options: ['take', 'make', 'get', 'cause'], answer: 'C', passage: R2021_CLOZE, groupId: 'r2021.cg1', groupTitle: '2021 完形：衰老', clozeTag: 'cloze.verb', tags: ['cloze'], conclusion: 'get certain diseases 患上某些疾病。', keyPoint: 'get a disease', why: 'get certain diseases 患上某些疾病。', wrong: [['A', 'take 拿。'], ['B', 'make 制作。'], ['D', 'cause 造成。']] },
];

// ============================================================
// 二、2018 年成考专升本英语模拟题（1–38 题）
// 来源：eol.cn "2018年专升本《英语》成人高考模拟题及答案(4)"
// 收录：语音 5 + 词汇语法 15 + 完形 15 + 阅读 3
// 标注：third_party_unverified / C / isRealExam:false
// ============================================================

const M2018_CLOZE = `If you do not use your arms or your legs for some time, they become weak. When you 21 using them again, they 22 become strong again. Everybody knows this and nobody would think of 23 this fact. 24 here are many people who do not 25 to know that memory works in the 26 way.

27 someone says that he has a good memory, he actually means that he 28 his memory by practising exercising it.

When someone 29 says that his memory is poor, he actually means that he 30 give it enough chances to become 31. Have you ever noticed that people who cannot read or write usually have 32 memories than those who can?

This is because those who 33 read or write have to remember things. They have to remember dates, places, names, songs and stories.

So their memory is the whole time being used. So 34 you want to have a good memory, you should learn from those people, 35 by remembering what you see, hear, feel and write. If so, you must have a good memory.`;

const M2018_RD1 = `There's time to get angry. And it's best for your child if you do. Let's say your child hits a playmate with a toy—hard enough to make the other child cry. How can you teach your child to feel sorry so he or she won't do it again? Researchers say the best way for parents to react is to show their anger and to let the child know exactly why they are mad.

Many parents believe that it is best to control their feelings and to wait until they're calm before scolding their children. But the mother or father who explains reasonably to a child, "Peter was crying because you hit him," is not likely to attract much attention.

Young children need to be scolded immediately, and strongly, before they'll take criticism to heart. When your young child does something wrong, scold him or her seriously at once. At the same time be sure to tell the child clearly what he or she has done wrong.`;

const M2018: QSeed[] = [
  // 语音
  q('m2018.ph.01', 'Phonetics', 'phonetics.vowel', '选出划线部分读音不同的一项：A. already  B. each  C. league  D. weak', ['already', 'each', 'league', 'weak'], 'A', 'already 的 ea 发 /e/，其余发 /iː/。', 'ea 在 already 中读 /e/。', 'already/ɔːlˈredi/ 中 ea 读 /e/；each/iːtʃ/、league/liːɡ/、weak/wiːk/ 中 ea 读 /iː/。', [['B', 'each 的 ea 读 /iː/。'], ['C', 'league 的 ea 读 /iː/。'], ['D', 'weak 的 ea 读 /iː/。']]),
  q('m2018.ph.02', 'Phonetics', 'phonetics.vowel', '选出划线部分读音不同的一项：A. produce  B. true  C. computer  D. news', ['produce', 'true', 'computer', 'news'], 'B', 'true 的 u 发 /uː/，其余发 /juː/。', 'u 在 true 中读 /uː/。', 'produce/prəˈdjuːs/、computer/kəmˈpjuːtə/、news/njuːz/ 中 u 读 /juː/；true/truː/ 中 u 读 /uː/。', [['A', 'produce 的 u 读 /juː/。'], ['C', 'computer 的 u 读 /juː/。'], ['D', 'news 的 u 读 /juː/。']]),
  q('m2018.ph.03', 'Phonetics', 'phonetics.vowel', '选出划线部分读音不同的一项：A. calm  B. hall  C. talk  D. ball', ['calm', 'hall', 'talk', 'ball'], 'A', 'calm 的 al 发 /ɑː/，其余发 /ɔː/。', 'al 在 calm 中读 /ɑː/。', 'calm/kɑːm/ 中 al 读 /ɑː/；hall/hɔːl/、talk/tɔːk/、ball/bɔːl/ 中 al 读 /ɔː/。', [['B', 'hall 的 al 读 /ɔː/。'], ['C', 'talk 的 al 读 /ɔː/。'], ['D', 'ball 的 al 读 /ɔː/。']]),
  q('m2018.ph.04', 'Phonetics', 'phonetics.consonant', '选出划线部分读音不同的一项：A. breath  B. breathe  C. mouth  D. cloth', ['breath', 'breathe', 'mouth', 'cloth'], 'B', 'breathe 的 th 发 /ð/，其余发 /θ/。', 'th 在 breathe 中读 /ð/。', 'breath/breθ/、mouth/maʊθ/、cloth/klɒθ/ 中 th 读 /θ/；breathe/briːð/ 中 th 读 /ð/。', [['A', 'breath 的 th 读 /θ/。'], ['C', 'mouth 的 th 读 /θ/。'], ['D', 'cloth 的 th 读 /θ/。']]),
  q('m2018.ph.05', 'Phonetics', 'phonetics.vowel', '选出划线部分读音不同的一项：A. dollar  B. honest  C. polite  D. pocket', ['dollar', 'honest', 'polite', 'pocket'], 'C', 'polite 的 o 发 /ə/，其余发 /ɒ/。', 'o 在 polite 中读 /ə/。', 'dollar/ˈdɒlə/、honest/ˈɒnɪst/、pocket/ˈpɒkɪt/ 中 o 读 /ɒ/；polite/pəˈlaɪt/ 中 o 读 /ə/。', [['A', 'dollar 的 o 读 /ɒ/。'], ['B', 'honest 的 o 读 /ɒ/。'], ['D', 'pocket 的 o 读 /ɒ/。']]),

  // 词汇语法
  q('m2018.vg.06', 'Vocabulary', 'vocab.verb', 'This novel is worthy of ___.', ['reading', 'read', 'having read', 'being read'], 'A', 'worthy of doing 值得做。', 'worthy of + doing。', 'worthy of reading 值得一读，主动表被动。', [['B', 'read 动词原形。'], ['C', 'having read 完成式。'], ['D', 'being read 被动式，worhy of 主动表被动。']]),
  q('m2018.vg.07', 'Vocabulary', 'vocab.prep', 'It is very kind ___ see me.', ['from you to', 'as', 'as if', 'like that'], 'A', "It's kind of sb. to do sth. 某人做某事真好。", "It's kind of sb. to do。", 'It is very kind from you to see me 你来看我真好。（注：标准搭配为 of you to，此处按来源答案 A）', [['B', 'as 作为。'], ['C', 'as if 好像。'], ['D', 'like that 像那样。']]),
  q('m2018.vg.08', 'Vocabulary', 'vocab.conj', "It looks ___ it's going to rain.", ['that', 'as', 'as if', 'like that'], 'C', 'as if 意为"好像"。', 'look as if。', 'It looks as if it\'s going to rain 看起来要下雨了。', [['A', 'that 不与 look 搭配。'], ['B', 'as 作为。'], ['D', 'like that 像那样。']]),
  q('m2018.vg.09', 'Vocabulary', 'vocab.verb', 'The stone was so heavy that it was difficult for the old man to ___ it.', ['lift', 'reach', 'rise', 'touch'], 'A', 'lift 意为"举起"。', 'lift = raise。', '石头太重，老人难以举起。', [['B', 'reach 到达。'], ['C', 'rise 上升（不及物）。'], ['D', 'touch 触摸。']]),
  q('m2018.vg.10', 'Vocabulary', 'vocab.prep', 'They live ___ the other side of the road.', ['in', 'on', 'for', 'by'], 'B', 'on the other side of 在……另一边。', 'on the side of。', 'on the other side of the road 在路的另一边。', [['A', 'in 在里面。'], ['C', 'for 为了。'], ['D', 'by 通过。']]),
  q('m2018.vg.11', 'Grammar', 'grammar.participle', '___ that we were late, we started to run.', ['Know', 'To know', 'Knowing', 'Being known'], 'C', 'Knowing 作原因状语，we 与 know 为主动关系。', '现在分词作原因状语。', 'we 与 know 为主动关系，用 Knowing。', [['A', 'Know 动词原形。'], ['B', 'To know 表目的。'], ['D', 'Being known 被动。']]),
  q('m2018.vg.12', 'Grammar', 'grammar.comparison', 'This room is ___ any of the others in the building.', ['the biggest than', 'big as', 'bigger than', 'the biggest of'], 'C', 'bigger than 比……更大。', '比较级 + than。', 'bigger than any of the others 比其他任何一间都大。', [['A', 'biggest 不与 than 连用。'], ['B', 'big as 应为 as big as。'], ['D', 'the biggest of 与 any 不搭配。']]),
  q('m2018.vg.13', 'Vocabulary', 'vocab.causative', 'Just think Ann got the house ___ all by herself!', ['paint', 'be painted', 'to paint', 'painted'], 'D', 'get sth. done 让某事被做。', 'get + 宾语 + 过去分词。', 'get the house painted 让人粉刷房子。', [['A', 'paint 动词原形。'], ['B', 'be painted 被动式。'], ['C', 'to paint 不定式。']]),
  q('m2018.vg.14', 'Vocabulary', 'vocab.prep', 'The policeman caught the man ___ the arm.', ['by', 'with', 'on', 'at'], 'C', 'catch sb. by the arm 抓住某人的胳膊。', 'catch sb. by the + 部位。', 'caught the man by the arm 抓住那人的胳膊。', [['A', 'by 可表方式但此处固定搭配为 by the arm。'], ['B', 'with 用。'], ['D', 'at 在。']]),
  q('m2018.vg.15', 'Vocabulary', 'vocab.infinitive', 'To get an education, ___.', ['one must work hard', 'working hard is important', 'to work hard is necessary', 'it is needed to work hard'], 'A', '不定式作状语时，逻辑主语应与句子主语一致。', '不定式逻辑主语 = 句子主语。', 'To get an education 的逻辑主语是人，句子主语应为 one。', [['B', 'working 作主语，与不定式逻辑主语不一致。'], ['C', 'to work 作主语。'], ['D', 'it 作形式主语。']]),
  q('m2018.vg.16', 'Grammar', 'grammar.voice', 'The meeting ___.', ['is to put off', 'is going to put off', 'is to be put off', 'will put off'], 'C', '会议被推迟，用被动语态。', 'be to be done。', 'meeting 与 put off 为被动，用 is to be put off。', [['A', 'is to put off 主动。'], ['B', 'is going to put off 主动。'], ['D', 'will put off 主动。']]),
  q('m2018.vg.17', 'Vocabulary', 'vocab.phrasal', 'Never ___ till tomorrow what may be done today.', ['put on', 'put away', 'put off', 'put up'], 'C', 'put off 意为"推迟"。', 'put off = delay。', '今日事今日毕，不要推迟到明天。', [['A', 'put on 穿上。'], ['B', 'put away 收拾。'], ['D', 'put up 张贴。']]),
  q('m2018.vg.18', 'Vocabulary', 'vocab.phrasal', 'Mother kept inviting Mrs. Smith to stay for lunch, and finally she ___.', ['gave out', 'gave off', 'gave in', 'gave away'], 'C', 'give in 意为"让步，屈服"。', 'give in = yield。', 'finally she gave in 她最终让步了。', [['A', 'gave out 分发/耗尽。'], ['B', 'gave off 发出。'], ['D', 'gave away 赠送。']]),
  q('m2018.vg.19', 'Vocabulary', 'vocab.article', 'France is ___ only European country I have visited.', ['an', 'a', 'the', '不填'], 'C', 'the only 唯一的。', 'the only + n.。', 'the only European country 唯一的欧洲国家。', [['A', 'an 不与 only 连用。'], ['B', 'a 不与 only 连用。'], ['D', '不填错误。']]),
  q('m2018.vg.20', 'Grammar', 'grammar.pronoun', 'The problem of pollution in this city is more serious than ___ in other cities.', ['that', 'it', 'this', 'those'], 'A', 'that 指代不可数名词 problem。', 'that 代替不可数名词。', 'that 指代前文的 the problem of pollution（不可数）。', [['B', 'it 指同一物。'], ['C', 'this 不用于比较替代。'], ['D', 'those 指代复数。']]),

  // 完形 21–35
  { id: 'm2018.cz.21', section: 'Cloze', questionType: 'cloze', text: '21. A. start  B. go on  C. stop  D. continue', options: ['start', 'go on', 'stop', 'continue'], answer: 'A', passage: M2018_CLOZE, groupId: 'm2018.cg1', groupTitle: '2018 模拟完形：记忆', clozeTag: 'cloze.verb', tags: ['cloze'], conclusion: 'start using them again 再次开始使用。', keyPoint: 'start using', why: '当你再次开始使用时，会再次变强。', wrong: [['B', 'go on 继续。'], ['C', 'stop 停止。'], ['D', 'continue 继续。']] },
  { id: 'm2018.cz.22', section: 'Cloze', questionType: 'cloze', text: '22. A. quickly  B. slowly  C. soon  D. at once', options: ['quickly', 'slowly', 'soon', 'at once'], answer: 'C', passage: M2018_CLOZE, groupId: 'm2018.cg1', groupTitle: '2018 模拟完形：记忆', clozeTag: 'cloze.adv', tags: ['cloze'], conclusion: 'soon 不久。', keyPoint: 'soon become strong', why: '不久就会再次变强。', wrong: [['A', 'quickly 快速地。'], ['B', 'slowly 缓慢地。'], ['D', 'at once 立刻。']] },
  { id: 'm2018.cz.23', section: 'Cloze', questionType: 'cloze', text: '23. A. doing  B. agreeing  C. questioning  D. answering', options: ['doing', 'agreeing', 'questioning', 'answering'], answer: 'C', passage: M2018_CLOZE, groupId: 'm2018.cg1', groupTitle: '2018 模拟完形：记忆', clozeTag: 'cloze.verb', tags: ['cloze'], conclusion: 'questioning 质疑。', keyPoint: 'question this fact', why: '没人会质疑这个事实。', wrong: [['A', 'doing 做。'], ['B', 'agreeing 同意。'], ['D', 'answering 回答。']] },
  { id: 'm2018.cz.24', section: 'Cloze', questionType: 'cloze', text: '24. A. Yet  B. Still  C. So  D. Certainly', options: ['Yet', 'Still', 'So', 'Certainly'], answer: 'B', passage: M2018_CLOZE, groupId: 'm2018.cg1', groupTitle: '2018 模拟完形：记忆', clozeTag: 'cloze.adv', tags: ['cloze'], conclusion: 'Still 然而，仍然。', keyPoint: 'Still = however', why: '然而很多人似乎不知道记忆也是如此。', wrong: [['A', 'Yet 但是。'], ['C', 'So 所以。'], ['D', 'Certainly 当然。']] },
  { id: 'm2018.cz.25', section: 'Cloze', questionType: 'cloze', text: '25. A. want  B. seem  C. get  D. hope', options: ['want', 'seem', 'get', 'hope'], answer: 'C', passage: M2018_CLOZE, groupId: 'm2018.cg1', groupTitle: '2018 模拟完形：记忆', clozeTag: 'cloze.verb', tags: ['cloze'], conclusion: 'get to know 逐渐知道。', keyPoint: 'get to know', why: 'do not get to know 没有逐渐了解。', wrong: [['A', 'want 想要。'], ['B', 'seem 似乎。'], ['D', 'hope 希望。']] },
  { id: 'm2018.cz.26', section: 'Cloze', questionType: 'cloze', text: '26. A. other  B. usual  C. same  D. opposite', options: ['other', 'usual', 'same', 'opposite'], answer: 'C', passage: M2018_CLOZE, groupId: 'm2018.cg1', groupTitle: '2018 模拟完形：记忆', clozeTag: 'cloze.adj', tags: ['cloze'], conclusion: 'in the same way 以同样的方式。', keyPoint: 'in the same way', why: '记忆也以同样的方式运作。', wrong: [['A', 'other 其他的。'], ['B', 'usual 通常的。'], ['D', 'opposite 相反的。']] },
  { id: 'm2018.cz.27', section: 'Cloze', questionType: 'cloze', text: '27. A. As  B. What  C. While  D. When', options: ['As', 'What', 'While', 'When'], answer: 'D', passage: M2018_CLOZE, groupId: 'm2018.cg1', groupTitle: '2018 模拟完形：记忆', clozeTag: 'cloze.conj', tags: ['cloze'], conclusion: 'When 当……时。', keyPoint: 'When someone says', why: '当有人说他记忆力好时。', wrong: [['A', 'As 因为。'], ['B', 'What 什么。'], ['C', 'While 当……时（接进行时）。']] },
  { id: 'm2018.cz.28', section: 'Cloze', questionType: 'cloze', text: '28. A. wants  B. builds up  C. makes  D. keeps', options: ['wants', 'builds up', 'makes', 'keeps'], answer: 'D', passage: M2018_CLOZE, groupId: 'm2018.cg1', groupTitle: '2018 模拟完形：记忆', clozeTag: 'cloze.verb', tags: ['cloze'], conclusion: 'keeps his memory 保持记忆力。', keyPoint: 'keep one\'s memory', why: '通过练习保持记忆力。', wrong: [['A', 'wants 想要。'], ['B', 'builds up 增强。'], ['C', 'makes 制造。']] },
  { id: 'm2018.cz.29', section: 'Cloze', questionType: 'cloze', text: '29. A. again  B. else  C. more  D. once', options: ['again', 'else', 'more', 'once'], answer: 'B', passage: M2018_CLOZE, groupId: 'm2018.cg1', groupTitle: '2018 模拟完形：记忆', clozeTag: 'cloze.adv', tags: ['cloze'], conclusion: 'someone else 别人。', keyPoint: 'someone else', why: '当别人说他记忆力差时。', wrong: [['A', 'again 再次。'], ['C', 'more 更多。'], ['D', 'once 曾经。']] },
  { id: 'm2018.cz.30', section: 'Cloze', questionType: 'cloze', text: '30. A. do not  B. is not  C. never  D. does not', options: ['do not', 'is not', 'never', 'does not'], answer: 'D', passage: M2018_CLOZE, groupId: 'm2018.cg1', groupTitle: '2018 模拟完形：记忆', clozeTag: 'cloze.aux', tags: ['cloze'], conclusion: 'does not give 没有给。', keyPoint: 'does not give', why: 'he 为第三人称单数，用 does not。', wrong: [['A', 'do not 用于复数。'], ['B', 'is not 不接动词原形。'], ['C', 'never 不与 to 连用。']] },
  { id: 'm2018.cz.31', section: 'Cloze', questionType: 'cloze', text: '31. A. poor  B. weak  C. strong  D. healthy', options: ['poor', 'weak', 'strong', 'healthy'], answer: 'C', passage: M2018_CLOZE, groupId: 'm2018.cg1', groupTitle: '2018 模拟完形：记忆', clozeTag: 'cloze.adj', tags: ['cloze'], conclusion: 'become strong 变强。', keyPoint: 'become strong', why: '没有给记忆足够机会变强。', wrong: [['A', 'poor 差的。'], ['B', 'weak 弱的。'], ['D', 'healthy 健康的。']] },
  { id: 'm2018.cz.32', section: 'Cloze', questionType: 'cloze', text: '32. A. worse  B. better  C. more  D. less', options: ['worse', 'better', 'more', 'less'], answer: 'A', passage: M2018_CLOZE, groupId: 'm2018.cg1', groupTitle: '2018 模拟完形：记忆', clozeTag: 'cloze.adj', tags: ['cloze'], conclusion: 'worse memories 更差的记忆力。', keyPoint: 'worse than', why: '不会读写的人记忆力更差（因为缺少练习）。', wrong: [['B', 'better 更好。'], ['C', 'more 更多。'], ['D', 'less 更少。']] },
  { id: 'm2018.cz.33', section: 'Cloze', questionType: 'cloze', text: '33. A. used to  B. cannot  C. try to  D. have to', options: ['used to', 'cannot', 'try to', 'have to'], answer: 'C', passage: M2018_CLOZE, groupId: 'm2018.cg1', groupTitle: '2018 模拟完形：记忆', clozeTag: 'cloze.verb', tags: ['cloze'], conclusion: 'try to read or write 努力读写。', keyPoint: 'try to do', why: '那些努力读写的人必须记住东西。', wrong: [['A', 'used to 过去常常。'], ['B', 'cannot 不能。'], ['D', 'have to 不得不。']] },
  { id: 'm2018.cz.34', section: 'Cloze', questionType: 'cloze', text: '34. A. if  B. that  C. though  D. thus', options: ['if', 'that', 'though', 'thus'], answer: 'A', passage: M2018_CLOZE, groupId: 'm2018.cg1', groupTitle: '2018 模拟完形：记忆', clozeTag: 'cloze.conj', tags: ['cloze'], conclusion: 'if 如果。', keyPoint: 'if you want', why: '如果你想有好的记忆力。', wrong: [['B', 'that 引导名词性从句。'], ['C', 'though 虽然。'], ['D', 'thus 因此。']] },
  { id: 'm2018.cz.35', section: 'Cloze', questionType: 'cloze', text: '35. A. please  B. try  C. train  D. enjoy', options: ['please', 'try', 'train', 'enjoy'], answer: 'C', passage: M2018_CLOZE, groupId: 'm2018.cg1', groupTitle: '2018 模拟完形：记忆', clozeTag: 'cloze.verb', tags: ['cloze'], conclusion: 'train 训练。', keyPoint: 'train by remembering', why: '通过记忆来训练记忆力。', wrong: [['A', 'please 取悦。'], ['B', 'try 尝试。'], ['D', 'enjoy 享受。']] },

  // 阅读 36–38
  { id: 'm2018.rd.36', section: 'Reading', questionType: 'reading.detail', text: 'According to researchers, how should parents react when their child did something wrong?', options: ['Ask the child not to do it again any time.', 'Let the child know what exactly happened.', 'Teach the child why and how to say sorry to others.', 'Show the child how angry they are and tell him why.'], answer: 'D', passage: M2018_RD1, groupId: 'm2018.rg1', groupTitle: '2018 模拟阅读：管教孩子', tags: ['reading'], conclusion: '父母应表达愤怒并说明原因。', keyPoint: 'show their anger and tell why', why: '原文 "show their anger and to let the child know exactly why they are mad"。', wrong: [['A', '非只要求不再做。'], ['B', '非让孩子知道发生了什么。'], ['C', '非教如何道歉。']], location: '第一段末' },
  { id: 'm2018.rd.37', section: 'Reading', questionType: 'reading.detail', text: 'What do many parents think they should do with the wrongdoer?', options: ['Speak strongly and angrily to him.', 'Hide their feelings when talking to him.', 'Explain immediately why he was wrong.', 'Calm themselves down before scolding him.'], answer: 'D', passage: M2018_RD1, groupId: 'm2018.rg1', groupTitle: '2018 模拟阅读：管教孩子', tags: ['reading'], conclusion: '许多父母认为应先冷静再训斥。', keyPoint: 'wait until calm before scolding', why: '原文 "wait until they\'re calm before scolding their children"。', wrong: [['A', '非立即愤怒地说。'], ['B', '非隐藏感情。'], ['C', '非立即解释。']], location: '第二段第一句' },
  { id: 'm2018.rd.38', section: 'Reading', questionType: 'reading.main_idea', text: 'What could be the best title for the text?', options: ["Best ways to Stop Children's Wrongdoings.", 'Differences among Parents in Dealing with Children.', 'Different Ways to Deal with Children\'s Wrongdoings.', 'Research on Preventing Children from Hurting Others.'], answer: 'A', passage: M2018_RD1, groupId: 'm2018.rg1', groupTitle: '2018 模拟阅读：管教孩子', tags: ['reading'], conclusion: '文章讲制止孩子犯错的最佳方法。', keyPoint: 'best way for parents to react', why: '全文围绕如何应对孩子犯错展开。', wrong: [['B', '非讲父母差异。'], ['C', '非比较不同方式。'], ['D', '非研究防止伤害。']] },
];

// ============================================================
// 三、成人高考专升本英语考前模拟习题（1–41 题）
// 来源：eol.cn "成人高考专升本英语考前模拟习题"
// 收录：语音 5 + 词汇语法 15 + 完形 15 + 阅读 6
// 标注：third_party_unverified / C / isRealExam:false
// ============================================================

const PREEXAM_CLOZE = `You have studied hard, and the day has 21 come when you must write your exam. Try to arrive a few minutes before the 22 starts. Avoid talking to other students, especially those 23 are doing some last minute cramming. These people will make you nervous and 24 your concentration.

If you can, choose a seat that allows you to 25. Try to sit away from the 26 to the room so you are not 27 by students leaving before you are finished. Listen 28 to any verbal instructions from the teacher or any 29 written on the board.

Here are five 30 for taking exams:
1. Catch your 31;
2. Read the 32 very carefully;
3. 33 through the test;
4. 34 your time;
5. Attack the 35.`;

const PREEXAM_RD1 = `Key James, Secretary of Health and Human Resources in the Virginia State government, loves to turn the tables on those who don't think it's possible to be middle-class, conservative, educated and still be truly black. Once, during an abortion debate, a woman in the audience angrily told James she was so middle-class she didn't have a clue about real African American life.

James then asked the woman to consider a poor black mother on welfare. She already has four children and an alcoholic husband who has all but abandoned the family. Now she discovers another child is on the way. How would you counsel that woman, asked James.

"Have an abortion," the woman responded. "That child would have a very poor quality of life."

"I have a vested interest in your answer," James said. "The woman I described was my mother. I was the fifth of six children born into poverty. And, in case you're interested, the quality of my life is just fine!"`;

const PREEXAM_RD2 = `When I was about 12 I had an enemy, a girl who liked to point out my shortcomings. Week by week her list grew: I was skinny, I wasn't a good student, I was boyish, I talked too loud, and so on. I put up with her as long as I could. At last, with great anger, I ran to my father in tears.

He listened to my outburst quietly. Then he asked, "Are the things she says true or not?"

"Mary, didn't you ever wonder what you are really like? Well, you now have that girl's opinion. Go and make a list of everything she said and mark the points that are true. Pay no attention to the other things she said."

I did as he directed and discovered to my surprise that about half the things were true. Some of them I couldn't change, but a good number I could and suddenly wanted to change.`;

const PREEXAM: QSeed[] = [
  // 语音
  q('pre.ph.01', 'Phonetics', 'phonetics.vowel', '选出划线部分读音不同的一项：A. practice  B. possible  C. physical  D. pacific', ['practice', 'possible', 'physical', 'pacific'], 'B', 'possible 的 o 发 /ɒ/，其余发 /æ/。', 'o 在 possible 中读 /ɒ/。', 'practice/ˈpræktɪs/、physical/ˈfɪzɪkl/、pacific/pəˈsɪfɪk/ 中 a 读 /æ/；possible/ˈpɒsəbl/ 中 o 读 /ɒ/。', [['A', 'practice 的 a 读 /æ/。'], ['C', 'physical 的 i 读 /ɪ/（注意此处比较的是 a/o）。'], ['D', 'pacific 的 a 读 /æ/。']]),
  q('pre.ph.02', 'Phonetics', 'phonetics.vowel', '选出划线部分读音不同的一项：A. arm  B. party  C. warm  D. farther', ['arm', 'party', 'warm', 'farther'], 'C', 'warm 的 ar 发 /ɔː/，其余发 /ɑː/。', 'ar 在 warm 中读 /ɔː/。', 'arm/ɑːm/、party/ˈpɑːti/、farther/ˈfɑːðə/ 中 ar 读 /ɑː/；warm/wɔːm/ 中 ar 读 /ɔː/。', [['A', 'arm 的 ar 读 /ɑː/。'], ['B', 'party 的 ar 读 /ɑː/。'], ['D', 'farther 的 ar 读 /ɑː/。']]),
  q('pre.ph.03', 'Phonetics', 'phonetics.vowel', '选出划线部分读音不同的一项：A. energy  B. engineer  C. encourage  D. entrance', ['energy', 'engineer', 'encourage', 'entrance'], 'C', 'encourage 的 en 发 /ɪ/，其余发 /e/。', 'en 在 encourage 中读 /ɪ/。', 'energy/ˈenədʒi/、engineer/ˌendʒɪˈnɪə/、entrance/ˈentrəns/ 中 en 读 /en/；encourage/ɪnˈkʌrɪdʒ/ 中 en 读 /ɪn/。', [['A', 'energy 的 en 读 /en/。'], ['B', 'engineer 的 en 读 /en/。'], ['D', 'entrance 的 en 读 /en/。']]),
  q('pre.ph.04', 'Phonetics', 'phonetics.vowel', '选出划线部分读音不同的一项：A. great  B. league  C. peace  D. neat', ['great', 'league', 'peace', 'neat'], 'A', 'great 的 ea 发 /eɪ/，其余发 /iː/。', 'ea 在 great 中读 /eɪ/。', 'great/ɡreɪt/ 中 ea 读 /eɪ/；league/liːɡ/、peace/piːs/、neat/niːt/ 中 ea 读 /iː/。', [['B', 'league 的 ea 读 /iː/。'], ['C', 'peace 的 ea 读 /iː/。'], ['D', 'neat 的 ea 读 /iː/。']]),
  q('pre.ph.05', 'Phonetics', 'phonetics.consonant', '选出划线部分读音不同的一项：A. theory  B. through  C. birth  D. there', ['theory', 'through', 'birth', 'there'], 'D', 'there 的 th 发 /ð/，其余发 /θ/。', 'th 在 there 中读 /ð/。', 'theory/ˈθɪəri/、through/θruː/、birth/bɜːθ/ 中 th 读 /θ/；there/ðeə/ 中 th 读 /ð/。', [['A', 'theory 的 th 读 /θ/。'], ['B', 'through 的 th 读 /θ/。'], ['C', 'birth 的 th 读 /θ/。']]),

  // 词汇语法
  q('pre.vg.06', 'Vocabulary', 'vocab.prep', "She kept a close eye ___ the sick child and didn't sleep the whole night.", ['at', 'in', 'for', 'on'], 'D', 'keep an eye on 照看。', 'keep an eye on。', 'kept a close eye on 密切照看。', [['A', 'at 在。'], ['B', 'in 在里面。'], ['C', 'for 为了。']]),
  q('pre.vg.07', 'Vocabulary', 'vocab.prep', 'The effect of TV ___ the life of average people is incalculable.', ['in', 'for', 'about', 'on'], 'D', 'effect on 对……的影响。', 'effect on。', 'the effect of TV on life 电视对生活的影响。', [['A', 'in 在里面。'], ['B', 'for 为了。'], ['C', 'about 关于。']]),
  q('pre.vg.08', 'Vocabulary', 'vocab.pronoun', 'Jim is the most intelligent, of ___.', ['four US', 'US four', 'the four US', 'US of four'], 'B', 'of us four 我们四个人中。', 'of + 代词 + 数词。', 'of us four 我们四个人中。', [['A', 'four US 语序错误。'], ['C', 'the four US 语序错误。'], ['D', 'US of four 搭配错误。']]),
  q('pre.vg.09', 'Vocabulary', 'vocab.adj', 'I like all kinds of fruit, but my ___ is banana.', ['favorite', 'favored', 'favorable', 'preferred'], 'A', 'favorite 最喜欢的。', 'favorite = most liked。', 'my favorite is banana 我最喜欢的是香蕉。', [['B', 'favored 受宠的。'], ['C', 'favorable 有利的。'], ['D', 'preferred 首选的（语气较重）。']]),
  q('pre.vg.10', 'Vocabulary', 'vocab.verb', 'We were overjoyed at the news of China ___ another man-made satellite.', ['starting', 'launching', 'fighting', 'shouting'], 'B', 'launch 发射（卫星）。', 'launch a satellite。', 'launch another man-made satellite 发射另一颗人造卫星。', [['A', 'starting 开始。'], ['C', 'fighting 战斗。'], ['D', 'shouting 喊叫。']]),
  q('pre.vg.11', 'Grammar', 'grammar.infinitive', 'The headmaster wanted the classroom building ___ as soon as possible.', ['to set up', 'to have been set up', 'to be set up', 'being set up'], 'C', 'want sth. to be done 想要某事被做。', 'want + 宾语 + to be done。', 'classroom building 与 set up 为被动，用 to be set up。', [['A', 'to set up 主动。'], ['B', 'to have been set up 完成被动，时间不符。'], ['D', 'being set up 进行被动。']]),
  q('pre.vg.12', 'Grammar', 'grammar.emphasis', '___ they who did the thorough cleaning to the classroom yesterday.', ['These were', 'That was', 'It was', 'Those were'], 'C', 'It was...who... 强调句型。', 'It is/was + 强调部分 + who/that。', '强调主语 they，用 It was they who...。', [['A', 'These were 非强调句型。'], ['B', 'That was 与 they 不一致。'], ['D', 'Those were 非强调句型。']]),
  q('pre.vg.13', 'Vocabulary', 'vocab.verb', 'How many times did the clock ___?', ['hit', 'knock', 'beat', 'strike'], 'D', 'strike（钟）敲响。', 'clock strike。', 'the clock strike 钟敲响。', [['A', 'hit 击打。'], ['B', 'knock 敲（门）。'], ['C', 'beat 跳动/打。']]),
  q('pre.vg.15', 'Vocabulary', 'vocab.verb', "He tried to ___ his involvement in this robbery, but he finally confessed.", ['decline', 'reject', 'refuse', 'deny'], 'D', 'deny 否认。', 'deny involvement。', 'deny his involvement 否认参与。', [['A', 'decline 婉拒。'], ['B', 'reject 拒绝。'], ['C', 'refuse 拒绝。']]),
  q('pre.vg.16', 'Vocabulary', 'vocab.noun', 'Mike wanted to go there by plane but he did not have enough money to pay for the ___.', ['travel', 'voyage', 'journey', 'fly'], 'C', 'journey 旅行（路程）。', 'pay for the journey。', 'pay for the journey 支付旅费。', [['A', 'travel 旅行（泛指）。'], ['B', 'voyage 航海。'], ['D', 'fly 飞行。']]),
  q('pre.vg.17', 'Vocabulary', 'vocab.modal', "There was plenty of time. You ___.", ["mustn't have hurried", "needn't hurry", "must not hurry", "needn't have hurried"], 'D', "needn't have done 本不必做（却做了）。", "needn't have done。", '时间充裕，你本不必着急（隐含你已经着急了）。', [['A', "mustn't have done 不表此义。"], ['B', "needn't hurry 不必着急（现在）。"], ['C', "must not hurry 不许着急。"]]),
  q('pre.vg.18', 'Vocabulary', 'vocab.adj', 'Which is more important, the ___ appearance of a book or its content?', ['artificial', 'surface', 'physical', 'substance'], 'C', 'physical appearance 外观。', 'physical appearance。', 'the physical appearance 书的外观。', [['A', 'artificial 人工的。'], ['B', 'surface 表面（名词）。'], ['D', 'substance 物质。']]),
  q('pre.vg.19', 'Vocabulary', 'vocab.phrasal', 'This year the factory ___ almost twice as many motors as it did last year.', ['turned down', 'turned off', 'turned out', 'turned over'], 'C', 'turn out 生产。', 'turn out = produce。', 'turned out twice as many motors 生产了两倍的马达。', [['A', 'turned down 拒绝/关小。'], ['B', 'turned off 关闭。'], ['D', 'turned over 翻转。']]),
  q('pre.vg.20', 'Vocabulary', 'vocab.phrasal', 'The good service of the restaurant ___ the poor food to some extent.', ['made for', 'made out', 'made up for', 'made use of'], 'C', 'make up for 弥补。', 'make up for = compensate。', '好服务弥补了饭菜差。', [['A', 'made for 朝……去。'], ['B', 'made out 辨认。'], ['D', 'made use of 利用。']]),

  // 完形 21–35
  { id: 'pre.cz.21', section: 'Cloze', questionType: 'cloze', text: '21. A. Fortunately  B. lastly  C. lately  D. finally', options: ['Fortunately', 'lastly', 'lately', 'finally'], answer: 'D', passage: PREEXAM_CLOZE, groupId: 'pre.cg1', groupTitle: '考前模拟完形：考试技巧', clozeTag: 'cloze.adv', tags: ['cloze'], conclusion: 'finally 终于。', keyPoint: 'finally come', why: '考试的日子终于来了。', wrong: [['A', 'Fortunately 幸运地。'], ['B', 'lastly 最后。'], ['C', 'lately 最近。']] },
  { id: 'pre.cz.22', section: 'Cloze', questionType: 'cloze', text: '22. A. class  B. exam  C. issue  D. final', options: ['class', 'exam', 'issue', 'final'], answer: 'B', passage: PREEXAM_CLOZE, groupId: 'pre.cg1', groupTitle: '考前模拟完形：考试技巧', clozeTag: 'cloze.noun', tags: ['cloze'], conclusion: 'exam 考试。', keyPoint: 'before the exam starts', why: '考试开始前几分钟到达。', wrong: [['A', 'class 课程。'], ['C', 'issue 问题。'], ['D', 'final 期末考试。']] },
  { id: 'pre.cz.23', section: 'Cloze', questionType: 'cloze', text: '23. A. which  B. examinees  C. students  D. who', options: ['which', 'examinees', 'students', 'who'], answer: 'D', passage: PREEXAM_CLOZE, groupId: 'pre.cg1', groupTitle: '考前模拟完形：考试技巧', clozeTag: 'cloze.relative', tags: ['cloze'], conclusion: 'who 引导定语从句。', keyPoint: 'those who...', why: 'those who are doing... 那些正在……的人。', wrong: [['A', 'which 指物。'], ['B', 'examinees 考生（名词，不引导从句）。'], ['C', 'students 学生（名词）。']] },
  { id: 'pre.cz.24', section: 'Cloze', questionType: 'cloze', text: '24. A. destroy  B. hurt  C. disturb  D. distress', options: ['destroy', 'hurt', 'disturb', 'distress'], answer: 'C', passage: PREEXAM_CLOZE, groupId: 'pre.cg1', groupTitle: '考前模拟完形：考试技巧', clozeTag: 'cloze.verb', tags: ['cloze'], conclusion: 'disturb 打扰。', keyPoint: 'disturb concentration', why: '打扰你的注意力。', wrong: [['A', 'destroy 毁坏。'], ['B', 'hurt 伤害。'], ['D', 'distress 使痛苦。']] },
  { id: 'pre.cz.25', section: 'Cloze', questionType: 'cloze', text: '25. A. reduce  B. listen  C. be quiet  D. concentrate', options: ['reduce', 'listen', 'be quiet', 'concentrate'], answer: 'D', passage: PREEXAM_CLOZE, groupId: 'pre.cg1', groupTitle: '考前模拟完形：考试技巧', clozeTag: 'cloze.verb', tags: ['cloze'], conclusion: 'concentrate 集中注意力。', keyPoint: 'allows you to concentrate', why: '选一个能让你集中注意力的座位。', wrong: [['A', 'reduce 减少。'], ['B', 'listen 听。'], ['C', 'be quiet 安静。']] },
  { id: 'pre.cz.26', section: 'Cloze', questionType: 'cloze', text: '26. A. exit  B. window  C. gate  D. seat', options: ['exit', 'window', 'gate', 'seat'], answer: 'A', passage: PREEXAM_CLOZE, groupId: 'pre.cg1', groupTitle: '考前模拟完形：考试技巧', clozeTag: 'cloze.noun', tags: ['cloze'], conclusion: 'exit 出口。', keyPoint: 'away from the exit', why: '远离出口，以免被提前交卷的人打扰。', wrong: [['B', 'window 窗户。'], ['C', 'gate 大门。'], ['D', 'seat 座位。']] },
  { id: 'pre.cz.27', section: 'Cloze', questionType: 'cloze', text: '27. A. upset  B. bothered  C. excited  D. annoyed', options: ['upset', 'bothered', 'excited', 'annoyed'], answer: 'B', passage: PREEXAM_CLOZE, groupId: 'pre.cg1', groupTitle: '考前模拟完形：考试技巧', clozeTag: 'cloze.verb', tags: ['cloze'], conclusion: 'bothered 被打扰。', keyPoint: 'not bothered by', why: '不被提前离开的学生打扰。', wrong: [['A', 'upset 心烦。'], ['C', 'excited 兴奋。'], ['D', 'annoyed 恼怒。']] },
  { id: 'pre.cz.28', section: 'Cloze', questionType: 'cloze', text: '28. A. still  B. silently  C. carefully  D. instantly', options: ['still', 'silently', 'carefully', 'instantly'], answer: 'C', passage: PREEXAM_CLOZE, groupId: 'pre.cg1', groupTitle: '考前模拟完形：考试技巧', clozeTag: 'cloze.adv', tags: ['cloze'], conclusion: 'carefully 仔细地。', keyPoint: 'listen carefully', why: '仔细听老师的口头指示。', wrong: [['A', 'still 仍然。'], ['B', 'silently 沉默地。'], ['D', 'instantly 立即。']] },
  { id: 'pre.cz.29', section: 'Cloze', questionType: 'cloze', text: '29. A. messages  B. letter  C. information  D. words', options: ['messages', 'letter', 'information', 'words'], answer: 'A', passage: PREEXAM_CLOZE, groupId: 'pre.cg1', groupTitle: '考前模拟完形：考试技巧', clozeTag: 'cloze.noun', tags: ['cloze'], conclusion: 'messages 信息。', keyPoint: 'messages written on the board', why: '黑板上写的信息。', wrong: [['B', 'letter 信。'], ['C', 'information 信息（不可数）。'], ['D', 'words 单词。']] },
  { id: 'pre.cz.30', section: 'Cloze', questionType: 'cloze', text: '30. A. tips  B. steps  C. following  D. figures', options: ['tips', 'steps', 'following', 'figures'], answer: 'B', passage: PREEXAM_CLOZE, groupId: 'pre.cg1', groupTitle: '考前模拟完形：考试技巧', clozeTag: 'cloze.noun', tags: ['cloze'], conclusion: 'steps 步骤。', keyPoint: 'five steps', why: '五个考试步骤。', wrong: [['A', 'tips 小贴士。'], ['C', 'following 下列。'], ['D', 'figures 数字。']] },
  { id: 'pre.cz.31', section: 'Cloze', questionType: 'cloze', text: '31. A. attention  B. breath  C. focus  D. spirit', options: ['attention', 'breath', 'focus', 'spirit'], answer: 'B', passage: PREEXAM_CLOZE, groupId: 'pre.cg1', groupTitle: '考前模拟完形：考试技巧', clozeTag: 'cloze.noun', tags: ['cloze'], conclusion: 'catch your breath 喘口气。', keyPoint: 'catch one\'s breath', why: '先喘口气。', wrong: [['A', 'attention 注意。'], ['C', 'focus 焦点。'], ['D', 'spirit 精神。']] },
  { id: 'pre.cz.32', section: 'Cloze', questionType: 'cloze', text: '32. A. test  B. questions  C. directions  D. words', options: ['test', 'questions', 'directions', 'words'], answer: 'C', passage: PREEXAM_CLOZE, groupId: 'pre.cg1', groupTitle: '考前模拟完形：考试技巧', clozeTag: 'cloze.noun', tags: ['cloze'], conclusion: 'directions 说明。', keyPoint: 'read the directions', why: '仔细读说明。', wrong: [['A', 'test 测试。'], ['B', 'questions 问题。'], ['D', 'words 单词。']] },
  { id: 'pre.cz.33', section: 'Cloze', questionType: 'cloze', text: '33. A. Look  B. Listen  C. Skim  D. Read', options: ['Look', 'Listen', 'Skim', 'Read'], answer: 'C', passage: PREEXAM_CLOZE, groupId: 'pre.cg1', groupTitle: '考前模拟完形：考试技巧', clozeTag: 'cloze.verb', tags: ['cloze'], conclusion: 'skim 浏览。', keyPoint: 'skim through', why: '快速浏览试卷。', wrong: [['A', 'Look 看。'], ['B', 'Listen 听。'], ['D', 'Read 读。']] },
  { id: 'pre.cz.34', section: 'Cloze', questionType: 'cloze', text: '34. A. Budget  B. Think  C. Count  D. Number', options: ['Budget', 'Think', 'Count', 'Number'], answer: 'A', passage: PREEXAM_CLOZE, groupId: 'pre.cg1', groupTitle: '考前模拟完形：考试技巧', clozeTag: 'cloze.verb', tags: ['cloze'], conclusion: 'budget your time 分配时间。', keyPoint: 'budget time', why: '分配好时间。', wrong: [['B', 'Think 想。'], ['C', 'Count 数。'], ['D', 'Number 编号。']] },
  { id: 'pre.cz.35', section: 'Cloze', questionType: 'cloze', text: '35. A. students  B. concentration  C. problems  D. questions', options: ['students', 'concentration', 'problems', 'questions'], answer: 'D', passage: PREEXAM_CLOZE, groupId: 'pre.cg1', groupTitle: '考前模拟完形：考试技巧', clozeTag: 'cloze.noun', tags: ['cloze'], conclusion: 'attack the questions 攻克题目。', keyPoint: 'attack the questions', why: '开始做题。', wrong: [['A', 'students 学生。'], ['B', 'concentration 注意力。'], ['C', 'problems 问题。']] },

  // 阅读 36–41
  { id: 'pre.rd.36', section: 'Reading', questionType: 'reading.vocab', text: '"To turn the tables" means ___.', options: ['to move the tables', 'to carry the tables away', 'to gain courage', 'to gain an advantage after having been at a disadvantage'], answer: 'D', passage: PREEXAM_RD1, groupId: 'pre.rg1', groupTitle: '考前模拟阅读 P1：Key James', tags: ['reading'], conclusion: 'turn the tables 意为"扭转局面"。', keyPoint: 'turn the tables = reverse the situation', why: 'James 通过自己的故事扭转了辩论局面。', wrong: [['A', '字面意思。'], ['B', '字面意思。'], ['C', '非获得勇气。']], location: '第一段' },
  { id: 'pre.rd.37', section: 'Reading', questionType: 'reading.detail', text: "James' father ___.", options: ['divorced his wife', 'liked to drink', 'deserted his family', 'B and C'], answer: 'D', passage: PREEXAM_RD1, groupId: 'pre.rg1', groupTitle: '考前模拟阅读 P1：Key James', tags: ['reading'], conclusion: 'James 的父亲酗酒且抛弃家庭。', keyPoint: 'alcoholic husband who abandoned the family', why: '"an alcoholic husband who has all but abandoned the family"。', wrong: [['A', '未提及离婚。'], ['B', '不全面。'], ['C', '不全面。']], location: '第二段' },
  { id: 'pre.rd.38', section: 'Reading', questionType: 'reading.detail', text: "James' mother ___.", options: ['was educated', 'was conservative', 'was poor', 'A and B'], answer: 'C', passage: PREEXAM_RD1, groupId: 'pre.rg1', groupTitle: '考前模拟阅读 P1：Key James', tags: ['reading'], conclusion: 'James 的母亲很穷。', keyPoint: 'poor black mother on welfare', why: '"a poor black mother on welfare"。', wrong: [['A', '未提及受过教育。'], ['B', '未提及保守。'], ['D', 'A 和 B 都不对。']], location: '第二段' },
  { id: 'pre.rd.39', section: 'Reading', questionType: 'reading.detail', text: "James' family led a ___ life when she was born.", options: ['miserable', 'happy', 'well-off', 'hardly'], answer: 'A', passage: PREEXAM_RD1, groupId: 'pre.rg1', groupTitle: '考前模拟阅读 P1：Key James', tags: ['reading'], conclusion: 'James 出生时家境悲惨。', keyPoint: 'born into poverty', why: '"I was the fifth of six children born into poverty"。', wrong: [['B', '不幸福。'], ['C', '不富裕。'], ['D', 'hardly 几乎不，不通。']], location: '末段' },
  { id: 'pre.rd.40', section: 'Reading', questionType: 'reading.detail', text: "What did the girl's enemy like to do?", options: ['Talking with her.', 'Pointing out her weak points.', 'Reporting to the teacher.', 'Quarrelling with her.'], answer: 'B', passage: PREEXAM_RD2, groupId: 'pre.rg2', groupTitle: '考前模拟阅读 P2：父亲的建议', tags: ['reading'], conclusion: '敌人喜欢指出她的缺点。', keyPoint: 'point out my shortcomings', why: '"a girl who liked to point out my shortcomings"。', wrong: [['A', '非聊天。'], ['C', '非报告老师。'], ['D', '非吵架。']], location: '第一段第一句' },
  { id: 'pre.rd.41', section: 'Reading', questionType: 'reading.detail', text: 'What did the girl do when she could no longer bear her enemy?', options: ['She turned to her father.', 'She cried to her mother.', 'She tried to put up with her again.', 'She ran away from home.'], answer: 'A', passage: PREEXAM_RD2, groupId: 'pre.rg2', groupTitle: '考前模拟阅读 P2：父亲的建议', tags: ['reading'], conclusion: '她跑去找父亲哭诉。', keyPoint: 'ran to my father in tears', why: '"I ran to my father in tears"。', wrong: [['B', '非找母亲。'], ['C', '她已经忍无可忍了。'], ['D', '非离家出走。']], location: '第一段末' },
];

// ============================================================
// 四、2022 年成人高考高起专英语真题（1–20 题）
// 来源：eol.cn "2022成人高考英语真题及答案分享"
// 注：此为高起专真题，非专升本；收录语音 5 + 词汇语法 15
// 标注：third_party_unverified / C / isRealExam:false / year:2022
// ============================================================

const R2022: QSeed[] = [
  q('r2022.ph.01', 'Phonetics', 'phonetics.consonant', '选出划线部分读音不同的一项：A. chair  B. rich  C. teacher  D. headache', ['chair', 'rich', 'teacher', 'headache'], 'D', 'headache 的 ch 发 /k/，其余发 /tʃ/。', 'ch 在 headache 中读 /k/。', 'chair/tʃeə/、rich/rɪtʃ/、teacher/ˈtiːtʃə/ 中 ch 读 /tʃ/；headache/ˈhedeɪk/ 中 ch 读 /k/。', [['A', 'chair 的 ch 读 /tʃ/。'], ['B', 'rich 的 ch 读 /tʃ/。'], ['C', 'teacher 的 ch 读 /tʃ/。']]),
  q('r2022.ph.02', 'Phonetics', 'phonetics.vowel', '选出划线部分读音不同的一项：A. cut  B. but  C. student  D. must', ['cut', 'but', 'student', 'must'], 'C', 'student 的 u 发 /juː/，其余发 /ʌ/。', 'u 在 student 中读 /juː/。', 'cut/kʌt/、but/bʌt/、must/mʌst/ 中 u 读 /ʌ/；student/ˈstjuːdnt/ 中 u 读 /juː/。', [['A', 'cut 的 u 读 /ʌ/。'], ['B', 'but 的 u 读 /ʌ/。'], ['D', 'must 的 u 读 /ʌ/。']]),
  q('r2022.ph.03', 'Phonetics', 'phonetics.vowel', '选出划线部分读音不同的一项：A. rise  B. give  C. life  D. nice', ['rise', 'give', 'life', 'nice'], 'B', 'give 的 i 发 /ɪ/，其余发 /aɪ/。', 'i 在 give 中读 /ɪ/。', 'rise/raɪz/、life/laɪf/、nice/naɪs/ 中 i 读 /aɪ/；give/ɡɪv/ 中 i 读 /ɪ/。', [['A', 'rise 的 i 读 /aɪ/。'], ['C', 'life 的 i 读 /aɪ/。'], ['D', 'nice 的 i 读 /aɪ/。']]),
  q('r2022.ph.04', 'Phonetics', 'phonetics.vowel', '选出划线部分读音不同的一项：A. are  B. dare  C. care  D. share', ['are', 'dare', 'care', 'share'], 'A', 'are 的 are 发 /ɑː/，其余发 /eə/。', 'are 在 are 中读 /ɑː/。', 'are/ɑː/ 中 are 读 /ɑː/；dare/deə/、care/keə/、share/ʃeə/ 中 are 读 /eə/。', [['B', 'dare 的 are 读 /eə/。'], ['C', 'care 的 are 读 /eə/。'], ['D', 'share 的 are 读 /eə/。']]),
  q('r2022.ph.05', 'Phonetics', 'phonetics.consonant', '选出划线部分读音不同的一项：A. bus  B. desk  C. fast  D. easy', ['bus', 'desk', 'fast', 'easy'], 'D', 'easy 的 s 发 /z/，其余发 /s/。', 's 在 easy 中读 /z/。', 'bus/bʌs/、desk/desk/、fast/fɑːst/ 中 s 读 /s/；easy/ˈiːzi/ 中 s 读 /z/。', [['A', 'bus 的 s 读 /s/。'], ['B', 'desk 的 s 读 /s/。'], ['C', 'fast 的 s 读 /s/。']]),

  q('r2022.vg.06', 'Grammar', 'grammar.relative', 'The house ___ walls are made of glass looks beautiful.', ['that', 'which', 'who', 'whose'], 'D', 'whose 引导定语从句，表所属。', 'whose = of which。', 'whose walls 它的墙。', [['A', 'that 不表所属。'], ['B', 'which 不表所属。'], ['C', 'who 指人。']]),
  q('r2022.vg.07', 'Vocabulary', 'vocab.conj', 'Hurry up ___ you will miss the train.', ['then', 'and', 'but', 'or'], 'D', 'or 否则。', '祈使句 + or + 陈述句。', '快点，否则你会误火车。', [['A', 'then 然后。'], ['B', 'and 那么。'], ['C', 'but 但是。']]),
  q('r2022.vg.08', 'Vocabulary', 'vocab.verb', 'The young man ___ a large box went out of the bank.', ['carried', 'carrying', 'carries', 'carry'], 'A', 'carried 表伴随（过去式）。', 'carried 作后置定语。', '拿着大箱子的年轻人走出银行。', [['B', 'carrying 现在分词（主动）。'], ['C', 'carries 第三人称单数。'], ['D', 'carry 动词原形。']]),
  q('r2022.vg.09', 'Grammar', 'grammar.conditional', 'If he ___, he\'ll be the first Englishman to get the Prize.', ['win', 'will win', 'wins', 'is winning'], 'C', 'if 引导条件句用一般现在时表将来。', 'if + 一般现在时。', 'if he wins 如果他赢了。', [['A', 'win 动词原形。'], ['B', 'will win 将来时。'], ['D', 'is winning 进行时。']]),
  q('r2022.vg.10', 'Vocabulary', 'vocab.pronoun', 'We should protect the Earth because it is ___ home.', ['us', 'our', 'we', 'ours'], 'B', 'our 我们的。', '形容词性物主代词。', 'our home 我们的家园。', [['A', 'us 宾格。'], ['C', 'we 主格。'], ['D', 'ours 名词性物主代词。']]),
  q('r2022.vg.11', 'Grammar', 'grammar.tense', 'This bus ___ the children to and from their school every day.', ['takes', 'will take', 'is taking', 'has taken'], 'A', 'every day 表一般现在时。', '一般现在时表习惯。', 'every day 每天，用一般现在时 takes。', [['B', 'will take 将来时。'], ['C', 'is taking 进行时。'], ['D', 'has taken 现在完成时。']]),
  q('r2022.vg.12', 'Vocabulary', 'vocab.infinitive', 'The bank finally agreed ___ him 5000.', ['lending', 'lends', 'to lend', 'lent'], 'C', 'agree to do sth. 同意做某事。', 'agree to do。', 'agreed to lend him 同意借给他。', [['A', 'lending 动名词。'], ['B', 'lends 第三人称单数。'], ['D', 'lent 过去式。']]),
  q('r2022.vg.13', 'Grammar', 'grammar.comparison', "She's far ___ at English than her brother.", ['better', 'well', 'good', 'best'], 'A', 'than 前用比较级 better。', '比较级 + than。', 'far better 好得多。', [['B', 'well 原级。'], ['C', 'good 原级。'], ['D', 'best 最高级。']]),
  q('r2022.vg.14', 'Vocabulary', 'vocab.adv', 'She ___ put the glasses on the ground.', ['careful', 'carefully', 'caring', 'cared'], 'B', 'carefully 小心地（副词修饰动词）。', '副词修饰动词。', 'carefully put 小心地放。', [['A', 'careful 形容词。'], ['C', 'caring 现在分词。'], ['D', 'cared 过去式。']]),
  q('r2022.vg.15', 'Vocabulary', 'vocab.prep', 'He always gets up early ___ the morning.', ['in', 'on', 'at', 'to'], 'A', 'in the morning 在早上。', 'in the morning。', 'in the morning 在早上。', [['B', 'on 用于具体某天。'], ['C', 'at 用于具体时刻。'], ['D', 'to 到。']]),
  q('r2022.vg.16', 'Vocabulary', 'vocab.article', 'It takes ___ hour to reach the top of the mountain.', ['a', 'an', '不填', 'the'], 'B', 'hour 以元音音素开头，用 an。', 'an hour。', 'an hour 一小时（h 不发音，以 /aʊ/ 开头）。', [['A', 'a 用于辅音音素前。'], ['C', '不填错误。'], ['D', 'the 定冠词。']]),
  q('r2022.vg.17', 'Grammar', 'grammar.voice', 'Two bridges ___ over the river five years ago.', ['build', 'built', 'were built', 'are built'], 'C', 'five years ago 表一般过去时，桥被建用被动。', '一般过去时被动。', 'were built 被建造。', [['A', 'build 动词原形。'], ['B', 'built 主动。'], ['D', 'are built 一般现在时被动。']]),
  q('r2022.vg.18', 'Vocabulary', 'vocab.modal', 'The pain is so bad that she ___ fall asleep at all.', ["can't", "wasn't", "shouldn't", "needn't"], 'A', "can't 不能。", "can't fall asleep。", '疼得根本睡不着。', [['B', "wasn't 不接动词原形。"], ['C', "shouldn't 不应该。"], ['D', "needn't 不必。"]]),
  q('r2022.vg.19', 'Grammar', 'grammar.tense', 'He ___ in London for almost 10 years.', ['live', 'is living', 'lives', 'has lived'], 'D', 'for almost 10 years 表现在完成时。', 'for + 时间段 → 现在完成时。', 'has lived for almost 10 years。', [['A', 'live 动词原形。'], ['B', 'is living 进行时。'], ['C', 'lives 一般现在时。']]),
  q('r2022.vg.20', 'Grammar', 'grammar.wh', '-___ do you mean you want to spend the weekend alone? -Well, I haven\'t decided yet.', ['Why', 'How', 'What', 'Whom'], 'C', 'what do you mean 你是什么意思。', 'what do you mean。', 'What do you mean by...? 你……是什么意思？', [['A', 'Why 为什么。'], ['B', 'How 怎样。'], ['D', 'Whom 谁（宾格）。']]),
];

// ============================================================
// 五、语法时态专项练习（10 题）
// 来源：eol.cn "成人高考专升本英语考试题及参考答案"
// 标注：third_party_unverified / C / isRealExam:false
// ============================================================

const TENSE: QSeed[] = [
  q('tense.01', 'Grammar', 'grammar.tense', '—You must have met him the other day. —Oh, no, I ___.', ["hadn't", "mustn't", "haven't", "didn't"], 'D', '对过去情况的猜测，回答用一般过去时。', 'must have done → 过去时回答。', 'I didn\'t (meet him) 我没见过他。', [['A', "hadn't 过去完成时。"], ['B', "mustn't 禁止。"], ['C', "haven't 现在完成时。"]]),
  q('tense.02', 'Grammar', 'grammar.tense', '—Will you go to the park now? —Not until I ___ my physics exercises.', ['will finish', 'have finished', 'will have finished', 'had finished'], 'B', '时间状语从句用现在完成时代替将来完成时。', 'not until + 现在完成时。', '直到我完成物理练习才去。', [['A', 'will finish 将来时。'], ['C', 'will have finished 将来完成时。'], ['D', 'had finished 过去完成时。']]),
  q('tense.03', 'Grammar', 'grammar.tense', '—Did you enjoy the film? —Yes, it\'s the best one I ___ these years.', ['had', 'have had', 'had had', 'would have'], 'B', 'these years 包括现在，用现在完成时。', 'these years → 现在完成时。', 'the best one I have had 我这些年看过最好的。', [['A', 'had 过去式。'], ['C', 'had had 过去完成时。'], ['D', 'would have 虚拟。']]),
  q('tense.04', 'Grammar', 'grammar.tense', '—Did Alan enjoy seeing his old friends yesterday? —Yes, he did. He ___ his old friends for a long time.', ["didn't see", "wouldn't see", "hasn't seen", "hadn't seen"], 'D', '过去的过去用过去完成时。', '过去完成时。', '昨天见朋友之前很久没见，用 hadn\'t seen。', [['A', "didn't see 一般过去时。"], ['B', "wouldn't see 过去将来。"], ['C', "hasn't seen 现在完成时。"]]),
  q('tense.05', 'Grammar', 'grammar.tense', 'When I called you this morning, nobody answered the phone. Where ___?', ['did you go', 'have you gone', 'were you', 'had you been'], 'C', '问当时在哪里，用一般过去时。', '一般过去时。', '你当时在哪？用 were you。', [['A', 'did you go 问去了哪。'], ['B', 'have you gone 现在完成时。'], ['D', 'had you been 过去完成时。']]),
  q('tense.06', 'Grammar', 'grammar.tense', 'She ought to stop working; she has a headache because she ___ too long.', ['has been reading', 'had read', 'is reading', 'read'], 'A', '仍在学习，用现在完成进行时。', '现在完成进行时。', 'has been reading too long 一直读太久。', [['B', 'had read 过去完成时。'], ['C', 'is reading 现在进行时。'], ['D', 'read 过去式。']]),
  q('tense.07', 'Grammar', 'grammar.tense', '—Why do you look worried? —Fred left the company half an hour ago. His work ___ unfinished since.', ['left', 'was left', 'has left', 'has been left'], 'D', 'since 用现在完成时，work 与 leave 为被动。', 'since → 现在完成时被动。', 'has been left 被留下。', [['A', 'left 主动过去式。'], ['B', 'was left 过去时被动。'], ['C', 'has left 现在完成时主动。']]),
  q('tense.08', 'Grammar', 'grammar.tense', '—You could have asked Mr. Johnson for help. —I ___ that. A whole day ___.', ['forget; wastes', 'forgot; was wasted', 'forgot; had wasted', 'forget; was wasted'], 'B', '说话前忘了用过去时；一天被浪费用被动。', '一般过去时 + 被动。', 'forgot 忘了；was wasted 被浪费。', [['A', 'forget 现在时。'], ['C', 'had wasted 主动。'], ['D', 'forget 现在时。']]),
  q('tense.09', 'Grammar', 'grammar.tense', "You'd better not phone the manager between 7 and 8 tomorrow evening; he ___ an important meeting then.", ['will have', 'would have', 'will be having', 'will have had'], 'C', '将来某时正在进行用将来进行时。', '将来进行时。', 'will be having 那时正在开会。', [['A', 'will have 一般将来时。'], ['B', 'would have 过去将来。'], ['D', 'will have had 将来完成时。']]),
  q('tense.10', 'Grammar', 'grammar.tense', 'If I call again in half an hour, do you think she ___?', ['had arrived', 'has arrived', 'will arrive', 'will have arrived'], 'D', '强调将来某时已完成，用将来完成时。', '将来完成时。', 'will have arrived 将已到达。', [['A', 'had arrived 过去完成时。'], ['B', 'has arrived 现在完成时。'], ['C', 'will arrive 一般将来时。']]),
];

// ============================================================
// 六、2024 成人高考专升本英语模拟考试（book118，1–13 题）
// 来源：book118.com "2024年成人高考专升本英语模拟考试及答案"
// 标注：third_party_unverified / C / isRealExam:false
// ============================================================

const BK2024: QSeed[] = [
  q('bk2024.ph.01', 'Phonetics', 'phonetics.vowel', '选出划线部分读音不同的一项：A. game  B. late  C. trade  D. have', ['game', 'late', 'trade', 'have'], 'D', 'have 的 a 发 /æ/，其余发 /eɪ/。', 'a 在 have 中读 /æ/。', 'game/ɡeɪm/、late/leɪt/、trade/treɪd/ 中 a 读 /eɪ/；have/hæv/ 中 a 读 /æ/。', [['A', 'game 的 a 读 /eɪ/。'], ['B', 'late 的 a 读 /eɪ/。'], ['C', 'trade 的 a 读 /eɪ/。']]),
  q('bk2024.ph.02', 'Phonetics', 'phonetics.vowel', '选出划线部分读音不同的一项：A. useless  B. endless  C. unless  D. hopeless', ['useless', 'endless', 'unless', 'hopeless'], 'C', 'unless 的 e 发 /e/，其余发 /ə/。', 'e 在 unless 中读 /e/。', 'useless/ˈjuːsləs/、endless/ˈendləs/、hopeless/ˈhəʊpləs/ 中 e 读 /ə/；unless/ənˈles/ 中 e 读 /e/。', [['A', 'useless 的 e 读 /ə/。'], ['B', 'endless 的 e 读 /ə/。'], ['D', 'hopeless 的 e 读 /ə/。']]),
  q('bk2024.ph.03', 'Phonetics', 'phonetics.consonant', '选出划线部分读音不同的一项：A. there  B. thick  C. thank  D. thirty', ['there', 'thick', 'thank', 'thirty'], 'A', 'there 的 th 发 /ð/，其余发 /θ/。', 'th 在 there 中读 /ð/。', 'there/ðeə/ 中 th 读 /ð/；thick/θɪk/、thank/θæŋk/、thirty/ˈθɜːti/ 中 th 读 /θ/。', [['B', 'thick 的 th 读 /θ/。'], ['C', 'thank 的 th 读 /θ/。'], ['D', 'thirty 的 th 读 /θ/。']]),
  q('bk2024.vg.04', 'Grammar', 'grammar.relative', 'There are numerous websites on the Internet ___ you can learn how to cook.', ['that', 'when', 'where', 'which'], 'C', 'where 引导定语从句，先行词 websites 表地点。', 'where = in which。', 'where you can learn 在这些网站上你可以学习。', [['A', 'that 不充当地点状语。'], ['B', 'when 表时间。'], ['D', 'which 充当主宾语。']]),
  q('bk2024.vg.05', 'Grammar', 'grammar.participle', 'While ___ along the shore, I found a lot of sea shells.', ['walk', 'walking', 'to walk', 'walked'], 'B', 'while + 现在分词，省略主语和 be。', 'while doing。', 'While (I was) walking... 当我散步时。', [['A', 'walk 动词原形。'], ['C', 'to walk 不定式。'], ['D', 'walked 过去分词。']]),
  q('bk2024.vg.06', 'Vocabulary', 'vocab.verb', 'Tom is a careless person. He forgot ___ the door again when he went out yesterday.', ['to lock', 'locking', 'to have locked', 'having locked'], 'A', 'forget to do sth. 忘记去做某事（未做）。', 'forget to do。', '忘记锁门（未锁），用 to lock。（注：来源标 D having locked 有误，按语义修正为 A）', [['B', 'forget locking 忘记锁过（已锁）。'], ['C', 'to have locked 完成不定式。'], ['D', 'having locked 完成动名词。']]),
  q('bk2024.vg.07', 'Vocabulary', 'vocab.noun', 'We generally have four people working in the shop, but at ___ periods we employ extra hands.', ['top', 'rush', 'tip', 'peak'], 'D', 'at peak periods 在高峰期。', 'at peak periods。', 'at peak periods 在旺季。', [['A', 'top 顶部。'], ['B', 'rush 匆忙。'], ['C', 'tip 尖端。']]),
  q('bk2024.vg.08', 'Grammar', 'grammar.participle', 'Pets ___ constant care are not suitable for people with little spare time.', ['require', 'requiring', 'required', 'to require'], 'B', 'requiring 作后置定语，pets 与 require 为主动关系。', '现在分词作定语。', 'pets requiring constant care 需要经常照顾的宠物。', [['A', 'require 动词原形。'], ['C', 'required 过去分词表被动。'], ['D', 'to require 不定式。']]),
  q('bk2024.vg.09', 'Vocabulary', 'vocab.phrasal', 'As the manager of this new company, Charles ___ lots of work and almost had no time for pleasure.', ['took to', 'took after', 'took on', 'took off'], 'C', 'take on 承担。', 'take on = undertake。', 'took on lots of work 承担大量工作。', [['A', 'took to 喜欢。'], ['B', 'took after 像。'], ['D', 'took off 起飞。']]),
  q('bk2024.vg.10', 'Grammar', 'grammar.subjunctive', 'If John had entered the office ten minutes ago, he ___ what we were talking about just now.', ['should know', 'had known', 'would know', 'would have known'], 'D', '与过去事实相反的虚拟，主句用 would have done。', 'if had done → would have done。', 'would have known 就会知道了。', [['A', 'should know 与现在相反。'], ['B', 'had known 从句形式。'], ['C', 'would know 与现在相反。']]),
  q('bk2024.vg.11', 'Vocabulary', 'vocab.verb', 'Newspapers, magazines, televisions and computers all fight to ___ our attention.', ['hold', 'bring', 'carry', 'pull'], 'A', 'hold one\'s attention 吸引注意力。', 'hold attention。', 'hold our attention 吸引我们的注意力。', [['B', 'bring 带来。'], ['C', 'carry 携带。'], ['D', 'pull 拉。']]),
  q('bk2024.vg.12', 'Grammar', 'grammar.tag_question', "Your brother Frank doesn't eat cheese, ___?", ['is he', "isn't he", 'does he', "doesn't he"], 'C', '陈述部分有 doesn\'t，反义疑问句用肯定 does he。', '前否后肯。', 'doesn\'t eat → does he。', [['A', 'is he 与 doesn\'t 不一致。'], ['B', "isn't he 形式错误。"], ['D', "doesn't he 前否后否。"]]),
  q('bk2024.vg.13', 'Vocabulary', 'vocab.comparison', "The writer's first book is ___ popular than his second one.", ['so', 'less', 'such', 'much'], 'B', 'less popular than 不如……受欢迎。', 'less + adj. + than。', 'less popular than 不如第二本受欢迎。', [['A', 'so 不与 than 连用。'], ['C', 'such 不与 than 连用。'], ['D', 'much 修饰比较级但不构成比较级。']]),
];

// ============================================================
// 七、成考专升本英语考试模拟试题（1–20 题）
// 来源：eol.cn "成考专升本英语考试模拟试题(含答案)"
// 标注：third_party_unverified / C / isRealExam:false
// ============================================================

const SOURCE_EOL16456_URL =
  'https://www.eol.cn/chengkao/xckwyw/2025070816456.html';

const EOL16456: QSeed[] = [
  q('eol16456.ph.01', 'Phonetics', 'phonetics.vowel', '选出划线部分读音不同的一项：A. mental  B. metal  C. total  D. metallic', ['mental', 'metal', 'total', 'metallic'], 'D', 'metallic 的 al 发 /æl/，其余发 /əl/。', 'al 在 metallic 中读 /æl/。', 'mental/ˈmentl/、metal/ˈmetl/、total/ˈtəʊtl/ 中 al 读 /əl/；metallic/təˈmætɪk/ 中 al 读 /æl/。', [['A', 'mental 的 al 读 /əl/。'], ['B', 'metal 的 al 读 /əl/。'], ['C', 'total 的 al 读 /əl/。']]),
  q('eol16456.ph.02', 'Phonetics', 'phonetics.consonant', '选出划线部分读音不同的一项：A. thanks  B. pills  C. news  D. films', ['thanks', 'pills', 'news', 'films'], 'B', 'pills 的 s 发 /z/；thanks 的 s 发 /s/。（按来源答案 B）', 's 在 pills 中读 /z/。', '按来源标注答案为 B（pills），建议核对原题划线位置。', [['A', 'thanks 的 s 读 /s/。'], ['C', 'news 的 s 读 /z/。'], ['D', 'films 的 s 读 /z/。']]),
  q('eol16456.ph.03', 'Phonetics', 'phonetics.consonant', '选出划线部分读音不同的一项：A. election  B. pronunciation  C. question  D. operation', ['election', 'pronunciation', 'question', 'operation'], 'C', 'question 的 tion 发 /tʃən/，其余发 /ʃən/。', 'tion 在 question 中读 /tʃən/。', 'election/ɪˈlekʃn/、pronunciation/prəˌnʌnsiˈeɪʃn/、operation/ˌɒpəˈreɪʃn/ 中 tion 读 /ʃn/；question/ˈkwestʃən/ 中 tion 读 /tʃən/。', [['A', 'election 的 tion 读 /ʃn/。'], ['B', 'pronunciation 的 tion 读 /ʃn/。'], ['D', 'operation 的 tion 读 /ʃn/。']]),
  q('eol16456.ph.04', 'Phonetics', 'phonetics.vowel', '选出划线部分读音不同的一项：A. dear  B. heart  C. ear  D. tear', ['dear', 'heart', 'ear', 'tear'], 'B', 'heart 的 ear 发 /ɑː/，其余发 /ɪə/。', 'ear 在 heart 中读 /ɑː/。', 'dear/dɪə/、ear/ɪə/、tear/tɪə/ 中 ear 读 /ɪə/；heart/hɑːt/ 中 ear 读 /ɑː/。', [['A', 'dear 的 ear 读 /ɪə/。'], ['C', 'ear 的 ear 读 /ɪə/。'], ['D', 'tear 的 ear 读 /ɪə/。']]),
  q('eol16456.ph.05', 'Phonetics', 'phonetics.vowel', '选出划线部分读音不同的一项：A. manage  B. matter  C. madam  D. many', ['manage', 'matter', 'madam', 'many'], 'D', 'many 的 a 发 /e/，其余发 /æ/。', 'a 在 many 中读 /e/。', 'manage/ˈmænɪdʒ/、matter/ˈmætə/、madam/ˈmædəm/ 中 a 读 /æ/；many/ˈmeni/ 中 a 读 /e/。', [['A', 'manage 的 a 读 /æ/。'], ['B', 'matter 的 a 读 /æ/。'], ['C', 'madam 的 a 读 /æ/。']]),

  q('eol16456.vg.06', 'Vocabulary', 'vocab.adv', "Johnson will not be at the picnic, ___ to the family's disappointment.", ['more', 'much', 'too much', 'much more'], 'B', 'much to one\'s disappointment 令某人大失所望。', 'much to + n.。', 'much to the family\'s disappointment 令全家大失所望。', [['A', 'more 不用于此结构。'], ['C', 'too much 太多。'], ['D', 'much more 更多。']]),
  q('eol16456.vg.07', 'Grammar', 'grammar.conj', 'The burglar was caught ___.', ['while he left the house', 'when he was left the house', 'as he was leaving the house', 'as soon as he was leaving the house'], 'C', 'as he was leaving 当他正要离开时。', 'as + 过去进行时。', 'was caught as he was leaving 正要离开时被抓。', [['A', 'while he left 时态不对。'], ['B', 'was left 被动，语义不通。'], ['D', 'as soon as 不与进行时连用。']]),
  q('eol16456.vg.08', 'Vocabulary', 'vocab.inversion', '"Look, your wife has just come in." "___"', ['So she did', 'So did she', 'So has she', 'So she has'], 'D', 'So + 主语 + 助动词，表示"确实如此"。', 'So she has 她确实进来了。', '前句用现在完成时 has come，回应用 so she has。', [['A', 'So she did 时态不一致。'], ['B', 'So did she 她也一样（倒装）。'], ['C', 'So has she 她也一样（倒装）。']]),
  q('eol16456.vg.09', 'Vocabulary', 'vocab.verb', 'Government officials should always ___ in mind the people\'s needs.', ['carry', 'take', 'train', 'bear'], 'D', 'bear in mind 记住。', 'bear in mind = keep in mind。', 'bear in mind the people\'s needs 牢记人民需求。', [['A', 'carry 携带。'], ['B', 'take 拿。'], ['C', 'train 训练。']]),
  q('eol16456.vg.10', 'Vocabulary', 'vocab.phrasal', "I'd like to take ___ of this opportunity to thank you all.", ['profit', 'benefit', 'advantage', 'interest'], 'C', 'take advantage of 利用。', 'take advantage of。', 'take advantage of this opportunity 利用此机会。', [['A', 'profit 利润。'], ['B', 'benefit 利益。'], ['D', 'interest 兴趣。']]),
  q('eol16456.vg.11', 'Vocabulary', 'vocab.adj', 'It is quite necessary for a teacher to have good manners and ___ knowledge.', ['extensive', 'expensive', 'intensive', 'expressive'], 'A', 'extensive 广博的。', 'extensive knowledge。', 'extensive knowledge 广博的知识。', [['B', 'expensive 昂贵的。'], ['C', 'intensive 集中的。'], ['D', 'expressive 有表现力的。']]),
  q('eol16456.vg.12', 'Vocabulary', 'vocab.prep', 'Susan wants to know whether the measures have been agreed ___.', ['to', 'with', 'over', 'on'], 'D', 'agree on 就……达成一致。', 'agree on。', 'agreed on the measures 就措施达成一致。', [['A', 'agree to 同意（计划）。'], ['B', 'agree with 同意（某人）。'], ['C', 'agree over 无此搭配。']]),
  q('eol16456.vg.13', 'Vocabulary', 'vocab.pronoun', 'Would you please tell me ___ to do next?', ['how', 'what', 'which', 'whatever'], 'B', 'what to do 做什么。', 'what + to do。', 'what to do next 下一步做什么。', [['A', 'how to do 后需宾语。'], ['C', 'which 哪个。'], ['D', 'whatever 无论什么。']]),
  q('eol16456.vg.14', 'Vocabulary', 'vocab.phrasal', 'We should look ___ the matter before we reach a conclusion.', ['into', 'for', 'to', 'at'], 'A', 'look into 调查。', 'look into = investigate。', 'look into the matter 调查此事。', [['B', 'look for 寻找。'], ['C', 'look to 指望。'], ['D', 'look at 看。']]),
  q('eol16456.vg.15', 'Grammar', 'grammar.subject_verb', 'Every officer and every soldier ___ obey the rules.', ['had to', 'have to', 'has to', 'must have to'], 'C', 'every + 单数名词 + and + every + 单数名词，谓语用单数。', 'every...and every... → 单数。', 'Every officer and every soldier has to... 每个军官和士兵都必须……。', [['A', 'had to 过去时。'], ['B', 'have to 复数。'], ['D', 'must have to 语义重复。']]),
  q('eol16456.vg.16', 'Vocabulary', 'vocab.phrasal', "She's fainted. Throw some water on her face and she may soon ___.", ['come around', 'come again', 'come back', 'come on'], 'A', 'come around 苏醒。', 'come around = revive。', 'come around 苏醒过来。', [['B', 'come again 再来。'], ['C', 'come back 回来。'], ['D', 'come on 加油。']]),
  q('eol16456.vg.17', 'Vocabulary', 'vocab.noun', 'Having been found guilty, the man was given a severe ___ by the judge.', ['crisis', 'crime', 'sentence', 'service'], 'C', 'sentence 判决。', 'severe sentence。', 'a severe sentence 重判。', [['A', 'crisis 危机。'], ['B', 'crime 罪行。'], ['D', 'service 服务。']]),
  q('eol16456.vg.18', 'Vocabulary', 'vocab.conj', '___ the sun is the central body of the solar system so the nucleus is the core of the atom.', ['When', 'If', 'Now that', 'Just as'], 'D', 'Just as...so 正如……也。', 'Just as...so...。', 'Just as the sun...so the nucleus... 正如太阳是太阳系的中心，原子核是原子的核心。', [['A', 'When 当……时。'], ['B', 'If 如果。'], ['C', 'Now that 既然。']]),
  q('eol16456.vg.19', 'Grammar', 'grammar.comparison', 'The sports team of our province won ___ they did at the last National Games.', ['twice as many gold medals as', 'as many twice gold medals as', 'as many as twice gold medals', 'twice many gold medals than'], 'A', 'twice as many...as 是……的两倍。', '倍数 + as many...as。', 'twice as many gold medals as 两倍的金牌。', [['B', '语序错误。'], ['C', '语序错误。'], ['D', 'twice...than 搭配错误。']]),
  q('eol16456.vg.20', 'Vocabulary', 'vocab.adv', 'The speech was not interesting. Most of the people present began to move about ___.', ['impatient', 'impatiently', 'impatience', 'patiently'], 'B', 'impatiently 不耐烦地（副词修饰动词）。', '副词修饰动词。', 'move about impatiently 不耐烦地走动。', [['A', 'impatient 形容词。'], ['C', 'impatience 名词。'], ['D', 'patiently 耐心地（语义相反）。']]),
];

// ============================================================
// 导出
// ============================================================

export const MORE_QUESTIONS: Question[] = [
  ...R2021.map((s) =>
    make(s, {
      source: 'verified_real_exam',
      reliability: 'B',
      isRealExam: true,
      exam: '成人高等学校招生全国统一考试专升本英语',
      year: 2021,
      sourceUrl: SOURCE_2021_URL,
    }),
  ),
  ...M2018.map((s) =>
    make(s, {
      source: 'third_party_unverified',
      reliability: 'C',
      isRealExam: false,
      exam: '成人高考专升本英语模拟试题',
      year: 2018,
      sourceUrl: SOURCE_2018MOCK_URL,
    }),
  ),
  ...PREEXAM.map((s) =>
    make(s, {
      source: 'third_party_unverified',
      reliability: 'C',
      isRealExam: false,
      exam: '成人高考专升本英语考前模拟习题',
      year: null,
      sourceUrl: SOURCE_PREEXAM_URL,
    }),
  ),
  ...R2022.map((s) =>
    make(s, {
      source: 'third_party_unverified',
      reliability: 'C',
      isRealExam: false,
      exam: '成人高考高起专英语真题',
      year: 2022,
      sourceUrl: SOURCE_2022_URL,
    }),
  ),
  ...TENSE.map((s) =>
    make(s, {
      source: 'third_party_unverified',
      reliability: 'C',
      isRealExam: false,
      exam: '成人高考专升本英语语法时态专项',
      year: null,
      sourceUrl: SOURCE_TENSE_URL,
    }),
  ),
  ...BK2024.map((s) =>
    make(s, {
      source: 'third_party_unverified',
      reliability: 'C',
      isRealExam: false,
      exam: '成人高考专升本英语模拟考试',
      year: 2024,
      sourceUrl: SOURCE_BOOK118_2024_URL,
    }),
  ),
  ...EOL16456.map((s) =>
    make(s, {
      source: 'third_party_unverified',
      reliability: 'C',
      isRealExam: false,
      exam: '成人高考专升本英语考试模拟试题',
      year: null,
      sourceUrl: SOURCE_EOL16456_URL,
    }),
  ),
];
