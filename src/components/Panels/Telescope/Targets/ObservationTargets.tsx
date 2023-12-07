import { Target } from "./Target"
import { ObservationType, TargetType } from "@/types"
import { useContext } from "react"
import { VariablesContext } from "@Contexts/Variables/VariablesProvider"

export function ObservationTargets({
  targets,
  probePk = undefined,
  probeIndex = undefined,
}: {
  targets: TargetType[] | undefined
  probePk?: number | undefined
  probeIndex?: number | undefined
}) {
  const { configuration, setConfiguration } = useContext(VariablesContext)

  function updateSelectedTarget(targetPk: number) {
    if (probePk !== undefined && configuration.observation?.guideProbes) {
      let idx = configuration.observation?.guideProbes?.findIndex(
        (g) => g.pk === probePk
      )
      setConfiguration({
        ...configuration,
        observation: {
          ...configuration.observation,
          selectedProbe: probePk,
          selectedGuideTarget: targetPk,
        },
      })
    } else {
      setConfiguration({
        ...configuration,
        observation: {
          ...(configuration.observation ?? ({} as ObservationType)),
          selectedTarget: targetPk,
        },
      })
    }
  }

  let displayTargets: JSX.Element[] = []
  targets?.map((target: TargetType, index: number) => {
    displayTargets.push(
      <Target
        key={`obsTarget-${index}`}
        target={target}
        updateSelectedTarget={updateSelectedTarget}
        selectedTarget={
          probePk === undefined
            ? configuration.observation?.selectedTarget
            : configuration.observation?.selectedGuideTarget
        }
        probeIndex={probeIndex}
        targetIndex={index}
      />
    )
  })

  if (displayTargets.length === 0) {
    // Return an empty target as placeholder
    displayTargets.push(
      <Target
        key={`obsTarget-0`}
        target={{} as TargetType}
        updateSelectedTarget={(_: number) => undefined}
        selectedTarget={0}
      />
    )
  }
  return (
    <div className="target">
      <ul className="target-list">{displayTargets}</ul>
    </div>
  )
}
