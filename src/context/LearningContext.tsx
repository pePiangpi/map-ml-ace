import { createContext, useContext, useState, ReactNode } from 'react';

type ExplanationMode = 'simple' | 'exam';

interface LearningContextType {
  mode: ExplanationMode;
  setMode: (mode: ExplanationMode) => void;
  selectedService: string | null;
  setSelectedService: (service: string | null) => void;
  completedTopics: string[];
  markComplete: (topic: string) => void;
  progress: number;
}

const LearningContext = createContext<LearningContextType | null>(null);

export const useLearning = () => {
  const ctx = useContext(LearningContext);
  if (!ctx) throw new Error('useLearning must be used within LearningProvider');
  return ctx;
};

const TOTAL_TOPICS = 12;

export function LearningProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ExplanationMode>('simple');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);

  const markComplete = (topic: string) => {
    setCompletedTopics(prev => prev.includes(topic) ? prev : [...prev, topic]);
  };

  const progress = Math.round((completedTopics.length / TOTAL_TOPICS) * 100);

  return (
    <LearningContext.Provider value={{ mode, setMode, selectedService, setSelectedService, completedTopics, markComplete, progress }}>
      {children}
    </LearningContext.Provider>
  );
}
