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
