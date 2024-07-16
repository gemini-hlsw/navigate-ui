import { Title } from '../../../Shared/Title/Title';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { useEffect, useState } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { AltairInstrumentType, GemsInstrumentType } from '@/types';
import { useGetGemsInstrument, useUpdateGemsInstrument } from '@gql/configs/GemsInstrument';
import { useGetAltairInstrument, useUpdateAltairInstrument } from '@gql/configs/AltairInstrument';
import {
  UpdateAltairInstrumentMutationVariables,
  UpdateGemsInstrumentMutationVariables,
} from '@gql/configs/gen/graphql';

export function GeMS({ canEdit }: { canEdit: boolean }) {
  const [state, setState] = useState<GemsInstrumentType>({} as GemsInstrumentType);
  const getGemsInstrument = useGetGemsInstrument();
  const updateGemsInstrument = useUpdateGemsInstrument();

  useEffect(() => {
    getGemsInstrument({
      onCompleted(data) {
        setState(data.gemsInstrument!);
      },
    });
  }, []);

  function modifyGemsInstrument<T extends keyof UpdateGemsInstrumentMutationVariables>(
    name: T,
    value: NonNullable<UpdateGemsInstrumentMutationVariables[T]>,
  ) {
    updateGemsInstrument({
      variables: {
        pk: state.pk,
        [name]: value,
      },
      onCompleted(data) {
        setState(data.updateGemsInstrument);
      },
    });
  }

  return (
    <div className="ao-gems">
      <Title title={'GeMS'} />
      <div className="body">
        <span className="label">ADC</span>
        <Checkbox disabled={!canEdit} checked={state.adc} onChange={() => modifyGemsInstrument('adc', !state.adc)} />
        <span className="label">Beamsplitter</span>
        <Dropdown
          disabled={!canEdit}
          value={state.beamsplitter}
          options={['400 nm', '550 nm', '700nm', '850 nm', '1000 nm']}
          onChange={(e) => modifyGemsInstrument('beamsplitter', e.target.value)}
          placeholder="Select a beamsplitter"
        />
        <span className="label">Astrometric mode</span>
        <Dropdown
          disabled={!canEdit}
          value={state.astrometricMode}
          options={['Best', 'Average']}
          onChange={(e) => modifyGemsInstrument('astrometricMode', e.target.value)}
          placeholder="Select a mode"
        />
      </div>
    </div>
  );
}

export function Altair({ canEdit }: { canEdit: boolean }) {
  const [state, setState] = useState<AltairInstrumentType>({} as AltairInstrumentType);
  const getAltairInstrument = useGetAltairInstrument();
  const updateAltairInstrument = useUpdateAltairInstrument();

  useEffect(() => {
    getAltairInstrument({
      onCompleted(data) {
        setState(data.altairInstrument!);
      },
    });
  }, []);

  function modifyAltairInstrument<T extends keyof UpdateAltairInstrumentMutationVariables>(
    name: T,
    value: NonNullable<UpdateAltairInstrumentMutationVariables[T]>,
  ) {
    updateAltairInstrument({
      variables: {
        pk: state.pk,
        [name]: value,
      },
      onCompleted(data) {
        setState(data.updateAltairInstrument);
      },
    });
  }

  return (
    <div className="ao-altair">
      <Title title={'Altair'} />
      <div className="body">
        <span className="label">Beamsplitter</span>
        <Dropdown
          disabled={!canEdit}
          value={state.beamsplitter}
          options={['400 nm', '550 nm', '700nm', '850 nm', '1000 nm']}
          onChange={(e) => modifyAltairInstrument('beamsplitter', e.target.value)}
          placeholder="Select a tracking"
        />
        <span className="label">ND filter</span>
        <Checkbox
          disabled={!canEdit}
          checked={state.ndFilter}
          onChange={() => modifyAltairInstrument('ndFilter', !state.ndFilter)}
        />
        <span className="label">Star Mag</span>
        <InputNumber
          disabled={!canEdit}
          value={state.startMagnitude}
          onValueChange={(e) => modifyAltairInstrument('startMagnitude', e.target.value ?? 0.0)}
        />
        <span className="label">Field Lens</span>
        <Checkbox
          disabled={!canEdit}
          checked={state.fieldLens}
          onChange={() => modifyAltairInstrument('fieldLens', !state.fieldLens)}
        />
        <span className="label">Seeing r0</span>
        <InputNumber
          disabled={!canEdit}
          value={state.seeing}
          onValueChange={(e) => modifyAltairInstrument('seeing', e.target.value ?? 0.0)}
        />
        <span className="label">Deploy ADC</span>
        <Checkbox
          disabled={!canEdit}
          checked={state.deployAdc}
          onChange={() => modifyAltairInstrument('deployAdc', !state.deployAdc)}
        />
        <span className="label">Wind speed</span>
        <InputNumber
          disabled={!canEdit}
          value={state.windSpeed}
          onValueChange={(e) => modifyAltairInstrument('windSpeed', e.target.value ?? 0.0)}
        />
        <span className="label">Adjust ADC</span>
        <Checkbox
          disabled={!canEdit}
          checked={state.adjustAdc}
          onChange={() => modifyAltairInstrument('adjustAdc', !state.adjustAdc)}
        />
        <span className="label">Force Mode</span>
        <Checkbox
          disabled={!canEdit}
          checked={state.forceMode}
          onChange={() => modifyAltairInstrument('forceMode', !state.forceMode)}
        />
        <span className="label">Use LGS</span>
        <Checkbox disabled={!canEdit} checked={state.lgs} onChange={() => modifyAltairInstrument('lgs', !state.lgs)} />
      </div>
    </div>
  );
}
