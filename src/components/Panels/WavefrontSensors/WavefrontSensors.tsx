import { useContext } from 'react';
import { AuthContext } from '@Contexts/Auth/AuthProvider';
import { Title } from '@Shared/Title/Title';
import WavefrontSensor from './WavefrontSensor/WavefrontSensor';
// import AcquisitionCamera from "./AcquisitionCamera/AcquisitionCamera"
import Logs from './Logs/Logs';
import './WavefrontSensors.scss';

export function WavefrontSensors({ prevPanel, nextPanel }: { prevPanel: () => void; nextPanel: () => void }) {
  const { canEdit } = useContext(AuthContext);

  return (
    <div className="wavefront-sensors">
      <Title title="WAVEFRONT SENSORS" prevPanel={prevPanel} nextPanel={nextPanel}></Title>
      <div className="body">
        <div className="sensors">
          {/* <WavefrontSensor canEdit={canEdit} wfs={"PWFS1"} /> */}
          {/* <WavefrontSensor canEdit={canEdit} wfs={"PWFS2"} /> */}
          <WavefrontSensor canEdit={canEdit} wfs={'OIWFS'} />
        </div>
        {/* <AcquisitionCamera canEdit={canEdit} ac={"AC"} /> */}
        <Logs />
      </div>
    </div>
  );
}
