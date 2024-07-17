import { Systems } from './Systems/Systems';
import { TargetDetails } from './Details/TargetDetails';
import { GuidersDetails } from './Details/GuidersDetails';
import { Footer } from './Footer/Footer';
import { TelescopeTitle } from './Title/TelescopeTitle';
import { TargetList } from './Targets/TargetList';
import { GuiderTargets } from './Targets/GuiderTargets';
import './Telescope.scss';
import { Title } from '@Shared/Title/Title';
import { TargetType } from '@/types';
import { useConfiguration } from '@gql/configs/Configuration';
import { useTargets } from '@gql/configs/Target';

export function Telescope({ prevPanel, nextPanel }: { prevPanel: () => void; nextPanel: () => void }) {
  const { baseTargets } = useTargets().data;
  const configuration = useConfiguration().data?.configuration;

  const selectedTarget = baseTargets.find((t) => t.pk === configuration?.selectedTarget);

  return (
    <div className="telescope">
      <TelescopeTitle prevPanel={prevPanel} nextPanel={nextPanel} />
      <div className="body">
        <div className="base-target">
          <Title title={selectedTarget ? `Base Target: ${selectedTarget.name}` : 'Base Target'} />
          <TargetList targets={baseTargets} />
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
