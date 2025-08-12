import React from 'react';
import { BarChart3, User, Clock, FileText, CheckCircle } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const tabs = [
  { to: '/dashboard/overview',   label: 'Özet',           Icon: BarChart3 },
  { to: '/dashboard/info',       label: 'Bilgilerim',     Icon: User },
  { to: '/dashboard/attendance', label: 'Devam',          Icon: Clock },
  { to: '/dashboard/logs',       label: 'Günlük',         Icon: FileText },
  { to: '/dashboard/evals',      label: 'Değerlendirme',  Icon: CheckCircle },
];

export default function Sidebar() {
  return (
    <aside className="w-60 bg-white h-full shadow-lg">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold">🧑‍🎓 Öğrenci Paneli</h2>
      </div>
      <nav className="mt-4 flex flex-col space-y-1 px-2">
        {tabs.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <Icon className="h-5 w-5" />
            <span className="font-medium">{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
