import { Target } from "./Target"
import { TargetType } from "../../../types"
import { useUpdateObservationSelectedTarget } from "../../../gql/configs/Observation"
import { useContext } from "react"
import { VariablesContext } from "../../Variables/VariablesProvider"

export function ObservationTargets({
  targets,
  probePk = undefined,
}: {
  targets: TargetType[] | undefined
  probePk?: number | undefined
}) {
  const { observation, setObservation } = useContext(VariablesContext)
  const updateObservationSelectedTarget = useUpdateObservationSelectedTarget()

  function updateSelectedTarget(targetPk: number) {
    if (probePk !== undefined) {
    } else {
      updateObservationSelectedTarget({
        variables: {
          pk: observation.pk,
          selectedTarget: targetPk,
        },
        onCompleted(data) {
          setObservation(data.updateObservationSelectedTarget)
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
            ? observation.selectedTarget
            : observation.guideProbes?.[probePk]?.selectedTarget
        }
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
