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
  { w: 'ability', p: '/əˈbɪləti/', pos: 'n.', m: '能力；才能', level: 'L2', coll: ['the ability to do sth'], ex: ['She has the ability to solve problems quickly.', '她有快速解决问题的能力。'] },
  { w: 'advice', p: '/ədˈvaɪs/', pos: 'n.', m: '忠告；建议（不可数）', level: 'L2', conf: ['advise v.'], coll: ['a piece of advice', 'give sb some advice'], ex: ['Let me give you a piece of advice.', '让我给你一条建议。'] },
  { w: 'aim', p: '/eɪm/', pos: 'n./v.', m: '目标；旨在；瞄准', level: 'L2', coll: ['aim to do sth', 'aim at doing sth', 'achieve one’s aim'], ex: ['The course aims to improve students’ speaking skills.', '这门课旨在提高学生的口语能力。'] },
  { w: 'alarm', p: '/əˈlɑːm/', pos: 'n./v.', m: '警报；闹钟；使惊恐', level: 'L2', coll: ['set the alarm for six', 'a fire alarm'], ex: ['I set the alarm for six o’clock.', '我把闹钟定在六点。'] },
  { w: 'amount', p: '/əˈmaʊnt/', pos: 'n./v.', m: '数量；总额；总计', level: 'L2', coll: ['a large amount of + 不可数', 'amount to'], ex: ['A large amount of money was spent on the project.', '这个项目花了一大笔钱。'] },
  { w: 'anxiety', p: '/æŋˈzaɪəti/', pos: 'n.', m: '焦虑；忧虑；渴望', level: 'L2', conf: ['anxious adj.'], coll: ['anxiety about/for'], ex: ['Waiting for the results caused her great anxiety.', '等待结果让她非常焦虑。'] },
  { w: 'anyway', p: '/ˈeniweɪ/', pos: 'adv.', m: '无论如何；不管怎样', level: 'L2', ex: ['It may rain, but we shall go anyway.', '可能会下雨，但我们无论如何都要去。'] },
  { w: 'apartment', p: '/əˈpɑːtmənt/', pos: 'n.', m: '公寓（套房）', level: 'L2', syn: ['flat'], ex: ['They moved into a new apartment last month.', '他们上个月搬进了一套新公寓。'] },
  { w: 'arrival', p: '/əˈraɪvl/', pos: 'n.', m: '到达；到来', level: 'L2', coll: ['on one’s arrival', 'the arrival of'], ex: ['On his arrival at the station, he called me.', '他一到车站就给我打了电话。'] },
  { w: 'athlete', p: '/ˈæθliːt/', pos: 'n.', m: '运动员', level: 'L2', ex: ['The athlete won two gold medals in the Games.', '这位运动员在运动会上赢得两枚金牌。'] },
  { w: 'attack', p: '/əˈtæk/', pos: 'v./n.', m: '攻击；（疾病）发作；抨击', level: 'L2', coll: ['a heart attack', 'attack sb with sth'], ex: ['The old man died of a heart attack.', '那位老人死于心脏病发作。'] },
  { w: 'attention', p: '/əˈtenʃn/', pos: 'n.', m: '注意；关注', level: 'L2', coll: ['pay attention to', 'draw/attract one’s attention'], ex: ['Please pay attention to what the teacher says.', '请注意听老师讲话。'] },
  { w: 'branch', p: '/brɑːntʃ/', pos: 'n.', m: '树枝；分支；分部；支流', level: 'L2', coll: ['a branch of a bank'], ex: ['The bank has branches all over the country.', '这家银行在全国各地都有分行。'] },
  { w: 'breath', p: '/breθ/', pos: 'n.', m: '呼吸；气息', level: 'L2', coll: ['take a deep breath', 'out of breath', 'hold one’s breath'], ex: ['After running, he was completely out of breath.', '跑完之后他完全喘不上气了。'] },
  { w: 'campus', p: '/ˈkæmpəs/', pos: 'n.', m: '校园', level: 'L2', coll: ['on campus'], ex: ['There are more than 10,000 students on campus.', '校园里有一万多名学生。'] },
  { w: 'cancer', p: '/ˈkænsə/', pos: 'n.', m: '癌症；肿瘤', level: 'L2', ex: ['Smoking is one of the main causes of lung cancer.', '吸烟是肺癌的主要诱因之一。'] },
  { w: 'cause', p: '/kɔːz/', pos: 'n./v.', m: '原因；事业；引起，导致', level: 'L2', coll: ['the cause of', 'cause sb to do sth'], ex: ['The heavy rain caused the river to flood.', '大雨导致河水泛滥。'] },
  { w: 'cell', p: '/sel/', pos: 'n.', m: '细胞；电池；小牢房', level: 'L2', conf: ['sell v. 卖'], ex: ['The human body is made up of millions of cells.', '人体由数以百万计的细胞构成。'] },
  { w: 'charge', p: '/tʃɑːdʒ/', pos: 'v./n.', m: '收费；指控；充电；负责', level: 'L2', coll: ['in charge of', 'free of charge', 'charge sb for sth'], ex: ['Delivery is free of charge in this city.', '本市免费送货。'] },
  { w: 'code', p: '/kəʊd/', pos: 'n.', m: '密码；代码；准则', level: 'L2', coll: ['zip/postal code', 'a code of conduct'], ex: ['Please enter your zip code on the form.', '请在表格上填写邮政编码。'] },
  { w: 'colleague', p: '/ˈkɒliːɡ/', pos: 'n.', m: '同事；同僚', level: 'L2', ex: ['I often discuss work problems with my colleagues.', '我经常和同事讨论工作问题。'] },
  { w: 'common', p: '/ˈkɒmən/', pos: 'adj.', m: '普通的；共同的；常见的', level: 'L2', coll: ['have sth in common', 'common sense'], ex: ['The two sisters have a lot in common.', '这姐妹俩有很多共同之处。'] },
  { w: 'concern', p: '/kənˈsɜːn/', pos: 'v./n.', m: '涉及；使担忧；关心；关切', level: 'L2', coll: ['be concerned about', 'as far as ... be concerned'], ex: ['Her parents are concerned about her safety.', '她的父母担心她的安全。'] },
  { w: 'constant', p: '/ˈkɒnstənt/', pos: 'adj.', m: '持续不断的；恒定的；忠实的', level: 'L2', ex: ['There is a constant noise from the street.', '街上不断传来噪音。'] },
  { w: 'contract', p: '/ˈkɒntrækt/', pos: 'n./v.', m: '合同；契约；收缩；签约', level: 'L2', coll: ['sign a contract', 'contract with sb'], ex: ['Both companies signed the contract yesterday.', '两家公司昨天签了合同。'] },

  // ---------------- L2 四级基础（2/2） ----------------
  { w: 'courage', p: '/ˈkʌrɪdʒ/', pos: 'n.', m: '勇气；胆量', level: 'L2', coll: ['take courage', 'have the courage to do'], ex: ['She had the courage to admit her mistake.', '她有勇气承认自己的错误。'] },
  { w: 'current', p: '/ˈkʌrənt/', pos: 'adj./n.', m: '当前的；流通的；水流；电流', level: 'L2', coll: ['current affairs', 'air current'], ex: ['Please tell me your current address.', '请告诉我你现在的地址。'] },
  { w: 'debt', p: '/det/', pos: 'n.', m: '债务；欠款；恩情', level: 'L2', coll: ['in debt', 'pay off debts'], ex: ['After losing his job, he was deeply in debt.', '失业后他负债累累。'] },
  { w: 'degree', p: '/dɪˈɡriː/', pos: 'n.', m: '程度；学位；度数', level: 'L2', coll: ['a bachelor’s degree', 'to some degree'], ex: ['She got a bachelor’s degree last year.', '她去年获得了学士学位。'] },
  { w: 'design', p: '/dɪˈzaɪn/', pos: 'v./n.', m: '设计；构思；图案', level: 'L2', coll: ['be designed to do/for sth'], ex: ['The program is designed to help beginners.', '这个程序是为帮助初学者而设计的。'] },
  { w: 'detail', p: '/ˈdiːteɪl/', pos: 'n./v.', m: '细节；详情；详述', level: 'L2', coll: ['in detail', 'go into detail(s)'], ex: ['Please describe the accident in detail.', '请详细描述这起事故。'] },
  { w: 'distance', p: '/ˈdɪstəns/', pos: 'n.', m: '距离；远方；疏远', level: 'L2', coll: ['in the distance', 'keep one’s distance from'], ex: ['I could see a light in the distance.', '我能看到远处有灯光。'] },
  { w: 'domestic', p: '/dəˈmestɪk/', pos: 'adj.', m: '国内的；家庭的；驯养的', level: 'L2', coll: ['domestic and foreign', 'gross domestic product'], ex: ['The film was popular in both domestic and foreign markets.', '这部电影在国内外市场都很受欢迎。'] },
  { w: 'effort', p: '/ˈefət/', pos: 'n.', m: '努力；尽力；艰难的尝试', level: 'L2', coll: ['make an effort to do', 'spare no effort'], ex: ['He made an effort to arrive on time.', '他努力按时到达。'] },
  { w: 'element', p: '/ˈelɪmənt/', pos: 'n.', m: '元素；要素；成分', level: 'L2', ex: ['Trust is a key element in friendship.', '信任是友谊中的关键要素。'] },
  { w: 'employee', p: '/ɪmˈplɔɪiː/', pos: 'n.', m: '雇员；员工', level: 'L2', conf: ['employer 雇主', 'employment 就业'], ex: ['The company has more than 500 employees.', '这家公司有五百多名员工。'] },
  { w: 'equipment', p: '/ɪˈkwɪpmənt/', pos: 'n.', m: '装备；设备（不可数）', level: 'L2', coll: ['a piece of equipment'], ex: ['The lab bought some new equipment.', '实验室买了一些新设备。'] },
  { w: 'error', p: '/ˈerə/', pos: 'n.', m: '错误；差错', level: 'L2', syn: ['mistake'], coll: ['make an error', 'trial and error'], ex: ['The report contains several spelling errors.', '报告中有几处拼写错误。'] },
  { w: 'essay', p: '/ˈeseɪ/', pos: 'n.', m: '短文；散文；论说文', level: 'L2', ex: ['We have to write an essay every two weeks.', '我们每两周要写一篇作文。'] },
  { w: 'evidence', p: '/ˈevɪdəns/', pos: 'n.', m: '证据；证明；迹象', level: 'L2', coll: ['evidence for/of sth', 'there is evidence that...'], ex: ['There is no evidence that he told a lie.', '没有证据表明他撒谎。'] },
  { w: 'extreme', p: '/ɪkˈstriːm/', pos: 'adj./n.', m: '极端的；尽头的；极端', level: 'L2', coll: ['in the extreme', 'go to extremes'], ex: ['The heat in the desert is unpleasant in the extreme.', '沙漠里的炎热令人极其不适。'] },
  { w: 'figure', p: '/ˈfɪɡə/', pos: 'n./v.', m: '数字；人物；身材；认为；估算', level: 'L2', coll: ['figure out 弄明白', 'a key figure'], ex: ['I can’t figure out how to use this machine.', '我弄不明白怎么用这台机器。'] },
  { w: 'flight', p: '/flaɪt/', pos: 'n.', m: '航班；飞行；一段楼梯', level: 'L2', coll: ['take flight', 'Flight CA123'], ex: ['Flight CA123 to Beijing is boarding now.', '飞往北京的 CA123 航班正在登机。'] },
  { w: 'force', p: '/fɔːs/', pos: 'n./v.', m: '力量；武力；军队；强迫', level: 'L2', coll: ['force sb to do sth', 'by force'], ex: ['The poor man was forced to sell his house.', '那个可怜人被迫卖掉房子。'] },
  { w: 'fund', p: '/fʌnd/', pos: 'n./v.', m: '基金；资金；资助', level: 'L2', coll: ['raise funds', 'a relief fund'], ex: ['They are raising funds for the children’s hospital.', '他们在为儿童医院筹款。'] },
  { w: 'generation', p: '/ˌdʒenəˈreɪʃn/', pos: 'n.', m: '一代人；产生', level: 'L2', coll: ['from generation to generation'], ex: ['This story has been told from generation to generation.', '这个故事代代相传。'] },
  { w: 'globe', p: '/ɡləʊb/', pos: 'n.', m: '地球；地球仪；球体（global 全球的）', level: 'L2', ex: ['The company sells its products all over the globe.', '这家公司的产品销往全球。'] },
  { w: 'goal', p: '/ɡəʊl/', pos: 'n.', m: '目标；球门；进球', level: 'L2', coll: ['achieve/score a goal', 'set a goal'], ex: ['My main goal is to pass the CET-4 exam.', '我的主要目标是通过四级考试。'] },
  { w: 'government', p: '/ˈɡʌvənmənt/', pos: 'n.', m: '政府；内阁；治理', level: 'L2', ex: ['The government plans to build more schools here.', '政府计划在这里建更多学校。'] },
  { w: 'grasp', p: '/ɡrɑːsp/', pos: 'v./n.', m: '抓住；理解；领会', level: 'L2', coll: ['grasp an opportunity', 'have a good grasp of'], ex: ['You should grasp every chance to practice English.', '你应该抓住每次练习英语的机会。'] },

  // ---------------- L3 四级核心（高频多义动词 1/2） ----------------
  { w: 'accommodate', p: '/əˈkɒmədeɪt/', pos: 'v.', m: '容纳；为……提供住宿；适应', level: 'L3', coll: ['accommodate up to + 数字', 'accommodate oneself to'], ex: ['The new hotel can accommodate up to 300 guests.', '新酒店最多可容纳 300 位客人。'] },
  { w: 'accompany', p: '/əˈkʌmpəni/', pos: 'v.', m: '陪伴；伴随；为……伴奏', level: 'L3', coll: ['accompany sb to sp.', 'be accompanied by'], ex: ['She will accompany her grandmother to the hospital.', '她将陪奶奶去医院。'] },
  { w: 'appeal', p: '/əˈpiːl/', pos: 'v./n.', m: '呼吁；吸引；上诉', level: 'L3', coll: ['appeal to sb', 'appeal to sb to do sth', 'make an appeal'], ex: ['Pop music doesn’t appeal to me at all.', '流行音乐一点也不吸引我。'] },
  { w: 'attach', p: '/əˈtætʃ/', pos: 'v.', m: '系；贴；使依附；认为有', level: 'L3', coll: ['attach importance to', 'be attached to'], ex: ['Chinese parents attach great importance to education.', '中国父母非常重视教育。'] },
  { w: 'ban', p: '/bæn/', pos: 'v./n.', m: '禁止；禁令', level: 'L3', coll: ['ban sb from doing sth', 'a ban on sth'], ex: ['Smoking is banned in all public places.', '所有公共场所都禁止吸烟。'] },
  { w: 'calculate', p: '/ˈkælkjuleɪt/', pos: 'v.', m: '计算；估算；打算', level: 'L3', coll: ['be calculated to do sth'], ex: ['Scientists calculated that the planet is 5 billion years old.', '科学家估算这颗行星有 50 亿年历史。'] },
  { w: 'compare', p: '/kəmˈpeə/', pos: 'v.', m: '比较；比作', level: 'L3', coll: ['compare A with B 比较', 'compare A to B 把A比作B', 'compared with'], ex: ['Compared with last year, prices have risen a lot.', '与去年相比，物价上涨了不少。'] },
  { w: 'compete', p: '/kəmˈpiːt/', pos: 'v.', m: '竞争；比赛', level: 'L3', coll: ['compete with/against sb for sth'], ex: ['Several companies will compete for the contract.', '几家公司将竞标这份合同。'] },
  { w: 'concentrate', p: '/ˈkɒnsntreɪt/', pos: 'v.', m: '集中；专心；浓缩', level: 'L3', coll: ['concentrate on (doing) sth'], ex: ['I can’t concentrate on my work with the noise outside.', '外面太吵，我没法专心工作。'] },
  { w: 'conclude', p: '/kənˈkluːd/', pos: 'v.', m: '结束；得出结论；缔结', level: 'L3', coll: ['conclude that...', 'to conclude'], ex: ['The report concluded that the plan was not practical.', '报告得出结论：该计划不切实际。'] },
  { w: 'conduct', p: '/kənˈdʌkt/', pos: 'v./n.', m: '进行；指挥；传导；行为', level: 'L3', coll: ['conduct an experiment/a survey'], ex: ['The students are conducting an experiment in the lab.', '学生们正在实验室做实验。'] },
  { w: 'confirm', p: '/kənˈfɜːm/', pos: 'v.', m: '证实；确认；批准', level: 'L3', coll: ['confirm a booking', 'confirm that...'], ex: ['Please call the hotel to confirm your booking.', '请打电话向酒店确认预订。'] },
  { w: 'consider', p: '/kənˈsɪdə/', pos: 'v.', m: '考虑；认为；体谅', level: 'L3', coll: ['consider doing sth', 'consider A (as/to be) B'], ex: ['We are considering buying a new car.', '我们正在考虑买辆新车。'] },
  { w: 'consult', p: '/kənˈsʌlt/', pos: 'v.', m: '咨询；查阅；商量', level: 'L3', coll: ['consult sb about sth', 'consult a dictionary'], ex: ['You should consult a doctor about the pain.', '你应该找医生看看这个疼痛。'] },
  { w: 'contact', p: '/ˈkɒntækt/', pos: 'v./n.', m: '联系；接触；联系人', level: 'L3', coll: ['keep in contact with', 'make contact with'], ex: ['I’ve kept in contact with my old classmates.', '我一直和老同学保持联系。'] },
  { w: 'contrast', p: '/ˈkɒntrɑːst/', pos: 'n./v.', m: '对比；对照；悬殊', level: 'L3', coll: ['in contrast with/to', 'by contrast'], ex: ['In contrast to his brother, he is very quiet.', '和他哥哥相反，他很安静。'] },
  { w: 'create', p: '/kriˈeɪt/', pos: 'v.', m: '创造；创建；引起', level: 'L3', fam: ['creative adj.', 'creation n.'], ex: ['The new road created a lot of noise problems.', '新公路带来了许多噪音问题。'] },
  { w: 'deceive', p: '/dɪˈsiːv/', pos: 'v.', m: '欺骗；蒙骗', level: 'L3', coll: ['deceive sb into doing sth'], ex: ['He was deceived into buying a fake phone.', '他被骗买了一部假手机。'] },
  { w: 'defend', p: '/dɪˈfend/', pos: 'v.', m: '保卫；为……辩护', level: 'L3', coll: ['defend sb against/from sth'], ex: ['The lawyer defended the young man in court.', '律师在法庭上为这位年轻人辩护。'] },
  { w: 'derive', p: '/dɪˈraɪv/', pos: 'v.', m: '获得；起源；派生', level: 'L3', coll: ['derive from', 'derive pleasure from'], ex: ['Many English words derive from Latin.', '许多英语单词源自拉丁语。'] },
  { w: 'detect', p: '/dɪˈtekt/', pos: 'v.', m: '发现；察觉；侦察', level: 'L3', ex: ['Many cancers can be cured if detected early.', '许多癌症若能及早发现是可以治愈的。'] },
  { w: 'display', p: '/dɪˈspleɪ/', pos: 'v./n.', m: '陈列；展示；显示', level: 'L3', coll: ['on display', 'display one’s feelings'], ex: ['The latest phones are on display in the shop.', '最新款手机在店里展出。'] },
  { w: 'draft', p: '/drɑːft/', pos: 'n./v.', m: '草稿；草案；征兵；起草', level: 'L3', coll: ['the first draft', 'draft a plan'], ex: ['This is only the first draft of my essay.', '这只是我作文的初稿。'] },
  { w: 'drain', p: '/dreɪn/', pos: 'v./n.', m: '排空；耗尽；排水管', level: 'L3', coll: ['drain away/off', 'brain drain'], ex: ['The long journey drained all his energy.', '长途旅行耗尽了他所有的精力。'] },
  { w: 'emphasize', p: '/ˈemfəsaɪz/', pos: 'v.', m: '强调；着重（=emphasise）', level: 'L3', coll: ['emphasize the importance of'], ex: ['The teacher emphasized the importance of review.', '老师强调了复习的重要性。'] },

  // ---------------- L3 四级核心（高频多义动词 2/2） ----------------
  { w: 'explore', p: '/ɪkˈsplɔː/', pos: 'v.', m: '探索；勘探；探究', level: 'L3', coll: ['explore the possibility of'], ex: ['Scientists plan to explore the deep sea.', '科学家计划勘探深海。'] },
  { w: 'fulfill', p: '/fʊlˈfɪl/', pos: 'v.', m: '实现；履行；满足（=fulfil）', level: 'L3', coll: ['fulfill one’s dream/promise', 'fulfill the requirements'], ex: ['He finally fulfilled his dream of becoming a doctor.', '他终于实现了当医生的梦想。'] },
  { w: 'insist', p: '/ɪnˈsɪst/', pos: 'v.', m: '坚持；坚决要求', level: 'L3', coll: ['insist on doing sth', 'insist that... (should) do'], ex: ['She insisted on paying for the meal herself.', '她坚持要自己付饭钱。'] },
  { w: 'issue', p: '/ˈɪʃuː/', pos: 'n./v.', m: '问题；发行；发布；（刊物）期', level: 'L3', coll: ['a key issue', 'issue a statement'], ex: ['Air pollution is a serious issue in big cities.', '空气污染是大城市的严重问题。'] },
  { w: 'lack', p: '/læk/', pos: 'v./n.', m: '缺乏；不足', level: 'L3', conf: ['shortage'], coll: ['lack of sth', 'for lack of'], ex: ['The project failed for lack of money.', '这个项目因资金不足而失败。'] },
  { w: 'legal', p: '/ˈliːɡl/', pos: 'adj.', m: '法律的；合法的', level: 'L3', ant: ['illegal'], ex: ['It is legal to drive at 18 in this country.', '在这个国家年满 18 岁驾车是合法的。'] },
  { w: 'limit', p: '/ˈlɪmɪt/', pos: 'n./v.', m: '限度；限制', level: 'L3', coll: ['set a limit to', 'limit sth to...'], ex: ['Please limit your speech to five minutes.', '请把发言限制在五分钟以内。'] },
  { w: 'object', p: '/əbˈdʒekt/', pos: 'v./n.', m: '反对；物体；对象；目标', level: 'L3', conf: ['oppose'], coll: ['object to (doing) sth'], ex: ['I object to being treated like a child.', '我反对被当成小孩子对待。'] },
  { w: 'postpone', p: '/pəˈspəʊn/', pos: 'v.', m: '推迟；延期', level: 'L3', syn: ['put off', 'delay'], coll: ['postpone doing sth'], ex: ['They decided to postpone holding the meeting.', '他们决定推迟举行会议。'] },
  { w: 'present', p: '/prɪˈzent/', pos: 'v./adj./n.', m: '颁发；呈现；出席的；礼物；现在', level: 'L3', coll: ['present sb with sth', 'at present', 'be present at'], ex: ['How many people were present at the meeting?', '有多少人出席了会议？'] },
  { w: 'prevent', p: '/prɪˈvent/', pos: 'v.', m: '阻止；预防', level: 'L3', coll: ['prevent sb/sth from doing sth'], ex: ['Washing hands often can prevent disease.', '勤洗手可以预防疾病。'] },
  { w: 'provide', p: '/prəˈvaɪd/', pos: 'v.', m: '提供；供给', level: 'L3', coll: ['provide sb with sth', 'provide sth for sb'], ex: ['The school provides students with free lunch.', '学校为学生提供免费午餐。'] },
  { w: 'range', p: '/reɪndʒ/', pos: 'n./v.', m: '范围；一系列；排列；变动', level: 'L3', coll: ['a wide range of', 'range from A to B'], ex: ['The shop offers a wide range of books.', '这家商店出售种类繁多的书籍。'] },
  { w: 'recover', p: '/rɪˈkʌvə/', pos: 'v.', m: '恢复；康复；找回；挽回', level: 'L3', coll: ['recover from illness'], ex: ['He is slowly recovering from his illness.', '他正在慢慢从病中康复。'] },
  { w: 'reject', p: '/rɪˈdʒekt/', pos: 'v./n.', m: '拒绝；抛弃；次品', level: 'L3', conf: ['refuse', 'decline'], ex: ['She rejected his invitation to the party.', '她拒绝了他的聚会邀请。'] },
  { w: 'risk', p: '/rɪsk/', pos: 'n./v.', m: '风险；危险；冒险', level: 'L3', coll: ['risk doing sth', 'take/run a risk', 'at risk'], ex: ['Don’t risk going across the road in the dark.', '不要冒险在黑暗中横穿马路。'] },
  { w: 'sacrifice', p: '/ˈsækrɪfaɪs/', pos: 'v./n.', m: '牺牲；献祭；祭品', level: 'L3', coll: ['sacrifice A for B', 'make sacrifices for'], ex: ['She sacrificed her career for her family.', '她为家庭牺牲了自己的事业。'] },
  { w: 'shift', p: '/ʃɪft/', pos: 'v./n.', m: '转移；改变；轮班', level: 'L3', coll: ['shift the blame onto sb', 'night shift'], ex: ['He works the night shift at the factory.', '他在工厂上夜班。'] },
  { w: 'state', p: '/steɪt/', pos: 'n./v.', m: '状态；州；国家；陈述，说明', level: 'L3', coll: ['state one’s opinion', 'a state of emergency'], ex: ['Please state your name and address clearly.', '请清楚说明你的姓名和地址。'] },
  { w: 'support', p: '/səˈpɔːt/', pos: 'v./n.', m: '支持；支撑；供养', level: 'L3', coll: ['support a family', 'in support of'], ex: ['My parents support my decision to study abroad.', '父母支持我出国留学的决定。'] },
  { w: 'track', p: '/træk/', pos: 'n./v.', m: '跑道；踪迹；轨道；追踪', level: 'L3', coll: ['keep track of', 'track down'], ex: ['It’s hard to keep track of all the new words.', '要记住所有生词并不容易。'] },
  { w: 'treat', p: '/triːt/', pos: 'v./n.', m: '对待；治疗；款待；乐事', level: 'L3', coll: ['treat sb as...', 'treat sb to sth'], ex: ['The doctor treated the patient with great care.', '医生非常细心地治疗这位病人。'] },
  { w: 'view', p: '/vjuː/', pos: 'n./v.', m: '观点；景色；视野；看待', level: 'L3', coll: ['in view of', 'view A as B', 'point of view'], ex: ['From my point of view, the plan will work.', '在我看来，这个计划行得通。'] },
  { w: 'simplify', p: '/ˈsɪmplɪfaɪ/', pos: 'v.', m: '简化；使简明', level: 'L3', fam: ['simple adj.', 'simplicity n.'], ex: ['Try to simplify your explanation for the children.', '尽量把讲解简化，好让孩子们听懂。'] },

  // ---------------- L4 四级进阶（抽象 / 正式） ----------------
  { w: 'ambition', p: '/æmˈbɪʃn/', pos: 'n.', m: '雄心；抱负；野心', level: 'L4', fam: ['ambitious adj.'], ex: ['Her ambition is to become a great scientist.', '她的抱负是成为一名伟大的科学家。'] },
  { w: 'analysis', p: '/əˈnæləsɪs/', pos: 'n.', m: '分析；解析', level: 'L4', fam: ['analyze v.', 'analytic adj.'], ex: ['The team did a careful analysis of the data.', '团队对数据做了仔细分析。'] },
  { w: 'argument', p: '/ˈɑːɡjumənt/', pos: 'n.', m: '争论；论点；论据', level: 'L4', coll: ['have an argument with sb about sth'], ex: ['They had an argument about money.', '他们为钱吵了一架。'] },
  { w: 'authority', p: '/ɔːˈθɒrəti/', pos: 'n.', m: '权力；当局（复数）；权威', level: 'L4', coll: ['have the authority to do', 'the local authorities'], ex: ['Only the manager has the authority to sign it.', '只有经理有权签署这份文件。'] },
  { w: 'comprehensive', p: '/ˌkɒmprɪˈhensɪv/', pos: 'adj.', m: '全面的；综合的', level: 'L4', coll: ['a comprehensive review'], ex: ['The book gives a comprehensive review of grammar.', '这本书对语法做了全面复习。'] },
  { w: 'conservative', p: '/kənˈsɜːvətɪv/', pos: 'adj./n.', m: '保守的；守旧的；保守者', level: 'L4', ex: ['Older people tend to be more conservative.', '年纪大的人往往更保守。'] },
  { w: 'consideration', p: '/kənˌsɪdəˈreɪʃn/', pos: 'n.', m: '考虑；体贴；顾及', level: 'L4', coll: ['take ... into consideration'], ex: ['We must take the weather into consideration.', '我们必须把天气因素考虑进去。'] },
  { w: 'conventional', p: '/kənˈvenʃənl/', pos: 'adj.', m: '传统的；常规的；因循守旧的', level: 'L4', ant: ['unconventional'], ex: ['She prefers conventional teaching methods.', '她更喜欢传统的教学方法。'] },
  { w: 'distinction', p: '/dɪˈstɪŋkʃn/', pos: 'n.', m: '区别；差别；卓越', level: 'L4', coll: ['draw/make a distinction between A and B'], ex: ['It is important to draw a distinction between the two words.', '区分这两个词很重要。'] },
  { w: 'dynamic', p: '/daɪˈnæmɪk/', pos: 'adj./n.', m: '充满活力的；动态的；动力', level: 'L4', ant: ['static'], ex: ['The young teacher brought in dynamic new ideas.', '这位年轻教师带来了充满活力的新想法。'] },
  { w: 'implication', p: '/ˌɪmplɪˈkeɪʃn/', pos: 'n.', m: '含义；影响；牵连', level: 'L4', coll: ['the implication for sth'], ex: ['The new law has serious implications for small shops.', '新法律对小店有严重影响。'] },
  { w: 'inevitable', p: '/ɪnˈevɪtəbl/', pos: 'adj.', m: '不可避免的；必然的', level: 'L4', ex: ['Given the rain, the delay was inevitable.', '考虑到下雨，延误是不可避免的。'] },
  { w: 'infrastructure', p: '/ˈɪnfrəstrʌktʃə/', pos: 'n.', m: '基础设施（道路、电力等）', level: 'L4', ex: ['The city is investing heavily in its infrastructure.', '这座城市正在大力投资基础设施。'] },
  { w: 'innovation', p: '/ˌɪnəˈveɪʃn/', pos: 'n.', m: '创新；革新；新方法', level: 'L4', fam: ['innovate v.', 'innovative adj.'], ex: ['Technological innovation changes our daily life.', '技术革新改变着我们的日常生活。'] },
  { w: 'mechanism', p: '/ˈmekənɪzəm/', pos: 'n.', m: '机制；机械装置；办法', level: 'L4', ex: ['The body has its own defense mechanism.', '人体有自身的防御机制。'] },
  { w: 'perspective', p: '/pəˈspektɪv/', pos: 'n.', m: '视角；观点；透视法', level: 'L4', coll: ['from one’s perspective', 'put sth into perspective'], ex: ['Try to see the problem from my perspective.', '试着从我的角度看这个问题。'] },
  { w: 'potential', p: '/pəˈtenʃl/', pos: 'adj./n.', m: '潜在的；潜力；可能性', level: 'L4', coll: ['have the potential to do', 'potential customers'], ex: ['The young player has great potential.', '这位年轻选手很有潜力。'] },
  { w: 'spontaneous', p: '/spɒnˈteɪniəs/', pos: 'adj.', m: '自发的；自然的；非勉强的', level: 'L4', ex: ['The audience gave spontaneous applause.', '观众自发地鼓起掌来。'] },
  { w: 'sufficient', p: '/səˈfɪʃnt/', pos: 'adj.', m: '足够的；充分的', level: 'L4', syn: ['enough', 'adequate'], ant: ['insufficient'], ex: ['We have sufficient food for the trip.', '我们有足够旅途吃的食物。'] },
  { w: 'transparent', p: '/trænsˈpærənt/', pos: 'adj.', m: '透明的；显而易见的；坦诚的', level: 'L4', ex: ['The water in the lake is so transparent.', '湖水清澈透明。'] },
  { w: 'tremendous', p: '/trəˈmendəs/', pos: 'adj.', m: '巨大的；极好的', level: 'L4', syn: ['huge', 'enormous'], ex: ['The concert was a tremendous success.', '音乐会取得了巨大成功。'] },
  { w: 'universal', p: '/ˌjuːnɪˈvɜːsl/', pos: 'adj.', m: '普遍的；全体的；通用的', level: 'L4', coll: ['universal truth'], ex: ['Music is a universal language.', '音乐是一种通用语言。'] },
  { w: 'verify', p: '/ˈverɪfaɪ/', pos: 'v.', m: '核实；证实；查对', level: 'L4', ex: ['Please verify your email address again.', '请再次核实你的邮箱地址。'] },
  { w: 'violate', p: '/ˈvaɪəleɪt/', pos: 'v.', m: '违反；侵犯；亵渎', level: 'L4', coll: ['violate the law/rule'], ex: ['Drivers who violate the rules will be fined.', '违反规则的司机将被罚款。'] },
  { w: 'volunteer', p: '/ˌvɒlənˈtɪə/', pos: 'n./v.', m: '志愿者；自愿（做）', level: 'L4', coll: ['volunteer to do sth'], ex: ['Many students volunteered to clean the park.', '许多学生自愿去打扫公园。'] },

  // ---------------- L5 高分易混（四级词汇题常设辨析陷阱，成对记忆） ----------------
  { w: 'arise', p: '/əˈraɪz/', pos: 'v.', m: '（问题、困难）出现；产生；起立', level: 'L5', conf: ['rise', 'raise', 'arouse'], coll: ['arise from/out of'], ex: ['New problems arose every day.', '每天都有新问题出现。'] },
  { w: 'arouse', p: '/əˈraʊz/', pos: 'v.', m: '唤起；激起（兴趣、怀疑、愤怒）', level: 'L5', conf: ['arise', 'raise'], coll: ['arouse one’s interest/suspicion'], ex: ['The speech aroused great interest.', '演讲激起了极大兴趣。'] },
  { w: 'complement', p: '/ˈkɒmplɪmənt/', pos: 'n./v.', m: '补足物；补充；与……相配', level: 'L5', conf: ['compliment'], ex: ['The wine is a perfect complement to the fish.', '这款酒与鱼是完美的搭配。'] },
  { w: 'compliment', p: '/ˈkɒmplɪmənt/', pos: 'n./v.', m: '恭维；赞美；问候', level: 'L5', conf: ['complement'], coll: ['pay sb a compliment'], ex: ['She paid me a compliment on my English.', '她夸我英语说得好。'] },
  { w: 'considerable', p: '/kənˈsɪdərəbl/', pos: 'adj.', m: '相当大（多）的；可观的', level: 'L5', conf: ['considerate'], ex: ['The project cost a considerable amount of money.', '这个项目花了相当多的钱。'] },
  { w: 'considerate', p: '/kənˈsɪdərət/', pos: 'adj.', m: '体贴的；考虑周到的', level: 'L5', conf: ['considerable'], coll: ['be considerate of/to sb'], ex: ['It was considerate of you to send her home.', '你送她回家，真是体贴。'] },
  { w: 'economic', p: '/ˌiːkəˈnɒmɪk/', pos: 'adj.', m: '经济（学）的；与经济有关的', level: 'L5', conf: ['economical'], coll: ['economic growth'], ex: ['The country has enjoyed rapid economic growth.', '这个国家实现了快速的经济增长。'] },
  { w: 'economical', p: '/ˌiːkəˈnɒmɪkl/', pos: 'adj.', m: '节约的；省钱的；经济实惠的', level: 'L5', conf: ['economic'], coll: ['be economical with fuel'], ex: ['This small car is economical to run.', '这辆小车用起来很省油省钱。'] },
  { w: 'efficient', p: '/ɪˈfɪʃnt/', pos: 'adj.', m: '效率高的；能干的', level: 'L5', conf: ['effective'], ex: ['She is an efficient secretary.', '她是一位效率很高的秘书。'] },
  { w: 'effective', p: '/ɪˈfektɪv/', pos: 'adj.', m: '有效的；起作用的', level: 'L5', conf: ['efficient'], coll: ['effective measures'], ex: ['We must take effective measures at once.', '我们必须立即采取有效措施。'] },
  { w: 'sensible', p: '/ˈsensəbl/', pos: 'adj.', m: '明智的；合理的；意识到的', level: 'L5', conf: ['sensitive'], coll: ['a sensible choice'], ex: ['It is sensible to save some money.', '存点钱是明智的。'] },
  { w: 'sensitive', p: '/ˈsensətɪv/', pos: 'adj.', m: '敏感的；灵敏的；易受伤害的', level: 'L5', conf: ['sensible'], coll: ['be sensitive to'], ex: ['Don’t be so sensitive to his joke.', '别对他的玩笑这么敏感。'] },
  { w: 'respectable', p: '/rɪˈspektəbl/', pos: 'adj.', m: '可敬的；体面的；相当大的', level: 'L5', conf: ['respective', 'respectful'], ex: ['He came from a respectable family.', '他出身于一个体面的家庭。'] },
  { w: 'respective', p: '/rɪˈspektɪv/', pos: 'adj.', m: '各自的；分别的', level: 'L5', conf: ['respectable', 'respectful'], ex: ['The boys went to their respective rooms.', '男孩们各自回到自己的房间。'] },
  { w: 'principal', p: '/ˈprɪnsəpl/', pos: 'adj./n.', m: '主要的；校长；本金', level: 'L5', conf: ['principle n. 原则'], coll: ['the principal reason'], ex: ['The principal reason for failure was lack of money.', '失败的主要原因是缺钱。'] },
  { w: 'assure', p: '/əˈʃʊə/', pos: 'v.', m: '向……保证；使确信', level: 'L5', conf: ['ensure', 'insure'], coll: ['assure sb of sth', 'rest assured'], ex: ['I assure you that the news is true.', '我向你保证这消息是真的。'] },
  { w: 'insure', p: '/ɪnˈʃʊə/', pos: 'v.', m: '给……投保；保险', level: 'L5', conf: ['assure', 'ensure'], coll: ['insure sth against fire', 'insurance n.'], ex: ['We insured the house against fire.', '我们给房子保了火险。'] },
  { w: 'crush', p: '/krʌʃ/', pos: 'v./n.', m: '压碎；镇压；拥挤的人群', level: 'L5', conf: ['crash 碰撞/坠毁'], coll: ['crush sth into pieces'], ex: ['The machine crushes stones into small pieces.', '机器把石头压成碎块。'] },
];

export const CET4_WORDS: Word[] = WORDS.map(mk);
