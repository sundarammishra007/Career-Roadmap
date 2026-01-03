import React, { useState } from 'react';
import { generateRoadmap } from './services/geminiService';
import { CareerRoadmap, LoadingState } from './types';
import { Timeline } from './components/Timeline';
import { SyllabusView } from './components/SyllabusView';
import { SearchIcon, MapIcon, BookIcon, SparklesIcon } from './components/Icons';
import { ClockWidget } from './components/ClockWidget';

export default function App() {
  const [query, setQuery] = useState('');
  const [context, setContext] = useState('');
  const [loading, setLoading] = useState<LoadingState>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [data, setData] = useState<CareerRoadmap | null>(null);
  const [activeTab, setActiveTab] = useState<'roadmap' | 'syllabus'>('roadmap');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading('generating');
    setErrorMessage('');
    setData(null);

    try {
      const result = await generateRoadmap(query, context);
      setData(result);
      setLoading('success');
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.message || "An unexpected error occurred.");
      setLoading('error');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <MapIcon className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 hidden md:block">
              Career Roadmap
            </span>
            <span className="text-xl font-bold text-white md:hidden">
              Roadmap
            </span>
          </div>

          <div className="flex items-center gap-4">
            <ClockWidget />
            
            {data && (
              <div className="hidden lg:flex items-center gap-1 text-sm text-slate-400">
                <span>Goal:</span>
                <span className="text-white font-medium px-2 py-0.5 bg-slate-800 rounded">{data.goal}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col">
        {/* Hero / Search Section */}
        {(!data && loading !== 'generating') && (
          <div className="flex-grow flex items-center justify-center p-4 animate-fadeIn">
            <div className="w-full max-w-2xl text-center">
              <div className="mb-8 inline-flex items-center justify-center w-16 h-16 bg-blue-900/20 rounded-2xl mb-6">
                <SparklesIcon className="w-8 h-8 text-blue-400" />
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
                Career Roadmap
              </h1>
              <p className="text-xl text-blue-400 font-medium mb-8 max-w-lg mx-auto leading-relaxed">
                Make your plan structured
              </p>
              <p className="text-slate-400 mb-10 max-w-lg mx-auto leading-relaxed">
                Generate personalized, AI-powered study roadmaps for UPSC, Coding, JEE, or any skill. 
                Detailed steps, syllabus, and AI prep strategies included.
              </p>

              <form onSubmit={handleGenerate} className="space-y-4">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative flex items-center bg-slate-900 rounded-lg">
                    <SearchIcon className="absolute left-4 w-6 h-6 text-slate-500" />
                    <input
                      type="text"
                      className="w-full bg-transparent text-white pl-12 pr-4 py-4 rounded-lg focus:outline-none placeholder-slate-600 text-lg"
                      placeholder="What is your goal? (e.g., UPSC, Full Stack Dev)"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                    <button 
                      type="submit"
                      disabled={!query.trim()}
                      className="absolute right-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Plan
                    </button>
                  </div>
                </div>
                
                <input 
                  type="text"
                  placeholder="Optional context (e.g., 'I am a beginner with 6 months time')"
                  className="w-full bg-slate-800/50 border border-slate-700 text-slate-300 px-4 py-2 rounded-lg focus:outline-none focus:border-slate-600 text-sm"
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                />
              </form>

              <div className="mt-12 flex flex-wrap justify-center gap-3 text-sm text-slate-500">
                <span>Try:</span>
                {['UPSC CSE', 'Machine Learning Engineer', 'Bank PO', 'Product Manager'].map((tag) => (
                  <button 
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-700 rounded-full text-slate-400 hover:text-white transition-colors border border-slate-700"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading === 'generating' && (
          <div className="flex-grow flex flex-col items-center justify-center p-4">
            <div className="w-16 h-16 border-4 border-blue-600/30 border-t-blue-500 rounded-full animate-spin mb-6"></div>
            <h2 className="text-2xl font-bold text-white mb-2">Architecting your path...</h2>
            <p className="text-slate-400 animate-pulse">Analyzing syllabus &middot; Structuring phases &middot; Curating AI strategies</p>
          </div>
        )}

        {/* Error State */}
        {loading === 'error' && (
          <div className="flex-grow flex flex-col items-center justify-center p-4 text-center">
            <div className="bg-red-900/20 p-4 rounded-full mb-4">
               <span className="text-4xl">⚠️</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Generation Failed</h3>
            <p className="text-slate-400 mb-6 max-w-md mx-auto">{errorMessage}</p>
            <button 
              onClick={() => {
                setLoading('idle');
                setErrorMessage('');
              }}
              className="px-6 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-md text-white transition-colors flex items-center gap-2 mx-auto"
            >
              <SparklesIcon className="w-4 h-4" />
              Try Again
            </button>
          </div>
        )}

        {/* Results View */}
        {data && loading === 'success' && (
          <div className="flex-grow flex flex-col animate-fadeIn">
            {/* Context Header */}
            <div className="bg-slate-800/50 border-b border-slate-700 p-6 md:p-8">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">{data.goal}</h1>
                    <p className="text-slate-300 max-w-2xl text-lg leading-relaxed">{data.overview}</p>
                  </div>
                  <div className="bg-slate-900 px-4 py-3 rounded-lg border border-slate-700">
                    <span className="text-slate-500 text-sm block uppercase tracking-wider font-bold mb-1">Estimated Time</span>
                    <span className="text-xl font-mono text-blue-400">{data.estimatedTotalDuration}</span>
                  </div>
                </div>
                
                {/* Tabs */}
                <div className="flex gap-4 border-b border-slate-700">
                  <button
                    onClick={() => setActiveTab('roadmap')}
                    className={`pb-3 px-1 flex items-center gap-2 font-medium transition-all border-b-2 
                      ${activeTab === 'roadmap' 
                        ? 'border-blue-500 text-blue-400' 
                        : 'border-transparent text-slate-500 hover:text-slate-300'}`}
                  >
                    <MapIcon className="w-4 h-4" />
                    Step-by-Step Roadmap
                  </button>
                  <button
                    onClick={() => setActiveTab('syllabus')}
                    className={`pb-3 px-1 flex items-center gap-2 font-medium transition-all border-b-2 
                      ${activeTab === 'syllabus' 
                        ? 'border-blue-500 text-blue-400' 
                        : 'border-transparent text-slate-500 hover:text-slate-300'}`}
                  >
                    <BookIcon className="w-4 h-4" />
                    Detailed Syllabus
                  </button>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-grow bg-slate-900">
              <div className="max-w-7xl mx-auto py-8">
                <div key={activeTab} className="animate-fadeIn">
                  {activeTab === 'roadmap' ? (
                    <Timeline phases={data.phases} />
                  ) : (
                    <SyllabusView syllabus={data.syllabus} />
                  )}
                </div>
              </div>
            </div>

            {/* Footer / Reset Action */}
            <div className="fixed bottom-6 right-6 z-40">
                <button 
                  onClick={() => {
                      setData(null);
                      setLoading('idle');
                      setQuery('');
                      setErrorMessage('');
                  }}
                  className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/50 p-4 rounded-full transition-transform hover:scale-110 flex items-center gap-2 font-bold"
                >
                  <SparklesIcon className="w-5 h-5" />
                  New Roadmap
                </button>
            </div>
          </div>
        )}
      </main>

    </div>
  );
}