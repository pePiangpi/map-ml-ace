import { Link, useLocation } from 'react-router-dom';
import { useLearning } from '@/context/LearningContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, BookOpen, Trophy, Home, Map, Search, Target, ArrowLeftRight, FileQuestion, Eye, EyeOff, Layers, Monitor, Network } from 'lucide-react';

export default function TopBar() {
  const { mode, setMode, progress, completedTopics } = useLearning();
  const location = useLocation();
  const isExamLens = mode === 'exam';

  const navLinks = [
    { to: '/', icon: <Home size={14} />, label: 'Home' },
    { to: '/pipeline-explorer', icon: <Map size={14} />, label: 'Pipeline' },
    { to: '/services', icon: <Search size={14} />, label: 'Services' },
    { to: '/patterns', icon: <Target size={14} />, label: 'Patterns' },
    { to: '/compare', icon: <ArrowLeftRight size={14} />, label: 'Compare' },
    { to: '/visualizer', icon: <Monitor size={14} />, label: 'Inference' },
    { to: '/exam', icon: <FileQuestion size={14} />, label: 'Exam' },
  ];

  return (
    <motion.header
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      className={`h-14 border-b flex items-center justify-between px-4 z-40 relative shrink-0 transition-all duration-500 ${
        isExamLens
          ? 'bg-card/70 border-primary/40 shadow-[0_4px_30px_hsl(var(--primary)/0.1)]'
          : 'bg-card/70 border-border/50'
      }`}
      style={{
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      }}
    >
      {/* Exam lens glow bar */}
      <AnimatePresence>
        {isExamLens && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent"
          />
        )}
      </AnimatePresence>

      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${isExamLens ? 'bg-primary' : 'bg-secondary'}`}>
          <Brain size={15} className={isExamLens ? 'text-primary-foreground' : 'text-secondary-foreground'} />
        </div>
        <div className="hidden sm:block">
          <h1 className="text-xs font-bold text-foreground leading-none">AWS ML Academy</h1>
          <p className="text-[9px] text-muted-foreground">MLA-C01 Visual Masterclass</p>
        </div>
      </Link>

      {/* Nav */}
      <nav className="flex items-center gap-0.5">
        {navLinks.map(link => {
          const isActive = location.pathname === link.to || (link.to !== '/' && location.pathname.startsWith(link.to));
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-1 px-2 py-1.5 rounded-md text-[11px] font-medium transition-colors ${
                isActive
                  ? isExamLens ? 'text-primary bg-primary/10' : 'text-secondary bg-secondary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              {link.icon}
              <span className="hidden lg:inline">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Exam-Lens Toggle */}
        <button
          onClick={() => setMode(isExamLens ? 'simple' : 'exam')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 border ${
            isExamLens
              ? 'bg-primary/15 text-primary border-primary/40 shadow-[0_0_12px_hsl(var(--primary)/0.3)]'
              : 'bg-muted text-muted-foreground border-border hover:text-foreground'
          }`}
        >
          {isExamLens ? <Eye size={12} /> : <EyeOff size={12} />}
          Exam-Lens {isExamLens ? 'ON' : 'OFF'}
        </button>

        {/* Progress */}
        <div className="hidden sm:flex items-center gap-2">
          <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${isExamLens ? 'bg-primary' : 'bg-secondary'}`}
              animate={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center gap-1">
            <Trophy size={12} className={isExamLens ? 'text-primary' : 'text-secondary'} />
            <span className="text-[10px] font-mono text-muted-foreground">{completedTopics.length}/12</span>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
