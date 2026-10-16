// ============================================================
// AI 客户端：只支持 OpenAI-compatible endpoint（文档第二十六章），
// 不绑定任何供应商。可接 OpenAI / new-api / 本地 vLLM 等。
// 未配置 Key 时调用方必须走本地降级，不影响主流程使用。
// ============================================================

import type { AiConfig, Question } from '@/types';
import { gradeEssayLocally, type LocalEssayResult } from './essay-local';

export function isAiReady(ai: AiConfig): boolean {
  return !!ai.baseUrl && !!ai.apiKey && !!ai.model;
}

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export async function chatCompletion(ai: AiConfig, messages: ChatMessage[], opts: { temperature?: number; json?: boolean } = {}): Promise<string> {
  if (!isAiReady(ai)) throw new Error('AI_UNCONFIGURED');
  const base = ai.baseUrl.replace(/\/$/, '');
  const resp = await fetch(`${base}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ai.apiKey}`,
    },
    body: JSON.stringify({
      model: ai.model,
      messages,
      temperature: opts.temperature ?? 0.3,
      ...(opts.json ? { response_format: { type: 'json_object' } } : {}),
    }),
  });
  if (!resp.ok) {
    const t = await resp.text().catch(() => '');
    throw new Error(`AI_HTTP_${resp.status}: ${t.slice(0, 200)}`);
  }
  const data = await resp.json();
  const content = data?.choices?.[0]?.message?.content;
  if (typeof content !== 'string') throw new Error('AI_BAD_RESPONSE');
  return content;
}

// ---------------- 题目讲解 ----------------

export async function explainQuestion(
  ai: AiConfig,
  q: Question,
  ask: string,
): Promise<{ text: string; by: 'ai' | 'local' }> {
  if (!isAiReady(ai)) {
    return { text: localExplain(q, ask), by: 'local' };
  }
  const messages: ChatMessage[] = [
    {
      role: 'system',
      content:
        '你是成人高考专升本英语辅导老师，面对基础薄弱的成年考生。用简短中文讲清楚，不堆术语，必要时给简单例句。只回答学生的问题，不要假装自己是历年真题，所有题目都按模拟题对待。',
    },
    {
      role: 'user',
      content: `题目（${q.section}）：${q.questionText}\n选项：${q.options.map((o, i) => `${'ABCD'[i]}. ${o}`).join('  ')}\n正确答案：${q.answer}\n已有解析：${q.explanation.conclusion} ${q.explanation.whyCorrect}\n学生问：${ask}`,
    },
  ];
  try {
    const text = await chatCompletion(ai, messages, { temperature: 0.4 });
    return { text, by: 'ai' };
  } catch (e) {
    return { text: `${localExplain(q, ask)}\n\n（AI 服务不可用，已返回本地讲解：${(e as Error).message}）`, by: 'local' };
  }
}

function localExplain(q: Question, ask: string): string {
  const askLower = ask.toLowerCase();
  if (askLower.includes('为什么不能') || askLower.includes('为啥不')) {
    const letter = ask.match(/[A-Da-d]/)?.[0]?.toUpperCase();
    const item = q.explanation.whyWrong.find((w) => w.option.startsWith(letter ?? '∅'));
    return item
      ? `选项 ${item.option} 不正确：${item.reason}`
      : `干扰项分析：${q.explanation.whyWrong.map((w) => `${w.option}: ${w.reason}`).join('；')}`;
  }
  if (askLower.includes('简单') || askLower.includes('不懂') || askLower.includes('再')) {
    return `${q.explanation.conclusion}\n一句话记忆：${q.explanation.mnemonic ?? q.explanation.keyPoint}\n再看例句：${q.explanation.ruleExample ? `${q.explanation.ruleExample.en}（${q.explanation.ruleExample.zh}）` : '把正确选项放回原句读两遍，形成语感。'}`;
  }
  return `${q.explanation.conclusion}\n考点：${q.explanation.keyPoint}\n${q.explanation.whyCorrect}`;
}

// ---------------- 作文评分 ----------------

export interface EssayGrade {
  by: 'ai' | 'local';
  scores: LocalEssayResult['scores'];
  totalEstimate: number;
  mainErrors: string[];
  suggestions: string[];
  revisedText: string;
}

export async function gradeEssay(
  ai: AiConfig,
  prompt: string,
  text: string,
): Promise<EssayGrade> {
  const local = gradeEssayLocally(prompt, text);
  if (!isAiReady(ai)) {
    return { by: 'local', ...local, revisedText: '' };
  }
  const messages: ChatMessage[] = [
    {
      role: 'system',
      content:
        '你是成人高考专升本英语阅卷老师。考生基础一般，目标是稳过线。请严格按 JSON 返回：{"content":0-100,"structure":0-100,"grammar":0-100,"vocabulary":0-100,"format":0-100,"totalEstimate":0-100,"mainErrors":["中文列出主要错误，最多4条"],"suggestions":["中文建议，最多4条"],"revisedText":"在考生原文基础上做最小修改、保持成考难度的安全版本，不要改成雅思/六级难度"}。只输出 JSON。',
    },
    { role: 'user', content: `题目：${prompt}\n\n作文：\n${text}` },
  ];
  try {
    const raw = await chatCompletion(ai, messages, { temperature: 0.2, json: true });
    const parsed = JSON.parse(raw.replace(/^```json?|```$/g, '').trim());
    const clamp = (n: unknown) => Math.max(0, Math.min(100, Math.round(Number(n) || 0)));
    return {
      by: 'ai',
      scores: {
        content: clamp(parsed.content),
        structure: clamp(parsed.structure),
        grammar: clamp(parsed.grammar),
        vocabulary: clamp(parsed.vocabulary),
        format: clamp(parsed.format),
      },
      totalEstimate: clamp(parsed.totalEstimate),
      mainErrors: Array.isArray(parsed.mainErrors) ? parsed.mainErrors.slice(0, 4) : local.mainErrors,
      suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions.slice(0, 4) : local.suggestions,
      revisedText: typeof parsed.revisedText === 'string' ? parsed.revisedText : '',
    };
  } catch (e) {
    return { by: 'local', ...local, revisedText: ``, suggestions: [...local.suggestions, `AI 评分不可用（${(e as Error).message}），以上为本地估算。`] };
  }
}
