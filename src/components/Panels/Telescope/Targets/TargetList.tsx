import { Target } from './Target';
import { TargetType, TypeOfTarget } from '@/types';
import { useContext } from 'react';
import { VariablesContext } from '@Contexts/Variables/VariablesProvider';
import { useUpdateConfiguration } from '@gql/configs/Configuration';

export function TargetList({
  targets,
  type,
  selectedTarget,
}: {
  targets: TargetType[] | undefined;
  type?: TypeOfTarget;
  selectedTarget?: number | undefined;
}) {
  const { configuration, setConfiguration } = useContext(VariablesContext);
  const updateConfiguration = useUpdateConfiguration();

  function updateSelectedTarget(targetPk: number) {
    switch (type) {
      case 'SCIENCE':
      case 'BLINDOFFSET':
      case 'FIXED':
        updateConfiguration({
          variables: { pk: configuration.pk, selectedTarget: targetPk },
          onCompleted(data) {
            setConfiguration(data.updateConfiguration);
          },
        });
        break;

      case 'OIWFS':
        updateConfiguration({
          variables: { pk: configuration.pk, selectedOiTarget: targetPk },
          onCompleted(data) {
            setConfiguration(data.updateConfiguration);
          },
        });
        break;

      case 'PWFS1':
        updateConfiguration({
          variables: { pk: configuration.pk, selectedP1Target: targetPk },
          onCompleted(data) {
            setConfiguration(data.updateConfiguration);
          },
        });
        break;

      case 'PWFS2':
        updateConfiguration({
          variables: { pk: configuration.pk, selectedP2Target: targetPk },
          onCompleted(data) {
            setConfiguration(data.updateConfiguration);
          },
        });
        break;

      default:
        break;
    }
  }

  let displayTargets: JSX.Element[] = [];
  targets?.map((target: TargetType, index: number) => {
    displayTargets.push(
      <Target
        key={`obsTarget-${index}`}
        target={target}
        updateSelectedTarget={updateSelectedTarget}
        selectedTarget={selectedTarget}
        targetIndex={index}
      />,
    );
  });

  if (displayTargets.length === 0) {
    // Return an empty target as placeholder
    displayTargets.push(
      <Target
        key={`obsTarget-0`}
        target={{} as TargetType}
        updateSelectedTarget={(_: number) => undefined}
        selectedTarget={0}
      />,
    );
  }
  return (
    <div className="target">
      <ul className="target-list">{displayTargets}</ul>
    </div>
  );
}
