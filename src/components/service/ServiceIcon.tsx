import {
  Database, HardDrive, Cloud, Server, Cpu, Brain, Archive,
  BarChart3, Layers, Rocket, Activity, Settings, Wrench, 
  FolderKanban, SlidersHorizontal, ArrowDownToLine, Box,
  FileText, Zap, RefreshCw, Eye, Shield, Lock, Key
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface ServiceIconConfig {
  icon: LucideIcon;
  color: string; // HSL variable name
}

const serviceIconMap: Record<string, ServiceIconConfig> = {
  // Storage
  's3': { icon: Database, color: 'var(--node-storage)' },
  'fsx': { icon: HardDrive, color: 'var(--node-storage)' },
  'efs': { icon: HardDrive, color: 'var(--node-storage)' },
  'redshift': { icon: Database, color: 'var(--node-storage)' },
  
  // Ingestion
  'kinesis': { icon: ArrowDownToLine, color: 'var(--node-ingestion)' },
  'kinesis-firehose': { icon: ArrowDownToLine, color: 'var(--node-ingestion)' },
  'dms': { icon: RefreshCw, color: 'var(--node-ingestion)' },
  
  // Processing
  'glue': { icon: Settings, color: 'var(--node-processing)' },
  'emr': { icon: Cpu, color: 'var(--node-processing)' },
  'athena': { icon: FileText, color: 'var(--node-processing)' },
  'lake-formation': { icon: Layers, color: 'var(--node-processing)' },
  
  // Feature Engineering
  'data-wrangler': { icon: Wrench, color: 'var(--node-feature)' },
  'feature-store': { icon: Archive, color: 'var(--node-feature)' },
  
  // Training
  'sagemaker': { icon: Brain, color: 'var(--node-training)' },
  'sagemaker-training': { icon: Brain, color: 'var(--node-training)' },
  'bedrock': { icon: Box, color: 'var(--node-training)' },
  
  // Tuning
  'auto-tuning': { icon: SlidersHorizontal, color: 'var(--node-tuning)' },
  'hyperparameter-tuning': { icon: SlidersHorizontal, color: 'var(--node-tuning)' },
  
  // Evaluation
  'sagemaker-debugger': { icon: Eye, color: 'var(--node-evaluation)' },
  'sagemaker-experiments': { icon: BarChart3, color: 'var(--node-evaluation)' },
  
  // Model Management
  'model-registry': { icon: FolderKanban, color: 'var(--node-management)' },
  'sagemaker-pipelines': { icon: RefreshCw, color: 'var(--node-management)' },
  
  // Deployment
  'realtime-endpoint': { icon: Zap, color: 'var(--node-deployment)' },
  'serverless-inference': { icon: Cloud, color: 'var(--node-deployment)' },
  'async-inference': { icon: Server, color: 'var(--node-deployment)' },
  'batch-transform': { icon: Layers, color: 'var(--node-deployment)' },
  
  // Monitoring
  'model-monitor': { icon: Activity, color: 'var(--node-monitoring)' },
  'sagemaker-clarify': { icon: Shield, color: 'var(--node-monitoring)' },
  
  // Security
  'kms': { icon: Key, color: 'var(--muted-foreground)' },
  'secrets-manager': { icon: Lock, color: 'var(--muted-foreground)' },
};

interface ServiceIconProps {
  serviceId: string;
  size?: number;
  className?: string;
}

export function ServiceIcon({ serviceId, size = 24, className = '' }: ServiceIconProps) {
  const config = serviceIconMap[serviceId] || { icon: Box, color: 'var(--muted-foreground)' };
  const Icon = config.icon;
  
  return (
    <Icon 
      size={size} 
      className={className}
      style={{ color: `hsl(${config.color})` }}
    />
  );
}

export function getServiceColor(serviceId: string): string {
  return serviceIconMap[serviceId]?.color || 'var(--muted-foreground)';
}

export function getServiceIconComponent(serviceId: string): LucideIcon {
  return serviceIconMap[serviceId]?.icon || Box;
}
