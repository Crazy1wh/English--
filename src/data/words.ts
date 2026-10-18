import type { SourceKind, Word, WordLevel } from '@/types';

// ============================================================
// 词汇分级（面向“初中基础 → 大学四级”的学习者）：
//   L1 基础辨析：初中已学但成考/四级选择题高频的易混词与搭配考点
//   L2 四级基础：高中 → 四级过渡词
//   L3 四级核心：做题高频的多功能动词/名词/形容词
//   L4 四级进阶：较正式、抽象的词
//   L5 高分拔高：易混进阶词 / 六级预备
//
// 说明：本库不是“官方大纲词表”，也没有权威词频来源，
// 是手工整理的通用英语词汇（source=manual，语言事实），
// 因此 frequencyScore 全为 0（=暂无数据），examYears 全为空。
// 已剔除 be/have/do/go 等初中以下的极简词（默认学习者已掌握）。
// ============================================================

interface WordSeed {
  w: string; // word
  p: string; // phonetic
  pos: string;
  m: string; // core meaning
  level: WordLevel;
  exam?: string[]; // 更多释义
  phrases?: string[];
  coll?: string[]; // collocations
  syn?: string[];
  ant?: string[];
  conf?: string[];
  fam?: string[];
  ex?: [string, string];
  tags?: string[];
}

function w(s: WordSeed): Word {
  return {
    id: `word.${s.w.replace(/\s+/g, '_')}`,
    word: s.w,
    phonetic: s.p,
    partOfSpeech: s.pos,
    coreMeaning: s.m,
    examMeanings: s.exam ?? [],
    level: s.level,
    frequencyScore: 0, // 无权威词频 → 0(unknown)，算法中按中性值处理，禁止臆造
    phrases: s.phrases ?? [],
    collocations: s.coll ?? [],
    synonyms: s.syn ?? [],
    antonyms: s.ant ?? [],
    confusingWords: s.conf ?? [],
    wordFamily: s.fam ?? [],
    exampleSentence: s.ex ? { en: s.ex[0], zh: s.ex[1] } : null,
    source: 'manual' as SourceKind,
    examYears: [],
    knowledgeTags: s.tags,
  };
}

const SEED: WordSeed[] = [
  // ---------- L1 基础辨析（初中已学、考试高频的易混词/搭配） ----------
  { w: 'accept', p: '/əkˈsept/', pos: 'v.', m: '（主观）接受', level: 'L1', conf: ['receive'], ant: ['refuse', 'reject'], fam: ['acceptable', 'acceptance'], ex: ['I received a gift but did not accept it.', '我收到一份礼物但没有接受。'] },
  { w: 'receive', p: '/rɪˈsiːv/', pos: 'v.', m: '（客观）收到；接待', level: 'L1', conf: ['accept'], fam: ['receiver', 'reception'], ex: ['She received a letter yesterday.', '她昨天收到一封信。'] },
  { w: 'borrow', p: '/ˈbɒrəʊ/', pos: 'v.', m: '借入（borrow sth from sb）', level: 'L1', conf: ['lend'], ex: ['I borrowed a book from the library.', '我从图书馆借了本书。'] },
  { w: 'lend', p: '/lend/', pos: 'v.', m: '借出（lend sth to sb / lend sb sth）', level: 'L1', conf: ['borrow'], ex: ['Can you lend me your pen?', '能把笔借我吗？'] },
  { w: 'rise', p: '/raɪz/', pos: 'v./n.', m: '上升（不及物，主语自己升）', level: 'L1', conf: ['raise', 'arise'], ex: ['The sun rises in the east.', '太阳从东方升起。'] },
  { w: 'raise', p: '/reɪz/', pos: 'v./n.', m: '举起；筹集；抚养（及物）', level: 'L1', conf: ['rise', 'lie'], coll: ['raise one’s hand', 'raise money'], ex: ['Raise your hand if you know the answer.', '知道答案请举手。'] },
  { w: 'lie', p: '/laɪ/', pos: 'v./n.', m: '躺；位于；说谎', level: 'L1', conf: ['lay'], phrases: ['lie in 在于'], ex: ['He lay on the bed and soon fell asleep.', '他躺在床上很快睡着了。'] },
  { w: 'lay', p: '/leɪ/', pos: 'v.', m: '放置；下蛋（及物，过去式 laid）', level: 'L1', conf: ['lie'], ex: ['Please lay the book on the desk.', '请把书放在桌上。'] },
  { w: 'few', p: '/fjuː/', pos: 'adj./pron.', m: '几乎没有（可数，否定）', level: 'L1', conf: ['a few', 'little', 'a little'], phrases: ['a few 一些'], ex: ['Few people know the answer.', '几乎没人知道答案。'] },
  { w: 'a few', p: '/ə fjuː/', pos: 'pron.', m: '一些（可数，肯定）', level: 'L1', conf: ['few', 'little', 'a little'], ex: ['I have a few friends here.', '我在这儿有几个朋友。'] },
  { w: 'little', p: '/ˈlɪtl/', pos: 'adj./pron.', m: '几乎没有（不可数，否定）', level: 'L1', conf: ['a little', 'few'], ex: ['There is little water left.', '几乎没剩下水。'] },
  { w: 'a little', p: '/ə ˈlɪtl/', pos: 'pron.', m: '一点儿（不可数，肯定）', level: 'L1', conf: ['little', 'a few'], ex: ['I can speak a little French.', '我会说一点法语。'] },
  { w: 'other', p: '/ˈʌðə/', pos: 'adj./pron.', m: '其他的', level: 'L1', conf: ['another', 'the other', 'others', 'the others'], ex: ['Some people like coffee; others like tea.', '一些人喜欢咖啡，另一些人喜欢茶。'] },
  { w: 'another', p: '/əˈnʌðə/', pos: 'adj./pron.', m: '另一个（不定数目中的）', level: 'L1', conf: ['other', 'the other'], coll: ['another + 数词 + n.'], ex: ['Would you like another cup of tea?', '再来一杯茶吗？'] },
  { w: 'the other', p: '/ði ˈʌðə/', pos: 'pron.', m: '两者中的另一个', level: 'L1', conf: ['other', 'another'], phrases: ['one ... the other ...'], ex: ['I have two pens. One is red and the other is blue.', '我有两支笔，一支红的另一支蓝的。'] },
  { w: 'because', p: '/bɪˈkɒz/', pos: 'conj.', m: '因为（+ 句子）', level: 'L1', conf: ['because of'], ex: ['I stayed at home because it rained.', '因为下雨我待在家里。'] },
  { w: 'because of', p: '/bɪˈkɒz ɒv/', pos: 'prep.', m: '因为（+ 名词/代词/doing）', level: 'L1', conf: ['because'], tags: ['vocabulary.collocation.verb_gerund'], ex: ['The match was put off because of the rain.', '比赛因雨推迟。'] },
  { w: 'although', p: '/ɔːlˈðəʊ/', pos: 'conj.', m: '虽然（+ 句子，不与 but 连用）', level: 'L1', conf: ['despite', 'though'], ex: ['Although he is young, he knows a lot.', '他虽年轻却懂得多。'] },
  { w: 'despite', p: '/dɪˈspaɪt/', pos: 'prep.', m: '尽管（+ 名词/doing）', level: 'L1', conf: ['although', 'in spite of'], ex: ['Despite the rain, we went out.', '尽管下雨我们还是出门了。'] },
  { w: 'during', p: '/ˈdjʊərɪŋ/', pos: 'prep.', m: '在……期间（+ 时间段名词）', level: 'L1', conf: ['while'], ex: ['He called during my absence.', '我不在的时候他来过电话。'] },
  { w: 'while', p: '/waɪl/', pos: 'conj.', m: '当……时候（+ 句子，常进行时）', level: 'L1', conf: ['during', 'when'], ex: ['While I was reading, the phone rang.', '我读书时电话响了。'] },
  { w: 'affect', p: '/əˈfekt/', pos: 'v.', m: '影响（动词）', level: 'L1', conf: ['effect'], ex: ['The weather affects my mood.', '天气影响我的心情。'] },
  { w: 'effect', p: '/ɪˈfekt/', pos: 'n.', m: '影响；效果（名词）', level: 'L1', conf: ['affect'], phrases: ['have an effect on'], ex: ['The medicine had a good effect on him.', '这药对他效果很好。'] },
  { w: 'advise', p: '/ədˈvaɪz/', pos: 'v.', m: '建议（动词）', level: 'L1', coll: ['advise sb to do sth', 'advise doing sth'], fam: ['advice n.'], tags: ['vocabulary.collocation.verb_sb_to_do'], ex: ['The doctor advised me to take more exercise.', '医生建议我多锻炼。'] },
  { w: 'afford', p: '/əˈfɔːd/', pos: 'v.', m: '负担得起（常与 can/be able to 连用）', level: 'L1', coll: ['can afford to do sth'], ex: ['I can’t afford to buy a new car.', '我买不起新车。'] },
  { w: 'allow', p: '/əˈlaʊ/', pos: 'v.', m: '允许', level: 'L1', syn: ['permit'], coll: ['allow sb to do sth', 'allow doing sth'], tags: ['vocabulary.collocation.verb_sb_to_do'], ex: ['Smoking is not allowed here.', '此处禁止吸烟。'] },
  { w: 'remind', p: '/rɪˈmaɪnd/', pos: 'v.', m: '提醒；使想起', level: 'L1', coll: ['remind sb to do sth', 'remind sb of sth'], ex: ['This photo reminds me of my childhood.', '这张照片让我想起童年。'] },
  { w: 'recognize', p: '/ˈrekəɡnaɪz/', pos: 'v.', m: '认出；承认', level: 'L1', fam: ['recognition'], ex: ['I didn’t recognize her at first.', '起初我没认出她。'] },
  { w: 'achieve', p: '/əˈtʃiːv/', pos: 'v.', m: '实现；取得', level: 'L1', coll: ['achieve one’s dream/goal'], fam: ['achievement'], ex: ['You can achieve your goal by working hard.', '努力就能实现目标。'] },
  { w: 'admit', p: '/ədˈmɪt/', pos: 'v.', m: '承认；准许进入', level: 'L1', coll: ['admit doing sth'], ant: ['deny'], tags: ['vocabulary.collocation.verb_gerund'], ex: ['He admitted breaking the window.', '他承认打破了窗户。'] },
  { w: 'deny', p: '/dɪˈnaɪ/', pos: 'v.', m: '否认', level: 'L1', coll: ['deny doing sth'], ex: ['She denied knowing anything about it.', '她否认知道此事。'], tags: ['vocabulary.collocation.verb_gerund'] },
  { w: 'enjoy', p: '/ɪnˈdʒɔɪ/', pos: 'v.', m: '享受；喜欢', level: 'L1', coll: ['enjoy doing sth', 'enjoy oneself'], tags: ['vocabulary.collocation.verb_gerund'], ex: ['I enjoyed myself at the party.', '我在聚会上玩得很开心。'] },
  { w: 'avoid', p: '/əˈvɔɪd/', pos: 'v.', m: '避免', level: 'L1', coll: ['avoid doing sth'], tags: ['vocabulary.collocation.verb_gerund'], ex: ['You should avoid making the same mistake.', '你应避免犯同样的错。'] },
  { w: 'mind', p: '/maɪnd/', pos: 'v./n.', m: '介意；心思', level: 'L1', phrases: ['never mind', 'make up one’s mind'], coll: ['mind doing sth', 'Would you mind doing'], ex: ['Would you mind opening the door?', '你介意开一下门吗？'], tags: ['vocabulary.collocation.verb_gerund'] },
  { w: 'suggest', p: '/səˈdʒest/', pos: 'v.', m: '建议', level: 'L1', coll: ['suggest doing sth', 'suggest (that) sb (should) do'], tags: ['vocabulary.collocation.verb_gerund'], ex: ['I suggest going there by bus.', '我建议坐公交去。'] },
  { w: 'finish', p: '/ˈfɪnɪʃ/', pos: 'v.', m: '完成', level: 'L1', syn: ['complete'], coll: ['finish doing sth'], tags: ['vocabulary.collocation.verb_gerund'], ex: ['Have you finished reading the book?', '你读完那本书了吗？'] },
  { w: 'practice', p: '/ˈpræktɪs/', pos: 'v./n.', m: '练习', level: 'L1', coll: ['practice doing sth'], fam: ['practical'], tags: ['vocabulary.collocation.verb_gerund'], ex: ['She practices playing the piano every day.', '她每天练习弹钢琴。'] },
  { w: 'decide', p: '/dɪˈsaɪd/', pos: 'v.', m: '决定', level: 'L1', phrases: ['decide on'], coll: ['decide to do sth'], fam: ['decision'], ex: ['I decided to study medicine.', '我决定学医。'], tags: ['vocabulary.collocation.verb_infinitive'] },
  { w: 'expect', p: '/ɪkˈspekt/', pos: 'v.', m: '期待；预计', level: 'L1', coll: ['expect to do sth', 'expect sb to do sth'], ex: ['I expect to hear from you soon.', '我期待很快收到你的信。'] },
  { w: 'refuse', p: '/rɪˈfjuːz/', pos: 'v.', m: '拒绝', level: 'L1', ant: ['accept'], coll: ['refuse to do sth'], ex: ['He refused to answer my question.', '他拒绝回答我的问题。'] },
  { w: 'promise', p: '/ˈprɒmɪs/', pos: 'v./n.', m: '答应；承诺', level: 'L1', coll: ['promise to do sth', 'promise sb sth', 'keep/break a promise'], ex: ['She promised to help me.', '她答应帮我。'] },
  { w: 'manage', p: '/ˈmænɪdʒ/', pos: 'v.', m: '设法做到；管理', level: 'L1', coll: ['manage to do sth'], fam: ['manager', 'management'], ex: ['He managed to finish on time.', '他设法按时完成了。'] },
  { w: 'offer', p: '/ˈɒfə/', pos: 'v./n.', m: '主动提供；出价', level: 'L1', coll: ['offer to do sth', 'offer sb sth'], ex: ['He offered to drive me home.', '他主动提出开车送我回家。'] },
  { w: 'include', p: '/ɪnˈkluːd/', pos: 'v.', m: '包括（部分）', level: 'L1', conf: ['contain', 'involve'], ant: ['exclude'], ex: ['The price includes breakfast.', '价格含早餐。'] },
  { w: 'contain', p: '/kənˈteɪn/', pos: 'v.', m: '包含（全部/所含内容）', level: 'L1', conf: ['include'], fam: ['container'], ex: ['This box contains old books.', '这个箱子装着旧书。'] },
  { w: 'require', p: '/rɪˈkwaɪə/', pos: 'v.', m: '要求；需要', level: 'L1', syn: ['need', 'demand'], coll: ['require sb to do sth', 'sth requires doing'], ex: ['The room requires cleaning.', '房间需要打扫。'] },
  { w: 'spend', p: '/spend/', pos: 'v.', m: '花费（时间/钱，人作主语）', level: 'L1', conf: ['take', 'cost', 'pay'], coll: ['spend ... on sth', 'spend ... (in) doing sth'], ex: ['I spent two hours doing homework.', '我花了两小时做作业。'] },
  { w: 'cost', p: '/kɒst/', pos: 'v./n.', m: '花费（物作主语）', level: 'L1', conf: ['spend', 'take', 'pay'], ex: ['The book cost me 30 yuan.', '这本书花了我30元。'] },
  { w: 'pay', p: '/peɪ/', pos: 'v.', m: '支付', level: 'L1', phrases: ['pay for', 'pay attention to', 'pay off'], coll: ['pay sb for sth'], ex: ['Please pay attention to your pronunciation.', '请注意你的发音。'] },
  { w: 'between', p: '/bɪˈtwiːn/', pos: 'prep.', m: '在两者之间', level: 'L1', conf: ['among'], ex: ['The bank is between the shop and the school.', '银行在商店和学校之间。'] },
  { w: 'among', p: '/əˈmʌŋ/', pos: 'prep.', m: '在（三者以上）之间', level: 'L1', conf: ['between'], ex: ['She is the tallest among the girls.', '她是女孩中最高的。'] },
  { w: 'across', p: '/əˈkrɒs/', pos: 'prep./adv.', m: '横过（表面）；在对面', level: 'L1', conf: ['through', 'over'], ex: ['Walk across the bridge.', '走过那座桥。'] },
  { w: 'through', p: '/θruː/', pos: 'prep./adv.', m: '穿过（内部）', level: 'L1', conf: ['across'], ex: ['The river runs through the city.', '这条河穿城而过。'] },
  { w: 'remember', p: '/rɪˈmembə/', pos: 'v.', m: '记得', level: 'L1', conf: ['remember to do（记得要做）', 'remember doing（记得做过）'], ant: ['forget'], ex: ['Remember to lock the door.', '记得锁门。'] },
  { w: 'forget', p: '/fəˈɡet/', pos: 'v.', m: '忘记', level: 'L1', conf: ['leave'], coll: ['forget to do（忘记要做）', 'forget doing（忘记做过）'], ex: ['I forgot telling him the news.', '我忘了已经告诉过他这个消息。'] },
  { w: 'stop', p: '/stɒp/', pos: 'v.', m: '停止', level: 'L1', conf: ['stop to do（停下来去做）', 'stop doing（停止做）'], ex: ['We stopped to have a rest.', '我们停下来休息。'] },
  { w: 'used to', p: '/ˈjuːst tə/', pos: 'modal phr.', m: '过去常常（现在不）', level: 'L1', conf: ['be used to doing', 'be used to do'], ex: ['There used to be a cinema here.', '这儿过去有家电影院。'] },
  { w: 'prefer', p: '/prɪˈfɜː/', pos: 'v.', m: '更喜欢', level: 'L1', coll: ['prefer to do', 'prefer A to B', 'prefer doing to doing'], ex: ['I prefer tea to coffee.', '比起咖啡我更喜欢茶。'] },

  // ---------- L2 四级基础（原阅读识别词示例，详见 words-extra / words-cet4） ----------
  { w: 'environment', p: '/ɪnˈvaɪrənmənt/', pos: 'n.', m: '环境', level: 'L2', fam: ['environmental'], ex: ['We must protect the environment.', '我们必须保护环境。'] },
  { w: 'technology', p: '/tekˈnɒlədʒi/', pos: 'n.', m: '技术', level: 'L2', fam: ['technological'], ex: ['Modern technology changes our life.', '现代科技改变生活。'] },
  { w: 'experience', p: '/ɪkˈspɪəriəns/', pos: 'n./v.', m: '经验（不可数）；经历（可数）', level: 'L2', conf: ['experiment'], ex: ['He has much teaching experience.', '他教学经验丰富。'] },
  { w: 'experiment', p: '/ɪkˈsperɪmənt/', pos: 'n./v.', m: '实验', level: 'L2', conf: ['experience'], ex: ['They are doing a chemistry experiment.', '他们在做化学实验。'] },
  { w: 'opportunity', p: '/ˌɒpəˈtjuːnəti/', pos: 'n.', m: '机会', level: 'L2', syn: ['chance'], ex: ['This is a good opportunity to practice English.', '这是练习英语的好机会。'] },
  { w: 'encourage', p: '/ɪnˈkʌrɪdʒ/', pos: 'v.', m: '鼓励', level: 'L2', ant: ['discourage'], coll: ['encourage sb to do sth'], ex: ['Parents should encourage children to read.', '家长应鼓励孩子阅读。'] },
];

export const SEED_WORDS: Word[] = SEED.map(w);
