# 内容可信度体系（规格第十二、三十四章）

这是本平台最重要的一条红线：**AI 题不得伪装真题，频率/年份不得臆造。**

## 三个强制字段

每条词汇与每道题都携带：

| 字段 | 取值 | 含义 |
|---|---|---|
| `source` | `official` / `verified_real_exam` / `multi_source_verified` / `third_party_unverified` / `manual` / `ai_generated` / `demo` | 内容来源 |
| `reliability` | `A` / `B` / `C` / `D` | 可信度 |
| `isRealExam` | `true` / `false` | 是否真题 |

约束（在 `AdminPage` 导入时强制校验，也应在后端再次校验）：

1. 三字段缺一不可，枚举值非法直接拒绝整批导入。
2. **只有 reliability=A/B 且 source 属于 official/verified_real_exam/multi_source_verified，才允许 `isRealExam=true`。**
3. 词汇的 `examYears`（真题年份）只允许在已验证真题来源下填写；`frequencyScore` 没有权威数据前保持 0，不做频次排序。

## 前端展示规则

- A/B + `isRealExam`：显示「历年真题」，可标注年份/地区。
- C（待核验）：显示「待核验」，不计入真题统计。
- D / demo / ai_generated：显示「演示题（非真题）」。
- 组件：`src/components/ui.tsx` 的 `SourceBadge`；语法专题、考点页的真题槽位为空时显示核验流程说明。

## 真题入库流水线（V2 建议）

1. **抓取/录入**：保留原始来源 URL、年份、地区、试卷类型（`exam/year/region/sourceUrl` 字段已预留）。
2. **多源比对**：至少两个独立来源一致才进入 B 级候选。
3. **人工核验**：确认题干、选项、答案无误后置 A/B。
4. 未通过者保持 C 级；AI 生成或演示内容永远 D 级。

## 种子数据纪律（V1 现状）

- `src/data/` 全部内容：82 道演示题、约百词手工演示词库、G01-G22 语法、EP01-EP10 考点、D01-D15 对话、8 套写作包、1 份演示卷。
- 统一 `source='demo'/'manual'`、`reliability='D'`、`isRealExam=false`；`realExamCount` 全部为 0、`realExamQuestionIds` 全部为空。
- 这些数据足以跑通学习闭环与算法，但**不能**用于声称「真题频次」。
