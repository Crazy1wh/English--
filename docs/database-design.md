# 数据设计：localStorage → 未来 PostgreSQL

V1 单快照存于 localStorage（key `chengkao-english-v1`），结构为 `PersistState`（[src/store/db.ts](../src/store/db.ts)）。字段命名已按未来关系表设计。

## PersistState 字段

```
version            数据版本号（迁移用）
settings           考试日期 / 每日时长 / 目标分 / AI 配置
wordProgress       Record<wordId, WordProgress>
masteryMap         Record<"kind:id", 0-100>
attempts           Attempt[]  每次答题
wrongs             WrongQuestion[]  错题本（间隔复习状态机）
dayLogs            Record<date, DayLog>  当日分钟/学词/答题统计
essays             EssaySubmission[]  作文与评分
mocks              MockResult[]  模考结果
customWords        用户导入词汇
customQuestions    用户导入题目
donePlanKeys       Record<date, itemKey[]>  当日计划完成情况
```

静态内容（词汇库、题库、语法、知识树）来自 `src/data/` 种子 + `customWords/customQuestions`，不进快照正文。

## 未来 PG schema 映射建议

| 本地 | 表（建议） | 说明 |
|---|---|---|
| settings | `users`, `user_settings` | 随账号 |
| wordProgress | `word_progress (user_id, word_id, mastery, interval_days, due, reps, lapses, last_review_at)` | 唯一键 (user_id, word_id) |
| masteryMap | `mastery (user_id, owner_kind, owner_id, score, updated_at)` | 稀疏行，按 owner 聚合 |
| attempts | `attempts (user_id, question_id, selected, correct, duration_sec, mode, at)` | 预测分/统计的事实表，加索引 (user_id, at) |
| wrongs | `wrong_questions (user_id, question_id, predicted_error_type, user_error_type, stage, consecutive_correct, next_review_at, resolved)` | |
| dayLogs | `day_logs (user_id, date, minutes, words_learned, words_reviewed, answered, correct)` | |
| essays | `essay_submissions` | scores 用 jsonb |
| mocks | `mock_results` | section_stats 用 jsonb |
| customWords/Questions + 种子 | `words` / `questions` 内容表 | 带 `source/reliability/is_real_exam/exam/year/region/source_url/status`，全局共享 + 审核状态 |
| donePlanKeys | `plan_done (user_id, date, item_key)` | |

迁移策略：V2 保持 `db.ts` 导出函数签名不变，把内部从内存+localStorage 换成带鉴权的 HTTP/Prisma 调用；引擎层零改动。用户 V1 数据通过「设置 → 导出备份」产出 JSON，V2 提供一次性导入接口。
