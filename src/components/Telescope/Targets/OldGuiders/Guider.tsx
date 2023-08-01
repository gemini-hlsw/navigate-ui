import { Dropdown } from 'primereact/dropdown'
import { ReactNode } from 'react'

export function Guider({ canEdit, children }: { canEdit: boolean, children: ReactNode }) {
  return (
    <div className="guider mb-5">
      {children}
      <div className="guider-dropdown">
        <span></span>
        <Dropdown disabled={!canEdit} value={'normalguiding'} options={[{ label: 'Normal Guiding', value: 'normalguiding' }]} />
      </div>
    </div>
  )
}