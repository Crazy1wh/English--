import type { SourceKind, Word, WordLevel } from '@/types';

// ============================================================
// 重要声明（文档第三十四章）：
// 这不是“官方 3800 大纲词表”，也没有权威词频来源。
// 下列是用于跑通学习闭环的【手工演示词库】(source=manual)，
// 真实大纲词表须经收集、核验后通过 Admin 的 JSON/CSV 导入管道进入系统。
// 因此 frequencyScore 全部为 0（=暂无数据），examYears 全部为空。
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
  // ---------- L1 核心生存词汇 ----------
  { w: 'be', p: '/biː/', pos: 'v.', m: '是；在（系动词/助动词）', level: 'L1', ex: ['She is a teacher.', '她是一名老师。'] },
  { w: 'have', p: '/hæv/', pos: 'v.', m: '有；进行；使（某事发生）', level: 'L1', coll: ['have breakfast/lunch/dinner', 'have a good time', 'have sth done'], ex: ['I have my hair cut once a month.', '我每个月理一次发。'] },
  { w: 'do', p: '/duː/', pos: 'v.', m: '做；助动词', level: 'L1', phrases: ['do well in', 'do one’s best'], ex: ['What do you do?', '你是做什么工作的？'] },
  { w: 'go', p: '/ɡəʊ/', pos: 'v.', m: '去；变得', level: 'L1', phrases: ['go on', 'go over 复习', 'go through 经历'], coll: ['go on doing sth'], ex: ['Please go over your lessons.', '请复习功课。'] },
  { w: 'get', p: '/ɡet/', pos: 'v.', m: '得到；到达；变得', level: 'L1', phrases: ['get up', 'get on/along with', 'get used to', 'get over 克服'], coll: ['get sb to do sth', 'get sth done'], ex: ['I get along well with my classmates.', '我和同学相处得很好。'] },
  { w: 'make', p: '/meɪk/', pos: 'v.', m: '制造；使', level: 'L1', phrases: ['make sure', 'make up one’s mind', 'be made of/from'], coll: ['make sb do sth', 'make a decision', 'make progress'], ex: ['Hard work made him successful.', '努力使他成功。'] },
  { w: 'take', p: '/teɪk/', pos: 'v.', m: '拿走；花费；乘坐', level: 'L1', phrases: ['take care of', 'take part in', 'take place'], coll: ['it takes sb some time to do sth', 'take medicine'], ex: ['It took me two hours to finish the work.', '完成工作花了我两小时。'] },
  { w: 'come', p: '/kʌm/', pos: 'v.', m: '来', level: 'L1', phrases: ['come on', 'come up with 想出', 'come true 实现'], ex: ['My dream has come true.', '我的梦想实现了。'] },
  { w: 'give', p: '/ɡɪv/', pos: 'v.', m: '给', level: 'L1', phrases: ['give up', 'give in 屈服', 'give back'], coll: ['give sb sth', 'give sth to sb'], ex: ['Never give up your dream.', '永远不要放弃梦想。'] },
  { w: 'know', p: '/nəʊ/', pos: 'v.', m: '知道；认识', level: 'L1', phrases: ['know about', 'as far as I know'], ex: ['I know him by sight.', '我和他面熟。'] },
  { w: 'think', p: '/θɪŋk/', pos: 'v.', m: '想；认为', level: 'L1', phrases: ['think about', 'think of', 'think over 仔细考虑'], ex: ['What do you think of the film?', '你觉得这部电影怎么样？'] },
  { w: 'see', p: '/siː/', pos: 'v.', m: '看见；明白', level: 'L1', conf: ['look', 'watch'], ex: ['I see what you mean.', '我明白你的意思。'] },
  { w: 'want', p: '/wɒnt/', pos: 'v.', m: '想要', level: 'L1', coll: ['want to do sth', 'want sb to do sth'], ex: ['I want you to help me.', '我想让你帮我。'], tags: ['vocabulary.collocation.verb_sb_to_do'] },
  { w: 'tell', p: '/tel/', pos: 'v.', m: '告诉；分辨', level: 'L1', conf: ['say', 'speak', 'talk'], coll: ['tell sb sth', 'tell sb to do sth', 'tell A from B'], ex: ['Can you tell Tom from his twin brother?', '你能分清汤姆和他的双胞胎兄弟吗？'], tags: ['vocabulary.collocation.verb_sb_to_do'] },
  { w: 'say', p: '/seɪ/', pos: 'v.', m: '说（强调内容）', level: 'L1', conf: ['tell', 'speak', 'talk'], coll: ['say sth to sb', 'say to oneself'], ex: ['He said nothing to me.', '他什么也没对我说。'] },
  { w: 'speak', p: '/spiːk/', pos: 'v.', m: '讲话；说（语言）', level: 'L1', conf: ['say', 'tell', 'talk'], phrases: ['speak highly of'], ex: ['She can speak three languages.', '她会说三种语言。'] },
  { w: 'talk', p: '/tɔːk/', pos: 'v.', m: '谈话', level: 'L1', conf: ['say', 'tell', 'speak'], phrases: ['talk about', 'talk with/to sb', 'talk over'], ex: ['What are you talking about?', '你们在谈什么？'] },
  { w: 'like', p: '/laɪk/', pos: 'v./prep.', m: '喜欢；像', level: 'L1', conf: ['as'], coll: ['like doing sth', 'would like to do sth'], ex: ['I feel like taking a walk.', '我想去散步。'] },
  { w: 'look', p: '/lʊk/', pos: 'v./n.', m: '看；看起来', level: 'L1', conf: ['see', 'watch', 'read'], phrases: ['look at', 'look for', 'look after', 'look forward to'], coll: ['look forward to doing sth'], ex: ['I am looking forward to hearing from you.', '我盼望着你的来信。'], tags: ['vocabulary.collocation.verb_gerund'] },
  { w: 'use', p: '/juːz/', pos: 'v./n.', m: '使用', level: 'L1', phrases: ['used to do', 'be used to doing', 'be used to do'], fam: ['useful', 'useless', 'usage'], ex: ['Wood is used to make paper.', '木材被用来造纸。'] },
  { w: 'find', p: '/faɪnd/', pos: 'v.', m: '找到；发现', level: 'L1', phrases: ['find out'], coll: ['find sb doing sth', 'find it + adj. + to do'], ex: ['I find it easy to learn English.', '我发现学英语很容易。'] },
  { w: 'work', p: '/wɜːk/', pos: 'v./n.', m: '工作；运转', level: 'L1', phrases: ['work out 算出；锻炼', 'at work'], fam: ['worker', 'works 作品'], ex: ['Can you work out this problem?', '你能算出这道题吗？'] },
  { w: 'try', p: '/traɪ/', pos: 'v.', m: '尝试；努力', level: 'L1', conf: ['try to do（尽力）', 'try doing（试着）'], phrases: ['try on', 'try one’s best'], ex: ['Try knocking at the back door.', '试试敲后门。'] },
  { w: 'ask', p: '/ɑːsk/', pos: 'v.', m: '问；请求', level: 'L1', phrases: ['ask for', 'ask sb for sth'], coll: ['ask sb to do sth'], ex: ['He asked me to wait for him.', '他让我等他。'], tags: ['vocabulary.collocation.verb_sb_to_do'] },
  { w: 'leave', p: '/liːv/', pos: 'v.', m: '离开；留下；遗忘', level: 'L1', conf: ['forget'], phrases: ['leave for 出发去', 'leave alone'], ex: ['I left my umbrella at home.', '我把伞落在家里了。'] },
  { w: 'keep', p: '/kiːp/', pos: 'v.', m: '保持；保留', level: 'L1', phrases: ['keep on', 'keep up with'], coll: ['keep doing sth', 'keep sb doing sth'], ex: ['Keep trying and you will succeed.', '继续努力你就会成功。'], tags: ['vocabulary.collocation.verb_gerund'] },
  { w: 'let', p: '/let/', pos: 'v.', m: '让', level: 'L1', phrases: ['let sb down 让……失望'], coll: ['let sb do sth'], ex: ['Let me help you.', '让我来帮你。'], tags: ['vocabulary.collocation.verb_infinitive'] },
  { w: 'help', p: '/help/', pos: 'v./n.', m: '帮助', level: 'L1', phrases: ['help oneself to', 'can’t help doing'], coll: ['help sb (to) do sth', 'help sb with sth'], ex: ['I couldn’t help laughing.', '我忍不住笑了。'], tags: ['vocabulary.collocation.verb_gerund'] },
  { w: 'show', p: '/ʃəʊ/', pos: 'v./n.', m: '展示；演出', level: 'L1', phrases: ['show sb around', 'show off'], coll: ['show sb sth'], ex: ['Please show me the way.', '请给我指路。'] },
  { w: 'hear', p: '/hɪə/', pos: 'v.', m: '听见', level: 'L1', conf: ['listen (to)'], phrases: ['hear from sb', 'hear of/about'], coll: ['hear sb do/doing sth'], ex: ['I heard someone singing next door.', '我听见隔壁有人唱歌。'] },
  { w: 'play', p: '/pleɪ/', pos: 'v./n.', m: '玩；演奏；打（球）', level: 'L1', coll: ['play the piano', 'play football', 'play a role in'], ex: ['He plays an important role in the team.', '他在队里起重要作用。'] },
  { w: 'run', p: '/rʌn/', pos: 'v.', m: '跑；经营；运转', level: 'L1', phrases: ['run out of 用完', 'run after'], ex: ['We are running out of time.', '我们快没时间了。'] },
  { w: 'live', p: '/lɪv/', pos: 'v.', m: '居住；生活', level: 'L1', phrases: ['live on 以……为食', 'live a happy life'], fam: ['life', 'alive', 'living'], ex: ['She lives on fruits and vegetables.', '她以水果蔬菜为食。'] },
  { w: 'bring', p: '/brɪŋ/', pos: 'v.', m: '带来', level: 'L1', conf: ['take', 'fetch', 'carry'], ex: ['Bring your book here tomorrow.', '明天把你的书带来。'] },
  { w: 'write', p: '/raɪt/', pos: 'v.', m: '写', level: 'L1', phrases: ['write down', 'write to sb'], fam: ['writer', 'writing'], ex: ['Please write down your name.', '请写下你的名字。'] },
  { w: 'begin', p: '/bɪˈɡɪn/', pos: 'v.', m: '开始', level: 'L1', syn: ['start'], ant: ['finish', 'end'], coll: ['begin to do/doing sth'], fam: ['beginning'], ex: ['School begins in September.', '学校九月开学。'] },
  { w: 'learn', p: '/lɜːn/', pos: 'v.', m: '学习；得知', level: 'L1', conf: ['study'], phrases: ['learn from sb', 'learn ... by heart'], ex: ['We should learn from each other.', '我们应该互相学习。'] },
  { w: 'teach', p: '/tiːtʃ/', pos: 'v.', m: '教', level: 'L1', coll: ['teach sb sth', 'teach sb to do sth'], fam: ['teacher'], ex: ['She teaches us English.', '她教我们英语。'], tags: ['vocabulary.collocation.verb_sb_to_do'] },
  { w: 'study', p: '/ˈstʌdi/', pos: 'v./n.', m: '学习；研究', level: 'L1', ex: ['He is studying law at college.', '他在大学学法律。'] },
  { w: 'thank', p: '/θæŋk/', pos: 'v./n.', m: '感谢', level: 'L1', phrases: ['thanks to', 'thank sb for sth/doing sth'], fam: ['thankful'], ex: ['Thanks to your help, I passed.', '多亏你的帮助我通过了。'] },

  // ---------- L2 成考核心词汇（含易混词对） ----------
  { w: 'accept', p: '/əkˈsept/', pos: 'v.', m: '（主观）接受', level: 'L2', conf: ['receive'], ant: ['refuse', 'reject'], fam: ['acceptable', 'acceptance'], ex: ['I received a gift but did not accept it.', '我收到一份礼物但没有接受。'] },
  { w: 'receive', p: '/rɪˈsiːv/', pos: 'v.', m: '（客观）收到；接待', level: 'L2', conf: ['accept'], fam: ['receiver', 'reception'], ex: ['She received a letter yesterday.', '她昨天收到一封信。'] },
  { w: 'borrow', p: '/ˈbɒrəʊ/', pos: 'v.', m: '借入（borrow sth from sb）', level: 'L2', conf: ['lend'], ex: ['I borrowed a book from the library.', '我从图书馆借了本书。'] },
  { w: 'lend', p: '/lend/', pos: 'v.', m: '借出（lend sth to sb / lend sb sth）', level: 'L2', conf: ['borrow'], ex: ['Can you lend me your pen?', '能把笔借我吗？'] },
  { w: 'rise', p: '/raɪz/', pos: 'v./n.', m: '上升（不及物，主语自己升）', level: 'L2', conf: ['raise', 'arise'], ex: ['The sun rises in the east.', '太阳从东方升起。'] },
  { w: 'raise', p: '/reɪz/', pos: 'v./n.', m: '举起；筹集；抚养（及物）', level: 'L2', conf: ['rise', 'lie'], coll: ['raise one’s hand', 'raise money'], ex: ['Raise your hand if you know the answer.', '知道答案请举手。'] },
  { w: 'lie', p: '/laɪ/', pos: 'v./n.', m: '躺；位于；说谎', level: 'L2', conf: ['lay'], phrases: ['lie in 在于'], ex: ['He lay on the bed and soon fell asleep.', '他躺在床上很快睡着了。'] },
  { w: 'lay', p: '/leɪ/', pos: 'v.', m: '放置；下蛋（及物，过去式 laid）', level: 'L2', conf: ['lie'], ex: ['Please lay the book on the desk.', '请把书放在桌上。'] },
  { w: 'few', p: '/fjuː/', pos: 'adj./pron.', m: '几乎没有（可数，否定）', level: 'L2', conf: ['a few', 'little', 'a little'], phrases: ['a few 一些'], ex: ['Few people know the answer.', '几乎没人知道答案。'] },
  { w: 'a few', p: '/ə fjuː/', pos: 'pron.', m: '一些（可数，肯定）', level: 'L2', conf: ['few', 'little', 'a little'], ex: ['I have a few friends here.', '我在这儿有几个朋友。'] },
  { w: 'little', p: '/ˈlɪtl/', pos: 'adj./pron.', m: '几乎没有（不可数，否定）', level: 'L2', conf: ['a little', 'few'], ex: ['There is little water left.', '几乎没剩下水。'] },
  { w: 'a little', p: '/ə ˈlɪtl/', pos: 'pron.', m: '一点儿（不可数，肯定）', level: 'L2', conf: ['little', 'a few'], ex: ['I can speak a little French.', '我会说一点法语。'] },
  { w: 'other', p: '/ˈʌðə/', pos: 'adj./pron.', m: '其他的', level: 'L2', conf: ['another', 'the other', 'others', 'the others'], ex: ['Some people like coffee; others like tea.', '一些人喜欢咖啡，另一些人喜欢茶。'] },
  { w: 'another', p: '/əˈnʌðə/', pos: 'adj./pron.', m: '另一个（不定数目中的）', level: 'L2', conf: ['other', 'the other'], coll: ['another + 数词 + n.'], ex: ['Would you like another cup of tea?', '再来一杯茶吗？'] },
  { w: 'the other', p: '/ði ˈʌðə/', pos: 'pron.', m: '两者中的另一个', level: 'L2', conf: ['other', 'another'], phrases: ['one ... the other ...'], ex: ['I have two pens. One is red and the other is blue.', '我有两支笔，一支红的另一支蓝的。'] },
  { w: 'because', p: '/bɪˈkɒz/', pos: 'conj.', m: '因为（+ 句子）', level: 'L2', conf: ['because of'], ex: ['I stayed at home because it rained.', '因为下雨我待在家里。'] },
  { w: 'because of', p: '/bɪˈkɒz ɒv/', pos: 'prep.', m: '因为（+ 名词/代词/doing）', level: 'L2', conf: ['because'], tags: ['vocabulary.collocation.verb_gerund'], ex: ['The match was put off because of the rain.', '比赛因雨推迟。'] },
  { w: 'although', p: '/ɔːlˈðəʊ/', pos: 'conj.', m: '虽然（+ 句子，不与 but 连用）', level: 'L2', conf: ['despite', 'though'], ex: ['Although he is young, he knows a lot.', '他虽年轻却懂得多。'] },
  { w: 'despite', p: '/dɪˈspaɪt/', pos: 'prep.', m: '尽管（+ 名词/doing）', level: 'L2', conf: ['although', 'in spite of'], ex: ['Despite the rain, we went out.', '尽管下雨我们还是出门了。'] },
  { w: 'during', p: '/ˈdjʊərɪŋ/', pos: 'prep.', m: '在……期间（+ 时间段名词）', level: 'L2', conf: ['while'], ex: ['He called during my absence.', '我不在的时候他来过电话。'] },
  { w: 'while', p: '/waɪl/', pos: 'conj.', m: '当……时候（+ 句子，常进行时）', level: 'L2', conf: ['during', 'when'], ex: ['While I was reading, the phone rang.', '我读书时电话响了。'] },
  { w: 'affect', p: '/əˈfekt/', pos: 'v.', m: '影响（动词）', level: 'L2', conf: ['effect'], ex: ['The weather affects my mood.', '天气影响我的心情。'] },
  { w: 'effect', p: '/ɪˈfekt/', pos: 'n.', m: '影响；效果（名词）', level: 'L2', conf: ['affect'], phrases: ['have an effect on'], ex: ['The medicine had a good effect on him.', '这药对他效果很好。'] },
  { w: 'advise', p: '/ədˈvaɪz/', pos: 'v.', m: '建议（动词）', level: 'L2', coll: ['advise sb to do sth', 'advise doing sth'], fam: ['advice n.'], tags: ['vocabulary.collocation.verb_sb_to_do'], ex: ['The doctor advised me to take more exercise.', '医生建议我多锻炼。'] },
  { w: 'afford', p: '/əˈfɔːd/', pos: 'v.', m: '负担得起（常与 can/be able to 连用）', level: 'L2', coll: ['can afford to do sth'], ex: ['I can’t afford to buy a new car.', '我买不起新车。'] },
  { w: 'allow', p: '/əˈlaʊ/', pos: 'v.', m: '允许', level: 'L2', syn: ['permit'], coll: ['allow sb to do sth', 'allow doing sth'], tags: ['vocabulary.collocation.verb_sb_to_do'], ex: ['Smoking is not allowed here.', '此处禁止吸烟。'] },
  { w: 'remind', p: '/rɪˈmaɪnd/', pos: 'v.', m: '提醒；使想起', level: 'L2', coll: ['remind sb to do sth', 'remind sb of sth'], ex: ['This photo reminds me of my childhood.', '这张照片让我想起童年。'] },
  { w: 'recognize', p: '/ˈrekəɡnaɪz/', pos: 'v.', m: '认出；承认', level: 'L2', fam: ['recognition'], ex: ['I didn’t recognize her at first.', '起初我没认出她。'] },
  { w: 'achieve', p: '/əˈtʃiːv/', pos: 'v.', m: '实现；取得', level: 'L2', coll: ['achieve one’s dream/goal'], fam: ['achievement'], ex: ['You can achieve your goal by working hard.', '努力就能实现目标。'] },
  { w: 'admit', p: '/ədˈmɪt/', pos: 'v.', m: '承认；准许进入', level: 'L2', coll: ['admit doing sth'], ant: ['deny'], tags: ['vocabulary.collocation.verb_gerund'], ex: ['He admitted breaking the window.', '他承认打破了窗户。'] },
  { w: 'deny', p: '/dɪˈnaɪ/', pos: 'v.', m: '否认', level: 'L2', coll: ['deny doing sth'], ex: ['She denied knowing anything about it.', '她否认知道此事。'], tags: ['vocabulary.collocation.verb_gerund'] },
  { w: 'enjoy', p: '/ɪnˈdʒɔɪ/', pos: 'v.', m: '享受；喜欢', level: 'L2', coll: ['enjoy doing sth', 'enjoy oneself'], tags: ['vocabulary.collocation.verb_gerund'], ex: ['I enjoyed myself at the party.', '我在聚会上玩得很开心。'] },
  { w: 'avoid', p: '/əˈvɔɪd/', pos: 'v.', m: '避免', level: 'L2', coll: ['avoid doing sth'], tags: ['vocabulary.collocation.verb_gerund'], ex: ['You should avoid making the same mistake.', '你应避免犯同样的错。'] },
  { w: 'mind', p: '/maɪnd/', pos: 'v./n.', m: '介意；心思', level: 'L2', phrases: ['never mind', 'make up one’s mind'], coll: ['mind doing sth', 'Would you mind doing'], ex: ['Would you mind opening the door?', '你介意开一下门吗？'], tags: ['vocabulary.collocation.verb_gerund'] },
  { w: 'suggest', p: '/səˈdʒest/', pos: 'v.', m: '建议', level: 'L2', coll: ['suggest doing sth', 'suggest (that) sb (should) do'], tags: ['vocabulary.collocation.verb_gerund'], ex: ['I suggest going there by bus.', '我建议坐公交去。'] },
  { w: 'finish', p: '/ˈfɪnɪʃ/', pos: 'v.', m: '完成', level: 'L2', syn: ['complete'], coll: ['finish doing sth'], tags: ['vocabulary.collocation.verb_gerund'], ex: ['Have you finished reading the book?', '你读完那本书了吗？'] },
  { w: 'practice', p: '/ˈpræktɪs/', pos: 'v./n.', m: '练习', level: 'L2', coll: ['practice doing sth'], fam: ['practical'], tags: ['vocabulary.collocation.verb_gerund'], ex: ['She practices playing the piano every day.', '她每天练习弹钢琴。'] },
  { w: 'decide', p: '/dɪˈsaɪd/', pos: 'v.', m: '决定', level: 'L2', phrases: ['decide on'], coll: ['decide to do sth'], fam: ['decision'], ex: ['I decided to study medicine.', '我决定学医。'], tags: ['vocabulary.collocation.verb_infinitive'] },
  { w: 'expect', p: '/ɪkˈspekt/', pos: 'v.', m: '期待；预计', level: 'L2', coll: ['expect to do sth', 'expect sb to do sth'], ex: ['I expect to hear from you soon.', '我期待很快收到你的信。'] },
  { w: 'refuse', p: '/rɪˈfjuːz/', pos: 'v.', m: '拒绝', level: 'L2', ant: ['accept'], coll: ['refuse to do sth'], ex: ['He refused to answer my question.', '他拒绝回答我的问题。'] },
  { w: 'promise', p: '/ˈprɒmɪs/', pos: 'v./n.', m: '答应；承诺', level: 'L2', coll: ['promise to do sth', 'promise sb sth', 'keep/break a promise'], ex: ['She promised to help me.', '她答应帮我。'] },
  { w: 'manage', p: '/ˈmænɪdʒ/', pos: 'v.', m: '设法做到；管理', level: 'L2', coll: ['manage to do sth'], fam: ['manager', 'management'], ex: ['He managed to finish on time.', '他设法按时完成了。'] },
  { w: 'offer', p: '/ˈɒfə/', pos: 'v./n.', m: '主动提供；出价', level: 'L2', coll: ['offer to do sth', 'offer sb sth'], ex: ['He offered to drive me home.', '他主动提出开车送我回家。'] },
  { w: 'include', p: '/ɪnˈkluːd/', pos: 'v.', m: '包括（部分）', level: 'L2', conf: ['contain', 'involve'], ant: ['exclude'], ex: ['The price includes breakfast.', '价格含早餐。'] },
  { w: 'contain', p: '/kənˈteɪn/', pos: 'v.', m: '包含（全部/所含内容）', level: 'L2', conf: ['include'], fam: ['container'], ex: ['This box contains old books.', '这个箱子装着旧书。'] },
  { w: 'require', p: '/rɪˈkwaɪə/', pos: 'v.', m: '要求；需要', level: 'L2', syn: ['need', 'demand'], coll: ['require sb to do sth', 'sth requires doing'], ex: ['The room requires cleaning.', '房间需要打扫。'] },
  { w: 'spend', p: '/spend/', pos: 'v.', m: '花费（时间/钱，人作主语）', level: 'L2', conf: ['take', 'cost', 'pay'], coll: ['spend ... on sth', 'spend ... (in) doing sth'], ex: ['I spent two hours doing homework.', '我花了两小时做作业。'] },
  { w: 'cost', p: '/kɒst/', pos: 'v./n.', m: '花费（物作主语）', level: 'L2', conf: ['spend', 'take', 'pay'], ex: ['The book cost me 30 yuan.', '这本书花了我30元。'] },
  { w: 'pay', p: '/peɪ/', pos: 'v.', m: '支付', level: 'L2', phrases: ['pay for', 'pay attention to', 'pay off'], coll: ['pay sb for sth'], ex: ['Please pay attention to your pronunciation.', '请注意你的发音。'] },
  { w: 'between', p: '/bɪˈtwiːn/', pos: 'prep.', m: '在两者之间', level: 'L2', conf: ['among'], ex: ['The bank is between the shop and the school.', '银行在商店和学校之间。'] },
  { w: 'among', p: '/əˈmʌŋ/', pos: 'prep.', m: '在（三者以上）之间', level: 'L2', conf: ['between'], ex: ['She is the tallest among the girls.', '她是女孩中最高的。'] },
  { w: 'across', p: '/əˈkrɒs/', pos: 'prep./adv.', m: '横过（表面）；在对面', level: 'L2', conf: ['through', 'over'], ex: ['Walk across the bridge.', '走过那座桥。'] },
  { w: 'through', p: '/θruː/', pos: 'prep./adv.', m: '穿过（内部）', level: 'L2', conf: ['across'], ex: ['The river runs through the city.', '这条河穿城而过。'] },
  { w: 'remember', p: '/rɪˈmembə/', pos: 'v.', m: '记得', level: 'L2', conf: ['remember to do（记得要做）', 'remember doing（记得做过）'], ant: ['forget'], ex: ['Remember to lock the door.', '记得锁门。'] },
  { w: 'forget', p: '/fəˈɡet/', pos: 'v.', m: '忘记', level: 'L2', conf: ['leave'], coll: ['forget to do（忘记要做）', 'forget doing（忘记做过）'], ex: ['I forgot telling him the news.', '我忘了已经告诉过他这个消息。'] },
  { w: 'stop', p: '/stɒp/', pos: 'v.', m: '停止', level: 'L2', conf: ['stop to do（停下来去做）', 'stop doing（停止做）'], ex: ['We stopped to have a rest.', '我们停下来休息。'] },
  { w: 'used to', p: '/ˈjuːst tə/', pos: 'modal phr.', m: '过去常常（现在不）', level: 'L2', conf: ['be used to doing', 'be used to do'], ex: ['There used to be a cinema here.', '这儿过去有家电影院。'] },
  { w: 'prefer', p: '/prɪˈfɜː/', pos: 'v.', m: '更喜欢', level: 'L2', coll: ['prefer to do', 'prefer A to B', 'prefer doing to doing'], ex: ['I prefer tea to coffee.', '比起咖啡我更喜欢茶。'] },

  // ---------- L3 阅读识别词（少量示例） ----------
  { w: 'environment', p: '/ɪnˈvaɪrənmənt/', pos: 'n.', m: '环境', level: 'L3', fam: ['environmental'], ex: ['We must protect the environment.', '我们必须保护环境。'] },
  { w: 'technology', p: '/tekˈnɒlədʒi/', pos: 'n.', m: '技术', level: 'L3', fam: ['technological'], ex: ['Modern technology changes our life.', '现代科技改变生活。'] },
  { w: 'experience', p: '/ɪkˈspɪəriəns/', pos: 'n./v.', m: '经验（不可数）；经历（可数）', level: 'L3', conf: ['experiment'], ex: ['He has much teaching experience.', '他教学经验丰富。'] },
  { w: 'experiment', p: '/ɪkˈsperɪmənt/', pos: 'n./v.', m: '实验', level: 'L3', conf: ['experience'], ex: ['They are doing a chemistry experiment.', '他们在做化学实验。'] },
  { w: 'opportunity', p: '/ˌɒpəˈtjuːnəti/', pos: 'n.', m: '机会', level: 'L3', syn: ['chance'], ex: ['This is a good opportunity to practice English.', '这是练习英语的好机会。'] },
  { w: 'encourage', p: '/ɪnˈkʌrɪdʒ/', pos: 'v.', m: '鼓励', level: 'L3', ant: ['discourage'], coll: ['encourage sb to do sth'], ex: ['Parents should encourage children to read.', '家长应鼓励孩子阅读。'] },
];

export const SEED_WORDS: Word[] = SEED.map(w);
