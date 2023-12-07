import { useContext } from "react"
import { Systems } from "./Systems/Systems"
import { TargetDetails } from "./Details/TargetDetails"
import { GuidersDetails } from "./Details/GuidersDetails"
import { Footer } from "./Footer/Footer"
import { TelescopeTitle } from "./Title/TelescopeTitle"
import { ObservationTargets } from "./Targets/ObservationTargets"
import { VariablesContext } from "@Contexts/Variables/VariablesProvider"
import { GuiderTargets } from "./Targets/GuiderTargets"
import "./Telescope.scss"
import { Title } from "@Shared/Title/Title"

export function Telescope({
  prevPanel,
  nextPanel,
}: {
  prevPanel: () => void
  nextPanel: () => void
}) {
  const { configuration, selectedTarget } = useContext(VariablesContext)

  return (
    <div className="telescope">
      <TelescopeTitle prevPanel={prevPanel} nextPanel={nextPanel} />
      <div className="body">
        <div className="base-target">
          <Title title="Base Target" />
          <ObservationTargets targets={configuration.observation?.targets} />
        </div>
        <GuiderTargets observation={configuration.observation} />
        <Systems />
        <TargetDetails target={selectedTarget} />
        <GuidersDetails />
        <Footer />
      </div>
      {/* Add a way to import fixed targets <FixedTargetImport /> */}
    </div>
  )
}
