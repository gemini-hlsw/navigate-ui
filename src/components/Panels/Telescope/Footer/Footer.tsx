import { Button } from "primereact/button"
import { Slew } from "@gql/server/Buttons"
import { AuthContext } from "@Contexts/Auth/AuthProvider"
import { useContext } from "react"
import { TitleDropdown } from "@Shared/Title/Title"
import { VariablesContext } from "@Contexts/Variables/VariablesProvider"

export function Footer() {
  const { canEdit } = useContext(AuthContext)
  const { setSlewVisible } = useContext(VariablesContext)
  return (
    <div className="footer">
      <TitleDropdown icon="cog">
        <Button
          disabled={!canEdit}
          className="p-button-text"
          label="Set slew flags"
          onClick={() => setSlewVisible(true)}
        />
      </TitleDropdown>
      <Slew className="btn-small" label="Slew Telescope" disabled={!canEdit} />
      <Button
        disabled={!canEdit}
        className="btn-small"
        label="Apply Parameters"
        aria-label="Apply Parameters"
      />
      <div></div>
      <Button
        disabled={!canEdit}
        className="btn-small p-button-danger right"
        label="Shutdown"
        aria-label="Shutdown"
      />
    </div>
  )
}
