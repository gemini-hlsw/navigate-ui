import { OdbImport } from './Modals/OdbImport'
import { ScienceTarget } from "./Targets/ScienceTarget"
import { GuideTarget } from "./Targets/GuideTarget"
// import { Guiders } from "./Targets/Guiders"
import { Guiders } from "./Targets/Guiders/Guiders"
import { Systems } from "./Systems/Systems"
import { TargetDetails } from './Details/TargetDetails'
import { GuidersDetails } from './Details/GuidersDetails'
import { FixedTargetImport } from './Modals/FixedTargetImport'
import { Footer } from './Footer/Footer'
import { TelescopeProvider } from './TelescopeProvider'
import { TelescopeTitle } from '../Title/TelescopeTitle'
import { Title } from '../Title/Title'
import "./Telescope.scss"
import { SlewFlags } from './Modals/SlewFlags'


export function Telescope({ prevPanel, nextPanel }: { prevPanel: () => void, nextPanel: () => void }) {
  return (
    <TelescopeProvider>
      <div className="telescope">
        <TelescopeTitle prevPanel={prevPanel} nextPanel={nextPanel} />
        <ScienceTarget type="base" />
        <Guiders />
        {/* <Guiders>
          <GuideTarget type="PWFS1" />
          <GuideTarget type="PWFS2" />
          <GuideTarget type={'OIWFS'} />
        </Guiders> */}
        <Systems />
        <TargetDetails />
        <Title title="Guiders" />
        <GuidersDetails />
        <Footer />
        <OdbImport />
        <FixedTargetImport />
        <SlewFlags />
      </div>
    </TelescopeProvider>
  )
}