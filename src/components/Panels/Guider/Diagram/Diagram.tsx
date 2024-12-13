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
    function isSourceActive(source: string) {
      switch (source) {
        case 'OIWFS':
          return state.oiIntegrating;
        case 'PWFS1':
          return state.p1Integrating;
        case 'PWFS2':
          return state.p2Integrating;
        default:
          return false;
      }
    }

    // Get active sources first
    const sourceNodes: Node[] = [];
    const sourceEdges: Edge[] = [];
    if (state.m2TipTiltEnable && state.m2TipTiltSource) {
      state.m2TipTiltSource.split(',').forEach((source: string) => {
        const isActive = isSourceActive(source);
        sourceNodes.push({
          id: source,
          data: { label: source },
          position: { x: 0, y: 0 },
          className: isActive ? 'active' : 'inactive',
          type: 'input',
        });
        sourceEdges.push({
          id: `${source}-tiptilt`,
          source: source,
          target: 'tiptilt',
          animated: isActive,
          className: isActive ? 'active' : 'inactive',
        });
      });
    }

    if (state.m2TipTiltFocusLink) {
      sourceNodes.forEach((n) => {
        const isActive = isSourceActive(n.id);
        sourceEdges.push({
          id: `${n.id}-focus`,
          source: n.id,
          target: 'focus',
          animated: isActive,
          className: isActive ? 'active' : 'inactive',
        });
      });
    } else {
      if (state.m2FocusEnable && state.m2FocusSource) {
        state.m2FocusSource.split(',').forEach((s) => {
          const isActive = isSourceActive(s);
          if (!sourceNodes.find((n) => n.id === s)) {
            sourceNodes.push({
              id: s,
              data: { label: s },
              position: { x: 0, y: 0 },
              className: isActive ? 'active' : 'inactive',
              type: 'input',
            });
          }
          sourceEdges.push({
            id: `${s}-focus`,
            source: s,
            target: 'focus',
            animated: isActive,
            className: isActive ? 'active' : 'inactive',
          });
        });
      }
    }

    if (state.m2ComaEnable) {
      const pos = sourceNodes.findIndex((n) => n.id === state.m2ComaM1CorrectionsSource);
      const isActive = isSourceActive(state.m2ComaM1CorrectionsSource ?? '');
      if (pos === -1) {
        sourceNodes.push({
          id: state.m2ComaM1CorrectionsSource ?? '',
          data: { label: state.m2ComaM1CorrectionsSource },
          position: { x: 0, y: 0 },
          className: isActive ? 'active' : 'inactive',
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
        animated: isActive,
        className: isActive ? 'active' : 'inactive',
      });
    }

    if (state.m1CorrectionsEnable) {
      const pos = sourceNodes.findIndex((n) => n.id === state.m2ComaM1CorrectionsSource);
      const isActive = isSourceActive(state.m2ComaM1CorrectionsSource ?? '');
      if (pos === -1) {
        sourceNodes.push({
          id: state.m2ComaM1CorrectionsSource ?? '',
          data: { label: state.m2ComaM1CorrectionsSource },
          position: { x: 0, y: 0 },
          className: isActive ? 'active' : 'inactive',
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
        animated: isActive,
        className: isActive ? 'active' : 'inactive',
      });
    }

    // Check static boxes state
    // active: Enabled and receiving input
    // idle: Enabled and waiting for input
    // inacive: Disabled

    // Tip/Tilt
    let tiptiltState: string;
    if (state.m2TipTiltEnable) {
      // Check if any source is active
      const tipTiltActive = sourceEdges.filter((n) => n.target === 'tiptilt').some((n) => isSourceActive(n.id));
      if (sourceEdges.find((n) => n.target === 'tiptilt')) {
        if (tipTiltActive) {
          tiptiltState = 'active';
        } else {
          tiptiltState = 'idle';
        }
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
      // Check if any source is active
      const focusActive = sourceEdges.filter((n) => n.target === 'focus').some((n) => isSourceActive(n.id));
      if (sourceEdges.find((n) => n.target === 'focus')) {
        if (focusActive) {
          focusState = 'active';
        } else {
          focusState = 'idle';
        }
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
      // Check if any source is active
      const comaActive = sourceEdges.filter((n) => n.target === 'coma').some((n) => isSourceActive(n.id));
      if (sourceEdges.find((n) => n.target === 'coma')) {
        if (comaActive) {
          comaState = 'active';
        } else {
          comaState = 'idle';
        }
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
      // Check if any source is active
      const highoActive = sourceEdges.filter((n) => n.target === 'higho').some((n) => isSourceActive(n.id));
      if (sourceEdges.find((n) => n.target === 'higho')) {
        if (highoActive) {
          highoState = 'active';
        } else {
          highoState = 'idle';
        }
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
  }, [sourceNodes, sourceEdges, setNodes, setEdges, fitView]);

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
