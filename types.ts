export interface Resource {
  title: string;
  type: 'book' | 'video' | 'course' | 'article' | 'tool';
  url?: string;
}

export interface RoadmapStep {
  id: string;
  title: string;
  duration: string;
  description: string;
  topics: string[];
  resources: Resource[];
  aiStrategy: string; // "How to prepare with AI" for this specific step
}

export interface RoadmapPhase {
  title: string;
  description: string;
  steps: RoadmapStep[];
}

export interface SyllabusTopic {
  name: string;
  subtopics: string[];
  importance: 'High' | 'Medium' | 'Low';
}

export interface CareerRoadmap {
  goal: string;
  overview: string;
  phases: RoadmapPhase[];
  syllabus: SyllabusTopic[]; // High level syllabus breakdown
  estimatedTotalDuration: string;
}

export type LoadingState = 'idle' | 'generating' | 'success' | 'error';
