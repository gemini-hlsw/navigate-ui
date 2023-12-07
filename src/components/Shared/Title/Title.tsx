import { OverlayPanel } from "primereact/overlaypanel"
import { ReactNode, useRef } from "react"

interface ParamsInterface {
  title: string
  prevPanel?: any
  nextPanel?: any
  children?: ReactNode
  className?: string
}

export function Title({
  title,
  prevPanel,
  nextPanel,
  children,
  className = "",
}: ParamsInterface) {
  let prevPanelDisplay = null
  if (Boolean(prevPanel)) {
    prevPanelDisplay = (
      <div className="p-panel" onClick={prevPanel}>
        <i className="pi pi-angle-left"></i>
      </div>
    )
  }

  let nextPanelDisplay = null
  if (Boolean(nextPanel)) {
    nextPanelDisplay = (
      <div className="n-panel" onClick={nextPanel}>
        <i className="pi pi-angle-right"></i>
      </div>
    )
  }
  return (
    <div className={`title ${className}`}>
      {children}
      {prevPanelDisplay}
      <span>{title}</span>
      {nextPanelDisplay}
    </div>
  )
}

export function TitleDropdown({
  children,
  icon,
}: {
  children: ReactNode
  icon: string
}) {
  const op = useRef<OverlayPanel>(null)

  return (
    <span
      className="title-dropdown"
      aria-label="Settings"
      onClick={(e) => op.current?.toggle(e)}
    >
      <i className={`pi pi-${icon} ml-2`}></i>
      <OverlayPanel ref={op}>{children}</OverlayPanel>
    </span>
  )
}
