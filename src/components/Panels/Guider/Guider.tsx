import { Title } from '@Shared/Title/Title';
import { WavefrontSensors } from './WavefrontSensors/WavefrontSensors';
import { Alarms } from './Alarms/Alarms';
import Diagram from './Diagram/Diagram';
import './Guider.scss';
import { LightPath } from './LightPath/LightPath';
import { Loop } from './Loop/Loop';

export function Guider({ prevPanel, nextPanel }: { prevPanel: () => void; nextPanel: () => void }) {
  return (
    <div className="guider">
      <Title title="GUIDER" prevPanel={prevPanel} nextPanel={nextPanel}></Title>
      <div className="body">
        <Diagram />
        <Loop />
        <LightPath />
        <WavefrontSensors />
        <Alarms />
      </div>
    </div>
  );
}
