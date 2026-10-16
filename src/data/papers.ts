import type { SourceKind } from '@/types';

// 模拟卷定义。
// 再次强调：这是【演示模拟卷】，由演示题组成，不是任何年份的真题试卷。
// 真题试卷须经核验流程以 reliability A/B 导入后，才能进入“真题”页。
export interface MockPaper {
  id: string;
  title: string;
  source: SourceKind;
  reliability: 'D';
  isRealExam: false;
  durationMin: number;
  totalScore: number; // 150
  questionIds: string[];
  note: string;
}

export const MOCK_PAPERS: MockPaper[] = [
  {
    id: 'paper.demo.1',
    title: '成考英语 · 演示模拟卷（精简版）',
    source: 'demo',
    reliability: 'D',
    isRealExam: false,
    durationMin: 60,
    totalScore: 150,
    note: '题目均为演示题（非真题），按正确率线性折算 150 分，仅用于熟悉流程与产生预测分，不代表真实考试难度。',
    questionIds: [
      // 语音 5
      'demo.ph.01', 'demo.ph.02', 'demo.ph.03', 'demo.ph.05', 'demo.ph.06',
      // 词汇与语法 23
      'demo.g.01', 'demo.g.02', 'demo.g.03', 'demo.g.05', 'demo.g.07',
      'demo.g.08', 'demo.g.09', 'demo.g.11', 'demo.g.13', 'demo.g.14',
      'demo.g.15', 'demo.g.17', 'demo.g.19', 'demo.g.22', 'demo.g.24',
      'demo.v.01', 'demo.v.02', 'demo.v.03', 'demo.v.05', 'demo.v.06',
      'demo.v.09', 'demo.v.10', 'demo.v.11',
      // 完形 6
      'demo.cz.01', 'demo.cz.02', 'demo.cz.03', 'demo.cz.04', 'demo.cz.05', 'demo.cz.06',
      // 阅读 8
      'demo.rd.01', 'demo.rd.02', 'demo.rd.03', 'demo.rd.04',
      'demo.rd.05', 'demo.rd.06', 'demo.rd.07', 'demo.rd.08',
      // 补全对话 5
      'demo.dg.01', 'demo.dg.02', 'demo.dg.03', 'demo.dg.04', 'demo.dg.05',
    ],
  },
  {
    id: 'paper.real.2023',
    title: '2023 年成人高考专升本英语真题（精简）',
    source: 'verified_real_exam',
    reliability: 'D',
    isRealExam: false,
    durationMin: 60,
    totalScore: 150,
    note: '题目来自 2023 年全国成考专升本英语真题（faiusr.com 公开 PDF，已核验 B 级）。本卷收录语音 5 + 词汇语法 15 + 完形 15 + 阅读 16 = 51 题（原卷阅读 Passage 5 及补全对话因来源截断未纳入）。',
    questionIds: [
      // 语音 1–5
      'real2023.ph.01', 'real2023.ph.02', 'real2023.ph.03', 'real2023.ph.04', 'real2023.ph.05',
      // 词汇与语法 6–20
      'real2023.vg.06', 'real2023.vg.07', 'real2023.vg.08', 'real2023.vg.09', 'real2023.vg.10',
      'real2023.vg.11', 'real2023.vg.12', 'real2023.vg.13', 'real2023.vg.14', 'real2023.vg.15',
      'real2023.vg.16', 'real2023.vg.17', 'real2023.vg.18', 'real2023.vg.19', 'real2023.vg.20',
      // 完形 21–35
      'real2023.cz.21', 'real2023.cz.22', 'real2023.cz.23', 'real2023.cz.24', 'real2023.cz.25',
      'real2023.cz.26', 'real2023.cz.27', 'real2023.cz.28', 'real2023.cz.29', 'real2023.cz.30',
      'real2023.cz.31', 'real2023.cz.32', 'real2023.cz.33', 'real2023.cz.34', 'real2023.cz.35',
      // 阅读 36–51
      'real2023.rd.36', 'real2023.rd.37', 'real2023.rd.38', 'real2023.rd.39',
      'real2023.rd.40', 'real2023.rd.41', 'real2023.rd.42', 'real2023.rd.43',
      'real2023.rd.44', 'real2023.rd.45', 'real2023.rd.46', 'real2023.rd.47',
      'real2023.rd.48', 'real2023.rd.49', 'real2023.rd.50', 'real2023.rd.51',
    ],
  },
  {
    id: 'paper.mock.eol.2024',
    title: '2024 成人高考专升本英语模拟题（eol.cn）',
    source: 'third_party_unverified',
    reliability: 'D',
    isRealExam: false,
    durationMin: 60,
    totalScore: 150,
    note: '题目来自教育在线 eol.cn 公开发布的模拟试题（含答案），标注"内容仅供参考"。第 2、47 题来源答案与原文不一致，已按题干自洽原则修正。reliability C，非真题。',
    questionIds: [
      // 语音 1–5
      'mock.eol.01', 'mock.eol.02', 'mock.eol.03', 'mock.eol.04', 'mock.eol.05',
      // 词汇与语法 6–20
      'mock.eol.06', 'mock.eol.07', 'mock.eol.08', 'mock.eol.09', 'mock.eol.10',
      'mock.eol.11', 'mock.eol.12', 'mock.eol.13', 'mock.eol.14', 'mock.eol.15',
      'mock.eol.16', 'mock.eol.17', 'mock.eol.18', 'mock.eol.19', 'mock.eol.20',
      // 完形 21–35
      'mock.eol.21', 'mock.eol.22', 'mock.eol.23', 'mock.eol.24', 'mock.eol.25',
      'mock.eol.26', 'mock.eol.27', 'mock.eol.28', 'mock.eol.29', 'mock.eol.30',
      'mock.eol.31', 'mock.eol.32', 'mock.eol.33', 'mock.eol.34', 'mock.eol.35',
      // 阅读 36–51
      'mock.eol.36', 'mock.eol.37', 'mock.eol.38', 'mock.eol.39',
      'mock.eol.40', 'mock.eol.41', 'mock.eol.42', 'mock.eol.43',
      'mock.eol.44', 'mock.eol.45', 'mock.eol.46', 'mock.eol.47',
      'mock.eol.48', 'mock.eol.49', 'mock.eol.50', 'mock.eol.51',
    ],
  },
  {
    id: 'paper.real.2021',
    title: '2021 年成人高考专升本英语真题（精简）',
    source: 'verified_real_exam',
    reliability: 'D',
    isRealExam: false,
    durationMin: 60,
    totalScore: 150,
    note: '题目来自 2021 年全国成考专升本英语真题（book118.com 公开 PDF，含参考答案）。本卷收录语音 5 + 词汇语法 15 + 完形 14 = 34 题（第 35 题及阅读部分因来源 PDF 截断未纳入）。reliability B，已核验。',
    questionIds: [
      'r2021.ph.01', 'r2021.ph.02', 'r2021.ph.03', 'r2021.ph.04', 'r2021.ph.05',
      'r2021.vg.06', 'r2021.vg.07', 'r2021.vg.08', 'r2021.vg.09', 'r2021.vg.10',
      'r2021.vg.11', 'r2021.vg.12', 'r2021.vg.13', 'r2021.vg.14', 'r2021.vg.15',
      'r2021.vg.16', 'r2021.vg.17', 'r2021.vg.18', 'r2021.vg.19', 'r2021.vg.20',
      'r2021.cz.21', 'r2021.cz.22', 'r2021.cz.23', 'r2021.cz.24', 'r2021.cz.25',
      'r2021.cz.26', 'r2021.cz.27', 'r2021.cz.28', 'r2021.cz.29', 'r2021.cz.30',
      'r2021.cz.31', 'r2021.cz.32', 'r2021.cz.33', 'r2021.cz.34',
    ],
  },
  {
    id: 'paper.mock.2018',
    title: '2018 成人高考专升本英语模拟题（eol.cn）',
    source: 'third_party_unverified',
    reliability: 'D',
    isRealExam: false,
    durationMin: 60,
    totalScore: 150,
    note: '题目来自教育在线 eol.cn "2018年专升本《英语》成人高考模拟题及答案(4)"。本卷收录语音 5 + 词汇语法 15 + 完形 15 + 阅读 3 = 38 题。reliability C，非真题。',
    questionIds: [
      'm2018.ph.01', 'm2018.ph.02', 'm2018.ph.03', 'm2018.ph.04', 'm2018.ph.05',
      'm2018.vg.06', 'm2018.vg.07', 'm2018.vg.08', 'm2018.vg.09', 'm2018.vg.10',
      'm2018.vg.11', 'm2018.vg.12', 'm2018.vg.13', 'm2018.vg.14', 'm2018.vg.15',
      'm2018.vg.16', 'm2018.vg.17', 'm2018.vg.18', 'm2018.vg.19', 'm2018.vg.20',
      'm2018.cz.21', 'm2018.cz.22', 'm2018.cz.23', 'm2018.cz.24', 'm2018.cz.25',
      'm2018.cz.26', 'm2018.cz.27', 'm2018.cz.28', 'm2018.cz.29', 'm2018.cz.30',
      'm2018.cz.31', 'm2018.cz.32', 'm2018.cz.33', 'm2018.cz.34', 'm2018.cz.35',
      'm2018.rd.36', 'm2018.rd.37', 'm2018.rd.38',
    ],
  },
  {
    id: 'paper.mock.preexam',
    title: '成人高考专升本英语考前模拟习题（eol.cn）',
    source: 'third_party_unverified',
    reliability: 'D',
    isRealExam: false,
    durationMin: 60,
    totalScore: 150,
    note: '题目来自教育在线 eol.cn "成人高考专升本英语考前模拟习题"。本卷收录语音 5 + 词汇语法 14 + 完形 15 + 阅读 6 = 40 题（来源原第 14 题选项缺失，按"不编造选项"原则剔除）。reliability C，非真题。',
    questionIds: [
      'pre.ph.01', 'pre.ph.02', 'pre.ph.03', 'pre.ph.04', 'pre.ph.05',
      'pre.vg.06', 'pre.vg.07', 'pre.vg.08', 'pre.vg.09', 'pre.vg.10',
      'pre.vg.11', 'pre.vg.12', 'pre.vg.13', 'pre.vg.15',
      'pre.vg.16', 'pre.vg.17', 'pre.vg.18', 'pre.vg.19', 'pre.vg.20',
      'pre.cz.21', 'pre.cz.22', 'pre.cz.23', 'pre.cz.24', 'pre.cz.25',
      'pre.cz.26', 'pre.cz.27', 'pre.cz.28', 'pre.cz.29', 'pre.cz.30',
      'pre.cz.31', 'pre.cz.32', 'pre.cz.33', 'pre.cz.34', 'pre.cz.35',
      'pre.rd.36', 'pre.rd.37', 'pre.rd.38', 'pre.rd.39', 'pre.rd.40', 'pre.rd.41',
    ],
  },
  {
    id: 'paper.real.2022',
    title: '2022 年成人高考高起专英语真题（精简）',
    source: 'third_party_unverified',
    reliability: 'D',
    isRealExam: false,
    durationMin: 40,
    totalScore: 150,
    note: '题目来自 2022 年全国成考高起专英语真题（eol.cn 公开发布，含答案）。注：此为高起专卷，非专升本。本卷收录语音 5 + 词汇语法 15 = 20 题（完形、阅读因来源"更新中"未纳入）。reliability C。',
    questionIds: [
      'r2022.ph.01', 'r2022.ph.02', 'r2022.ph.03', 'r2022.ph.04', 'r2022.ph.05',
      'r2022.vg.06', 'r2022.vg.07', 'r2022.vg.08', 'r2022.vg.09', 'r2022.vg.10',
      'r2022.vg.11', 'r2022.vg.12', 'r2022.vg.13', 'r2022.vg.14', 'r2022.vg.15',
      'r2022.vg.16', 'r2022.vg.17', 'r2022.vg.18', 'r2022.vg.19', 'r2022.vg.20',
    ],
  },
  {
    id: 'paper.mock.tense',
    title: '成人高考专升本英语语法时态专项（eol.cn）',
    source: 'third_party_unverified',
    reliability: 'D',
    isRealExam: false,
    durationMin: 20,
    totalScore: 150,
    note: '题目来自教育在线 eol.cn "成人高考专升本英语考试题及参考答案"语法时态专项。本卷收录 10 题，涵盖各种时态与语态的辨析。reliability C，非真题。',
    questionIds: [
      'tense.01', 'tense.02', 'tense.03', 'tense.04', 'tense.05',
      'tense.06', 'tense.07', 'tense.08', 'tense.09', 'tense.10',
    ],
  },
  {
    id: 'paper.mock.book118.2024',
    title: '2024 成人高考专升本英语模拟考试（book118）',
    source: 'third_party_unverified',
    reliability: 'D',
    isRealExam: false,
    durationMin: 40,
    totalScore: 150,
    note: '题目来自 book118.com "2024年成人高考专升本英语模拟考试及答案"。本卷收录语音 3 + 词汇语法 10 = 13 题（来源后续题目被截断未纳入）。第 6 题来源答案与题干逻辑冲突，已按语义修正为 A（to lock）。reliability C，非真题。',
    questionIds: [
      'bk2024.ph.01', 'bk2024.ph.02', 'bk2024.ph.03',
      'bk2024.vg.04', 'bk2024.vg.05', 'bk2024.vg.06', 'bk2024.vg.07', 'bk2024.vg.08',
      'bk2024.vg.09', 'bk2024.vg.10', 'bk2024.vg.11', 'bk2024.vg.12', 'bk2024.vg.13',
    ],
  },
  {
    id: 'paper.mock.eol16456',
    title: '成考专升本英语考试模拟试题（eol.cn 16456）',
    source: 'third_party_unverified',
    reliability: 'D',
    isRealExam: false,
    durationMin: 40,
    totalScore: 150,
    note: '题目来自教育在线 eol.cn "成考专升本英语考试模拟试题(含答案)"。本卷收录语音 5 + 词汇语法 15 = 20 题（完形部分来源截断未纳入）。reliability C，非真题。',
    questionIds: [
      'eol16456.ph.01', 'eol16456.ph.02', 'eol16456.ph.03', 'eol16456.ph.04', 'eol16456.ph.05',
      'eol16456.vg.06', 'eol16456.vg.07', 'eol16456.vg.08', 'eol16456.vg.09', 'eol16456.vg.10',
      'eol16456.vg.11', 'eol16456.vg.12', 'eol16456.vg.13', 'eol16456.vg.14', 'eol16456.vg.15',
      'eol16456.vg.16', 'eol16456.vg.17', 'eol16456.vg.18', 'eol16456.vg.19', 'eol16456.vg.20',
    ],
  },
];
