import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import { useContext, useEffect, useState } from "react"
import { VariablesContext } from "../VariablesProvider"
import {
  useGetDistinctInstruments,
  useGetDistinctPorts,
  useGetInstruments,
} from "@gql/configs/Instrument"
import { Dropdown } from "primereact/dropdown"
import { InstrumentType } from "@/types"

export function Instrument() {
  const {
    configuration,
    setConfiguration,
    importInstrument,
    setImportInstrument,
  } = useContext(VariablesContext)
  const getNames = useGetDistinctInstruments()
  const getPorts = useGetDistinctPorts()
  const getInstuments = useGetInstruments()
  const [nameOptions, setNameOptions] = useState<string[]>([])
  const [name, setName] = useState("")
  const [portOptions, setPortOptions] = useState<number[]>([])
  const [port, setPort] = useState(0)
  const [instrumentOptions, setInstrumentOptions] = useState<InstrumentType[]>(
    []
  )
  const [instrument, setInstrument] = useState<InstrumentType>(
    {} as InstrumentType
  )

  useEffect(() => {
    if (importInstrument)
      getNames({
        onCompleted: (data) => {
          setNameOptions(
            data.distinctInstruments.map((e: { name: string }) => e.name)
          )
        },
      })
  }, [importInstrument])

  useEffect(() => {
    if (name !== "") {
      setPort(0)
      getPorts({
        variables: { name: name },
        onCompleted: (data) => {
          setPortOptions(
            data.distinctPorts.map((e: { issPort: number }) => e.issPort)
          )
        },
      })
    }
  }, [name])

  useEffect(() => {
    if (port > 0 && name !== "") {
      getInstuments({
        variables: { name: name, issPort: port },
        onCompleted: (data) => {
          setInstrumentOptions(data.instruments)
        },
      })
    }
  }, [port])

  function updateInstrument() {
    setConfiguration({ ...configuration, instrument: instrument })
    setImportInstrument(false)
  }

  let footer = (
    <div className="modal-footer">
      <div className="right">
        <Button className="" label="Import" onClick={updateInstrument} />
        <Button
          className="p-button-danger"
          label="Cancel"
          onClick={() => setImportInstrument(false)}
        />
      </div>
    </div>
  )

  let tableData: JSX.Element[] = []
  instrumentOptions.map((i, idx) => {
    tableData.push(
      <InstrumentDetails
        instrument={i}
        selectedPk={instrument.pk}
        setInstrument={setInstrument}
        key={idx}
      />
    )
  })

  let table: JSX.Element | null = null
  if (port > 0 && name !== "") {
    table = (
      <table className="table">
        <thead>
          <tr>
            <th>ao</th>
            <th>focusOffset</th>
            <th>iaa</th>
            <th>originX</th>
            <th>originY</th>
            <th>wfs</th>
            <th>extraParams</th>
          </tr>
        </thead>
        <tbody>{tableData}</tbody>
      </table>
    )
  }

  return (
    <Dialog
      header={`Import instrument`}
      visible={importInstrument}
      footer={footer}
      modal
      onHide={() => setImportInstrument(false)}
    >
      <div className="import-instrument">
        <div className="selectors">
          <span>Instrument</span>
          <Dropdown
            disabled={false}
            value={name}
            options={nameOptions}
            onChange={(e) => setName(e.target.value)}
            placeholder="Select instrument"
          />
          <span>issPort</span>
          <Dropdown
            disabled={portOptions.length <= 0}
            value={port}
            options={portOptions}
            onChange={(e) => setPort(e.target.value)}
            placeholder="Select port"
          />
        </div>
        {table}
      </div>
    </Dialog>
  )
}

function InstrumentDetails({
  instrument,
  setInstrument,
  selectedPk,
}: {
  instrument: InstrumentType
  setInstrument(_: InstrumentType): void
  selectedPk: number
}) {
  return (
    <tr
      onClick={() => setInstrument(instrument)}
      className={instrument.pk === selectedPk ? "active" : ""}
    >
      <td>{instrument.ao}</td>
      <td>{instrument.focusOffset}</td>
      <td>{instrument.iaa}</td>
      <td>{instrument.originX}</td>
      <td>{instrument.originY}</td>
      <td>{instrument.wfs}</td>
      <td>{JSON.stringify(instrument.extraParams)}</td>
    </tr>
  )
}
