import type { Node, Edge } from '@xyflow/react';
import { layerOrder, layerColors, layerServices, servicesData } from '@/data/servicesData';

export function generateMapElements(onServiceClick: (id: string) => void): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  const LAYER_X = 50;
  const LAYER_Y_START = 30;
  const LAYER_Y_GAP = 160;
  const SERVICE_X_START = 300;
  const SERVICE_X_GAP = 175;

  layerOrder.forEach((layer, layerIdx) => {
    const y = LAYER_Y_START + layerIdx * LAYER_Y_GAP;
    const color = layerColors[layer];

    // Layer label node
    nodes.push({
      id: `layer-${layerIdx}`,
      type: 'layerNode',
      position: { x: LAYER_X, y: y },
      data: { label: layer, color, layerIndex: layerIdx },
      draggable: false,
    });

    // Service nodes for this layer
    const services = layerServices[layer] || [];
    services.forEach((svcId, svcIdx) => {
      const svc = servicesData[svcId];
      if (!svc) return;

      const svcX = SERVICE_X_START + svcIdx * SERVICE_X_GAP;
      nodes.push({
        id: svcId,
        type: 'serviceNode',
        position: { x: svcX, y: y + 5 },
        data: {
          label: svc.name,
          layerColor: color,
          serviceId: svcId,
          onClick: onServiceClick,
        },
      });
    });

    // Edge from previous layer to current
    if (layerIdx > 0) {
      edges.push({
        id: `edge-layer-${layerIdx - 1}-${layerIdx}`,
        source: `layer-${layerIdx - 1}`,
        target: `layer-${layerIdx}`,
        type: 'smoothstep',
        animated: true,
        style: { stroke: layerColors[layerOrder[layerIdx - 1]], strokeWidth: 2, opacity: 0.4 },
      });
    }
  });

  return { nodes, edges };
}
