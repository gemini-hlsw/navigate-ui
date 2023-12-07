import { useCallback, useState } from "react"
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
    id: "1",
    data: { label: "PWFS2" },
    position: { x: 0, y: 0 },
    className: "active",
    type: "input",
  },
  {
    id: "2",
    data: { label: "Tip/Tilt" },
    position: { x: -150, y: 100 },
    className: "idle",
  },
  {
    id: "3",
    data: { label: "Focus" },
    position: { x: -50, y: 100 },
    className: "active",
    type: "output",
  },
  {
    id: "4",
    data: { label: "Coma" },
    position: { x: 50, y: 100 },
    className: "active",
    type: "output",
  },
  {
    id: "5",
    data: { label: "High O" },
    position: { x: 150, y: 100 },
    className: "active",
    type: "output",
  },
  {
    id: "6",
    data: { label: "Mount" },
    position: { x: -150, y: 200 },
    className: "inactive",
    type: "output",
  },
]

const initialEdges: Edge[] = [
  {
    id: "1-2",
    source: "1",
    target: "2",
    animated: true,
    type: "smoothstep",
    className: "active",
  },
  {
    id: "1-3",
    source: "1",
    target: "3",
    animated: true,
    type: "smoothstep",
    className: "active",
  },
  {
    id: "1-4",
    source: "1",
    target: "4",
    animated: true,
    type: "smoothstep",
    className: "active",
  },
  {
    id: "1-5",
    source: "1",
    target: "5",
    animated: true,
    type: "smoothstep",
    className: "active",
  },
  {
    id: "2-6",
    source: "2",
    target: "6",
    animated: false,
    type: "smoothstep",
    className: "inactive",
  },
]

const newNodes: Node[] = [
  {
    id: "1",
    data: { label: "PWFS1" },
    position: { x: 0, y: 0 },
    className: "active",
    type: "input",
  },
  {
    id: "2",
    data: { label: "Tip/Tilt" },
    position: { x: -150, y: 200 },
    className: "idle",
  },
  {
    id: "3",
    data: { label: "Focus" },
    position: { x: -50, y: 200 },
    className: "active",
    type: "output",
  },
  {
    id: "4",
    data: { label: "Coma" },
    position: { x: 50, y: 200 },
    className: "active",
    type: "output",
  },
  {
    id: "5",
    data: { label: "High O" },
    position: { x: 150, y: 200 },
    className: "active",
    type: "output",
  },
  {
    id: "6",
    data: { label: "Mount" },
    position: { x: -150, y: 300 },
    className: "inactive",
    type: "output",
  },
  {
    id: "7",
    data: { label: "middle" },
    position: { x: 0, y: 100 },
    className: "active",
  },
]

const newEdges: Edge[] = [
  {
    id: "1-7",
    source: "1",
    target: "7",
    animated: true,
    type: "smoothstep",
    className: "active",
  },
  {
    id: "7-2",
    source: "7",
    target: "2",
    animated: true,
    type: "smoothstep",
    className: "active",
  },
  {
    id: "7-3",
    source: "7",
    target: "3",
    animated: true,
    type: "smoothstep",
    className: "active",
  },
  {
    id: "7-4",
    source: "7",
    target: "4",
    animated: true,
    type: "smoothstep",
    className: "active",
  },
  {
    id: "7-5",
    source: "7",
    target: "5",
    animated: true,
    type: "smoothstep",
    className: "active",
  },
  {
    id: "2-6",
    source: "2",
    target: "6",
    animated: false,
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
      {/* <Button
        label="Diagram1"
        aria-label="Settings"
        onClick={() => {
          setNodes(initialNodes)
          setEdges(initialEdges)
          setTimeout(() => fitView(), 100)
        }}
      />
      <Button
        label="Diagram2"
        aria-label="Settings"
        onClick={() => {
          setNodes(newNodes)
          setEdges(newEdges)
          setTimeout(() => fitView(), 100)
        }}
      /> */}
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
