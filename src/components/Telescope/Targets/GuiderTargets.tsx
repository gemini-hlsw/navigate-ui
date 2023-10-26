import { Dropdown } from "primereact/dropdown"
import { GuideProbeType, TargetType } from "../../../types"
import { Title } from "../../Title/Title"
import { ObservationTargets } from "./ObservationTargets"
import { Button } from "primereact/button"
import { useContext } from "react"
import { AuthContext } from "../../Auth/AuthProvider"

function GuiderFooter({ target }: { target: TargetType }) {
  const { canEdit } = useContext(AuthContext)
  return (
    <div className="guiders-footer">
      <Dropdown
        disabled={!canEdit || !Boolean(target.id)} // check is a valid target
        value={"NORMAL"}
        options={[{ label: "Normal Guiding", value: "NORMAL" }]}
      />
      <Button
        disabled={!canEdit || !Boolean(target.id)} // check is a valid target
        className="w-100"
        label="Point to guide target"
        onClick={() => console.log("Point to guide target")}
      />
    </div>
  )
}

export function GuiderTargets({
  guideProbes,
}: {
  guideProbes: GuideProbeType[] | undefined
}) {
  let displayProbes: JSX.Element[] = []
  guideProbes?.map((gp: GuideProbeType, index: number) => {
    displayProbes.push(
      <div key={`guideProbe-${index}`}>
        <Title title={`${gp.probe}`} />
        <ObservationTargets targets={gp.targets} probePk={gp.pk} />
        <GuiderFooter target={{} as TargetType} />
      </div>
    )
  })

  if (displayProbes.length === 0) {
    displayProbes.push(
      <div key={`guideProbe-0`} className="guide-probe">
        <Title title={`OIWFS`} />
        <ObservationTargets targets={[]} />
        <GuiderFooter target={{} as TargetType} />
      </div>
    )
  }
  return (
    <div className="guiders">
      <Title title="Guiders" />
      {displayProbes}
    </div>
  )
}
