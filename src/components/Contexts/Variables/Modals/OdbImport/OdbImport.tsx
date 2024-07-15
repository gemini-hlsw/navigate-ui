import { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { ObservationTable } from './ObservationTable';
import { useGetObservations } from '@gql/odb/Observation';
import { ConfigurationType, OdbObservationType } from '@/types';
import { useRemoveAndCreateBaseTargets } from '@gql/configs/Target';
import { useUpdateConfiguration } from '@gql/configs/Configuration';
import { useOdbVisible } from '@/components/atoms/odb';
import {
  useConfiguration,
  useSetBaseTargets,
  useSetOiTargets,
  useSetP1Targets,
  useSetP2Targets,
} from '@/components/atoms/configs';
import { useCanEdit } from '@/components/atoms/auth';

export function OdbImport() {
  const canEdit = useCanEdit();
  const [configuration, setConfiguration] = useConfiguration();
  const setBaseTargets = useSetBaseTargets();
  const setOiTargets = useSetOiTargets();
  const setP1Targets = useSetP1Targets();
  const setP2Targets = useSetP2Targets();
  const [odbVisible, setOdbVisible] = useOdbVisible();
  const [selectedObservation, setSelectedObservation] = useState<OdbObservationType>({} as OdbObservationType);
  const { getObservations, loading, data } = useGetObservations();
  const removeAndCreateBaseTargets = useRemoveAndCreateBaseTargets();
  const updateConfiguration = useUpdateConfiguration();

  function updateObs() {
    updateConfiguration({
      variables: {
        ...(configuration as ConfigurationType & { pk: number }),
        obsId: selectedObservation.id,
        obsTitle: selectedObservation.title,
        obsSubtitle: selectedObservation.subtitle,
        obsInstrument: selectedObservation.instrument,
      },
      onCompleted(data) {
        setConfiguration(data.updateConfiguration);
        setOdbVisible(false);
        removeAndCreateBaseTargets({
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
          onCompleted(data) {
            setBaseTargets(data.removeAndCreateBaseTargets);
            setOiTargets([]);
            setP1Targets([]);
            setP2Targets([]);
          },
        });
      },
    });
  }

  const footer = (
    <div className="modal-footer">
      <div className="right">
        <Button
          disabled={
            !(canEdit && selectedObservation.targetEnvironment?.firstScienceTarget?.name !== '') ||
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
      getObservations({
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
          observations_list={data?.observations}
          selectedObservation={selectedObservation}
          setSelectedObservation={setSelectedObservation}
        />
      )}
    </Dialog>
  );
}
