import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ExplanationMode = 'simple' | 'exam';

interface LearningContextType {
  mode: ExplanationMode;
  setMode: (mode: ExplanationMode) => void;
  selectedService: string | null;
  setSelectedService: (service: string | null) => void;
  completedTopics: string[];
  markComplete: (topic: string) => void;
  progress: number;
  quizScores: Record<string, number>;
  saveQuizScore: (quizId: string, score: number) => void;
}

const LearningContext = createContext<LearningContextType | null>(null);

export const useLearning = () => {
  const ctx = useContext(LearningContext);
  if (!ctx) throw new Error('useLearning must be used within LearningProvider');
  return ctx;
};

const TOTAL_TOPICS = 12;
const STORAGE_KEYS = {
  mode: 'aws-ml-exam-lens',
  topics: 'aws-ml-completed-topics',
  scores: 'aws-ml-quiz-scores',
};

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function LearningProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ExplanationMode>(() => loadFromStorage(STORAGE_KEYS.mode, 'simple'));
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [completedTopics, setCompletedTopics] = useState<string[]>(() => loadFromStorage(STORAGE_KEYS.topics, []));
  const [quizScores, setQuizScores] = useState<Record<string, number>>(() => loadFromStorage(STORAGE_KEYS.scores, {}));

  const setMode = (m: ExplanationMode) => {
    setModeState(m);
    localStorage.setItem(STORAGE_KEYS.mode, JSON.stringify(m));
  };

  const markComplete = (topic: string) => {
    setCompletedTopics(prev => {
      if (prev.includes(topic)) return prev;
      const next = [...prev, topic];
      localStorage.setItem(STORAGE_KEYS.topics, JSON.stringify(next));
      return next;
    });
  };

  const saveQuizScore = (quizId: string, score: number) => {
    setQuizScores(prev => {
      const next = { ...prev, [quizId]: Math.max(prev[quizId] ?? 0, score) };
      localStorage.setItem(STORAGE_KEYS.scores, JSON.stringify(next));
      return next;
    });
  };

  const progress = Math.round((completedTopics.length / TOTAL_TOPICS) * 100);

  return (
    <LearningContext.Provider value={{ mode, setMode, selectedService, setSelectedService, completedTopics, markComplete, progress, quizScores, saveQuizScore }}>
      {children}
    </LearningContext.Provider>
  );
}
