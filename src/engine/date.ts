/** 日期工具：统一用本地时区 yyyy-mm-dd，避免 UTC 偏移 */

export function toDateStr(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function todayStr(): string {
  return toDateStr(new Date());
}

export function addDays(dateStr: string, days: number): string {
  const d = new Date(`${dateStr}T00:00:00`);
  d.setDate(d.getDate() + days);
  return toDateStr(d);
}

/** a - b 的天数差（a、b 均为 yyyy-mm-dd） */
export function daysBetween(a: string, b: string): number {
  const da = new Date(`${a}T00:00:00`).getTime();
  const db = new Date(`${b}T00:00:00`).getTime();
  return Math.round((da - db) / 86_400_000);
}

export function daysUntil(dateStr: string): number {
  return daysBetween(dateStr, todayStr());
}

export function nowIso(): string {
  return new Date().toISOString();
}
