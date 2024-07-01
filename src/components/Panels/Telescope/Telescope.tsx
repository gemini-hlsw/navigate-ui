import { useContext } from 'react';
import { Systems } from './Systems/Systems';
import { TargetDetails } from './Details/TargetDetails';
import { GuidersDetails } from './Details/GuidersDetails';
import { Footer } from './Footer/Footer';
import { TelescopeTitle } from './Title/TelescopeTitle';
import { TargetList } from './Targets/TargetList';
import { VariablesContext } from '@Contexts/Variables/VariablesProvider';
import { GuiderTargets } from './Targets/GuiderTargets';
import './Telescope.scss';
import { Title } from '@Shared/Title/Title';
import { TargetType } from '@/types';

export function Telescope({ prevPanel, nextPanel }: { prevPanel: () => void; nextPanel: () => void }) {
  const { configuration, baseTargets } = useContext(VariablesContext);

  const selectedTarget = baseTargets.filter((t) => t.pk === configuration.selectedTarget)[0];

  return (
    <div className="telescope">
      <TelescopeTitle prevPanel={prevPanel} nextPanel={nextPanel} />
      <div className="body">
        <div className="base-target">
          <Title title={selectedTarget ? `Base Target: ${selectedTarget.name}` : 'Base Target'} />
          <TargetList targets={baseTargets} selectedTarget={configuration.selectedTarget} type={'SCIENCE'} />
        </div>
        <GuiderTargets />
        <Systems />
        <TargetDetails target={selectedTarget ?? ({} as TargetType)} />
        <GuidersDetails />
        <Footer />
      </div>
      {/* Add a way to import fixed targets <FixedTargetImport /> */}
    </div>
  );
}
