import { Title } from '@Shared/Title/Title';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { useRotator, useUpdateRotator } from '@gql/configs/Rotator';

export function Rotator({ canEdit }: { canEdit: boolean }) {
  const rotator = useRotator().data?.rotator;
  const updateRotator = useUpdateRotator();

  return (
    <div className="rotator">
      <Title title={'Rotator'} />
      <div className="body">
        <span className="label">Mode</span>
        <Dropdown
          disabled={!canEdit}
          value={rotator?.tracking}
          options={['TRACKING', 'FIXED']}
          onChange={(e) => {
            if (rotator)
              updateRotator({
                variables: { pk: rotator.pk, tracking: e.target.value },
              });
          }}
          placeholder="Select a tracking"
        />
        <span className="label">Position Angle</span>
        <InputNumber
          disabled={!canEdit}
          value={rotator?.angle}
          minFractionDigits={2}
          maxFractionDigits={7}
          onValueChange={(e) => {
            if (rotator)
              updateRotator({
                variables: { pk: rotator.pk, angle: e.target.value },
              });
          }}
          mode="decimal"
        />
      </div>
    </div>
  );
}
