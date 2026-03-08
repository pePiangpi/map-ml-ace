import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, AlertTriangle, Lightbulb, HelpCircle, Layers } from 'lucide-react';
import { useLearning } from '@/context/LearningContext';
import { servicesData } from '@/data/servicesData';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function ServicePanel() {
  const { selectedService, setSelectedService, mode, markComplete } = useLearning();
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const service = selectedService ? servicesData[selectedService] : null;

  const handleClose = () => {
    setSelectedService(null);
    setQuizAnswer(null);
    setShowExplanation(false);
  };

  const handleQuizAnswer = (idx: number) => {
    setQuizAnswer(idx);
    setShowExplanation(true);
    if (service && idx === service.quiz.correct) {
      markComplete(service.layer);
    }
  };

  return (
    <AnimatePresence>
      {service && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed right-0 top-0 h-screen w-[420px] bg-card border-l border-border z-50 overflow-y-auto shadow-2xl"
        >
          {/* Header */}
          <div className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-border p-4 flex items-center justify-between z-10">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-primary">{service.layer}</div>
              <h2 className="text-lg font-bold text-foreground">{service.name}</h2>
            </div>
            <button onClick={handleClose} className="p-2 rounded-lg hover:bg-muted transition-colors">
              <X size={18} className="text-muted-foreground" />
            </button>
          </div>

          <div className="p-4 space-y-5">
            {/* Description */}
            <Section icon={<BookOpen size={16} />} title={mode === 'simple' ? 'Simple Explanation' : 'Exam Definition'}>
              <p className="text-sm text-foreground/80 leading-relaxed">
                {mode === 'simple' ? service.simple : service.exam}
              </p>
            </Section>

            {/* When to Use */}
            <Section icon={<Lightbulb size={16} />} title="When to Use">
              <p className="text-sm text-foreground/80 leading-relaxed">{service.whenToUse}</p>
            </Section>

            {/* Exam Trap */}
            <Section icon={<AlertTriangle size={16} />} title="⚠️ Exam Trap" variant="warning">
              <p className="text-sm text-foreground/80 leading-relaxed">{service.examTrap}</p>
            </Section>

            {/* Alternatives */}
            <Section icon={<Layers size={16} />} title="Alternative Services">
              <div className="flex flex-wrap gap-2">
                {service.alternatives.map((alt) => (
                  <span key={alt} className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border">
                    {alt}
                  </span>
                ))}
              </div>
            </Section>

            {/* Quiz */}
            <Section icon={<HelpCircle size={16} />} title="Quick Quiz">
              <p className="text-sm font-medium text-foreground mb-3">{service.quiz.question}</p>
              <div className="space-y-2">
                {service.quiz.options.map((opt, idx) => {
                  let btnClass = 'w-full text-left text-sm px-3 py-2.5 rounded-lg border transition-all ';
                  if (quizAnswer === null) {
                    btnClass += 'border-border bg-muted/30 hover:bg-muted hover:border-primary/30 text-foreground/80';
                  } else if (idx === service.quiz.correct) {
                    btnClass += 'border-green-500/50 bg-green-500/10 text-green-400';
                  } else if (idx === quizAnswer) {
                    btnClass += 'border-red-500/50 bg-red-500/10 text-red-400';
                  } else {
                    btnClass += 'border-border bg-muted/20 text-muted-foreground';
                  }
                  return (
                    <button
                      key={idx}
                      onClick={() => quizAnswer === null && handleQuizAnswer(idx)}
                      className={btnClass}
                      disabled={quizAnswer !== null}
                    >
                      {String.fromCharCode(65 + idx)}. {opt}
                    </button>
                  );
                })}
              </div>
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-3 p-3 rounded-lg bg-secondary/10 border border-secondary/20"
                >
                  <p className="text-xs text-secondary">{service.quiz.explanation}</p>
                </motion.div>
              )}
              {quizAnswer !== null && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 text-xs text-muted-foreground"
                  onClick={() => { setQuizAnswer(null); setShowExplanation(false); }}
                >
                  Try Again
                </Button>
              )}
            </Section>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Section({ icon, title, children, variant }: { icon: React.ReactNode; title: string; children: React.ReactNode; variant?: 'warning' }) {
  return (
    <div className={`p-3.5 rounded-xl border ${variant === 'warning' ? 'border-yellow-500/20 bg-yellow-500/5' : 'border-border bg-muted/20'}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className={variant === 'warning' ? 'text-yellow-500' : 'text-primary'}>{icon}</span>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</h3>
      </div>
      {children}
    </div>
  );
}
