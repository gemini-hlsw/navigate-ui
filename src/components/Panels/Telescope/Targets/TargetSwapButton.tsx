import { useCanEdit } from '@/components/atoms/auth';
import { useToast } from '@/Helpers/toast';
import { useConfiguration } from '@gql/configs/Configuration';
import { Target } from '@gql/configs/gen/graphql';
import { useInstrument } from '@gql/configs/Instrument';
import { useRotator } from '@gql/configs/Rotator';
import {
  Instrument as InstrumentName,
  InstrumentSpecificsInput,
  RotatorTrackingInput,
  TargetPropertiesInput,
} from '@gql/server/gen/graphql';
import { useNavigateState } from '@gql/server/NavigateState';
import { useRestoreTarget, useSwapTarget } from '@gql/server/TargetSwap';
import { Button } from 'primereact/button';

export function TargetSwapButton({ selectedTarget }: { selectedTarget: Target | undefined }) {
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
  const instrument = instrumentData?.instrument;
  const { data: rotatorData, loading: rotatorLoading } = useRotator();
  const rotator = rotatorData?.rotator;

  const loading =
    stateLoading || swapLoading || restoreLoading || instrumentLoading || rotatorLoading || configurationLoading;

  const disabled = !canEdit;

  const label = data?.onSwappedTarget ? 'Point to Base' : 'Point to Guide Star';

  const onClick = () => {
    if (selectedTarget?.id && instrument && rotator) {
      // TODO: other inputs for swap/nonswap
      const instrumentInput: InstrumentSpecificsInput = {
        iaa: { degrees: instrument.iaa },
        focusOffset: { micrometers: instrument.focusOffset },
        agName: instrument.name,
        origin: { x: { micrometers: instrument.originX }, y: { micrometers: instrument.originY } },
      };
      const rotatorInput: RotatorTrackingInput = { ipa: { degrees: rotator.angle }, mode: rotator.tracking };
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

      if (data?.onSwappedTarget) {
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
