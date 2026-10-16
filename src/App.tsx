import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { BottomNav } from './components/BottomNav';
import { HomePage } from './pages/HomePage';
import { LearnPage } from './pages/LearnPage';
import { PracticePage } from './pages/PracticePage';
import { ExamsPage } from './pages/ExamsPage';
import { ProfilePage } from './pages/ProfilePage';
import { WordsPage } from './pages/learn/WordsPage';
import { WordStudyPage } from './pages/learn/WordStudyPage';
import { GrammarListPage } from './pages/learn/GrammarListPage';
import { GrammarTopicPage } from './pages/learn/GrammarTopicPage';
import { ExamPointsPage } from './pages/learn/ExamPointsPage';
import { DialoguePage } from './pages/learn/DialoguePage';
import { WritingListPage } from './pages/learn/WritingListPage';
import { WritingKitPage } from './pages/learn/WritingKitPage';
import { QuestionSessionPage } from './pages/practice/QuestionSessionPage';
import { WrongsPage } from './pages/practice/WrongsPage';
import { MockExamPage } from './pages/exam/MockExamPage';
import { MockResultPage } from './pages/exam/MockResultPage';
import { SettingsPage } from './pages/SettingsPage';
import { AdminPage } from './pages/AdminPage';

export default function App() {
  return (
    <HashRouter>
      <div className="mx-auto min-h-full max-w-2xl bg-slate-50 shadow-sm">
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
        <BottomNav />
      </div>
    </HashRouter>
  );
}
