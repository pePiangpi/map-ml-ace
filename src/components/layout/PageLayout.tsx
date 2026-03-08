import TopBar from './TopBar';
import AITutor from '@/components/tutor/AITutor';
import { ReactNode } from 'react';

export default function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopBar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
      <AITutor />
    </div>
  );
}
