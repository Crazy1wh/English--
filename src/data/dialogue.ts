import type { DialogueScene } from '@/types';

export const DIALOGUE_SCENES: DialogueScene[] = [
  {
    id: 'D01', knowledgeId: 'dialogue.D01', title: 'Greeting 问候',
    expressions: [
      { en: 'How are you doing?', zh: '你最近怎么样？' },
      { en: "How's everything going?", zh: '一切都好吗？' },
      { en: "Pretty good. / Can't complain.", zh: '挺好的。' },
      { en: 'Long time no see!', zh: '好久不见！' },
      { en: 'How have you been?', zh: '你近来可好？' },
    ],
  },
  {
    id: 'D02', knowledgeId: 'dialogue.D02', title: 'Introduction 介绍',
    expressions: [
      { en: "I'd like you to meet my friend Tom.", zh: '我想让你认识一下我的朋友汤姆。' },
      { en: 'Nice to meet you.', zh: '很高兴认识你。' },
      { en: "I've heard so much about you.", zh: '久仰大名。' },
      { en: 'Let me introduce myself.', zh: '请允许我自我介绍。' },
      { en: 'Where are you from?', zh: '你是哪里人？' },
    ],
  },
  {
    id: 'D03', knowledgeId: 'dialogue.D03', title: 'Thanks 感谢',
    expressions: [
      { en: 'Thank you for your help.', zh: '谢谢你的帮助。' },
      { en: "I really appreciate it.", zh: '我真的很感激。' },
      { en: "I can't thank you enough.", zh: '感激不尽。' },
      { en: "You're welcome. / My pleasure.", zh: '不客气。' },
      { en: "Don't mention it.", zh: '别客气。' },
    ],
  },
  {
    id: 'D04', knowledgeId: 'dialogue.D04', title: 'Apology 道歉',
    expressions: [
      { en: "I'm sorry for being late.", zh: '对不起我迟到了。' },
      { en: 'I do apologize for the trouble.', zh: '给您添麻烦，实在抱歉。' },
      { en: "It doesn't matter. / Never mind.", zh: '没关系。' },
      { en: "That's all right.", zh: '没事。' },
      { en: 'Please forgive me.', zh: '请原谅我。' },
    ],
  },
  {
    id: 'D05', knowledgeId: 'dialogue.D05', title: 'Invitation 邀请',
    expressions: [
      { en: 'Would you like to join us for dinner?', zh: '你愿意和我们一起吃晚饭吗？' },
      { en: 'Are you free this Saturday?', zh: '你这周六有空吗？' },
      { en: "I'd love to, but I have another plan.", zh: '我很想去，但我另有安排。' },
      { en: 'Count me in.', zh: '算我一个。' },
      { en: 'Maybe another time.', zh: '下次吧。' },
    ],
  },
  {
    id: 'D06', knowledgeId: 'dialogue.D06', title: 'Suggestion 建议',
    expressions: [
      { en: "Why don't you take a rest?", zh: '你为什么不休息一下呢？' },
      { en: 'How about going for a walk?', zh: '去散个步怎么样？' },
      { en: "You'd better see a doctor.", zh: '你最好去看医生。' },
      { en: 'If I were you, I would take the job.', zh: '我要是你，就接受这份工作。' },
      { en: "That's a good idea.", zh: '好主意。' },
    ],
  },
  {
    id: 'D07', knowledgeId: 'dialogue.D07', title: 'Request 请求',
    expressions: [
      { en: 'Could you do me a favor?', zh: '能帮我个忙吗？' },
      { en: 'Would you mind opening the window?', zh: '你介意开一下窗吗？' },
      { en: 'May I use your phone?', zh: '我可以用一下你的电话吗？' },
      { en: 'Sure, go ahead.', zh: '当然可以，用吧。' },
      { en: "I'm afraid I can't.", zh: '恐怕不行。' },
    ],
  },
  {
    id: 'D08', knowledgeId: 'dialogue.D08', title: 'Asking directions 问路',
    expressions: [
      { en: 'Excuse me, how can I get to the station?', zh: '请问去车站怎么走？' },
      { en: 'Go straight and turn left at the corner.', zh: '直走，在路口左转。' },
      { en: "It's about ten minutes' walk.", zh: '走路大约十分钟。' },
      { en: "You can't miss it.", zh: '你不会错过的。' },
      { en: 'Is there a bank near here?', zh: '附近有银行吗？' },
    ],
  },
  {
    id: 'D09', knowledgeId: 'dialogue.D09', title: 'Shopping 购物',
    expressions: [
      { en: 'Can I help you?', zh: '请问需要什么？' },
      { en: "I'm just looking, thanks.", zh: '我随便看看，谢谢。' },
      { en: 'How much is it?', zh: '这个多少钱？' },
      { en: 'Do you have a larger size?', zh: '有大一号的吗？' },
      { en: "I'll take it.", zh: '我买了。' },
    ],
  },
  {
    id: 'D10', knowledgeId: 'dialogue.D10', title: 'Restaurant 餐厅',
    expressions: [
      { en: 'A table for two, please.', zh: '请安排一张两人桌。' },
      { en: 'Are you ready to order?', zh: '可以点菜了吗？' },
      { en: "What's today's special?", zh: '今天的特色菜是什么？' },
      { en: 'Check, please.', zh: '请结账。' },
      { en: 'Keep the change.', zh: '不用找零了。' },
    ],
  },
  {
    id: 'D11', knowledgeId: 'dialogue.D11', title: 'Doctor 看病',
    expressions: [
      { en: "What's wrong with you?", zh: '你哪里不舒服？' },
      { en: 'I have a headache and a slight fever.', zh: '我头疼，还有点发烧。' },
      { en: 'How long have you felt this way?', zh: '这样多久了？' },
      { en: 'Take this medicine three times a day.', zh: '这药一天吃三次。' },
      { en: "It's nothing serious.", zh: '没什么大问题。' },
    ],
  },
  {
    id: 'D12', knowledgeId: 'dialogue.D12', title: 'Phone 打电话',
    expressions: [
      { en: "Hello, may I speak to Mary?", zh: '你好，请找玛丽接电话。' },
      { en: "Who's calling, please?", zh: '请问您是哪位？' },
      { en: 'Hold on, please.', zh: '请稍等。' },
      { en: "She isn't in right now.", zh: '她现在不在。' },
      { en: 'Can I take a message?', zh: '需要我捎个口信吗？' },
    ],
  },
  {
    id: 'D13', knowledgeId: 'dialogue.D13', title: 'Congratulations 祝贺',
    expressions: [
      { en: 'Congratulations on your success!', zh: '祝贺你取得成功！' },
      { en: 'Well done!', zh: '干得好！' },
      { en: 'I heard you passed the exam.', zh: '我听说你考试通过了。' },
      { en: 'Best wishes for you.', zh: '向你致以最美好的祝愿。' },
      { en: 'Thank you, that means a lot.', zh: '谢谢，这对我意义重大。' },
    ],
  },
  {
    id: 'D14', knowledgeId: 'dialogue.D14', title: 'Agreement 赞同',
    expressions: [
      { en: "I couldn't agree more.", zh: '我完全同意。' },
      { en: "That's exactly what I think.", zh: '我正是这么想的。' },
      { en: 'You can say that again.', zh: '你说得太对了。' },
      { en: "I'm afraid I disagree.", zh: '恐怕我不同意。' },
      { en: "I see your point, but...", zh: '我明白你的意思，但是……' },
    ],
  },
  {
    id: 'D15', knowledgeId: 'dialogue.D15', title: 'Farewell 告别',
    expressions: [
      { en: 'See you later.', zh: '回头见。' },
      { en: 'Have a nice weekend!', zh: '周末愉快！' },
      { en: 'Take care!', zh: '保重！' },
      { en: 'Keep in touch.', zh: '保持联系。' },
      { en: "I'm afraid I must be going now.", zh: '恐怕我得走了。' },
    ],
  },
  {
    id: 'D16', knowledgeId: 'dialogue.D16', title: 'Weather 天气',
    expressions: [
      { en: "What's the weather like today?", zh: '今天天气怎么样？' },
      { en: "It's sunny / cloudy / rainy / windy.", zh: '今天晴 / 多云 / 有雨 / 刮风。' },
      { en: 'The radio says it will clear up this afternoon.', zh: '广播说下午会转晴。' },
      { en: 'What a lovely day!', zh: '多好的天气啊！' },
      { en: "It's raining heavily. You'd better take an umbrella.", zh: '雨下得很大，你最好带伞。' },
    ],
  },
  {
    id: 'D17', knowledgeId: 'dialogue.D17', title: 'Hotel 住酒店',
    expressions: [
      { en: "I'd like to book a single room for two nights.", zh: '我想订一间单人间，住两晚。' },
      { en: 'Have you got any rooms available?', zh: '还有空房间吗？' },
      { en: 'How much is a double room per night?', zh: '双人间一晚多少钱？' },
      { en: 'Please fill in the registration form.', zh: '请填写住宿登记表。' },
      { en: "I'm checking out. Could I have the bill?", zh: '我要退房，请把账单给我好吗？' },
    ],
  },
  {
    id: 'D18', knowledgeId: 'dialogue.D18', title: 'Bank & Post Office 银行与邮局',
    expressions: [
      { en: "I'd like to open an account.", zh: '我想开一个账户。' },
      { en: 'How would you like to change these pounds, in tens or twenties?', zh: '这些英镑您想怎么换，十镑还是二十镑票面？' },
      { en: "What's the exchange rate today?", zh: '今天的汇率是多少？' },
      { en: "I'd like to send this parcel to Beijing by airmail.", zh: '我想把这个包裹航空寄到北京。' },
      { en: 'How long does it take by regular mail?', zh: '普通邮件要多久？' },
    ],
  },
  {
    id: 'D19', knowledgeId: 'dialogue.D19', title: 'Job Interview 求职面试',
    expressions: [
      { en: 'Why do you want to work for our company?', zh: '你为什么想为我们公司工作？' },
      { en: "I'm interested in the job and I have two years' experience.", zh: '我对这份工作感兴趣，并有两年经验。' },
      { en: 'What are you good at?', zh: '你擅长什么？' },
      { en: 'I can speak English fluently and I am easy to get along with.', zh: '我英语说得流利，而且容易相处。' },
      { en: 'You will hear from us within a week.', zh: '一周内我们会通知你结果。' },
    ],
  },
  {
    id: 'D20', knowledgeId: 'dialogue.D20', title: 'Study 校园学习',
    expressions: [
      { en: 'How are you getting along with your English?', zh: '你的英语学得怎么样了？' },
      { en: "I have some difficulty in listening.", zh: '我在听力方面有些困难。' },
      { en: "You'd better listen to English tapes for 20 minutes every day.", zh: '你最好每天听 20 分钟英语磁带。' },
      { en: 'May I borrow your notes? I missed yesterday’s class.', zh: '能借一下你的笔记吗？我缺了昨天的课。' },
      { en: 'Practice makes perfect.', zh: '熟能生巧。' },
    ],
  },
  {
    id: 'D21', knowledgeId: 'dialogue.D21', title: 'Transport 交通出行',
    expressions: [
      { en: 'Does this bus go to the railway station?', zh: '这趟车去火车站吗？' },
      { en: 'How often does the No. 5 bus run?', zh: '5 路车多久一班？' },
      { en: 'Please get off at the next stop and change to the subway.', zh: '请下一站下车换乘地铁。' },
      { en: 'Two tickets to Shanghai, please. How much are they?', zh: '请给我两张去上海的票，多少钱？' },
      { en: 'The train leaves at 8:30 from Platform 3.', zh: '火车 8:30 从 3 站台发车。' },
    ],
  },
  {
    id: 'D22', knowledgeId: 'dialogue.D22', title: 'Hobbies 兴趣爱好',
    expressions: [
      { en: 'What do you like to do in your spare time?', zh: '你业余时间喜欢做什么？' },
      { en: "I'm fond of / keen on reading and swimming.", zh: '我喜欢读书和游泳。' },
      { en: 'How long have you been interested in painting?', zh: '你对画画感兴趣多久了？' },
      { en: 'It helps me relax after a busy day.', zh: '它能让我在忙碌一天后放松下来。' },
      { en: 'Would you like to play basketball with us this weekend?', zh: '这周末和我们一起打篮球好吗？' },
    ],
  },
];
