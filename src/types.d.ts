export type ThemeType = "light" | "dark"

export type UserType = {
  pk: number
  name: string
  configurations?: ConfigurationType[]
}

export type ConfigurationType = {
  pk: number
  name: string
  instrument?: InstrumentType
  observation?: ObservationType
  rotator?: RotatorType
  slewFlags?: SlewFlagsType
}

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

export type ObservationType = {
  pk: number
  id: string
  name: string
  selectedTarget: number
  selectedGuideTarget: number
  selectedProbe: number
  targets?: TargetType[]
  guideProbes?: GuideProbeType[]
}

export type GuideProbeType = {
  pk: number
  probe: string
  targets?: TargetType[]
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

export type TypeOfTarget = "FIXED" | "SCIENCE" | "BLINDOFFSET" | "GUIDE"

export type PanelType = "Telescope" | "WavefrontSensors" | "Guider"

export type ButtonStateType = "PENDING" | "ACTIVE" | "DONE"

export type NodeStatusType = "inactive" | "active" | "idle"

export interface SlewFlagsType {
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

export interface TelescopeContextType {
  odbVisible: boolean
  setOdbVisible: (_: boolean) => void
  targetVisible: boolean
  setTargetVisible: (_: boolean) => void
  slewVisible: boolean
  setSlewVisible: (_: boolean) => void
  slewFlags: SlewFlags
  setSlewFlags: (_: SlewFlags) => void
}

export interface TargetInput {
  id?: string
  name: string
  ra?: number
  dec?: number
  az?: number
  el?: number
  epoch?: string
  type: TypeOfTarget
}

export interface ObservationInput {
  id: string
  name: string
  targets: TargetInput[]
}

export interface TargetEditType {
  isVisible: boolean
  target: TargetType
  targetIndex: number | undefined
  probeIndex: number | undefined
}

export interface OdbObservationType {
  id: string
  title: string
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

export interface ParamsInterface {
  loading: boolean
  observations_list: any
  selectedObservation: OdbObservationType
  setSelectedObservation: (_: OdbObservationType) => void
}

export interface ConfigurationChangesType {
  op: "remove" | "add" | "replace"
  path: object | string
  value?: string | number
}

export interface VariablesContextType {
  theme: ThemeType
  toggleTheme(): void
  odbVisible: boolean
  setOdbVisible(_: boolean): void
  setOdbObservation(_: ObservationType): void
  slewVisible: boolean
  setSlewVisible(_: boolean): void
  targetEdit: TargetEditType
  setTargetEdit(_: TargetEditType): void
  importInstrument: boolean
  setImportInstrument(_: boolean): void
  saveConfiguration(type: "save" | "create"): void
  selectedTarget: TargetType
  isConfigModalVisible: boolean
  setIsConfigModalVisible(_: boolean): void
  configuration: ConfigurationType
  setConfiguration(_: ConfigurationType): void
  configurationChanges: ConfigurationChangesType[] | undefined
  loadingGuideTarget: boolean
  setLoadingGuideTarget(_: boolean): void
}
