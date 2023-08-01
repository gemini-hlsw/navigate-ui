import { useContext } from "react"
import { BaseTarget } from "../../../../types"
import { TelescopeContext } from "../../TelescopeProvider"
import { Target } from "../Target"
import { Dropdown } from "primereact/dropdown"
import { AuthContext } from "../../../Auth/AuthProvider"

export function Oiwfs() {
  const { scienceTarget, setGuideTarget } = useContext(TelescopeContext)
  const { canEdit } = useContext(AuthContext)

  let displayTargets: JSX.Element[] = []
  scienceTarget.guideTargets?.map((target: BaseTarget, index: number) => {
    displayTargets.push(
      <Target
        key={`blind-target-${index}`}
        target={target}
        selectTarget={setGuideTarget}
      />
    )
  })

  return (
    <div className="guider mb-5">
      <div className="target">
        <ul className="target-list">
          {displayTargets}
        </ul>
      </div>
      {/* <div className="guider-dropdown">
        <span></span>
        <Dropdown disabled={!canEdit} value={'normalguiding'} options={[{ label: 'Normal Guiding', value: 'normalguiding' }]} />
      </div> */}
    </div>
  )
}