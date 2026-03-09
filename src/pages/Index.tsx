import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLearning } from '@/context/LearningContext';
import PageLayout from '@/components/layout/PageLayout';
import { layerOrder, layerColors, layerServices, layerDescriptions } from '@/data/servicesData';
import {
  Database, HardDrive, ArrowDownToLine, Settings, Wrench, Archive,
  Brain, SlidersHorizontal, BarChart3, FolderKanban, Rocket, Activity,
  Map, Search, Target, ArrowLeftRight, FileQuestion, Monitor, CheckCircle2
} from 'lucide-react';

const stageIcons: Record<string, any> = {
  'Data Sources': Database,
  'Data Storage': HardDrive,
  'Data Ingestion': ArrowDownToLine,
  'Data Processing': Settings,
  'Feature Engineering': Wrench,
  'Feature Store': Archive,
  'Model Training': Brain,
  'Hyperparameter Tuning': SlidersHorizontal,
  'Model Evaluation': BarChart3,
  'Model Management': FolderKanban,
  'Model Deployment': Rocket,
  'Monitoring': Activity,
};

export default function Index() {
  const { completedTopics, progress, mode } = useLearning();
  const isExamLens = mode === 'exam';

  const quickLinks = [
    { to: '/pipeline-explorer', icon: <Map size={16} />, label: 'Pipeline Explorer', desc: 'Visual architecture playground' },
    { to: '/services', icon: <Search size={16} />, label: 'Service Directory', desc: 'Browse all AWS ML services' },
    { to: '/patterns', icon: <Target size={16} />, label: 'Exam Patterns', desc: 'Keyword → service mapping' },
    { to: '/compare', icon: <ArrowLeftRight size={16} />, label: 'Compare Services', desc: 'Check ✓ vs ✗ tables' },
    { to: '/visualizer', icon: <Monitor size={16} />, label: 'Inference Types', desc: 'Real-Time vs Async vs Batch' },
    { to: '/exam', icon: <FileQuestion size={16} />, label: 'Mock Exam', desc: '35+ official deck questions' },
  ];

  return (
    <PageLayout>
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">
            AWS Machine Learning Lifecycle
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {isExamLens
              ? 'Master MLA-C01 exam domains. Exam-Lens highlights keywords like "least operational overhead" and "most cost-effective."'
              : 'Follow 12 stages from raw data to a production ML model. Click any stage to dive deep.'}
          </p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <div className="w-64 h-2 rounded-full bg-muted overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${isExamLens ? 'bg-primary' : 'bg-secondary'}`}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs font-mono text-muted-foreground">{progress}%</span>
          </div>
        </motion.div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {quickLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border bg-card transition-all text-center group ${
                isExamLens ? 'border-primary/20 hover:border-primary/50 hover:shadow-[0_0_20px_hsl(var(--primary)/0.1)]' : 'border-border hover:border-secondary/40'
              }`}
            >
              <span className={`group-hover:scale-110 transition-transform ${isExamLens ? 'text-primary' : 'text-secondary'}`}>{link.icon}</span>
              <span className="text-xs font-semibold text-foreground">{link.label}</span>
              <span className="text-[10px] text-muted-foreground">{link.desc}</span>
            </Link>
          ))}
        </div>

        {/* Lifecycle Stages Grid */}
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">ML Lifecycle Stages</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {layerOrder.map((layer, idx) => {
            const services = layerServices[layer] || [];
            const isCompleted = completedTopics.includes(layer);
            const color = layerColors[layer];
            const slug = layer.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            const Icon = stageIcons[layer] || Brain;

            return (
              <motion.div
                key={layer}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
              >
                <Link
                  to={`/layers/${slug}`}
                  className={`block p-5 rounded-xl border bg-card transition-all group h-full relative overflow-hidden ${
                    isExamLens
                      ? 'border-border hover:border-primary/40 hover:shadow-[0_0_30px_hsl(var(--primary)/0.08)]'
                      : 'border-border hover:border-secondary/40 hover:shadow-lg hover:shadow-secondary/5'
                  }`}
                >
                  {/* Completed badge */}
                  {isCompleted && (
                    <div className="absolute top-3 right-3">
                      <CheckCircle2 size={16} className="text-green-400" />
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: `${color}15`,
                        color: color,
                        border: `1px solid ${color}30`,
                      }}
                    >
                      <Icon size={18} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono text-muted-foreground">Stage {idx + 1}</span>
                      </div>
                      <h3 className={`text-sm font-bold transition-colors mb-1 ${
                        isExamLens ? 'text-foreground group-hover:text-primary' : 'text-foreground group-hover:text-secondary'
                      }`}>
                        {layer}
                      </h3>
                      <p className="text-[11px] text-muted-foreground line-clamp-2 mb-2">
                        {isExamLens
                          ? layerDescriptions[layer]?.exam?.slice(0, 100) + '...'
                          : layerDescriptions[layer]?.simple?.slice(0, 100) + '...'}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {services.slice(0, 4).map(svcId => (
                          <span
                            key={svcId}
                            className="text-[9px] px-1.5 py-0.5 rounded bg-muted/50 text-muted-foreground"
                          >
                            {svcId}
                          </span>
                        ))}
                        {services.length > 4 && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-muted/50 text-muted-foreground">+{services.length - 4}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </PageLayout>
  );
}
