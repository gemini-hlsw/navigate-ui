import { useConfiguration } from '@gql/configs/Configuration';
import type { ReactNode } from 'react';
import { useState } from 'react';

import { useCanEdit } from '@/components/atoms/auth';
import { ChevronRight } from '@/components/Icons';

import { Altair, GeMS } from './AdaptiveOptics';
import { AgMechanism } from './AgMechanism';
import { Indicators } from './Indicators';
import { Instrument } from './Instrument';
import { Rotator } from './Rotator';
import { BotSubsystems, TopSubsystems } from './Subsystems';

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
          <ChevronRight />
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
