import { useCallback, useId } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputSwitch } from 'primereact/inputswitch';
import { useUpdateSlewFlags } from '@gql/configs/SlewFlags';
import { useSlewFlags, useSlewVisible } from '@/components/atoms/slew';
import { UpdateSlewFlagsMutationVariables } from '@gql/configs/gen/graphql';
import { useCanEdit } from '@/components/atoms/auth';

export function SlewFlags() {
  const [slewVisible, setSlewVisible] = useSlewVisible();

  const onHide = useCallback(() => setSlewVisible(false), []);

  return (
    <Dialog header="Set slew flags" visible={slewVisible} modal onHide={onHide}>
      <div className="slew-flags">
        <SlewFlagInput flag="zeroChopThrow" label="Zero Chop Throw" />
        <SlewFlagInput flag="zeroSourceOffset" label="Zero Source Offset" />
        <SlewFlagInput flag="zeroSourceDiffTrack" label="Zero Source Diff Track" />
        <SlewFlagInput flag="zeroMountOffset" label="Zero Mount Offset" />
        <SlewFlagInput flag="zeroMountDiffTrack" label="Zero Mount Diff Track" />
        <SlewFlagInput flag="shortcircuitTargetFilter" label="Shortcircuit Target Filter" />
        <SlewFlagInput label="Shortcircuit Mount Filter" flag="shortcircuitMountFilter" />
        <SlewFlagInput label="Reset Pointing" flag="resetPointing" />
        <SlewFlagInput label="Stop Guide" flag="stopGuide" />
        <SlewFlagInput label="Zero Guide Offset" flag="zeroGuideOffset" />
        <SlewFlagInput label="Zero Instrument Offset" flag="zeroInstrumentOffset" />
        <SlewFlagInput label="Autopark P1 WFS" flag="autoparkPwfs1" />
        <SlewFlagInput label="Autopark P2 WFS" flag="autoparkPwfs2" />
        <SlewFlagInput label="Autopark OI WFS" flag="autoparkOiwfs" />
        <SlewFlagInput label="Autopark Gems" flag="autoparkGems" />
        <SlewFlagInput label="Autopark AO WFS" flag="autoparkAowfs" />
      </div>
    </Dialog>
  );
}

function SlewFlagInput<T extends keyof UpdateSlewFlagsMutationVariables>({ flag, label }: { flag: T; label: string }) {
  const canEdit = useCanEdit();
  const [slewFlags, setSlewFlags] = useSlewFlags();
  const id = useId();
  const [updateSlewFlags, { loading }] = useUpdateSlewFlags();

  function updateFlags<T extends keyof UpdateSlewFlagsMutationVariables>(flagName: T, value: boolean) {
    updateSlewFlags({
      variables: {
        pk: slewFlags.pk,
        [flagName]: value,
      },
      onCompleted: (data) => {
        setSlewFlags(data.updateSlewFlags);
      },
    });
  }
  const inputId = `${flag}-${id}`;

  return (
    <>
      <label htmlFor={inputId} style={{ textAlign: 'center', alignSelf: 'center' }}>
        {label}
      </label>
      <InputSwitch
        inputId={inputId}
        disabled={!canEdit || loading}
        checked={slewFlags[flag]}
        onChange={() => updateFlags(flag, !slewFlags[flag])}
      />
    </>
  );
}
