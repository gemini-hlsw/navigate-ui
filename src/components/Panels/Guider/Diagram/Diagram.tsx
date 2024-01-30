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
    getGuideLoop({
      fetchPolicy: "no-cache",
      onCompleted(data) {
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
        className: "active",
      })
    }

    // Check statick boxes state
    // active: Enabled and receiving input
    // idle: Enabled and waiting for input
    // inacive: Disabled

    // Tip/Tilt
    let tiptiltState
    if (state.m2TipTiltEnable) {
      if (sourceEdges.filter((n) => n.target === "tiptilt").length > 0) {
        tiptiltState = "active"
      } else {
        tiptiltState = "idle"
      }
    } else {
      tiptiltState = "inactive"
    }
    initialNodes.filter((n) => n.id === "tiptilt")[0].className = tiptiltState

    // Mount
    let mountState = "active"
    if (state.mountOffload) {
      if (tiptiltState === "active") {
        mountState = "active"
      } else {
        mountState = "idle"
      }
    } else {
      mountState = "inactive"
    }
    initialNodes.filter((n) => n.id === "mount")[0].className = mountState
    initialEdges.filter((n) => n.id === "tiptilt-mount")[0].className =
      mountState

    // Focus
    let focusState
    if (state.m2FocusEnable) {
      if (sourceEdges.filter((n) => n.target === "focus").length > 0) {
        focusState = "active"
      } else {
        focusState = "idle"
      }
    } else {
      focusState = "inactive"
    }
    initialNodes.filter((n) => n.id === "focus")[0].className = focusState

    // Coma
    let comaState
    if (state.m2ComaEnable) {
      if (sourceEdges.filter((n) => n.target === "coma").length > 0) {
        comaState = "active"
      } else {
        comaState = "idle"
      }
    } else {
      comaState = "inactive"
    }
    initialNodes.filter((n) => n.id === "coma")[0].className = comaState

    // High-O
    let highoState
    if (state.m1CorrectionsEnable) {
      if (sourceEdges.filter((n) => n.target === "higho").length > 0) {
        highoState = "active"
      } else {
        highoState = "idle"
      }
    } else {
      highoState = "inactive"
    }
    initialNodes.filter((n) => n.id === "higho")[0].className = highoState

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
