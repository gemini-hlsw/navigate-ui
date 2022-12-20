import { Dropdown } from 'primereact/dropdown';

export default function Guider({ children }: { children: any }) {
  return (
    <div className="guider mb-5">
      {children}
      <div className="guider-dropdown">
        <span></span>
        <Dropdown value={'normalguiding'} options={[{ label: 'Normal Guiding', value: 'normalguiding' }]} />
      </div>
    </div>
  )
}