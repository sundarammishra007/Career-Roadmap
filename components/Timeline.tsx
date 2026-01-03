import React from 'react';
import { RoadmapPhase, RoadmapStep } from '../types';
import { SparklesIcon, ChevronRightIcon, CheckCircleIcon } from './Icons';

interface TimelineProps {
  phases: RoadmapPhase[];
}

const StepCard: React.FC<{ step: RoadmapStep; index: number }> = ({ step, index }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative pl-8 md:pl-0">
      {/* Connector Line */}
      <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-0.5 bg-slate-700 -ml-px" />
      
      {/* Mobile Connector */}
      <div className="md:hidden absolute left-3 top-0 bottom-0 w-0.5 bg-slate-700" />

      <div className={`md:flex items-center justify-between mb-8 group ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
        
        {/* Timeline Dot */}
        <div className="absolute left-3 md:left-1/2 w-6 h-6 bg-blue-600 rounded-full border-4 border-slate-900 z-10 -ml-3 md:-ml-3 mt-1.5 md:mt-0 flex items-center justify-center shadow-[0_0_10px_rgba(37,99,235,0.5)]">
            <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>

        {/* Spacer for alternating layout */}
        <div className="hidden md:block w-[45%]" />

        {/* Card Content */}
        <div className="w-full md:w-[45%] bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-blue-500 transition-all shadow-lg hover:shadow-blue-900/20">
          <div 
            className="cursor-pointer flex justify-between items-start"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div>
              <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-300 bg-blue-900/30 rounded mb-2">
                {step.duration}
              </span>
              <h3 className="text-xl font-bold text-white mb-1">{step.title}</h3>
              <p className="text-slate-400 text-sm line-clamp-2">{step.description}</p>
            </div>
            <ChevronRightIcon className={`w-5 h-5 text-slate-500 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
          </div>

          {/* Expanded Content */}
          {isOpen && (
            <div className="mt-4 pt-4 border-t border-slate-700 animate-fadeIn">
              
              {/* Topics */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-slate-300 mb-2 uppercase tracking-wide">Key Topics</h4>
                <div className="flex flex-wrap gap-2">
                  {step.topics.map((topic, i) => (
                    <span key={i} className="text-xs text-slate-300 bg-slate-700 px-2 py-1 rounded">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* AI Strategy */}
              <div className="mb-4 bg-indigo-900/20 p-4 rounded-lg border border-indigo-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <SparklesIcon className="w-4 h-4 text-indigo-400" />
                  <h4 className="text-sm font-bold text-indigo-300">How to Prepare with AI</h4>
                </div>
                <p className="text-sm text-indigo-100/80 leading-relaxed">
                  {step.aiStrategy}
                </p>
              </div>

              {/* Resources */}
              {step.resources.length > 0 && (
                <div>
                   <h4 className="text-sm font-semibold text-slate-300 mb-2 uppercase tracking-wide">Resources</h4>
                   <ul className="space-y-1">
                     {step.resources.map((res, i) => (
                       <li key={i} className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-2">
                         <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                         {res.url ? (
                           <a href={res.url} target="_blank" rel="noopener noreferrer" className="underline decoration-blue-500/30">
                             {res.title}
                           </a>
                         ) : (
                           <span>{res.title} <span className="text-slate-500 text-xs">({res.type})</span></span>
                         )}
                       </li>
                     ))}
                   </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const Timeline: React.FC<TimelineProps> = ({ phases }) => {
  return (
    <div className="w-full max-w-5xl mx-auto py-12 px-4">
      {phases.map((phase, pIndex) => (
        <div key={pIndex} className="mb-16 last:mb-0">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px bg-slate-700 flex-1"></div>
            <h2 className="text-2xl font-bold text-white text-center bg-slate-800 px-6 py-2 rounded-full border border-slate-700 shadow-xl">
              <span className="text-blue-500 mr-2">Phase {pIndex + 1}:</span>
              {phase.title}
            </h2>
            <div className="h-px bg-slate-700 flex-1"></div>
          </div>
          <div className="relative">
            {phase.steps.map((step, sIndex) => (
              <StepCard key={sIndex} step={step} index={sIndex} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
