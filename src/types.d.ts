import {
  AltairGuideLoop as AltairGuideLoopType,
  AltairInstrument as AltairInstrumentType,
  Configuration as ConfigurationType,
  GemsGuideLoop as GemsGuideLoopType,
  GemsInstrument as GemsInstrumentType,
  GuideLoop as GuideLoopType,
  GuidingType,
  Instrument as InstrumentType,
  Mechanism as MechanismType,
  Rotator as RotatorType,
  SiteType,
  SlewFlags as SlewFlagsType,
  StatusType,
  TargetInput,
  Target as TargetType,
  TargetType as TypeOfTarget,
  User as UserType,
} from '@gql/configs/gen/graphql';
import { GetObservationsQuery, Observation as OdbObservationType } from '@gql/odb/gen/graphql';
import { RotatorTrackingMode as TrackingType } from '@gql/server/gen/graphql';

export type ThemeType = 'light' | 'dark';

export type {
  AltairGuideLoopType,
  AltairInstrumentType,
  ConfigurationType,
  GemsGuideLoopType,
  GemsInstrumentType,
  GuideLoopType,
  GuidingType,
  InstrumentType,
  MechanismType,
  OdbObservationType,
  RotatorType,
  SiteType,
  SlewFlagsType,
  StatusType,
  TargetInput,
  TargetType,
  TrackingType,
  TypeOfTarget,
  UserType,
};

export type PanelType = 'Telescope' | 'WavefrontSensors' | 'Guider';

export type ButtonStateType = 'PENDING' | 'ACTIVE' | 'DONE';

export interface ParamsInterface {
  loading: boolean;
  observations_list: GetObservationsQuery['observations'] | undefined;
  selectedObservation: OdbObservationType;
  setSelectedObservation: (_: OdbObservationType) => void;
}

export interface TargetEditType {
  isVisible: boolean;
  target: TargetType;
  targetIndex: number | undefined;
}

export interface VariablesContextType {
  theme: ThemeType;
  toggleTheme(): void;
  odbVisible: boolean;
  setOdbVisible(_: boolean): void;
  slewVisible: boolean;
  setSlewVisible(_: boolean): void;
  targetEdit: TargetEditType;
  setTargetEdit(_: TargetEditType): void;
  importInstrument: boolean;
  setImportInstrument(_: boolean): void;
  configuration: ConfigurationType;
  setConfiguration(_: ConfigurationType): void;
  loadingGuideTarget: boolean;
  setLoadingGuideTarget(_: boolean): void;
  slewFlags: SlewFlagsType;
  setSlewFlags(_: SlewFlagsType): void;
  baseTargets: TargetType[];
  setBaseTargets(_: TargetType[]): void;
  oiTargets: TargetType[];
  setOiTargets(_: TargetType[]): void;
  p1Targets: TargetType[];
  setP1Targets(_: TargetType[]): void;
  p2Targets: TargetType[];
  setP2Targets(_: TargetType[]): void;
  instrument: InstrumentType;
  setInstrument(_: InstrumentType): void;
  rotator: RotatorType;
  setRotator(_: RotatorType): void;
  odbToken: string;
}
