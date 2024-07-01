import { useContext, useEffect, useState } from "react"
import { AuthContext } from "@Contexts/Auth/AuthProvider"
import { Dropdown } from "primereact/dropdown"
import { MultiSelect } from "primereact/multiselect"
import { Checkbox } from "primereact/checkbox"
import { BrokenChain, ConnectedChain } from "./Chain"
import { Button } from "primereact/button"
import { GuideLoopType } from "@/types"
import { useGetGuideLoop, useUpdateGuideLoop } from "@gql/configs/GuideLoop"
import { Altair, GeMS } from "./AdaptiveOptics"
import { VariablesContext } from "@Contexts/Variables/VariablesProvider"
import { useGuideDisable, useGuideEnable } from "@gql/server/GuideState"

export function Configuration() {
  const { canEdit } = useContext(AuthContext)
  const { configuration } = useContext(VariablesContext)
  const [state, setState] = useState<GuideLoopType>({
    m1CorrectionsEnable: true,
    m2ComaM1CorrectionsSource: "OIWFS",
  } as GuideLoopType)
  const getGuideLoop = useGetGuideLoop()
  const updateGuideLoop = useUpdateGuideLoop()
  const guideEnable = useGuideEnable()
  const guideDisable = useGuideDisable()

  useEffect(() => {
    getGuideLoop({
      onCompleted(data) {
        setState(data.guideLoop)
      },
    })
  }, [])

  function modifyGuideLoop(name: string, value: boolean | string) {
    updateGuideLoop({
      variables: {
        pk: state.pk,
        [name]: value,
      },
      onCompleted(data) {
        setState(data.updateGuideLoop)
      },
    })
  }

  function translateStateGuideInput() {
    let m2Inputs = []
    if (state.m2TipTiltEnable) {
      if (state.m2TipTiltSource.split(",").includes("OIWFS")) {
        m2Inputs.push("OIWFS")
      }
    }
    let m1Input = state.m2ComaM1CorrectionsSource
    let [probeFrom, probeTo] = state.probeTracking.split("➡")

    return {
      m2Inputs: m2Inputs,
      m2Coma: state.m2ComaEnable,
      m1Input: m1Input,
      mountOffload: state.mountOffload,
      daytimeMode: state.daytimeMode,
      probeGuide: {
        from:
          probeFrom === "OI"
            ? "GMOS_OIWFS"
            : probeFrom === "P1"
            ? "PWFS_1"
            : "PWFS_2",
        to:
          probeFrom === "OI"
            ? "GMOS_OIWFS"
            : probeFrom === "P1"
            ? "PWFS_1"
            : "PWFS_2",
      },
    }
  }

  let aoSystem = null
  if (
    (state.m2TipTiltSource &&
      state.m2TipTiltSource.split(",").includes("GAOS")) ||
    (state.m2FocusSource && state.m2FocusSource.split(",").includes("GAOS")) ||
    state.m2ComaM1CorrectionsSource === "GAOS"
  ) {
    if (configuration.site === "GN") {
      aoSystem = <Altair />
    } else if (configuration.site === "GS") {
      aoSystem = <GeMS />
    }
  }

  return (
    <>
      <div className="configuration">
        <div className="body">
          <span className="label" style={{ gridArea: "l1" }}>
            M2 Tip/Tilt
          </span>
          <Checkbox
            style={{ gridArea: "s1" }}
            disabled={!canEdit}
            checked={state.m2TipTiltEnable}
            onChange={() =>
              modifyGuideLoop("m2TipTiltEnable", !state.m2TipTiltEnable)
            }
          />
          <MultiSelect
            value={
              state.m2TipTiltSource
                ? state.m2TipTiltSource.split(",")
                : undefined
            }
            onChange={(e) =>
              modifyGuideLoop("m2TipTiltSource", e.value.join(","))
            }
            options={[
              // { label: "PWFS1", value: "PWFS1" },
              // { label: "PWFS2", value: "PWFS2" },
              { label: "OIWFS", value: "OIWFS" },
              // { label: "GAOS", value: "GAOS" },
            ]}
            placeholder="Select sources"
            maxSelectedLabels={3}
            showClear={false}
            showSelectAll={false}
            style={{ gridArea: "d1" }}
            disabled={!canEdit || !state.m2TipTiltEnable}
          />
          <div
            className="lever"
            onClick={() =>
              modifyGuideLoop("m2TipTiltFocusLink", !state.m2TipTiltFocusLink)
            }
          >
            {state.m2TipTiltFocusLink ? <ConnectedChain /> : <BrokenChain />}
          </div>
          <span className="label" style={{ gridArea: "l2" }}>
            M2 Focus
          </span>
          <Checkbox
            style={{ gridArea: "s2" }}
            disabled={!canEdit}
            checked={state.m2FocusEnable}
            onChange={() =>
              modifyGuideLoop("m2FocusEnable", !state.m2FocusEnable)
            }
          />
          <MultiSelect
            value={
              state.m2TipTiltFocusLink
                ? state.m2TipTiltSource
                  ? state.m2TipTiltSource.split(",")
                  : undefined
                : state.m2FocusSource
                ? state.m2FocusSource.split(",")
                : undefined
            }
            onChange={(e) =>
              modifyGuideLoop("m2FocusSource", e.value.join(","))
            }
            options={[
              // { label: "PWFS1", value: "PWFS1" },
              // { label: "PWFS2", value: "PWFS2" },
              { label: "OIWFS", value: "OIWFS" },
              // { label: "GAOS", value: "GAOS" },
            ]}
            placeholder="Select sources"
            maxSelectedLabels={3}
            showClear={false}
            showSelectAll={false}
            style={{ gridArea: "d2" }}
            disabled={
              !canEdit || state.m2TipTiltFocusLink || !state.m2FocusEnable
            }
          />
          <span className="label" style={{ gridArea: "l3" }}>
            M2 Coma
          </span>
          <Checkbox
            disabled={!canEdit}
            checked={state.m2ComaEnable}
            onChange={() =>
              modifyGuideLoop("m2ComaEnable", !state.m2ComaEnable)
            }
          />
          <Dropdown
            style={{ gridArea: "d3" }}
            disabled={
              !canEdit || (!state.m2ComaEnable && !state.m1CorrectionsEnable)
            }
            value={state.m2ComaM1CorrectionsSource}
            // options={["PWFS1", "PWFS2", "PWFS1 & PWFS2", "OIWFS", "GAOS"]}
            options={["OIWFS"]}
            onChange={(e) =>
              modifyGuideLoop("m2ComaM1CorrectionsSource", e.target.value)
            }
            placeholder="Select a source"
          />
          <span className="label" style={{ gridArea: "l4" }}>
            M1 Corrections
          </span>
          <Checkbox
            style={{ gridArea: "s4" }}
            disabled={!canEdit}
            checked={state.m1CorrectionsEnable}
            onChange={() =>
              // modifyGuideLoop("m1CorrectionsEnable", !state.m1CorrectionsEnable)
              modifyGuideLoop("m1CorrectionsEnable", true)
            }
          />
          <span className="label" style={{ gridArea: "l5" }}>
            Mount offload
          </span>
          <Checkbox
            style={{ gridArea: "s5" }}
            disabled={!canEdit}
            checked={state.mountOffload}
            onChange={() =>
              modifyGuideLoop("mountOffload", !state.mountOffload)
            }
          />
          <span className="label" style={{ gridArea: "l6" }}>
            Daytime mode
          </span>
          <Checkbox
            style={{ gridArea: "s6" }}
            disabled={!canEdit}
            checked={state.daytimeMode}
            onChange={() => modifyGuideLoop("daytimeMode", !state.daytimeMode)}
          />
          <span className="label" style={{ gridArea: "l7" }}>
            Probe tracking
          </span>
          <Dropdown
            style={{ gridArea: "d7" }}
            disabled={!canEdit}
            value={state.probeTracking}
            options={[
              "OI➡OI",
              "OI➡P1",
              "OI➡P2",
              "P1➡OI",
              "P1➡P1",
              "P1➡P2",
              "P2➡OI",
              "P2➡P1",
              "P2➡P2",
              // "NONE",
            ]}
            onChange={(e) => modifyGuideLoop("probeTracking", e.target.value)}
            placeholder="Select a tracking"
          />
        </div>
        <div className="buttons">
          <Button
            disabled={!canEdit}
            onClick={() =>
              guideEnable({
                variables: {
                  config: translateStateGuideInput(),
                },
                onCompleted(data) {
                  // console.log(data)
                },
              })
            }
          >
            Enable
          </Button>
          <Button
            disabled={!canEdit}
            onClick={() =>
              guideDisable({
                onCompleted(data) {
                  // console.log(data)
                },
              })
            }
          >
            Disable
          </Button>
        </div>
      </div>
      {aoSystem}
    </>
  )
}
