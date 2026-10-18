// 轻量发音工具：Web Speech API（系统 TTS），无第三方依赖、无网络请求。
// 不支持的环境（老浏览器/无英文语音包）静默降级，不影响学习流程。

let cachedVoices: SpeechSynthesisVoice[] = [];

function voices(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
  if (cachedVoices.length === 0) cachedVoices = window.speechSynthesis.getVoices();
  return cachedVoices;
}

export function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function speak(text: string, rate = 0.9): void {
  if (!isSpeechSupported() || !text) return;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = rate;
    const v =
      voices().find((x) => x.lang.startsWith('en') && /female|samantha|google/i.test(x.name)) ??
      voices().find((x) => x.lang.toLowerCase().startsWith('en'));
    if (v) u.voice = v;
    window.speechSynthesis.speak(u);
  } catch {
    // 忽略 TTS 异常
  }
}

// 部分浏览器语音列表异步加载，提前触发一次缓存
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoices = window.speechSynthesis.getVoices();
  };
}
