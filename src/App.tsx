import { lazy, Suspense } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { BottomNav } from './components/BottomNav';

// 路由级分包：首屏只加载首页，其余页面/大数据按需拉取（配合 vite manualChunks）
const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })));
const LearnPage = lazy(() => import('./pages/LearnPage').then((m) => ({ default: m.LearnPage })));
const PracticePage = lazy(() => import('./pages/PracticePage').then((m) => ({ default: m.PracticePage })));
const ExamsPage = lazy(() => import('./pages/ExamsPage').then((m) => ({ default: m.ExamsPage })));
const ProfilePage = lazy(() => import('./pages/ProfilePage').then((m) => ({ default: m.ProfilePage })));
const WordsPage = lazy(() => import('./pages/learn/WordsPage').then((m) => ({ default: m.WordsPage })));
const WordStudyPage = lazy(() => import('./pages/learn/WordStudyPage').then((m) => ({ default: m.WordStudyPage })));
const GrammarListPage = lazy(() => import('./pages/learn/GrammarListPage').then((m) => ({ default: m.GrammarListPage })));
const GrammarTopicPage = lazy(() => import('./pages/learn/GrammarTopicPage').then((m) => ({ default: m.GrammarTopicPage })));
const ExamPointsPage = lazy(() => import('./pages/learn/ExamPointsPage').then((m) => ({ default: m.ExamPointsPage })));
const DialoguePage = lazy(() => import('./pages/learn/DialoguePage').then((m) => ({ default: m.DialoguePage })));
const WritingListPage = lazy(() => import('./pages/learn/WritingListPage').then((m) => ({ default: m.WritingListPage })));
const WritingKitPage = lazy(() => import('./pages/learn/WritingKitPage').then((m) => ({ default: m.WritingKitPage })));
const QuestionSessionPage = lazy(() => import('./pages/practice/QuestionSessionPage').then((m) => ({ default: m.QuestionSessionPage })));
const WrongsPage = lazy(() => import('./pages/practice/WrongsPage').then((m) => ({ default: m.WrongsPage })));
const MockExamPage = lazy(() => import('./pages/exam/MockExamPage').then((m) => ({ default: m.MockExamPage })));
const MockResultPage = lazy(() => import('./pages/exam/MockResultPage').then((m) => ({ default: m.MockResultPage })));
const SettingsPage = lazy(() => import('./pages/SettingsPage').then((m) => ({ default: m.SettingsPage })));
const AdminPage = lazy(() => import('./pages/AdminPage').then((m) => ({ default: m.AdminPage })));

function PageFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-7 w-7 animate-spin rounded-full border-2 border-slate-200 border-t-brand-500" />
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <div className="mx-auto min-h-full max-w-2xl bg-slate-50 shadow-sm">
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/learn/words" element={<WordsPage />} />
            <Route path="/learn/words/study" element={<WordStudyPage />} />
            <Route path="/learn/grammar" element={<GrammarListPage />} />
            <Route path="/learn/grammar/:id" element={<GrammarTopicPage />} />
            <Route path="/learn/points" element={<ExamPointsPage />} />
            <Route path="/learn/dialogue" element={<DialoguePage />} />
            <Route path="/learn/writing" element={<WritingListPage />} />
            <Route path="/learn/writing/:id" element={<WritingKitPage />} />
            <Route path="/practice" element={<PracticePage />} />
            <Route path="/practice/session" element={<QuestionSessionPage />} />
            <Route path="/wrongs" element={<WrongsPage />} />
            <Route path="/exams" element={<ExamsPage />} />
            <Route path="/exams/mock/:paperId" element={<MockExamPage />} />
            <Route path="/exams/mock/:paperId/result/:resultId" element={<MockResultPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
        <BottomNav />
      </div>
    </HashRouter>
  );
}
