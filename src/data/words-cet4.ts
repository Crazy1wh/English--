import type { SourceKind, Word, WordLevel } from '@/types';

// ============================================================
// CET-4 高频核心词补充（与 words.ts / words-extra.ts 按 id 去重合并）
// 面向有初中基础、以大学四级为目标的学习者。source='manual'，
// 音标/释义为通用语言事实；frequencyScore=0（无权威词频，不臆造）。
//
//   L2 四级基础：高中→四级过渡的高频名词/动词/形容词
//   L3 四级核心：多义高频动词与搭配，直接影响完形/阅读/写作
//   L4 四级进阶：较正式、抽象的词
//   L5 高分易混：四级考试常设辨析陷阱的形近/义近词
// ============================================================

interface Seed {
  w: string;
  p: string;
  pos: string;
  m: string;
  level: WordLevel;
  ex?: [string, string];
  coll?: string[];
  syn?: string[];
  ant?: string[];
  conf?: string[];
  fam?: string[];
}

function mk(s: Seed): Word {
  return {
    id: `word.${s.w.replace(/\s+/g, '_')}`,
    word: s.w,
    phonetic: s.p,
    partOfSpeech: s.pos,
    coreMeaning: s.m,
    examMeanings: [],
    level: s.level,
    frequencyScore: 0,
    phrases: [],
    collocations: s.coll ?? [],
    synonyms: s.syn ?? [],
    antonyms: s.ant ?? [],
    confusingWords: s.conf ?? [],
    wordFamily: s.fam ?? [],
    exampleSentence: s.ex ? { en: s.ex[0], zh: s.ex[1] } : null,
    source: 'manual' as SourceKind,
    examYears: [],
  };
}

const WORDS: Seed[] = [
  // ---------------- L2 四级基础（1/2） ----------------
  { w: 'ability', p: '/əˈbɪləti/', pos: 'n.', m: '能力；才能', level: 'L2', coll: ['the ability to do sth'] },
  { w: 'advice', p: '/ədˈvaɪs/', pos: 'n.', m: '忠告；建议（不可数）', level: 'L2', conf: ['advise v.'], coll: ['a piece of advice', 'give sb some advice'] },
  { w: 'aim', p: '/eɪm/', pos: 'n./v.', m: '目标；旨在；瞄准', level: 'L2', coll: ['aim to do sth', 'aim at doing sth', 'achieve one’s aim'] },
  { w: 'alarm', p: '/əˈlɑːm/', pos: 'n./v.', m: '警报；闹钟；使惊恐', level: 'L2', coll: ['set the alarm for six', 'a fire alarm'] },
  { w: 'amount', p: '/əˈmaʊnt/', pos: 'n./v.', m: '数量；总额；总计', level: 'L2', coll: ['a large amount of + 不可数', 'amount to'] },
  { w: 'anxiety', p: '/æŋˈzaɪəti/', pos: 'n.', m: '焦虑；忧虑；渴望', level: 'L2', conf: ['anxious adj.'], coll: ['anxiety about/for'] },
  { w: 'anyway', p: '/ˈeniweɪ/', pos: 'adv.', m: '无论如何；不管怎样', level: 'L2' },
  { w: 'apartment', p: '/əˈpɑːtmənt/', pos: 'n.', m: '公寓（套房）', level: 'L2', syn: ['flat'] },
  { w: 'arrival', p: '/əˈraɪvl/', pos: 'n.', m: '到达；到来', level: 'L2', coll: ['on one’s arrival', 'the arrival of'] },
  { w: 'athlete', p: '/ˈæθliːt/', pos: 'n.', m: '运动员', level: 'L2' },
  { w: 'attack', p: '/əˈtæk/', pos: 'v./n.', m: '攻击；（疾病）发作；抨击', level: 'L2', coll: ['a heart attack', 'attack sb with sth'] },
  { w: 'attention', p: '/əˈtenʃn/', pos: 'n.', m: '注意；关注', level: 'L2', coll: ['pay attention to', 'draw/attract one’s attention'] },
  { w: 'branch', p: '/brɑːntʃ/', pos: 'n.', m: '树枝；分支；分部；支流', level: 'L2', coll: ['a branch of a bank'] },
  { w: 'breath', p: '/breθ/', pos: 'n.', m: '呼吸；气息', level: 'L2', coll: ['take a deep breath', 'out of breath', 'hold one’s breath'] },
  { w: 'campus', p: '/ˈkæmpəs/', pos: 'n.', m: '校园', level: 'L2', coll: ['on campus'] },
  { w: 'cancer', p: '/ˈkænsə/', pos: 'n.', m: '癌症；肿瘤', level: 'L2' },
  { w: 'cause', p: '/kɔːz/', pos: 'n./v.', m: '原因；事业；引起，导致', level: 'L2', coll: ['the cause of', 'cause sb to do sth'] },
  { w: 'cell', p: '/sel/', pos: 'n.', m: '细胞；电池；小牢房', level: 'L2', conf: ['sell v. 卖'] },
  { w: 'charge', p: '/tʃɑːdʒ/', pos: 'v./n.', m: '收费；指控；充电；负责', level: 'L2', coll: ['in charge of', 'free of charge', 'charge sb for sth'] },
  { w: 'code', p: '/kəʊd/', pos: 'n.', m: '密码；代码；准则', level: 'L2', coll: ['zip/postal code', 'a code of conduct'] },
  { w: 'colleague', p: '/ˈkɒliːɡ/', pos: 'n.', m: '同事；同僚', level: 'L2' },
  { w: 'common', p: '/ˈkɒmən/', pos: 'adj.', m: '普通的；共同的；常见的', level: 'L2', coll: ['have sth in common', 'common sense'] },
  { w: 'concern', p: '/kənˈsɜːn/', pos: 'v./n.', m: '涉及；使担忧；关心；关切', level: 'L2', coll: ['be concerned about', 'as far as ... be concerned'] },
  { w: 'constant', p: '/ˈkɒnstənt/', pos: 'adj.', m: '持续不断的；恒定的；忠实的', level: 'L2' },
  { w: 'contract', p: '/ˈkɒntrækt/', pos: 'n./v.', m: '合同；契约；收缩；签约', level: 'L2', coll: ['sign a contract', 'contract with sb'] },

  // ---------------- L2 四级基础（2/2） ----------------
  { w: 'courage', p: '/ˈkʌrɪdʒ/', pos: 'n.', m: '勇气；胆量', level: 'L2', coll: ['take courage', 'have the courage to do'] },
  { w: 'current', p: '/ˈkʌrənt/', pos: 'adj./n.', m: '当前的；流通的；水流；电流', level: 'L2', coll: ['current affairs', 'air current'] },
  { w: 'debt', p: '/det/', pos: 'n.', m: '债务；欠款；恩情', level: 'L2', coll: ['in debt', 'pay off debts'] },
  { w: 'degree', p: '/dɪˈɡriː/', pos: 'n.', m: '程度；学位；度数', level: 'L2', coll: ['a bachelor’s degree', 'to some degree'] },
  { w: 'design', p: '/dɪˈzaɪn/', pos: 'v./n.', m: '设计；构思；图案', level: 'L2', coll: ['be designed to do/for sth'] },
  { w: 'detail', p: '/ˈdiːteɪl/', pos: 'n./v.', m: '细节；详情；详述', level: 'L2', coll: ['in detail', 'go into detail(s)'] },
  { w: 'distance', p: '/ˈdɪstəns/', pos: 'n.', m: '距离；远方；疏远', level: 'L2', coll: ['in the distance', 'keep one’s distance from'] },
  { w: 'domestic', p: '/dəˈmestɪk/', pos: 'adj.', m: '国内的；家庭的；驯养的', level: 'L2', coll: ['domestic and foreign', 'gross domestic product'] },
  { w: 'effort', p: '/ˈefət/', pos: 'n.', m: '努力；尽力；艰难的尝试', level: 'L2', coll: ['make an effort to do', 'spare no effort'] },
  { w: 'element', p: '/ˈelɪmənt/', pos: 'n.', m: '元素；要素；成分', level: 'L2' },
  { w: 'employee', p: '/ɪmˈplɔɪiː/', pos: 'n.', m: '雇员；员工', level: 'L2', conf: ['employer 雇主', 'employment 就业'] },
  { w: 'equipment', p: '/ɪˈkwɪpmənt/', pos: 'n.', m: '装备；设备（不可数）', level: 'L2', coll: ['a piece of equipment'] },
  { w: 'error', p: '/ˈerə/', pos: 'n.', m: '错误；差错', level: 'L2', syn: ['mistake'], coll: ['make an error', 'trial and error'] },
  { w: 'essay', p: '/ˈeseɪ/', pos: 'n.', m: '短文；散文；论说文', level: 'L2' },
  { w: 'evidence', p: '/ˈevɪdəns/', pos: 'n.', m: '证据；证明；迹象', level: 'L2', coll: ['evidence for/of sth', 'there is evidence that...'] },
  { w: 'extreme', p: '/ɪkˈstriːm/', pos: 'adj./n.', m: '极端的；尽头的；极端', level: 'L2', coll: ['in the extreme', 'go to extremes'] },
  { w: 'figure', p: '/ˈfɪɡə/', pos: 'n./v.', m: '数字；人物；身材；认为；估算', level: 'L2', coll: ['figure out 弄明白', 'a key figure'] },
  { w: 'flight', p: '/flaɪt/', pos: 'n.', m: '航班；飞行；一段楼梯', level: 'L2', coll: ['take flight', 'Flight CA123'] },
  { w: 'force', p: '/fɔːs/', pos: 'n./v.', m: '力量；武力；军队；强迫', level: 'L2', coll: ['force sb to do sth', 'by force'] },
  { w: 'fund', p: '/fʌnd/', pos: 'n./v.', m: '基金；资金；资助', level: 'L2', coll: ['raise funds', 'a relief fund'] },
  { w: 'generation', p: '/ˌdʒenəˈreɪʃn/', pos: 'n.', m: '一代人；产生', level: 'L2', coll: ['from generation to generation'] },
  { w: 'globe', p: '/ɡləʊb/', pos: 'n.', m: '地球；地球仪；球体（global 全球的）', level: 'L2' },
  { w: 'goal', p: '/ɡəʊl/', pos: 'n.', m: '目标；球门；进球', level: 'L2', coll: ['achieve/score a goal', 'set a goal'] },
  { w: 'government', p: '/ˈɡʌvənmənt/', pos: 'n.', m: '政府；内阁；治理', level: 'L2' },
  { w: 'grasp', p: '/ɡrɑːsp/', pos: 'v./n.', m: '抓住；理解；领会', level: 'L2', coll: ['grasp an opportunity', 'have a good grasp of'] },

  // ---------------- L3 四级核心（高频多义动词 1/2） ----------------
  { w: 'accommodate', p: '/əˈkɒmədeɪt/', pos: 'v.', m: '容纳；为……提供住宿；适应', level: 'L3', coll: ['accommodate up to + 数字', 'accommodate oneself to'] },
  { w: 'accompany', p: '/əˈkʌmpəni/', pos: 'v.', m: '陪伴；伴随；为……伴奏', level: 'L3', coll: ['accompany sb to sp.', 'be accompanied by'] },
  { w: 'appeal', p: '/əˈpiːl/', pos: 'v./n.', m: '呼吁；吸引；上诉', level: 'L3', coll: ['appeal to sb', 'appeal to sb to do sth', 'make an appeal'] },
  { w: 'attach', p: '/əˈtætʃ/', pos: 'v.', m: '系；贴；使依附；认为有', level: 'L3', coll: ['attach importance to', 'be attached to'] },
  { w: 'ban', p: '/bæn/', pos: 'v./n.', m: '禁止；禁令', level: 'L3', coll: ['ban sb from doing sth', 'a ban on sth'] },
  { w: 'calculate', p: '/ˈkælkjuleɪt/', pos: 'v.', m: '计算；估算；打算', level: 'L3', coll: ['be calculated to do sth'] },
  { w: 'compare', p: '/kəmˈpeə/', pos: 'v.', m: '比较；比作', level: 'L3', coll: ['compare A with B 比较', 'compare A to B 把A比作B', 'compared with'] },
  { w: 'compete', p: '/kəmˈpiːt/', pos: 'v.', m: '竞争；比赛', level: 'L3', coll: ['compete with/against sb for sth'] },
  { w: 'concentrate', p: '/ˈkɒnsntreɪt/', pos: 'v.', m: '集中；专心；浓缩', level: 'L3', coll: ['concentrate on (doing) sth'] },
  { w: 'conclude', p: '/kənˈkluːd/', pos: 'v.', m: '结束；得出结论；缔结', level: 'L3', coll: ['conclude that...', 'to conclude'] },
  { w: 'conduct', p: '/kənˈdʌkt/', pos: 'v./n.', m: '进行；指挥；传导；行为', level: 'L3', coll: ['conduct an experiment/a survey'] },
  { w: 'confirm', p: '/kənˈfɜːm/', pos: 'v.', m: '证实；确认；批准', level: 'L3', coll: ['confirm a booking', 'confirm that...'] },
  { w: 'consider', p: '/kənˈsɪdə/', pos: 'v.', m: '考虑；认为；体谅', level: 'L3', coll: ['consider doing sth', 'consider A (as/to be) B'] },
  { w: 'consult', p: '/kənˈsʌlt/', pos: 'v.', m: '咨询；查阅；商量', level: 'L3', coll: ['consult sb about sth', 'consult a dictionary'] },
  { w: 'contact', p: '/ˈkɒntækt/', pos: 'v./n.', m: '联系；接触；联系人', level: 'L3', coll: ['keep in contact with', 'make contact with'] },
  { w: 'contrast', p: '/ˈkɒntrɑːst/', pos: 'n./v.', m: '对比；对照；悬殊', level: 'L3', coll: ['in contrast with/to', 'by contrast'] },
  { w: 'create', p: '/kriˈeɪt/', pos: 'v.', m: '创造；创建；引起', level: 'L3', fam: ['creative adj.', 'creation n.'] },
  { w: 'deceive', p: '/dɪˈsiːv/', pos: 'v.', m: '欺骗；蒙骗', level: 'L3', coll: ['deceive sb into doing sth'] },
  { w: 'defend', p: '/dɪˈfend/', pos: 'v.', m: '保卫；为……辩护', level: 'L3', coll: ['defend sb against/from sth'] },
  { w: 'derive', p: '/dɪˈraɪv/', pos: 'v.', m: '获得；起源；派生', level: 'L3', coll: ['derive from', 'derive pleasure from'] },
  { w: 'detect', p: '/dɪˈtekt/', pos: 'v.', m: '发现；察觉；侦察', level: 'L3' },
  { w: 'display', p: '/dɪˈspleɪ/', pos: 'v./n.', m: '陈列；展示；显示', level: 'L3', coll: ['on display', 'display one’s feelings'] },
  { w: 'draft', p: '/drɑːft/', pos: 'n./v.', m: '草稿；草案；征兵；起草', level: 'L3', coll: ['the first draft', 'draft a plan'] },
  { w: 'drain', p: '/dreɪn/', pos: 'v./n.', m: '排空；耗尽；排水管', level: 'L3', coll: ['drain away/off', 'brain drain'] },
  { w: 'emphasize', p: '/ˈemfəsaɪz/', pos: 'v.', m: '强调；着重（=emphasise）', level: 'L3', coll: ['emphasize the importance of'] },

  // ---------------- L3 四级核心（高频多义动词 2/2） ----------------
  { w: 'explore', p: '/ɪkˈsplɔː/', pos: 'v.', m: '探索；勘探；探究', level: 'L3', coll: ['explore the possibility of'] },
  { w: 'fulfill', p: '/fʊlˈfɪl/', pos: 'v.', m: '实现；履行；满足（=fulfil）', level: 'L3', coll: ['fulfill one’s dream/promise', 'fulfill the requirements'] },
  { w: 'insist', p: '/ɪnˈsɪst/', pos: 'v.', m: '坚持；坚决要求', level: 'L3', coll: ['insist on doing sth', 'insist that... (should) do'] },
  { w: 'issue', p: '/ˈɪʃuː/', pos: 'n./v.', m: '问题；发行；发布；（刊物）期', level: 'L3', coll: ['a key issue', 'issue a statement'] },
  { w: 'lack', p: '/læk/', pos: 'v./n.', m: '缺乏；不足', level: 'L3', conf: ['shortage'], coll: ['lack of sth', 'for lack of'] },
  { w: 'legal', p: '/ˈliːɡl/', pos: 'adj.', m: '法律的；合法的', level: 'L3', ant: ['illegal'] },
  { w: 'limit', p: '/ˈlɪmɪt/', pos: 'n./v.', m: '限度；限制', level: 'L3', coll: ['set a limit to', 'limit sth to...'] },
  { w: 'object', p: '/əbˈdʒekt/', pos: 'v./n.', m: '反对；物体；对象；目标', level: 'L3', conf: ['oppose'], coll: ['object to (doing) sth'] },
  { w: 'postpone', p: '/pəˈspəʊn/', pos: 'v.', m: '推迟；延期', level: 'L3', syn: ['put off', 'delay'], coll: ['postpone doing sth'] },
  { w: 'present', p: '/prɪˈzent/', pos: 'v./adj./n.', m: '颁发；呈现；出席的；礼物；现在', level: 'L3', coll: ['present sb with sth', 'at present', 'be present at'] },
  { w: 'prevent', p: '/prɪˈvent/', pos: 'v.', m: '阻止；预防', level: 'L3', coll: ['prevent sb/sth from doing sth'] },
  { w: 'provide', p: '/prəˈvaɪd/', pos: 'v.', m: '提供；供给', level: 'L3', coll: ['provide sb with sth', 'provide sth for sb'] },
  { w: 'range', p: '/reɪndʒ/', pos: 'n./v.', m: '范围；一系列；排列；变动', level: 'L3', coll: ['a wide range of', 'range from A to B'] },
  { w: 'recover', p: '/rɪˈkʌvə/', pos: 'v.', m: '恢复；康复；找回；挽回', level: 'L3', coll: ['recover from illness'] },
  { w: 'reject', p: '/rɪˈdʒekt/', pos: 'v./n.', m: '拒绝；抛弃；次品', level: 'L3', conf: ['refuse', 'decline'] },
  { w: 'risk', p: '/rɪsk/', pos: 'n./v.', m: '风险；危险；冒险', level: 'L3', coll: ['risk doing sth', 'take/run a risk', 'at risk'] },
  { w: 'sacrifice', p: '/ˈsækrɪfaɪs/', pos: 'v./n.', m: '牺牲；献祭；祭品', level: 'L3', coll: ['sacrifice A for B', 'make sacrifices for'] },
  { w: 'shift', p: '/ʃɪft/', pos: 'v./n.', m: '转移；改变；轮班', level: 'L3', coll: ['shift the blame onto sb', 'night shift'] },
  { w: 'state', p: '/steɪt/', pos: 'n./v.', m: '状态；州；国家；陈述，说明', level: 'L3', coll: ['state one’s opinion', 'a state of emergency'] },
  { w: 'support', p: '/səˈpɔːt/', pos: 'v./n.', m: '支持；支撑；供养', level: 'L3', coll: ['support a family', 'in support of'] },
  { w: 'track', p: '/træk/', pos: 'n./v.', m: '跑道；踪迹；轨道；追踪', level: 'L3', coll: ['keep track of', 'track down'] },
  { w: 'treat', p: '/triːt/', pos: 'v./n.', m: '对待；治疗；款待；乐事', level: 'L3', coll: ['treat sb as...', 'treat sb to sth'] },
  { w: 'view', p: '/vjuː/', pos: 'n./v.', m: '观点；景色；视野；看待', level: 'L3', coll: ['in view of', 'view A as B', 'point of view'] },
  { w: 'simplify', p: '/ˈsɪmplɪfaɪ/', pos: 'v.', m: '简化；使简明', level: 'L3', fam: ['simple adj.', 'simplicity n.'] },

  // ---------------- L4 四级进阶（抽象 / 正式） ----------------
  { w: 'ambition', p: '/æmˈbɪʃn/', pos: 'n.', m: '雄心；抱负；野心', level: 'L4', fam: ['ambitious adj.'] },
  { w: 'analysis', p: '/əˈnæləsɪs/', pos: 'n.', m: '分析；解析', level: 'L4', fam: ['analyze v.', 'analytic adj.'] },
  { w: 'argument', p: '/ˈɑːɡjumənt/', pos: 'n.', m: '争论；论点；论据', level: 'L4', coll: ['have an argument with sb about sth'] },
  { w: 'authority', p: '/ɔːˈθɒrəti/', pos: 'n.', m: '权力；当局（复数）；权威', level: 'L4', coll: ['have the authority to do', 'the local authorities'] },
  { w: 'comprehensive', p: '/ˌkɒmprɪˈhensɪv/', pos: 'adj.', m: '全面的；综合的', level: 'L4', coll: ['a comprehensive review'] },
  { w: 'conservative', p: '/kənˈsɜːvətɪv/', pos: 'adj./n.', m: '保守的；守旧的；保守者', level: 'L4' },
  { w: 'consideration', p: '/kənˌsɪdəˈreɪʃn/', pos: 'n.', m: '考虑；体贴；顾及', level: 'L4', coll: ['take ... into consideration'] },
  { w: 'conventional', p: '/kənˈvenʃənl/', pos: 'adj.', m: '传统的；常规的；因循守旧的', level: 'L4', ant: ['unconventional'] },
  { w: 'distinction', p: '/dɪˈstɪŋkʃn/', pos: 'n.', m: '区别；差别；卓越', level: 'L4', coll: ['draw/make a distinction between A and B'] },
  { w: 'dynamic', p: '/daɪˈnæmɪk/', pos: 'adj./n.', m: '充满活力的；动态的；动力', level: 'L4', ant: ['static'] },
  { w: 'implication', p: '/ˌɪmplɪˈkeɪʃn/', pos: 'n.', m: '含义；影响；牵连', level: 'L4', coll: ['the implication for sth'] },
  { w: 'inevitable', p: '/ɪnˈevɪtəbl/', pos: 'adj.', m: '不可避免的；必然的', level: 'L4' },
  { w: 'infrastructure', p: '/ˈɪnfrəstrʌktʃə/', pos: 'n.', m: '基础设施（道路、电力等）', level: 'L4' },
  { w: 'innovation', p: '/ˌɪnəˈveɪʃn/', pos: 'n.', m: '创新；革新；新方法', level: 'L4', fam: ['innovate v.', 'innovative adj.'] },
  { w: 'mechanism', p: '/ˈmekənɪzəm/', pos: 'n.', m: '机制；机械装置；办法', level: 'L4' },
  { w: 'perspective', p: '/pəˈspektɪv/', pos: 'n.', m: '视角；观点；透视法', level: 'L4', coll: ['from one’s perspective', 'put sth into perspective'] },
  { w: 'potential', p: '/pəˈtenʃl/', pos: 'adj./n.', m: '潜在的；潜力；可能性', level: 'L4', coll: ['have the potential to do', 'potential customers'] },
  { w: 'spontaneous', p: '/spɒnˈteɪniəs/', pos: 'adj.', m: '自发的；自然的；非勉强的', level: 'L4' },
  { w: 'sufficient', p: '/səˈfɪʃnt/', pos: 'adj.', m: '足够的；充分的', level: 'L4', syn: ['enough', 'adequate'], ant: ['insufficient'] },
  { w: 'transparent', p: '/trænsˈpærənt/', pos: 'adj.', m: '透明的；显而易见的；坦诚的', level: 'L4' },
  { w: 'tremendous', p: '/trəˈmendəs/', pos: 'adj.', m: '巨大的；极好的', level: 'L4', syn: ['huge', 'enormous'] },
  { w: 'universal', p: '/ˌjuːnɪˈvɜːsl/', pos: 'adj.', m: '普遍的；全体的；通用的', level: 'L4', coll: ['universal truth'] },
  { w: 'verify', p: '/ˈverɪfaɪ/', pos: 'v.', m: '核实；证实；查对', level: 'L4' },
  { w: 'violate', p: '/ˈvaɪəleɪt/', pos: 'v.', m: '违反；侵犯；亵渎', level: 'L4', coll: ['violate the law/rule'] },
  { w: 'volunteer', p: '/ˌvɒlənˈtɪə/', pos: 'n./v.', m: '志愿者；自愿（做）', level: 'L4', coll: ['volunteer to do sth'] },

  // ---------------- L5 高分易混（四级词汇题常设辨析陷阱，成对记忆） ----------------
  { w: 'arise', p: '/əˈraɪz/', pos: 'v.', m: '（问题、困难）出现；产生；起立', level: 'L5', conf: ['rise', 'raise', 'arouse'], coll: ['arise from/out of'], ex: ['New problems arose every day.', '每天都有新问题出现。'] },
  { w: 'arouse', p: '/əˈraʊz/', pos: 'v.', m: '唤起；激起（兴趣、怀疑、愤怒）', level: 'L5', conf: ['arise', 'raise'], coll: ['arouse one’s interest/suspicion'], ex: ['The speech aroused great interest.', '演讲激起了极大兴趣。'] },
  { w: 'complement', p: '/ˈkɒmplɪmənt/', pos: 'n./v.', m: '补足物；补充；与……相配', level: 'L5', conf: ['compliment'] },
  { w: 'compliment', p: '/ˈkɒmplɪmənt/', pos: 'n./v.', m: '恭维；赞美；问候', level: 'L5', conf: ['complement'], coll: ['pay sb a compliment'] },
  { w: 'considerable', p: '/kənˈsɪdərəbl/', pos: 'adj.', m: '相当大（多）的；可观的', level: 'L5', conf: ['considerate'] },
  { w: 'considerate', p: '/kənˈsɪdərət/', pos: 'adj.', m: '体贴的；考虑周到的', level: 'L5', conf: ['considerable'], coll: ['be considerate of/to sb'] },
  { w: 'economic', p: '/ˌiːkəˈnɒmɪk/', pos: 'adj.', m: '经济（学）的；与经济有关的', level: 'L5', conf: ['economical'], coll: ['economic growth'] },
  { w: 'economical', p: '/ˌiːkəˈnɒmɪkl/', pos: 'adj.', m: '节约的；省钱的；经济实惠的', level: 'L5', conf: ['economic'], coll: ['be economical with fuel'] },
  { w: 'efficient', p: '/ɪˈfɪʃnt/', pos: 'adj.', m: '效率高的；能干的', level: 'L5', conf: ['effective'] },
  { w: 'effective', p: '/ɪˈfektɪv/', pos: 'adj.', m: '有效的；起作用的', level: 'L5', conf: ['efficient'], coll: ['effective measures'] },
  { w: 'sensible', p: '/ˈsensəbl/', pos: 'adj.', m: '明智的；合理的；意识到的', level: 'L5', conf: ['sensitive'], coll: ['a sensible choice'] },
  { w: 'sensitive', p: '/ˈsensətɪv/', pos: 'adj.', m: '敏感的；灵敏的；易受伤害的', level: 'L5', conf: ['sensible'], coll: ['be sensitive to'] },
  { w: 'respectable', p: '/rɪˈspektəbl/', pos: 'adj.', m: '可敬的；体面的；相当大的', level: 'L5', conf: ['respective', 'respectful'] },
  { w: 'respective', p: '/rɪˈspektɪv/', pos: 'adj.', m: '各自的；分别的', level: 'L5', conf: ['respectable', 'respectful'] },
  { w: 'principal', p: '/ˈprɪnsəpl/', pos: 'adj./n.', m: '主要的；校长；本金', level: 'L5', conf: ['principle n. 原则'], coll: ['the principal reason'] },
  { w: 'assure', p: '/əˈʃʊə/', pos: 'v.', m: '向……保证；使确信', level: 'L5', conf: ['ensure', 'insure'], coll: ['assure sb of sth', 'rest assured'] },
  { w: 'insure', p: '/ɪnˈʃʊə/', pos: 'v.', m: '给……投保；保险', level: 'L5', conf: ['assure', 'ensure'], coll: ['insure sth against fire', 'insurance n.'] },
  { w: 'crush', p: '/krʌʃ/', pos: 'v./n.', m: '压碎；镇压；拥挤的人群', level: 'L5', conf: ['crash 碰撞/坠毁'], coll: ['crush sth into pieces'] },
];

export const CET4_WORDS: Word[] = WORDS.map(mk);
