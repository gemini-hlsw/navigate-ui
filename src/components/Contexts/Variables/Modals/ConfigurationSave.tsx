import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import { InputText } from "primereact/inputtext"
import { useContext } from "react"
import { VariablesContext } from "@Contexts/Variables/VariablesProvider"
import { AuthContext } from "@Contexts/Auth/AuthProvider"

export function ConfigurationSave() {
  const { canEdit } = useContext(AuthContext)
  const {
    saveConfiguration,
    isConfigModalVisible,
    setIsConfigModalVisible,
    configuration,
    setConfiguration,
    configurationChanges,
  } = useContext(VariablesContext)

  let footer = (
    <div className="modal-footer">
      <Button
        disabled={!canEdit || configuration.name === ""}
        className=""
        label="Update configuration"
        onClick={() => saveConfiguration("save")}
      />
      <Button
        disabled={!canEdit || configuration.name === ""}
        className=""
        label="Create configuration"
        onClick={() => saveConfiguration("create")}
      />
    </div>
  )

  let changes: JSX.Element[] = []
  configurationChanges?.map((change, index) =>
    changes.push(<p key={index}>{JSON.stringify(change)}</p>)
  )

  return (
    <Dialog
      header="Save configuration"
      footer={footer}
      visible={isConfigModalVisible}
      onHide={() => setIsConfigModalVisible(false)}
      modal
    >
      <div className="config-save">
        <div className="name">
          <label>Name</label>
          <InputText
            placeholder="Configuration name"
            className="mt-5"
            style={{ width: "100%" }}
            value={configuration.name}
            onChange={(e) =>
              setConfiguration({ ...configuration, name: e.target.value })
            }
          />
        </div>
        <div className="data">{changes}</div>
      </div>
    </Dialog>
  )
}
