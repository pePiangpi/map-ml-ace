import { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { nodeTypes } from './CustomNodes';
import { generateMapElements } from './mapLayout';
import { useLearning } from '@/context/LearningContext';

export default function ArchitectureMap() {
  const { setSelectedService } = useLearning();

  const handleServiceClick = useCallback((id: string) => {
    setSelectedService(id);
  }, [setSelectedService]);

  const { nodes: initialNodes, edges: initialEdges } = useMemo(
    () => generateMapElements(handleServiceClick),
    [handleServiceClick]
  );

  const [nodes] = useNodesState(initialNodes);
  const [edges] = useEdgesState(initialEdges);

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.2}
        maxZoom={2}
        proOptions={{ hideAttribution: true }}
        className="bg-background"
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="hsl(220 15% 15%)" />
        <Controls className="!bg-card !border-border !rounded-lg" />
        <MiniMap
          nodeColor={() => 'hsl(28 100% 55%)'}
          maskColor="hsl(220 20% 7% / 0.8)"
          className="!bg-card !border-border !rounded-lg"
        />
      </ReactFlow>
    </div>
  );
}
