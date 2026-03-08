import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { motion } from 'framer-motion';

interface ServiceNodeData {
  label: string;
  layerColor: string;
  serviceId: string;
  onClick: (id: string) => void;
  [key: string]: unknown;
}

const ServiceNode = memo(({ data }: NodeProps) => {
  const { label, layerColor, serviceId, onClick } = data as unknown as ServiceNodeData;

  return (
    <>
      <Handle type="target" position={Position.Top} className="!bg-muted-foreground !w-2 !h-2" />
      <motion.div
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onClick(serviceId)}
        className="cursor-pointer px-4 py-2.5 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors shadow-lg"
        style={{ borderLeftColor: layerColor, borderLeftWidth: 3 }}
      >
        <div className="text-xs font-semibold text-foreground whitespace-nowrap">{label}</div>
      </motion.div>
      <Handle type="source" position={Position.Bottom} className="!bg-muted-foreground !w-2 !h-2" />
    </>
  );
});

ServiceNode.displayName = 'ServiceNode';

interface LayerNodeData {
  label: string;
  color: string;
  layerIndex: number;
  [key: string]: unknown;
}

const LayerNode = memo(({ data }: NodeProps) => {
  const { label, color, layerIndex } = data as unknown as LayerNodeData;

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: layerIndex * 0.05 }}
      className="px-5 py-3 rounded-xl border-2 bg-card/80 backdrop-blur-sm min-w-[200px] text-center"
      style={{ borderColor: color, boxShadow: `0 0 20px ${color}22` }}
    >
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-0.5">
        Layer {layerIndex + 1}
      </div>
      <div className="text-sm font-bold text-foreground">{label}</div>
    </motion.div>
  );
});

LayerNode.displayName = 'LayerNode';

export const nodeTypes = {
  serviceNode: ServiceNode,
  layerNode: LayerNode,
};
