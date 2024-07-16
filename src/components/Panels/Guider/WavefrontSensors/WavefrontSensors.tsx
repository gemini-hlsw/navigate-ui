import { TabView, TabPanel } from 'primereact/tabview';
import { Title } from '@Shared/Title/Title';
import { PWFS1 } from './PWFS1';
import { ACHR } from './ACHR';
import { useCanEdit } from '@/components/atoms/auth';

export function WavefrontSensors() {
  const canEdit = useCanEdit();
  return (
    <div className="wavefront-sensors">
      <Title title="Wavefront Sensors" />
      <div className="body">
        <TabView>
          <TabPanel header="PWFS1">
            <PWFS1 disabled={!canEdit} />
          </TabPanel>
          <TabPanel header="PWFS2">
            <PWFS1 disabled={!canEdit} />
          </TabPanel>
          <TabPanel header="OIWFS"></TabPanel>
          <TabPanel header="AC/HR">
            <ACHR disabled={!canEdit} />
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
}
