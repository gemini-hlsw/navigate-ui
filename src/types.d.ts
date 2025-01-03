import type {
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
  Target as TargetType,
  TargetInput,
  TargetType as TypeOfTarget,
  User as UserType,
} from '@gql/configs/gen/graphql';
import type { GetObservationsQuery } from '@gql/odb/gen/graphql';
import type { RotatorTrackingMode as TrackingType } from '@gql/server/gen/graphql';

export type ThemeType = 'light' | 'dark';

export type OdbObservationType = NonNullable<GetObservationsQuery['observations']['matches'][number]>;

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

export interface ParamsInterface {
  loading: boolean;
  observations_list: OdbObservationType[] | undefined;
  selectedObservation: OdbObservationType;
  setSelectedObservation: (_: OdbObservationType) => void;
}

export interface TargetEditType {
  isVisible: boolean;
  target: TargetType;
  targetIndex: number | undefined;
}
