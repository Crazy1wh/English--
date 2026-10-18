import type { WritingKit } from '@/types';

// 写作系统：格式 / 功能表达 / 连接表达 / 安全句型（文档第十一章）
// 核心理念：内容完整、格式正确、语法正确、意思清楚 —— 先保底，不炫技。
export const WRITING_KITS: WritingKit[] = [
  {
    id: 'invitation',
    knowledgeId: 'writing.W2',
    title: '邀请信',
    format: ['开头：问候 / 说明写信目的（邀请）', '主体：活动内容、时间、地点', '结尾：期待对方参加并回复', '落款：Yours, 姓名'],
    functionalExpressions: [
      "I'm writing to invite you to...",
      'We would be very happy if you could come.',
      'The party will be held in/at... on...',
      'I am looking forward to your reply.',
    ],
    connectors: ['First of all', 'Besides', 'What is more', 'Finally'],
    safeSentences: [
      'I would like to invite you to my birthday party.',
      'It will start at 6 p.m. this Saturday at my home.',
      'I really hope you can come.',
      'Please let me know if you can come.',
    ],
    sampleEssay: {
      prompt: '你的朋友 John 刚来中国，请写一封邮件邀请他参加你的生日聚会（时间、地点、活动）。',
      text: `Dear John,

I am writing to invite you to my birthday party this Saturday. It will be held at my home at 6 p.m.

First of all, we will have a big dinner together. Besides, my friends will sing songs and play games. What is more, you can meet many new friends there.

I really hope you can come. Please let me know if you are free.

Yours,
Li Hua`,
    },
  },
  {
    id: 'suggestion',
    knowledgeId: 'writing.W2',
    title: '建议信',
    format: ['开头：说明背景 / 对方的问题', '主体：2-3 条具体建议并说明理由', '结尾：鼓励与祝愿', '落款'],
    functionalExpressions: [
      'I am sorry to hear that you have trouble with...',
      "Here are some suggestions for you.",
      "First, you'd better...",
      'It is also a good idea to...',
      'I hope these suggestions will be helpful.',
    ],
    connectors: ['First', 'Second', 'Besides', 'In a word'],
    safeSentences: [
      'You should spend more time reading English every day.',
      "Why not ask your teacher for help?",
      "Don't be afraid of making mistakes.",
      'Practice makes perfect.',
    ],
    sampleEssay: {
      prompt: '你的笔友 Peter 学汉语有困难，请写一封邮件给他提建议。',
      text: `Dear Peter,

I am sorry to hear that you have trouble learning Chinese. Here are some suggestions.

First, you should watch Chinese TV shows and listen to Chinese songs. Second, why not make some Chinese friends and talk with them every day? Besides, keeping a diary in Chinese is also a good idea.

Do not give up. I am sure you will make progress soon.

Yours,
Li Hua`,
    },
  },
  {
    id: 'thanks',
    knowledgeId: 'writing.W2',
    title: '感谢信',
    format: ['开头：直接表达感谢', '主体：具体感谢什么事、对自己的帮助', '结尾：希望回报 / 再次感谢', '落款'],
    functionalExpressions: [
      "I'm writing to express my thanks for...",
      'Thank you so much for...',
      'Without your help, I would not...',
      'Thanks again for your kindness.',
    ],
    connectors: ['First', 'Also', 'Because of this', 'Again'],
    safeSentences: [
      'Thank you for your warm welcome when I was in London.',
      'I had a wonderful time with your family.',
      'I will never forget those happy days.',
      'I hope you can visit China one day.',
    ],
    sampleEssay: { prompt: '你在英国期间受到 Smith 一家照顾，回国后写一封感谢信。', text: '' },
  },
  {
    id: 'apology',
    knowledgeId: 'writing.W2',
    title: '道歉信',
    format: ['开头：直接道歉', '主体：说明原因（合理、简短）', '结尾：补救措施 + 请求原谅', '落款'],
    functionalExpressions: [
      "I'm writing to say sorry for...",
      'I am afraid I cannot... as planned.',
      'The reason is that...',
      'I hope you can understand and forgive me.',
    ],
    connectors: ['Unfortunately', 'Besides', 'To make up for it', 'Anyway'],
    safeSentences: [
      'I am terribly sorry that I cannot go to your party.',
      'I have to look after my little brother that evening.',
      'I would like to treat you to dinner next week.',
      'Please accept my apology.',
    ],
    sampleEssay: { prompt: '你无法参加朋友的聚会，写一封道歉信说明原因并提出补偿。', text: '' },
  },
  {
    id: 'notice',
    knowledgeId: 'writing.W2',
    title: '通知',
    format: ['标题：Notice / Announcement', '正文：活动、时间、地点、参加对象、注意事项', '落款：组织单位 + 日期（可省）'],
    functionalExpressions: [
      'We are going to hold a...',
      'It will be held in... on...',
      'All the students are welcome to take part in it.',
      'Please be there on time.',
      "Don't forget to bring...",
    ],
    connectors: ['First', 'Also', 'What is more', 'At last'],
    safeSentences: [
      'There will be an English speech contest in the school hall next Friday afternoon.',
      'Anyone who wants to take part please sign up before Wednesday.',
      'Please arrive ten minutes earlier.',
      'The Student Union',
    ],
    sampleEssay: { prompt: '学校将举办英语演讲比赛，请以学生会名义写一则通知。', text: '' },
  },
  {
    id: 'application',
    knowledgeId: 'writing.W2',
    title: '申请信 / 求职信',
    format: ['开头：从哪里得知信息 + 申请职位', '主体：个人优势（2-3 点）', '结尾：期待回复 / 面试', '落款'],
    functionalExpressions: [
      "I'm writing to apply for the position of...",
      'I learned from the newspaper that...',
      'I think I am the right person for it.',
      'I am looking forward to your early reply.',
    ],
    connectors: ['First', 'Second', 'Also', 'In addition'],
    safeSentences: [
      'I am good at English and I can speak it fluently.',
      'I have worked as a part-time guide for two years.',
      'I am easy to get along with.',
      'I do hope you can give me a chance.',
    ],
    sampleEssay: { prompt: '看到某公司招聘兼职英语导游，请写一封求职信。', text: '' },
  },
  {
    id: 'description',
    knowledgeId: 'writing.W2',
    title: '描述类（人 / 事 / 活动）',
    format: ['开头：总述对象', '主体：外貌性格 / 时间经过（按顺序）', '结尾：感受 / 评价'],
    functionalExpressions: [
      'I would like to introduce... to you.',
      'He/She is a ... person with...',
      'It happened when...',
      'From this experience, I learned that...',
    ],
    connectors: ['At first', 'Then', 'Later', 'Finally'],
    safeSentences: [
      'My English teacher is a kind and patient woman.',
      'She always helps us when we have questions.',
      'We all love her and her lessons.',
      'I think I am lucky to have such a teacher.',
    ],
    sampleEssay: { prompt: '介绍一位你最喜欢的老师。', text: '' },
  },
  {
    id: 'opinion',
    knowledgeId: 'writing.W2',
    title: '观点类',
    format: ['开头：引出话题，亮明观点', '主体：2-3 个理由 + 例子', '结尾：总结观点 / 呼吁'],
    functionalExpressions: [
      'Nowadays, more and more people...',
      'In my opinion, ...',
      'There are two main reasons.',
      'First, ... Second, ...',
      'In a word, we should...',
    ],
    connectors: ['Firstly', 'Secondly', 'For example', 'In a word'],
    safeSentences: [
      'I think reading is very important to us.',
      'First, reading opens our eyes and gives us knowledge.',
      'Second, good books are like good friends.',
      'In a word, let us develop a good habit of reading.',
    ],
    sampleEssay: { prompt: '以“Reading is important”为题写一篇短文。', text: '' },
  },
  {
    id: 'complaint',
    knowledgeId: 'writing.W2',
    title: '投诉信',
    format: ['开头：自我介绍 + 说明写信目的（投诉）', '主体：购买/服务经过、问题是什么、造成的不便', '结尾：明确诉求（退款/换货/修理）+ 限定答复时间', '落款'],
    functionalExpressions: [
      "I'm writing to complain about...",
      'I am not satisfied with...',
      'There is something wrong with...',
      'I hope you can deal with this problem as soon as possible.',
      'I am looking forward to your early reply.',
    ],
    connectors: ['First', 'Then', 'What is worse', 'However'],
    safeSentences: [
      'I bought a mobile phone in your shop last week.',
      'It did not work well when I got home.',
      'I called your service center, but nobody helped me.',
      'I hope I can get my money back or get a new one.',
    ],
    sampleEssay: {
      prompt: '你在某商店买了一部手机，回家后发现有质量问题，与客服沟通无果。请给商店经理写一封投诉信。',
      text: `Dear Manager,

I am writing to complain about a mobile phone I bought in your shop last week.

When I got home, I found there was something wrong with it. It often turned itself off, and the camera did not work at all. I called your service center, but nobody could help me. This brought me much trouble.

I hope you can deal with this problem as soon as possible. I would like to get my money back or get a new phone. I am looking forward to your early reply.

Yours,
Li Hua`,
    },
  },
  {
    id: 'congratulation',
    knowledgeId: 'writing.W2',
    title: '祝贺信',
    format: ['开头：直接表达祝贺 + 祝贺的事由', '主体：对方为此付出的努力、自己为其高兴', '结尾：再次祝贺 + 美好祝愿', '落款'],
    functionalExpressions: [
      'Congratulations on your...',
      'I was so glad to hear that...',
      'You really deserve it because...',
      'I am sure you will have a bright future.',
      'Best wishes and good luck.',
    ],
    connectors: ['First of all', 'Also', 'Besides', 'At last'],
    safeSentences: [
      'Congratulations on winning first prize in the English contest.',
      'I know how hard you have worked for it.',
      'Your English is really good and we are all proud of you.',
      'I hope you will make greater progress in the future.',
    ],
    sampleEssay: {
      prompt: '你的朋友王明在学校英语演讲比赛中获得一等奖，请写一封邮件向他表示祝贺。',
      text: `Dear Wang Ming,

Congratulations on winning first prize in the school English speech contest! I was so glad to hear the good news.

You really deserve it. I know how hard you have practiced every morning. Besides, you are always ready to help others with their English. We are all proud of you.

I am sure you will have a bright future. Best wishes and good luck!

Yours,
Li Hua`,
    },
  },
  {
    id: 'leave_note',
    knowledgeId: 'writing.W2',
    title: '请假条 / 请假邮件',
    format: ['称呼：Dear ...,', '开头：开门见山说明请假（几天、哪几天）', '主体：请假原因 + 工作/学习安排（补交作业等）', '结尾：恳请批准、表示感谢', '落款'],
    functionalExpressions: [
      "I'm writing to ask for a leave of... days.",
      'I am sorry that I cannot go to school / work as usual.',
      'The reason is that...',
      'I will try my best to catch up with my lessons.',
      'I would be thankful if you could agree with my request.',
    ],
    connectors: ['First', 'Also', 'When I come back', 'At last'],
    safeSentences: [
      "I'm writing to ask for a sick leave of two days.",
      'I have a bad cold and the doctor asked me to stay in bed.',
      'When I come back, I will hand in my homework on time.',
      'I hope you can agree with my request. Thank you very much.',
    ],
    sampleEssay: {
      prompt: '你得了重感冒，医生建议卧床休息两天。请给班主任写一张请假条，说明原因并说明会补上功课。',
      text: `Dear Mr. Li,

I am sorry to tell you that I cannot go to school today and tomorrow. I am writing to ask for a sick leave of two days.

I have a bad cold and a slight fever. The doctor asked me to stay in bed and take medicine on time. When I come back to school, I will try my best to catch up with my lessons and hand in my homework on time.

I hope you can agree with my request. Thank you very much.

Yours,
Zhang Wei`,
    },
  },
  {
    id: 'diary',
    knowledgeId: 'writing.W2',
    title: '日记',
    format: ['开头：日期 + 天气（左上角）', '正文：按时间顺序记叙事件（经过、活动）', '结尾：感受或收获', '时态以一般过去时为主'],
    functionalExpressions: [
      'June 12th, Sunday          Fine',
      'Today we had a good time.',
      'Early in the morning, we set out for...',
      'What an unforgettable day it was!',
      'From this experience, I learned that...',
    ],
    connectors: ['At first', 'Then', 'After that', 'Finally'],
    safeSentences: [
      'Early in the morning, we met at the school gate.',
      'Then we climbed the hill and had a picnic at the top.',
      'We did not go home until four o’clock in the afternoon.',
      'Tired but happy, we all had a wonderful day.',
    ],
    sampleEssay: {
      prompt: '请以日记形式记叙上周日你和同学们一起去公园植树/野餐的活动，包括时间、经过和感受。',
      text: `May 20th, Sunday          Fine

Today my classmates and I went to People's Park for a spring outing. We all had a good time.

Early in the morning, we met at the school gate and went there by bike. Then we climbed the hill and had a picnic at the top. After that, we played games and took many photos. Finally, we helped clean up the rubbish before leaving.

Tired but happy, we went home at about four o'clock. What an unforgettable day it was!`,
    },
  },
];

/** 通用连接词（W3），首页“今日必会”句型也从安全句型中轮换 */
export const COMMON_CONNECTORS = [
  'First / First of all（首先）',
  'Besides / What is more（此外）',
  'However（然而，表转折）',
  'Because / As（因为）',
  'So / Therefore（所以）',
  'For example（例如）',
  'In a word / In short（总之）',
  'On the one hand ... On the other hand ...（一方面……另一方面……）',
];

export const ALL_SAFE_SENTENCES = WRITING_KITS.flatMap((k) => k.safeSentences);
