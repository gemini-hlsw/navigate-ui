import { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { ObservationTable } from './ObservationTable';
import { useGetGuideEnvironment, useGetObservations } from '@gql/odb/Observation';
import { ConfigurationType, OdbObservationType } from '@/types';
import { useRemoveAndCreateBaseTargets } from '@gql/configs/Target';
import { useConfiguration, useUpdateConfiguration } from '@gql/configs/Configuration';
import { useOdbVisible } from '@/components/atoms/odb';
import { useCanEdit } from '@/components/atoms/auth';
import { useRotator, useUpdateRotator } from '@gql/configs/Rotator';
import { useToast } from '@/Helpers/toast';

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
  const rotator = useRotator().data?.rotator;

  const updateLoading =
    updateConfigLoading || removeCreateLoading || updateRotatorLoading || getGuideEnvironmentLoading;

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
          await updateRotator({
            variables: {
              pk: rotator?.pk,
              angle: guideEnv.data?.observation?.targetEnvironment.guideEnvironment.posAngle.degrees ?? 0,
              tracking: 'TRACKING',
            },
          });
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
