import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLearning } from '@/context/LearningContext';
import PageLayout from '@/components/layout/PageLayout';
import { layerOrder, layerColors, layerServices, layerDescriptions, layerIcons } from '@/data/servicesData';
import { Map, Search, Target, ArrowLeftRight, FileQuestion, BookOpen, CheckCircle2 } from 'lucide-react';

export default function Index() {
  const { completedTopics, progress, mode } = useLearning();

  const quickLinks = [
    { to: '/pipeline-explorer', icon: <Map size={16} />, label: 'Pipeline Explorer', desc: 'Visual architecture playground' },
    { to: '/services', icon: <Search size={16} />, label: 'Service Directory', desc: 'Browse all AWS ML services' },
    { to: '/patterns', icon: <Target size={16} />, label: 'Exam Patterns', desc: 'Keyword → service mapping' },
    { to: '/compare', icon: <ArrowLeftRight size={16} />, label: 'Compare Services', desc: 'Side-by-side comparisons' },
    { to: '/exam', icon: <FileQuestion size={16} />, label: 'Mock Exam', desc: '20 questions, 30 min timer' },
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
            {mode === 'simple'
              ? 'Follow the 12 steps from raw data to a working ML model in production. Click any stage to dive deep!'
              : 'Master the complete MLA-C01 exam domain coverage across data preparation, model development, deployment, and monitoring.'}
          </p>
          {/* Progress bar */}
          <div className="mt-4 flex items-center justify-center gap-3">
            <div className="w-64 h-2 rounded-full bg-muted overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs font-mono text-muted-foreground">{progress}% complete</span>
          </div>
        </motion.div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-10">
          {quickLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-border bg-card hover:border-primary/40 transition-all text-center group"
            >
              <span className="text-primary group-hover:scale-110 transition-transform">{link.icon}</span>
              <span className="text-xs font-semibold text-foreground">{link.label}</span>
              <span className="text-[10px] text-muted-foreground">{link.desc}</span>
            </Link>
          ))}
        </div>

        {/* Learning Path - Lifecycle Stages */}
        <div className="space-y-4">
          {layerOrder.map((layer, idx) => {
            const services = layerServices[layer] || [];
            const isCompleted = completedTopics.includes(layer);
            const color = layerColors[layer];
            const slug = layer.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            const IconComponent = layerIcons[layer] || BookOpen;

            return (
              <motion.div
                key={layer}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.04 }}
              >
                <Link
                  to={`/layers/${slug}`}
                  className="block p-5 rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    {/* Step number */}
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-sm font-bold"
                      style={{
                        backgroundColor: `${color}18`,
                        color: color,
                        border: `1px solid ${color}40`,
                      }}
                    >
                      {isCompleted ? <CheckCircle2 size={18} /> : idx + 1}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                          {layer}
                        </h2>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                          {services.length} service{services.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {layerDescriptions[layer]?.[mode] || ''}
                      </p>
                      {/* Service pills */}
                      <div className="flex flex-wrap gap-1.5">
                        {services.map(svcId => (
                          <span
                            key={svcId}
                            className="text-[10px] px-2 py-0.5 rounded-full border border-border bg-muted/30 text-muted-foreground"
                          >
                            {svcId}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Arrow */}
                    <span className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all mt-2">→</span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Connecting arrows */}
        <div className="flex justify-center py-4">
          <div className="w-px h-0 bg-border" />
        </div>
      </div>
    </PageLayout>
  );
}
