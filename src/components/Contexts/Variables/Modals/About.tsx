import { Dialog } from 'primereact/dialog';
import { useCallback } from 'react';

import { useAboutVisible } from '@/components/atoms/about';
import { frontendCommit, frontendVersion } from '@/Helpers/constants';

export function About() {
  const [aboutVisible, toggleAboutVisible] = useAboutVisible();

  const onHide = useCallback(() => toggleAboutVisible(false), [toggleAboutVisible]);

  return (
    <Dialog header="NAVIGATE" visible={aboutVisible} modal onHide={onHide}>
      <div className="about-dialog">
        <p>
          Frontend: {frontendVersion}@{frontendCommit}
        </p>
        {/* TODO: Backend version */}
      </div>
    </Dialog>
  );
}
