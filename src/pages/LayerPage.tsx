import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageLayout from '@/components/layout/PageLayout';
import { useLearning } from '@/context/LearningContext';
import { layerOrder, layerColors, layerServices, layerDescriptions, servicesData } from '@/data/servicesData';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { ChevronRight, BookOpen, AlertTriangle, Lightbulb } from 'lucide-react';

export default function LayerPage() {
  const { layerId } = useParams<{ layerId: string }>();
  const { mode, markComplete } = useLearning();

  // Find the layer by slug
  const layer = layerOrder.find(l => l.toLowerCase().replace(/[^a-z0-9]+/g, '-') === layerId);
  if (!layer) {
    return (
      <PageLayout>
        <div className="p-10 text-center text-muted-foreground">Layer not found.</div>
      </PageLayout>
    );
  }

  const services = layerServices[layer] || [];
  const color = layerColors[layer];
  const layerIdx = layerOrder.indexOf(layer);
  const prevLayer = layerIdx > 0 ? layerOrder[layerIdx - 1] : null;
  const nextLayer = layerIdx < layerOrder.length - 1 ? layerOrder[layerIdx + 1] : null;

  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto px-6 py-6">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{layer}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold"
              style={{ backgroundColor: `${color}20`, color, border: `1px solid ${color}50` }}
            >
              {layerIdx + 1}
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                Stage {layerIdx + 1} of {layerOrder.length}
              </span>
              <h1 className="text-2xl font-bold text-foreground">{layer}</h1>
            </div>
          </div>

          <p className="text-foreground/80 leading-relaxed max-w-3xl">
            {layerDescriptions[layer]?.[mode] || ''}
          </p>
        </motion.div>

        {/* Services Grid */}
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
          <BookOpen size={14} /> AWS Services in this Stage
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {services.map((svcId, i) => {
            const svc = servicesData[svcId];
            if (!svc) return null;
            return (
              <motion.div
                key={svcId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={`/services/${svcId}`}
                  className="block p-4 rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-lg transition-all group h-full"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold mb-3"
                    style={{ backgroundColor: `${color}15`, color }}
                  >
                    {svc.name.charAt(0)}
                  </div>
                  <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors mb-1">
                    {svc.name}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {mode === 'simple' ? svc.simple : svc.exam}
                  </p>
                  <div className="mt-3 flex items-center gap-1 text-[10px] text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ChevronRight size={10} />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* ML Theory for this layer */}
        {layerDescriptions[layer]?.theory && (
          <div className="mb-10">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
              <Lightbulb size={14} /> ML Theory
            </h2>
            <div className="p-4 rounded-xl border border-border bg-card">
              <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">
                {layerDescriptions[layer].theory}
              </p>
            </div>
          </div>
        )}

        {/* Exam Tips */}
        {layerDescriptions[layer]?.examTip && (
          <div className="mb-10 p-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5">
            <h2 className="text-sm font-semibold text-yellow-500 mb-2 flex items-center gap-2">
              <AlertTriangle size={14} /> Exam Tips for {layer}
            </h2>
            <p className="text-sm text-foreground/80 leading-relaxed">
              {layerDescriptions[layer].examTip}
            </p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center pt-6 border-t border-border">
          {prevLayer ? (
            <Link
              to={`/layers/${prevLayer.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← {prevLayer}
            </Link>
          ) : <div />}
          <button
            onClick={() => markComplete(layer)}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Mark as Complete ✓
          </button>
          {nextLayer ? (
            <Link
              to={`/layers/${nextLayer.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {nextLayer} →
            </Link>
          ) : <div />}
        </div>
      </div>
    </PageLayout>
  );
}
