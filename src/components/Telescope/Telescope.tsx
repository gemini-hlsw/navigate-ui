import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Auth/AuthProvider';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Dialog } from 'primereact/dialog';
import { OdbImport } from './OdbImport';
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
  const { canEdit } = useContext(AuthContext)
  const [isOdbModalVisible, setIsOdbModalVisible] = useState<boolean>(false)
  const [targetList, setTargetList] = useState<TargetObj[] | []>([])
  const [baseTarget, setBaseTarget] = useState<TargetObj | undefined>(undefined)

  useEffect(() => {
    setTargetList([{id:"test", name:"Zenith", az: "147:00:00.00", el: "89:00:00.00", navigateTarget: "fixed"}])
  }, [])

  function setImportedTarget(target: TargetObj) {
    setTargetList([...targetList.filter(t => t.navigateTarget === "fixed"), {...target, navigateTarget: "imported"}])
  }

  return (
    <div className="telescope">
      <Title title="Telescope Setup" prevPanel={prevPanel} nextPanel={nextPanel}>
        <TitleDropdown>
          <Button disabled={!canEdit} className="p-button-text" label="Import from ODB" onClick={() => setIsOdbModalVisible(true)} />
          <Button disabled={!canEdit} className="p-button-text" label="Load" />
          <Button disabled={!canEdit} className="p-button-text" label="Save" />
          <Button disabled={!canEdit} className="p-button-text" label="Save as" />
          <Divider />
          <Button disabled={!canEdit} className="p-button-text" label="Edit targets" />
        </TitleDropdown>
      </Title>
      <Target type="base" targets={targetList} setBaseTarget={setBaseTarget} />
      <div className="guiders">
        <Title title="Guiders" />
        <Guiders canEdit={canEdit}>
          <Target type="PWFS1" targets={[]} />
          <Target type="PWFS2" targets={[]} />
          {/* <Target type="OIWFS" targets={TARGETS} /> */}
        </Guiders>
      </div>
      <Instrument canEdit={canEdit} />
      <div>
        <Title title={`Base target ${baseTarget?.name}`} />
        <TargetDetails target={baseTarget} />
        <Title title="Guiders" />
        <GuidersDetails />
      </div>
      <Footer canEdit={canEdit} />
      <OdbImport
        isOdbModalVisible={isOdbModalVisible}
        setIsOdbModalVisible={setIsOdbModalVisible}
        canEdit={canEdit}
        setImportedTarget={setImportedTarget}
      />
    </div>
  )
}