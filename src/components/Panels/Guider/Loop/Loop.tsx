import { Configuration } from "./Configuration"
import { Altair, GeMS } from "./AdaptiveOptics"

export function Loop() {
  return (
    <div className="loop">
      <div className="loop-body">
        <Configuration />
        <Altair />
        {/* <GeMS /> */}
      </div>
    </div>
  )
}
