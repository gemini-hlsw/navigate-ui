import { Title, TitleDropdown } from "../../Title/Title"
import { Button } from "primereact/button"
import { Divider } from "primereact/divider"
import { InputNumber } from "primereact/inputnumber"
import { InputText } from "primereact/inputtext"
import { useContext } from "react"
import { VariablesContext } from "../../Variables/VariablesProvider"

export function Instrument({ canEdit }: { canEdit: boolean }) {
  const { instrument, setInstrument } = useContext(VariablesContext)

  function updateInstrument({ key, val }: { key: string; val: any }) {
    setInstrument({ ...instrument, [key]: val })
  }

  if (!("name" in instrument)) {
    return null
  }

  return (
    <div className="instrument">
      <Title title="Instrument">
        <TitleDropdown icon="list">
          <Button
            disabled={!canEdit}
            className="p-button-text"
            label="Command 1"
          />
          <Button
            disabled={!canEdit}
            className="p-button-text"
            label="Command 2"
          />
          <Divider />
          <Button
            disabled={!canEdit}
            className="p-button-text"
            label="Command 3"
          />
        </TitleDropdown>
      </Title>
      <div className="body">
        <span style={{ textAlign: "center", alignSelf: "center" }}>
          SF Name
        </span>
        <InputText
          disabled={!canEdit}
          value={instrument.name}
          onChange={(e) =>
            updateInstrument({ key: "name", val: e.target.value })
          }
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>Port</span>
        <InputNumber
          disabled={!canEdit}
          value={instrument.issPort}
          onChange={(e) => updateInstrument({ key: "issPort", val: e.value })}
          mode="decimal"
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>
          Origin X
        </span>
        <InputNumber
          disabled={!canEdit}
          value={instrument.originX}
          minFractionDigits={2}
          maxFractionDigits={5}
          onChange={(e) => updateInstrument({ key: "originX", val: e.value })}
          mode="decimal"
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>
          Origin Y
        </span>
        <InputNumber
          disabled={!canEdit}
          value={instrument.originY}
          minFractionDigits={2}
          maxFractionDigits={5}
          onChange={(e) => updateInstrument({ key: "originY", val: e.value })}
          mode="decimal"
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>
          Focus Offset
        </span>
        <InputNumber
          disabled={!canEdit}
          value={instrument.focusOffset}
          minFractionDigits={2}
          maxFractionDigits={5}
          onChange={(e) =>
            updateInstrument({ key: "focusOffset", val: e.value })
          }
          mode="decimal"
        />
        <span style={{ textAlign: "center", alignSelf: "center" }}>IAA</span>
        <InputNumber
          disabled={!canEdit}
          value={instrument.iaa}
          minFractionDigits={2}
          maxFractionDigits={5}
          onChange={(e) => updateInstrument({ key: "iaa", val: e.value })}
          mode="decimal"
        />
      </div>
    </div>
  )
}
