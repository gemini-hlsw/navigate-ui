import { useVersion } from '@gql/configs/Version';
import { Dialog } from 'primereact/dialog';
import { useCallback } from 'react';

import { useAboutVisible } from '@/components/atoms/about';
import { frontendBuildTime, frontendCommit, frontendVersion } from '@/Helpers/constants';

export function About() {
  const [aboutVisible, toggleAboutVisible] = useAboutVisible();

  const onHide = useCallback(() => toggleAboutVisible(false), [toggleAboutVisible]);
  const version = useVersion();

  // Format according to user's locale, but in UTC
  const formattedFrontendBuildTime =
    frontendBuildTime.toLocaleString(undefined, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC',
    }) + ' UTC';

  return (
    <Dialog header="NAVIGATE" visible={aboutVisible} modal onHide={onHide}>
      <div className="about-dialog">
        <p>
          Frontend: {frontendVersion} ({frontendCommit}) - {formattedFrontendBuildTime}
        </p>
        <p>Configs API: {version.data?.version.version}</p>
        {/* TODO: Server version */}
      </div>
    </Dialog>
  );
}
