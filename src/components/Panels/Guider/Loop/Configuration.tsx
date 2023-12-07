import { useContext, useState } from "react"
import { AuthContext } from "@Contexts/Auth/AuthProvider"
import { Dropdown } from "primereact/dropdown"
import { Checkbox } from "primereact/checkbox"
import { BrokenChain, ConnectedChain } from "./Chain"
import { Button } from "primereact/button"

export function Configuration() {
  const { canEdit } = useContext(AuthContext)
  const [linked, setLinked] = useState(true)

  return (
    <div className="configuration">
      <div className="body">
        <span className="label" style={{ gridArea: "l1" }}>
          M2 Tip/Tilt
        </span>
        <Checkbox
          style={{ gridArea: "s1" }}
          disabled={!canEdit}
          checked={true}
          onChange={(e) => e.target.value}
        />
        <Dropdown
          style={{ gridArea: "d1" }}
          disabled={!canEdit}
          value={""}
          options={["400 nm", "550 nm", "700nm", "850 nm", "1000 nm"]}
          onChange={(e) => console.log(e.value)}
          placeholder="Select a tracking"
        />
        <div className="lever" onClick={() => setLinked(!linked)}>
          {linked ? <ConnectedChain /> : <BrokenChain />}
        </div>
        <span className="label" style={{ gridArea: "l2" }}>
          M2 Focus
        </span>
        <Checkbox
          style={{ gridArea: "s2" }}
          disabled={!canEdit}
          checked={true}
          onChange={(e) => e.target.value}
        />
        <Dropdown
          style={{ gridArea: "d2" }}
          disabled={!canEdit}
          value={""}
          options={["400 nm", "550 nm", "700nm", "850 nm", "1000 nm"]}
          onChange={(e) => console.log(e.value)}
          placeholder="Select a tracking"
        />
        <span className="label" style={{ gridArea: "l3" }}>
          M2 Coma
        </span>
        <Checkbox
          disabled={!canEdit}
          checked={true}
          onChange={(e) => e.target.value}
        />
        <Dropdown
          style={{ gridArea: "d3" }}
          disabled={!canEdit}
          value={""}
          options={["400 nm", "550 nm", "700nm", "850 nm", "1000 nm"]}
          onChange={(e) => console.log(e.value)}
          placeholder="Select a tracking"
        />
        <span className="label" style={{ gridArea: "l4" }}>
          M1 Corrections
        </span>
        <Checkbox
          style={{ gridArea: "s4" }}
          disabled={!canEdit}
          checked={true}
          onChange={(e) => e.target.value}
        />
        <span className="label" style={{ gridArea: "l5" }}>
          Mount offload
        </span>
        <Checkbox
          style={{ gridArea: "s5" }}
          disabled={!canEdit}
          checked={true}
          onChange={(e) => e.target.value}
        />
        <span className="label" style={{ gridArea: "l6" }}>
          Daytime mode
        </span>
        <Checkbox
          style={{ gridArea: "s6" }}
          disabled={!canEdit}
          checked={true}
          onChange={(e) => e.target.value}
        />
        <span className="label" style={{ gridArea: "l7" }}>
          Probe tracking
        </span>
        <Dropdown
          style={{ gridArea: "d7" }}
          disabled={!canEdit}
          value={""}
          options={["400 nm", "550 nm", "700nm", "850 nm", "1000 nm"]}
          onChange={(e) => console.log(e.value)}
          placeholder="Select a tracking"
        />
      </div>
      <div className="buttons">
        <Button>Enable</Button>
        <Button>Disable</Button>
      </div>
    </div>
  )
}
