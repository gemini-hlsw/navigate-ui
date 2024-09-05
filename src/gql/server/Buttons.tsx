/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { useMutation, OperationVariables } from '@apollo/client';
import { VariablesOf, TypedDocumentNode } from '@graphql-typed-document-node/core';

import { useEffect, useRef } from 'react';
import { Button, ButtonProps } from 'primereact/button';
import { SlewFlagsType } from '@/types';
import { Toast } from 'primereact/toast';
import { BTN_CLASSES } from '@/Helpers/constants';
import { graphql } from './gen';
import { Instrument, MechSystemState } from './gen/graphql';
import { useSlewFlags } from '@gql/configs/SlewFlags';
import { useConfiguration } from '@gql/configs/Configuration';
import { useRotator } from '@gql/configs/Rotator';
import { useTargets } from '@gql/configs/Target';
import { useInstrument } from '@gql/configs/Instrument';
import { clsx } from 'clsx';
import { MOUNT_FOLLOW_MUTATION, OIWFS_FOLLOW_MUTATION, ROTATOR_FOLLOW_MUTATION, SCS_FOLLOW_MUTATION } from './follow';
import { ROTATOR_PARK_MUTATION, MOUNT_PARK_MUTATION, OIWFS_PARK_MUTATION } from './park';

// Generic mutation button
function MutationButton<T>({
  mutation,
  variables,
  ...props
}: {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  mutation: T extends TypedDocumentNode<infer _TData, infer _TVariables> ? T : never;
  variables: VariablesOf<T> extends OperationVariables ? VariablesOf<T> : never;
} & ButtonProps) {
  const TOAST_LIFE = 5000;
  const toast = useRef<Toast>(null);
  const [mutationFunction, { loading, error }] = useMutation<T>(mutation, {
    variables: variables,
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

  return (
    <>
      <Toast ref={toast} />
      <Button {...props} onClick={() => void mutationFunction({ variables })} loading={props.loading || loading} />
    </>
  );
}

// BUTTONS

export function MCS({ className, state, ...props }: ButtonProps & { state: MechSystemState | undefined }) {
  const classes = classNameForState(state, true);

  return (
    <MutationButton
      mutation={MOUNT_FOLLOW_MUTATION}
      variables={{ enable: state?.follow === 'NOT_FOLLOWING' }}
      {...props}
      className={clsx(className, classes)}
    />
  );
}

export function SCS({ className, state, ...props }: ButtonProps & { state: MechSystemState | undefined }) {
  // TODO: Implement SCS mutation
  const classes = classNameForState(state, true);
  return (
    <MutationButton
      mutation={SCS_FOLLOW_MUTATION}
      variables={{ enable: state?.follow === 'NOT_FOLLOWING' }}
      {...props}
      className={clsx(className, classes)}
    />
  );
}

export function CRCS({ className, state, ...props }: ButtonProps & { state: MechSystemState | undefined }) {
  const classes = classNameForState(state, true);
  return (
    <MutationButton
      mutation={ROTATOR_FOLLOW_MUTATION}
      variables={{ enable: state?.follow === 'NOT_FOLLOWING' }}
      {...props}
      className={clsx(className, classes)}
    />
  );
}

export function PWFS1({ className, state, ...props }: ButtonProps & { state: MechSystemState | undefined }) {
  // TODO: Implement PWFS1 mutation
  const classes = classNameForState(state, false);
  return <Button {...props} className={clsx(className, classes)} />;
}

export function PWFS2({ className, state, ...props }: ButtonProps & { state: MechSystemState | undefined }) {
  // TODO: Implement PWFS2 mutation
  const classes = classNameForState(state, false);
  return <Button {...props} className={clsx(className, classes)} />;
}

export function AOWFS({ className, ...props }: ButtonProps) {
  // TODO: Implement AOWFS mutation and state
  return <Button {...props} className={clsx(className, BTN_CLASSES.INACTIVE)} />;
}

export function OIWFS({ className, state, ...props }: ButtonProps & { state: MechSystemState | undefined }) {
  const classes = classNameForState(state, true);
  return (
    <MutationButton
      mutation={OIWFS_FOLLOW_MUTATION}
      variables={{ enable: state?.follow === 'NOT_FOLLOWING' }}
      {...props}
      className={clsx(className, classes)}
    />
  );
}

export function McsPark(props: ButtonProps) {
  return <MutationButton mutation={MOUNT_PARK_MUTATION} variables={{}} {...props} />;
}

export function CrcsPark(props: ButtonProps) {
  return <MutationButton mutation={ROTATOR_PARK_MUTATION} variables={{}} {...props} />;
}

export function OiwfsPark(props: ButtonProps) {
  return <MutationButton mutation={OIWFS_PARK_MUTATION} variables={{}} {...props} />;
}

// SLEW
const SLEW_MUTATION = graphql(`
  mutation runSlew($slewOptions: SlewOptionsInput!, $config: TcsConfigInput!) {
    slew(slewOptions: $slewOptions, config: $config) {
      result
    }
  }
`);

export function Slew(props: ButtonProps) {
  const { oiTargets, baseTargets } = useTargets().data;
  const instrument = useInstrument().data?.instrument;
  const { data, loading } = useSlewFlags();
  const slewFlags = data?.slewFlags ?? ({} as SlewFlagsType);
  const rotator = useRotator().data?.rotator;
  const configuration = useConfiguration().data?.configuration;

  const selectedTarget = baseTargets.find((t) => t.pk === configuration?.selectedTarget);

  const selectedOiTarget = oiTargets.find((t) => t.pk === configuration?.selectedOiTarget);

  if (!selectedTarget || !instrument || !rotator) {
    return <Button {...props} disabled={true} />;
  }

  const variables: VariablesOf<typeof SLEW_MUTATION> = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    slewOptions: (({ __typename, pk, ...o }) => o)(slewFlags),
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
      {...props}
      loading={props.loading || loading}
      disabled={props.disabled || !selectedTarget.id}
    />
  );
}

/**
 *
 * @param state State of the subsystem
 * @param usedSubsystem If the subsystem is being used. Everything is always used, except the guiders (PWFS1, PWFS2, OIWFS, AOWFS), which are optional. Which one is used is given by the guide environment. But right now, we can use only OIWFS
 */
function classNameForState(state: MechSystemState | undefined, usedSubsystem: boolean) {
  if (!state) return '';

  if (!usedSubsystem) {
    return 'p-button-secondary';
  } else if (state.follow === 'FOLLOWING' && state.parked === 'NOT_PARKED') {
    return '';
  } else {
    return BTN_CLASSES.ACTIVE;
  }
}
