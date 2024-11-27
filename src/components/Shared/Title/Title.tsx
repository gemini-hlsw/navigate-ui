import { OverlayPanel } from 'primereact/overlaypanel';
import type { MouseEventHandler, ReactNode } from 'react';
import { useRef } from 'react';

interface ParamsInterface {
  title: string;
  prevPanel?: MouseEventHandler<HTMLButtonElement>;
  nextPanel?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
  className?: string;
}

export function Title({ title, prevPanel, nextPanel, children, className = '' }: ParamsInterface) {
  let prevPanelDisplay = null;
  if (prevPanel) {
    prevPanelDisplay = (
      <button className="p-panel" onClick={prevPanel}>
        <i className="pi pi-angle-left"></i>
        <span className="sr-only">Previous panel</span>
      </button>
    );
  }

  let nextPanelDisplay = null;
  if (nextPanel) {
    nextPanelDisplay = (
      <button className="n-panel" onClick={nextPanel}>
        <i className="pi pi-angle-right"></i>
        <span className="sr-only">Next panel</span>
      </button>
    );
  }
  return (
    <div className={`title ${className}`}>
      {children}
      {prevPanelDisplay}
      <span>{title}</span>
      {nextPanelDisplay}
    </div>
  );
}

export function TitleDropdown({ children, icon }: { children: ReactNode; icon: string }) {
  const op = useRef<OverlayPanel>(null);

  return (
    <span className="title-dropdown" aria-label="Settings" onClick={(e) => op.current?.toggle(e)}>
      <i className={`pi pi-${icon} ml-2`}></i>
      <OverlayPanel ref={op}>{children}</OverlayPanel>
    </span>
  );
}
