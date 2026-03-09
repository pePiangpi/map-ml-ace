import { useState } from 'react';
import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { useLearning } from '@/context/LearningContext';
import { DollarSign, Zap, HardDrive } from 'lucide-react';

const dimensions = [
  { key: 'cost', label: 'Cost Priority', icon: DollarSign },
  { key: 'latency', label: 'Latency Priority', icon: Zap },
  { key: 'payload', label: 'Payload Size', icon: HardDrive },
] as const;

interface InferenceScore {
  id: string;
  name: string;
  scores: Record<string, number>; // 0-100 how well it matches when that dimension is maximized
}

const inferenceScores: InferenceScore[] = [
  {
    id: 'realtime',
    name: 'Real-Time',
    scores: { cost: 20, latency: 100, payload: 40 },
  },
  {
    id: 'serverless',
    name: 'Serverless',
    scores: { cost: 90, latency: 60, payload: 40 },
  },
  {
    id: 'async',
    name: 'Async',
    scores: { cost: 70, latency: 20, payload: 100 },
  },
  {
    id: 'batch',
    name: 'Batch Transform',
    scores: { cost: 95, latency: 5, payload: 100 },
  },
];

export default function RequirementSlider() {
  const { mode } = useLearning();
  const isExamLens = mode === 'exam';
  const [weights, setWeights] = useState({ cost: 50, latency: 50, payload: 50 });

  // Compute weighted score for each inference type
  const scored = inferenceScores.map(inf => {
    const total = Object.entries(weights).reduce((sum, [dim, weight]) => {
      return sum + (inf.scores[dim] * weight) / 100;
    }, 0);
    return { ...inf, total };
  }).sort((a, b) => b.total - a.total);

  const winnerId = scored[0].id;
  const maxTotal = scored[0].total;

  return (
    <div className={`rounded-xl border p-5 ${isExamLens ? 'border-primary/20 bg-primary/5' : 'border-border bg-card'}`}>
      <h3 className="text-sm font-bold text-foreground mb-1">Requirement Trade-off Slider</h3>
      <p className="text-xs text-muted-foreground mb-5">
        {isExamLens
          ? 'Adjust priorities to see which inference type wins for each exam scenario.'
          : 'Drag the sliders to match your requirements and see the best deployment option.'}
      </p>

      <div className="space-y-4 mb-6">
        {dimensions.map(dim => {
          const Icon = dim.icon;
          return (
            <div key={dim.key} className="flex items-center gap-3">
              <Icon size={14} className={isExamLens ? 'text-primary' : 'text-secondary'} />
              <span className="text-xs font-medium text-foreground w-28">{dim.label}</span>
              <Slider
                value={[weights[dim.key as keyof typeof weights]]}
                onValueChange={([v]) => setWeights(prev => ({ ...prev, [dim.key]: v }))}
                max={100}
                step={5}
                className="flex-1"
              />
              <span className="text-[10px] font-mono text-muted-foreground w-8 text-right">
                {weights[dim.key as keyof typeof weights]}
              </span>
            </div>
          );
        })}
      </div>

      {/* Results */}
      <div className="grid grid-cols-2 gap-3">
        {scored.map((inf) => {
          const isWinner = inf.id === winnerId;
          const pct = maxTotal > 0 ? Math.round((inf.total / maxTotal) * 100) : 0;
          return (
            <motion.div
              key={inf.id}
              animate={{
                scale: isWinner ? 1.02 : 1,
                borderColor: isWinner
                  ? isExamLens ? 'hsl(var(--primary))' : 'hsl(var(--secondary))'
                  : 'hsl(var(--border))',
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className={`relative p-3 rounded-lg border transition-all overflow-hidden ${
                isWinner
                  ? isExamLens ? 'bg-primary/10 shadow-[0_0_15px_hsl(var(--primary)/0.15)]' : 'bg-secondary/10'
                  : 'bg-muted/20'
              }`}
            >
              {isWinner && (
                <span className={`absolute top-1 right-1 text-[8px] font-bold uppercase px-1.5 py-0.5 rounded-full ${
                  isExamLens ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
                }`}>
                  Winner
                </span>
              )}
              <div className="text-xs font-bold text-foreground mb-1">{inf.name}</div>
              <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${isWinner ? (isExamLens ? 'bg-primary' : 'bg-secondary') : 'bg-muted-foreground/30'}`}
                  animate={{ width: `${pct}%` }}
                  transition={{ type: 'spring', stiffness: 200 }}
                />
              </div>
              <div className="text-[10px] text-muted-foreground mt-1">{pct}% match</div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
