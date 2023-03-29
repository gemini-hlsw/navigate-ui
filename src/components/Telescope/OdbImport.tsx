import { useQuery, gql } from '@apollo/client'
import { useState } from 'react'
import { Dialog } from "primereact/dialog"
import { Button } from "primereact/button"
import { TargetObj } from "../../types"
import ObservationTable from './ObservationTable'

interface OdbImportI {
  isOdbModalVisible: boolean
  setIsOdbModalVisible: (_: boolean) => void
  canEdit: boolean
  setImportedTarget: (_: TargetObj) => void
}

const GET_OBSERVATIONS = gql`
  query getObservations {
    observations {
      matches {
        id
        existence
        title
        subtitle
        status
        activeStatus
        program {
          id
          existence
          name
          proposal {
            title
          }
          pi {
            orcidGivenName
            orcidFamilyName
          }
          users {
            user {
              serviceName
            }
          }
        }
        targetEnvironment {
          firstScienceTarget {
            id
            existence
            name
            sidereal {
              epoch
              ra {
                hms
                degrees
              }
              dec {
                dms
                degrees
              }
            }
          }
        }
      }
    }
  }
`

export function OdbImport({isOdbModalVisible, setIsOdbModalVisible, canEdit, setImportedTarget}: OdbImportI) {
  // const [selectedTargets, setSelectedTargets] = useState<[TargetObj] | []>([])
  const [selectedObservation, setSelectedObservation] = useState({title: "", targetEnvironment: {firstScienceTarget: {id: "", name: ""}}})
  const { loading, error, data, refetch } = useQuery(GET_OBSERVATIONS, {
    context: { clientName: "odb" }
  })

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
            setImportedTarget(selectedObservation.targetEnvironment.firstScienceTarget)
            setIsOdbModalVisible(false)
          }}
        />
        <Button
          disabled={!canEdit}
          className="p-button-danger"
          label="Cancel"
          onClick={() => setIsOdbModalVisible(false)}
        />
      </div>
    </div>
  )

  let targetSelect: JSX.Element[] = []
  if (data) {
    
  }

  return (
    <Dialog header="Import from ODB" footer={footer} visible={isOdbModalVisible} style={{width: '50vw'}} modal onHide={() => setIsOdbModalVisible(false)}>
      {(loading) ?
        <p>Loading observations...</p> :
        <ObservationTable loading={loading} observations_list={data} selectedObservation={selectedObservation} setSelectedObservation={setSelectedObservation} />
      }
    </Dialog>
  )
}