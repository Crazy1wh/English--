import { useRef, useState } from 'react';
import { Download, RotateCcw, Upload } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { useStore } from '@/store/useStore';
import { exportData, resetAll, restoreData, updateSettings } from '@/store/db';
import type { AiConfig, Settings } from '@/types';

const MINUTE_OPTIONS = [20, 30, 45, 60, 90];
const SCORE_OPTIONS = [80, 90, 100, 110, 120];

export function SettingsPage() {
  const s = useStore();
  const fileRef = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState('');
  const ai: AiConfig = s.settings.ai;

  function downloadBackup() {
    const blob = new Blob([exportData()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chengkao-english-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function onRestoreFile(file: File) {
    try {
      restoreData(await file.text());
      setMsg('导入成功，页面数据已恢复');
    } catch {
      setMsg('导入失败：文件不是有效的备份 JSON');
    }
  }

  return (
    <div className="pb-nav">
      <PageHeader title="设置" back="/profile" />
      <div className="space-y-4 px-4 pt-3">
        {/* 考试计划 */}
        <section className="card space-y-4 p-4">
          <h3 className="text-sm font-semibold text-slate-700">考试计划</h3>
          <label className="block text-sm text-slate-600">
            考试日期
            <input
              type="date"
              className="input mt-1"
              value={s.settings.examDate}
              onChange={(e) => updateSettings({ examDate: e.target.value })}
            />
          </label>
          <div className="text-sm text-slate-600">
            每日学习时长
            <div className="mt-1.5 flex gap-2">
              {MINUTE_OPTIONS.map((m) => (
                <button
                  key={m}
                  onClick={() => updateSettings({ dailyMinutes: m as Settings['dailyMinutes'] })}
                  className={`flex-1 rounded-lg py-2 text-sm ${s.settings.dailyMinutes === m ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-500'}`}
                >
                  {m}分
                </button>
              ))}
            </div>
          </div>
          <div className="text-sm text-slate-600">
            目标分数（满分 150）
            <div className="mt-1.5 flex gap-2">
              {SCORE_OPTIONS.map((v) => (
                <button
                  key={v}
                  onClick={() => updateSettings({ targetScore: v })}
                  className={`flex-1 rounded-lg py-2 text-sm ${s.settings.targetScore === v ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-500'}`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* AI 配置 */}
        <section className="card space-y-3 p-4">
          <h3 className="text-sm font-semibold text-slate-700">AI 解析 / 作文批改（可选）</h3>
          <p className="text-xs leading-5 text-slate-400">
            兼容任意 OpenAI 格式的 <code className="rounded bg-slate-100 px-1">/chat/completions</code> 端点（可自建或使用兼容网关）。
            不配置时全部功能自动使用本地降级方案；API Key 仅保存在本浏览器，不会上传到任何第三方。
          </p>
          <label className="block text-sm text-slate-600">
            Base URL
            <input
              className="input mt-1"
              placeholder="https://your-endpoint/v1"
              value={ai.baseUrl}
              onChange={(e) => updateSettings({ ai: { ...ai, baseUrl: e.target.value } })}
            />
          </label>
          <label className="block text-sm text-slate-600">
            API Key
            <input
              type="password"
              className="input mt-1"
              placeholder="sk-..."
              value={ai.apiKey}
              onChange={(e) => updateSettings({ ai: { ...ai, apiKey: e.target.value } })}
            />
          </label>
          <label className="block text-sm text-slate-600">
            模型名
            <input
              className="input mt-1"
              placeholder="gpt-4o-mini 等"
              value={ai.model}
              onChange={(e) => updateSettings({ ai: { ...ai, model: e.target.value } })}
            />
          </label>
        </section>

        {/* 数据管理 */}
        <section className="card space-y-3 p-4">
          <h3 className="text-sm font-semibold text-slate-700">数据管理</h3>
          <div className="grid grid-cols-2 gap-2">
            <button className="btn-outline" onClick={downloadBackup}>
              <Download size={16} /> 导出备份
            </button>
            <button className="btn-outline" onClick={() => fileRef.current?.click()}>
              <Upload size={16} /> 导入备份
            </button>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void onRestoreFile(f);
              e.target.value = '';
            }}
          />
          <button
            className="btn w-full border border-rose-200 py-2.5 text-sm text-rose-500 hover:bg-rose-50"
            onClick={() => {
              if (confirm('确定清空全部学习数据并恢复初始演示内容？此操作不可撤销（建议先导出备份）。')) resetAll();
            }}
          >
            <RotateCcw size={16} /> 重置全部数据
          </button>
          {msg && <p className="text-xs text-emerald-600">{msg}</p>}
        </section>
      </div>
    </div>
  );
}
