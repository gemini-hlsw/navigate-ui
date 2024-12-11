import { useConfiguration } from '@gql/configs/Configuration';
import type { Target } from '@gql/configs/gen/graphql';
import { useInstrument } from '@gql/configs/Instrument';
import { useRotator } from '@gql/configs/Rotator';
import type {
  Instrument as InstrumentName,
  InstrumentSpecificsInput,
  RotatorTrackingInput,
  TargetPropertiesInput,
} from '@gql/server/gen/graphql';
import { useNavigateState } from '@gql/server/NavigateState';
import { useRestoreTarget, useSwapTarget } from '@gql/server/TargetSwap';
import { Button } from 'primereact/button';

import { useCanEdit } from '@/components/atoms/auth';
import { useToast } from '@/Helpers/toast';

export function TargetSwapButton({
  selectedTarget,
  oiSelected,
  // p1Selected,
  // p2Selected,
}: {
  selectedTarget: Target | undefined;
  oiSelected: Target | undefined;
  // p1Selected: Target | undefined;
  // p2Selected: Target | undefined;
}) {
  const canEdit = useCanEdit();
  const toast = useToast();

  const { data, loading: stateLoading } = useNavigateState();
  const [swapTarget, { loading: swapLoading }] = useSwapTarget();
  const [restoreTarget, { loading: restoreLoading }] = useRestoreTarget();

  const { data: configurationData, loading: configurationLoading } = useConfiguration();
  const configuration = configurationData?.configuration;

  const { data: instrumentData, loading: instrumentLoading } = useInstrument({
    variables: { name: configuration?.obsInstrument ?? '', issPort: 3, wfs: 'NONE' },
  });

  const { data: acData, loading: acLoading } = useInstrument({
    variables: { name: `AC_${configuration?.site}` },
  });

  const acInst = acData?.instrument;
  const instrument = instrumentData?.instrument;
  const { data: rotatorData, loading: rotatorLoading } = useRotator();
  const rotator = rotatorData?.rotator;

  const loading =
    stateLoading ||
    swapLoading ||
    restoreLoading ||
    instrumentLoading ||
    rotatorLoading ||
    configurationLoading ||
    acLoading;

  const disabled = !canEdit;

  const label = data?.onSwappedTarget ? 'Point to Base' : 'Point to Guide Star';

  const onClick = () => {
    if (selectedTarget?.id && instrument && rotator && oiSelected && acInst) {
      // TODO: other inputs for swap/nonswap
      const rotatorInput: RotatorTrackingInput = { ipa: { degrees: rotator.angle }, mode: rotator.tracking };

      if (data?.onSwappedTarget) {
        // If restoring
        // Use the instrument associated with the science target
        const instrumentInput: InstrumentSpecificsInput = {
          iaa: { degrees: instrument.iaa },
          focusOffset: { micrometers: instrument.focusOffset },
          agName: instrument.name,
          origin: { x: { micrometers: instrument.originX }, y: { micrometers: instrument.originY } },
        };

        // Use the science target
        const targetInput: TargetPropertiesInput = {
          id: selectedTarget.id,
          name: selectedTarget.name,
          sidereal: {
            ra: { hms: selectedTarget?.ra?.hms },
            dec: { dms: selectedTarget?.dec?.dms },
            epoch: selectedTarget?.epoch,
          },
          // nonsidereal: // <- ???
          // wavelength: {nanometers: } // <- ???
        };

        void restoreTarget({
          variables: {
            config: {
              instrument: instrument.name as InstrumentName,
              instParams: instrumentInput,
              rotator: rotatorInput,
              sourceATarget: targetInput,
            },
          },
        });
      } else {
        // If swapping
        // Use the acquisition camera
        const instrumentInput: InstrumentSpecificsInput = {
          iaa: { degrees: acInst.iaa },
          focusOffset: { micrometers: acInst.focusOffset },
          agName: acInst.name,
          origin: { x: { micrometers: acInst.originX }, y: { micrometers: acInst.originY } },
        };

        // Use Guide target if swapping
        // TODO: Will use OI for now, in the future can be OI, P1 or P2
        const targetInput: TargetPropertiesInput = {
          id: oiSelected.id ?? 't-000',
          name: oiSelected.name,
          sidereal: {
            ra: { hms: oiSelected?.ra?.hms },
            dec: { dms: oiSelected?.dec?.dms },
            epoch: oiSelected?.epoch,
          },
          // nonsidereal: // <- ???
          // wavelength: {nanometers: } // <- ???
        };

        void swapTarget({
          variables: {
            swapConfig: {
              acParams: instrumentInput,
              rotator: rotatorInput,
              guideTarget: targetInput,
            },
          },
        });
      }
    } else {
      let detail;
      if (!selectedTarget) {
        detail = 'No target';
      } else if (!oiSelected) {
        detail = 'No guide star';
      } else if (!acInst) {
        detail = 'No acquisition camera';
      } else if (!instrument) {
        detail = 'No instrument';
      } else if (!rotator) {
        detail = 'No rotator';
      } else {
        detail = 'Unknown error';
      }
      toast?.show({
        severity: 'warn',
        summary: data?.onSwappedTarget ? 'Cannot restore target' : 'Cannot swap target',
        detail,
      });
    }
  };

  return <Button disabled={disabled} className="footer w-100" label={label} onClick={onClick} loading={loading} />;
}
