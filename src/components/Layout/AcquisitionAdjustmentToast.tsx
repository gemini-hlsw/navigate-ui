import './AcquisitionAdjustmentToast.css';

import { useAcquisitionAdjustment, useAcquisitionAdjustmentState } from '@gql/server/AcquisitionAdjustment';
import { Button } from 'primereact/button';
import { ButtonGroup } from 'primereact/buttongroup';
import type { ToastMessage } from 'primereact/toast';
import { useEffect } from 'react';

import { useToast } from '@/Helpers/toast';

import { Check, XMark } from '../Icons';

type AcquisitionAdjustmentState = NonNullable<
  ReturnType<typeof useAcquisitionAdjustmentState>['data']
>['acquisitionAdjustmentState'];
export function AcquisitionAdjustmentToast() {
  const toast = useToast();

  const { data } = useAcquisitionAdjustmentState();

  useEffect(() => {
    if (data?.acquisitionAdjustmentState.command === 'ASK_USER') {
      const acquisitionAdjustmentToast: ToastMessage = {
        id: `acquisition-adjustment`,
        severity: 'info',
        summary: `Apply GACQ offsets?`,
        detail: <AcquisitionAdjustmentPrompt state={data.acquisitionAdjustmentState} />,
        sticky: true,
      };
      toast?.show(acquisitionAdjustmentToast);
      return () => toast?.remove(acquisitionAdjustmentToast);
    }
  }, [data, toast]);
  return <></>;
}

function AcquisitionAdjustmentPrompt({ state }: { state: AcquisitionAdjustmentState }) {
  const [adjustAcquisition] = useAcquisitionAdjustment();

  const input = {
    offset: {
      p: {
        arcseconds: state.offset.p.arcseconds,
      },
      q: {
        arcseconds: state.offset.q.arcseconds,
      },
    },
    iaa: state.iaa
      ? {
          degrees: state.iaa?.degrees,
        }
      : undefined,
    ipa: state.ipa
      ? {
          degrees: state.ipa?.degrees,
        }
      : undefined,
  };

  return (
    <div>
      <div className="acquisition-adjustment-prompt">
        <span>P = {state.offset.p.arcseconds}</span>
        <span>Q = {state.offset.q.arcseconds}</span>
        <span>IPA = {state.ipa?.degrees ?? 'N/A'}</span>
        <span>IAA = {state.iaa?.degrees ?? 'N/A'}</span>
      </div>
      <ButtonGroup>
        <Button
          icon={<Check />}
          size="small"
          severity="success"
          label="Accept"
          onClick={() =>
            void adjustAcquisition({
              variables: {
                input: {
                  ...input,
                  command: 'USER_CONFIRMS',
                },
              },
            })
          }
        />
        <Button
          icon={<XMark />}
          size="small"
          severity="secondary"
          label="Cancel"
          onClick={() =>
            void adjustAcquisition({
              variables: {
                input: {
                  ...input,
                  command: 'USER_CANCELS',
                },
              },
            })
          }
        />
      </ButtonGroup>
    </div>
  );
}
