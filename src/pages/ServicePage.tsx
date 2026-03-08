import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import PageLayout from '@/components/layout/PageLayout';
import { useLearning } from '@/context/LearningContext';
import { servicesData } from '@/data/servicesData';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { BookOpen, AlertTriangle, Lightbulb, HelpCircle, Layers, CheckCircle } from 'lucide-react';

export default function ServicePage() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const { mode, markComplete } = useLearning();
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
          <span className="text-[10px] font-mono uppercase tracking-widest text-primary">{service.layer}</span>
          <h1 className="text-2xl font-bold text-foreground">{service.name}</h1>
        </motion.div>

        <div className="space-y-6">
          {/* Overview */}
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

          {/* Related Services */}
          <Section icon={<Layers size={16} />} title="Related & Alternative Services">
            <div className="flex flex-wrap gap-2">
              {service.alternatives.map(alt => {
                // Try to find the service in our data to make it clickable
                const altEntry = Object.values(servicesData).find(s => s.name === alt || s.id === alt.toLowerCase().replace(/\s+/g, '-'));
                return altEntry ? (
                  <Link
                    key={alt}
                    to={`/services/${altEntry.id}`}
                    className="text-xs px-3 py-1.5 rounded-full bg-muted text-primary border border-border hover:border-primary/40 transition-colors"
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
          <Section icon={<HelpCircle size={16} />} title="Quick Quiz">
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

function Section({ icon, title, children, variant }: { icon: React.ReactNode; title: string; children: React.ReactNode; variant?: 'warning' }) {
  return (
    <div className={`p-4 rounded-xl border ${variant === 'warning' ? 'border-yellow-500/20 bg-yellow-500/5' : 'border-border bg-card'}`}>
      <div className="flex items-center gap-2 mb-3">
        <span className={variant === 'warning' ? 'text-yellow-500' : 'text-primary'}>{icon}</span>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</h2>
      </div>
      {children}
    </div>
  );
}
