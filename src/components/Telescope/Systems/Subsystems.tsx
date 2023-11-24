import { Button } from "primereact/button"
import { Dropdown } from "primereact/dropdown"
import { InputNumber } from "primereact/inputnumber"
import { Slider } from "primereact/slider"
import { McsPark } from "../../../gql/server/Buttons"
import { useState } from "react"

export function TopSubsystems({ canEdit }: { canEdit: boolean }) {
  return (
    <div className="top-left">
      <McsPark disabled={!canEdit} style={{ gridArea: "g11" }} label="Park" />
      <Button disabled={!canEdit} style={{ gridArea: "g12" }} label="Unwrap" />
      <Button disabled={!canEdit} style={{ gridArea: "g31" }} label="Park" />
      <Button disabled={!canEdit} style={{ gridArea: "g32" }} label="Unwrap" />
      <Button disabled={!canEdit} style={{ gridArea: "g41" }} label="Park" />
      <Button disabled={!canEdit} style={{ gridArea: "g42" }} label="Unwrap" />
      <Button disabled={!canEdit} style={{ gridArea: "g51" }} label="Park" />
      <Button disabled={!canEdit} style={{ gridArea: "g52" }} label="Unwrap" />
    </div>
  )
}

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

export function BotSubsystems({ canEdit }: { canEdit: boolean }) {
  const [domeMode, setDomeMode] = useState("MinVibration")
  const [shuttersMode, setShuttersMode] = useState("Tracking")
  const [aperture, setAperture] = useState(90)
  const [WVGate, setWVGate] = useState<any>(50)
  const [EVGate, setEVGate] = useState<any>(50)

  return (
    <div className="bottom">
      <Button disabled={!canEdit} style={{ gridArea: "g11" }} label="Park" />
      <Button disabled={!canEdit} style={{ gridArea: "g21" }} label="Park" />
      <Button disabled={!canEdit} style={{ gridArea: "g31" }} label="Park" />
      <Button disabled={!canEdit} style={{ gridArea: "g41" }} label="Park" />
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
        value={domeMode}
        options={DOME_MODE}
        onChange={(e) => setDomeMode(e.value)}
        placeholder="Select a Dome Mode"
      />
      <Button disabled={!canEdit} style={{ gridArea: "g46" }} label="Set" />
      <Button disabled={!canEdit} style={{ gridArea: "g51" }} label="Park" />
      <span
        style={{
          textAlign: "center",
          alignSelf: "center",
          gridArea: "g52",
        }}
      >
        Mode
      </span>
      <Dropdown
        disabled={!canEdit}
        style={{ gridArea: "g53" }}
        value={shuttersMode}
        options={SHUTTERS_MODE}
        onChange={(e) => setShuttersMode(e.value)}
        placeholder="Select a Shutters Mode"
      />
      <span
        style={{
          textAlign: "center",
          alignSelf: "center",
          gridArea: "g54",
        }}
      >
        Aperture
      </span>
      <InputNumber
        disabled={!canEdit}
        style={{ gridArea: "g55" }}
        value={aperture}
        onValueChange={(e) => setAperture(e.value ? e.value : 0)}
        mode="decimal"
      />
      <Button disabled={!canEdit} style={{ gridArea: "g56" }} label="Set" />
      <Button disabled={!canEdit} style={{ gridArea: "g61" }} label="Close" />
      <InputNumber
        disabled={!canEdit}
        style={{ gridArea: "g62" }}
        value={WVGate}
        onValueChange={(e) => setWVGate(e.value ? e.value : 0)}
        mode="decimal"
      />
      <Slider
        disabled={!canEdit}
        style={{ gridArea: "g63", marginTop: "10px" }}
        value={WVGate}
        onChange={(e) => setWVGate(e.value)}
      />
      <Button disabled={!canEdit} style={{ gridArea: "g66" }} label="Move" />
      <Button disabled={!canEdit} style={{ gridArea: "g71" }} label="Close" />
      <InputNumber
        disabled={!canEdit}
        style={{ gridArea: "g72" }}
        value={EVGate}
        onValueChange={(e) => setEVGate(e.value ? e.value : 0)}
        mode="decimal"
      />
      <Slider
        disabled={!canEdit}
        style={{ gridArea: "g73", marginTop: "10px" }}
        value={EVGate}
        onChange={(e) => setEVGate(e.value)}
      />
      <Button disabled={!canEdit} style={{ gridArea: "g76" }} label="Move" />
    </div>
  )
}
