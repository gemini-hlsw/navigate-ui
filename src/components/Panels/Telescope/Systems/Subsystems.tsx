import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Slider } from 'primereact/slider';
import { McsPark } from '@gql/server/Buttons';
import { useEffect, useState } from 'react';
import { MechanismType } from '@/types';
import { useGetMechanism, useUpdateMechanism } from '@gql/configs/Mechanism';
import { BTN_CLASSES } from '@/Helpers/constants';

export function TopSubsystems({ canEdit }: { canEdit: boolean }) {
  return (
    <div className="top-left">
      <McsPark disabled={!canEdit} style={{ gridArea: 'g11' }} label="Park" />
      <Button disabled={!canEdit} style={{ gridArea: 'g12' }} label="Unwrap" />
      <Button disabled={!canEdit} style={{ gridArea: 'g31' }} label="Park" />
      <Button disabled={!canEdit} style={{ gridArea: 'g32' }} label="Unwrap" />
      <Button disabled={!canEdit} style={{ gridArea: 'g41' }} label="Park" />
      <Button disabled={!canEdit} style={{ gridArea: 'g42' }} label="Unwrap" />
      <Button disabled={!canEdit} style={{ gridArea: 'g51' }} label="Park" />
      <Button disabled={!canEdit} style={{ gridArea: 'g52' }} label="Unwrap" />
    </div>
  );
}

const DOME_MODE = [
  { label: 'MinVibration', value: 'MinVibration' },
  { label: 'Rome', value: 'RM' },
  { label: 'London', value: 'LDN' },
  { label: 'Istanbul', value: 'IST' },
  { label: 'Paris', value: 'PRS' },
];

const SHUTTER_MODE = [
  { label: 'Tracking', value: 'Tracking' },
  { label: 'Rome', value: 'RM' },
  { label: 'London', value: 'LDN' },
  { label: 'Istanbul', value: 'IST' },
  { label: 'Paris', value: 'PRS' },
];

export function BotSubsystems({ canEdit }: { canEdit: boolean }) {
  const [state, setState] = useState<MechanismType>({});
  const [domeMode, setDomeMode] = useState('MinVibration');
  const [shutterMode, setShutterMode] = useState('Tracking');
  const [aperture, setAperture] = useState(90);
  const [WVGate, setWVGate] = useState<any>(50);
  const [EVGate, setEVGate] = useState<any>(50);
  const getMechanism = useGetMechanism();
  const updateMechanism = useUpdateMechanism();

  useEffect(() => {
    getMechanism({
      onCompleted(data) {
        setState(data.mechanism!);
        setEVGate(data.mechanism!.eVGateValue);
        setWVGate(data.mechanism!.wVGateValue);
        setAperture(data.mechanism!.shutterAperture!);
        setDomeMode(data.mechanism!.domeMode!);
        setShutterMode(data.mechanism!.shutterMode!);
      },
    });
  }, []);

  function modifyMechanism(vars: object) {
    updateMechanism({
      variables: {
        pk: state.pk!,
        ...vars,
      },
      onCompleted(data) {
        setState(data.updateMechanism!);
      },
    });
  }

  return (
    <div className="bottom">
      <Button disabled={!canEdit} style={{ gridArea: 'g11' }} label="Park" className={BTN_CLASSES[state.oiwfsPark!]} />
      <Button disabled={!canEdit} style={{ gridArea: 'g21' }} label="Park" className={BTN_CLASSES[state.odgwPark!]} />
      <Button disabled={!canEdit} style={{ gridArea: 'g31' }} label="Park" className={BTN_CLASSES[state.aowfsPark!]} />
      <Button disabled={!canEdit} style={{ gridArea: 'g41' }} label="Park" className={BTN_CLASSES[state.domePark!]} />
      <span
        style={{
          textAlign: 'center',
          alignSelf: 'center',
          gridArea: 'g42',
        }}
      >
        Mode
      </span>
      <Dropdown
        disabled={!canEdit}
        style={{ gridArea: 'g43' }}
        value={domeMode}
        options={DOME_MODE}
        onChange={(e) => setDomeMode(e.value)}
        placeholder="Select a Dome Mode"
      />
      <Button
        disabled={!canEdit}
        style={{ gridArea: 'g46' }}
        label="Set"
        onClick={() => modifyMechanism({ domeMode: domeMode })}
      />
      <Button
        disabled={!canEdit}
        style={{ gridArea: 'g51' }}
        label="Park"
        className={BTN_CLASSES[state.shuttersPark!]}
      />
      <span
        style={{
          textAlign: 'center',
          alignSelf: 'center',
          gridArea: 'g52',
        }}
      >
        Mode
      </span>
      <Dropdown
        disabled={!canEdit}
        style={{ gridArea: 'g53' }}
        value={shutterMode}
        options={SHUTTER_MODE}
        onChange={(e) => setShutterMode(e.value)}
        placeholder="Select a Shutter Mode"
      />
      <span
        style={{
          textAlign: 'center',
          alignSelf: 'center',
          gridArea: 'g54',
        }}
      >
        Aperture
      </span>
      <InputNumber
        disabled={!canEdit}
        style={{ gridArea: 'g55' }}
        value={aperture}
        onValueChange={(e) => setAperture(e.value ? e.value : 0)}
        mode="decimal"
      />
      <Button
        disabled={!canEdit}
        style={{ gridArea: 'g56' }}
        label="Set"
        onClick={() =>
          modifyMechanism({
            shutterMode: shutterMode,
            shutterAperture: aperture,
          })
        }
      />
      <Button
        disabled={!canEdit}
        style={{ gridArea: 'g61' }}
        label="Close"
        className={BTN_CLASSES[state.wVGateClose!]}
      />
      <InputNumber
        disabled={!canEdit}
        style={{ gridArea: 'g62' }}
        value={WVGate}
        onValueChange={(e) => setWVGate(e.value ? e.value : 0)}
        mode="decimal"
      />
      <Slider
        disabled={!canEdit}
        style={{ gridArea: 'g63', marginTop: '10px' }}
        value={WVGate}
        onChange={(e) => setWVGate(e.value)}
      />
      <Button
        disabled={!canEdit}
        style={{ gridArea: 'g66' }}
        label="Move"
        onClick={() => modifyMechanism({ wVGateValue: WVGate })}
      />
      <Button
        disabled={!canEdit}
        style={{ gridArea: 'g71' }}
        label="Close"
        className={BTN_CLASSES[state.eVGateClose!]}
      />
      <InputNumber
        disabled={!canEdit}
        style={{ gridArea: 'g72' }}
        value={EVGate}
        onValueChange={(e) => setEVGate(e.value ? e.value : 0)}
        mode="decimal"
      />
      <Slider
        disabled={!canEdit}
        style={{ gridArea: 'g73', marginTop: '10px' }}
        value={EVGate}
        onChange={(e) => setEVGate(e.value)}
      />
      <Button
        disabled={!canEdit}
        style={{ gridArea: 'g76' }}
        label="Move"
        onClick={() => modifyMechanism({ eVGateValue: EVGate })}
      />
    </div>
  );
}
