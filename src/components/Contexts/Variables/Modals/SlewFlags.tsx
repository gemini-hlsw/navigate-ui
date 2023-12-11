import { useContext } from "react"
import { Dialog } from "primereact/dialog"
import { AuthContext } from "@Contexts/Auth/AuthProvider"
import { InputSwitch } from "primereact/inputswitch"
import { VariablesContext } from "../VariablesProvider"
import { SlewFlagsType } from "@/types"
import { useUpdateSlewFlags } from "@gql/configs/SlewFlags"

export function SlewFlags() {
  const { canEdit } = useContext(AuthContext)
  const { slewVisible, setSlewVisible, configuration, setConfiguration } =
    useContext(VariablesContext)
  const updateSlewFlags = useUpdateSlewFlags()

  function updateFlags(flagName: string, value: boolean) {
    updateSlewFlags({
      variables: {
        pk: configuration.slewFlags?.pk,
        [flagName]: value,
      },
      onCompleted: (data) => {
        setConfiguration({ ...configuration, slewFlags: data.updateSlewFlags })
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
          checked={configuration.slewFlags?.zeroChopThrow}
          onChange={() =>
            updateFlags(
              "zeroChopThrow",
              !configuration.slewFlags?.zeroChopThrow
            )
          }
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>
          Zero Source Offset
        </span>
        <InputSwitch
          disabled={!canEdit}
          checked={configuration.slewFlags?.zeroSourceOffset}
          onChange={() =>
            updateFlags(
              "zeroSourceOffset",
              !configuration.slewFlags?.zeroSourceOffset
            )
          }
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>
          Zero Source Diff Track
        </span>
        <InputSwitch
          disabled={!canEdit}
          checked={configuration.slewFlags?.zeroSourceDiffTrack}
          onChange={() =>
            updateFlags(
              "zeroSourceDiffTrack",
              !configuration.slewFlags?.zeroSourceDiffTrack
            )
          }
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>
          Zero Mount Offset
        </span>
        <InputSwitch
          disabled={!canEdit}
          checked={configuration.slewFlags?.zeroMountOffset}
          onChange={() =>
            updateFlags(
              "zeroMountOffset",
              !configuration.slewFlags?.zeroMountOffset
            )
          }
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>
          Zero Mount Diff Track
        </span>
        <InputSwitch
          disabled={!canEdit}
          checked={configuration.slewFlags?.zeroMountDiffTrack}
          onChange={() =>
            updateFlags(
              "zeroMountDiffTrack",
              !configuration.slewFlags?.zeroMountDiffTrack
            )
          }
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>
          Shortcircuit Target Filter
        </span>
        <InputSwitch
          disabled={!canEdit}
          checked={configuration.slewFlags?.shortcircuitTargetFilter}
          onChange={() =>
            updateFlags(
              "shortcircuitTargetFilter",
              !configuration.slewFlags?.shortcircuitTargetFilter
            )
          }
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>
          Shortcircuit Mount Filter
        </span>
        <InputSwitch
          disabled={!canEdit}
          checked={configuration.slewFlags?.shortcircuitMountFilter}
          onChange={() =>
            updateFlags(
              "shortcircuitMountFilter",
              !configuration.slewFlags?.shortcircuitMountFilter
            )
          }
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>
          Reset Pointing
        </span>
        <InputSwitch
          disabled={!canEdit}
          checked={configuration.slewFlags?.resetPointing}
          onChange={() =>
            updateFlags(
              "resetPointing",
              !configuration.slewFlags?.resetPointing
            )
          }
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>
          Stop Guide
        </span>
        <InputSwitch
          disabled={!canEdit}
          checked={configuration.slewFlags?.stopGuide}
          onChange={() =>
            updateFlags("stopGuide", !configuration.slewFlags?.stopGuide)
          }
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>
          Zero Guide Offset
        </span>
        <InputSwitch
          disabled={!canEdit}
          checked={configuration.slewFlags?.zeroGuideOffset}
          onChange={() =>
            updateFlags(
              "zeroGuideOffset",
              !configuration.slewFlags?.zeroGuideOffset
            )
          }
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>
          Zero Instrument Offset
        </span>
        <InputSwitch
          disabled={!canEdit}
          checked={configuration.slewFlags?.zeroInstrumentOffset}
          onChange={() =>
            updateFlags(
              "zeroInstrumentOffset",
              !configuration.slewFlags?.zeroInstrumentOffset
            )
          }
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>
          Autopark P1 WFS
        </span>
        <InputSwitch
          disabled={!canEdit}
          checked={configuration.slewFlags?.autoparkPwfs1}
          onChange={() =>
            updateFlags(
              "autoparkPwfs1",
              !configuration.slewFlags?.autoparkPwfs1
            )
          }
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>
          Autopark P2 WFS
        </span>
        <InputSwitch
          disabled={!canEdit}
          checked={configuration.slewFlags?.autoparkPwfs2}
          onChange={() =>
            updateFlags(
              "autoparkPwfs2",
              !configuration.slewFlags?.autoparkPwfs2
            )
          }
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>
          Autopark OI WFS
        </span>
        <InputSwitch
          disabled={!canEdit}
          checked={configuration.slewFlags?.autoparkOiwfs}
          onChange={() =>
            updateFlags(
              "autoparkOiwfs",
              !configuration.slewFlags?.autoparkOiwfs
            )
          }
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>
          Autopark Gems
        </span>
        <InputSwitch
          disabled={!canEdit}
          checked={configuration.slewFlags?.autoparkGems}
          onChange={() =>
            updateFlags("autoparkGems", !configuration.slewFlags?.autoparkGems)
          }
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>
          Autopark AO WFS
        </span>
        <InputSwitch
          disabled={!canEdit}
          checked={configuration.slewFlags?.autoparkAowfs}
          onChange={() =>
            updateFlags(
              "autoparkAowfs",
              !configuration.slewFlags?.autoparkAowfs
            )
          }
        />
      </div>
    </Dialog>
  )
}
