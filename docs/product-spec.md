# 产品说明（对应《英语学习.md》规格的实现对照）

## 产品定位

面向**上海成人高考专升本英语**个人考生的闭环学习平台：

> 学习 → 做题 → 判断薄弱点 → 补救 → 间隔复习 → 真题/模考验证

移动端优先，打开即用；V1 数据全部在本地浏览器，V2 提供在线 URL 访问。

## 核心闭环与页面映射

| 规格环节 | 实现位置 |
|---|---|
| 每日动态计划（第十六章 60 分钟分配） | 首页 `HomePage` + `engine/daily-plan.ts` |
| 今日必会（第十七章） | 首页「今日必会」（必掌握的词/语法/考点） |
| 词汇闪卡 + SRS（第十八章） | `WordStudyPage`，四档评分 again/vague/good/easy |
| 语法 22 讲（十段式结构） | `GrammarListPage` / `GrammarTopicPage` |
| 做题 + 标准解析（第三十章） | `QuestionRunner` + `ExplanationView` |
| 错误分类 E01-E10（第十三章） | `engine/error-predict.ts`，解析中可人工修正 |
| 错题间隔复习（第十九章，0/1/3/7/14 天） | `WrongsPage` + `engine/wrong-review.ts` |
| 补救流程（第二十章，同标签连错触发） | `QuestionRunner` 内 RemediationPanel |
| 阶段划分（第二十一章） | `engine/stage.ts`：Foundation/Strengthening/Sprint/Final |
| 学习报告 Dashboard（第二十二章） | `ProfilePage` |
| 分数区间预测（第二十三章） | `engine/score-prediction.ts`（数据不足返回 null，不硬猜） |
| 模考 | `ExamsPage` / `MockExamPage` / `MockResultPage` |
| AI 能力（第三十一章，可选） | 设置页配置 OpenAI 兼容端点；无 key 自动本地降级 |

## 每日计划算法要点

- 每题/每词产生一个 PriorityScore（第十五章），权重在 `config.ts`：
  错题 0.30、薄弱 0.25、遗忘 0.20、考频/等级 0.15、阶段比例 0.10。
- 按当日可用时长（设置 20/30/45/60/90 分钟）依次贪心分配：复习单词 → 新词 → 语法 → 考点 → 专项 → 阅读完形 → 错题。
- 阶段比例（`STAGE_RATIOS`）随 Foundation→Final 调整，冲刺阶段向套题/错题倾斜。

## 预测分原则

- 输出**区间** `[low, high]` 而非单一分数；依据最近模考 + 分板块正确率加权，置信度随数据量提升。
- 累计数据不足时明确显示「数据不足」，绝不给出虚假精确分数。
- 演示模考按正确率线性折算 150 分，页面明确标注「不代表真题难度」。

## 明确不做（V1）

- 不内置任何声称是真题的题目；不提供 AI 生成真题年份/词频。
- 不做社交、排行榜、账号体系（V2 随后端引入）。
