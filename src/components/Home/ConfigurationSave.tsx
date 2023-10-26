import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import { InputText } from "primereact/inputtext"
import { useContext, useState } from "react"
import { VariablesContext } from "../Variables/VariablesProvider"
import { AuthContext } from "../Auth/AuthProvider"

export function ConfigurationSave() {
  const { canEdit } = useContext(AuthContext)
  const {
    saveConfiguration,
    isConfigModalVisible,
    setIsConfigModalVisible,
    configuration,
    setConfiguration,
  } = useContext(VariablesContext)

  let footer = (
    <div className="modal-footer">
      <Button
        disabled={!canEdit || configuration.name === ""}
        className=""
        label="Update current configuration"
        onClick={() => saveConfiguration("save")}
      />
      <Button
        disabled={!canEdit || configuration.name === ""}
        className=""
        label="Create new configuration"
        onClick={() => saveConfiguration("create")}
      />
    </div>
  )

  return (
    <Dialog
      header="Save configuration"
      footer={footer}
      visible={isConfigModalVisible}
      // style={{ width: "80vw" }}
      onHide={() => setIsConfigModalVisible(false)}
      modal
    >
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
    </Dialog>
  )
}
