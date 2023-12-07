import { Title, TitleDropdown } from "@Shared/Title/Title"
import { Button } from "primereact/button"
import { Divider } from "primereact/divider"
import { InputNumber } from "primereact/inputnumber"
import { InputText } from "primereact/inputtext"
import { useContext } from "react"
import { VariablesContext } from "@Contexts/Variables/VariablesProvider"
import { InstrumentType } from "@/types"

export function Instrument({ canEdit }: { canEdit: boolean }) {
  const { configuration, setConfiguration, setImportInstrument } =
    useContext(VariablesContext)

  function updateInstrument({ key, val }: { key: string; val: any }) {
    setConfiguration({
      ...configuration,
      instrument: {
        ...(configuration.instrument ?? ({} as InstrumentType)),
        [key]: val,
      },
    })
  }

  if (configuration.instrument && !("name" in configuration.instrument)) {
    return null
  }

  return (
    <div className="instrument">
      <Title title="Instrument">
        <TitleDropdown icon="list">
          <Button
            disabled={!canEdit}
            className="p-button-text"
            label="Import instrument"
            onClick={() => setImportInstrument(true)}
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
        <span className="label">SF Name</span>
        <InputText
          disabled={!canEdit}
          value={configuration.instrument?.name}
          onChange={(e) =>
            updateInstrument({ key: "name", val: e.target.value })
          }
        />
        <span className="label">Port</span>
        <InputNumber
          disabled={!canEdit}
          value={configuration.instrument?.issPort}
          onChange={(e) => updateInstrument({ key: "issPort", val: e.value })}
          mode="decimal"
        />
        <span className="label">Origin X</span>
        <InputNumber
          disabled={!canEdit}
          value={configuration.instrument?.originX}
          minFractionDigits={2}
          maxFractionDigits={5}
          onChange={(e) => updateInstrument({ key: "originX", val: e.value })}
          mode="decimal"
        />
        <span className="label">Origin Y</span>
        <InputNumber
          disabled={!canEdit}
          value={configuration.instrument?.originY}
          minFractionDigits={2}
          maxFractionDigits={5}
          onChange={(e) => updateInstrument({ key: "originY", val: e.value })}
          mode="decimal"
        />
        <span className="label">Focus Offset</span>
        <InputNumber
          disabled={!canEdit}
          value={configuration.instrument?.focusOffset}
          minFractionDigits={2}
          maxFractionDigits={5}
          onChange={(e) =>
            updateInstrument({ key: "focusOffset", val: e.value })
          }
          mode="decimal"
        />
        <span className="label">IAA</span>
        <InputNumber
          disabled={!canEdit}
          value={configuration.instrument?.iaa}
          minFractionDigits={2}
          maxFractionDigits={5}
          onChange={(e) => updateInstrument({ key: "iaa", val: e.value })}
          mode="decimal"
        />
      </div>
    </div>
  )
}
