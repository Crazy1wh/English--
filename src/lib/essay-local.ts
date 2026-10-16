// 本地作文启发式评估（无 AI Key 时的降级方案）。
// 只做可解释的基础检查，输出 0-100 质量分，不冒充官方分值。

export interface LocalEssayResult {
  scores: { content: number; structure: number; grammar: number; vocabulary: number; format: number };
  totalEstimate: number;
  mainErrors: string[];
  suggestions: string[];
}

const LETTER_HINTS = ['邀请', '感谢', '道歉', '建议', '申请', '信', '邮件', 'invite', 'thank', 'apolog', 'suggest', 'apply'];
const NOTICE_HINTS = ['通知', 'notice', 'announce'];
const CONNECTORS = ['first', 'second', 'then', 'besides', 'what is more', 'however', 'so', 'because', 'finally', 'in a word', 'for example', 'also'];

export function gradeEssayLocally(prompt: string, text: string): LocalEssayResult {
  const mainErrors: string[] = [];
  const suggestions: string[] = [];
  const lower = text.toLowerCase();
  const words = text.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  // ---------- 内容 ----------
  let content = 55;
  if (wordCount >= 90) content += 20;
  else if (wordCount >= 60) content += 12;
  else {
    content -= 15;
    mainErrors.push(`篇幅偏短（约 ${wordCount} 词），建议写到 90-120 词，内容更容易完整。`);
  }
  // 是否回应提示中的关键词（粗粒度：检查是否包含足够的信息类句子）
  const sentences = text.split(/[.!?！。？]/).map((s) => s.trim()).filter(Boolean);
  if (sentences.length >= 6) content += 10;
  else suggestions.push('正文可增加 1-2 个包含具体信息（时间、地点、原因、例子）的句子。');

  // ---------- 结构 ----------
  let structure = 50;
  const connectorsUsed = CONNECTORS.filter((c) => lower.includes(c));
  structure += Math.min(25, connectorsUsed.length * 7);
  const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim()).length;
  if (paragraphs >= 2) structure += 10;
  if (paragraphs >= 3) structure += 5;
  if (connectorsUsed.length === 0) suggestions.push('增加连接词（First / Besides / However / In a word），让结构更清晰。');

  // ---------- 语法（启发式） ----------
  let grammar = 80;
  if (/\bi\b/.test(text)) {
    grammar -= 12;
    mainErrors.push('代词 I 必须大写。');
  }
  if (/[.,!?]\s*[a-z]/.test(text)) {
    grammar -= 8;
    mainErrors.push('句首字母需要大写（句号后）。');
  }
  if (/\s{2,}/.test(text)) grammar -= 4;
  if (/don\s+not/.test(lower)) {
    grammar -= 6;
    mainErrors.push('“don not”应写成 do not / don’t。');
  }
  // 三单粗略检查：he/she/it + 常见动词原形（启发式，可能误判，仅作提示）
  if (/\b(he|she|it)\s+(like|want|need|go|get|make|take|play|work|study|speak|tell)\b/.test(lower)) {
    grammar -= 8;
    mainErrors.push('一般现在时第三人称单数动词可能漏了 -s/-es。');
  }

  // ---------- 词汇 ----------
  const uniqueRatio = wordCount === 0 ? 0 : new Set(words.map((w) => w.toLowerCase().replace(/[^a-z']/g, ''))).size / wordCount;
  let vocabulary = Math.round(45 + uniqueRatio * 40);
  if (wordCount > 0 && uniqueRatio < 0.45) suggestions.push('同一单词重复较多，可尝试用同义词替换（如 good → nice/helpful/important）。');

  // ---------- 格式 ----------
  let format = 60;
  const isLetter = LETTER_HINTS.some((h) => prompt.toLowerCase().includes(h));
  const isNotice = NOTICE_HINTS.some((h) => prompt.toLowerCase().includes(h));
  if (isLetter) {
    if (/dear\b/i.test(text)) format += 20;
    else mainErrors.push('信件开头应有称呼（如 Dear ...,）。');
    if (/yours|best wishes|li hua/i.test(text)) format += 20;
    else mainErrors.push('信件结尾应有落款（如 Yours, Li Hua）。');
  } else if (isNotice) {
    if (/notice|announcement/i.test(text)) format += 25;
    if (/\b(the student union|students' union|学生会)\b/i.test(text)) format += 15;
  } else {
    format = paragraphs >= 3 ? 85 : 70;
  }

  // ---------- 汇总 ----------
  const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)));
  const scores = {
    content: clamp(content),
    structure: clamp(structure),
    grammar: clamp(grammar),
    vocabulary: clamp(vocabulary),
    format: clamp(format),
  };
  const totalEstimate = Math.round(
    scores.content * 0.25 + scores.structure * 0.2 + scores.grammar * 0.25 + scores.vocabulary * 0.15 + scores.format * 0.15,
  );

  if (mainErrors.length === 0) suggestions.unshift('没有发现明显基础错误，可尝试把 1-2 个简单句合并为复合句（when/because/which）。');

  return { scores, totalEstimate, mainErrors, suggestions };
}
