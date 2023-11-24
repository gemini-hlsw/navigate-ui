import { useContext, useEffect, useState } from "react"
import { Dialog } from "primereact/dialog"
import { Button } from "primereact/button"
import { ObservationTable } from "./ObservationTable"
import { useGetObservations } from "../../../gql/odb/Observation"
import { AuthContext } from "../../Auth/AuthProvider"
import { TelescopeContext } from "../TelescopeProvider"
import { VariablesContext } from "../../Variables/VariablesProvider"
import { OdbObservationType } from "../../../types"

export function OdbImport() {
  const { canEdit } = useContext(AuthContext)
  const { odbVisible, setOdbVisible } = useContext(TelescopeContext)
  const { updateOdbObservation } = useContext(VariablesContext)
  const [selectedObservation, setSelectedObservation] =
    useState<OdbObservationType>({} as OdbObservationType)
  const { getObservations, loading, data, error } = useGetObservations()

  function updateObs() {
    setOdbVisible(false)
    updateOdbObservation({
      id: selectedObservation.id,
      name: selectedObservation.title,
      targets: [
        {
          id: selectedObservation.targetEnvironment.firstScienceTarget.id,
          name: selectedObservation.targetEnvironment.firstScienceTarget.name,
          ra: selectedObservation.targetEnvironment.firstScienceTarget.sidereal
            .ra.degrees,
          dec: selectedObservation.targetEnvironment.firstScienceTarget.sidereal
            .dec.degrees,
          epoch:
            selectedObservation.targetEnvironment.firstScienceTarget.sidereal
              .epoch,
          type: "SCIENCE",
        },
      ],
    })
  }

  let footer = (
    <div className="modal-footer">
      <div className="right">
        <Button
          disabled={
            !(
              canEdit &&
              selectedObservation.targetEnvironment?.firstScienceTarget
                ?.name !== ""
            ) ||
            !Boolean(
              selectedObservation.targetEnvironment?.firstScienceTarget?.name
            )
          }
          className=""
          label="Import to Navigate"
          onClick={updateObs}
        />
        <Button
          disabled={!canEdit}
          className="p-button-danger"
          label="Cancel"
          onClick={() => setOdbVisible(false)}
        />
      </div>
    </div>
  )

  useEffect(() => {
    if (odbVisible) getObservations()
  }, [odbVisible])

  return (
    <Dialog
      header="Import from ODB"
      footer={footer}
      visible={odbVisible}
      style={{ width: "80vw" }}
      modal
      onHide={() => setOdbVisible(false)}
    >
      {loading ? (
        <p>Loading observations...</p>
      ) : (
        <ObservationTable
          loading={!Boolean(data)}
          observations_list={data?.observations}
          selectedObservation={selectedObservation}
          setSelectedObservation={setSelectedObservation}
        />
      )}
    </Dialog>
  )
}
