import { useContext, useState } from "react"
import { Button } from "primereact/button"
import { Dropdown } from "primereact/dropdown"
import { InputNumber } from "primereact/inputnumber"
import { Slider } from "primereact/slider"
import { MCS, McsPark } from "../../../gql/server/Buttons"
// import { Instrument } from './Instrument';
import { Rotator } from "./Rotator"
import { Altair, Gems } from "./AdaptiveOptics"
import { AuthContext } from "../../Auth/AuthProvider"

const DOME_MODE = [
  { label: "MinVibration", value: "MinVibration" },
  { label: "Rome", value: "RM" },
  { label: "London", value: "LDN" },
  { label: "Istanbul", value: "IST" },
  { label: "Paris", value: "PRS" },
]

const SHUTTERS_MODE = [
  { label: "Tracking", value: "Tracking" },
  { label: "Rome", value: "RM" },
  { label: "London", value: "LDN" },
  { label: "Istanbul", value: "IST" },
  { label: "Paris", value: "PRS" },
]

export function Systems() {
  const { canEdit } = useContext(AuthContext)
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [domeMode, setDomeMode] = useState<string>("MinVibration")
  const [shuttersMode, setShuttersMode] = useState<string>("Tracking")
  const [aperture, setAperture] = useState<number>(90)
  const [WVGate, setWVGate] = useState<any>(50)
  const [EVGate, setEVGate] = useState<any>(50)

  function toggle() {
    setCollapsed(!collapsed)
  }

  return (
    <div className="systems">
      <div className="left">
        <MCS label="MCS" disabled={!canEdit} />
        <Button disabled={!canEdit} label="SCS" />
        <Button disabled={!canEdit} label="CRCS" />
        <Button disabled={!canEdit} label="PWFS1" />
        <Button disabled={!canEdit} label="PWFS2" />
        <Button disabled={!canEdit} label="OIWFS" />
        <Button disabled={!canEdit} label="AOWFS" />
        <Button disabled={!canEdit} label="Dome" />
        <Button disabled={!canEdit} label="Shuters" />
        <Button disabled={!canEdit} label="W VGate" />
        <Button disabled={!canEdit} label="E VGate" />
      </div>
      <div className={`grid-wrapper ${collapsed ? "collapsed" : ""}`}>
        <div className="top-left">
          <McsPark
            disabled={!canEdit}
            style={{ gridArea: "g11" }}
            label="Park"
          />
          <Button
            disabled={!canEdit}
            style={{ gridArea: "g12" }}
            label="Unwrap"
          />
          <Button
            disabled={!canEdit}
            style={{ gridArea: "g31" }}
            label="Park"
          />
          <Button
            disabled={!canEdit}
            style={{ gridArea: "g32" }}
            label="Unwrap"
          />
          <Button
            disabled={!canEdit}
            style={{ gridArea: "g41" }}
            label="Park"
          />
          <Button
            disabled={!canEdit}
            style={{ gridArea: "g42" }}
            label="Unwrap"
          />
          <Button
            disabled={!canEdit}
            style={{ gridArea: "g51" }}
            label="Park"
          />
          <Button
            disabled={!canEdit}
            style={{ gridArea: "g52" }}
            label="Unwrap"
          />
        </div>
        <div className="top-right">
          <div className="title">
            <span>AG Mechanisms</span>
          </div>
          <div className="ag-body">
            <span>Science Fold</span>
            <Button disabled={!canEdit} label="Park" />
            <span>AO Fold</span>
            <Button disabled={!canEdit} label="Park" />
            <span>AC Pickoff</span>
            <Button disabled={!canEdit} label="Park" />
            <span></span>
            <Button disabled={!canEdit} label="Park All" />
          </div>
        </div>
        <div className="bottom">
          <Button
            disabled={!canEdit}
            style={{ gridArea: "g11" }}
            label="Park"
          />
          <Button
            disabled={!canEdit}
            style={{ gridArea: "g21" }}
            label="Park"
          />
          <Button
            disabled={!canEdit}
            style={{ gridArea: "g31" }}
            label="Park"
          />
          <span
            style={{
              textAlign: "center",
              alignSelf: "center",
              gridArea: "g32",
            }}
          >
            Mode
          </span>
          <Dropdown
            disabled={!canEdit}
            style={{ gridArea: "g33" }}
            value={domeMode}
            options={DOME_MODE}
            onChange={(e) => setDomeMode(e.value)}
            placeholder="Select a Dome Mode"
          />
          <Button disabled={!canEdit} style={{ gridArea: "g36" }} label="Set" />
          <Button
            disabled={!canEdit}
            style={{ gridArea: "g41" }}
            label="Park"
          />
          <span
            style={{
              textAlign: "center",
              alignSelf: "center",
              gridArea: "g42",
            }}
          >
            Mode
          </span>
          <Dropdown
            disabled={!canEdit}
            style={{ gridArea: "g43" }}
            value={shuttersMode}
            options={SHUTTERS_MODE}
            onChange={(e) => setShuttersMode(e.value)}
            placeholder="Select a Shutters Mode"
          />
          <span
            style={{
              textAlign: "center",
              alignSelf: "center",
              gridArea: "g44",
            }}
          >
            Aperture
          </span>
          <InputNumber
            disabled={!canEdit}
            style={{ gridArea: "g45" }}
            value={aperture}
            onValueChange={(e) => setAperture(e.value ? e.value : 0)}
            mode="decimal"
          />
          <Button disabled={!canEdit} style={{ gridArea: "g46" }} label="Set" />
          <Button
            disabled={!canEdit}
            style={{ gridArea: "g51" }}
            label="Close"
          />
          <InputNumber
            disabled={!canEdit}
            style={{ gridArea: "g52" }}
            value={WVGate}
            onValueChange={(e) => setWVGate(e.value ? e.value : 0)}
            mode="decimal"
          />
          <Slider
            disabled={!canEdit}
            style={{ gridArea: "g53", marginTop: "10px" }}
            value={WVGate}
            onChange={(e) => setWVGate(e.value)}
          />
          <Button
            disabled={!canEdit}
            style={{ gridArea: "g56" }}
            label="Move"
          />
          <Button
            disabled={!canEdit}
            style={{ gridArea: "g61" }}
            label="Close"
          />
          <InputNumber
            disabled={!canEdit}
            style={{ gridArea: "g62" }}
            value={EVGate}
            onValueChange={(e) => setEVGate(e.value ? e.value : 0)}
            mode="decimal"
          />
          <Slider
            disabled={!canEdit}
            style={{ gridArea: "g63", marginTop: "10px" }}
            value={EVGate}
            onChange={(e) => setEVGate(e.value)}
          />
          <Button
            disabled={!canEdit}
            style={{ gridArea: "g66" }}
            label="Move"
          />
        </div>
        <div className="expand-button" onClick={toggle}>
          <i className="pi pi-angle-right"></i>
        </div>
      </div>
      <div className="right">
        {/* <Instrument canEdit={canEdit} /> */}
        <Rotator canEdit={canEdit} />
        {/* <Gems canEdit={canEdit} /> */}
        <Altair canEdit={canEdit} />
      </div>
    </div>
  )
}
