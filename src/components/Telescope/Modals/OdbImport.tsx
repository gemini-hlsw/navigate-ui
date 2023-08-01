import { useContext, useEffect, useState } from 'react'
import { Dialog } from "primereact/dialog"
import { Button } from "primereact/button"
import { ObservationTable } from './ObservationTable'
import { useGetObservations } from '../gql/Odb'
import { AuthContext } from '../../Auth/AuthProvider'
import { TelescopeContext } from '../TelescopeProvider'


export function OdbImport() {
  const { canEdit } = useContext(AuthContext)
  const { odbVisible, setOdbVisible, setOdbTarget } = useContext(TelescopeContext)
  const [selectedObservation, setSelectedObservation] = useState({ title: "", targetEnvironment: { firstScienceTarget: { id: "", name: "" } } })
  const [refetch, data] = useGetObservations()

  let footer = (
    <div className="modal-footer">
      <div className="left">
        <Button
          disabled={!canEdit}
          className=""
          label="Refresh Observations"
          onClick={() => refetch()}
        />
      </div>
      <div className="right">
        <Button
          disabled={
            !(canEdit && (selectedObservation.targetEnvironment?.firstScienceTarget?.name !== ""))
            || !Boolean(selectedObservation.targetEnvironment?.firstScienceTarget?.name)}
          className=""
          label="Import to Navigate"
          onClick={() => {
            setOdbTarget(selectedObservation.targetEnvironment.firstScienceTarget)
            setOdbVisible(false)
          }}
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
    if (odbVisible) refetch()
  }, [odbVisible])

  return (
    <Dialog header="Import from ODB" footer={footer} visible={odbVisible} style={{ width: '50vw' }} modal onHide={() => setOdbVisible(false)}>
      {(!Boolean(data)) ?
        <p>Loading observations...</p> :
        <ObservationTable loading={!Boolean(data)} observations_list={data} selectedObservation={selectedObservation} setSelectedObservation={setSelectedObservation} />
      }
    </Dialog>
  )
}