import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { useRef } from 'react';

export default function Title() {
  const op = useRef<OverlayPanel>(null);

  return (
    <div className="title">
      <span
        className="settings"
        aria-label="Settings"
        onClick={(e) => op.current?.toggle(e)}
      >
        <i className="pi pi-list ml-2"></i>
      </span>
      <OverlayPanel ref={op} id="telescope-setup-settings">
        <Button className="p-button-text" label="Import from ODB" />
        <Button className="p-button-text" label="Load" />
        <Button className="p-button-text" label="Save" />
        <Button className="p-button-text" label="Save as" />
        <Divider />
        <Button className="p-button-text" label="Edit targets" />
      </OverlayPanel>
      <span>Telescope Setup</span>
    </div>
  )
}