import { useContext, useEffect, useState } from 'react'
import { Dialog } from "primereact/dialog"
import { Button } from "primereact/button"
import { FixedTargetTable } from './FixedTargetTable'
import { useGetFixedTargets } from '../../../gql/FixedTarget'
import { AuthContext } from '../../Auth/AuthProvider'
import { TelescopeContext } from '../TelescopeProvider'

export function FixedTargetImport() {
  const { canEdit } = useContext(AuthContext)
  const { targetVisible, setTargetVisible, setFixedTarget } = useContext(TelescopeContext)
  const [selectedTarget, setSelectedTarget] = useState({ id: "", name: "", raAz: "", epoch: "", decEl: "", type: "" })
  const [refetch, data] = useGetFixedTargets()

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
          disabled={!(canEdit && (selectedTarget?.name !== ""))}
          className=""
          label="Import to Navigate"
          onClick={() => {
            setFixedTarget(selectedTarget)
            setTargetVisible(false)
          }}
        />
        <Button
          disabled={!canEdit}
          className="p-button-danger"
          label="Cancel"
          onClick={() => setTargetVisible(false)}
        />
      </div>
    </div>
  )

  useEffect(() => {
    if (targetVisible) refetch()
  }, [targetVisible])

  return (
    <Dialog header="Import from Fixed Targets" footer={footer} visible={targetVisible} style={{ width: '50vw' }} modal onHide={() => setTargetVisible(false)}>
      {(!Boolean(data)) ?
        <p>Loading observations...</p> :
        <FixedTargetTable loading={!Boolean(data)} targets_list={data} selectedTarget={selectedTarget} setSelectedTarget={setSelectedTarget} />
      }
    </Dialog>
  )
}