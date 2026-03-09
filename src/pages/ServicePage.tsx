import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageLayout from '@/components/layout/PageLayout';
import { useLearning } from '@/context/LearningContext';
import { servicesData } from '@/data/servicesData';
import { getQuestionsByTag, ExamQuestion } from '@/data/examQuestions';
import { ServiceIcon, getServiceColor } from '@/components/service/ServiceIcon';
import MockConsole from '@/components/service/MockConsole';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { AlertTriangle, HelpCircle, CheckCircle, FileQuestion, ChevronRight } from 'lucide-react';

// Map service layer to console type
function getConsoleType(layer: string): 'storage' | 'training' | 'registry' | 'orchestration' {
  const layerMap: Record<string, 'storage' | 'training' | 'registry' | 'orchestration'> = {
    'Data Storage': 'storage',
    'Data Sources': 'storage',
    'Model Training': 'training',
    'Hyperparameter Tuning': 'training',
    'Model Management': 'registry',
    'Model Deployment': 'orchestration',
  };
  return layerMap[layer] || 'training';
}

export default function ServicePage() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const { mode, markComplete } = useLearning();
  const isExamLens = mode === 'exam';
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [consoleHighlight, setConsoleHighlight] = useState<string | null>(null);

  const service = serviceId ? servicesData[serviceId] : null;
  if (!service) {
    return (
      <PageLayout>
        <div className="p-10 text-center text-muted-foreground">Service not found.</div>
      </PageLayout>
    );
  }

  const layerSlug = service.layer.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const consoleType = getConsoleType(service.layer);

  const relevantQuestions = [
    ...getQuestionsByTag(serviceId || ''),
    ...getQuestionsByTag(service.layer),
  ].filter((q, i, arr) => arr.findIndex(x => x.id === q.id) === i).slice(0, 3);

  // Map question IDs to console highlight keys
  const questionHighlightMap: Record<number, string> = {
    1: 'approval-status',
    2: 'warm-pool',
    3: 'approval-status',
    4: 'pipe-mode',
    101: 'approval-status',
    51: 'warm-pool',
  };

  const handleQuizAnswer = (idx: number) => {
    setQuizAnswer(idx);
    setShowExplanation(true);
    if (idx === service.quiz.correct) {
      markComplete(service.layer);
    }
  };

  const handleQuestionSelect = (questionId: number) => {
    const key = questionHighlightMap[questionId] || null;
    setConsoleHighlight(key);
    setTimeout(() => setConsoleHighlight(null), 3000);
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

        {/* ===== HERO SECTION ===== */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="mb-8 flex items-start gap-4"
        >
          <div 
            className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
            style={{
              backgroundColor: `hsl(${getServiceColor(serviceId || '')} / 0.15)`,
              border: `1px solid hsl(${getServiceColor(serviceId || '')} / 0.3)`,
            }}
          >
            <ServiceIcon serviceId={serviceId || ''} size={28} />
          </div>
          <div>
            <span className={`text-[10px] font-mono uppercase tracking-widest ${isExamLens ? 'text-primary' : 'text-secondary'}`}>
              {service.layer}
            </span>
            <h1 className="text-2xl font-bold text-foreground">{service.name}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {isExamLens ? service.exam : service.simple}
            </p>
          </div>
        </motion.div>

        {/* ===== VISUAL BLUEPRINT ===== */}
        <ServiceBlueprint serviceName={service.name} layer={service.layer} isExamLens={isExamLens} />

        <div className="space-y-6 mt-6">
          {/* ===== INTERACTIVE MOCK CONSOLE ===== */}
          <Section title="AWS Console View" isExamLens={isExamLens}>
            <MockConsole serviceType={consoleType} serviceName={service.name} highlightElement={consoleHighlight} />
          </Section>

          {/* ===== EXAM TRAP (prominent in Exam-Lens) ===== */}
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
              <Section title="Common Mistake" isExamLens={isExamLens} variant="warning">
                <p className="text-sm text-foreground/80 leading-relaxed">{service.examTrap}</p>
              </Section>
            )}
          </AnimatePresence>

          {/* ===== HOW IT'S TESTED (from examQuestions.ts) ===== */}
          {relevantQuestions.length > 0 && (
            <Section title={`How It's Tested (${relevantQuestions.length} Questions)`} isExamLens={isExamLens}>
              <div className="space-y-3">
                {relevantQuestions.map(q => (
                  <ExamQuestionCard key={q.id} question={q} isExamLens={isExamLens} />
                ))}
              </div>
            </Section>
          )}

          {/* ===== QUICK QUIZ ===== */}
          <Section title="Quick Quiz" isExamLens={isExamLens}>
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

/* ===== VISUAL BLUEPRINT COMPONENT ===== */
function ServiceBlueprint({ serviceName, layer, isExamLens }: { serviceName: string; layer: string; isExamLens: boolean }) {
  const stagesBefore: Record<string, string> = {
    'Data Storage': 'Data Sources',
    'Data Ingestion': 'Data Storage',
    'Data Processing': 'Data Ingestion',
    'Feature Engineering': 'Data Processing',
    'Feature Store': 'Feature Engineering',
    'Model Training': 'Feature Store',
    'Hyperparameter Tuning': 'Model Training',
    'Model Evaluation': 'Hyperparameter Tuning',
    'Model Management': 'Model Evaluation',
    'Model Deployment': 'Model Management',
    'Monitoring': 'Model Deployment',
  };
  
  const stagesAfter: Record<string, string> = {
    'Data Sources': 'Data Storage',
    'Data Storage': 'Data Ingestion',
    'Data Ingestion': 'Data Processing',
    'Data Processing': 'Feature Engineering',
    'Feature Engineering': 'Feature Store',
    'Feature Store': 'Model Training',
    'Model Training': 'Hyperparameter Tuning',
    'Hyperparameter Tuning': 'Model Evaluation',
    'Model Evaluation': 'Model Management',
    'Model Management': 'Model Deployment',
    'Model Deployment': 'Monitoring',
  };

  const before = stagesBefore[layer] || 'Input';
  const after = stagesAfter[layer] || 'Output';

  return (
    <div className={`flex items-center justify-center gap-2 py-4 px-4 rounded-xl border ${
      isExamLens ? 'border-primary/20 bg-primary/5' : 'border-border bg-muted/20'
    }`}>
      <span className="text-xs text-muted-foreground">{before}</span>
      <ChevronRight size={14} className="text-muted-foreground" />
      <span className={`text-sm font-bold px-3 py-1.5 rounded-lg ${
        isExamLens ? 'bg-primary/20 text-primary' : 'bg-secondary/20 text-secondary'
      }`}>
        {serviceName}
      </span>
      <ChevronRight size={14} className="text-muted-foreground" />
      <span className="text-xs text-muted-foreground">{after}</span>
    </div>
  );
}

/* ===== EXAM QUESTION CARD ===== */
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

/* ===== SECTION WRAPPER ===== */
function Section({ title, children, isExamLens, variant }: {
  title: string; children: React.ReactNode; isExamLens: boolean; variant?: 'warning';
}) {
  return (
    <div className={`p-4 rounded-xl border ${
      variant === 'warning' ? 'border-yellow-500/20 bg-yellow-500/5' : 'border-border bg-card'
    }`}>
      <h2 className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
        variant === 'warning' ? 'text-yellow-500' : 'text-muted-foreground'
      }`}>
        {title}
      </h2>
      {children}
    </div>
  );
}
