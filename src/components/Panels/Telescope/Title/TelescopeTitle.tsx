import { useContext } from "react"
import { Title } from "@Shared/Title/Title"
import { TitleDropdown } from "@Shared/Title/Title"
import { Button } from "primereact/button"
import { Divider } from "primereact/divider"
import { AuthContext } from "@Contexts/Auth/AuthProvider"
import { VariablesContext } from "@Contexts/Variables/VariablesProvider"

interface ParamsInterface {
  prevPanel: () => void
  nextPanel: () => void
}

export function TelescopeTitle({ prevPanel, nextPanel }: ParamsInterface) {
  const { canEdit } = useContext(AuthContext)
  const { setOdbVisible } = useContext(VariablesContext)

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
          label="Import from catalog"
          onClick={() => console.log("Open catalog modal")}
        />
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
