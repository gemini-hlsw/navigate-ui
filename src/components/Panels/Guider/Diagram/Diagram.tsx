import '@xyflow/react/dist/style.css';

import type { Edge, Node } from '@xyflow/react';
import { Background, Controls, ReactFlow, ReactFlowProvider, useReactFlow } from '@xyflow/react';
import { useEffect, useMemo } from 'react';

import { useThemeValue } from '@/components/atoms/theme';

import { useGetGuideState } from './useGetGuideState';

const initialNodes: Node[] = [
  {
    id: 'tiptilt',
    data: { label: 'Tip/Tilt' },
    position: { x: 0, y: 100 },
    className: 'active', // "active", "idle", "inactive"
  },
  {
    id: 'focus',
    data: { label: 'Focus' },
    position: { x: 100, y: 100 },
    className: 'active',
    type: 'output',
  },
  {
    id: 'coma',
    data: { label: 'Coma' },
    position: { x: 200, y: 100 },
    className: 'active',
    type: 'output',
  },
  {
    id: 'higho',
    data: { label: 'High O' },
    position: { x: 300, y: 100 },
    className: 'active',
    type: 'output',
  },
  {
    id: 'mount',
    data: { label: 'Mount' },
    position: { x: 0, y: 200 },
    className: 'active',
    type: 'output',
  },
];

const initialEdges: Edge[] = [
  {
    id: 'tiptilt-mount',
    source: 'tiptilt',
    target: 'mount',
    animated: true,
    className: 'active',
  },
];

function Flow() {
  const { setNodes, setEdges, fitView } = useReactFlow();
  const theme = useThemeValue();
  const state = useGetGuideState();

  const [sourceNodes, sourceEdges] = useMemo<[Node[], Edge[]]>(() => {
    // Get active sources first
    const sourceNodes: Node[] = [];
    const sourceEdges: Edge[] = [];
    if (state.m2TipTiltEnable && state.m2TipTiltSource) {
      state.m2TipTiltSource.split(',').forEach((source: string) => {
        sourceNodes.push({
          id: source,
          data: { label: source },
          position: { x: 0, y: 0 },
          className: 'active',
          type: 'input',
        });
        sourceEdges.push({
          id: `${source}-tiptilt`,
          source: source,
          target: 'tiptilt',
          animated: true,
          className: 'active',
        });
      });
    }

    if (state.m2TipTiltFocusLink) {
      sourceNodes.forEach((n) => {
        sourceEdges.push({
          id: `${n.id}-focus`,
          source: n.id,
          target: 'focus',
          animated: true,
          className: 'active',
        });
      });
    } else {
      if (state.m2FocusEnable && state.m2FocusSource) {
        state.m2FocusSource.split(',').forEach((s) => {
          if (!sourceNodes.find((n) => n.id === s)) {
            sourceNodes.push({
              id: s,
              data: { label: s },
              position: { x: 0, y: 0 },
              className: 'active',
              type: 'input',
            });
          }
          sourceEdges.push({
            id: `${s}-focus`,
            source: s,
            target: 'focus',
            animated: true,
            className: 'active',
          });
        });
      }
    }

    if (state.m2ComaEnable) {
      const pos = sourceNodes.findIndex((n) => n.id === state.m2ComaM1CorrectionsSource);
      if (pos === -1) {
        sourceNodes.push({
          id: state.m2ComaM1CorrectionsSource ?? '',
          data: { label: state.m2ComaM1CorrectionsSource },
          position: { x: 0, y: 0 },
          className: 'active',
          type: 'input',
        });
      } else {
        if (pos !== sourceNodes.length - 1) {
          sourceNodes.splice(sourceNodes.length - 1, 0, sourceNodes.splice(pos, 1)[0]);
        }
      }
      sourceEdges.push({
        id: `${state.m2ComaM1CorrectionsSource}-coma`,
        source: state.m2ComaM1CorrectionsSource ?? '',
        target: 'coma',
        animated: true,
        className: 'active',
      });
    }

    if (state.m1CorrectionsEnable) {
      const pos = sourceNodes.findIndex((n) => n.id === state.m2ComaM1CorrectionsSource);
      if (pos === -1) {
        sourceNodes.push({
          id: state.m2ComaM1CorrectionsSource ?? '',
          data: { label: state.m2ComaM1CorrectionsSource },
          position: { x: 0, y: 0 },
          className: 'active',
          type: 'input',
        });
      } else {
        if (pos !== sourceNodes.length - 1) {
          sourceNodes.splice(sourceNodes.length - 1, 0, sourceNodes.splice(pos, 1)[0]);
        }
      }
      sourceEdges.push({
        id: `${state.m2ComaM1CorrectionsSource}-higho`,
        source: state.m2ComaM1CorrectionsSource ?? '',
        target: 'higho',
        animated: true,
        className: 'active',
      });
    }

    // Check static boxes state
    // active: Enabled and receiving input
    // idle: Enabled and waiting for input
    // inacive: Disabled

    // Tip/Tilt
    let tiptiltState: string;
    if (state.m2TipTiltEnable) {
      if (sourceEdges.find((n) => n.target === 'tiptilt')) {
        tiptiltState = 'active';
      } else {
        tiptiltState = 'idle';
      }
    } else {
      tiptiltState = 'inactive';
    }
    initialNodes.find((n) => n.id === 'tiptilt')!.className = tiptiltState;

    // Mount
    let mountState = 'active';
    if (state.mountOffload) {
      if (tiptiltState === 'active') {
        mountState = 'active';
      } else {
        mountState = 'idle';
      }
    } else {
      mountState = 'inactive';
    }
    initialNodes.find((n) => n.id === 'mount')!.className = mountState;
    initialEdges.find((n) => n.id === 'tiptilt-mount')!.className = mountState;

    // Focus
    let focusState: string;
    if (state.m2FocusEnable) {
      if (sourceEdges.find((n) => n.target === 'focus')) {
        focusState = 'active';
      } else {
        focusState = 'idle';
      }
    } else {
      focusState = 'inactive';
    }
    initialNodes.find((n) => n.id === 'focus')!.className = focusState;

    // Coma
    let comaState: string;
    if (state.m2ComaEnable) {
      if (sourceEdges.find((n) => n.target === 'coma')) {
        comaState = 'active';
      } else {
        comaState = 'idle';
      }
    } else {
      comaState = 'inactive';
    }
    initialNodes.find((n) => n.id === 'coma')!.className = comaState;

    // High-O
    let highoState: string;
    if (state.m1CorrectionsEnable) {
      if (sourceEdges.find((n) => n.target === 'higho')) {
        highoState = 'active';
      } else {
        highoState = 'idle';
      }
    } else {
      highoState = 'inactive';
    }
    initialNodes.find((n) => n.id === 'higho')!.className = highoState;

    // Check probe tracking

    const sourceN = sourceNodes.length;
    if (sourceN) {
      sourceNodes.forEach((n, i) => (n.position.x = i * 100));
    }

    return [
      [...sourceNodes, ...initialNodes],
      [...sourceEdges, ...initialEdges],
    ];
  }, [state]);

  useEffect(() => {
    setNodes(sourceNodes);
    setEdges(sourceEdges);

    const timeout = setTimeout(() => void fitView({ duration: 1000 }), 20);

    return () => clearTimeout(timeout);
  }, [sourceNodes, sourceEdges]);

  return (
    <div className="diagram">
      <ReactFlow
        defaultNodes={initialNodes}
        defaultEdges={initialEdges}
        proOptions={{ hideAttribution: true }}
        colorMode={theme}
        fitView
      >
        <Background />
        <Controls showZoom={false} showInteractive={false} position="bottom-right" />
      </ReactFlow>
    </div>
  );
}

export default function Diagram() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}
