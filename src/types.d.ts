import { StatusType } from '@gql/configs/gen/graphql';
import { RotatorTrackingMode } from '@gql/server/gen/graphql';
import {
  TargetType as ConfigsTargetType,
  GetAllInfoQuery,
  GetAltairGuideLoopQuery,
  GetAltairInstrumentQuery,
  GetConfigurationQuery,
  GetGemsInstrumentQuery,
  GetGuideLoopQuery,
  GetInstrumentsQuery,
  GetMechanismQuery,
} from './gql/configs/gen/graphql';
import { SiteType, GuidingType, TargetInput } from '@gql/configs/gen/graphql';
import { GetObservationsQuery } from '@gql/odb/gen/graphql';
export type ThemeType = 'light' | 'dark';

export type UserType = {
  pk: number;
  name: string;
};

export type ConfigurationType = NonNullable<GetConfigurationQuery['configuration']>;

export type { SiteType };

export type { GuidingType };

export type InstrumentType = NonNullable<NonNullable<GetInstrumentsQuery['instruments']>[0]>;

export type RotatorType = NonNullable<GetAllInfoQuery['rotator']>;

export type TargetType = NonNullable<NonNullable<GetAllInfoQuery['targets']>[0]>;

export type TrackingType = RotatorTrackingMode;

export type TypeOfTarget = ConfigsTargetType;

export type PanelType = 'Telescope' | 'WavefrontSensors' | 'Guider';

export type ButtonStateType = 'PENDING' | 'ACTIVE' | 'DONE';

export type SlewFlagsType = NonNullable<GetAllInfoQuery['slewFlags']>;

export type { TargetInput };

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

export type OdbObservationType = NonNullable<NonNullable<GetObservationsQuery['observations']>['matches'][0]>;

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

export type AltairGuideLoopType = NonNullable<GetAltairGuideLoopQuery['altairGuideLoop']>;

export type GemsGuideLoopType = NonNullable<GetGemsGuideLoopQuery['gemsGuideLoop']>;

export type GuideLoopType = NonNullable<GetGuideLoopQuery['guideLoop']>;

export type GemsInstrumentType = NonNullable<GetGemsInstrumentQuery['gemsInstrument']>;

export type AltairInstrumentType = NonNullable<GetAltairInstrumentQuery['altairInstrument']>;

export type { StatusType };

export type MechanismType = NonNullable<GetMechanismQuery['mechanism']>;
