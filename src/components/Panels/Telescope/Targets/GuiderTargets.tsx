import { Dropdown } from "primereact/dropdown"
import { ProgressBar } from "primereact/progressbar"
import { GuideProbeType, ObservationType, TargetType } from "@/types"
import { Title } from "@Shared/Title/Title"
import { ObservationTargets } from "./ObservationTargets"
import { Button } from "primereact/button"
import { useContext } from "react"
import { AuthContext } from "@Contexts/Auth/AuthProvider"
import { VariablesContext } from "@Contexts/Variables/VariablesProvider"
import { UpdateGuideTargets } from "./UpdateGuideTargets"

function GuiderFooter({ disabled }: { disabled: boolean }) {
  return (
    <div className="guiders-footer">
      <Dropdown
        disabled={disabled} // check is a valid target
        value={"NORMAL"}
        options={[{ label: "Normal Guiding", value: "NORMAL" }]}
      />
    </div>
  )
}

export function GuiderTargets({
  observation,
}: {
  observation: ObservationType | undefined
}) {
  const { canEdit } = useContext(AuthContext)
  const { loadingGuideTarget } = useContext(VariablesContext)

  let displayProbes: JSX.Element[] = []
  observation?.guideProbes?.map((gp: GuideProbeType, index: number) => {
    displayProbes.push(
      <div key={`guideProbe-${index}`} className="guide-probe">
        <Title
          title={`${gp.probe}`}
          className={gp.pk === observation?.selectedProbe ? "active" : ""}
        />
        <ObservationTargets
          targets={gp.targets}
          probePk={gp.pk}
          probeIndex={index}
        />
        <GuiderFooter disabled={!canEdit} />
      </div>
    )
  })

  if (displayProbes.length === 0) {
    displayProbes.push(
      <div key={`guideProbe-0`} className="guide-probe">
        <Title title={`OIWFS`} />
        <ObservationTargets targets={[]} />
        <GuiderFooter disabled={true} />
      </div>
    )
  }
  return (
    <div className="guiders">
      <Title title="Guiders">
        <UpdateGuideTargets canEdit={canEdit} />
      </Title>
      <div className="body">
        {loadingGuideTarget ? (
          <ProgressBar
            mode="indeterminate"
            style={{ height: "6px" }}
          ></ProgressBar>
        ) : (
          displayProbes
        )}
      </div>
      <Button
        disabled={!canEdit} // check is a valid target || !Boolean(selectedGuideTarget?.id)
        className="footer w-100"
        label="Point to guide target"
        onClick={() => console.log("Point to guide target")}
      />
    </div>
  )
}
