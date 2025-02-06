import { useConfiguration, useUpdateConfiguration } from '@gql/configs/Configuration';
import { useRotator, useUpdateRotator } from '@gql/configs/Rotator';
import { useRemoveAndCreateBaseTargets, useRemoveAndCreateWfsTargets } from '@gql/configs/Target';
import type { GetCentralWavelengthQuery, GetGuideEnvironmentQuery, Instrument } from '@gql/odb/gen/graphql';
import { useGetCentralWavelength, useGetGuideEnvironment, useGetObservationsByState } from '@gql/odb/Observation';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { startTransition, useCallback, useState } from 'react';

import { useCanEdit } from '@/components/atoms/auth';
import { useOdbVisible } from '@/components/atoms/odb';
import { useToast } from '@/Helpers/toast';
import type { ConfigurationType, OdbObservationType, Semester, SiteType, TargetInput } from '@/types';

import { ObservationTable } from './ObservationTable';

const instrumentOptions: readonly Instrument[] = Object.freeze([
  'ACQ_CAM',
  'ALOPEKE',
  'BHROS',
  'FLAMINGOS2',
  'GHOST',
  'GMOS_NORTH',
  'GMOS_SOUTH',
  'GNIRS',
  'GPI',
  'GSAOI',
  'MICHELLE',
  'NICI',
  'NIFS',
  'NIRI',
  'PHOENIX',
  'SCORPIO',
  'TRECS',
  'VISITOR',
  'ZORRO',
]);

export function OdbImport() {
  const canEdit = useCanEdit();
  const configuration = useConfiguration().data?.configuration;
  const toast = useToast();
  const [odbVisible, setOdbVisible] = useOdbVisible();
  const [selectedObservation, setSelectedObservation] = useState<OdbObservationType>({} as OdbObservationType);
  const [getReadyObservations, { loading, data }] = useGetObservationsByState();
  const [getGuideEnvironment, { loading: getGuideEnvironmentLoading }] = useGetGuideEnvironment();
  const [getCentralWavelength, { loading: getCentralWavelengthLoading }] = useGetCentralWavelength();
  const [removeAndCreateBaseTargets, { loading: removeCreateLoading }] = useRemoveAndCreateBaseTargets();
  const [updateConfiguration, { loading: updateConfigLoading }] = useUpdateConfiguration();
  const [updateRotator, { loading: updateRotatorLoading }] = useUpdateRotator();
  const [removeAndCreateWfsTargets, { loading: wfsTargetsLoading }] = useRemoveAndCreateWfsTargets();

  // observationsByState params
  // TODO: states could be in the form too, if needed
  const [semesterInput, setSemesterInput] = useState<string>('');
  const [semester, setSemester] = useState<Semester | undefined>();
  const [instrumentsInput, setInstrumentsInput] = useState<Instrument[]>([]);

  const rotator = useRotator().data?.rotator;

  const updateLoading =
    updateConfigLoading ||
    removeCreateLoading ||
    updateRotatorLoading ||
    getGuideEnvironmentLoading ||
    getCentralWavelengthLoading ||
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

        // Observation selected
        // First try to get a central wavelength associated to the observation
        const obsWithWavelength = await getCentralWavelength({ variables: { obsId: selectedObservation.id } });
        if (obsWithWavelength.error?.message) {
          toast?.show({
            severity: 'warn',
            summary: `No central wavelength for ${selectedObservation.id}`,
            detail: obsWithWavelength.error.message,
          });
        }

        const wavelength = extractCentralWavelength(configuration?.site, obsWithWavelength.data);

        // Second create the observation base target (SCIENCE)
        await removeAndCreateBaseTargets({
          variables: {
            targets: [
              {
                id: selectedObservation.targetEnvironment?.firstScienceTarget?.id,
                name: selectedObservation.targetEnvironment?.firstScienceTarget?.name,
                coord1: selectedObservation.targetEnvironment?.firstScienceTarget?.sidereal?.ra.degrees,
                coord2: selectedObservation.targetEnvironment?.firstScienceTarget?.sidereal?.dec.degrees,
                epoch: selectedObservation.targetEnvironment?.firstScienceTarget?.sidereal?.epoch,
                type: 'SCIENCE',
                wavelength: wavelength,
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

        // If there is a rotator, retrieve guide targets and create them
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

          const [oi, p1, p2] = await Promise.all([
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

          // Set the first of each result as the selected target if there is only 1
          const selectedOiTarget = firstIfOnlyOne(oi.data?.removeAndCreateWfsTargets)?.pk;
          const selectedP1Target = firstIfOnlyOne(p1.data?.removeAndCreateWfsTargets)?.pk;
          const selectedP2Target = firstIfOnlyOne(p2.data?.removeAndCreateWfsTargets)?.pk;

          if (configuration?.pk && (selectedOiTarget || selectedP1Target || selectedP2Target)) {
            await updateConfiguration({
              variables: { pk: configuration.pk, selectedOiTarget, selectedP1Target, selectedP2Target },
            });
          }
        }
      },
    });
  }

  const queryObservations = useCallback(async () => {
    if (!semester) {
      toast?.show({
        severity: 'warn',
        summary: `Invalid semester '${semester ?? ''}'`,
        detail: 'Please enter a valid semester in the format YYYYA or YYYYB',
      });
    } else if (!instrumentsInput.length) {
      toast?.show({
        severity: 'warn',
        summary: 'No instruments selected',
        detail: 'Please select at least one instrument',
      });
    } else {
      const res = await getReadyObservations({
        variables: {
          instruments: instrumentsInput,
          states: ['READY', 'ONGOING'],
          semester,
        },
        fetchPolicy: 'no-cache',
      });
      if (res.error?.message) {
        toast?.show({
          severity: 'error',
          summary: 'Error querying observations',
          detail: res.error.message,
        });
      }
    }
  }, [getReadyObservations, instrumentsInput, semester, toast]);

  const headerForm = (
    <>
      <div className="header-item">
        <label htmlFor="semester">Semester</label>
        <InputText
          id="semester"
          // YYYYA or YYYYB
          keyfilter={/\d{4}[AB]/}
          validateOnly
          invalid={semester === undefined}
          disabled={loading}
          value={semesterInput}
          onInput={(e, valid) =>
            startTransition(() => {
              setSemesterInput(e.currentTarget.value);
              setSemester(valid ? (e.currentTarget.value as Semester) : undefined);
            })
          }
        />
      </div>
      <div className="header-item">
        <label htmlFor="instrument">Instruments</label>
        <MultiSelect
          id="instrument"
          disabled={loading}
          value={instrumentsInput}
          onChange={(e) =>
            startTransition(() => {
              setInstrumentsInput(e.value as Instrument[]);
            })
          }
          options={instrumentOptions as unknown[]}
          placeholder="Select instrument(s)"
        />
      </div>
      <div className="header-item">
        <Button onClick={() => void queryObservations()} label="Query" loading={loading || updateLoading} />
      </div>
    </>
  );

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

  return (
    <Dialog header="Import from ODB" footer={footer} visible={odbVisible} modal onHide={() => setOdbVisible(false)}>
      {
        <ObservationTable
          headerItems={headerForm}
          loading={loading}
          observations_list={data?.observationsByWorkflowState}
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
      const auxTarget: Omit<TargetInput, 'type'> = {
        name: t.name,
        epoch: t.sidereal?.epoch,
        coord1: t.sidereal?.ra.degrees,
        coord2: t.sidereal?.dec.degrees,
      };
      if (t.probe === 'GMOS_OIWFS') {
        acc.oiwfs.push({ ...auxTarget, type: 'OIWFS' });
      } else if (t.probe === 'PWFS_1') {
        acc.pwfs1.push({ ...auxTarget, type: 'PWFS1' });
      } else if (t.probe === 'PWFS_2') {
        acc.pwfs2.push({ ...auxTarget, type: 'PWFS2' });
      } else {
        console.warn('Unknown guide target:', t);
      }
      return acc;
    },
    { oiwfs: [], pwfs1: [], pwfs2: [] },
  );
}

function extractCentralWavelength(site: SiteType | undefined, data: GetCentralWavelengthQuery | undefined) {
  return site === 'GN'
    ? data?.observation?.execution.config?.gmosNorth?.acquisition?.nextAtom.steps[0].instrumentConfig.centralWavelength
        ?.nanometers
    : data?.observation?.execution.config?.gmosSouth?.acquisition?.nextAtom.steps[0].instrumentConfig.centralWavelength
        ?.nanometers;
}

function firstIfOnlyOne<T>(arr: T[] | undefined): T | undefined {
  return arr?.length === 1 ? arr[0] : undefined;
}
