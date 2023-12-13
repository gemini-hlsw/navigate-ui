import { Instrument } from "./Instrument"
import { OdbImport } from "./OdbImport/OdbImport"
import { SlewFlags } from "./SlewFlags"
import { Target } from "./Target"
import "./Modals.scss"

export function Modals() {
  return (
    <>
      <OdbImport />
      <SlewFlags />
      <Target />
      <Instrument />
    </>
  )
}
