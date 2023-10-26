import { OdbImport } from "./Modals/OdbImport"
import { Systems } from "./Systems/Systems"
import { TargetDetails } from "./Details/TargetDetails"
import { GuidersDetails } from "./Details/GuidersDetails"
import { FixedTargetImport } from "./Modals/FixedTargetImport"
import { Footer } from "./Footer/Footer"
import { TelescopeProvider } from "./TelescopeProvider"
import { TelescopeTitle } from "../Title/TelescopeTitle"
import { SlewFlags } from "./Modals/SlewFlags"
import { ObservationTargets } from "./Targets/ObservationTargets"
import { useContext } from "react"
import { VariablesContext } from "../Variables/VariablesProvider"
import { GuiderTargets } from "./Targets/GuiderTargets"
import "./Telescope.scss"

export function Telescope({
  prevPanel,
  nextPanel,
}: {
  prevPanel: () => void
  nextPanel: () => void
}) {
  const { observation, selectedTarget } = useContext(VariablesContext)

  return (
    <TelescopeProvider>
      <div className="telescope">
        <TelescopeTitle prevPanel={prevPanel} nextPanel={nextPanel} />
        <ObservationTargets targets={observation.targets} />
        <GuiderTargets guideProbes={observation.guideProbes} />
        <Systems />
        <TargetDetails target={selectedTarget} />
        <GuidersDetails />
        <Footer />
        <OdbImport />
        <SlewFlags />
        {/* Add a way to import fixed targets <FixedTargetImport /> */}
      </div>
    </TelescopeProvider>
  )
}
