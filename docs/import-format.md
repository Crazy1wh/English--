# 导入格式（内容管理 / Admin）

入口：App 内「我的 → 内容管理 / 导入」。支持 JSON 数组粘贴导入，方式分 `merge`（合并去重，推荐）与 `replace`（仅替换此前自定义内容，内置演示数据不受影响）。

**导入会被强制校验；任何一条不合格整批拒绝。**

## 通用校验

1. 每条必须有 `id`、合法 `source`。
2. 题目必须有合法 `reliability`（A/B/C/D）与布尔 `isRealExam`。
3. 只有 `reliability` 为 A/B **且** `source ∈ {official, verified_real_exam, multi_source_verified}` 才允许 `isRealExam=true`。
4. 词汇的 `examYears` 仅在已验证真题来源下允许非空。

## 词汇（Word）

必填：`id, word, phonetic, partOfSpeech, level, source, examYears`。
`level ∈ L1..L5`。选填：`coreMeaning, examMeanings[], collocations[], phrases[], confusingWords[], synonyms[], antonyms[], wordFamily[], knowledgeTags[]`，例句 `exampleSentence: {en, zh}`。

```json
[
  {
    "id": "w.custom.001",
    "word": "example",
    "phonetic": "/ɪɡˈzɑːmpl/",
    "partOfSpeech": "n.",
    "level": "L2",
    "coreMeaning": "例子；榜样",
    "collocations": ["for example", "set an example"],
    "source": "manual",
    "examYears": []
  }
]
```

## 题目（Question）

必填：`id, section, questionType, questionText, options, answer, explanation, source, reliability, isRealExam`；另建议带 `exam/year/region/sourceUrl`（真题溯源）。

- `section ∈ Phonetics|Vocabulary|Grammar|Cloze|Reading|Dialogue|Writing`
- 单选：`questionType:"single_choice"`，`options: {"A": "...", ...}`，`answer:"B"`
- 完形/阅读组：同一篇共享 `groupId` + `groupTitle`，题干可带 `passage`
- 阅读解析建议带 `keywords / location / evidence / paraphrase`
- 关联：`knowledgeTags`（G/EP/知识树 ID）、`skillTags`（C01-C10/R01-R06）、完形 `clozeTag`

```json
[
  {
    "id": "q.custom.001",
    "section": "Grammar",
    "questionType": "single_choice",
    "questionText": "By the time we arrived, the meeting ____.",
    "options": {"A": "has begun", "B": "had begun", "C": "begins", "D": "began"},
    "answer": "B",
    "knowledgeTags": ["G01"],
    "explanation": {
      "answer": "B",
      "why": "by the time + 过去时，表过去的过去，用过去完成时。",
      "knowledgePoint": "过去完成时 = had + done"
    },
    "exam": null, "year": null, "region": null, "sourceUrl": null,
    "source": "manual",
    "reliability": "D",
    "isRealExam": false,
    "status": "active"
  }
]
```

## 备份（非内容导入）

「设置 → 导出/导入备份」导出的是整个 `PersistState`（学习记录+设置+自定义内容），与上面的内容 JSON 不同，请勿混用。
