import { createContext, useState, ReactNode, useEffect } from "react"
import { useCreateTarget, useGetTarget } from "./gql/Target"
import { BaseTarget, InstrumentConfig, ScienceTarget, SlewFlags, TelescopeContextType } from "../../types"

const INITIAL_SLEW_FLAGS: SlewFlags = {
  zeroChopThrow: true,
  zeroSourceOffset: true,
  zeroSourceDiffTrack: true,
  zeroMountOffset: true,
  zeroMountDiffTrack: true,
  shortcircuitTargetFilter: true,
  shortcircuitMountFilter: true,
  resetPointing: true,
  stopGuide: true,
  zeroGuideOffset: true,
  zeroInstrumentOffset: true,
  autoparkPwfs1: false,
  autoparkPwfs2: false,
  autoparkOiwfs: false,
  autoparkGems: false,
  autoparkAowfs: false
}

const INITIAL_SCIENCE_TARGET: ScienceTarget = {
  id: "",
  name: "",
  raAz: "",
  decEl: "",
  epoch: "",
  type: "Base",
  coordSystem: "Celestial",
  blindTargets: [],
  guideTargets: []
}

const INITIAL_BASE_TARGET: BaseTarget = {
  id: "",
  name: "",
  raAz: "",
  decEl: "",
  epoch: "",
  type: "Base",
  coordSystem: "Celestial"
}

const INITIAL_INSTRUMENT: InstrumentConfig = {
  name: "",
  iaa: 0,
  issPort: 0,
  focusOffset: 0,
  wfs: "None",
  originX: 0,
  originY: 0,
  ao: false,
  extraParams: {}
}

export const TelescopeContext = createContext<TelescopeContextType>(null!);

export function TelescopeProvider({ children }: { children: ReactNode }) {
  const [odbVisible, setOdbVisible] = useState<boolean>(false)
  const [targetVisible, setTargetVisible] = useState<boolean>(false)
  const [slewVisible, setSlewVisible] = useState<boolean>(false)
  const [scienceTarget, setScienceTarget] = useState<ScienceTarget>(INITIAL_SCIENCE_TARGET)
  const [baseTarget, setBaseTarget] = useState<BaseTarget>(INITIAL_BASE_TARGET)
  const [guideTarget, setGuideTarget] = useState<BaseTarget>(INITIAL_BASE_TARGET)
  const [slewFlags, setSlewFlags] = useState<SlewFlags>(INITIAL_SLEW_FLAGS)
  const [instrument, setInstrument] = useState<InstrumentConfig>(INITIAL_INSTRUMENT)
  const initialTarget = useGetTarget()
  const createTarget = useCreateTarget()

  useEffect(() => {
    if (!Boolean(initialTarget)) return

    if (initialTarget.raAz !== "" && initialTarget.decEl !== "") {
      setScienceTarget(initialTarget)
    }
  }, [initialTarget])

  function setOdbTarget(target: any) {
    let auxTarget: ScienceTarget = {
      id: target.id,
      name: target.name,
      raAz: target.sidereal.ra.hms,
      decEl: target.sidereal.dec.dms,
      epoch: target.sidereal.epoch,
      type: "Base",
      coordSystem: "Celestial",
      blindTargets: [],
      guideTargets: []
    }
    setScienceTarget(auxTarget)
    createTarget(auxTarget)
  }

  function setFixedTarget(target: any) {
    setScienceTarget(target)
    createTarget(target)
  }

  let value = {
    odbVisible,             // Modal ODB visibility flag
    setOdbVisible,          // Modal ODB change flag
    targetVisible,          // Modal fixed target visibility flag
    setTargetVisible,       // Modal fixed target change flag
    slewVisible,            // Modal slew params visibility flag
    setSlewVisible,         // Modal slew params change flag
    baseTarget,             // Generic target variable
    setBaseTarget,          // Set generic target variable
    scienceTarget,          // Science target variable
    setOdbTarget,           // Set target imported from ODB
    setFixedTarget,         // Set fixed target imported from Navigate configs
    slewFlags,              // Slew params variable
    setSlewFlags,           // Set slew params variable
    instrument,
    setInstrument,
    guideTarget,
    setGuideTarget
  }

  return (
    <TelescopeContext.Provider value={value}>
      {children}
    </TelescopeContext.Provider>
  );
}