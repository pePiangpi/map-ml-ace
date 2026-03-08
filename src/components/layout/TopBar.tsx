import { Link, useLocation } from 'react-router-dom';
import { useLearning } from '@/context/LearningContext';
import { motion } from 'framer-motion';
import { Brain, Zap, BookOpen, Trophy, BarChart3, Home, Map, Search, Target, ArrowLeftRight, FileQuestion } from 'lucide-react';

export default function TopBar() {
  const { mode, setMode, progress, completedTopics } = useLearning();
  const location = useLocation();

  const navLinks = [
    { to: '/', icon: <Home size={14} />, label: 'Home' },
    { to: '/pipeline-explorer', icon: <Map size={14} />, label: 'Pipeline' },
    { to: '/services', icon: <Search size={14} />, label: 'Services' },
    { to: '/patterns', icon: <Target size={14} />, label: 'Patterns' },
    { to: '/compare', icon: <ArrowLeftRight size={14} />, label: 'Compare' },
    { to: '/exam', icon: <FileQuestion size={14} />, label: 'Exam' },
  ];

  return (
    <motion.header
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      className="h-14 border-b border-border bg-card/80 backdrop-blur-md flex items-center justify-between px-4 z-40 relative shrink-0"
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
          <Brain size={15} className="text-primary-foreground" />
        </div>
        <div className="hidden sm:block">
          <h1 className="text-xs font-bold text-foreground leading-none">AWS ML Architect</h1>
          <p className="text-[9px] text-muted-foreground">MLA-C01</p>
        </div>
      </Link>

      {/* Nav */}
      <nav className="flex items-center gap-0.5">
        {navLinks.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-[11px] font-medium transition-colors ${
              location.pathname === link.to
                ? 'text-primary bg-primary/10'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            {link.icon}
            <span className="hidden md:inline">{link.label}</span>
          </Link>
        ))}
      </nav>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Mode Toggle */}
        <div className="flex items-center bg-muted rounded-full p-0.5 border border-border">
          <button
            onClick={() => setMode('simple')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium transition-all ${
              mode === 'simple' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Zap size={10} /> Simple
          </button>
          <button
            onClick={() => setMode('exam')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium transition-all ${
              mode === 'exam' ? 'bg-secondary text-secondary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <BookOpen size={10} /> Exam
          </button>
        </div>

        {/* Progress */}
        <div className="hidden sm:flex items-center gap-2">
          <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
            <motion.div className="h-full bg-primary rounded-full" animate={{ width: `${progress}%` }} />
          </div>
          <div className="flex items-center gap-1">
            <Trophy size={12} className="text-primary" />
            <span className="text-[10px] font-mono text-muted-foreground">{completedTopics.length}/12</span>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
