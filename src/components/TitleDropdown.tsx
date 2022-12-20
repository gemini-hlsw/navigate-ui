import { OverlayPanel } from 'primereact/overlaypanel';
import { useRef } from 'react';

export default function TitleDropdown({ children }: { children: any }) {
  const op = useRef<OverlayPanel>(null);

  return (
    <span
      className="title-dropdown"
      aria-label="Settings"
      onClick={(e) => op.current?.toggle(e)}
    >
      <i className="pi pi-list ml-2"></i>
      <OverlayPanel ref={op}>
        {children}
      </OverlayPanel>
    </span>
  )
}