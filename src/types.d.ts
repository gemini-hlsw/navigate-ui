export type Theme = 'light' | 'dark'
export type Panels = 'Telescope' | 'WavefrontSensors' | 'Guider'
export type buttonState = 'PENDING' | 'ACTIVE' | 'DONE'
export type CoordSystem = 'Celestial' | 'Horizontal'
export type NavigateTargetType = 'fixed' | 'imported'
export type TargetType = 'OIWFS' | 'PWFS1' | 'PWFS2' | 'Base' | 'BlindOffset'
export type BaseTarget = {
  id: string
  name: string
  raAz: string
  decEl: string
  epoch: string
  coordSystem: CoordSystem
  type: TargetType
}

export interface ScienceTarget extends BaseTarget {
  blindTargets?: BaseTarget[]
  guideTargets?: BaseTarget[]
}

export type InstrumentConfig = {
  name: string
  iaa: number
  issPort: number
  focusOffset: number
  wfs: string
  originX: number
  originY: number
  ao: boolean
  extraParams: object
}

export type WfsObj = {
  name: string
}

export type AcObj = {
  name: string
}

export type NodeStatus = 'inactive' | 'active' | 'idle'

export interface SlewFlags {
  zeroChopThrow: boolean
  zeroSourceOffset: boolean
  zeroSourceDiffTrack: boolean
  zeroMountOffset: boolean
  zeroMountDiffTrack: boolean
  shortcircuitTargetFilter: boolean
  shortcircuitMountFilter: boolean
  resetPointing: boolean
  stopGuide: boolean
  zeroGuideOffset: boolean
  zeroInstrumentOffset: boolean
  autoparkPwfs1: boolean
  autoparkPwfs2: boolean
  autoparkOiwfs: boolean
  autoparkGems: boolean
  autoparkAowfs: boolean
}

interface TelescopeContextType {
  odbVisible: boolean
  setOdbVisible: (_: boolean) => void
  targetVisible: boolean
  setTargetVisible: (_: boolean) => void
  slewVisible: boolean
  setSlewVisible: (_: boolean) => void
  baseTarget: BaseTarget
  setBaseTarget: (_: BaseTarget) => void
  scienceTarget: ScienceTarget
  setOdbTarget: (_: any) => void
  setFixedTarget: (_: any) => void
  slewFlags: SlewFlags
  setSlewFlags: (_: SlewFlags) => void
  instrument: InstrumentConfig
  setInstrument: (_: InstrumentConfig) => void
  guideTarget: BaseTarget
  setGuideTarget: (_: BaseTarget) => void
}