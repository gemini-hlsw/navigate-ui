import { Button } from "primereact/button"
import { Title } from "@Shared/Title/Title"
import { useContext } from "react"
import { AuthContext } from "@Contexts/Auth/AuthProvider"
import { Dropdown } from "primereact/dropdown"

export function LightPath() {
  const { canEdit } = useContext(AuthContext)

  return (
    <div className="light-path">
      <Title title="Light path" />
      <div className="body">
        <Dropdown
          disabled={!canEdit}
          value={""}
          options={[
            "Sky ➡ Instrument",
            "Sky ➡ AO ➡ Instrument",
            "Sky ➡ AC",
            "Sky ➡ AO ➡ AC",
            "GCAL ➡ Instrument",
            "GAOS ➡ Instrument",
          ]}
          onChange={(e) => console.log(e.value)}
          placeholder="Select a light  path"
        />
        <Button disabled={!canEdit} label="Set" />
        {/* <Button disabled={!canEdit} label="Sky → Instrument" />
        <Button disabled={!canEdit} label="Sky → AO → Instrument" />
        <Button disabled={!canEdit} label="Sky → AC" />
        <Button disabled={!canEdit} label="Sky → AO → AC" />
        <Button disabled={!canEdit} label="GCAL → Instrument" />
        <Button disabled={!canEdit} label="GAOS → Instrument" /> */}
      </div>
    </div>
  )
}
