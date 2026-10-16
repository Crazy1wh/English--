import type { ErrorType, Question } from '@/types';

/**
 * 自动预测错误类型（文档第十三章），用户可修改。
 * 这是基于题目元数据的启发式初判，不代表对用户思维的确定判断。
 */
export function predictErrorType(q: Question): ErrorType {
  const tags = [...q.knowledgeTags, ...q.skillTags, q.questionType];
  const has = (...keys: string[]) => keys.some((k) => tags.some((t) => t.includes(k)));

  switch (q.section) {
    case 'Reading':
      if (has('inference')) return 'E07';
      if (has('detail', 'R01')) return 'E06';
      if (has('paraphrase', 'word_meaning', 'R04')) return 'E08';
      if (has('attitude', 'R05')) return 'E07';
      return 'E07';
    case 'Cloze':
      if (has('C09', 'C10', 'logic')) return 'E09';
      if (has('C02', 'C03', 'C06', 'collocation', 'preposition')) return 'E02';
      if (has('C04', 'C05', 'tense', 'non_finite')) return 'E03';
      if (has('C01', 'meaning')) return 'E01';
      return 'E09';
    case 'Grammar':
    case 'Phonetics':
      if (has('collocation')) return 'E02';
      return 'E03';
    case 'Vocabulary':
      if (has('collocation', 'phrase', 'preposition')) return 'E02';
      if (has('confus')) return 'E01';
      return 'E01';
    case 'Dialogue':
      return 'E07';
    default:
      return 'E10';
  }
}

export const ERROR_TYPE_LABELS: Record<ErrorType, string> = {
  E01: '单词不认识',
  E02: '固定搭配不会',
  E03: '语法规则不会',
  E04: '知道规则但判断错误',
  E05: '粗心',
  E06: '阅读定位错误',
  E07: '文章理解错误',
  E08: '未识别同义替换',
  E09: '逻辑判断错误',
  E10: '猜题',
};
