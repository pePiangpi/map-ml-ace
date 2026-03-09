import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Folder, FileText, CheckCircle, XCircle, Clock, Play, 
  Pause, RefreshCw, ChevronRight, MoreHorizontal, Search
} from 'lucide-react';
import { useLearning } from '@/context/LearningContext';

type ConsoleType = 'storage' | 'training' | 'registry' | 'orchestration';

interface MockConsoleProps {
  serviceType: ConsoleType;
  serviceName: string;
  highlightElement?: string | null;
}

const pulseClass = 'animate-[pulse_1s_ease-in-out_3] ring-2 ring-primary/60 ring-offset-1 ring-offset-card';

export default function MockConsole({ serviceType, serviceName, highlightElement }: MockConsoleProps) {
  const { mode } = useLearning();
  const isExamLens = mode === 'exam';

  return (
    <div className={`rounded-xl border overflow-hidden transition-colors ${
      isExamLens 
        ? 'border-primary/30 bg-card shadow-[0_0_20px_hsl(var(--primary)/0.05)]' 
        : 'border-border bg-card'
    }`}>
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-muted/30">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-destructive/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <span className="text-xs font-mono text-muted-foreground ml-2">
          AWS Console — {serviceName}
        </span>
      </div>
      <div className="p-4">
        {serviceType === 'storage' && <StorageView isExamLens={isExamLens} highlight={highlightElement} />}
        {serviceType === 'training' && <TrainingView isExamLens={isExamLens} highlight={highlightElement} />}
        {serviceType === 'registry' && <RegistryView isExamLens={isExamLens} highlight={highlightElement} />}
        {serviceType === 'orchestration' && <OrchestrationView isExamLens={isExamLens} highlight={highlightElement} />}
      </div>
    </div>
  );
}

function StorageView({ isExamLens, highlight }: { isExamLens: boolean; highlight?: string | null }) {
  const files = [
    { name: 'training-data/', type: 'folder', size: '—', key: 'training-data' },
    { name: 'model-artifacts/', type: 'folder', size: '—', key: 'model-artifacts' },
    { name: 'raw-dataset.csv', type: 'file', size: '2.4 GB', key: 'raw-dataset' },
    { name: 'features.parquet', type: 'file', size: '890 MB', key: 'features' },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 border border-border">
        <Search size={14} className="text-muted-foreground" />
        <span className="text-xs text-muted-foreground">Filter objects...</span>
      </div>
      <div className="rounded-lg border border-border overflow-hidden">
        <div className="grid grid-cols-3 gap-4 px-3 py-2 bg-muted/30 border-b border-border text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
          <span>Name</span><span>Type</span><span>Size</span>
        </div>
        {files.map((file, i) => (
          <div 
            key={i}
            className={`grid grid-cols-3 gap-4 px-3 py-2.5 border-b border-border last:border-0 hover:bg-muted/20 cursor-pointer transition-all rounded ${
              highlight === file.key ? pulseClass : ''
            }`}
          >
            <div className="flex items-center gap-2">
              {file.type === 'folder' ? <Folder size={14} className="text-primary" /> : <FileText size={14} className="text-muted-foreground" />}
              <span className="text-xs text-foreground">{file.name}</span>
            </div>
            <span className="text-xs text-muted-foreground">{file.type}</span>
            <span className="text-xs text-muted-foreground">{file.size}</span>
          </div>
        ))}
      </div>
      {isExamLens && (
        <ExamHighlight pulse={highlight === 'pipe-mode'}>
          Exam Tip: S3 is the default storage for SageMaker. Use <strong>Pipe mode</strong> for large datasets to stream directly without downloading.
        </ExamHighlight>
      )}
    </div>
  );
}

function TrainingView({ isExamLens, highlight }: { isExamLens: boolean; highlight?: string | null }) {
  const [warmPoolEnabled] = useState(true);
  const jobs = [
    { name: 'xgboost-training-001', status: 'Completed', duration: '23 min', instance: 'ml.m5.xlarge' },
    { name: 'xgboost-training-002', status: 'InProgress', duration: '8 min', instance: 'ml.m5.xlarge' },
    { name: 'xgboost-training-003', status: 'Pending', duration: '—', instance: 'ml.m5.xlarge' },
  ];

  const statusIcon = (status: string) => {
    if (status === 'Completed') return <CheckCircle size={12} className="text-green-400" />;
    if (status === 'InProgress') return <RefreshCw size={12} className="text-primary animate-spin" />;
    return <Clock size={12} className="text-muted-foreground" />;
  };

  return (
    <div className="space-y-3">
      <div className={`flex items-center justify-between px-3 py-2.5 rounded-lg border transition-all ${
        highlight === 'warm-pool' ? pulseClass : ''
      } ${
        isExamLens && warmPoolEnabled ? 'border-primary/40 bg-primary/5' : 'border-border bg-muted/30'
      }`}>
        <div className="flex items-center gap-2">
          <Play size={14} className={warmPoolEnabled ? 'text-green-400' : 'text-muted-foreground'} />
          <span className="text-xs font-medium text-foreground">Warm Pool</span>
        </div>
        <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${warmPoolEnabled ? 'bg-green-500/10 text-green-400' : 'bg-muted text-muted-foreground'}`}>
          {warmPoolEnabled ? 'ACTIVE' : 'DISABLED'}
        </span>
      </div>
      <div className="rounded-lg border border-border overflow-hidden">
        <div className="grid grid-cols-4 gap-2 px-3 py-2 bg-muted/30 border-b border-border text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
          <span>Job Name</span><span>Status</span><span>Duration</span><span>Instance</span>
        </div>
        {jobs.map((job, i) => (
          <div key={i} className="grid grid-cols-4 gap-2 px-3 py-2.5 border-b border-border last:border-0 hover:bg-muted/20 cursor-pointer transition-colors">
            <span className="text-xs text-foreground font-mono truncate">{job.name}</span>
            <div className="flex items-center gap-1.5">{statusIcon(job.status)}<span className="text-xs text-muted-foreground">{job.status}</span></div>
            <span className="text-xs text-muted-foreground">{job.duration}</span>
            <span className="text-[10px] font-mono text-muted-foreground">{job.instance}</span>
          </div>
        ))}
      </div>
      {isExamLens && (
        <ExamHighlight pulse={highlight === 'warm-pool'}>
          ⚡ <strong>Warm Pools</strong> keep instances provisioned between jobs — reduces cold start times for consecutive training runs. Key exam keyword: "minimize startup time."
        </ExamHighlight>
      )}
    </div>
  );
}

function RegistryView({ isExamLens, highlight }: { isExamLens: boolean; highlight?: string | null }) {
  const models = [
    { name: 'fraud-detection-v3', version: '3.0.1', status: 'Approved', accuracy: '94.2%' },
    { name: 'fraud-detection-v2', version: '2.1.0', status: 'Approved', accuracy: '91.8%' },
    { name: 'fraud-detection-v4', version: '4.0.0-beta', status: 'PendingApproval', accuracy: '95.1%' },
  ];

  const statusBadge = (status: string, isHighlighted: boolean) => {
    if (status === 'Approved') {
      return <span className={`text-[10px] px-2 py-0.5 rounded bg-green-500/10 text-green-400 ${isHighlighted ? pulseClass : ''}`}>Approved</span>;
    }
    return <span className={`text-[10px] px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-400 ${isHighlighted ? pulseClass : ''}`}>Pending</span>;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Folder size={14} className="text-secondary" />
          <span className="text-sm font-medium text-foreground">fraud-detection-model-group</span>
        </div>
        <button className="text-xs text-primary hover:underline">+ Register New Version</button>
      </div>
      <div className="rounded-lg border border-border overflow-hidden">
        <div className="grid grid-cols-4 gap-2 px-3 py-2 bg-muted/30 border-b border-border text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
          <span>Model</span><span>Version</span><span>Status</span><span>Accuracy</span>
        </div>
        {models.map((model, i) => (
          <div key={i} className="grid grid-cols-4 gap-2 px-3 py-2.5 border-b border-border last:border-0 hover:bg-muted/20 cursor-pointer transition-colors">
            <span className="text-xs text-foreground truncate">{model.name}</span>
            <span className="text-xs font-mono text-muted-foreground">{model.version}</span>
            {statusBadge(model.status, highlight === 'approval-status')}
            <span className="text-xs text-muted-foreground">{model.accuracy}</span>
          </div>
        ))}
      </div>
      {isExamLens && (
        <ExamHighlight pulse={highlight === 'approval-status'}>
          🔑 <strong>Model Registry</strong> provides approval workflows. Use with <strong>SageMaker Pipelines</strong> to automate promotion from "PendingApproval" to "Approved."
        </ExamHighlight>
      )}
    </div>
  );
}

function OrchestrationView({ isExamLens, highlight }: { isExamLens: boolean; highlight?: string | null }) {
  const steps = [
    { name: 'DataPrep', status: 'Succeeded', type: 'Processing' },
    { name: 'Training', status: 'Succeeded', type: 'Training' },
    { name: 'Evaluation', status: 'Running', type: 'Processing' },
    { name: 'RegisterModel', status: 'Pending', type: 'RegisterModel' },
    { name: 'Deploy', status: 'Pending', type: 'CreateEndpoint' },
  ];

  const statusColor = (status: string) => {
    if (status === 'Succeeded') return 'bg-green-500';
    if (status === 'Running') return 'bg-primary animate-pulse';
    return 'bg-muted-foreground/30';
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">fraud-detection-pipeline</span>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary">Running</span>
      </div>
      <div className="flex items-center gap-1 overflow-x-auto py-2">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center">
            <div className={`flex flex-col items-center gap-1 px-3 rounded-lg transition-all ${highlight === step.name.toLowerCase() ? pulseClass : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${statusColor(step.status)}`}>
                {step.status === 'Succeeded' && <CheckCircle size={14} className="text-background" />}
                {step.status === 'Running' && <RefreshCw size={14} className="text-background animate-spin" />}
                {step.status === 'Pending' && <Clock size={14} className="text-muted-foreground" />}
              </div>
              <span className="text-[10px] text-foreground font-medium whitespace-nowrap">{step.name}</span>
              <span className="text-[9px] text-muted-foreground">{step.type}</span>
            </div>
            {i < steps.length - 1 && <ChevronRight size={14} className="text-muted-foreground shrink-0" />}
          </div>
        ))}
      </div>
      {isExamLens && (
        <ExamHighlight pulse={highlight === 'pipeline'}>
          📋 <strong>SageMaker Pipelines</strong> = MLOps automation. Combine with <strong>Model Registry</strong> for approval gates before deployment.
        </ExamHighlight>
      )}
    </div>
  );
}

function ExamHighlight({ children, pulse }: { children: React.ReactNode; pulse?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-3 rounded-lg border border-primary/30 bg-primary/5 text-xs text-foreground/80 leading-relaxed transition-all ${
        pulse ? 'ring-2 ring-primary/50 shadow-[0_0_15px_hsl(var(--primary)/0.2)]' : ''
      }`}
    >
      {children}
    </motion.div>
  );
}
