import { useSetLoadingGuideTarget } from '@/components/atoms/guideTarget';
import { useToast } from '@/Helpers/toast';
import { TargetInput } from '@/types';
import { useConfiguration } from '@gql/configs/Configuration';
import { useRemoveAndCreateWfsTargets } from '@gql/configs/Target';
import { useGetGuideTargets } from '@gql/odb/Observation';
import { Button } from 'primereact/button';

export function UpdateGuideTargets({ canEdit }: { canEdit: boolean }) {
  const configuration = useConfiguration().data?.configuration;
  const setLoadingGuideTarget = useSetLoadingGuideTarget();
  const [getGuideTargets] = useGetGuideTargets();
  const removeAndCreateWfsTargets = useRemoveAndCreateWfsTargets();
  const toast = useToast();

  function calculateGuideTargets() {
    setLoadingGuideTarget(true);
    const crtTime = new Date().toISOString();
    void getGuideTargets({
      variables: {
        observationId: configuration!.obsId!,
        observationTime: crtTime,
      },
      async onCompleted(data) {
        const OiwfsTargets: TargetInput[] = [];
        const Pwfs1Targets: TargetInput[] = [];
        const Pwfs2Targets: TargetInput[] = [];
        data.observation?.targetEnvironment.guideEnvironments.forEach((env) => {
          env.guideTargets.forEach((t) => {
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

        await Promise.all([
          removeAndCreateWfsTargets({
            variables: {
              wfs: 'OIWFS',
              targets: OiwfsTargets,
            },
          }),
          removeAndCreateWfsTargets({
            variables: {
              wfs: 'PWFS1',
              targets: Pwfs1Targets,
            },
          }),
          removeAndCreateWfsTargets({
            variables: {
              wfs: 'PWFS2',
              targets: Pwfs2Targets,
            },
          }),
        ]);

        setLoadingGuideTarget(false);
      },
      async onError(err) {
        setLoadingGuideTarget(false);
        toast?.show({
          severity: 'error',
          summary: err.name,
          detail: err.message,
          life: 5000,
        });
        console.log(err);

        await Promise.all([
          removeAndCreateWfsTargets({
            variables: {
              wfs: 'OIWFS',
              targets: [],
            },
          }),
          removeAndCreateWfsTargets({
            variables: {
              wfs: 'PWFS1',
              targets: [],
            },
          }),
          removeAndCreateWfsTargets({
            variables: {
              wfs: 'PWFS2',
              targets: [],
            },
          }),
        ]);
      },
    });
  }

  return (
    <Button
      disabled={!canEdit || !configuration?.obsId}
      className="absolute-right-btn"
      tooltip="Get current guide targets"
      tooltipOptions={{ position: 'bottom' }}
      icon="pi pi-refresh"
      iconPos="right"
      label=""
      onClick={calculateGuideTargets}
    />
  );
}
