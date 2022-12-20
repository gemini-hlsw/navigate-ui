import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import Target from "./Target"
import Guiders from "./Guiders"
import Instrument from "./Instrument"
import Footer from "./Footer"
import Title from '../Title';
import TitleDropdown from '../TitleDropdown';
import TargetDetails from './TargetDetails';
import GuidersDetails from './GuidersDetails';
import { TargetObj } from '../../types';
import "./Telescope.scss"

export default function Telescope({ prevPanel, nextPanel }: { prevPanel: () => void, nextPanel: () => void }) {
  const TARGETS: TargetObj[] = [
    { name: "ScienceTarget", type: "radec", ra: "00:00:00", dec: "00:00:00" },
    { name: "Zenith", type: "altaz", az: "147:00:00", el: "89:00:00", ha: "6:00:00", zd: 0, md: 0, az_wp1: 0, az_wp2: 0, rot: 0, rot_wp1: 0, rot_wp2: 0 },
    { name: "User-1", type: "radec", ra: "00:00:00", dec: "00:00:00" }
  ]

  return (
    <div className="telescope">
      <Title title="Telescope Setup" prevPanel={prevPanel} nextPanel={nextPanel}>
        <TitleDropdown>
          <Button className="p-button-text" label="Import from ODB" />
          <Button className="p-button-text" label="Load" />
          <Button className="p-button-text" label="Save" />
          <Button className="p-button-text" label="Save as" />
          <Divider />
          <Button className="p-button-text" label="Edit targets" />
        </TitleDropdown>
      </Title>
      <Target type="base" targets={TARGETS} />
      <div className="guiders">
        <Title title="Guiders" />
        <Guiders>
          <Target type="PWFS1" targets={TARGETS} />
          <Target type="PWFS2" targets={TARGETS} />
          {/* <Target type="OIWFS" targets={TARGETS} /> */}
        </Guiders>
      </div>
      <Instrument />
      <div>
        <Title title="Base target" />
        <TargetDetails target={TARGETS[1]} />
        <Title title="Guiders" />
        <GuidersDetails />
      </div>
      <Footer />
    </div>
  )
}