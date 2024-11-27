import { useConfiguration, useUpdateConfiguration } from '@gql/configs/Configuration';
import { useRotator, useUpdateRotator } from '@gql/configs/Rotator';
import { useRemoveAndCreateBaseTargets, useRemoveAndCreateWfsTargets } from '@gql/configs/Target';
import type { GetGuideEnvironmentQuery } from '@gql/odb/gen/graphql';
import { useGetGuideEnvironment, useGetObservations } from '@gql/odb/Observation';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useEffect, useState } from 'react';

import { useCanEdit } from '@/components/atoms/auth';
import { useOdbVisible } from '@/components/atoms/odb';
import { useToast } from '@/Helpers/toast';
import type { ConfigurationType, OdbObservationType, TargetInput } from '@/types';

import { ObservationTable } from './ObservationTable';

export function OdbImport() {
  const canEdit = useCanEdit();
  const configuration = useConfiguration().data?.configuration;
  const toast = useToast();
  const [odbVisible, setOdbVisible] = useOdbVisible();
  const [selectedObservation, setSelectedObservation] = useState<OdbObservationType>({} as OdbObservationType);
  const [getObservations, { loading, data }] = useGetObservations();
  const [getGuideEnvironment, { loading: getGuideEnvironmentLoading }] = useGetGuideEnvironment();
  const [removeAndCreateBaseTargets, { loading: removeCreateLoading }] = useRemoveAndCreateBaseTargets();
  const [updateConfiguration, { loading: updateConfigLoading }] = useUpdateConfiguration();
  const [updateRotator, { loading: updateRotatorLoading }] = useUpdateRotator();
  const [removeAndCreateWfsTargets, { loading: wfsTargetsLoading }] = useRemoveAndCreateWfsTargets();

  const rotator = useRotator().data?.rotator;

  const updateLoading =
    updateConfigLoading ||
    removeCreateLoading ||
    updateRotatorLoading ||
    getGuideEnvironmentLoading ||
    wfsTargetsLoading;

  function updateObs() {
    void updateConfiguration({
      variables: {
        ...(configuration as ConfigurationType),
        obsId: selectedObservation.id,
        obsTitle: selectedObservation.title,
        obsSubtitle: selectedObservation.subtitle,
        obsInstrument: selectedObservation.instrument,
      },
      async onCompleted() {
        setOdbVisible(false);
        await removeAndCreateBaseTargets({
          variables: {
            targets: [
              {
                id: selectedObservation.targetEnvironment.firstScienceTarget?.id,
                name: selectedObservation.targetEnvironment.firstScienceTarget?.name,
                coord1: selectedObservation.targetEnvironment.firstScienceTarget?.sidereal?.ra.degrees,
                coord2: selectedObservation.targetEnvironment.firstScienceTarget?.sidereal?.dec.degrees,
                epoch: selectedObservation.targetEnvironment.firstScienceTarget?.sidereal?.epoch,
                type: 'SCIENCE',
              },
            ],
          },
          async onCompleted(t) {
            await updateConfiguration({
              variables: {
                pk: configuration?.pk ?? 1,
                selectedTarget: t.removeAndCreateBaseTargets[0].pk,
              },
            });
          },
        });
        if (rotator) {
          // Get the guide environment separately to avoid large query times for _all_ observations
          const guideEnv = await getGuideEnvironment({ variables: { obsId: selectedObservation.id } });
          if (guideEnv.error?.message) {
            toast?.show({
              severity: 'warn',
              summary: `No guide environment for ${selectedObservation.id}`,
              detail: guideEnv.error.message,
            });
          }
          const { oiwfs, pwfs1, pwfs2 } = extractGuideTargets(guideEnv.data);

          await Promise.all([
            removeAndCreateWfsTargets({
              variables: {
                wfs: 'OIWFS',
                targets: oiwfs,
              },
            }),
            removeAndCreateWfsTargets({
              variables: {
                wfs: 'PWFS1',
                targets: pwfs1,
              },
            }),
            removeAndCreateWfsTargets({
              variables: {
                wfs: 'PWFS2',
                targets: pwfs2,
              },
            }),
            updateRotator({
              variables: {
                pk: rotator?.pk,
                angle: guideEnv.data?.observation?.targetEnvironment.guideEnvironment.posAngle.degrees ?? 0,
                tracking: 'TRACKING',
              },
            }),
          ]);
        }
      },
    });
  }

  const footer = (
    <div className="modal-footer">
      <div className="right">
        <Button
          disabled={
            !(canEdit && selectedObservation.targetEnvironment?.firstScienceTarget?.name) ||
            !selectedObservation.targetEnvironment?.firstScienceTarget?.name
          }
          className=""
          label="Import to Navigate"
          loading={updateLoading}
          onClick={updateObs}
        />
        <Button disabled={!canEdit} className="p-button-danger" label="Cancel" onClick={() => setOdbVisible(false)} />
      </div>
    </div>
  );

  useEffect(() => {
    if (odbVisible)
      void getObservations({
        fetchPolicy: 'no-cache',
      });
  }, [odbVisible]);

  return (
    <Dialog header="Import from ODB" footer={footer} visible={odbVisible} modal onHide={() => setOdbVisible(false)}>
      {
        <ObservationTable
          loading={loading}
          observations_list={data?.observations?.matches}
          selectedObservation={selectedObservation}
          setSelectedObservation={setSelectedObservation}
        />
      }
    </Dialog>
  );
}

function extractGuideTargets(data: GetGuideEnvironmentQuery | undefined) {
  return (data?.observation?.targetEnvironment.guideEnvironment.guideTargets ?? []).reduce<
    Record<'oiwfs' | 'pwfs1' | 'pwfs2', TargetInput[]>
  >(
    (acc, t) => {
      const auxTarget: TargetInput = {
        name: t.name,
        id: undefined,
        type: 'OIWFS',
        epoch: t.sidereal?.epoch,
        coord1: t.sidereal?.ra.degrees,
        coord2: t.sidereal?.dec.degrees,
      };
      if (t.probe.includes('OIWFS')) {
        acc.oiwfs.push({ ...auxTarget, type: 'OIWFS' });
      } else if (t.probe.includes('PWFS1')) {
        acc.pwfs1.push({ ...auxTarget, type: 'PWFS1' });
      } else if (t.probe.includes('PWFS2')) {
        acc.pwfs2.push({ ...auxTarget, type: 'PWFS2' });
      }
      return acc;
    },
    { oiwfs: [], pwfs1: [], pwfs2: [] },
  );
}
