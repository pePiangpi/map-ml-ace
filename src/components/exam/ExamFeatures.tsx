import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { examPatterns, serviceComparisons } from '@/data/servicesData';
import { useLearning } from '@/context/LearningContext';
import { Target, ArrowLeftRight, Clock, CheckCircle, XCircle, ChevronRight } from 'lucide-react';

const mockQuestions = [
  { q: 'A company needs to process millions of customer records overnight to generate product recommendations. Which SageMaker feature should they use?',
    opts: ['Real-Time Endpoints', 'Batch Transform', 'Serverless Inference', 'Multi-Model Endpoints'], correct: 1,
    explanation: 'Batch Transform is designed for large-scale offline predictions on datasets stored in S3.' },
  { q: 'An ML team needs to deploy 500 per-customer fraud detection models cost-effectively. What deployment strategy should they use?',
    opts: ['500 separate endpoints', 'Multi-Model Endpoint', 'Batch Transform', 'Lambda functions'], correct: 1,
    explanation: 'Multi-Model Endpoints host multiple models on shared infrastructure, ideal for many similar models.' },
  { q: 'A data engineer needs to create a serverless ETL pipeline to transform raw data in S3 for ML training. Which service should they use?',
    opts: ['Amazon EMR', 'AWS Glue', 'Amazon Athena', 'AWS Lambda'], correct: 1,
    explanation: 'AWS Glue provides serverless ETL with no cluster management required.' },
  { q: 'A deployed model\'s prediction accuracy is degrading over time. The data distribution has changed. Which service detects this?',
    opts: ['CloudWatch', 'SageMaker Model Monitor', 'AWS Config', 'GuardDuty'], correct: 1,
    explanation: 'SageMaker Model Monitor specifically detects data drift, model quality degradation, and bias drift.' },
  { q: 'Which SageMaker hyperparameter tuning strategy is used by default?',
    opts: ['Grid Search', 'Random Search', 'Bayesian Optimization', 'Manual Tuning'], correct: 2,
    explanation: 'SageMaker uses Bayesian optimization by default, which is more efficient than grid or random search.' },
  { q: 'A team needs real-time feature lookups during model inference with sub-millisecond latency. What should they use?',
    opts: ['Feature Store Online Store', 'Feature Store Offline Store', 'S3 Select', 'Athena'], correct: 0,
    explanation: 'The Feature Store Online Store is backed by DynamoDB for low-latency real-time feature serving.' },
  { q: 'Which algorithm does NOT require feature scaling before training?',
    opts: ['K-Nearest Neighbors', 'Neural Networks', 'XGBoost', 'Support Vector Machines'], correct: 2,
    explanation: 'Tree-based algorithms like XGBoost use threshold splits and are invariant to feature scaling.' },
  { q: 'A company needs to stream clickstream data and deliver it directly to S3 with minimal management. Which service?',
    opts: ['Kinesis Data Streams', 'Kinesis Data Firehose', 'Amazon MSK', 'Apache Flink'], correct: 1,
    explanation: 'Kinesis Data Firehose provides fully managed, near real-time delivery to S3, Redshift, and other destinations.' },
  { q: 'What indicates that a model is overfitting?',
    opts: ['High training error, high validation error', 'Low training error, low validation error', 'Low training error, high validation error', 'High training error, low validation error'], correct: 2,
    explanation: 'Overfitting: the model memorizes training data (low training error) but can\'t generalize (high validation error).' },
  { q: 'For ML inference with payloads up to 1GB and tolerance for seconds of latency, which endpoint type is best?',
    opts: ['Real-Time Endpoint', 'Serverless Inference', 'Asynchronous Inference', 'Batch Transform'], correct: 2,
    explanation: 'Async Inference supports payloads up to 1GB and scales to zero, ideal for large payloads with latency tolerance.' },
];

export function ExamPatterns() {
  const { mode } = useLearning();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold text-foreground mb-1 flex items-center gap-2">
        <Target size={20} className="text-primary" /> Exam Pattern Detector
      </h2>
      <p className="text-sm text-muted-foreground mb-5">
        {mode === 'simple' ? 'Learn to spot keywords in exam questions that tell you the answer!' : 'Common MLA-C01 scenario patterns mapped to AWS service solutions.'}
      </p>
      <div className="grid gap-3">
        {examPatterns.map((ep, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.03 }}
            className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:border-primary/30 transition-colors"
          >
            <ChevronRight size={14} className="text-primary shrink-0" />
            <span className="text-sm text-muted-foreground flex-1">"{ep.pattern}"</span>
            <span className="text-sm font-semibold text-primary whitespace-nowrap">→ {ep.answer}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function ServiceCompare() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold text-foreground mb-1 flex items-center gap-2">
        <ArrowLeftRight size={20} className="text-secondary" /> Service Comparison
      </h2>
      <p className="text-sm text-muted-foreground mb-5">Side-by-side comparisons of commonly confused services.</p>
      <div className="space-y-6">
        {serviceComparisons.map((comp, i) => (
          <div key={i} className="border border-border rounded-xl overflow-hidden">
            <div className="bg-muted/30 p-3 flex items-center justify-center gap-3">
              <span className="text-sm font-bold text-primary">{comp.services[0]}</span>
              <span className="text-xs text-muted-foreground">vs</span>
              <span className="text-sm font-bold text-secondary">{comp.services[1]}</span>
            </div>
            <div className="divide-y divide-border">
              {comp.criteria.map((c, j) => (
                <div key={j} className="grid grid-cols-3 text-xs">
                  <div className="p-2.5 bg-primary/5 text-foreground/80">{c.a}</div>
                  <div className="p-2.5 text-center font-medium text-muted-foreground bg-muted/20">{c.aspect}</div>
                  <div className="p-2.5 bg-secondary/5 text-foreground/80 text-right">{c.b}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MockExam() {
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(mockQuestions.length).fill(null));
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60);

  // Simple timer
  useState(() => {
    if (!started) return;
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 0) { setShowResults(true); clearInterval(timer); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  });

  if (!started) {
    return (
      <div className="p-6 max-w-2xl mx-auto text-center">
        <Clock size={48} className="text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-2">Mock Exam</h2>
        <p className="text-muted-foreground mb-6">{mockQuestions.length} scenario questions • 30 minute timer</p>
        <button onClick={() => setStarted(true)} className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors">
          Start Exam
        </button>
      </div>
    );
  }

  if (showResults) {
    const score = answers.filter((a, i) => a === mockQuestions[i].correct).length;
    const pct = Math.round((score / mockQuestions.length) * 100);
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className={`text-5xl font-bold mb-2 ${pct >= 70 ? 'text-green-400' : 'text-red-400'}`}>{pct}%</div>
          <p className="text-muted-foreground">{score}/{mockQuestions.length} correct • {pct >= 70 ? 'PASS ✅' : 'NEEDS REVIEW ❌'}</p>
        </div>
        <div className="space-y-3">
          {mockQuestions.map((q, i) => (
            <div key={i} className="p-3 rounded-lg border border-border bg-card">
              <div className="flex items-start gap-2">
                {answers[i] === q.correct ? <CheckCircle size={16} className="text-green-400 mt-0.5 shrink-0" /> : <XCircle size={16} className="text-red-400 mt-0.5 shrink-0" />}
                <div>
                  <p className="text-xs text-foreground/80 mb-1">{q.q}</p>
                  <p className="text-[10px] text-secondary">{q.explanation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => { setStarted(false); setAnswers(Array(mockQuestions.length).fill(null)); setShowResults(false); setCurrentQ(0); setTimeLeft(30*60); }}
          className="mt-4 px-4 py-2 bg-muted text-foreground rounded-lg text-sm hover:bg-muted/80">
          Retake Exam
        </button>
      </div>
    );
  }

  const q = mockQuestions[currentQ];
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <span className="text-xs text-muted-foreground">Question {currentQ + 1}/{mockQuestions.length}</span>
        <span className="text-xs font-mono text-primary">{mins}:{secs.toString().padStart(2, '0')}</span>
      </div>
      <div className="w-full h-1 bg-muted rounded-full mb-6">
        <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${((currentQ + 1) / mockQuestions.length) * 100}%` }} />
      </div>
      <p className="text-sm text-foreground mb-5">{q.q}</p>
      <div className="space-y-2 mb-6">
        {q.opts.map((opt, i) => (
          <button
            key={i}
            onClick={() => { const newAns = [...answers]; newAns[currentQ] = i; setAnswers(newAns); }}
            className={`w-full text-left text-sm px-4 py-3 rounded-lg border transition-all ${
              answers[currentQ] === i ? 'border-primary bg-primary/10 text-foreground' : 'border-border bg-card text-foreground/70 hover:border-primary/30'
            }`}
          >
            {String.fromCharCode(65 + i)}. {opt}
          </button>
        ))}
      </div>
      <div className="flex justify-between">
        <button disabled={currentQ === 0} onClick={() => setCurrentQ(c => c - 1)}
          className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground disabled:opacity-30">← Previous</button>
        {currentQ < mockQuestions.length - 1 ? (
          <button onClick={() => setCurrentQ(c => c + 1)}
            className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">Next →</button>
        ) : (
          <button onClick={() => setShowResults(true)}
            className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">Submit Exam</button>
        )}
      </div>
    </div>
  );
}
