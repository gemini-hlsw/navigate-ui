import { Checkbox } from "primereact/checkbox"
import { Title } from "@Shared/Title/Title"
import { useContext } from "react"
import { AuthContext } from "@Contexts/Auth/AuthProvider"

export function Altair() {
  const { canEdit } = useContext(AuthContext)

  return (
    <div className="adaptive-optics">
      <Title title="Altair" />
      <div className="ao-body">
        <span className="label">AO enabled</span>
        <Checkbox
          disabled={!canEdit}
          checked={true}
          onChange={(e) => e.target.value}
        />
        <span className="label">OI blend</span>
        <Checkbox
          disabled={!canEdit}
          checked={true}
          onChange={(e) => e.target.value}
        />
        <span className="label">Focus</span>
        <Checkbox
          disabled={!canEdit}
          checked={true}
          onChange={(e) => e.target.value}
        />
        <span className="label">P1 TTF</span>
        <Checkbox
          disabled={!canEdit}
          checked={true}
          onChange={(e) => e.target.value}
        />
        <span className="label">STRAP</span>
        <Checkbox
          disabled={!canEdit}
          checked={true}
          onChange={(e) => e.target.value}
        />
        <span className="label">OI TTF</span>
        <Checkbox
          disabled={!canEdit}
          checked={true}
          onChange={(e) => e.target.value}
        />
        <span className="label">TTGS</span>
        <Checkbox
          disabled={!canEdit}
          checked={true}
          onChange={(e) => e.target.value}
        />
        <span className="label">SFO</span>
        <Checkbox
          disabled={!canEdit}
          checked={true}
          onChange={(e) => e.target.value}
        />
      </div>
    </div>
  )
}

export function GeMS() {
  const { canEdit } = useContext(AuthContext)

  return (
    <div className="adaptive-optics">
      <Title title="GeMS" />
      <div className="ao-body">
        <span className="label">AO enabled</span>
        <Checkbox
          disabled={!canEdit}
          checked={true}
          onChange={(e) => e.target.value}
        />
        <span className="label">Focus</span>
        <Checkbox
          disabled={!canEdit}
          checked={true}
          onChange={(e) => e.target.value}
        />
        <span className="label">Rotation</span>
        <Checkbox
          disabled={!canEdit}
          checked={true}
          onChange={(e) => e.target.value}
        />
        <span className="label">Tip/Tilt</span>
        <Checkbox
          disabled={!canEdit}
          checked={true}
          onChange={(e) => e.target.value}
        />
        <span className="label">Anisopl.</span>
        <Checkbox
          disabled={!canEdit}
          checked={true}
          onChange={(e) => e.target.value}
        />
        <span className="label">Flexure</span>
        <Checkbox
          disabled={!canEdit}
          checked={true}
          onChange={(e) => e.target.value}
        />
      </div>
    </div>
  )
}
