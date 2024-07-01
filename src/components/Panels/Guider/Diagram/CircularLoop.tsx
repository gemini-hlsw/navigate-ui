import { useCallback } from "react"
import { Handle, Position } from "reactflow"

const handleStyle = { left: 10 }

export function CircularLoop({ text }: { text: string }) {
  return (
    <div className="text-updater-node">
      <Handle
        type="target"
        position={Position.Top}
        style={{ right: 5 }}
        isConnectable={true}
        id="c"
      />
      {text}
      <Handle
        type="source"
        position={Position.Top}
        id="a"
        style={{ left: 5 }}
        isConnectable={true}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={true}
      />
    </div>
  )
}
