import { FilterMatchMode } from 'primereact/api';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';

import type { ParamsInterface } from '@/types';

export function ObservationTable({
  loading,
  observations_list,
  selectedObservation,
  setSelectedObservation,
}: ParamsInterface) {
  const [filters, setFilters] = useState({
    id: { value: '', matchMode: FilterMatchMode.CONTAINS },
    title: { value: '', matchMode: FilterMatchMode.CONTAINS },
    'program.pi.user.orcidGivenName': {
      value: '',
      matchMode: FilterMatchMode.CONTAINS,
    },
    'program.pi.user.orcidFamilyName': {
      value: '',
      matchMode: FilterMatchMode.CONTAINS,
    },
    'targetEnvironment.firstScienceTarget.name': {
      value: '',
      matchMode: FilterMatchMode.CONTAINS,
    },
    global: { value: '', matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState('');

  function onGlobalFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const _filters = { ...filters };
    _filters.global.value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  }

  const header = (
    <div className="header-table">
      <span>{selectedObservation.title && `Selected Observation: ${selectedObservation.title}`}</span>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
      </span>
    </div>
  );

  return (
    <div className="target-table">
      <DataTable
        // Temporarily remove this filter, until odb is updated
        // value={(observations_list ?? []).filter((el) => ['ONGOING', 'NOT_STARTED'].includes(el.execution.state))}
        value={observations_list}
        paginator
        selectionMode="single"
        selection={selectedObservation}
        onSelectionChange={(e) => setSelectedObservation(e.value)}
        className="p-datatable-customers"
        rows={10}
        dataKey="id"
        filters={filters}
        filterDisplay="row"
        loading={loading}
        globalFilterFields={[
          'id',
          'title',
          'program.pi.user.orcidGivenName',
          'program.pi.user.orcidFamilyName',
          'targetEnvironment.firstScienceTarget.name',
        ]}
        header={header}
        emptyMessage="No observations found."
      >
        <Column field="id" header="ID" filter filterPlaceholder="Search ID" style={{ minWidth: '12rem' }} />
        <Column field="title" header="Title" filter filterPlaceholder="Search Title" style={{ minWidth: '12rem' }} />
        <Column
          field="program.pi.user.orcidGivenName"
          header="PI Given Name"
          style={{ minWidth: '12rem' }}
          filter
          filterPlaceholder="Filter Given Name"
        />
        <Column
          field="program.pi.user.orcidFamilyName"
          header="PI Family Name"
          style={{ minWidth: '12rem' }}
          filter
          filterPlaceholder="Filter Family Name"
        />
        <Column
          field="targetEnvironment.firstScienceTarget.name"
          header="Target Name"
          style={{ minWidth: '12rem' }}
          filter
          filterPlaceholder="Filter Target Name"
        />
      </DataTable>
    </div>
  );
}
