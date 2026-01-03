import React, { useState, useEffect } from 'react';
import { ClockIcon, CalendarIcon } from './Icons';

export const ClockWidget = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateStr = date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <div className="hidden sm:flex items-center gap-3 bg-slate-800/50 border border-slate-700 px-3 py-1.5 rounded-lg text-sm shadow-sm backdrop-blur-sm">
      <div className="flex items-center gap-2 text-blue-400 border-r border-slate-700 pr-3">
        <ClockIcon className="w-4 h-4" />
        <span className="font-mono font-medium tracking-wide">{timeStr}</span>
      </div>
      <div className="flex items-center gap-2 text-slate-400">
        <CalendarIcon className="w-4 h-4" />
        <span>{dateStr}</span>
      </div>
    </div>
  );
};