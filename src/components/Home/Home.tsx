import TelescopeSetup from "../TelescopeSetup/TelescopeSetup"
import "./Home.scss"

export default function Home() {
  return (
    <div className="main-body">
      <div className="panel">
        <TelescopeSetup />
      </div>
      <div className="panel">
        <span className="title">Wavefront Sensors</span>
        <div className="body">
        </div>
      </div>
      <div className="panel">
        <span className="title">Guiding</span>
        <div className="body">
        </div>
      </div>
    </div>
  )
}