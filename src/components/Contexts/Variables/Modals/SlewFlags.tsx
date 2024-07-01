import { useContext } from "react"
import { Dialog } from "primereact/dialog"
import { AuthContext } from "@Contexts/Auth/AuthProvider"
import { InputSwitch } from "primereact/inputswitch"
import { VariablesContext } from "../VariablesProvider"
import { SlewFlagsType } from "@/types"
import { useUpdateSlewFlags } from "@gql/configs/SlewFlags"

export function SlewFlags() {
  const { canEdit } = useContext(AuthContext)
  const { slewVisible, setSlewVisible, slewFlags, setSlewFlags } =
    useContext(VariablesContext)
  const updateSlewFlags = useUpdateSlewFlags()

  function updateFlags(flagName: string, value: boolean) {
    updateSlewFlags({
      variables: {
        pk: slewFlags.pk,
        [flagName]: value,
      },
      onCompleted: (data) => {
        setSlewFlags(data.updateSlewFlags)
      },
    })
  }

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
          onChange={() =>
            updateFlags("zeroChopThrow", !slewFlags.zeroChopThrow)
          }
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>
          Zero Source Offset
        </span>
        <InputSwitch
          disabled={!canEdit}
          checked={slewFlags.zeroSourceOffset}
          onChange={() =>
            updateFlags("zeroSourceOffset", !slewFlags.zeroSourceOffset)
          }
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>
          Zero Source Diff Track
        </span>
        <InputSwitch
          disabled={!canEdit}
          checked={slewFlags.zeroSourceDiffTrack}
          onChange={() =>
            updateFlags("zeroSourceDiffTrack", !slewFlags.zeroSourceDiffTrack)
          }
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>
          Zero Mount Offset
        </span>
        <InputSwitch
          disabled={!canEdit}
          checked={slewFlags.zeroMountOffset}
          onChange={() =>
            updateFlags("zeroMountOffset", !slewFlags.zeroMountOffset)
          }
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>
          Zero Mount Diff Track
        </span>
        <InputSwitch
          disabled={!canEdit}
          checked={slewFlags.zeroMountDiffTrack}
          onChange={() =>
            updateFlags("zeroMountDiffTrack", !slewFlags.zeroMountDiffTrack)
          }
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>
          Shortcircuit Target Filter
        </span>
        <InputSwitch
          disabled={!canEdit}
          checked={slewFlags.shortcircuitTargetFilter}
          onChange={() =>
            updateFlags(
              "shortcircuitTargetFilter",
              !slewFlags.shortcircuitTargetFilter
            )
          }
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>
          Shortcircuit Mount Filter
        </span>
        <InputSwitch
          disabled={!canEdit}
          checked={slewFlags.shortcircuitMountFilter}
          onChange={() =>
            updateFlags(
              "shortcircuitMountFilter",
              !slewFlags.shortcircuitMountFilter
            )
          }
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>
          Reset Pointing
        </span>
        <InputSwitch
          disabled={!canEdit}
          checked={slewFlags.resetPointing}
          onChange={() =>
            updateFlags("resetPointing", !slewFlags.resetPointing)
          }
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>
          Stop Guide
        </span>
        <InputSwitch
          disabled={!canEdit}
          checked={slewFlags.stopGuide}
          onChange={() => updateFlags("stopGuide", !slewFlags.stopGuide)}
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>
          Zero Guide Offset
        </span>
        <InputSwitch
          disabled={!canEdit}
          checked={slewFlags.zeroGuideOffset}
          onChange={() =>
            updateFlags("zeroGuideOffset", !slewFlags.zeroGuideOffset)
          }
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>
          Zero Instrument Offset
        </span>
        <InputSwitch
          disabled={!canEdit}
          checked={slewFlags.zeroInstrumentOffset}
          onChange={() =>
            updateFlags("zeroInstrumentOffset", !slewFlags.zeroInstrumentOffset)
          }
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>
          Autopark P1 WFS
        </span>
        <InputSwitch
          disabled={!canEdit}
          checked={slewFlags.autoparkPwfs1}
          onChange={() =>
            updateFlags("autoparkPwfs1", !slewFlags.autoparkPwfs1)
          }
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>
          Autopark P2 WFS
        </span>
        <InputSwitch
          disabled={!canEdit}
          checked={slewFlags.autoparkPwfs2}
          onChange={() =>
            updateFlags("autoparkPwfs2", !slewFlags.autoparkPwfs2)
          }
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>
          Autopark OI WFS
        </span>
        <InputSwitch
          disabled={!canEdit}
          checked={slewFlags.autoparkOiwfs}
          onChange={() =>
            updateFlags("autoparkOiwfs", !slewFlags.autoparkOiwfs)
          }
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>
          Autopark Gems
        </span>
        <InputSwitch
          disabled={!canEdit}
          checked={slewFlags.autoparkGems}
          onChange={() => updateFlags("autoparkGems", !slewFlags.autoparkGems)}
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>
          Autopark AO WFS
        </span>
        <InputSwitch
          disabled={!canEdit}
          checked={slewFlags.autoparkAowfs}
          onChange={() =>
            updateFlags("autoparkAowfs", !slewFlags.autoparkAowfs)
          }
        />
      </div>
    </Dialog>
  )
}
