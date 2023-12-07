import { useContext, useEffect, useState } from "react"
import { Dialog } from "primereact/dialog"
import { Button } from "primereact/button"
import { ObservationTable } from "./ObservationTable"
import { useGetObservations } from "@gql/odb/Observation"
import { AuthContext } from "@Contexts/Auth/AuthProvider"
import { VariablesContext } from "@Contexts/Variables/VariablesProvider"
import { OdbObservationType } from "@/types"
import { useUpsertObservation } from "@gql/configs/Observation"

export function OdbImport() {
  const { canEdit } = useContext(AuthContext)
  const { odbVisible, setOdbVisible, setOdbObservation } =
    useContext(VariablesContext)
  const [selectedObservation, setSelectedObservation] =
    useState<OdbObservationType>({} as OdbObservationType)
  const { getObservations, loading, data, error } = useGetObservations()
  const upsertObservation = useUpsertObservation()

  function updateObs() {
    setOdbVisible(false)
    upsertObservation({
      variables: {
        id: selectedObservation.id,
        name: selectedObservation.title,
        targets: [
          {
            id: selectedObservation.targetEnvironment.firstScienceTarget.id,
            name: selectedObservation.targetEnvironment.firstScienceTarget.name,
            ra: selectedObservation.targetEnvironment.firstScienceTarget
              .sidereal.ra.degrees,
            dec: selectedObservation.targetEnvironment.firstScienceTarget
              .sidereal.dec.degrees,
            epoch:
              selectedObservation.targetEnvironment.firstScienceTarget.sidereal
                .epoch,
            type: "SCIENCE",
          },
        ],
      },
      onCompleted(data) {
        setOdbObservation(data.updateObservation)
      },
      onError(error) {
        console.log(error)
      },
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
