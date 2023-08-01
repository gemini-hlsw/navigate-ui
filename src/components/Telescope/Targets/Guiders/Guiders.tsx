import { useContext } from "react"
import { Title } from "../../../Title/Title"
import { SelectedTarget } from "../SelectedTarget"
import { Oiwfs } from "./Oiwfs"
import { TelescopeContext } from "../../TelescopeProvider"
import { Button } from "primereact/button"
import { Dropdown } from "primereact/dropdown"
import { useOiwfs } from "../../gql/Buttons"
import { AuthContext } from "../../../Auth/AuthProvider"

export function Guiders() {
  const setOiwfsTarget = useOiwfs()
  const { guideTarget } = useContext(TelescopeContext)
  const { canEdit } = useContext(AuthContext)

  return (
    <div className="guiders">
      <Title title="Guiders" />
      <SelectedTarget target={guideTarget} />
      <Oiwfs />
      <div className="guiders-footer">
        <Dropdown disabled={!canEdit || !Boolean(guideTarget.name)} value={'normalguiding'} options={[{ label: 'Normal Guiding', value: 'normalguiding' }]} />
        <Button disabled={!canEdit || !Boolean(guideTarget.name)} className="w-100" label="Point to guide target" onClick={() => setOiwfsTarget(guideTarget)} />
      </div>
    </div>
  )
}