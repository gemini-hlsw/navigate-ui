
import { useState} from 'react'
import { FilterMatchMode } from 'primereact/api'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import "./TargetTable.scss"
import { TargetObj } from '../../types'
import { Target } from 'framer-motion'

interface TargetTable {
  loading: boolean
  target_list: { targets: { matches: []}}
  selectedTargets: Array<TargetObj> | []
  setSelectedTargets: (_: []) => void
}


export default function TargetTable({ loading, target_list, selectedTargets, setSelectedTargets }: TargetTable) {
  const [filters, setFilters] = useState({
    'id': { value: '', matchMode: FilterMatchMode.STARTS_WITH },
    'name': { value: '', matchMode: FilterMatchMode.STARTS_WITH },
    'sidereal.ra.hms': { value: '', matchMode: FilterMatchMode.STARTS_WITH },
    'sidereal.dec.dms': { value: '', matchMode: FilterMatchMode.STARTS_WITH },
    'global': { value: '', matchMode: FilterMatchMode.CONTAINS }
  })
  const [globalFilterValue, setGlobalFilterValue] = useState('')

  function onGlobalFilterChange (e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    let _filters = { ...filters }
    _filters['global'].value = value

    setFilters(_filters)
    setGlobalFilterValue(value)
  }

  const renderHeader = () => {
    return (
      <div className="header-table">
        <span>
          {`Selected targets: ${selectedTargets.length}`}
        </span>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
        </span>
      </div>
    )
  }

  const header = renderHeader()

  if (!Boolean(target_list) || !("targets" in target_list)) {
    return null
  }

  return (
    <div className="target-table">
      <DataTable
        value={target_list.targets.matches}
        paginator
        selection={selectedTargets}
        onSelectionChange={e => setSelectedTargets(e.value)}
        className="p-datatable-customers"
        rows={10}
        dataKey="id"
        filters={filters}
        filterDisplay="row"
        loading={loading}
        responsiveLayout="scroll"
        globalFilterFields={['id', 'name', 'ra.hms', 'sidereal.dec.dms']}
        header={header}
        emptyMessage="No targets found."
      >
        <Column selectionMode="multiple" headerStyle={{width: '3em'}}></Column>
        <Column field="id" header="ID" filter filterPlaceholder="Search ID" style={{ minWidth: '12rem' }} />
        <Column field="name" header="Name" filter filterPlaceholder="Search name" style={{ minWidth: '12rem' }} />
        <Column field="sidereal.ra.hms" header="RA" style={{ minWidth: '12rem' }} filter filterPlaceholder="Filter RA" />
        <Column field="sidereal.dec.dms" header="Dec" style={{ minWidth: '12rem' }} filter filterPlaceholder="Filter Dec" />
      </DataTable>
    </div>
  )
}