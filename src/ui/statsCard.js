import React from 'react';

export default function StatsCard({ title, value, subtitle, icon: Icon, colorClass }) {
  return (
    <div
      className={`
        flex justify-between items-center p-4 rounded-lg shadow-sm 
        bg-gradient-to-br ${colorClass.bgFrom} ${colorClass.bgTo} border ${colorClass.border}
      `}
    >
      <div>
        <p className={`text-sm font-medium ${colorClass.text}`}>{title}</p>
        <p className={`text-3xl font-bold ${colorClass.text}`}>{value}</p>
        <p className="text-xs text-gray-600">{subtitle}</p>
      </div>
      <Icon className={`h-8 w-8 opacity-30 ${colorClass.text}`} />
    </div>
  );
}
