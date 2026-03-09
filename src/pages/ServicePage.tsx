import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageLayout from '@/components/layout/PageLayout';
import { useLearning } from '@/context/LearningContext';
import { servicesData } from '@/data/servicesData';
import { getQuestionsByTag, ExamQuestion } from '@/data/examQuestions';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { BookOpen, AlertTriangle, Lightbulb, HelpCircle, Layers, CheckCircle, Monitor, FileQuestion } from 'lucide-react';

export default function ServicePage() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const { mode, markComplete } = useLearning();
  const isExamLens = mode === 'exam';
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const service = serviceId ? servicesData[serviceId] : null;
  if (!service) {
    return (
      <PageLayout>
        <div className="p-10 text-center text-muted-foreground">Service not found.</div>
      </PageLayout>
    );
  }

  const layerSlug = service.layer.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  // Get relevant exam questions (by service id and layer tag)
  const relevantQuestions = [
    ...getQuestionsByTag(serviceId || ''),
    ...getQuestionsByTag(service.layer),
  ].filter((q, i, arr) => arr.findIndex(x => x.id === q.id) === i).slice(0, 3);

  const handleQuizAnswer = (idx: number) => {
    setQuizAnswer(idx);
    setShowExplanation(true);
    if (idx === service.quiz.correct) {
      markComplete(service.layer);
    }
  };

  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto px-6 py-6">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild><Link to={`/layers/${layerSlug}`}>{service.layer}</Link></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{service.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <span className={`text-[10px] font-mono uppercase tracking-widest ${isExamLens ? 'text-primary' : 'text-secondary'}`}>{service.layer}</span>
          <h1 className="text-2xl font-bold text-foreground">{service.name}</h1>
        </motion.div>

        <div className="space-y-6">
          {/* Overview */}
          <Section icon={<BookOpen size={16} />} title={isExamLens ? 'How This Is Tested' : 'How This Works'} isExamLens={isExamLens}>
            <p className="text-sm text-foreground/80 leading-relaxed">
              {isExamLens ? service.exam : service.simple}
            </p>
          </Section>

          {/* When to Use */}
          <Section icon={<Lightbulb size={16} />} title="When to Use" isExamLens={isExamLens}>
            <p className="text-sm text-foreground/80 leading-relaxed">{service.whenToUse}</p>
          </Section>

          {/* Console Screenshot Placeholder */}
          <Section icon={<Monitor size={16} />} title="AWS Console View" isExamLens={isExamLens}>
            <div className="rounded-lg border border-border bg-muted/30 p-8 text-center">
              <Monitor size={32} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">AWS Console Screenshot — {service.name}</p>
              <p className="text-[10px] text-muted-foreground mt-1">Visual reference for the actual AWS interface</p>
            </div>
          </Section>

          {/* Exam Trap - Only prominent when Exam-Lens is ON */}
          <AnimatePresence>
            {isExamLens ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
              >
                <div className="p-4 rounded-xl border-2 border-destructive/40 bg-destructive/5 shadow-[0_0_20px_hsl(var(--destructive)/0.1)]">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle size={16} className="text-destructive" />
                    <h2 className="text-xs font-bold uppercase tracking-wider text-destructive">⚠️ Exam Trap — Don't Fall For This!</h2>
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed">{service.examTrap}</p>
                </div>
              </motion.div>
            ) : (
              <Section icon={<AlertTriangle size={16} />} title="Common Mistake" isExamLens={isExamLens} variant="warning">
                <p className="text-sm text-foreground/80 leading-relaxed">{service.examTrap}</p>
              </Section>
            )}
          </AnimatePresence>

          {/* Related Services */}
          <Section icon={<Layers size={16} />} title="Related & Alternative Services" isExamLens={isExamLens}>
            <div className="flex flex-wrap gap-2">
              {service.alternatives.map(alt => {
                const altEntry = Object.values(servicesData).find(s => s.name === alt || s.id === alt.toLowerCase().replace(/\s+/g, '-'));
                return altEntry ? (
                  <Link
                    key={alt}
                    to={`/services/${altEntry.id}`}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                      isExamLens
                        ? 'bg-primary/5 text-primary border-primary/30 hover:border-primary/60'
                        : 'bg-muted text-secondary border-border hover:border-secondary/40'
                    }`}
                  >
                    {alt}
                  </Link>
                ) : (
                  <span key={alt} className="text-xs px-3 py-1.5 rounded-full bg-muted text-muted-foreground border border-border">
                    {alt}
                  </span>
                );
              })}
            </div>
          </Section>

          {/* Mini Quiz */}
          <Section icon={<HelpCircle size={16} />} title="Quick Quiz" isExamLens={isExamLens}>
            <p className="text-sm font-medium text-foreground mb-3">{service.quiz.question}</p>
            <div className="space-y-2">
              {service.quiz.options.map((opt, idx) => {
                let btnClass = 'w-full text-left text-sm px-4 py-3 rounded-lg border transition-all ';
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
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-3 p-3 rounded-lg bg-secondary/10 border border-secondary/20">
                <div className="flex items-start gap-2">
                  <CheckCircle size={14} className="text-secondary mt-0.5 shrink-0" />
                  <p className="text-xs text-secondary">{service.quiz.explanation}</p>
                </div>
              </motion.div>
            )}
            {quizAnswer !== null && (
              <button
                className="mt-3 text-xs text-muted-foreground hover:text-foreground"
                onClick={() => { setQuizAnswer(null); setShowExplanation(false); }}
              >
                Try Again →
              </button>
            )}
          </Section>

          {/* Relevant Exam Questions from Official Decks */}
          {relevantQuestions.length > 0 && (
            <Section icon={<FileQuestion size={16} />} title={`Official Exam Questions (${relevantQuestions.length})`} isExamLens={isExamLens}>
              <div className="space-y-3">
                {relevantQuestions.map(q => (
                  <ExamQuestionCard key={q.id} question={q} isExamLens={isExamLens} />
                ))}
              </div>
            </Section>
          )}
        </div>

        {/* Back link */}
        <div className="mt-8 pt-6 border-t border-border">
          <Link to={`/layers/${layerSlug}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Back to {service.layer}
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}

function ExamQuestionCard({ question, isExamLens }: { question: ExamQuestion; isExamLens: boolean }) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="p-3 rounded-lg border border-border bg-muted/20">
      <div className="flex items-center gap-2 mb-2">
        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
          question.difficulty === 'hard' ? 'bg-destructive/10 text-destructive' :
          question.difficulty === 'medium' ? 'bg-primary/10 text-primary' :
          'bg-green-500/10 text-green-400'
        }`}>
          Q#{question.id} • {question.difficulty}
        </span>
        <span className="text-[9px] text-muted-foreground">{question.source}</span>
      </div>
      <p className="text-xs text-foreground/80 mb-2">{question.question}</p>
      <div className="space-y-1">
        {question.options.map((opt, i) => {
          let cls = 'text-[11px] px-3 py-1.5 rounded border transition-all w-full text-left ';
          if (selected === null) {
            cls += 'border-border/50 hover:border-primary/30 text-foreground/60 hover:text-foreground/80 bg-card';
          } else if (i === question.correct) {
            cls += 'border-green-500/40 bg-green-500/10 text-green-400';
          } else if (i === selected) {
            cls += 'border-red-500/40 bg-red-500/10 text-red-400';
          } else {
            cls += 'border-border/30 text-muted-foreground bg-card';
          }
          return (
            <button key={i} onClick={() => selected === null && setSelected(i)} className={cls} disabled={selected !== null}>
              {String.fromCharCode(65 + i)}. {opt}
            </button>
          );
        })}
      </div>
      {selected !== null && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] text-secondary mt-2 p-2 rounded bg-secondary/10 border border-secondary/20">
          {question.explanation}
        </motion.p>
      )}
    </div>
  );
}

function Section({ icon, title, children, isExamLens, variant }: {
  icon: React.ReactNode; title: string; children: React.ReactNode; isExamLens: boolean; variant?: 'warning';
}) {
  return (
    <div className={`p-4 rounded-xl border ${
      variant === 'warning' ? 'border-yellow-500/20 bg-yellow-500/5' : 'border-border bg-card'
    }`}>
      <div className="flex items-center gap-2 mb-3">
        <span className={variant === 'warning' ? 'text-yellow-500' : isExamLens ? 'text-primary' : 'text-secondary'}>{icon}</span>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</h2>
      </div>
      {children}
    </div>
  );
}
