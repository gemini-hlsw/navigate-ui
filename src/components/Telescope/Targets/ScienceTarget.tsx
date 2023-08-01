import { useContext } from "react"
import { BaseTarget } from "../../../types"
import { TelescopeContext } from "../TelescopeProvider"
import { Target } from "./Target"
import { SelectedTarget } from "./SelectedTarget"

interface TargetI {
  type: string
}

export function ScienceTarget({ type }: TargetI) {
  const { baseTarget, setBaseTarget, scienceTarget } = useContext(TelescopeContext)

  let displayTargets: JSX.Element[] = []
  displayTargets.push(
    <Target
      key={`science-target`}
      target={scienceTarget}
      selectTarget={setBaseTarget}
    />
  )
  scienceTarget.blindTargets?.map((target: BaseTarget, index: number) => {
    displayTargets.push(
      <Target
        key={`blind-target-${index}`}
        target={target}
        selectTarget={setBaseTarget}
      />
    )
  })

  return (
    <div className="target">
      <SelectedTarget target={baseTarget} />
      <ul className="target-list">
        {displayTargets}
      </ul>
    </div>
  )
}