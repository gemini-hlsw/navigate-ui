export type ThemeType = "light" | "dark"

export type UserType = {
  pk: number
  name: string
}

export type ConfigurationType = {
  pk: number
  site: SiteType
  selectedTarget: number
  selectedOiTarget: number
  selectedP1Target: number
  selectedP2Target: number
  oiGuidingType: GuidingType
  p1GuidingType: GuidingType
  p2GuidingType: GuidingType
  obsTitle: string
  obsId: string
  obsInstrument: string
  obsSubtitle: string
}

export type SiteType = "GN" | "GS"

export type GuidingType = "NORMAL"

export type InstrumentType = {
  pk: number
  name: string
  iaa: number
  issPort: number
  focusOffset: number
  wfs: WfsType
  originX: number
  originY: number
  ao: boolean
  extraParams: object
}

export type RotatorType = {
  pk: number
  angle: number
  tracking: TrackingType
}

export type TargetType = {
  pk: number
  id: string
  name: string
  ra?: RaType | null
  dec?: DecType | null
  az?: AzType | null
  el?: ElType | null
  epoch?: string
  type: TypeOfTarget
  createdAt: Date
}

export type RaType = {
  degrees?: number
  hms?: string
}

export type DecType = {
  degrees?: number
  dms?: string
}

export type AzType = {
  degrees?: number
  dms?: string
}

export type ElType = {
  degrees?: number
  dms?: string
}

export type WfsType = "NONE" | "PWFS1" | "PWFS2" | "OIWFS"

export type TrackingType = "TRACKING" | "FIXED"

export type TypeOfTarget =
  | "FIXED"
  | "SCIENCE"
  | "BLINDOFFSET"
  | "OIWFS"
  | "PWFS1"
  | "PWFS2"

export type PanelType = "Telescope" | "WavefrontSensors" | "Guider"

export type ButtonStateType = "PENDING" | "ACTIVE" | "DONE"

export type NodeStatusType = "inactive" | "active" | "idle"

export interface SlewFlagsType {
  __typename: string
  pk: number
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

export interface TargetInput {
  id?: string
  name: string
  coord1?: number
  coord2?: number
  epoch?: string
  type: TypeOfTarget
}

export interface ParamsInterface {
  loading: boolean
  observations_list: any
  selectedObservation: OdbObservationType
  setSelectedObservation: (_: OdbObservationType) => void
}

export interface TargetEditType {
  isVisible: boolean
  target: TargetType
  targetIndex: number | undefined
}

export interface OdbObservationType {
  id: string
  title: string
  subtitle: string
  instrument: string
  targetEnvironment: {
    firstScienceTarget: {
      id: string
      name: string
      sidereal: {
        ra: {
          degrees: number
        }
        dec: {
          degrees: number
        }
        epoch: string
      }
    }
  }
}

export interface VariablesContextType {
  theme: ThemeType
  toggleTheme(): void
  odbVisible: boolean
  setOdbVisible(_: boolean): void
  slewVisible: boolean
  setSlewVisible(_: boolean): void
  targetEdit: TargetEditType
  setTargetEdit(_: TargetEditType): void
  importInstrument: boolean
  setImportInstrument(_: boolean): void
  configuration: ConfigurationType
  setConfiguration(_: ConfigurationType): void
  loadingGuideTarget: boolean
  setLoadingGuideTarget(_: boolean): void
  slewFlags: SlewFlagsType
  setSlewFlags(_: SlewFlagsType): void
  baseTargets: TargetType[]
  setBaseTargets(_: TargetType[]): void
  oiTargets: TargetType[]
  setOiTargets(_: TargetType[]): void
  p1Targets: TargetType[]
  setP1Targets(_: TargetType[]): void
  p2Targets: TargetType[]
  setP2Targets(_: TargetType[]): void
  instrument: InstrumentType
  setInstrument(_: InstrumentType): void
  rotator: RotatorType
  setRotator(_: RotatorType): void
}

export interface AltairGuideLoopType {
  pk: number
  aoEnabled: boolean
  oiBlend: boolean
  focus: boolean
  p1Ttf: boolean
  strap: boolean
  oiTtf: boolean
  ttgs: boolean
  sfo: boolean
}

export interface GemsGuideLoopType {
  pk: number
  aoEnabled: boolean
  focus: boolean
  rotation: boolean
  tipTilt: boolean
  anisopl: boolean
  flexure: boolean
}

export interface GuideLoopType {
  pk: number
  m2TipTiltEnable: boolean
  m2TipTiltSource: string
  m2FocusEnable: boolean
  m2FocusSource: string
  m2TipTiltFocusLink: boolean
  m2ComaEnable: boolean
  m1CorrectionsEnable: boolean
  m2ComaM1CorrectionsSource: string
  mountOffload: boolean
  daytimeMode: boolean
  probeTracking: string
  lightPath: string
}

export interface GemsInstrumentType {
  pk: number
  beamsplitter: string
  adc: boolean
  astrometricMode: string
}

export interface AltairInstrumentType {
  pk: number
  beamsplitter: string
  startMagnitude: number
  seeing: number
  windSpeed: number
  forceMode: boolean
  ndFilter: boolean
  fieldLens: boolean
  deployAdc: boolean
  adjustAdc: boolean
  lgs: boolean
}

export type StatusType = "PENDING" | "ACTIVE" | "DONE" | "ERROR"

export interface MechanismType {
  pk: number
  mcs: StatusType
  mcsPark: StatusType
  mcsUnwrap: StatusType
  scs: StatusType
  crcs: StatusType
  crcsPark: StatusType
  crcsUnwrap: StatusType
  pwfs1: StatusType
  pwfs1Park: StatusType
  pwfs1Unwrap: StatusType
  pwfs2: StatusType
  pwfs2Park: StatusType
  pwfs2Unwrap: StatusType
  oiwfs: StatusType
  oiwfsPark: StatusType
  odgw: StatusType
  odgwPark: StatusType
  aowfs: StatusType
  aowfsPark: StatusType
  dome: StatusType
  domePark: StatusType
  domeMode: string
  shutters: StatusType
  shuttersPark: StatusType
  shutterMode: string
  shutterAperture: number
  wVGate: StatusType
  wVGateClose: StatusType
  wVGateValue: number
  eVGate: StatusType
  eVGateClose: StatusType
  eVGateValue: number
  agScienceFoldPark: StatusType
  agAoFoldPark: StatusType
  agAcPickoffPark: StatusType
  agParkAll: StatusType
}
