
import { useState } from 'react'
import { FilterMatchMode } from 'primereact/api'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import "./TargetTable.scss"

interface ParamsInterface {
  loading: boolean
  targets_list: []
  selectedTarget: {
    id: string
    name: string
    raAz: string
    decEl: string
    epoch: string
    type: string
  }
  setSelectedTarget: (_: {
    id: string
    name: string
    raAz: string
    decEl: string
    epoch: string
    type: string
  }) => void
}


export function FixedTargetTable({ loading, targets_list, selectedTarget, setSelectedTarget }: ParamsInterface) {
  const [filters, setFilters] = useState({
    'id': { value: '', matchMode: FilterMatchMode.STARTS_WITH },
    'name': { value: '', matchMode: FilterMatchMode.STARTS_WITH },
    'raAz': { value: '', matchMode: FilterMatchMode.STARTS_WITH },
    'decEl': { value: '', matchMode: FilterMatchMode.STARTS_WITH },
    'type': { value: '', matchMode: FilterMatchMode.STARTS_WITH },
    'global': { value: '', matchMode: FilterMatchMode.CONTAINS }
  })
  const [globalFilterValue, setGlobalFilterValue] = useState('')

  function onGlobalFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
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
          {`Selected Target: ${selectedTarget.name}`}
        </span>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
        </span>
      </div>
    )
  }

  const header = renderHeader()

  if (!Boolean(targets_list)) {
    return null
  }

  return (
    <div className="target-table">
      <DataTable
        value={targets_list}
        paginator
        selectionMode="single"
        onSelectionChange={e => setSelectedTarget(e.value)}
        className="p-datatable-customers"
        rows={10}
        dataKey="id"
        filters={filters}
        filterDisplay="row"
        loading={loading}
        responsiveLayout="scroll"
        globalFilterFields={['id', 'name', 'raAz', 'decEl', 'type']}
        header={header}
        emptyMessage="No targets found."
      >
        <Column field="id" header="ID" filter filterPlaceholder="Search ID" style={{ minWidth: '12rem' }} />
        <Column field="name" header="Name" filter filterPlaceholder="Search Name" style={{ minWidth: '12rem' }} />
        <Column field="raAz" header="RA or Az" style={{ minWidth: '12rem' }} filter filterPlaceholder="Filter RA or Az" />
        <Column field="decEl" header="Dec or El" style={{ minWidth: '12rem' }} filter filterPlaceholder="Filter Dec or El" />
        <Column field="type" header="Target Type" style={{ minWidth: '12rem' }} filter filterPlaceholder="Filter Target Type" />
      </DataTable>
    </div>
  )
}