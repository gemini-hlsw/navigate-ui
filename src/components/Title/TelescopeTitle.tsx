import { useContext } from "react"
import { Title } from "./Title"
import { TitleDropdown } from "./Title"
import { Button } from "primereact/button"
import { Divider } from "primereact/divider"
import { AuthContext } from "../Auth/AuthProvider"
import { TelescopeContext } from "../Telescope/TelescopeProvider"

interface ParamsInterface {
  prevPanel: () => void
  nextPanel: () => void
}

export function TelescopeTitle({ prevPanel, nextPanel }: ParamsInterface) {
  const { canEdit } = useContext(AuthContext)
  const { setOdbVisible, setTargetVisible } = useContext(TelescopeContext)
  return (
    <Title title="TELESCOPE SETUP" prevPanel={prevPanel} nextPanel={nextPanel}>
      <TitleDropdown icon="list">
        <Button
          disabled={!canEdit}
          className="p-button-text"
          label="Import from ODB"
          onClick={() => setOdbVisible(true)}
        />
        <Button
          disabled={!canEdit}
          className="p-button-text"
          label="Import from Fixed Targets"
          onClick={() => setTargetVisible(true)}
        />
        <Button disabled={!canEdit} className="p-button-text" label="Load" />
        <Button disabled={!canEdit} className="p-button-text" label="Save" />
        <Button disabled={!canEdit} className="p-button-text" label="Save as" />
        <Divider />
        <Button
          disabled={!canEdit}
          className="p-button-text"
          label="Edit targets"
        />
      </TitleDropdown>
    </Title>
  )
}
