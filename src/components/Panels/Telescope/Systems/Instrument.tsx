import { Title, TitleDropdown } from '@Shared/Title/Title';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { useInstrument } from '@gql/configs/Instrument';
import { useSetImportInstrument } from '@/components/atoms/instrument';
import { useConfiguration } from '@gql/configs/Configuration';

export function Instrument({ canEdit }: { canEdit: boolean }) {
  const configuration = useConfiguration().data?.configuration;
  const setImportInstrument = useSetImportInstrument();

  const { data } = useInstrument({
    variables: {
      name: configuration?.obsInstrument ?? '',
      issPort: 3,
      wfs: 'NONE',
    },
  });

  const instrument = data?.instrument;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function updateInstrument({ key, val }: { key: string; val: unknown }) {
    console.log('Update instrument');
  }

  if (!instrument?.name || !configuration?.obsInstrument) {
    return null;
  }

  return (
    <div className="instrument">
      <Title title="Instrument">
        <TitleDropdown icon="list">
          <Button
            disabled={!canEdit}
            className="p-button-text"
            label="Import instrument"
            onClick={() => setImportInstrument(true)}
          />
          <Button disabled={!canEdit} className="p-button-text" label="Command 2" />
          <Divider />
          <Button disabled={!canEdit} className="p-button-text" label="Command 3" />
        </TitleDropdown>
      </Title>
      <div className="body">
        <span className="label">SF Name</span>
        <InputText
          disabled={!canEdit}
          value={instrument.name}
          onChange={(e) => updateInstrument({ key: 'name', val: e.target.value })}
        />
        <span className="label">Port</span>
        <InputNumber
          disabled={!canEdit}
          value={instrument.issPort}
          onChange={(e) => updateInstrument({ key: 'issPort', val: e.value })}
          mode="decimal"
        />
        <span className="label">Origin X</span>
        <InputNumber
          disabled={!canEdit}
          value={instrument.originX}
          minFractionDigits={2}
          maxFractionDigits={5}
          onChange={(e) => updateInstrument({ key: 'originX', val: e.value })}
          mode="decimal"
        />
        <span className="label">Origin Y</span>
        <InputNumber
          disabled={!canEdit}
          value={instrument.originY}
          minFractionDigits={2}
          maxFractionDigits={5}
          onChange={(e) => updateInstrument({ key: 'originY', val: e.value })}
          mode="decimal"
        />
        <span className="label">Focus Offset</span>
        <InputNumber
          disabled={!canEdit}
          value={instrument.focusOffset}
          minFractionDigits={2}
          maxFractionDigits={5}
          onChange={(e) => updateInstrument({ key: 'focusOffset', val: e.value })}
          mode="decimal"
        />
        <span className="label">IAA</span>
        <InputNumber
          disabled={!canEdit}
          value={instrument.iaa}
          minFractionDigits={2}
          maxFractionDigits={5}
          onChange={(e) => updateInstrument({ key: 'iaa', val: e.value })}
          mode="decimal"
        />
      </div>
    </div>
  );
}
