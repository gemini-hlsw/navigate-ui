import { useContext } from "react"
import { Dialog } from "primereact/dialog"
import { AuthContext } from "@Contexts/Auth/AuthProvider"
import { InputSwitch } from "primereact/inputswitch"
import { VariablesContext } from "../VariablesProvider"

export function SlewFlags() {
  const { canEdit } = useContext(AuthContext)
  const { slewVisible, setSlewVisible, slewFlags, setSlewFlags } =
    useContext(VariablesContext)

  return (
    <Dialog
      header="Set slew flags"
      visible={slewVisible}
      modal
      onHide={() => setSlewVisible(false)}
    >
      <div className="slew-flags">
        <span style={{ textAlign: "center", alignSelf: "center" }}>
          Zero Chop Throw
        </span>
        <InputSwitch
          disabled={!canEdit}
          checked={slewFlags.zeroChopThrow}
          onChange={(e) =>
            setSlewFlags({
              ...slewFlags,
              zeroChopThrow: !slewFlags.zeroChopThrow,
            })
          }
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>
          Zero Source Offset
        </span>
        <InputSwitch
          disabled={!canEdit}
          checked={slewFlags.zeroSourceOffset}
          onChange={(e) =>
            setSlewFlags({
              ...slewFlags,
              zeroSourceOffset: !slewFlags.zeroSourceOffset,
            })
          }
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>
          Zero Source Diff Track
        </span>
        <InputSwitch
          disabled={!canEdit}
          checked={slewFlags.zeroSourceDiffTrack}
          onChange={(e) =>
            setSlewFlags({
              ...slewFlags,
              zeroSourceDiffTrack: !slewFlags.zeroSourceDiffTrack,
            })
          }
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>
          Zero Mount Offset
        </span>
        <InputSwitch
          disabled={!canEdit}
          checked={slewFlags.zeroMountOffset}
          onChange={(e) =>
            setSlewFlags({
              ...slewFlags,
              zeroMountOffset: !slewFlags.zeroMountOffset,
            })
          }
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>
          Zero Mount Diff Track
        </span>
        <InputSwitch
          disabled={!canEdit}
          checked={slewFlags.zeroMountDiffTrack}
          onChange={(e) =>
            setSlewFlags({
              ...slewFlags,
              zeroMountDiffTrack: !slewFlags.zeroMountDiffTrack,
            })
          }
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>
          Shortcircuit Target Filter
        </span>
        <InputSwitch
          disabled={!canEdit}
          checked={slewFlags.shortcircuitTargetFilter}
          onChange={(e) =>
            setSlewFlags({
              ...slewFlags,
              shortcircuitTargetFilter: !slewFlags.shortcircuitTargetFilter,
            })
          }
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>
          Shortcircuit Mount Filter
        </span>
        <InputSwitch
          disabled={!canEdit}
          checked={slewFlags.shortcircuitMountFilter}
          onChange={(e) =>
            setSlewFlags({
              ...slewFlags,
              shortcircuitMountFilter: !slewFlags.shortcircuitMountFilter,
            })
          }
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>
          Reset Pointing
        </span>
        <InputSwitch
          disabled={!canEdit}
          checked={slewFlags.resetPointing}
          onChange={(e) =>
            setSlewFlags({
              ...slewFlags,
              resetPointing: !slewFlags.resetPointing,
            })
          }
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>
          Stop Guide
        </span>
        <InputSwitch
          disabled={!canEdit}
          checked={slewFlags.stopGuide}
          onChange={(e) =>
            setSlewFlags({ ...slewFlags, stopGuide: !slewFlags.stopGuide })
          }
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>
          Zero Guide Offset
        </span>
        <InputSwitch
          disabled={!canEdit}
          checked={slewFlags.zeroGuideOffset}
          onChange={(e) =>
            setSlewFlags({
              ...slewFlags,
              zeroGuideOffset: !slewFlags.zeroGuideOffset,
            })
          }
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>
          Zero Instrument Offset
        </span>
        <InputSwitch
          disabled={!canEdit}
          checked={slewFlags.zeroInstrumentOffset}
          onChange={(e) =>
            setSlewFlags({
              ...slewFlags,
              zeroInstrumentOffset: !slewFlags.zeroInstrumentOffset,
            })
          }
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>
          Autopark P1 WFS
        </span>
        <InputSwitch
          disabled={!canEdit}
          checked={slewFlags.autoparkPwfs1}
          onChange={(e) =>
            setSlewFlags({
              ...slewFlags,
              autoparkPwfs1: !slewFlags.autoparkPwfs1,
            })
          }
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>
          Autopark P2 WFS
        </span>
        <InputSwitch
          disabled={!canEdit}
          checked={slewFlags.autoparkPwfs2}
          onChange={(e) =>
            setSlewFlags({
              ...slewFlags,
              autoparkPwfs2: !slewFlags.autoparkPwfs2,
            })
          }
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>
          Autopark OI WFS
        </span>
        <InputSwitch
          disabled={!canEdit}
          checked={slewFlags.autoparkOiwfs}
          onChange={(e) =>
            setSlewFlags({
              ...slewFlags,
              autoparkOiwfs: !slewFlags.autoparkOiwfs,
            })
          }
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>
          Autopark Gems
        </span>
        <InputSwitch
          disabled={!canEdit}
          checked={slewFlags.autoparkGems}
          onChange={(e) =>
            setSlewFlags({
              ...slewFlags,
              autoparkGems: !slewFlags.autoparkGems,
            })
          }
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>
          Autopark AO WFS
        </span>
        <InputSwitch
          disabled={!canEdit}
          checked={slewFlags.autoparkAowfs}
          onChange={(e) =>
            setSlewFlags({
              ...slewFlags,
              autoparkAowfs: !slewFlags.autoparkAowfs,
            })
          }
        />
      </div>
    </Dialog>
  )
}
