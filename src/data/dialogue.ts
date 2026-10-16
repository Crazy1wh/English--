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
];
