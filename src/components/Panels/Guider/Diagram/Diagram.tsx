import { useCallback, useEffect, useState } from "react"
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
} from "reactflow"
import "reactflow/dist/style.css"

const initialNodes: Node[] = [
  {
    id: "tiptilt",
    data: { label: "Tip/Tilt" },
    position: { x: -150, y: 100 },
    className: "idle",
  },
  {
    id: "focus",
    data: { label: "Focus" },
    position: { x: -50, y: 100 },
    className: "active",
    type: "output",
  },
  {
    id: "coma",
    data: { label: "Coma" },
    position: { x: 50, y: 100 },
    className: "active",
    type: "output",
  },
  {
    id: "higho",
    data: { label: "High O" },
    position: { x: 150, y: 100 },
    className: "active",
    type: "output",
  },
  {
    id: "mount",
    data: { label: "Mount" },
    position: { x: -150, y: 200 },
    className: "inactive",
    type: "output",
  },
]

const initialEdges: Edge[] = [
  {
    id: "tiptilt-mount",
    source: "tiptilt",
    target: "mount",
    animated: true,
    type: "smoothstep",
    className: "inactive",
  },
]

function Flow({}) {
  const [nodes, setNodes] = useState<Node[]>(initialNodes)
  const [edges, setEdges] = useState<Edge[]>(initialEdges)

  const { fitView } = useReactFlow()

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  )

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  )

  useEffect(() => {
    fitView()
  }, [nodes, edges])

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
        <Controls
          showZoom={false}
          showInteractive={false}
          position="bottom-right"
        />
      </ReactFlow>
    </div>
  )
}

export default function Diagram() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  )
}
