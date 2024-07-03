import { useMutation, OperationVariables } from '@apollo/client';
import { VariablesOf, TypedDocumentNode } from '@graphql-typed-document-node/core';

import { useContext, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { ButtonStateType } from '@/types';
import { VariablesContext } from '@Contexts/Variables/VariablesProvider';
import { Toast } from 'primereact/toast';
import { BTN_CLASSES } from '@/Helpers/constants';
import { graphql } from './gen';
import { Instrument, SlewOptionsInput } from './gen/graphql';

// Generic mutation button
function MutationButton<A, B, T extends TypedDocumentNode<A, B>>({
  mutation,
  variables,
  className,
  label,
  disabled = false,
}: {
  mutation: T;
  variables: B;
  className: string;
  label: string;
  disabled: boolean;
}) {
  const TOAST_LIFE = 5000;
  const toast = useRef<Toast>(null);
  const [mutationFunction, { loading, error }] = useMutation<T>(mutation, {
    variables: variables as OperationVariables,
  });

  useEffect(() => {
    if (error) {
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: error.message,
        life: TOAST_LIFE,
      });
    }
  }, [error]);

  const state: ButtonStateType = loading ? 'ACTIVE' : 'PENDING';

  return (
    <>
      <Toast ref={toast} />
      <Button
        className={`${BTN_CLASSES[state]} ${className}`}
        onClick={() =>
          void mutationFunction({
            variables: variables as OperationVariables,
          })
        }
        loading={loading}
        disabled={disabled}
        label={label}
      />
    </>
  );
}

// BUTTONS
// MCS
const MOUNT_MUTATION = graphql(`
  mutation changeMountState($enable: Boolean!) {
    mountFollow(enable: $enable) {
      result
      msg
    }
  }
`);

export function MCS({ label, disabled }: { label: string; disabled: boolean }) {
  return (
    <MutationButton
      mutation={MOUNT_MUTATION}
      variables={{ enable: true }}
      className=""
      label={label}
      disabled={disabled}
    />
  );
}

// PARK
const PARK_MUTATION = graphql(`
  mutation mountPark {
    mountPark {
      result
      msg
    }
  }
`);

export function McsPark({ label, disabled }: { label: string; disabled: boolean; style: object }) {
  return <MutationButton mutation={PARK_MUTATION} variables={{}} className="" label={label} disabled={disabled} />;
}

// SLEW
const SLEW_MUTATION = graphql(`
  mutation runSlew($slewOptions: SlewOptionsInput!, $config: TcsConfigInput!) {
    slew(slewOptions: $slewOptions, config: $config) {
      result
    }
  }
`);

export function Slew({ label, disabled, className }: { label: string; disabled: boolean; className: string }) {
  const { baseTargets, oiTargets, instrument, slewFlags, rotator, configuration } = useContext(VariablesContext);

  const selectedTarget = baseTargets.find((t) => t.pk === configuration.selectedTarget);

  const selectedOiTarget = oiTargets.find((t) => t.pk === configuration.selectedOiTarget);

  if (!selectedTarget) {
    return <></>;
  }

  const variables: VariablesOf<typeof SLEW_MUTATION> = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    slewOptions: (({ __typename, pk, ...o }) => o)(slewFlags) as SlewOptionsInput,
    config: {
      instParams: {
        iaa: { degrees: instrument.iaa },
        focusOffset: { micrometers: instrument.focusOffset },
        agName: instrument.name,
        origin: {
          x: { micrometers: instrument.originX },
          y: { micrometers: instrument.originY },
        },
      },
      sourceATarget: {
        id: selectedTarget.id!,
        name: selectedTarget.name,
        sidereal: {
          ra: { hms: selectedTarget?.ra?.hms },
          dec: { dms: selectedTarget?.dec?.dms },
          epoch: selectedTarget?.epoch,
        },
        wavelength: { nanometers: 400 },
      },
      instrument: instrument.name as Instrument,
      rotator: { ipa: { degrees: rotator.angle }, mode: rotator.tracking },
      ...(selectedOiTarget && {
        oiwfs: {
          target: {
            name: selectedOiTarget.name,
            sidereal: {
              ra: { hms: selectedOiTarget.ra?.hms },
              dec: { dms: selectedOiTarget.dec?.dms },
              epoch: selectedOiTarget.epoch,
            },
          },
          tracking: {
            nodAchopA: true,
            nodAchopB: false,
            nodBchopA: false,
            nodBchopB: false,
          },
        },
      }),
    },
  };

  return (
    <MutationButton
      mutation={SLEW_MUTATION}
      variables={variables}
      className={className}
      label={label}
      disabled={disabled || !selectedTarget.id}
    />
  );
}

// OIWFS
const OIWFS_MUTATION = graphql(`
  mutation setOiwfsTarget(
    $id: TargetId!
    $name: NonEmptyString!
    $ra: HmsString
    $dec: DmsString
    $epoch: EpochString
    $wavelength: PosBigDecimal
  ) {
    oiwfsTarget(
      target: {
        id: $id
        name: $name
        sidereal: { ra: { hms: $ra }, dec: { dms: $dec }, epoch: $epoch }
        wavelength: { nanometers: $wavelength }
      }
    ) {
      result
    }
  }
`);

export function Oiwfs({ label, disabled, className = '' }: { label: string; disabled: boolean; className?: string }) {
  const { oiTargets, configuration } = useContext(VariablesContext);
  const selectedTarget = oiTargets.find((t) => t.pk === configuration.selectedOiTarget);

  return selectedTarget ? (
    <MutationButton
      mutation={OIWFS_MUTATION}
      variables={{
        id: selectedTarget.id!,
        name: selectedTarget.name,
        ra: selectedTarget.ra?.hms,
        dec: selectedTarget.dec?.dms,
        epoch: selectedTarget.epoch,
        wavelength: 400,
      }}
      className={className}
      label={label}
      disabled={disabled || !selectedTarget.name}
    />
  ) : (
    <></>
  );
}
