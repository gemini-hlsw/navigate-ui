import { Target } from './Target';
import { TargetType, TypeOfTarget } from '@/types';
import { useConfiguration, useUpdateConfiguration } from '@gql/configs/Configuration';
import { useEffect } from 'react';

export function TargetList({ targets, type }: { targets: TargetType[]; type?: TypeOfTarget }) {
  const configuration = useConfiguration().data?.configuration;
  const updateConfiguration = useUpdateConfiguration();

  let selectedTarget: number | null | undefined = null;
  switch (type) {
    case 'OIWFS':
      selectedTarget = configuration?.selectedOiTarget;
      break;
    case 'PWFS1':
      selectedTarget = configuration?.selectedP1Target;
      break;
    case 'PWFS2':
      selectedTarget = configuration?.selectedP2Target;
      break;

    default:
    case 'SCIENCE':
    case 'BLINDOFFSET':
    case 'FIXED':
      selectedTarget = configuration?.selectedTarget;
      break;
  }

  function updateSelectedTarget(targetPk: number) {
    switch (type) {
      case 'OIWFS':
        updateConfiguration({
          variables: { pk: configuration!.pk, selectedOiTarget: targetPk },
        });
        break;

      case 'PWFS1':
        updateConfiguration({
          variables: { pk: configuration!.pk, selectedP1Target: targetPk },
        });
        break;

      case 'PWFS2':
        updateConfiguration({
          variables: { pk: configuration!.pk, selectedP2Target: targetPk },
        });
        break;

      default:
      case 'SCIENCE':
      case 'BLINDOFFSET':
      case 'FIXED':
        updateConfiguration({
          variables: { pk: configuration!.pk, selectedTarget: targetPk },
        });
        break;
    }
  }

  const displayTargets = targets.map((target: TargetType, index: number) => (
    <Target
      key={`obsTarget-${target.pk}-${target.id}`}
      target={target}
      updateSelectedTarget={updateSelectedTarget}
      selectedTarget={selectedTarget}
      targetIndex={index}
    />
  ));

  if (displayTargets.length === 0) {
    // Return an empty target as placeholder
    displayTargets.push(
      <Target key={`obsTarget-0`} target={{} as TargetType} updateSelectedTarget={() => ({})} selectedTarget={0} />,
    );
  }
  return (
    <div className="target">
      <ul className="target-list">{displayTargets}</ul>
    </div>
  );
}
