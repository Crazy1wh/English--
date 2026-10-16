# 知识分类与稳定 ID（规格第三章）

中文只是展示名，**一切内容关联都靠稳定 ID**，这样语言/文案变化不影响学习数据。

## 知识树

定义：[src/data/taxonomy.ts](../src/data/taxonomy.ts)，点分层级 ID：

- `vocabulary`：`vocabulary.collocation.*`（verb_preposition / verb_infinitive / verb_gerund …）、`vocabulary.confusables`、`vocabulary.word_family`
- `grammar`：`grammar.verb.tense.*`（simple_present … future_perfect）、`grammar.non_finite.*`、`grammar.clause.*`（relative/adverbial/noun）、`grammar.modal`、`grammar.subjunctive`、`grammar.inversion` 等
- `phonetics`：vowel / consonant / word_stress / sentence_rhythm
- `cloze`（C01-C10 技能）、`reading`（R01-R06 技能）、`dialogue`（D01-D15 情景）、`writing`

## 内容实体 ID

| 实体 | ID 形态 | 文件 |
|---|---|---|
| 语法专题 | `G01`-`G22`（P0/P1/P2 优先级） | `data/grammar.ts` |
| 高频考点 | `EP01`-`EP10` | `data/examPoints.ts` |
| 对话题景 | `D01`-`D15` | `data/dialogue.ts` |
| 写作包 | `W01`-`W08` | `data/writing.ts` |
| 词汇 | `word.xxx`（内置）/ `w.custom.*`（导入） | `data/words.ts` |
| 题目 | `demo.ph/g/v/cz/rd/dg.*`（演示）/ `q.custom.*`（导入） | `data/questions.ts` |
| 试卷 | `paper.demo.1` | `data/papers.ts` |

题目的 `knowledgeTags` 可同时挂多个节点（如 `['G01', 'grammar.verb.tense.past_perfect']`），`skillTags` 挂 C/R 技能标签，`clozeTag` 标记完形空格考点。

## 掌握度 owner 约定

key 格式 `${kind}:${id}`，kind 取值：

- `word:<wordId>`
- `grammar:G01`
- `exam_point:EP01`
- `reading_skill:R01` … `R06`
- `cloze_skill:C01` … `C10`
- `dialogue_scene:D01` … `D15`
- `question_type:<Section>`（Phonetics/Vocabulary/Grammar/Cloze/Reading/Dialogue/Writing）

一次答题会通过 `ownerKeysForQuestion` 同步更新多个 owner（题目本身 + 语法点 + 技能标签），所以「语法掌握率」和「阅读技能掌握率」都有数据支撑。
