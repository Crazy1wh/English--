# 技术决策记录（ADR 摘要）

本文件记录 V1 本地版的关键技术选型与理由。所有决策遵循一个原则：**学习引擎与内容可信度体系不依赖任何 UI 框架或后端**，便于未来迁移到在线版。

## 1. 技术栈

- **Vite 5 + React 18 + TypeScript（strict）+ Tailwind CSS 3**
- 路由：`react-router-dom` 6，使用 **HashRouter**（`#/path`）。理由：本地版直接双击或静态托管即可运行，不依赖服务端 history fallback。
- 图标：`lucide-react`。
- 测试：**Vitest**，纯引擎函数单测。
- Node v23 / npm 10。

## 2. 数据持久化：localStorage 仓储层

- 所有读写收敛在 [src/store/db.ts](../src/store/db.ts) 一个模块，对外暴露领域函数（`recordAttempt`、`gradeWord`、`buildDailyPlan`、`saveMock`、`importQuestions` 等）。
- 存储 key：`chengkao-english-v1`，单对象整体快照 + 发布订阅；React 侧通过 `useSyncExternalStore`（[useStore.ts](../src/store/useStore.ts)）订阅。
- **未来迁移**：在线版将仓储实现替换为 PostgreSQL + Prisma，仅需重写 `db.ts` 内部实现，保持导出函数签名不变；`src/types/index.ts` 的字段已按未来关系表设计（见 [database-design.md](./database-design.md)）。

## 3. 学习引擎独立

- `src/engine/` 下全部为**纯 TypeScript**，不 import React、不碰 localStorage（日期与状态均由参数传入）。
- 关键算法（掌握度、每日计划、SRS、错题间隔、分数预测）均有 Vitest 单测：`src/engine/engine.test.ts`。
- 参数集中在 [config.ts](../src/engine/config.ts)：掌握度增减表、优先级权重、阶段比例、错题间隔梯、预测分板块权重——全部可调，不硬编码在组件里。

## 4. SRS 可替换

- 抽象接口 `SrsScheduler`（[spaced-repetition.ts](../src/engine/spaced-repetition.ts)），V1 实现 `SimpleSrsScheduler`（again/vague/good/easy 四档间隔梯）。
- 未来可无侵入替换为 FSRS（接口已预留稳定性/难度字段语义）。

## 5. AI：供应商无关 + 本地降级

- [src/lib/ai.ts](../src/lib/ai.ts) 只对接 OpenAI 兼容的 `POST {baseUrl}/chat/completions`，不绑定任何厂商；key 仅保存在本地设置中。
- 未配置或调用失败时：题目追问走本地讲解、作文走 [essay-local.ts](../src/lib/essay-local.ts) 五维启发式评分。**没有 AI key，平台 100% 可用。**
- AI 输出永不写死为事实：真题、年份、词频不允许由 AI 补全（见 [content-system.md](./content-system.md)）。

## 6. 内容纪律（最高优先级）

种子数据全部为 `source='demo'/'manual'`、`reliability='D'`、`isRealExam=false`。前端按可信度显示不同徽章；导入接口对这三个字段强制校验，D/C 级内容不可能被标成真题。详见 [content-system.md](./content-system.md)。

## 7. 部署路径

1. V1：`npm run build` 产物为纯静态文件（`base: './'`），任意静态空间/对象存储即可托管，URL 直接访问。
2. V2：把 `db.ts` 替换为带鉴权的 API 客户端，引入 Postgres；引擎与 UI 无需改动。
