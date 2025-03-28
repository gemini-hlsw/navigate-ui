import { OverlayPanel } from 'primereact/overlaypanel';
import type { MouseEventHandler } from 'react';
import { useRef } from 'react';

import { ChevronLeft, ChevronRight } from '@/components/Icons';

type ParamsInterface = React.PropsWithChildren<{
  title: string;
  prevPanel?: MouseEventHandler<HTMLButtonElement>;
  nextPanel?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}>;

export function Title({ title, prevPanel, nextPanel, children, className = '' }: ParamsInterface) {
  let prevPanelDisplay = null;
  if (prevPanel) {
    prevPanelDisplay = (
      <button className="p-panel" onClick={prevPanel}>
        <i>
          <ChevronLeft />
        </i>
        <span className="sr-only">Previous panel</span>
      </button>
    );
  }

  let nextPanelDisplay = null;
  if (nextPanel) {
    nextPanelDisplay = (
      <button className="n-panel" onClick={nextPanel}>
        <i>
          <ChevronRight />
        </i>
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

export function TitleDropdown({ children, icon }: React.PropsWithChildren<{ icon: React.ReactElement }>) {
  const op = useRef<OverlayPanel>(null);

  return (
    <span className="title-dropdown" aria-label="Settings" onClick={(e) => op.current?.toggle(e)}>
      <i className="ml-2">{icon}</i>
      <OverlayPanel ref={op}>{children}</OverlayPanel>
    </span>
  );
}
