import { useLearning } from '@/context/LearningContext';
import { motion } from 'framer-motion';
import { Brain, Zap, BookOpen, Trophy, BarChart3 } from 'lucide-react';

export default function TopBar() {
  const { mode, setMode, progress, completedTopics } = useLearning();

  return (
    <motion.header
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      className="h-14 border-b border-border bg-card/80 backdrop-blur-md flex items-center justify-between px-5 z-40 relative"
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <Brain size={18} className="text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-sm font-bold text-foreground leading-none">AWS ML Architect</h1>
          <p className="text-[10px] text-muted-foreground">MLA-C01 Exam Prep</p>
        </div>
      </div>

      {/* Center - Mode Toggle */}
      <div className="flex items-center bg-muted rounded-full p-1 border border-border">
        <button
          onClick={() => setMode('simple')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            mode === 'simple'
              ? 'bg-primary text-primary-foreground shadow-md'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Zap size={12} /> Simple
        </button>
        <button
          onClick={() => setMode('exam')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            mode === 'exam'
              ? 'bg-secondary text-secondary-foreground shadow-md'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <BookOpen size={12} /> Exam
        </button>
      </div>

      {/* Right - Progress */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <BarChart3 size={14} className="text-muted-foreground" />
          <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <span className="text-[10px] text-muted-foreground font-mono">{progress}%</span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Trophy size={14} className="text-primary" />
          <span className="text-xs font-medium">{completedTopics.length}/12</span>
        </div>
      </div>
    </motion.header>
  );
}
