import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageLayout from '@/components/layout/PageLayout';
import { useLearning } from '@/context/LearningContext';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Radio, Clock, Zap, Timer, ArrowRight, AlertTriangle } from 'lucide-react';
import RequirementSlider from '@/components/inference/RequirementSlider';

const inferenceTypes = [
  {
    id: 'realtime',
    name: 'Real-Time Inference',
    icon: Radio,
    color: 'hsl(var(--aws-blue))',
    tagline: 'Always On • Instant Response',
    simple: 'Like a cashier who\'s always at the counter — you ask, you get an answer immediately. But you pay even when nobody\'s in line.',
    exam: 'Persistent endpoint with auto-scaling. Sub-second latency. Max 6 MB payload. Ideal for constant, predictable traffic patterns.',
    specs: [
      { label: 'Latency', value: 'Milliseconds' },
      { label: 'Max Payload', value: '6 MB' },
      { label: 'Scales to Zero', value: 'No' },
      { label: 'Cost When Idle', value: 'Yes — always running' },
    ],
    examPattern: 'Constant traffic, low latency APIs, chatbots, fraud detection per-transaction',
    questions: 'Q#51, Q#52',
    trap: 'Real-time does NOT scale to zero. If traffic is inconsistent, consider Serverless.',
  },
  {
    id: 'async',
    name: 'Asynchronous Inference',
    icon: Timer,
    color: 'hsl(var(--node-ingestion))',
    tagline: 'Queue-Based • Large Payloads',
    simple: 'Like a bakery where you place your order and come back later to pick it up. Great for big, complex orders that take time.',
    exam: 'Queue-based inference for payloads up to 1 GB with processing times up to 60 minutes. Sends SNS notifications on completion. Scales to zero.',
    specs: [
      { label: 'Latency', value: 'Seconds to 60 min' },
      { label: 'Max Payload', value: '1 GB' },
      { label: 'Scales to Zero', value: 'Yes' },
      { label: 'Notification', value: 'SNS on completion' },
    ],
    examPattern: 'Payloads 100-300 MB, long processing time, document/video analysis',
    questions: 'Q#103',
    trap: 'Async is NOT for real-time use cases. If you need instant responses, use Real-Time.',
  },
  {
    id: 'serverless',
    name: 'Serverless Inference',
    icon: Zap,
    color: 'hsl(var(--node-evaluation))',
    tagline: 'Zero to Hero • Pay Per Request',
    simple: 'Like a pop-up shop that appears only when customers show up and disappears when they leave. You only pay when someone\'s actually buying.',
    exam: 'Auto-scales to zero with cold starts. Max 6 MB payload. Ideal for intermittent or unpredictable traffic. Pay per inference request.',
    specs: [
      { label: 'Latency', value: 'ms + cold start' },
      { label: 'Max Payload', value: '6 MB' },
      { label: 'Scales to Zero', value: 'Yes' },
      { label: 'Cost When Idle', value: 'No — $0' },
    ],
    examPattern: 'Inconsistent traffic, nightly runs, cost optimization, scales to zero',
    questions: 'Q#52, Q#57',
    trap: 'Cold starts add latency. Not suitable for latency-sensitive applications.',
  },
  {
    id: 'batch',
    name: 'Batch Transform',
    icon: Clock,
    color: 'hsl(var(--node-management))',
    tagline: 'Offline • Massive Scale',
    simple: 'Like grading a stack of 1000 exams overnight — you don\'t need an answer right now, but you need ALL of them done by morning.',
    exam: 'Non-real-time, job-based inference on large datasets in S3. No persistent endpoint. Results stored in S3. Ideal for millions of records.',
    specs: [
      { label: 'Latency', value: 'Minutes to hours' },
      { label: 'Max Payload', value: 'Unlimited (S3)' },
      { label: 'Persistent Endpoint', value: 'No — job-based' },
      { label: 'Output', value: 'S3 files' },
    ],
    examPattern: 'Millions of records overnight, large dataset scoring, no real-time requirement',
    questions: 'Q#200',
    trap: 'Batch is NOT for real-time. If the question mentions "immediate" or "per-request," this is wrong.',
  },
];

export default function InferenceVisualizer() {
  const { mode } = useLearning();
  const isExamLens = mode === 'exam';

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
              <BreadcrumbPage>Inference Visualizer</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold text-foreground mb-1">Inference Type Visualizer</h1>
          <p className="text-sm text-muted-foreground mb-8">
            {isExamLens
              ? 'Decision framework: Match the scenario to the correct deployment type. Tested in Q#51, Q#52, Q#57, Q#103, Q#200.'
              : 'Four ways to deploy your ML model — each designed for a different use case.'}
          </p>
        </motion.div>

        {/* Decision Flow */}
        {isExamLens && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 p-4 rounded-xl border border-primary/30 bg-primary/5"
          >
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-3">⚡ Exam Decision Tree</h3>
            <div className="flex flex-wrap items-center gap-2 text-xs text-foreground/80">
              <span className="px-2 py-1 bg-card rounded border border-border">Constant traffic?</span>
              <ArrowRight size={12} className="text-primary" />
              <span className="px-2 py-1 bg-secondary/10 rounded border border-secondary/30 text-secondary font-semibold">Real-Time</span>
              <span className="text-muted-foreground mx-1">|</span>
              <span className="px-2 py-1 bg-card rounded border border-border">Variable/intermittent?</span>
              <ArrowRight size={12} className="text-primary" />
              <span className="px-2 py-1 bg-green-500/10 rounded border border-green-500/30 text-green-400 font-semibold">Serverless</span>
              <span className="text-muted-foreground mx-1">|</span>
              <span className="px-2 py-1 bg-card rounded border border-border">Payload &gt;6MB?</span>
              <ArrowRight size={12} className="text-primary" />
              <span className="px-2 py-1 bg-primary/10 rounded border border-primary/30 text-primary font-semibold">Async</span>
              <span className="text-muted-foreground mx-1">|</span>
              <span className="px-2 py-1 bg-card rounded border border-border">Millions offline?</span>
              <ArrowRight size={12} className="text-primary" />
              <span className="px-2 py-1 bg-purple-500/10 rounded border border-purple-500/30 text-purple-400 font-semibold">Batch</span>
            </div>
          </motion.div>
        )}

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {inferenceTypes.map((type, i) => {
            const Icon = type.icon;
            return (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-border bg-card overflow-hidden group hover:border-primary/30 transition-all"
              >
                {/* Header */}
                <div className="p-5 pb-3">
                  <div className="flex items-start gap-3 mb-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${type.color}15`, color: type.color, border: `1px solid ${type.color}30` }}
                    >
                      <Icon size={22} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-foreground">{type.name}</h3>
                      <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{type.tagline}</p>
                    </div>
                  </div>

                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {isExamLens ? type.exam : type.simple}
                  </p>
                </div>

                {/* Specs */}
                <div className="px-5 pb-3">
                  <div className="grid grid-cols-2 gap-2">
                    {type.specs.map((spec) => (
                      <div key={spec.label} className="p-2 rounded-lg bg-muted/30 border border-border/50">
                        <div className="text-[9px] uppercase tracking-wider text-muted-foreground">{spec.label}</div>
                        <div className="text-xs font-semibold text-foreground">{spec.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Exam info */}
                {isExamLens && (
                  <div className="mx-5 mb-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1">Exam Pattern ({type.questions})</div>
                    <p className="text-xs text-foreground/70">{type.examPattern}</p>
                  </div>
                )}

                {/* Trap */}
                {isExamLens && (
                  <div className="mx-5 mb-5 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                    <div className="flex items-center gap-1.5 mb-1">
                      <AlertTriangle size={10} className="text-destructive" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-destructive">Exam Trap</span>
                    </div>
                    <p className="text-xs text-foreground/70">{type.trap}</p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
        {/* Trade-off Slider */}
        <div className="mt-8">
          <RequirementSlider />
        </div>
      </div>
    </PageLayout>
  );
}
