import { NavLink, useLocation } from 'react-router-dom';
import { BookOpen, Home, Library, PenLine, User } from 'lucide-react';

const tabs = [
  { to: '/', label: '首页', icon: Home, end: true },
  { to: '/learn', label: '学习', icon: BookOpen, end: false },
  { to: '/practice', label: '刷题', icon: PenLine, end: false },
  { to: '/exams', label: '真题', icon: Library, end: false },
  { to: '/profile', label: '我的', icon: User, end: false },
];

export function BottomNav() {
  const { pathname } = useLocation();
  // 沉浸式做题/模考页隐藏导航
  if (pathname.includes('/session') || pathname.includes('/mock/')) return null;
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-2xl border-t border-slate-200 bg-white/95 backdrop-blur bottom-nav-safe">
      <div className="grid grid-cols-5">
        {tabs.map((t) => (
          <NavLink
            key={t.to}
            to={t.to}
            end={t.end}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 py-2 text-[11px] ${isActive ? 'text-brand-600' : 'text-slate-400'}`
            }
          >
            <t.icon size={21} strokeWidth={isActiveLike(pathname, t.to) ? 2.4 : 1.8} />
            {t.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

function isActiveLike(pathname: string, to: string) {
  if (to === '/') return pathname === '/';
  return pathname.startsWith(to);
}
