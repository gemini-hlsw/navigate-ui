import { Button } from 'primereact/button'
import { Slew } from '../gql/Buttons'
import { AuthContext } from '../../Auth/AuthProvider'
import { useContext } from 'react'
import { TelescopeContext } from '../TelescopeProvider'
import { TitleDropdown } from '../../Title/Title'

export function Footer() {
  const { canEdit } = useContext(AuthContext)
  const { setSlewVisible } = useContext(TelescopeContext)
  return (
    <div className="footer">
      <TitleDropdown icon='cog'>
        <Button disabled={!canEdit} className="p-button-text" label="Set slew flags" onClick={() => setSlewVisible(true)} />
      </TitleDropdown>
      <Slew
        className="btn-small"
        label="Slew Telescope"
      />
      <Button
        disabled={!canEdit}
        className="btn-small" label="Apply Parameters"
        aria-label="Apply Parameters"
      />
      <div></div>
      <Button
        disabled={!canEdit}
        className="btn-small p-button-danger right" label="Shutdown"
        aria-label="Shutdown"
      />
    </div>
  )
}