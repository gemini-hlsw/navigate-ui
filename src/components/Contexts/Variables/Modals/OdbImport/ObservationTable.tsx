import { FilterMatchMode } from 'primereact/api';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';

import type { OdbObservationType } from '@/types';

interface ParamsInterface {
  loading: boolean;
  observations_list: OdbObservationType[] | undefined;
  selectedObservation: OdbObservationType | null;
  setSelectedObservation: (_: OdbObservationType | null) => void;
  headerItems?: React.ReactNode;
}

export function ObservationTable({
  loading,
  observations_list,
  selectedObservation,
  setSelectedObservation,
  headerItems,
}: ParamsInterface) {
  const [filters, setFilters] = useState({
    id: { value: '', matchMode: FilterMatchMode.CONTAINS },
    title: { value: '', matchMode: FilterMatchMode.CONTAINS },
    'program.pi.user.profile.givenName': {
      value: '',
      matchMode: FilterMatchMode.CONTAINS,
    },
    'program.pi.user.profile.familyName': {
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
      {selectedObservation?.title && <span>Selected Observation: {selectedObservation.title}</span>}
      {headerItems}
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
      </IconField>
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
        onSelectionChange={(e) => setSelectedObservation(e.value as OdbObservationType | null)}
        className="p-datatable-customers"
        rows={15}
        dataKey="id"
        filters={filters}
        filterDisplay="row"
        loading={loading}
        globalFilterFields={[
          'id',
          'title',
          'program.pi.user.profile.givenName',
          'program.pi.user.profile.familyName',
          'targetEnvironment.firstScienceTarget.name',
        ]}
        header={header}
        emptyMessage="No observations found."
      >
        <Column field="id" header="ID" filter filterPlaceholder="Search ID" style={{ minWidth: '12rem' }} />
        <Column field="title" header="Title" filter filterPlaceholder="Search Title" style={{ minWidth: '12rem' }} />
        <Column
          field="program.pi.user.profile.givenName"
          header="PI Given Name"
          style={{ minWidth: '12rem' }}
          filter
          filterPlaceholder="Filter Given Name"
        />
        <Column
          field="program.pi.user.profile.familyName"
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
