import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageLayout from '@/components/layout/PageLayout';
import { useLearning } from '@/context/LearningContext';
import { comparisons } from '@/data/comparisons';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { ArrowLeftRight, Check, X, Award, AlertTriangle, ChevronDown } from 'lucide-react';

export default function ComparePage() {
  const { mode } = useLearning();
  const isExamLens = mode === 'exam';
  const [expandedId, setExpandedId] = useState<string | null>(comparisons[0]?.id || null);

  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto px-6 py-6">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Compare Services</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold text-foreground mb-1 flex items-center gap-2">
            <ArrowLeftRight size={22} className={isExamLens ? 'text-primary' : 'text-secondary'} />
            Service Comparison Engine
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            {isExamLens
              ? 'Head-to-head feature tables with exam decision logic. Look for the "Winner for Exam" badge.'
              : 'Side-by-side comparisons of commonly confused AWS services.'}
          </p>
        </motion.div>

        <div className="space-y-4">
          {comparisons.map((comp, i) => {
            const isExpanded = expandedId === comp.id;
            return (
              <motion.div
                key={comp.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`rounded-xl border overflow-hidden transition-colors ${
                  isExpanded
                    ? isExamLens ? 'border-primary/40 shadow-[0_0_20px_hsl(var(--primary)/0.08)]' : 'border-secondary/40'
                    : 'border-border'
                }`}
              >
                {/* Header */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : comp.id)}
                  className="w-full flex items-center justify-between p-4 bg-card hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-bold ${isExamLens ? 'text-primary' : 'text-secondary'}`}>{comp.serviceA}</span>
                    <span className="text-xs text-muted-foreground font-medium">vs</span>
                    <span className={`text-sm font-bold ${isExamLens ? 'text-primary' : 'text-secondary'}`}>{comp.serviceB}</span>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Table */}
                      <div className="border-t border-border">
                        {/* Table header */}
                        <div className="grid grid-cols-3 text-[10px] font-bold uppercase tracking-wider">
                          <div className="p-3 text-center text-muted-foreground bg-muted/20">Feature</div>
                          <div className={`p-3 text-center ${isExamLens ? 'text-primary bg-primary/5' : 'text-secondary bg-secondary/5'}`}>{comp.serviceA}</div>
                          <div className={`p-3 text-center ${isExamLens ? 'text-primary bg-primary/5' : 'text-secondary bg-secondary/5'}`}>{comp.serviceB}</div>
                        </div>

                        {/* Feature rows */}
                        {comp.features.map((f, j) => (
                          <div key={j} className="grid grid-cols-3 text-xs border-t border-border/50">
                            <div className="p-3 text-foreground/70 font-medium bg-muted/10">{f.name}</div>
                            <div className="p-3 flex items-center justify-center">
                              <FeatureValue value={f.a} />
                            </div>
                            <div className="p-3 flex items-center justify-center">
                              <FeatureValue value={f.b} />
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Exam tip */}
                      {isExamLens && (
                        <div className="p-4 bg-primary/5 border-t border-primary/20">
                          <div className="flex items-start gap-2">
                            <Award size={14} className="text-primary shrink-0 mt-0.5" />
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Exam Decision Logic</span>
                              <p className="text-xs text-foreground/80 mt-1">{comp.examTip}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </PageLayout>
  );
}

function FeatureValue({ value }: { value: boolean | string }) {
  if (value === true) {
    return <span className="w-6 h-6 rounded-full bg-green-500/15 flex items-center justify-center"><Check size={14} className="text-green-400" /></span>;
  }
  if (value === false) {
    return <span className="w-6 h-6 rounded-full bg-red-500/15 flex items-center justify-center"><X size={14} className="text-red-400" /></span>;
  }
  return <span className="text-foreground/70 text-center">{value}</span>;
}
