import React from 'react';
import { SyllabusTopic } from '../types';

interface SyllabusViewProps {
  syllabus: SyllabusTopic[];
}

export const SyllabusView: React.FC<SyllabusViewProps> = ({ syllabus }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {syllabus.map((topic, index) => (
        <div 
          key={index} 
          className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:bg-slate-750 transition-colors"
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-bold text-white">{topic.name}</h3>
            <span className={`px-2 py-1 text-xs font-bold rounded uppercase tracking-wider
              ${topic.importance === 'High' ? 'bg-red-900/30 text-red-400' : 
                topic.importance === 'Medium' ? 'bg-yellow-900/30 text-yellow-400' : 
                'bg-green-900/30 text-green-400'}`}>
              {topic.importance} Priority
            </span>
          </div>
          
          <ul className="space-y-2">
            {topic.subtopics.map((sub, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                <span className="mt-1.5 w-1 h-1 bg-slate-500 rounded-full flex-shrink-0"></span>
                <span className="leading-relaxed">{sub}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
