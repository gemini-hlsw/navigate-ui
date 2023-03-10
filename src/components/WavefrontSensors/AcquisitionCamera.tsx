import imgUrl from '../../assets/cat2.jpg'
import MainControls from "./MainControls"
import { InputSwitch } from 'primereact/inputswitch';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { AcObj } from '../../types';

export default function AcquisitionCamera({ ac }: { ac: AcObj }) {
  return (
    <div className="acquisition-camera">
      <div className="left">
        <span className="ac-name">{ac.name}</span>
        <img src={imgUrl} alt="wfs" />
        <div className="controls">
          <span style={{ textAlign: "center", alignSelf: "center", gridArea: "g1" }}>Exp</span>
          <Dropdown style={{ gridArea: "g2" }} value={2} options={[{ label: 'a', value: 'a' }]} />
          <span style={{ textAlign: "center", alignSelf: "center", gridArea: "g3" }}>Save</span>
          <InputSwitch style={{ gridArea: "g4" }} checked={true} />
          <Button style={{ gridArea: "g5" }} icon="pi pi-stop" aria-label="Stop" tooltip="Stop" />
          <Button style={{ gridArea: "g6" }} icon="pi pi-camera" aria-label="Take Sky" tooltip="Take Sky" />
        </div>
      </div>
      <MainControls />
    </div>
  )
}