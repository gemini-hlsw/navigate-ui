import { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  Node, // Node Type
  Edge, // Edge Type
  NodeChange, // NodeChange Type
  EdgeChange, // EdgeChange Type
  ReactFlowProvider,
  useReactFlow,
  Controls,
  Background,
  applyEdgeChanges,
  applyNodeChanges,
} from 'reactflow';
import 'reactflow/dist/style.css';
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
  // const [state, setState] = useState<GuideLoopType>({} as GuideLoopType)
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  // eslint-disable-next-line no-empty-pattern
  const {} = useReactFlow();
  const state = useGetGuideState();

  const onNodesChange = useCallback((changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)), []);

  const onEdgesChange = useCallback((changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);

  useEffect(() => {
    const auxState = { ...state };
    // fitView()
    // Get active sources first
    const sourceNodes: Node[] = [];
    const sourceEdges: Edge[] = [];
    if (auxState.m2TipTiltEnable && auxState.m2TipTiltSource) {
      auxState.m2TipTiltSource.split(',').map((source: string) => {
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

    if (auxState.m2TipTiltFocusLink) {
      sourceNodes.map((n) => {
        sourceEdges.push({
          id: `${n.id}-focus`,
          source: n.id,
          target: 'focus',
          animated: true,
          className: 'active',
        });
      });
    } else {
      if (auxState.m2FocusEnable && auxState.m2FocusSource) {
        auxState.m2FocusSource.split(',').map((s) => {
          if (sourceNodes.filter((n) => n.id === s).length === 0) {
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

    if (auxState.m2ComaEnable) {
      const pos = sourceNodes.map((n) => n.id).indexOf(auxState.m2ComaM1CorrectionsSource!);
      if (pos === -1) {
        sourceNodes.push({
          id: auxState.m2ComaM1CorrectionsSource ?? '',
          data: { label: auxState.m2ComaM1CorrectionsSource },
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
        id: `${auxState.m2ComaM1CorrectionsSource}-coma`,
        source: auxState.m2ComaM1CorrectionsSource ?? '',
        target: 'coma',
        animated: true,
        className: 'active',
      });
    }

    if (auxState.m1CorrectionsEnable) {
      const pos = sourceNodes.map((n) => n.id).indexOf(auxState.m2ComaM1CorrectionsSource!);
      if (pos === -1) {
        sourceNodes.push({
          id: auxState.m2ComaM1CorrectionsSource ?? '',
          data: { label: auxState.m2ComaM1CorrectionsSource },
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
        id: `${auxState.m2ComaM1CorrectionsSource}-higho`,
        source: auxState.m2ComaM1CorrectionsSource ?? '',
        target: 'higho',
        animated: true,
        className: 'active',
      });
    }

    // Check statick boxes state
    // active: Enabled and receiving input
    // idle: Enabled and waiting for input
    // inacive: Disabled

    // Tip/Tilt
    let tiptiltState;
    if (auxState.m2TipTiltEnable) {
      if (sourceEdges.filter((n) => n.target === 'tiptilt').length > 0) {
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
    if (auxState.mountOffload) {
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
    let focusState;
    if (auxState.m2FocusEnable) {
      if (sourceEdges.filter((n) => n.target === 'focus').length > 0) {
        focusState = 'active';
      } else {
        focusState = 'idle';
      }
    } else {
      focusState = 'inactive';
    }
    initialNodes.find((n) => n.id === 'focus')!.className = focusState;

    // Coma
    let comaState;
    if (auxState.m2ComaEnable) {
      if (sourceEdges.filter((n) => n.target === 'coma').length > 0) {
        comaState = 'active';
      } else {
        comaState = 'idle';
      }
    } else {
      comaState = 'inactive';
    }
    initialNodes.find((n) => n.id === 'coma')!.className = comaState;

    // High-O
    let highoState;
    if (auxState.m1CorrectionsEnable) {
      if (sourceEdges.filter((n) => n.target === 'higho').length > 0) {
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
      sourceNodes.map((n, i) => (n.position.x = i * 100));
    }

    setNodes([...sourceNodes, ...initialNodes]);
    setEdges([...sourceEdges, ...initialEdges]);
    // setTimeout(() => fitView(), 100)
  }, [state]);

  return (
    <div className="diagram">
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        proOptions={{ hideAttribution: true }}
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
