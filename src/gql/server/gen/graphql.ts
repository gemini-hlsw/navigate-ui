/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  BigDecimal: { input: number; output: number };
  DmsString: { input: string; output: string };
  EpochString: { input: string; output: string };
  HmsString: { input: string; output: string };
  Long: { input: number; output: number };
  NonEmptyString: { input: string; output: string };
  PosBigDecimal: { input: number; output: number };
  PosInt: { input: number; output: number };
  TargetId: { input: string; output: string };
  Timestamp: { input: string; output: string };
};

export type AngleInput = {
  arcminutes?: InputMaybe<Scalars['BigDecimal']['input']>;
  arcseconds?: InputMaybe<Scalars['BigDecimal']['input']>;
  degrees?: InputMaybe<Scalars['BigDecimal']['input']>;
  dms?: InputMaybe<Scalars['String']['input']>;
  hms?: InputMaybe<Scalars['String']['input']>;
  hours?: InputMaybe<Scalars['BigDecimal']['input']>;
  microarcseconds?: InputMaybe<Scalars['Long']['input']>;
  microseconds?: InputMaybe<Scalars['BigDecimal']['input']>;
  milliarcseconds?: InputMaybe<Scalars['BigDecimal']['input']>;
  milliseconds?: InputMaybe<Scalars['BigDecimal']['input']>;
  minutes?: InputMaybe<Scalars['BigDecimal']['input']>;
  seconds?: InputMaybe<Scalars['BigDecimal']['input']>;
};

export type CatalogInfo = {
  __typename?: 'CatalogInfo';
  id: Scalars['String']['output'];
  name: CatalogName;
  objectType?: Maybe<Scalars['String']['output']>;
};

export type CatalogInfoInput = {
  id?: InputMaybe<Scalars['NonEmptyString']['input']>;
  name?: InputMaybe<CatalogName>;
  objectType?: InputMaybe<Scalars['NonEmptyString']['input']>;
};

export type CatalogName = 'GAIA' | 'IMPORT' | 'SIMBAD';

export type Declination = {
  __typename?: 'Declination';
  degrees: Scalars['BigDecimal']['output'];
  dms: Scalars['DmsString']['output'];
  microarcseconds: Scalars['Long']['output'];
};

export type DeclinationInput = {
  degrees?: InputMaybe<Scalars['BigDecimal']['input']>;
  dms?: InputMaybe<Scalars['DmsString']['input']>;
  microarcseconds?: InputMaybe<Scalars['Long']['input']>;
};

export type Distance = {
  __typename?: 'Distance';
  micrometers: Scalars['Long']['output'];
  millimeters: Scalars['BigDecimal']['output'];
};

export type DistanceInput = {
  micrometers?: InputMaybe<Scalars['Long']['input']>;
  millimeters?: InputMaybe<Scalars['BigDecimal']['input']>;
};

export type EphemerisKeyType = 'ASTEROID_NEW' | 'ASTEROID_OLD' | 'COMET' | 'MAJOR_BODY' | 'USER_SUPPLIED';

export type FollowStatus = 'FOLLOWING' | 'NOT_FOLLOWING';

export type GuideConfigurationInput = {
  /** Flag for day time tests. It sets all gains to 0 */
  daytimeMode: Scalars['Boolean']['input'];
  /** M1 correction source. If it is not defined it means no M1 correction */
  m1Input?: InputMaybe<M1CorrectionSource>;
  /** M2 coma correction enabled. Only valid if m2Inputs and m1Input are defined */
  m2Coma?: InputMaybe<Scalars['Boolean']['input']>;
  /** M2 Tip-Tilt correction sources. An empty array means no corrections */
  m2Inputs?: InputMaybe<Array<TipTiltSource>>;
  /** Tip-tilt offload to the mount enabled */
  mountOffload: Scalars['Boolean']['input'];
  /** Probe names to be used for guiding */
  probeGuide?: InputMaybe<ProbeGuideInput>;
};

export type GuideConfigurationState = {
  __typename?: 'GuideConfigurationState';
  /** M1 correction source. If it is not defined it means no M1 correction */
  m1Input?: Maybe<M1CorrectionSource>;
  /** M2 coma correction enabled. Only valid if m2Inputs and m1Input are defined */
  m2Coma?: Maybe<Scalars['Boolean']['output']>;
  /** M2 Tip-Tilt correction sources. An empty array means no corrections */
  m2Inputs?: Maybe<Array<TipTiltSource>>;
  /** Tip-tilt offload to the mount enabled */
  mountOffload: Scalars['Boolean']['output'];
  /** Is OIWFS integrating? */
  oiIntegrating: Scalars['Boolean']['output'];
  /** Is PWFS1 integrating? */
  p1Integrating: Scalars['Boolean']['output'];
  /** Is PWFS2 integrating? */
  p2Integrating: Scalars['Boolean']['output'];
};

export type GuideProbe = 'GMOS_OIWFS' | 'PWFS_1' | 'PWFS_2';

export type GuideTargetPropertiesInput = {
  name: Scalars['NonEmptyString']['input'];
  nonsidereal?: InputMaybe<NonsiderealInput>;
  sidereal?: InputMaybe<SiderealInput>;
};

export type GuiderConfig = {
  target: GuideTargetPropertiesInput;
  tracking: ProbeTrackingInput;
};

export type Instrument =
  | 'ACQ_CAM'
  | 'ALOPEKE'
  | 'BHROS'
  | 'FLAMINGOS2'
  | 'GHOST'
  | 'GMOS_NORTH'
  | 'GMOS_SOUTH'
  | 'GNIRS'
  | 'GPI'
  | 'GSAOI'
  | 'MICHELLE'
  | 'NICI'
  | 'NIFS'
  | 'NIRI'
  | 'PHOENIX'
  | 'SCORPIO'
  | 'TRECS'
  | 'VISITOR'
  | 'ZORRO';

export type InstrumentSpecificsInput = {
  agName: Scalars['String']['input'];
  focusOffset: DistanceInput;
  iaa: AngleInput;
  origin: PointOriginInput;
};

export type LogLevel = 'DEBUG' | 'ERROR' | 'INFO' | 'TRACE' | 'WARN';

export type LogMessage = {
  __typename?: 'LogMessage';
  level: LogLevel;
  message: Scalars['String']['output'];
  thread: Scalars['String']['output'];
  timestamp: Scalars['Timestamp']['output'];
};

export type M1CorrectionSource = 'OIWFS';

export type MountStatus = {
  __typename?: 'MountStatus';
  follow: FollowStatus;
  parked: ParkStatus;
};

export type Mutation = {
  __typename?: 'Mutation';
  guideDisable: OperationOutcome;
  guideEnable: OperationOutcome;
  instrumentSpecifics: OperationOutcome;
  mountFollow: OperationOutcome;
  mountPark: OperationOutcome;
  oiwfsFollow: OperationOutcome;
  oiwfsObserve: OperationOutcome;
  oiwfsPark: OperationOutcome;
  oiwfsProbeTracking: OperationOutcome;
  oiwfsStopObserve: OperationOutcome;
  oiwfsTarget: OperationOutcome;
  rotatorConfig: OperationOutcome;
  rotatorFollow: OperationOutcome;
  rotatorPark: OperationOutcome;
  slew: OperationOutcome;
  tcsConfig: OperationOutcome;
};

export type MutationGuideEnableArgs = {
  config: GuideConfigurationInput;
};

export type MutationInstrumentSpecificsArgs = {
  instrumentSpecificsParams: InstrumentSpecificsInput;
};

export type MutationMountFollowArgs = {
  enable: Scalars['Boolean']['input'];
};

export type MutationOiwfsFollowArgs = {
  enable: Scalars['Boolean']['input'];
};

export type MutationOiwfsObserveArgs = {
  period: TimeSpanInput;
};

export type MutationOiwfsProbeTrackingArgs = {
  config: ProbeTrackingInput;
};

export type MutationOiwfsTargetArgs = {
  target: TargetPropertiesInput;
};

export type MutationRotatorConfigArgs = {
  config: RotatorTrackingInput;
};

export type MutationRotatorFollowArgs = {
  enable: Scalars['Boolean']['input'];
};

export type MutationSlewArgs = {
  config: TcsConfigInput;
  slewOptions: SlewOptionsInput;
};

export type MutationTcsConfigArgs = {
  config: TcsConfigInput;
};

export type Nonsidereal = {
  __typename?: 'Nonsidereal';
  des: Scalars['String']['output'];
  key: Scalars['String']['output'];
  keyType: EphemerisKeyType;
};

export type NonsiderealInput = {
  des?: InputMaybe<Scalars['NonEmptyString']['input']>;
  key?: InputMaybe<Scalars['NonEmptyString']['input']>;
  keyType?: InputMaybe<EphemerisKeyType>;
};

export type OperationOutcome = {
  __typename?: 'OperationOutcome';
  msg?: Maybe<Scalars['String']['output']>;
  result: OperationResult;
};

export type OperationResult = 'FAILURE' | 'SUCCESS';

export type Parallax = {
  __typename?: 'Parallax';
  microarcseconds: Scalars['Long']['output'];
  milliarcseconds: Scalars['BigDecimal']['output'];
};

export type ParallaxInput = {
  microarcseconds?: InputMaybe<Scalars['Long']['input']>;
  milliarcseconds?: InputMaybe<Scalars['BigDecimal']['input']>;
};

export type ParkStatus = 'NOT_PARKED' | 'PARKED';

export type PointOrigin = {
  __typename?: 'PointOrigin';
  x: Distance;
  y: Distance;
};

export type PointOriginInput = {
  x: DistanceInput;
  y: DistanceInput;
};

export type ProbeGuideInput = {
  from?: InputMaybe<GuideProbe>;
  to?: InputMaybe<GuideProbe>;
};

export type ProbeTrackingInput = {
  nodAchopA: Scalars['Boolean']['input'];
  nodAchopB: Scalars['Boolean']['input'];
  nodBchopA: Scalars['Boolean']['input'];
  nodBchopB: Scalars['Boolean']['input'];
};

export type ProperMotion = {
  __typename?: 'ProperMotion';
  dec: ProperMotionDeclination;
  ra: ProperMotionRa;
};

export type ProperMotionComponentInput = {
  microarcsecondsPerYear?: InputMaybe<Scalars['Long']['input']>;
  milliarcsecondsPerYear?: InputMaybe<Scalars['BigDecimal']['input']>;
};

export type ProperMotionDeclination = {
  __typename?: 'ProperMotionDeclination';
  microarcsecondsPerYear: Scalars['Long']['output'];
  milliarcsecondsPerYear: Scalars['BigDecimal']['output'];
};

export type ProperMotionInput = {
  dec: ProperMotionComponentInput;
  ra: ProperMotionComponentInput;
};

export type ProperMotionRa = {
  __typename?: 'ProperMotionRA';
  microarcsecondsPerYear: Scalars['Long']['output'];
  milliarcsecondsPerYear: Scalars['BigDecimal']['output'];
};

export type Query = {
  __typename?: 'Query';
  /** telescopeStatus: TelescopeStatus! */
  guideState: GuideConfigurationState;
};

export type RadialVelocity = {
  __typename?: 'RadialVelocity';
  centimetersPerSecond: Scalars['Long']['output'];
  kilometersPerSecond: Scalars['BigDecimal']['output'];
  metersPerSecond: Scalars['BigDecimal']['output'];
};

export type RadialVelocityInput = {
  centimetersPerSecond?: InputMaybe<Scalars['Long']['input']>;
  kilometersPerSecond?: InputMaybe<Scalars['BigDecimal']['input']>;
  metersPerSecond?: InputMaybe<Scalars['BigDecimal']['input']>;
};

export type RightAscension = {
  __typename?: 'RightAscension';
  degrees: Scalars['BigDecimal']['output'];
  hms: Scalars['HmsString']['output'];
  hours: Scalars['BigDecimal']['output'];
  microarcseconds: Scalars['Long']['output'];
  microseconds: Scalars['Long']['output'];
};

export type RightAscensionInput = {
  degrees?: InputMaybe<Scalars['BigDecimal']['input']>;
  hms?: InputMaybe<Scalars['HmsString']['input']>;
  hours?: InputMaybe<Scalars['BigDecimal']['input']>;
  microarcseconds?: InputMaybe<Scalars['Long']['input']>;
  microseconds?: InputMaybe<Scalars['Long']['input']>;
};

export type RotatorTrackingInput = {
  ipa: AngleInput;
  mode: RotatorTrackingMode;
};

export type RotatorTrackingMode = 'FIXED' | 'TRACKING';

export type Sidereal = {
  __typename?: 'Sidereal';
  catalogInfo?: Maybe<CatalogInfo>;
  dec: Declination;
  epoch: Scalars['EpochString']['output'];
  parallax?: Maybe<Parallax>;
  properMotion?: Maybe<ProperMotion>;
  ra: RightAscension;
  radialVelocity?: Maybe<RadialVelocity>;
};

export type SiderealInput = {
  catalogInfo?: InputMaybe<CatalogInfoInput>;
  dec?: InputMaybe<DeclinationInput>;
  epoch?: InputMaybe<Scalars['EpochString']['input']>;
  parallax?: InputMaybe<ParallaxInput>;
  properMotion?: InputMaybe<ProperMotionInput>;
  ra?: InputMaybe<RightAscensionInput>;
  radialVelocity?: InputMaybe<RadialVelocityInput>;
};

/** Slew Options input */
export type SlewOptionsInput = {
  autoparkAowfs: Scalars['Boolean']['input'];
  autoparkGems: Scalars['Boolean']['input'];
  autoparkOiwfs: Scalars['Boolean']['input'];
  autoparkPwfs1: Scalars['Boolean']['input'];
  autoparkPwfs2: Scalars['Boolean']['input'];
  resetPointing: Scalars['Boolean']['input'];
  shortcircuitMountFilter: Scalars['Boolean']['input'];
  shortcircuitTargetFilter: Scalars['Boolean']['input'];
  stopGuide: Scalars['Boolean']['input'];
  zeroChopThrow: Scalars['Boolean']['input'];
  zeroGuideOffset: Scalars['Boolean']['input'];
  zeroInstrumentOffset: Scalars['Boolean']['input'];
  zeroMountDiffTrack: Scalars['Boolean']['input'];
  zeroMountOffset: Scalars['Boolean']['input'];
  zeroSourceDiffTrack: Scalars['Boolean']['input'];
  zeroSourceOffset: Scalars['Boolean']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  guideState: GuideConfigurationState;
  logMessage: LogMessage;
};

export type Target = {
  __typename?: 'Target';
  /** Target ID */
  id: Scalars['TargetId']['output'];
  /** Target name. */
  name: Scalars['NonEmptyString']['output'];
  /** Nonsidereal tracking information, if this is a nonsidereal target */
  nonsidereal?: Maybe<Nonsidereal>;
  /** Sidereal tracking information, if this is a sidereal target */
  sidereal?: Maybe<Sidereal>;
};

/** Target properties input */
export type TargetPropertiesInput = {
  id: Scalars['TargetId']['input'];
  name: Scalars['NonEmptyString']['input'];
  nonsidereal?: InputMaybe<NonsiderealInput>;
  sidereal?: InputMaybe<SiderealInput>;
  wavelength?: InputMaybe<WavelengthInput>;
};

export type TcsConfigInput = {
  instParams: InstrumentSpecificsInput;
  instrument: Instrument;
  oiwfs?: InputMaybe<GuiderConfig>;
  rotator: RotatorTrackingInput;
  sourceATarget: TargetPropertiesInput;
};

export type TelescopeStatus = {
  __typename?: 'TelescopeStatus';
  mount: MountStatus;
};

export type TimeSpanInput = {
  hours?: InputMaybe<Scalars['BigDecimal']['input']>;
  iso?: InputMaybe<Scalars['String']['input']>;
  microseconds?: InputMaybe<Scalars['Long']['input']>;
  milliseconds?: InputMaybe<Scalars['BigDecimal']['input']>;
  minutes?: InputMaybe<Scalars['BigDecimal']['input']>;
  seconds?: InputMaybe<Scalars['BigDecimal']['input']>;
};

export type TipTiltSource = 'OIWFS';

export type WavelengthInput = {
  angstroms?: InputMaybe<Scalars['PosBigDecimal']['input']>;
  micrometers?: InputMaybe<Scalars['PosBigDecimal']['input']>;
  nanometers?: InputMaybe<Scalars['PosBigDecimal']['input']>;
  picometers?: InputMaybe<Scalars['PosInt']['input']>;
};

export type ChangeMountStateMutationVariables = Exact<{
  enable: Scalars['Boolean']['input'];
}>;

export type ChangeMountStateMutation = {
  __typename?: 'Mutation';
  mountFollow: { __typename?: 'OperationOutcome'; result: OperationResult; msg?: string | null };
};

export type MountParkMutationVariables = Exact<{ [key: string]: never }>;

export type MountParkMutation = {
  __typename?: 'Mutation';
  mountPark: { __typename?: 'OperationOutcome'; result: OperationResult; msg?: string | null };
};

export type RunSlewMutationVariables = Exact<{
  slewOptions: SlewOptionsInput;
  config: TcsConfigInput;
}>;

export type RunSlewMutation = {
  __typename?: 'Mutation';
  slew: { __typename?: 'OperationOutcome'; result: OperationResult };
};

export type SetOiwfsTargetMutationVariables = Exact<{
  id: Scalars['TargetId']['input'];
  name: Scalars['NonEmptyString']['input'];
  ra?: InputMaybe<Scalars['HmsString']['input']>;
  dec?: InputMaybe<Scalars['DmsString']['input']>;
  epoch?: InputMaybe<Scalars['EpochString']['input']>;
  wavelength?: InputMaybe<Scalars['PosBigDecimal']['input']>;
}>;

export type SetOiwfsTargetMutation = {
  __typename?: 'Mutation';
  oiwfsTarget: { __typename?: 'OperationOutcome'; result: OperationResult };
};

export type GuideStateSubscriptionVariables = Exact<{ [key: string]: never }>;

export type GuideStateSubscription = {
  __typename?: 'Subscription';
  guideState: {
    __typename?: 'GuideConfigurationState';
    m2Inputs?: Array<TipTiltSource> | null;
    m2Coma?: boolean | null;
    m1Input?: M1CorrectionSource | null;
    mountOffload: boolean;
  };
};

export type GuideEnableMutationVariables = Exact<{
  config: GuideConfigurationInput;
}>;

export type GuideEnableMutation = {
  __typename?: 'Mutation';
  guideEnable: { __typename?: 'OperationOutcome'; result: OperationResult; msg?: string | null };
};

export type GuideDisableMutationVariables = Exact<{ [key: string]: never }>;

export type GuideDisableMutation = {
  __typename?: 'Mutation';
  guideDisable: { __typename?: 'OperationOutcome'; result: OperationResult; msg?: string | null };
};

export type LogMessageSubscriptionVariables = Exact<{ [key: string]: never }>;

export type LogMessageSubscription = {
  __typename?: 'Subscription';
  logMessage: { __typename?: 'LogMessage'; timestamp: string; level: LogLevel; thread: string; message: string };
};

export type OiwfsObserveMutationVariables = Exact<{
  period: TimeSpanInput;
}>;

export type OiwfsObserveMutation = {
  __typename?: 'Mutation';
  oiwfsObserve: { __typename?: 'OperationOutcome'; result: OperationResult; msg?: string | null };
};

export type OiwfsStopObserveMutationVariables = Exact<{ [key: string]: never }>;

export type OiwfsStopObserveMutation = {
  __typename?: 'Mutation';
  oiwfsStopObserve: { __typename?: 'OperationOutcome'; result: OperationResult; msg?: string | null };
};

export const ChangeMountStateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'changeMountState' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'enable' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'mountFollow' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'enable' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'enable' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'result' } },
                { kind: 'Field', name: { kind: 'Name', value: 'msg' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ChangeMountStateMutation, ChangeMountStateMutationVariables>;
export const MountParkDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'mountPark' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'mountPark' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'result' } },
                { kind: 'Field', name: { kind: 'Name', value: 'msg' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MountParkMutation, MountParkMutationVariables>;
export const RunSlewDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'runSlew' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'slewOptions' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'SlewOptionsInput' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'config' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'TcsConfigInput' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'slew' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'slewOptions' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'slewOptions' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'config' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'config' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'result' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RunSlewMutation, RunSlewMutationVariables>;
export const SetOiwfsTargetDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'setOiwfsTarget' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'TargetId' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'NonEmptyString' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'ra' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'HmsString' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'dec' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'DmsString' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'epoch' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'EpochString' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'wavelength' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'PosBigDecimal' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'oiwfsTarget' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'target' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'name' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'sidereal' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'ra' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'hms' },
                                  value: { kind: 'Variable', name: { kind: 'Name', value: 'ra' } },
                                },
                              ],
                            },
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'dec' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'dms' },
                                  value: { kind: 'Variable', name: { kind: 'Name', value: 'dec' } },
                                },
                              ],
                            },
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'epoch' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'epoch' } },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'wavelength' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'nanometers' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'wavelength' } },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'result' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SetOiwfsTargetMutation, SetOiwfsTargetMutationVariables>;
export const GuideStateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'subscription',
      name: { kind: 'Name', value: 'guideState' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'guideState' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'm2Inputs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'm2Coma' } },
                { kind: 'Field', name: { kind: 'Name', value: 'm1Input' } },
                { kind: 'Field', name: { kind: 'Name', value: 'mountOffload' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GuideStateSubscription, GuideStateSubscriptionVariables>;
export const GuideEnableDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'guideEnable' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'config' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'GuideConfigurationInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'guideEnable' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'config' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'config' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'result' } },
                { kind: 'Field', name: { kind: 'Name', value: 'msg' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GuideEnableMutation, GuideEnableMutationVariables>;
export const GuideDisableDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'guideDisable' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'guideDisable' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'result' } },
                { kind: 'Field', name: { kind: 'Name', value: 'msg' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GuideDisableMutation, GuideDisableMutationVariables>;
export const LogMessageDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'subscription',
      name: { kind: 'Name', value: 'logMessage' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'logMessage' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
                { kind: 'Field', name: { kind: 'Name', value: 'level' } },
                { kind: 'Field', name: { kind: 'Name', value: 'thread' } },
                { kind: 'Field', name: { kind: 'Name', value: 'message' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LogMessageSubscription, LogMessageSubscriptionVariables>;
export const OiwfsObserveDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'oiwfsObserve' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'period' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'TimeSpanInput' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'oiwfsObserve' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'period' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'period' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'result' } },
                { kind: 'Field', name: { kind: 'Name', value: 'msg' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<OiwfsObserveMutation, OiwfsObserveMutationVariables>;
export const OiwfsStopObserveDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'oiwfsStopObserve' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'oiwfsStopObserve' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'result' } },
                { kind: 'Field', name: { kind: 'Name', value: 'msg' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<OiwfsStopObserveMutation, OiwfsStopObserveMutationVariables>;
