/* eslint-disable @typescript-eslint/no-unsafe-call */
import { VariablesContext } from '@Contexts/Variables/VariablesProvider';
import { useGetGuideTargets } from '@gql/odb/Observation';
import { TargetInput } from '@/types';
import { useContext, useRef } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useRemoveAndCreateWfsTargets } from '@gql/configs/Target';

export function UpdateGuideTargets({ canEdit }: { canEdit: boolean }) {
  const { setOiTargets, setP1Targets, setP2Targets, setLoadingGuideTarget, configuration } =
    useContext(VariablesContext);
  const getGuideTargets = useGetGuideTargets();
  const removeAndCreateWfsTargets = useRemoveAndCreateWfsTargets();
  const toast = useRef<Toast>(null);

  function calculateGuideTargets() {
    setLoadingGuideTarget(true);
    const crtTime = new Date().toISOString();
    getGuideTargets({
      variables: {
        observationId: configuration.obsId!,
        observationTime: crtTime,
      },
      onCompleted(data) {
        const OiwfsTargets: TargetInput[] = [];
        const Pwfs1Targets: TargetInput[] = [];
        const Pwfs2Targets: TargetInput[] = [];
        data.observation?.targetEnvironment.guideEnvironments.map((env) => {
          env.guideTargets.map((t) => {
            const auxTarget: TargetInput = {
              name: t.name,
              id: undefined,
              type: 'OIWFS',
              epoch: t.sidereal?.epoch,
              coord1: t.sidereal?.ra.degrees,
              coord2: t.sidereal?.dec.degrees,
            };
            if (t.probe.includes('OIWFS')) {
              OiwfsTargets.push({ ...auxTarget, type: 'OIWFS' });
            } else if (t.probe.includes('PWFS1')) {
              Pwfs1Targets.push({ ...auxTarget, type: 'PWFS1' });
            } else if (t.probe.includes('PWFS2')) {
              Pwfs2Targets.push({ ...auxTarget, type: 'PWFS2' });
            }
          });
        });

        removeAndCreateWfsTargets({
          variables: {
            wfs: 'OIWFS',
            targets: OiwfsTargets,
          },
          onCompleted(data) {
            setOiTargets(data.removeAndCreateWfsTargets);
          },
        });
        removeAndCreateWfsTargets({
          variables: {
            wfs: 'PWFS1',
            targets: Pwfs1Targets,
          },
          onCompleted(data) {
            setP1Targets(data.removeAndCreateWfsTargets);
          },
        });
        removeAndCreateWfsTargets({
          variables: {
            wfs: 'PWFS2',
            targets: Pwfs2Targets,
          },
          onCompleted(data) {
            setP2Targets(data.removeAndCreateWfsTargets);
          },
        });

        setLoadingGuideTarget(false);
      },
      onError(err) {
        setLoadingGuideTarget(false);
        toast.current?.show({
          severity: 'error',
          summary: 'Error',
          // eslint-disable-next-line @typescript-eslint/no-base-to-string
          detail: err.toString(),
          life: 5000,
        });
        console.log(err);
        removeAndCreateWfsTargets({
          variables: {
            wfs: 'OIWFS',
            targets: [],
          },
          onCompleted() {
            setOiTargets([]);
          },
        });
        removeAndCreateWfsTargets({
          variables: {
            wfs: 'PWFS1',
            targets: [],
          },
          onCompleted() {
            setP1Targets([]);
          },
        });
        removeAndCreateWfsTargets({
          variables: {
            wfs: 'PWFS2',
            targets: [],
          },
          onCompleted() {
            setP2Targets([]);
          },
        });
      },
    });
  }

  return (
    <>
      <Toast ref={toast} />
      <Button
        disabled={!canEdit}
        className="absolute-right-btn"
        tooltip="Get current guide targets"
        tooltipOptions={{ position: 'bottom' }}
        icon="pi pi-refresh"
        iconPos="right"
        label=""
        onClick={calculateGuideTargets}
      />
    </>
  );
}
