import { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { ObservationTable } from './ObservationTable';
import { useGetObservations } from '@gql/odb/Observation';
import { ConfigurationType, OdbObservationType } from '@/types';
import { useRemoveAndCreateBaseTargets } from '@gql/configs/Target';
import { useConfiguration, useUpdateConfiguration } from '@gql/configs/Configuration';
import { useOdbVisible } from '@/components/atoms/odb';
import { useCanEdit } from '@/components/atoms/auth';
import { useRotator, useUpdateRotator } from '@gql/configs/Rotator';

export function OdbImport() {
  const canEdit = useCanEdit();
  const configuration = useConfiguration().data?.configuration;

  const [odbVisible, setOdbVisible] = useOdbVisible();
  const [selectedObservation, setSelectedObservation] = useState<OdbObservationType>({} as OdbObservationType);
  const { getObservations, loading, data } = useGetObservations();
  const removeAndCreateBaseTargets = useRemoveAndCreateBaseTargets();
  const updateConfiguration = useUpdateConfiguration();
  const updateRotator = useUpdateRotator();
  const rotator = useRotator().data?.rotator;

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
          await updateRotator({
            variables: {
              pk: rotator?.pk,
              angle: selectedObservation.posAngleConstraint.angle.degrees,
              tracking: selectedObservation.posAngleConstraint.mode === 'FIXED' ? 'FIXED' : 'TRACKING',
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
      {loading ? (
        <p>Loading observations...</p>
      ) : (
        <ObservationTable
          loading={!data}
          observations_list={data?.observations?.matches}
          selectedObservation={selectedObservation}
          setSelectedObservation={setSelectedObservation}
        />
      )}
    </Dialog>
  );
}
