import Title from '../Title';
import Diagram from './Diagram';
import './Guider.scss';

export default function Guider({ prevPanel, nextPanel }: { prevPanel: () => void, nextPanel: () => void }) {
  return (
    <div className="guider">
      <Title title="Guider" prevPanel={prevPanel} nextPanel={nextPanel}></Title>
      <Diagram />
    </div>
  );
}