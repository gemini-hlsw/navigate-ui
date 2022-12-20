export default function Title({ title, prevPanel, nextPanel, children }: { title: string, prevPanel?: any, nextPanel?: any, children?: any }) {
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
    <div className="title">
      {children}
      {prevPanelDisplay}
      <span>{title}</span>
      {nextPanelDisplay}
    </div>
  )
}