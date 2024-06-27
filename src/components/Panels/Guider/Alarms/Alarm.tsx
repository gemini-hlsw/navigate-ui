import { Checkbox } from 'primereact/checkbox';
import { Title } from '@Shared/Title/Title';
import { InputNumber } from 'primereact/inputnumber';

export function Alarm({
  wfs,
  counts,
  limit,
  subaperture,
  enabled,
  disabled,
}: {
  wfs: string;
  counts: number;
  limit: number;
  subaperture: string;
  enabled: boolean;
  disabled: boolean;
}) {
  return (
    <div className="alarm">
      <Title title={wfs} />
      <div className="body">
        <span className="label">Counts</span>
        <span style={{ alignSelf: 'center' }}>{counts}</span>
        <span className="label">Limit</span>
        <InputNumber disabled={disabled} value={limit} onValueChange={(e) => console.log(e.value ? e.value : 0)} />
        <span className="label">Subaperture</span>
        <span style={{ alignSelf: 'center' }}>{subaperture}</span>
        <span className="label">Enabled</span>
        <Checkbox disabled={disabled} checked={enabled} onChange={(e) => e.target.value} />
      </div>
    </div>
  );
}
