import imgUrl from '../../assets/cat2.jpg'
import { InputSwitch } from 'primereact/inputswitch';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { WfsObj } from '../../types';

export default function WavefrontSensor({ wfs }: { wfs: WfsObj }) {
  return (
    <div className="wfs">
      <span className="wfs-name">{wfs.name}</span>
      <img src={imgUrl} alt="wfs" />
      <div className="controls">
        <span style={{ alignSelf: "center", gridArea: "g11" }}>Freq</span>
        <Dropdown style={{ gridArea: "g12" }} value={'100'} options={[{ label: '100', value: '100' }]} />
        <Button style={{ gridArea: "g13" }} icon="pi pi-stop" aria-label="Stop" tooltip="Stop" />
        <span style={{ alignSelf: "center", gridArea: "g21" }}>Save</span>
        <InputSwitch style={{ gridArea: "g22" }} checked={true} />
        <Button style={{ gridArea: "g23" }} icon="pi pi-camera" aria-label="Take Sky" tooltip="Take Sky" />
        <Button style={{ gridArea: "g3" }} label="Autoadjust" />
      </div>
    </div>
  )
}