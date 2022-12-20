import { useContext, useState } from 'react';
import { AuthContext } from '../Auth/AuthProvider';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Slider } from 'primereact/slider';
import { ParkStatus } from "../../types";

export default function Instrument() {
  let auth = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(false)
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [mcsParkState, setMcsParkState] = useState<ParkStatus>('PENDING')
  const [domeMode, setDomeMode] = useState<string>('MinVibration')
  const [shuttersMode, setShuttersMode] = useState<string>('Tracking')
  const [aperture, setAperture] = useState<number>(90)
  const [WVGate, setWVGate] = useState<any>(50)
  const [EVGate, setEVGate] = useState<any>(50)

  const DOME_MODE = [
    { label: 'MinVibration', value: 'MinVibration' },
    { label: 'Rome', value: 'RM' },
    { label: 'London', value: 'LDN' },
    { label: 'Istanbul', value: 'IST' },
    { label: 'Paris', value: 'PRS' }
  ];

  const SHUTTERS_MODE = [
    { label: 'Tracking', value: 'Tracking' },
    { label: 'Rome', value: 'RM' },
    { label: 'London', value: 'LDN' },
    { label: 'Istanbul', value: 'IST' },
    { label: 'Paris', value: 'PRS' }
  ];

  const btnClass = {
    PENDING: "",
    ACTIVE: "p-button-warning",
    DONE: "p-button-success"
  }

  async function sendCommand() {
    setMcsParkState('ACTIVE')
    const res = await fetch(`/api/engage/commands/mcsPark/123e4567-e89b-12d3-a456-426614174000`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      }
    })

    console.log(res)
    if (res.status === 200) {
      setTimeout(() => setMcsParkState('DONE'), 2000)
    }
  }

  function toggle() {
    setCollapsed(!collapsed)
  }

  return (
    <div className="instrument">
      <div className="left">
        <Button
          label="MCS"
          // icon="pi pi-cog"
          // iconPos="right"
          disabled={!auth.isUserLoggedIn}
          className={`${btnClass[mcsParkState]}`}
          onClick={sendCommand}
          loading={loading}
        />
        <Button label="SCS" />
        <Button label="CRCS" />
        <Button label="PWFS1" />
        <Button label="PWFS2" />
        <Button label="OIWFS" />
        <Button label="AOWFS" />
        <Button label="Dome" />
        <Button label="Shuters" />
        <Button label="W VGate" />
        <Button label="E VGate" />
      </div>
      <div className={`grid-wrapper ${(collapsed) ? "collapsed" : ""}`}>
        <div className="top-left">
          <Button style={{ gridArea: "g11" }} label="Park" />
          <Button style={{ gridArea: "g12" }} label="Unwrap" />
          <Button style={{ gridArea: "g31" }} label="Park" />
          <Button style={{ gridArea: "g32" }} label="Unwrap" />
          <Button style={{ gridArea: "g41" }} label="Park" />
          <Button style={{ gridArea: "g42" }} label="Unwrap" />
          <Button style={{ gridArea: "g51" }} label="Park" />
          <Button style={{ gridArea: "g52" }} label="Unwrap" />
        </div>
        <div className="top-right">
          <div className="title">
            <span>AG Mechanisms</span>
          </div>
          <div className="ag-body">
            <span>Science Fold</span>
            <Button label="Park" />
            <span>AO Fold</span>
            <Button label="Park" />
            <span>AC Pickoff</span>
            <Button label="Park" />
            <Button label="Park All" />
          </div>
        </div>
        <div className="bottom">
          <Button style={{ gridArea: "g11" }} label="Park" />
          <Button style={{ gridArea: "g21" }} label="Park" />
          <Button style={{ gridArea: "g31" }} label="Park" />
          <span style={{ textAlign: "center", alignSelf: "center", gridArea: "g32" }}>Mode</span>
          <Dropdown style={{ gridArea: "g33" }} value={domeMode} options={DOME_MODE} onChange={(e) => setDomeMode(e.value)} placeholder="Select a Dome Mode" />
          <Button style={{ gridArea: "g36" }} label="Set" />
          <Button style={{ gridArea: "g41" }} label="Park" />
          <span style={{ textAlign: "center", alignSelf: "center", gridArea: "g42" }}>Mode</span>
          <Dropdown style={{ gridArea: "g43" }} value={shuttersMode} options={SHUTTERS_MODE} onChange={(e) => setShuttersMode(e.value)} placeholder="Select a Shutters Mode" />
          <span style={{ textAlign: "center", alignSelf: "center", gridArea: "g44" }}>Aperture</span>
          <InputNumber style={{ gridArea: "g45" }} value={aperture} onValueChange={(e) => setAperture((e.value) ? e.value : 0)} mode="decimal" />
          <Button style={{ gridArea: "g46" }} label="Set" />
          <Button style={{ gridArea: "g51" }} label="Close" />
          <InputNumber style={{ gridArea: "g52" }} value={WVGate} onValueChange={(e) => setWVGate((e.value) ? e.value : 0)} mode="decimal" />
          <Slider style={{ gridArea: "g53", marginTop: "10px" }} value={WVGate} onChange={(e) => setWVGate(e.value)} />
          <Button style={{ gridArea: "g56" }} label="Move" />
          <Button style={{ gridArea: "g61" }} label="Close" />
          <InputNumber style={{ gridArea: "g62" }} value={EVGate} onValueChange={(e) => setEVGate((e.value) ? e.value : 0)} mode="decimal" />
          <Slider style={{ gridArea: "g63", marginTop: "10px" }} value={EVGate} onChange={(e) => setEVGate(e.value)} />
          <Button style={{ gridArea: "g66" }} label="Move" />
        </div>
        <div className="expand-button" onClick={toggle}>
          <i className="pi pi-angle-right"></i>
        </div>
      </div>
      <div className="right">

      </div>
    </div>
  )
}