import { useState } from 'react';
import { LearningProvider } from '@/context/LearningContext';
import TopBar from '@/components/layout/TopBar';
import ArchitectureMap from '@/components/map/ArchitectureMap';
import ServicePanel from '@/components/panels/ServicePanel';
import AITutor from '@/components/tutor/AITutor';
import { ExamPatterns, ServiceCompare, MockExam } from '@/components/exam/ExamFeatures';
import { motion } from 'framer-motion';
import { Map, Target, ArrowLeftRight, FileQuestion } from 'lucide-react';

type View = 'map' | 'patterns' | 'compare' | 'exam';

export default function Index() {
  const [view, setView] = useState<View>('map');

  const tabs: { id: View; label: string; icon: React.ReactNode }[] = [
    { id: 'map', label: 'Architecture Map', icon: <Map size={14} /> },
    { id: 'patterns', label: 'Exam Patterns', icon: <Target size={14} /> },
    { id: 'compare', label: 'Compare Services', icon: <ArrowLeftRight size={14} /> },
    { id: 'exam', label: 'Mock Exam', icon: <FileQuestion size={14} /> },
  ];

  return (
    <LearningProvider>
      <div className="h-screen flex flex-col bg-background overflow-hidden">
        <TopBar />
        
        {/* Tab bar */}
        <div className="border-b border-border bg-card/50 px-5 flex gap-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setView(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium transition-colors relative ${
                view === tab.id ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.icon} {tab.label}
              {view === tab.id && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {view === 'map' && <ArchitectureMap />}
          {view === 'patterns' && <ExamPatterns />}
          {view === 'compare' && <ServiceCompare />}
          {view === 'exam' && <MockExam />}
        </div>

        <ServicePanel />
        <AITutor />
      </div>
    </LearningProvider>
  );
}
