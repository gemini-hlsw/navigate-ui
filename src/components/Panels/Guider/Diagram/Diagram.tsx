import { GuideLoopType } from "@/types"
import { useGetGuideLoop } from "@gql/configs/GuideLoop"
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
    position: { x: 0, y: 100 },
    className: "active", // "active", "idle", "inactive"
  },
  {
    id: "focus",
    data: { label: "Focus" },
    position: { x: 100, y: 100 },
    className: "active",
    type: "output",
  },
  {
    id: "coma",
    data: { label: "Coma" },
    position: { x: 200, y: 100 },
    className: "active",
    type: "output",
  },
  {
    id: "higho",
    data: { label: "High O" },
    position: { x: 300, y: 100 },
    className: "active",
    type: "output",
  },
  {
    id: "mount",
    data: { label: "Mount" },
    position: { x: 0, y: 200 },
    className: "active",
    type: "output",
  },
]

const initialEdges: Edge[] = [
  {
    id: "tiptilt-mount",
    source: "tiptilt",
    target: "mount",
    animated: true,
    type: "bezier",
    className: "active",
  },
]

function Flow({}) {
  const [state, setState] = useState<GuideLoopType>({} as GuideLoopType)
  const [nodes, setNodes] = useState<Node[]>(initialNodes)
  const [edges, setEdges] = useState<Edge[]>(initialEdges)
  const { fitView } = useReactFlow()
  const getGuideLoop = useGetGuideLoop()

  function retrieveInfo() {
    console.log("Retrieving guide loop info")
    getGuideLoop({
      fetchPolicy: "no-cache",
      onCompleted(data) {
        console.log("Data")
        console.log(data)
        setState(data.guideLoop)
      },
    })
  }

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
    // fitView()
    console.log("State changed")
    // Get active sources first
    let sourceNodes: Node[] = []
    let sourceEdges: Edge[] = []
    if (state.m2TipTiltEnable && state.m2TipTiltSource) {
      state.m2TipTiltSource.split(",").map((source) => {
        sourceNodes.push({
          id: source,
          data: { label: source },
          position: { x: 0, y: 0 },
          className: "active",
          type: "input",
        })
        sourceEdges.push({
          id: `${source}-tiptilt`,
          source: source,
          target: "tiptilt",
          animated: true,
          type: "bezier",
          className: "active",
        })
      })
    }

    if (state.m2TipTiltFocusLink) {
      sourceNodes.map((n) => {
        sourceEdges.push({
          id: `${n.id}-focus`,
          source: n.id,
          target: "focus",
          animated: true,
          type: "bezier",
          className: "active",
        })
      })
    } else {
      if (state.m2FocusEnable && state.m2FocusSource) {
        state.m2FocusSource.split(",").map((s) => {
          if (sourceNodes.filter((n) => n.id === s).length === 0) {
            sourceNodes.push({
              id: s,
              data: { label: s },
              position: { x: 0, y: 0 },
              className: "active",
              type: "input",
            })
          }
          sourceEdges.push({
            id: `${s}-focus`,
            source: s,
            target: "focus",
            animated: true,
            type: "bezier",
            className: "active",
          })
        })
      }
    }

    if (state.m2ComaEnable) {
      let pos = sourceNodes
        .map((n) => n.id)
        .indexOf(state.m2ComaM1CorrectionsSource)
      if (pos === -1) {
        sourceNodes.push({
          id: state.m2ComaM1CorrectionsSource,
          data: { label: state.m2ComaM1CorrectionsSource },
          position: { x: 0, y: 0 },
          className: "active",
          type: "input",
        })
      } else {
        if (pos !== sourceNodes.length - 1) {
          sourceNodes.splice(
            sourceNodes.length - 1,
            0,
            sourceNodes.splice(pos, 1)[0]
          )
        }
      }
      sourceEdges.push({
        id: `${state.m2ComaM1CorrectionsSource}-coma`,
        source: state.m2ComaM1CorrectionsSource,
        target: "coma",
        animated: true,
        type: "bezier",
        className: "active",
      })
    }

    if (state.m1CorrectionsEnable) {
      let pos = sourceNodes
        .map((n) => n.id)
        .indexOf(state.m2ComaM1CorrectionsSource)
      if (pos === -1) {
        sourceNodes.push({
          id: state.m2ComaM1CorrectionsSource,
          data: { label: state.m2ComaM1CorrectionsSource },
          position: { x: 0, y: 0 },
          className: "active",
          type: "input",
        })
      } else {
        if (pos !== sourceNodes.length - 1) {
          sourceNodes.splice(
            sourceNodes.length - 1,
            0,
            sourceNodes.splice(pos, 1)[0]
          )
        }
      }
      sourceEdges.push({
        id: `${state.m2ComaM1CorrectionsSource}-higho`,
        source: state.m2ComaM1CorrectionsSource,
        target: "higho",
        animated: true,
        type: "bezier",
        className: "active",
      })
    }

    // Update static boxes colors
    initialNodes.filter((n) => n.id === "tiptilt")[0].className =
      state.m2TipTiltEnable ? "active" : "inactive"
    initialNodes.filter((n) => n.id === "mount")[0].className =
      state.m2TipTiltEnable ? "active" : "inactive"
    initialEdges.filter((n) => n.id === "tiptilt-mount")[0].className =
      state.m2TipTiltEnable ? "active" : "inactive"
    initialNodes.filter((n) => n.id === "focus")[0].className =
      state.m2FocusEnable ? "active" : "inactive"
    initialNodes.filter((n) => n.id === "coma")[0].className =
      state.m2ComaEnable ? "active" : "inactive"
    initialNodes.filter((n) => n.id === "higho")[0].className =
      state.m1CorrectionsEnable ? "active" : "inactive"

    // Check probe tracking

    let sourceN = sourceNodes.length
    if (sourceN) {
      sourceNodes.map((n, i) => (n.position.x = i * 100))
    }

    setNodes([...sourceNodes, ...initialNodes])
    setEdges([...sourceEdges, ...initialEdges])
    setTimeout(() => fitView(), 100)
  }, [state])

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
      <button onClick={() => retrieveInfo()} style={{ position: "absolute" }}>
        update
      </button>
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
