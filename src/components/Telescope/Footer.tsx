import { Button } from 'primereact/button'

export default function Footer({ canEdit }: { canEdit: boolean }) {
  return (
    <div className="footer">
      <Button
        disabled={!canEdit}
        icon="pi pi-cog"
        className="p-button-rounded p-button-text btn-small"
        aria-label="Settings"
      />
      <Button
        disabled={!canEdit}
        className="btn-small" label="Slew Telescope"
        aria-label="Slew Telescope"
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