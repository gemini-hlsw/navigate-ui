import { ReactNode, useState } from 'react';
import { Rotator } from './Rotator';
import { Altair, GeMS } from './AdaptiveOptics';
import { Indicators } from './Indicators';
import { AgMechanism } from './AgMechanism';
import { BotSubsystems, TopSubsystems } from './Subsystems';
import { Instrument } from './Instrument';
import { useCanEdit } from '@/components/atoms/auth';
import { useConfiguration } from '@gql/configs/Configuration';

export function Systems() {
  const canEdit = useCanEdit();
  const configuration = useConfiguration().data?.configuration;
  const [collapsed, setCollapsed] = useState<boolean>(false);

  function toggle() {
    setCollapsed(!collapsed);
  }

  let aoSystem: ReactNode | null = null;
  if (configuration?.site === 'GN') {
    aoSystem = <Altair canEdit={canEdit} />;
  } else if (configuration?.site === 'GS') {
    aoSystem = <GeMS canEdit={canEdit} />;
  }

  return (
    <div className="systems">
      <Indicators canEdit={canEdit} />
      <div className={`grid-wrapper ${collapsed ? 'collapsed' : ''}`}>
        <TopSubsystems canEdit={canEdit} />
        <AgMechanism canEdit={canEdit} />
        <BotSubsystems canEdit={canEdit} />
        <div className="expand-button" onClick={toggle}>
          <i className="pi pi-angle-right"></i>
        </div>
      </div>
      <div className="right">
        <Instrument canEdit={canEdit} />
        <Rotator canEdit={canEdit} />
        {aoSystem}
      </div>
    </div>
  );
}
