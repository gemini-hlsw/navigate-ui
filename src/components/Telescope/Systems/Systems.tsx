import { useContext, useState } from "react"
import { Rotator } from "./Rotator"
import { Altair, Gems } from "./AdaptiveOptics"
import { AuthContext } from "../../Auth/AuthProvider"
import { Indicators } from "./Indicators"
import { AgMechanism } from "./AgMechanism"
import { BotSubsystems, TopSubsystems } from "./Subsystems"
import { Instrument } from "./Instrument"

export function Systems() {
  const { canEdit } = useContext(AuthContext)
  const [collapsed, setCollapsed] = useState<boolean>(false)

  function toggle() {
    setCollapsed(!collapsed)
  }

  return (
    <div className="systems">
      <Indicators canEdit={canEdit} />
      <div className={`grid-wrapper ${collapsed ? "collapsed" : ""}`}>
        <TopSubsystems canEdit={canEdit} />
        <AgMechanism canEdit={canEdit} />
        <BotSubsystems canEdit={canEdit} />
        <div className="expand-button" onClick={toggle}>
          <i className="pi pi-angle-right"></i>
        </div>
      </div>
      <div className="right">
        <Instrument canEdit={canEdit} />
        <Rotator canEdit={canEdit} />
        {/* <Gems canEdit={canEdit} /> */}
        <Altair canEdit={canEdit} />
      </div>
    </div>
  )
}
