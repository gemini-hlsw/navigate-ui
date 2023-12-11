import { useContext, useEffect, useState } from "react"
import { Dialog } from "primereact/dialog"
import { VariablesContext } from "../VariablesProvider"
import { TargetType } from "@/types"
import { Dropdown } from "primereact/dropdown"
import { InputNumber } from "primereact/inputnumber"
import { InputText } from "primereact/inputtext"
import { deg2dms, deg2hms, dms2deg, hms2deg } from "@/Helpers/functions"
import { Button } from "primereact/button"

export function Target() {
  const { configuration, setConfiguration, targetEdit, setTargetEdit } =
    useContext(VariablesContext)

  const [coordsType, setCoordsType] = useState("celestial")
  const [auxTarget, setAuxTarget] = useState({} as TargetType)
  const [c1String, setc1String] = useState<string | undefined>("")
  const [c2String, setc2String] = useState<string | undefined>("")

  useEffect(() => {
    if (targetEdit !== undefined) {
      setAuxTarget(targetEdit.target)
      if (targetEdit.target.type === "FIXED") {
        setc1String(targetEdit.target.az?.dms ?? "")
        setc2String(targetEdit.target.el?.dms ?? "")
        setCoordsType("horizontal")
      } else {
        setCoordsType("celestial")
        setc1String(targetEdit.target.ra?.hms ?? "")
        setc2String(targetEdit.target.dec?.dms ?? "")
      }
    }
  }, [targetEdit])

  function updateObservation() {
    let tIdx = targetEdit.targetIndex ?? 0
    let pIdx = targetEdit.probeIndex ?? -1
    if (configuration.observation !== undefined) {
      if (pIdx >= 0) {
        if (
          configuration.observation.guideProbes !== undefined &&
          configuration.observation.guideProbes[pIdx] !== undefined &&
          configuration.observation.guideProbes[pIdx].targets !== undefined
        ) {
          setConfiguration({
            ...configuration,
            observation: {
              ...configuration.observation,
              guideProbes: [
                ...configuration.observation?.guideProbes?.slice(0, pIdx),
                {
                  ...configuration.observation.guideProbes[pIdx],
                  targets: [
                    ...(
                      configuration.observation?.guideProbes[pIdx]
                        .targets as TargetType[]
                    )?.slice(0, tIdx),
                    auxTarget,
                    ...(
                      configuration.observation?.guideProbes[pIdx]
                        .targets as TargetType[]
                    )?.slice(tIdx + 1),
                  ],
                },
                ...configuration.observation?.guideProbes?.slice(pIdx + 1),
              ],
            },
          })
        }
      } else {
        if (configuration.observation.targets !== undefined) {
          setConfiguration({
            ...configuration,
            observation: {
              ...configuration.observation,
              targets: [
                ...configuration.observation?.targets?.slice(0, tIdx),
                auxTarget,
                ...configuration.observation?.targets?.slice(tIdx + 1),
              ],
            },
          })
        }
      }
    }
    setTargetEdit({
      isVisible: false,
      target: {} as TargetType,
      targetIndex: undefined,
      probeIndex: undefined,
    })
  }

  let footer = (
    <div className="modal-footer">
      <div className="right">
        <Button className="" label="Update" onClick={updateObservation} />
        <Button
          className="p-button-danger"
          label="Cancel"
          onClick={() =>
            setTargetEdit({
              isVisible: false,
              target: {} as TargetType,
              targetIndex: undefined,
              probeIndex: undefined,
            })
          }
        />
      </div>
    </div>
  )

  return (
    <Dialog
      header={`Edit target ${targetEdit.target.name}`}
      visible={targetEdit.isVisible}
      footer={footer}
      modal
      onHide={() =>
        setTargetEdit({
          isVisible: false,
          target: {} as TargetType,
          targetIndex: undefined,
          probeIndex: undefined,
        })
      }
    >
      <div className="target-edit">
        <span style={{ gridArea: "s1" }} className="label">
          Name
        </span>
        <InputText
          disabled={false}
          style={{ gridArea: "s2" }}
          value={auxTarget.name ?? ""}
          onChange={(e) => setAuxTarget({ ...auxTarget, name: e.target.value })}
        />
        <span style={{ gridArea: "l1" }} className="label">
          Coordinates
        </span>
        <Dropdown
          disabled={false}
          style={{ gridArea: "d1" }}
          value={coordsType}
          options={["celestial", "horizontal"]}
          onChange={(e) => {
            let stringC1 = ""
            let stringC2 = ""
            if (e.target.value === "celestial" && coordsType === "horizontal") {
              stringC1 = deg2hms(auxTarget.az?.degrees ?? 0)
              stringC2 = deg2dms(auxTarget.el?.degrees ?? 0)
              setAuxTarget({
                ...auxTarget,
                ra: {
                  degrees: auxTarget.az?.degrees,
                  hms: stringC1,
                },
                dec: {
                  degrees: auxTarget.el?.degrees,
                  dms: stringC2,
                },
                az: null,
                el: null,
                type: targetEdit.probeIndex !== undefined ? "GUIDE" : "SCIENCE",
              })
            } else if (
              e.target.value === "horizontal" &&
              coordsType === "celestial"
            ) {
              stringC1 = deg2dms(auxTarget.ra?.degrees ?? 0)
              stringC2 = deg2dms(auxTarget.dec?.degrees ?? 0)
              setAuxTarget({
                ...auxTarget,
                az: {
                  degrees: auxTarget.ra?.degrees,
                  dms: deg2dms(auxTarget.ra?.degrees ?? 0),
                },
                el: {
                  degrees: auxTarget.dec?.degrees,
                  dms: deg2dms(auxTarget.dec?.degrees ?? 0),
                },
                ra: null,
                dec: null,
                type: "FIXED",
              })
            }
            setc1String(stringC1)
            setc2String(stringC2)
            setCoordsType(e.target.value)
          }}
          placeholder="Select coordinates type"
        />
        <span style={{ gridArea: "t1" }} className="label">
          {coordsType === "celestial" ? "RA" : "Az"}
        </span>
        <InputNumber
          disabled={false}
          style={{ gridArea: "c11" }}
          value={
            coordsType === "celestial"
              ? auxTarget.ra?.degrees
              : auxTarget.az?.degrees
          }
          onValueChange={(e) => {
            let stringC1 = ""
            if (coordsType === "celestial") {
              stringC1 = deg2hms(e.target.value ?? 0)
              setAuxTarget({
                ...auxTarget,
                ra: {
                  degrees: e.target.value ?? undefined,
                  hms: stringC1,
                },
              })
            } else {
              stringC1 = deg2dms(e.target.value ?? 0)
              setAuxTarget({
                ...auxTarget,
                az: {
                  degrees: e.target.value ?? undefined,
                  dms: stringC1,
                },
              })
            }
          }}
          onBlur={(e) => {
            if (coordsType === "celestial") {
              setc1String(auxTarget.ra?.hms)
            } else {
              setc1String(auxTarget.az?.dms)
            }
          }}
        />
        <span style={{ gridArea: "f11" }} className="label">
          degrees
        </span>
        <InputText
          disabled={false}
          style={{ gridArea: "c12" }}
          value={c1String}
          onChange={(e) => {
            if (coordsType === "celestial") {
              setAuxTarget({
                ...auxTarget,
                ra: { degrees: hms2deg(e.target.value), hms: e.target.value },
              })
            } else {
              setAuxTarget({
                ...auxTarget,
                az: { degrees: dms2deg(e.target.value), dms: e.target.value },
              })
            }
            setc1String(e.target.value)
          }}
        />
        <span style={{ gridArea: "f12" }} className="label">
          {coordsType === "celestial" ? "hms" : "dms"}
        </span>
        <span style={{ gridArea: "t2" }} className="label">
          {coordsType === "celestial" ? "Dec" : "El"}
        </span>
        <InputNumber
          disabled={false}
          style={{ gridArea: "c21" }}
          value={
            coordsType === "celestial"
              ? auxTarget.dec?.degrees
              : auxTarget.el?.degrees
          }
          onValueChange={(e) => {
            let stringC2 = deg2dms(e.target.value ?? 0)
            if (coordsType === "celestial") {
              setAuxTarget({
                ...auxTarget,
                dec: {
                  degrees: e.target.value ?? undefined,
                  dms: stringC2,
                },
              })
            } else {
              setAuxTarget({
                ...auxTarget,
                el: {
                  degrees: e.target.value ?? undefined,
                  dms: stringC2,
                },
              })
            }
          }}
          onBlur={() => {
            if (coordsType === "celestial") {
              setc2String(auxTarget.dec?.dms)
            } else {
              setc2String(auxTarget.el?.dms)
            }
          }}
        />
        <span style={{ gridArea: "f21" }} className="label">
          degrees
        </span>
        <InputText
          disabled={false}
          style={{ gridArea: "c22" }}
          value={c2String}
          onChange={(e) => {
            if (coordsType === "celestial") {
              setAuxTarget({
                ...auxTarget,
                dec: { degrees: dms2deg(e.target.value), dms: e.target.value },
              })
            } else {
              setAuxTarget({
                ...auxTarget,
                el: { degrees: dms2deg(e.target.value), dms: e.target.value },
              })
            }
            setc2String(e.target.value)
          }}
        />
        <span style={{ gridArea: "f22" }} className="label">
          dms
        </span>
        <span style={{ gridArea: "s3" }} className="label">
          Epoch
        </span>
        <InputText
          disabled={auxTarget.type === "FIXED" ?? false}
          style={{ gridArea: "s4" }}
          value={(auxTarget.type === "FIXED" ? "" : auxTarget.epoch) ?? ""}
          onChange={(e) =>
            setAuxTarget({ ...auxTarget, epoch: e.target.value })
          }
        />
      </div>
    </Dialog>
  )
}
