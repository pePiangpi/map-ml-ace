import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import PageLayout from '@/components/layout/PageLayout';
import { useLearning } from '@/context/LearningContext';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Radio, Shield, GitBranch, Zap } from 'lucide-react';

interface ArchNode {
  id: string;
  label: string;
  serviceLink?: string;
}

interface Architecture {
  id: string;
  name: string;
  icon: typeof Radio;
  description: string;
  examNote: string;
  color: string;
  nodes: ArchNode[];
  edges: [string, string][];
}

const architectures: Architecture[] = [
  {
    id: 'streaming',
    name: 'Real-Time Streaming Pipeline',
    icon: Radio,
    description: 'Ingest, process, and score data in real-time using Kinesis and SageMaker endpoints.',
    examNote: 'Look for: "real-time," "streaming," "millisecond latency," "fraud detection per-transaction."',
    color: 'var(--node-ingestion)',
    nodes: [
      { id: 'source', label: 'Data Source' },
      { id: 'kinesis', label: 'Kinesis Data Streams', serviceLink: '/services/kinesis' },
      { id: 'lambda', label: 'Lambda Transform' },
      { id: 'sagemaker', label: 'SageMaker Endpoint', serviceLink: '/services/sagemaker' },
      { id: 's3', label: 'S3 (Results)', serviceLink: '/services/s3' },
      { id: 'monitor', label: 'Model Monitor', serviceLink: '/services/model-monitor' },
    ],
    edges: [['source', 'kinesis'], ['kinesis', 'lambda'], ['lambda', 'sagemaker'], ['sagemaker', 's3'], ['sagemaker', 'monitor']],
  },
  {
    id: 'security',
    name: 'Secure ML Governance',
    icon: Shield,
    description: 'End-to-end security with encryption, VPCs, and IAM-based access control.',
    examNote: 'Look for: "encryption at rest/in transit," "VPC," "least privilege," "KMS," "Secrets Manager."',
    color: 'var(--node-management)',
    nodes: [
      { id: 'iam', label: 'IAM Roles' },
      { id: 'vpc', label: 'VPC + Endpoints' },
      { id: 'kms', label: 'KMS Encryption' },
      { id: 'secrets', label: 'Secrets Manager' },
      { id: 'sagemaker', label: 'SageMaker Studio', serviceLink: '/services/sagemaker' },
      { id: 'registry', label: 'Model Registry', serviceLink: '/services/model-registry' },
    ],
    edges: [['iam', 'sagemaker'], ['vpc', 'sagemaker'], ['kms', 'sagemaker'], ['secrets', 'sagemaker'], ['sagemaker', 'registry']],
  },
  {
    id: 'governance',
    name: 'Model Governance & Lineage',
    icon: GitBranch,
    description: 'Track model versions, approval workflows, and full lineage from data to deployment.',
    examNote: 'Look for: "approval workflow," "model versioning," "audit trail," "lineage tracking."',
    color: 'var(--node-evaluation)',
    nodes: [
      { id: 'data', label: 'Training Data (S3)', serviceLink: '/services/s3' },
      { id: 'pipeline', label: 'SageMaker Pipelines', serviceLink: '/services/sagemaker-pipelines' },
      { id: 'registry', label: 'Model Registry', serviceLink: '/services/model-registry' },
      { id: 'lineage', label: 'ML Lineage Tracking' },
      { id: 'approval', label: 'Manual Approval' },
      { id: 'deploy', label: 'Production Endpoint' },
    ],
    edges: [['data', 'pipeline'], ['pipeline', 'registry'], ['registry', 'lineage'], ['registry', 'approval'], ['approval', 'deploy']],
  },
  {
    id: 'inference',
    name: 'Multi-Model Inference',
    icon: Zap,
    description: 'Deploy multiple models behind a single endpoint for cost-effective inference at scale.',
    examNote: 'Look for: "multiple models," "same framework," "cost optimization," "single endpoint."',
    color: 'var(--node-deployment)',
    nodes: [
      { id: 'models', label: 'Trained Models (S3)', serviceLink: '/services/s3' },
      { id: 'registry', label: 'Model Registry', serviceLink: '/services/model-registry' },
      { id: 'mme', label: 'Multi-Model Endpoint', serviceLink: '/services/sagemaker' },
      { id: 'autoscale', label: 'Auto Scaling' },
      { id: 'monitor', label: 'Model Monitor', serviceLink: '/services/model-monitor' },
      { id: 'client', label: 'Client App' },
    ],
    edges: [['models', 'registry'], ['registry', 'mme'], ['mme', 'autoscale'], ['mme', 'monitor'], ['mme', 'client']],
  },
];

function ArchitectureDiagram({ arch }: { arch: Architecture; }) {
  const navigate = useNavigate();
  const { mode } = useLearning();
  const isExamLens = mode === 'exam';

  const nodePositions: Record<string, { x: number; y: number }> = {};
  arch.nodes.forEach((node, i) => {
    const cols = 3;
    const col = i % cols;
    const row = Math.floor(i / cols);
    nodePositions[node.id] = { x: 60 + col * 200, y: 40 + row * 100 };
  });

  return (
    <svg viewBox="0 0 660 260" className="w-full h-auto">
      {/* Edges */}
      {arch.edges.map(([from, to], i) => {
        const f = nodePositions[from];
        const t = nodePositions[to];
        if (!f || !t) return null;
        return (
          <line
            key={i}
            x1={f.x + 70} y1={f.y + 20}
            x2={t.x + 70} y2={t.y + 20}
            stroke={isExamLens ? 'hsl(var(--primary))' : 'hsl(var(--border))'}
            strokeWidth="2"
            strokeDasharray="6 3"
            opacity={0.5}
          />
        );
      })}
      {/* Nodes */}
      {arch.nodes.map((node) => {
        const pos = nodePositions[node.id];
        const hasLink = !!node.serviceLink;
        return (
          <g
            key={node.id}
            className={hasLink ? 'cursor-pointer' : ''}
            onClick={() => hasLink && navigate(node.serviceLink!)}
          >
            <rect
              x={pos.x}
              y={pos.y}
              width={140}
              height={40}
              rx={8}
              fill={hasLink ? (isExamLens ? 'hsl(var(--primary) / 0.1)' : 'hsl(var(--secondary) / 0.1)') : 'hsl(var(--muted))'}
              stroke={hasLink ? (isExamLens ? 'hsl(var(--primary) / 0.4)' : 'hsl(var(--secondary) / 0.3)') : 'hsl(var(--border))'}
              strokeWidth="1.5"
            />
            <text
              x={pos.x + 70}
              y={pos.y + 24}
              textAnchor="middle"
              fill={hasLink ? (isExamLens ? 'hsl(var(--primary))' : 'hsl(var(--secondary))') : 'hsl(var(--foreground))'}
              fontSize="11"
              fontWeight={hasLink ? '600' : '400'}
              fontFamily="Inter, sans-serif"
            >
              {node.label}
            </text>
            {hasLink && (
              <text x={pos.x + 70} y={pos.y + 55} textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="8">
                Click to explore →
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export default function ScenariosPage() {
  const { mode } = useLearning();
  const isExamLens = mode === 'exam';
  const [activeArch, setActiveArch] = useState(architectures[0].id);
  const active = architectures.find(a => a.id === activeArch)!;
  const Icon = active.icon;

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
              <BreadcrumbPage>Architecture Scenarios</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold text-foreground mb-1">Architecture Scenario Mode</h1>
          <p className="text-sm text-muted-foreground mb-6">
            {isExamLens
              ? 'Four high-frequency MLA-C01 architecture patterns. Click any node to jump to its Console View.'
              : 'Explore the 4 most common AWS ML architectures. Click nodes to learn about each service.'}
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {architectures.map(a => {
            const TabIcon = a.icon;
            const isActive = a.id === activeArch;
            return (
              <button
                key={a.id}
                onClick={() => setActiveArch(a.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap border ${
                  isActive
                    ? isExamLens ? 'bg-primary/15 text-primary border-primary/40' : 'bg-secondary/15 text-secondary border-secondary/40'
                    : 'bg-card text-muted-foreground border-border hover:text-foreground hover:border-primary/20'
                }`}
              >
                <TabIcon size={14} />
                {a.name}
              </button>
            );
          })}
        </div>

        {/* Active Architecture */}
        <motion.div
          key={activeArch}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-border bg-card overflow-hidden"
        >
          <div className="p-5 border-b border-border">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isExamLens ? 'bg-primary/15 text-primary' : 'bg-secondary/15 text-secondary'}`}>
                <Icon size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">{active.name}</h2>
                <p className="text-xs text-muted-foreground">{active.description}</p>
              </div>
            </div>
            {isExamLens && (
              <div className="mt-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
                <p className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1">Exam Pattern</p>
                <p className="text-xs text-foreground/70">{active.examNote}</p>
              </div>
            )}
          </div>
          <div className="p-5 bg-muted/10">
            <ArchitectureDiagram arch={active} />
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
}
