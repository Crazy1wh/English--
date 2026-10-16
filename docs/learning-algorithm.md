# 学习算法说明（参数均可在 src/engine/config.ts 调整）

所有算法是纯函数，输入状态、输出结果，单测见 `src/engine/engine.test.ts`。

## 1. 掌握度（mastery.ts，规格第十四章）

- 每个 owner 一个 0-100 分，初始 50。
- 答题后按 `难度 × 对错` 查 `MASTERY_DELTA` 表增减（easy 答对加得少、hard 答错扣得多），clamp 到 [0,100]。
- 词汇走闪卡四档（again/vague/good/easy），复用同一增减表。

## 2. 遗忘紧迫度（forgetting.ts）

`score = clamp(30 + (elapsedDays / intervalDays) * 70, 0, 100)`。未学词中性 50。线性近似，注释标明未来可换记忆曲线/FSRS。

## 3. SRS（spaced-repetition.ts，第十八章）

`SimpleSrsScheduler`：四档评分产出新间隔（again 回到当天、vague/good/easy 递进），维护 `intervalDays / due / reps / lapses`。接口 `SrsScheduler` 可整体替换为 FSRS。

## 4. 错题复习（wrong-review.ts，第十九章）

间隔梯 `[0,1,3,7,14]`（天），`stage` 为当前梯下标：

- 答对：`consecutiveCorrect+1`，推进到下一梯；走完最后一梯 → `resolved`。
- 答错：回退到当天（stage=0），连续计数清零。
- 用户可在解析或错题本把预测错误类型改成真实原因（`userErrorType` 优先于 `predictedErrorType`）。

## 5. 错误类型预测（error-predict.ts，第十三章）

基于 section + 标签的启发式初判 E01-E10（单词不认识 / 搭配不会 / 语法规则 / 判断错误 / 粗心 / 定位错误 / 理解错误 / 同义替换 / 逻辑 / 猜题）。这是「初判」，UI 始终允许人工修正。

## 6. 每日计划（daily-plan.ts，第十五、十六章）

候选项 PriorityScore：

```
0.30*错题紧迫 + 0.25*薄弱程度 + 0.20*遗忘分 + 0.15*考试权重(词等级/P级) + 0.10*阶段系数
```

按当日时长贪心分配固定活动序列（复习词→新词→语法→考点→专项→阅读完形→错题），输出 `items[]` 与「今日必会」`mustKnow`。阶段比例取 `STAGE_RATIOS[stage]`。

## 7. 阶段（stage.ts，第二十一章）

按距考试天数划分 Foundation / Strengthening / Sprint / Final；每日计划的内容比例随阶段变化。

## 8. 补救（remediation.ts，第二十章）

同一知识标签在一次会话中连错达到阈值（`REMEDIATION_STREAK_THRESHOLD=3`）立即插入：规则回顾 → 同类题 3-8 道 → 通过后回主线，防止「连续错同一点还往下刷」。

## 9. 分数预测（score-prediction.ts，第二十三章）

- 分板块正确率 × `SECTION_PREDICTION_WEIGHTS`（对齐真实试卷结构）折算 150。
- 有模考时以模考为主（0.65）、板块表现修正（0.35）；无模考仅用练习。
- 输出 `{low, high, mid, confidence}`，半宽随置信度收窄；数据不足返回 `null`。
