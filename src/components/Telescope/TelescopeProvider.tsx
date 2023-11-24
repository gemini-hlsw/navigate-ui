import { createContext, useState, ReactNode, useEffect } from "react"
import { SlewFlagsType, TelescopeContextType } from "../../types"

export const TelescopeContext = createContext<TelescopeContextType>(null!)

export function TelescopeProvider({ children }: { children: ReactNode }) {
  const [odbVisible, setOdbVisible] = useState<boolean>(false)
  const [targetVisible, setTargetVisible] = useState<boolean>(false)
  const [slewVisible, setSlewVisible] = useState<boolean>(false)
  const [slewFlags, setSlewFlags] = useState<SlewFlagsType>({
    zeroChopThrow: false,
    zeroSourceOffset: false,
    zeroSourceDiffTrack: false,
    zeroMountOffset: false,
    zeroMountDiffTrack: false,
    shortcircuitTargetFilter: false,
    shortcircuitMountFilter: false,
    resetPointing: false,
    stopGuide: false,
    zeroGuideOffset: false,
    zeroInstrumentOffset: false,
    autoparkPwfs1: false,
    autoparkPwfs2: false,
    autoparkOiwfs: false,
    autoparkGems: false,
    autoparkAowfs: false,
  } as SlewFlagsType)

  let value = {
    odbVisible, // Modal ODB visibility flag
    setOdbVisible, // Modal ODB change flag
    targetVisible, // Modal fixed target visibility flag
    setTargetVisible, // Modal fixed target change flag
    slewVisible, // Modal slew params visibility flag
    setSlewVisible, // Modal slew params change flag
    slewFlags, // Slew params variable
    setSlewFlags, // Set slew params variable
  }

  return (
    <TelescopeContext.Provider value={value}>
      {children}
    </TelescopeContext.Provider>
  )
}
