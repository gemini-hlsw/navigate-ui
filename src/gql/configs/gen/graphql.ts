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
  JSON: { input: any; output: any };
};

export type AltairGuideLoop = {
  __typename?: 'AltairGuideLoop';
  aoEnabled?: Maybe<Scalars['Boolean']['output']>;
  focus?: Maybe<Scalars['Boolean']['output']>;
  oiBlend?: Maybe<Scalars['Boolean']['output']>;
  oiTtf?: Maybe<Scalars['Boolean']['output']>;
  p1Ttf?: Maybe<Scalars['Boolean']['output']>;
  pk?: Maybe<Scalars['Int']['output']>;
  sfo?: Maybe<Scalars['Boolean']['output']>;
  strap?: Maybe<Scalars['Boolean']['output']>;
  ttgs?: Maybe<Scalars['Boolean']['output']>;
};

export type AltairInstrument = {
  __typename?: 'AltairInstrument';
  adjustAdc?: Maybe<Scalars['Boolean']['output']>;
  beamsplitter?: Maybe<Scalars['String']['output']>;
  deployAdc?: Maybe<Scalars['Boolean']['output']>;
  fieldLens?: Maybe<Scalars['Boolean']['output']>;
  forceMode?: Maybe<Scalars['Boolean']['output']>;
  lgs?: Maybe<Scalars['Boolean']['output']>;
  ndFilter?: Maybe<Scalars['Boolean']['output']>;
  pk?: Maybe<Scalars['Int']['output']>;
  seeing?: Maybe<Scalars['Float']['output']>;
  startMagnitude?: Maybe<Scalars['Float']['output']>;
  windSpeed?: Maybe<Scalars['Float']['output']>;
};

export type Az = {
  __typename?: 'Az';
  degrees?: Maybe<Scalars['Float']['output']>;
  dms?: Maybe<Scalars['String']['output']>;
};

export type Configuration = {
  __typename?: 'Configuration';
  obsId?: Maybe<Scalars['String']['output']>;
  obsInstrument?: Maybe<Scalars['String']['output']>;
  obsSubtitle?: Maybe<Scalars['String']['output']>;
  obsTitle?: Maybe<Scalars['String']['output']>;
  oiGuidingType?: Maybe<GuidingType>;
  p1GuidingType?: Maybe<GuidingType>;
  p2GuidingType?: Maybe<GuidingType>;
  pk?: Maybe<Scalars['Int']['output']>;
  selectedOiTarget?: Maybe<Scalars['Int']['output']>;
  selectedP1Target?: Maybe<Scalars['Int']['output']>;
  selectedP2Target?: Maybe<Scalars['Int']['output']>;
  selectedTarget?: Maybe<Scalars['Int']['output']>;
  site?: Maybe<SiteType>;
};

export type Dec = {
  __typename?: 'Dec';
  degrees?: Maybe<Scalars['Float']['output']>;
  dms?: Maybe<Scalars['String']['output']>;
};

export type El = {
  __typename?: 'El';
  degrees?: Maybe<Scalars['Float']['output']>;
  dms?: Maybe<Scalars['String']['output']>;
};

export type GemsGuideLoop = {
  __typename?: 'GemsGuideLoop';
  anisopl?: Maybe<Scalars['Boolean']['output']>;
  aoEnabled?: Maybe<Scalars['Boolean']['output']>;
  flexure?: Maybe<Scalars['Boolean']['output']>;
  focus?: Maybe<Scalars['Boolean']['output']>;
  pk?: Maybe<Scalars['Int']['output']>;
  rotation?: Maybe<Scalars['Boolean']['output']>;
  tipTilt?: Maybe<Scalars['Boolean']['output']>;
};

export type GemsInstrument = {
  __typename?: 'GemsInstrument';
  adc?: Maybe<Scalars['Boolean']['output']>;
  astrometricMode?: Maybe<Scalars['String']['output']>;
  beamsplitter?: Maybe<Scalars['String']['output']>;
  pk?: Maybe<Scalars['Int']['output']>;
};

export type GuideLoop = {
  __typename?: 'GuideLoop';
  daytimeMode?: Maybe<Scalars['Boolean']['output']>;
  lightPath?: Maybe<Scalars['String']['output']>;
  m1CorrectionsEnable?: Maybe<Scalars['Boolean']['output']>;
  m2ComaEnable?: Maybe<Scalars['Boolean']['output']>;
  m2ComaM1CorrectionsSource?: Maybe<Scalars['String']['output']>;
  m2FocusEnable?: Maybe<Scalars['Boolean']['output']>;
  m2FocusSource?: Maybe<Scalars['String']['output']>;
  m2TipTiltEnable?: Maybe<Scalars['Boolean']['output']>;
  m2TipTiltFocusLink?: Maybe<Scalars['Boolean']['output']>;
  m2TipTiltSource?: Maybe<Scalars['String']['output']>;
  mountOffload?: Maybe<Scalars['Boolean']['output']>;
  pk?: Maybe<Scalars['Int']['output']>;
  probeTracking?: Maybe<Scalars['String']['output']>;
};

export type GuidingType = 'NORMAL';

export type Instrument = {
  __typename?: 'Instrument';
  ao?: Maybe<Scalars['Boolean']['output']>;
  extraParams?: Maybe<Scalars['JSON']['output']>;
  focusOffset?: Maybe<Scalars['Float']['output']>;
  iaa?: Maybe<Scalars['Float']['output']>;
  issPort?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  originX?: Maybe<Scalars['Float']['output']>;
  originY?: Maybe<Scalars['Float']['output']>;
  pk?: Maybe<Scalars['Int']['output']>;
  wfs?: Maybe<WfsType>;
};

export type Mechanism = {
  __typename?: 'Mechanism';
  agAcPickoffPark?: Maybe<StatusType>;
  agAoFoldPark?: Maybe<StatusType>;
  agParkAll?: Maybe<StatusType>;
  agScienceFoldPark?: Maybe<StatusType>;
  aowfs?: Maybe<StatusType>;
  aowfsPark?: Maybe<StatusType>;
  crcs?: Maybe<StatusType>;
  crcsPark?: Maybe<StatusType>;
  crcsUnwrap?: Maybe<StatusType>;
  dome?: Maybe<StatusType>;
  domeMode?: Maybe<Scalars['String']['output']>;
  domePark?: Maybe<StatusType>;
  eVGate?: Maybe<StatusType>;
  eVGateClose?: Maybe<StatusType>;
  eVGateValue?: Maybe<Scalars['Int']['output']>;
  mcs?: Maybe<StatusType>;
  mcsPark?: Maybe<StatusType>;
  mcsUnwrap?: Maybe<StatusType>;
  odgw?: Maybe<StatusType>;
  odgwPark?: Maybe<StatusType>;
  oiwfs?: Maybe<StatusType>;
  oiwfsPark?: Maybe<StatusType>;
  pk?: Maybe<Scalars['Int']['output']>;
  pwfs1?: Maybe<StatusType>;
  pwfs1Park?: Maybe<StatusType>;
  pwfs1Unwrap?: Maybe<StatusType>;
  pwfs2?: Maybe<StatusType>;
  pwfs2Park?: Maybe<StatusType>;
  pwfs2Unwrap?: Maybe<StatusType>;
  scs?: Maybe<StatusType>;
  shutterAperture?: Maybe<Scalars['Int']['output']>;
  shutterMode?: Maybe<Scalars['String']['output']>;
  shutters?: Maybe<StatusType>;
  shuttersPark?: Maybe<StatusType>;
  wVGate?: Maybe<StatusType>;
  wVGateClose?: Maybe<StatusType>;
  wVGateValue?: Maybe<Scalars['Int']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createConfiguration?: Maybe<Configuration>;
  createInstrument?: Maybe<Instrument>;
  createTarget?: Maybe<Target>;
  createUser?: Maybe<User>;
  removeAndCreateBaseTargets?: Maybe<Array<Maybe<Target>>>;
  removeAndCreateWfsTargets?: Maybe<Array<Maybe<Target>>>;
  updateAltairGuideLoop?: Maybe<AltairGuideLoop>;
  updateAltairInstrument?: Maybe<AltairInstrument>;
  updateConfiguration?: Maybe<Configuration>;
  updateGemsGuideLoop?: Maybe<GemsGuideLoop>;
  updateGemsInstrument?: Maybe<GemsInstrument>;
  updateGuideLoop?: Maybe<GuideLoop>;
  updateMechanism?: Maybe<Mechanism>;
  updateRotator?: Maybe<Rotator>;
  updateSlewFlags?: Maybe<SlewFlags>;
  updateTarget?: Maybe<Target>;
};

export type MutationCreateConfigurationArgs = {
  obsId?: InputMaybe<Scalars['String']['input']>;
  obsInstrument?: InputMaybe<Scalars['String']['input']>;
  obsSubtitle?: InputMaybe<Scalars['String']['input']>;
  obsTitle?: InputMaybe<Scalars['String']['input']>;
  oiGuidingType?: InputMaybe<GuidingType>;
  p1GuidingType?: InputMaybe<GuidingType>;
  p2GuidingType?: InputMaybe<GuidingType>;
  selectedOiTarget?: InputMaybe<Scalars['Int']['input']>;
  selectedP1Target?: InputMaybe<Scalars['Int']['input']>;
  selectedP2Target?: InputMaybe<Scalars['Int']['input']>;
  selectedTarget?: InputMaybe<Scalars['Int']['input']>;
  site?: InputMaybe<SiteType>;
};

export type MutationCreateInstrumentArgs = {
  ao?: InputMaybe<Scalars['Boolean']['input']>;
  extraParams?: InputMaybe<Scalars['JSON']['input']>;
  focusOffset?: InputMaybe<Scalars['Float']['input']>;
  iaa?: InputMaybe<Scalars['Float']['input']>;
  issPort: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  originX?: InputMaybe<Scalars['Float']['input']>;
  originY?: InputMaybe<Scalars['Float']['input']>;
  wfs?: InputMaybe<WfsType>;
};

export type MutationCreateTargetArgs = {
  az?: InputMaybe<Scalars['Float']['input']>;
  dec?: InputMaybe<Scalars['Float']['input']>;
  el?: InputMaybe<Scalars['Float']['input']>;
  epoch?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  ra?: InputMaybe<Scalars['Float']['input']>;
  type: TargetType;
};

export type MutationCreateUserArgs = {
  name: Scalars['String']['input'];
};

export type MutationRemoveAndCreateBaseTargetsArgs = {
  targets?: InputMaybe<Array<InputMaybe<TargetInput>>>;
};

export type MutationRemoveAndCreateWfsTargetsArgs = {
  targets?: InputMaybe<Array<InputMaybe<TargetInput>>>;
  wfs?: InputMaybe<TargetType>;
};

export type MutationUpdateAltairGuideLoopArgs = {
  aoEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  focus?: InputMaybe<Scalars['Boolean']['input']>;
  oiBlend?: InputMaybe<Scalars['Boolean']['input']>;
  oiTtf?: InputMaybe<Scalars['Boolean']['input']>;
  p1Ttf?: InputMaybe<Scalars['Boolean']['input']>;
  pk: Scalars['Int']['input'];
  sfo?: InputMaybe<Scalars['Boolean']['input']>;
  strap?: InputMaybe<Scalars['Boolean']['input']>;
  ttgs?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MutationUpdateAltairInstrumentArgs = {
  adjustAdc?: InputMaybe<Scalars['Boolean']['input']>;
  beamsplitter?: InputMaybe<Scalars['String']['input']>;
  deployAdc?: InputMaybe<Scalars['Boolean']['input']>;
  fieldLens?: InputMaybe<Scalars['Boolean']['input']>;
  forceMode?: InputMaybe<Scalars['Boolean']['input']>;
  lgs?: InputMaybe<Scalars['Boolean']['input']>;
  ndFilter?: InputMaybe<Scalars['Boolean']['input']>;
  pk: Scalars['Int']['input'];
  seeing?: InputMaybe<Scalars['Float']['input']>;
  startMagnitude?: InputMaybe<Scalars['Float']['input']>;
  windSpeed?: InputMaybe<Scalars['Float']['input']>;
};

export type MutationUpdateConfigurationArgs = {
  obsId?: InputMaybe<Scalars['String']['input']>;
  obsInstrument?: InputMaybe<Scalars['String']['input']>;
  obsSubtitle?: InputMaybe<Scalars['String']['input']>;
  obsTitle?: InputMaybe<Scalars['String']['input']>;
  oiGuidingType?: InputMaybe<GuidingType>;
  p1GuidingType?: InputMaybe<GuidingType>;
  p2GuidingType?: InputMaybe<GuidingType>;
  pk: Scalars['Int']['input'];
  selectedOiTarget?: InputMaybe<Scalars['Int']['input']>;
  selectedP1Target?: InputMaybe<Scalars['Int']['input']>;
  selectedP2Target?: InputMaybe<Scalars['Int']['input']>;
  selectedTarget?: InputMaybe<Scalars['Int']['input']>;
  site?: InputMaybe<SiteType>;
};

export type MutationUpdateGemsGuideLoopArgs = {
  anisopl?: InputMaybe<Scalars['Boolean']['input']>;
  aoEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  flexure?: InputMaybe<Scalars['Boolean']['input']>;
  focus?: InputMaybe<Scalars['Boolean']['input']>;
  pk: Scalars['Int']['input'];
  rotation?: InputMaybe<Scalars['Boolean']['input']>;
  tipTilt?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MutationUpdateGemsInstrumentArgs = {
  adc?: InputMaybe<Scalars['Boolean']['input']>;
  astrometricMode?: InputMaybe<Scalars['String']['input']>;
  beamsplitter?: InputMaybe<Scalars['String']['input']>;
  pk: Scalars['Int']['input'];
};

export type MutationUpdateGuideLoopArgs = {
  daytimeMode?: InputMaybe<Scalars['Boolean']['input']>;
  lightPath?: InputMaybe<Scalars['String']['input']>;
  m1CorrectionsEnable?: InputMaybe<Scalars['Boolean']['input']>;
  m2ComaEnable?: InputMaybe<Scalars['Boolean']['input']>;
  m2ComaM1CorrectionsSource?: InputMaybe<Scalars['String']['input']>;
  m2FocusEnable?: InputMaybe<Scalars['Boolean']['input']>;
  m2FocusSource?: InputMaybe<Scalars['String']['input']>;
  m2TipTiltEnable?: InputMaybe<Scalars['Boolean']['input']>;
  m2TipTiltFocusLink?: InputMaybe<Scalars['Boolean']['input']>;
  m2TipTiltSource?: InputMaybe<Scalars['String']['input']>;
  mountOffload?: InputMaybe<Scalars['Boolean']['input']>;
  pk: Scalars['Int']['input'];
  probeTracking?: InputMaybe<Scalars['String']['input']>;
};

export type MutationUpdateMechanismArgs = {
  agAcPickoffPark?: InputMaybe<StatusType>;
  agAoFoldPark?: InputMaybe<StatusType>;
  agParkAll?: InputMaybe<StatusType>;
  agScienceFoldPark?: InputMaybe<StatusType>;
  aowfs?: InputMaybe<StatusType>;
  aowfsPark?: InputMaybe<StatusType>;
  crcs?: InputMaybe<StatusType>;
  crcsPark?: InputMaybe<StatusType>;
  crcsUnwrap?: InputMaybe<StatusType>;
  dome?: InputMaybe<StatusType>;
  domeMode?: InputMaybe<Scalars['String']['input']>;
  domePark?: InputMaybe<StatusType>;
  eVGate?: InputMaybe<StatusType>;
  eVGateClose?: InputMaybe<StatusType>;
  eVGateValue?: InputMaybe<Scalars['Int']['input']>;
  mcs?: InputMaybe<StatusType>;
  mcsPark?: InputMaybe<StatusType>;
  mcsUnwrap?: InputMaybe<StatusType>;
  odgw?: InputMaybe<StatusType>;
  odgwPark?: InputMaybe<StatusType>;
  oiwfs?: InputMaybe<StatusType>;
  oiwfsPark?: InputMaybe<StatusType>;
  pk: Scalars['Int']['input'];
  pwfs1?: InputMaybe<StatusType>;
  pwfs1Park?: InputMaybe<StatusType>;
  pwfs1Unwrap?: InputMaybe<StatusType>;
  pwfs2?: InputMaybe<StatusType>;
  pwfs2Park?: InputMaybe<StatusType>;
  pwfs2Unwrap?: InputMaybe<StatusType>;
  scs?: InputMaybe<StatusType>;
  shutterAperture?: InputMaybe<Scalars['Int']['input']>;
  shutterMode?: InputMaybe<Scalars['String']['input']>;
  shutters?: InputMaybe<StatusType>;
  shuttersPark?: InputMaybe<StatusType>;
  wVGate?: InputMaybe<StatusType>;
  wVGateClose?: InputMaybe<StatusType>;
  wVGateValue?: InputMaybe<Scalars['Int']['input']>;
};

export type MutationUpdateRotatorArgs = {
  angle?: InputMaybe<Scalars['Float']['input']>;
  pk: Scalars['Int']['input'];
  tracking?: InputMaybe<TrackingType>;
};

export type MutationUpdateSlewFlagsArgs = {
  autoparkAowfs?: InputMaybe<Scalars['Boolean']['input']>;
  autoparkGems?: InputMaybe<Scalars['Boolean']['input']>;
  autoparkOiwfs?: InputMaybe<Scalars['Boolean']['input']>;
  autoparkPwfs1?: InputMaybe<Scalars['Boolean']['input']>;
  autoparkPwfs2?: InputMaybe<Scalars['Boolean']['input']>;
  pk: Scalars['Int']['input'];
  resetPointing?: InputMaybe<Scalars['Boolean']['input']>;
  shortcircuitMountFilter?: InputMaybe<Scalars['Boolean']['input']>;
  shortcircuitTargetFilter?: InputMaybe<Scalars['Boolean']['input']>;
  stopGuide?: InputMaybe<Scalars['Boolean']['input']>;
  zeroChopThrow?: InputMaybe<Scalars['Boolean']['input']>;
  zeroGuideOffset?: InputMaybe<Scalars['Boolean']['input']>;
  zeroInstrumentOffset?: InputMaybe<Scalars['Boolean']['input']>;
  zeroMountDiffTrack?: InputMaybe<Scalars['Boolean']['input']>;
  zeroMountOffset?: InputMaybe<Scalars['Boolean']['input']>;
  zeroSourceDiffTrack?: InputMaybe<Scalars['Boolean']['input']>;
  zeroSourceOffset?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MutationUpdateTargetArgs = {
  coord1?: InputMaybe<Scalars['Float']['input']>;
  coord2?: InputMaybe<Scalars['Float']['input']>;
  epoch?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  pk: Scalars['Int']['input'];
  type?: InputMaybe<TargetType>;
};

export type Query = {
  __typename?: 'Query';
  altairGuideLoop?: Maybe<AltairGuideLoop>;
  altairInstrument?: Maybe<AltairInstrument>;
  configuration?: Maybe<Configuration>;
  distinctInstruments?: Maybe<Array<Maybe<Instrument>>>;
  distinctPorts?: Maybe<Array<Maybe<Instrument>>>;
  gemsGuideLoop?: Maybe<GemsGuideLoop>;
  gemsInstrument?: Maybe<GemsInstrument>;
  guideLoop?: Maybe<GuideLoop>;
  instrument?: Maybe<Instrument>;
  instruments?: Maybe<Array<Maybe<Instrument>>>;
  mechanism?: Maybe<Mechanism>;
  rotator?: Maybe<Rotator>;
  slewFlags?: Maybe<SlewFlags>;
  target?: Maybe<Target>;
  targets?: Maybe<Array<Maybe<Target>>>;
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type QueryConfigurationArgs = {
  pk?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryDistinctPortsArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type QueryInstrumentArgs = {
  extraParams?: InputMaybe<Scalars['JSON']['input']>;
  issPort?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  wfs?: InputMaybe<WfsType>;
};

export type QueryInstrumentsArgs = {
  extraParams?: InputMaybe<Scalars['JSON']['input']>;
  issPort?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  wfs?: InputMaybe<WfsType>;
};

export type QueryTargetArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  pk?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryTargetsArgs = {
  type?: InputMaybe<TargetType>;
};

export type QueryUserArgs = {
  pk: Scalars['Int']['input'];
};

export type Ra = {
  __typename?: 'RA';
  degrees?: Maybe<Scalars['Float']['output']>;
  hms?: Maybe<Scalars['String']['output']>;
};

export type Rotator = {
  __typename?: 'Rotator';
  angle?: Maybe<Scalars['Float']['output']>;
  pk?: Maybe<Scalars['Int']['output']>;
  tracking?: Maybe<TrackingType>;
};

export type SiteType = 'GN' | 'GS';

export type SlewFlags = {
  __typename?: 'SlewFlags';
  autoparkAowfs?: Maybe<Scalars['Boolean']['output']>;
  autoparkGems?: Maybe<Scalars['Boolean']['output']>;
  autoparkOiwfs?: Maybe<Scalars['Boolean']['output']>;
  autoparkPwfs1?: Maybe<Scalars['Boolean']['output']>;
  autoparkPwfs2?: Maybe<Scalars['Boolean']['output']>;
  pk?: Maybe<Scalars['Int']['output']>;
  resetPointing?: Maybe<Scalars['Boolean']['output']>;
  shortcircuitMountFilter?: Maybe<Scalars['Boolean']['output']>;
  shortcircuitTargetFilter?: Maybe<Scalars['Boolean']['output']>;
  stopGuide?: Maybe<Scalars['Boolean']['output']>;
  zeroChopThrow?: Maybe<Scalars['Boolean']['output']>;
  zeroGuideOffset?: Maybe<Scalars['Boolean']['output']>;
  zeroInstrumentOffset?: Maybe<Scalars['Boolean']['output']>;
  zeroMountDiffTrack?: Maybe<Scalars['Boolean']['output']>;
  zeroMountOffset?: Maybe<Scalars['Boolean']['output']>;
  zeroSourceDiffTrack?: Maybe<Scalars['Boolean']['output']>;
  zeroSourceOffset?: Maybe<Scalars['Boolean']['output']>;
};

export type StatusType = 'ACTIVE' | 'DONE' | 'ERROR' | 'PENDING';

export type Target = {
  __typename?: 'Target';
  az?: Maybe<Az>;
  createdAt?: Maybe<Scalars['String']['output']>;
  dec?: Maybe<Dec>;
  el?: Maybe<El>;
  epoch?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  pk?: Maybe<Scalars['Int']['output']>;
  ra?: Maybe<Ra>;
  type?: Maybe<TargetType>;
};

export type TargetInput = {
  coord1?: InputMaybe<Scalars['Float']['input']>;
  coord2?: InputMaybe<Scalars['Float']['input']>;
  epoch?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type TargetType = 'BLINDOFFSET' | 'FIXED' | 'OIWFS' | 'PWFS1' | 'PWFS2' | 'SCIENCE';

export type TrackingType = 'FIXED' | 'TRACKING';

export type User = {
  __typename?: 'User';
  name?: Maybe<Scalars['String']['output']>;
  pk?: Maybe<Scalars['Int']['output']>;
};

export type WfsType = 'NONE' | 'OIWFS' | 'PWFS1' | 'PWFS2';

export type GetAllInfoQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllInfoQuery = {
  __typename?: 'Query';
  configuration?: {
    __typename?: 'Configuration';
    pk?: number | null;
    site?: SiteType | null;
    selectedTarget?: number | null;
    selectedOiTarget?: number | null;
    selectedP1Target?: number | null;
    selectedP2Target?: number | null;
    oiGuidingType?: GuidingType | null;
    p1GuidingType?: GuidingType | null;
    p2GuidingType?: GuidingType | null;
    obsTitle?: string | null;
    obsSubtitle?: string | null;
    obsId?: string | null;
    obsInstrument?: string | null;
  } | null;
  rotator?: {
    __typename?: 'Rotator';
    pk?: number | null;
    angle?: number | null;
    tracking?: TrackingType | null;
  } | null;
  slewFlags?: {
    __typename?: 'SlewFlags';
    pk?: number | null;
    zeroChopThrow?: boolean | null;
    zeroSourceOffset?: boolean | null;
    zeroSourceDiffTrack?: boolean | null;
    zeroMountOffset?: boolean | null;
    zeroMountDiffTrack?: boolean | null;
    shortcircuitTargetFilter?: boolean | null;
    shortcircuitMountFilter?: boolean | null;
    resetPointing?: boolean | null;
    stopGuide?: boolean | null;
    zeroGuideOffset?: boolean | null;
    zeroInstrumentOffset?: boolean | null;
    autoparkPwfs1?: boolean | null;
    autoparkPwfs2?: boolean | null;
    autoparkOiwfs?: boolean | null;
    autoparkGems?: boolean | null;
    autoparkAowfs?: boolean | null;
  } | null;
  targets?: Array<{
    __typename?: 'Target';
    pk?: number | null;
    id?: string | null;
    name?: string | null;
    epoch?: string | null;
    type?: TargetType | null;
    createdAt?: string | null;
    ra?: { __typename?: 'RA'; degrees?: number | null; hms?: string | null } | null;
    dec?: { __typename?: 'Dec'; degrees?: number | null; dms?: string | null } | null;
    az?: { __typename?: 'Az'; degrees?: number | null; dms?: string | null } | null;
    el?: { __typename?: 'El'; degrees?: number | null; dms?: string | null } | null;
  } | null> | null;
};

export type GetAltairGuideLoopQueryVariables = Exact<{ [key: string]: never }>;

export type GetAltairGuideLoopQuery = {
  __typename?: 'Query';
  altairGuideLoop?: {
    __typename?: 'AltairGuideLoop';
    pk?: number | null;
    aoEnabled?: boolean | null;
    oiBlend?: boolean | null;
    focus?: boolean | null;
    p1Ttf?: boolean | null;
    strap?: boolean | null;
    oiTtf?: boolean | null;
    ttgs?: boolean | null;
    sfo?: boolean | null;
  } | null;
};

export type UpdateAltairGuideLoopMutationVariables = Exact<{
  pk: Scalars['Int']['input'];
  aoEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  oiBlend?: InputMaybe<Scalars['Boolean']['input']>;
  focus?: InputMaybe<Scalars['Boolean']['input']>;
  p1Ttf?: InputMaybe<Scalars['Boolean']['input']>;
  strap?: InputMaybe<Scalars['Boolean']['input']>;
  oiTtf?: InputMaybe<Scalars['Boolean']['input']>;
  ttgs?: InputMaybe<Scalars['Boolean']['input']>;
  sfo?: InputMaybe<Scalars['Boolean']['input']>;
}>;

export type UpdateAltairGuideLoopMutation = {
  __typename?: 'Mutation';
  updateAltairGuideLoop?: {
    __typename?: 'AltairGuideLoop';
    pk?: number | null;
    aoEnabled?: boolean | null;
    oiBlend?: boolean | null;
    focus?: boolean | null;
    p1Ttf?: boolean | null;
    strap?: boolean | null;
    oiTtf?: boolean | null;
    ttgs?: boolean | null;
    sfo?: boolean | null;
  } | null;
};

export type GetAltairInstrumentQueryVariables = Exact<{ [key: string]: never }>;

export type GetAltairInstrumentQuery = {
  __typename?: 'Query';
  altairInstrument?: {
    __typename?: 'AltairInstrument';
    pk?: number | null;
    beamsplitter?: string | null;
    startMagnitude?: number | null;
    seeing?: number | null;
    windSpeed?: number | null;
    forceMode?: boolean | null;
    ndFilter?: boolean | null;
    fieldLens?: boolean | null;
    deployAdc?: boolean | null;
    adjustAdc?: boolean | null;
    lgs?: boolean | null;
  } | null;
};

export type UpdateAltairInstrumentMutationVariables = Exact<{
  pk: Scalars['Int']['input'];
  beamsplitter?: InputMaybe<Scalars['String']['input']>;
  startMagnitude?: InputMaybe<Scalars['Float']['input']>;
  seeing?: InputMaybe<Scalars['Float']['input']>;
  windSpeed?: InputMaybe<Scalars['Float']['input']>;
  forceMode?: InputMaybe<Scalars['Boolean']['input']>;
  ndFilter?: InputMaybe<Scalars['Boolean']['input']>;
  fieldLens?: InputMaybe<Scalars['Boolean']['input']>;
  deployAdc?: InputMaybe<Scalars['Boolean']['input']>;
  adjustAdc?: InputMaybe<Scalars['Boolean']['input']>;
  lgs?: InputMaybe<Scalars['Boolean']['input']>;
}>;

export type UpdateAltairInstrumentMutation = {
  __typename?: 'Mutation';
  updateAltairInstrument?: {
    __typename?: 'AltairInstrument';
    pk?: number | null;
    beamsplitter?: string | null;
    startMagnitude?: number | null;
    seeing?: number | null;
    windSpeed?: number | null;
    forceMode?: boolean | null;
    ndFilter?: boolean | null;
    fieldLens?: boolean | null;
    deployAdc?: boolean | null;
    adjustAdc?: boolean | null;
    lgs?: boolean | null;
  } | null;
};

export type GetConfigurationQueryVariables = Exact<{ [key: string]: never }>;

export type GetConfigurationQuery = {
  __typename?: 'Query';
  configuration?: {
    __typename?: 'Configuration';
    pk?: number | null;
    site?: SiteType | null;
    selectedTarget?: number | null;
    selectedOiTarget?: number | null;
    selectedP1Target?: number | null;
    selectedP2Target?: number | null;
    oiGuidingType?: GuidingType | null;
    p1GuidingType?: GuidingType | null;
    p2GuidingType?: GuidingType | null;
    obsTitle?: string | null;
    obsId?: string | null;
    obsInstrument?: string | null;
    obsSubtitle?: string | null;
  } | null;
};

export type UpdateConfigurationMutationVariables = Exact<{
  pk: Scalars['Int']['input'];
  site?: InputMaybe<SiteType>;
  selectedTarget?: InputMaybe<Scalars['Int']['input']>;
  selectedOiTarget?: InputMaybe<Scalars['Int']['input']>;
  selectedP1Target?: InputMaybe<Scalars['Int']['input']>;
  selectedP2Target?: InputMaybe<Scalars['Int']['input']>;
  oiGuidingType?: InputMaybe<GuidingType>;
  p1GuidingType?: InputMaybe<GuidingType>;
  p2GuidingType?: InputMaybe<GuidingType>;
  obsTitle?: InputMaybe<Scalars['String']['input']>;
  obsId?: InputMaybe<Scalars['String']['input']>;
  obsInstrument?: InputMaybe<Scalars['String']['input']>;
  obsSubtitle?: InputMaybe<Scalars['String']['input']>;
}>;

export type UpdateConfigurationMutation = {
  __typename?: 'Mutation';
  updateConfiguration?: {
    __typename?: 'Configuration';
    pk?: number | null;
    site?: SiteType | null;
    selectedTarget?: number | null;
    selectedOiTarget?: number | null;
    selectedP1Target?: number | null;
    selectedP2Target?: number | null;
    oiGuidingType?: GuidingType | null;
    p1GuidingType?: GuidingType | null;
    p2GuidingType?: GuidingType | null;
    obsTitle?: string | null;
    obsId?: string | null;
    obsInstrument?: string | null;
    obsSubtitle?: string | null;
  } | null;
};

export type GetGemsGuideLoopQueryVariables = Exact<{ [key: string]: never }>;

export type GetGemsGuideLoopQuery = {
  __typename?: 'Query';
  gemsGuideLoop?: {
    __typename?: 'GemsGuideLoop';
    pk?: number | null;
    aoEnabled?: boolean | null;
    focus?: boolean | null;
    rotation?: boolean | null;
    tipTilt?: boolean | null;
    anisopl?: boolean | null;
    flexure?: boolean | null;
  } | null;
};

export type UpdateGemsGuideLoopMutationVariables = Exact<{
  pk: Scalars['Int']['input'];
  aoEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  focus?: InputMaybe<Scalars['Boolean']['input']>;
  rotation?: InputMaybe<Scalars['Boolean']['input']>;
  tipTilt?: InputMaybe<Scalars['Boolean']['input']>;
  anisopl?: InputMaybe<Scalars['Boolean']['input']>;
  flexure?: InputMaybe<Scalars['Boolean']['input']>;
}>;

export type UpdateGemsGuideLoopMutation = {
  __typename?: 'Mutation';
  updateGemsGuideLoop?: {
    __typename?: 'GemsGuideLoop';
    pk?: number | null;
    aoEnabled?: boolean | null;
    focus?: boolean | null;
    rotation?: boolean | null;
    tipTilt?: boolean | null;
    anisopl?: boolean | null;
    flexure?: boolean | null;
  } | null;
};

export type GetGemsInstrumentQueryVariables = Exact<{ [key: string]: never }>;

export type GetGemsInstrumentQuery = {
  __typename?: 'Query';
  gemsInstrument?: {
    __typename?: 'GemsInstrument';
    pk?: number | null;
    beamsplitter?: string | null;
    adc?: boolean | null;
    astrometricMode?: string | null;
  } | null;
};

export type UpdateGemsInstrumentMutationVariables = Exact<{
  pk: Scalars['Int']['input'];
  beamsplitter?: InputMaybe<Scalars['String']['input']>;
  adc?: InputMaybe<Scalars['Boolean']['input']>;
  astrometricMode?: InputMaybe<Scalars['String']['input']>;
}>;

export type UpdateGemsInstrumentMutation = {
  __typename?: 'Mutation';
  updateGemsInstrument?: {
    __typename?: 'GemsInstrument';
    pk?: number | null;
    beamsplitter?: string | null;
    adc?: boolean | null;
    astrometricMode?: string | null;
  } | null;
};

export type GetGuideLoopQueryVariables = Exact<{ [key: string]: never }>;

export type GetGuideLoopQuery = {
  __typename?: 'Query';
  guideLoop?: {
    __typename?: 'GuideLoop';
    pk?: number | null;
    m2TipTiltEnable?: boolean | null;
    m2TipTiltSource?: string | null;
    m2FocusEnable?: boolean | null;
    m2FocusSource?: string | null;
    m2TipTiltFocusLink?: boolean | null;
    m2ComaEnable?: boolean | null;
    m1CorrectionsEnable?: boolean | null;
    m2ComaM1CorrectionsSource?: string | null;
    mountOffload?: boolean | null;
    daytimeMode?: boolean | null;
    probeTracking?: string | null;
    lightPath?: string | null;
  } | null;
};

export type UpdateGuideLoopMutationVariables = Exact<{
  pk: Scalars['Int']['input'];
  m2TipTiltEnable?: InputMaybe<Scalars['Boolean']['input']>;
  m2TipTiltSource?: InputMaybe<Scalars['String']['input']>;
  m2FocusEnable?: InputMaybe<Scalars['Boolean']['input']>;
  m2FocusSource?: InputMaybe<Scalars['String']['input']>;
  m2TipTiltFocusLink?: InputMaybe<Scalars['Boolean']['input']>;
  m2ComaEnable?: InputMaybe<Scalars['Boolean']['input']>;
  m1CorrectionsEnable?: InputMaybe<Scalars['Boolean']['input']>;
  m2ComaM1CorrectionsSource?: InputMaybe<Scalars['String']['input']>;
  mountOffload?: InputMaybe<Scalars['Boolean']['input']>;
  daytimeMode?: InputMaybe<Scalars['Boolean']['input']>;
  probeTracking?: InputMaybe<Scalars['String']['input']>;
  lightPath?: InputMaybe<Scalars['String']['input']>;
}>;

export type UpdateGuideLoopMutation = {
  __typename?: 'Mutation';
  updateGuideLoop?: {
    __typename?: 'GuideLoop';
    pk?: number | null;
    m2TipTiltEnable?: boolean | null;
    m2TipTiltSource?: string | null;
    m2FocusEnable?: boolean | null;
    m2FocusSource?: string | null;
    m2TipTiltFocusLink?: boolean | null;
    m2ComaEnable?: boolean | null;
    m1CorrectionsEnable?: boolean | null;
    m2ComaM1CorrectionsSource?: string | null;
    mountOffload?: boolean | null;
    daytimeMode?: boolean | null;
    probeTracking?: string | null;
    lightPath?: string | null;
  } | null;
};

export type GetDistinctInstrumentsQueryVariables = Exact<{ [key: string]: never }>;

export type GetDistinctInstrumentsQuery = {
  __typename?: 'Query';
  distinctInstruments?: Array<{ __typename?: 'Instrument'; name?: string | null } | null> | null;
};

export type GetDistinctPortsQueryVariables = Exact<{
  name: Scalars['String']['input'];
}>;

export type GetDistinctPortsQuery = {
  __typename?: 'Query';
  distinctPorts?: Array<{ __typename?: 'Instrument'; issPort?: number | null } | null> | null;
};

export type GetInstrumentsQueryVariables = Exact<{
  name: Scalars['String']['input'];
  issPort: Scalars['Int']['input'];
}>;

export type GetInstrumentsQuery = {
  __typename?: 'Query';
  instruments?: Array<{
    __typename?: 'Instrument';
    pk?: number | null;
    name?: string | null;
    iaa?: number | null;
    issPort?: number | null;
    focusOffset?: number | null;
    wfs?: WfsType | null;
    originX?: number | null;
    originY?: number | null;
    ao?: boolean | null;
    extraParams?: any | null;
  } | null> | null;
};

export type GetInstrumentQueryVariables = Exact<{
  name: Scalars['String']['input'];
  issPort: Scalars['Int']['input'];
  wfs?: InputMaybe<WfsType>;
}>;

export type GetInstrumentQuery = {
  __typename?: 'Query';
  instrument?: {
    __typename?: 'Instrument';
    pk?: number | null;
    name?: string | null;
    iaa?: number | null;
    issPort?: number | null;
    focusOffset?: number | null;
    wfs?: WfsType | null;
    originX?: number | null;
    originY?: number | null;
    ao?: boolean | null;
    extraParams?: any | null;
  } | null;
};

export type GetMechanismQueryVariables = Exact<{ [key: string]: never }>;

export type GetMechanismQuery = {
  __typename?: 'Query';
  mechanism?: {
    __typename?: 'Mechanism';
    pk?: number | null;
    mcs?: StatusType | null;
    mcsPark?: StatusType | null;
    mcsUnwrap?: StatusType | null;
    scs?: StatusType | null;
    crcs?: StatusType | null;
    crcsPark?: StatusType | null;
    crcsUnwrap?: StatusType | null;
    pwfs1?: StatusType | null;
    pwfs1Park?: StatusType | null;
    pwfs1Unwrap?: StatusType | null;
    pwfs2?: StatusType | null;
    pwfs2Park?: StatusType | null;
    pwfs2Unwrap?: StatusType | null;
    oiwfs?: StatusType | null;
    oiwfsPark?: StatusType | null;
    odgw?: StatusType | null;
    odgwPark?: StatusType | null;
    aowfs?: StatusType | null;
    aowfsPark?: StatusType | null;
    dome?: StatusType | null;
    domePark?: StatusType | null;
    domeMode?: string | null;
    shutters?: StatusType | null;
    shuttersPark?: StatusType | null;
    shutterMode?: string | null;
    shutterAperture?: number | null;
    wVGate?: StatusType | null;
    wVGateClose?: StatusType | null;
    wVGateValue?: number | null;
    eVGate?: StatusType | null;
    eVGateClose?: StatusType | null;
    eVGateValue?: number | null;
    agScienceFoldPark?: StatusType | null;
    agAoFoldPark?: StatusType | null;
    agAcPickoffPark?: StatusType | null;
    agParkAll?: StatusType | null;
  } | null;
};

export type UpdateMechanismMutationVariables = Exact<{
  pk: Scalars['Int']['input'];
  mcs?: InputMaybe<StatusType>;
  mcsPark?: InputMaybe<StatusType>;
  mcsUnwrap?: InputMaybe<StatusType>;
  scs?: InputMaybe<StatusType>;
  crcs?: InputMaybe<StatusType>;
  crcsPark?: InputMaybe<StatusType>;
  crcsUnwrap?: InputMaybe<StatusType>;
  pwfs1?: InputMaybe<StatusType>;
  pwfs1Park?: InputMaybe<StatusType>;
  pwfs1Unwrap?: InputMaybe<StatusType>;
  pwfs2?: InputMaybe<StatusType>;
  pwfs2Park?: InputMaybe<StatusType>;
  pwfs2Unwrap?: InputMaybe<StatusType>;
  oiwfs?: InputMaybe<StatusType>;
  oiwfsPark?: InputMaybe<StatusType>;
  odgw?: InputMaybe<StatusType>;
  odgwPark?: InputMaybe<StatusType>;
  aowfs?: InputMaybe<StatusType>;
  aowfsPark?: InputMaybe<StatusType>;
  dome?: InputMaybe<StatusType>;
  domePark?: InputMaybe<StatusType>;
  domeMode?: InputMaybe<Scalars['String']['input']>;
  shutters?: InputMaybe<StatusType>;
  shuttersPark?: InputMaybe<StatusType>;
  shutterMode?: InputMaybe<Scalars['String']['input']>;
  shutterAperture?: InputMaybe<Scalars['Int']['input']>;
  wVGate?: InputMaybe<StatusType>;
  wVGateClose?: InputMaybe<StatusType>;
  wVGateValue?: InputMaybe<Scalars['Int']['input']>;
  eVGate?: InputMaybe<StatusType>;
  eVGateClose?: InputMaybe<StatusType>;
  eVGateValue?: InputMaybe<Scalars['Int']['input']>;
  agScienceFoldPark?: InputMaybe<StatusType>;
  agAoFoldPark?: InputMaybe<StatusType>;
  agAcPickoffPark?: InputMaybe<StatusType>;
  agParkAll?: InputMaybe<StatusType>;
}>;

export type UpdateMechanismMutation = {
  __typename?: 'Mutation';
  updateMechanism?: {
    __typename?: 'Mechanism';
    pk?: number | null;
    mcs?: StatusType | null;
    mcsPark?: StatusType | null;
    mcsUnwrap?: StatusType | null;
    scs?: StatusType | null;
    crcs?: StatusType | null;
    crcsPark?: StatusType | null;
    crcsUnwrap?: StatusType | null;
    pwfs1?: StatusType | null;
    pwfs1Park?: StatusType | null;
    pwfs1Unwrap?: StatusType | null;
    pwfs2?: StatusType | null;
    pwfs2Park?: StatusType | null;
    pwfs2Unwrap?: StatusType | null;
    oiwfs?: StatusType | null;
    oiwfsPark?: StatusType | null;
    odgw?: StatusType | null;
    odgwPark?: StatusType | null;
    aowfs?: StatusType | null;
    aowfsPark?: StatusType | null;
    dome?: StatusType | null;
    domePark?: StatusType | null;
    domeMode?: string | null;
    shutters?: StatusType | null;
    shuttersPark?: StatusType | null;
    shutterMode?: string | null;
    shutterAperture?: number | null;
    wVGate?: StatusType | null;
    wVGateClose?: StatusType | null;
    wVGateValue?: number | null;
    eVGate?: StatusType | null;
    eVGateClose?: StatusType | null;
    eVGateValue?: number | null;
    agScienceFoldPark?: StatusType | null;
    agAoFoldPark?: StatusType | null;
    agAcPickoffPark?: StatusType | null;
    agParkAll?: StatusType | null;
  } | null;
};

export type GetRotatorQueryVariables = Exact<{ [key: string]: never }>;

export type GetRotatorQuery = {
  __typename?: 'Query';
  rotator?: {
    __typename?: 'Rotator';
    pk?: number | null;
    angle?: number | null;
    tracking?: TrackingType | null;
  } | null;
};

export type UpdateRotatorMutationVariables = Exact<{
  pk: Scalars['Int']['input'];
  angle?: InputMaybe<Scalars['Float']['input']>;
  tracking?: InputMaybe<TrackingType>;
}>;

export type UpdateRotatorMutation = {
  __typename?: 'Mutation';
  updateRotator?: {
    __typename?: 'Rotator';
    pk?: number | null;
    angle?: number | null;
    tracking?: TrackingType | null;
  } | null;
};

export type GetSlewFlagsQueryVariables = Exact<{ [key: string]: never }>;

export type GetSlewFlagsQuery = {
  __typename?: 'Query';
  slewFlags?: {
    __typename?: 'SlewFlags';
    pk?: number | null;
    zeroChopThrow?: boolean | null;
    zeroSourceOffset?: boolean | null;
    zeroSourceDiffTrack?: boolean | null;
    zeroMountOffset?: boolean | null;
    zeroMountDiffTrack?: boolean | null;
    shortcircuitTargetFilter?: boolean | null;
    shortcircuitMountFilter?: boolean | null;
    resetPointing?: boolean | null;
    stopGuide?: boolean | null;
    zeroGuideOffset?: boolean | null;
    zeroInstrumentOffset?: boolean | null;
    autoparkPwfs1?: boolean | null;
    autoparkPwfs2?: boolean | null;
    autoparkOiwfs?: boolean | null;
    autoparkGems?: boolean | null;
    autoparkAowfs?: boolean | null;
  } | null;
};

export type UpdateSlewFlagsMutationVariables = Exact<{
  pk: Scalars['Int']['input'];
  zeroChopThrow?: InputMaybe<Scalars['Boolean']['input']>;
  zeroSourceOffset?: InputMaybe<Scalars['Boolean']['input']>;
  zeroSourceDiffTrack?: InputMaybe<Scalars['Boolean']['input']>;
  zeroMountOffset?: InputMaybe<Scalars['Boolean']['input']>;
  zeroMountDiffTrack?: InputMaybe<Scalars['Boolean']['input']>;
  shortcircuitTargetFilter?: InputMaybe<Scalars['Boolean']['input']>;
  shortcircuitMountFilter?: InputMaybe<Scalars['Boolean']['input']>;
  resetPointing?: InputMaybe<Scalars['Boolean']['input']>;
  stopGuide?: InputMaybe<Scalars['Boolean']['input']>;
  zeroGuideOffset?: InputMaybe<Scalars['Boolean']['input']>;
  zeroInstrumentOffset?: InputMaybe<Scalars['Boolean']['input']>;
  autoparkPwfs1?: InputMaybe<Scalars['Boolean']['input']>;
  autoparkPwfs2?: InputMaybe<Scalars['Boolean']['input']>;
  autoparkOiwfs?: InputMaybe<Scalars['Boolean']['input']>;
  autoparkGems?: InputMaybe<Scalars['Boolean']['input']>;
  autoparkAowfs?: InputMaybe<Scalars['Boolean']['input']>;
}>;

export type UpdateSlewFlagsMutation = {
  __typename?: 'Mutation';
  updateSlewFlags?: {
    __typename?: 'SlewFlags';
    pk?: number | null;
    zeroChopThrow?: boolean | null;
    zeroSourceOffset?: boolean | null;
    zeroSourceDiffTrack?: boolean | null;
    zeroMountOffset?: boolean | null;
    zeroMountDiffTrack?: boolean | null;
    shortcircuitTargetFilter?: boolean | null;
    shortcircuitMountFilter?: boolean | null;
    resetPointing?: boolean | null;
    stopGuide?: boolean | null;
    zeroGuideOffset?: boolean | null;
    zeroInstrumentOffset?: boolean | null;
    autoparkPwfs1?: boolean | null;
    autoparkPwfs2?: boolean | null;
    autoparkOiwfs?: boolean | null;
    autoparkGems?: boolean | null;
    autoparkAowfs?: boolean | null;
  } | null;
};

export type GetTargetsQueryVariables = Exact<{
  type?: InputMaybe<TargetType>;
}>;

export type GetTargetsQuery = {
  __typename?: 'Query';
  targets?: Array<{
    __typename?: 'Target';
    pk?: number | null;
    id?: string | null;
    name?: string | null;
    epoch?: string | null;
    type?: TargetType | null;
    createdAt?: string | null;
    ra?: { __typename?: 'RA'; degrees?: number | null; hms?: string | null } | null;
    dec?: { __typename?: 'Dec'; degrees?: number | null; dms?: string | null } | null;
    az?: { __typename?: 'Az'; degrees?: number | null; dms?: string | null } | null;
    el?: { __typename?: 'El'; degrees?: number | null; dms?: string | null } | null;
  } | null> | null;
};

export type UpdateTargetMutationVariables = Exact<{
  pk: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  coord1?: InputMaybe<Scalars['Float']['input']>;
  coord2?: InputMaybe<Scalars['Float']['input']>;
  epoch?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<TargetType>;
}>;

export type UpdateTargetMutation = {
  __typename?: 'Mutation';
  updateTarget?: {
    __typename?: 'Target';
    pk?: number | null;
    id?: string | null;
    name?: string | null;
    epoch?: string | null;
    type?: TargetType | null;
    createdAt?: string | null;
    ra?: { __typename?: 'RA'; degrees?: number | null; hms?: string | null } | null;
    dec?: { __typename?: 'Dec'; degrees?: number | null; dms?: string | null } | null;
    az?: { __typename?: 'Az'; degrees?: number | null; dms?: string | null } | null;
    el?: { __typename?: 'El'; degrees?: number | null; dms?: string | null } | null;
  } | null;
};

export type CreateTargetMutationVariables = Exact<{
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  ra?: InputMaybe<Scalars['Float']['input']>;
  az?: InputMaybe<Scalars['Float']['input']>;
  dec?: InputMaybe<Scalars['Float']['input']>;
  el?: InputMaybe<Scalars['Float']['input']>;
  epoch?: InputMaybe<Scalars['String']['input']>;
  type: TargetType;
}>;

export type CreateTargetMutation = {
  __typename?: 'Mutation';
  createTarget?: {
    __typename?: 'Target';
    pk?: number | null;
    id?: string | null;
    name?: string | null;
    epoch?: string | null;
    type?: TargetType | null;
    createdAt?: string | null;
    ra?: { __typename?: 'RA'; degrees?: number | null; hms?: string | null } | null;
    dec?: { __typename?: 'Dec'; degrees?: number | null; dms?: string | null } | null;
    az?: { __typename?: 'Az'; degrees?: number | null; dms?: string | null } | null;
    el?: { __typename?: 'El'; degrees?: number | null; dms?: string | null } | null;
  } | null;
};

export type RemoveAndCreateBaseTargetsMutationVariables = Exact<{
  targets?: InputMaybe<Array<InputMaybe<TargetInput>> | InputMaybe<TargetInput>>;
}>;

export type RemoveAndCreateBaseTargetsMutation = {
  __typename?: 'Mutation';
  removeAndCreateBaseTargets?: Array<{
    __typename?: 'Target';
    pk?: number | null;
    id?: string | null;
    name?: string | null;
    epoch?: string | null;
    type?: TargetType | null;
    createdAt?: string | null;
    ra?: { __typename?: 'RA'; degrees?: number | null; hms?: string | null } | null;
    dec?: { __typename?: 'Dec'; degrees?: number | null; dms?: string | null } | null;
    az?: { __typename?: 'Az'; degrees?: number | null; dms?: string | null } | null;
    el?: { __typename?: 'El'; degrees?: number | null; dms?: string | null } | null;
  } | null> | null;
};

export type RemoveAndCreateWfsTargetsMutationVariables = Exact<{
  wfs?: InputMaybe<TargetType>;
  targets?: InputMaybe<Array<InputMaybe<TargetInput>> | InputMaybe<TargetInput>>;
}>;

export type RemoveAndCreateWfsTargetsMutation = {
  __typename?: 'Mutation';
  removeAndCreateWfsTargets?: Array<{
    __typename?: 'Target';
    pk?: number | null;
    id?: string | null;
    name?: string | null;
    epoch?: string | null;
    type?: TargetType | null;
    createdAt?: string | null;
    ra?: { __typename?: 'RA'; degrees?: number | null; hms?: string | null } | null;
    dec?: { __typename?: 'Dec'; degrees?: number | null; dms?: string | null } | null;
    az?: { __typename?: 'Az'; degrees?: number | null; dms?: string | null } | null;
    el?: { __typename?: 'El'; degrees?: number | null; dms?: string | null } | null;
  } | null> | null;
};

export const GetAllInfoDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getAllInfo' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'configuration' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'pk' } },
                { kind: 'Field', name: { kind: 'Name', value: 'site' } },
                { kind: 'Field', name: { kind: 'Name', value: 'selectedTarget' } },
                { kind: 'Field', name: { kind: 'Name', value: 'selectedOiTarget' } },
                { kind: 'Field', name: { kind: 'Name', value: 'selectedP1Target' } },
                { kind: 'Field', name: { kind: 'Name', value: 'selectedP2Target' } },
                { kind: 'Field', name: { kind: 'Name', value: 'oiGuidingType' } },
                { kind: 'Field', name: { kind: 'Name', value: 'p1GuidingType' } },
                { kind: 'Field', name: { kind: 'Name', value: 'p2GuidingType' } },
                { kind: 'Field', name: { kind: 'Name', value: 'obsTitle' } },
                { kind: 'Field', name: { kind: 'Name', value: 'obsSubtitle' } },
                { kind: 'Field', name: { kind: 'Name', value: 'obsId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'obsInstrument' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'rotator' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'pk' } },
                { kind: 'Field', name: { kind: 'Name', value: 'angle' } },
                { kind: 'Field', name: { kind: 'Name', value: 'tracking' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'slewFlags' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'pk' } },
                { kind: 'Field', name: { kind: 'Name', value: 'zeroChopThrow' } },
                { kind: 'Field', name: { kind: 'Name', value: 'zeroSourceOffset' } },
                { kind: 'Field', name: { kind: 'Name', value: 'zeroSourceDiffTrack' } },
                { kind: 'Field', name: { kind: 'Name', value: 'zeroMountOffset' } },
                { kind: 'Field', name: { kind: 'Name', value: 'zeroMountDiffTrack' } },
                { kind: 'Field', name: { kind: 'Name', value: 'shortcircuitTargetFilter' } },
                { kind: 'Field', name: { kind: 'Name', value: 'shortcircuitMountFilter' } },
                { kind: 'Field', name: { kind: 'Name', value: 'resetPointing' } },
                { kind: 'Field', name: { kind: 'Name', value: 'stopGuide' } },
                { kind: 'Field', name: { kind: 'Name', value: 'zeroGuideOffset' } },
                { kind: 'Field', name: { kind: 'Name', value: 'zeroInstrumentOffset' } },
                { kind: 'Field', name: { kind: 'Name', value: 'autoparkPwfs1' } },
                { kind: 'Field', name: { kind: 'Name', value: 'autoparkPwfs2' } },
                { kind: 'Field', name: { kind: 'Name', value: 'autoparkOiwfs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'autoparkGems' } },
                { kind: 'Field', name: { kind: 'Name', value: 'autoparkAowfs' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'targets' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'pk' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'ra' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'degrees' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'hms' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'dec' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'degrees' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'dms' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'az' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'degrees' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'dms' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'el' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'degrees' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'dms' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'epoch' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetAllInfoQuery, GetAllInfoQueryVariables>;
export const GetAltairGuideLoopDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getAltairGuideLoop' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'altairGuideLoop' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'pk' } },
                { kind: 'Field', name: { kind: 'Name', value: 'aoEnabled' } },
                { kind: 'Field', name: { kind: 'Name', value: 'oiBlend' } },
                { kind: 'Field', name: { kind: 'Name', value: 'focus' } },
                { kind: 'Field', name: { kind: 'Name', value: 'p1Ttf' } },
                { kind: 'Field', name: { kind: 'Name', value: 'strap' } },
                { kind: 'Field', name: { kind: 'Name', value: 'oiTtf' } },
                { kind: 'Field', name: { kind: 'Name', value: 'ttgs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'sfo' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetAltairGuideLoopQuery, GetAltairGuideLoopQueryVariables>;
export const UpdateAltairGuideLoopDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateAltairGuideLoop' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'pk' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'aoEnabled' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'oiBlend' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'focus' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'p1Ttf' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'strap' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'oiTtf' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'ttgs' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'sfo' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateAltairGuideLoop' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pk' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'pk' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'aoEnabled' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'aoEnabled' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'oiBlend' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'oiBlend' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'focus' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'focus' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'p1Ttf' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'p1Ttf' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'strap' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'strap' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'oiTtf' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'oiTtf' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'ttgs' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'ttgs' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'sfo' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'sfo' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'pk' } },
                { kind: 'Field', name: { kind: 'Name', value: 'aoEnabled' } },
                { kind: 'Field', name: { kind: 'Name', value: 'oiBlend' } },
                { kind: 'Field', name: { kind: 'Name', value: 'focus' } },
                { kind: 'Field', name: { kind: 'Name', value: 'p1Ttf' } },
                { kind: 'Field', name: { kind: 'Name', value: 'strap' } },
                { kind: 'Field', name: { kind: 'Name', value: 'oiTtf' } },
                { kind: 'Field', name: { kind: 'Name', value: 'ttgs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'sfo' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateAltairGuideLoopMutation, UpdateAltairGuideLoopMutationVariables>;
export const GetAltairInstrumentDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getAltairInstrument' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'altairInstrument' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'pk' } },
                { kind: 'Field', name: { kind: 'Name', value: 'beamsplitter' } },
                { kind: 'Field', name: { kind: 'Name', value: 'startMagnitude' } },
                { kind: 'Field', name: { kind: 'Name', value: 'seeing' } },
                { kind: 'Field', name: { kind: 'Name', value: 'windSpeed' } },
                { kind: 'Field', name: { kind: 'Name', value: 'forceMode' } },
                { kind: 'Field', name: { kind: 'Name', value: 'ndFilter' } },
                { kind: 'Field', name: { kind: 'Name', value: 'fieldLens' } },
                { kind: 'Field', name: { kind: 'Name', value: 'deployAdc' } },
                { kind: 'Field', name: { kind: 'Name', value: 'adjustAdc' } },
                { kind: 'Field', name: { kind: 'Name', value: 'lgs' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetAltairInstrumentQuery, GetAltairInstrumentQueryVariables>;
export const UpdateAltairInstrumentDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateAltairInstrument' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'pk' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'beamsplitter' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'startMagnitude' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'seeing' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'windSpeed' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'forceMode' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'ndFilter' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'fieldLens' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'deployAdc' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'adjustAdc' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'lgs' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateAltairInstrument' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pk' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'pk' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'beamsplitter' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'beamsplitter' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'startMagnitude' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'startMagnitude' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'seeing' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'seeing' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'windSpeed' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'windSpeed' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'forceMode' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'forceMode' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'ndFilter' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'ndFilter' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'fieldLens' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'fieldLens' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'deployAdc' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'deployAdc' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'adjustAdc' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'adjustAdc' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'lgs' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'lgs' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'pk' } },
                { kind: 'Field', name: { kind: 'Name', value: 'beamsplitter' } },
                { kind: 'Field', name: { kind: 'Name', value: 'startMagnitude' } },
                { kind: 'Field', name: { kind: 'Name', value: 'seeing' } },
                { kind: 'Field', name: { kind: 'Name', value: 'windSpeed' } },
                { kind: 'Field', name: { kind: 'Name', value: 'forceMode' } },
                { kind: 'Field', name: { kind: 'Name', value: 'ndFilter' } },
                { kind: 'Field', name: { kind: 'Name', value: 'fieldLens' } },
                { kind: 'Field', name: { kind: 'Name', value: 'deployAdc' } },
                { kind: 'Field', name: { kind: 'Name', value: 'adjustAdc' } },
                { kind: 'Field', name: { kind: 'Name', value: 'lgs' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateAltairInstrumentMutation, UpdateAltairInstrumentMutationVariables>;
export const GetConfigurationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getConfiguration' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'configuration' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'pk' } },
                { kind: 'Field', name: { kind: 'Name', value: 'site' } },
                { kind: 'Field', name: { kind: 'Name', value: 'selectedTarget' } },
                { kind: 'Field', name: { kind: 'Name', value: 'selectedOiTarget' } },
                { kind: 'Field', name: { kind: 'Name', value: 'selectedP1Target' } },
                { kind: 'Field', name: { kind: 'Name', value: 'selectedP2Target' } },
                { kind: 'Field', name: { kind: 'Name', value: 'oiGuidingType' } },
                { kind: 'Field', name: { kind: 'Name', value: 'p1GuidingType' } },
                { kind: 'Field', name: { kind: 'Name', value: 'p2GuidingType' } },
                { kind: 'Field', name: { kind: 'Name', value: 'obsTitle' } },
                { kind: 'Field', name: { kind: 'Name', value: 'obsId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'obsInstrument' } },
                { kind: 'Field', name: { kind: 'Name', value: 'obsSubtitle' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetConfigurationQuery, GetConfigurationQueryVariables>;
export const UpdateConfigurationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateConfiguration' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'pk' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'site' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'SiteType' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'selectedTarget' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'selectedOiTarget' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'selectedP1Target' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'selectedP2Target' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'oiGuidingType' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'GuidingType' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'p1GuidingType' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'GuidingType' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'p2GuidingType' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'GuidingType' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'obsTitle' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'obsId' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'obsInstrument' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'obsSubtitle' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateConfiguration' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pk' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'pk' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'site' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'site' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'selectedTarget' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'selectedTarget' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'selectedOiTarget' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'selectedOiTarget' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'selectedP1Target' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'selectedP1Target' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'selectedP2Target' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'selectedP2Target' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'oiGuidingType' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'oiGuidingType' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'p1GuidingType' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'p1GuidingType' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'p2GuidingType' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'p2GuidingType' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'obsTitle' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'obsTitle' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'obsId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'obsId' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'obsInstrument' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'obsInstrument' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'obsSubtitle' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'obsSubtitle' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'pk' } },
                { kind: 'Field', name: { kind: 'Name', value: 'site' } },
                { kind: 'Field', name: { kind: 'Name', value: 'selectedTarget' } },
                { kind: 'Field', name: { kind: 'Name', value: 'selectedOiTarget' } },
                { kind: 'Field', name: { kind: 'Name', value: 'selectedP1Target' } },
                { kind: 'Field', name: { kind: 'Name', value: 'selectedP2Target' } },
                { kind: 'Field', name: { kind: 'Name', value: 'oiGuidingType' } },
                { kind: 'Field', name: { kind: 'Name', value: 'p1GuidingType' } },
                { kind: 'Field', name: { kind: 'Name', value: 'p2GuidingType' } },
                { kind: 'Field', name: { kind: 'Name', value: 'obsTitle' } },
                { kind: 'Field', name: { kind: 'Name', value: 'obsId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'obsInstrument' } },
                { kind: 'Field', name: { kind: 'Name', value: 'obsSubtitle' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateConfigurationMutation, UpdateConfigurationMutationVariables>;
export const GetGemsGuideLoopDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getGemsGuideLoop' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'gemsGuideLoop' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'pk' } },
                { kind: 'Field', name: { kind: 'Name', value: 'aoEnabled' } },
                { kind: 'Field', name: { kind: 'Name', value: 'focus' } },
                { kind: 'Field', name: { kind: 'Name', value: 'rotation' } },
                { kind: 'Field', name: { kind: 'Name', value: 'tipTilt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'anisopl' } },
                { kind: 'Field', name: { kind: 'Name', value: 'flexure' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetGemsGuideLoopQuery, GetGemsGuideLoopQueryVariables>;
export const UpdateGemsGuideLoopDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateGemsGuideLoop' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'pk' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'aoEnabled' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'focus' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'rotation' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'tipTilt' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'anisopl' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'flexure' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateGemsGuideLoop' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pk' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'pk' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'aoEnabled' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'aoEnabled' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'focus' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'focus' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'rotation' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'rotation' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'tipTilt' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'tipTilt' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'anisopl' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'anisopl' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'flexure' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'flexure' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'pk' } },
                { kind: 'Field', name: { kind: 'Name', value: 'aoEnabled' } },
                { kind: 'Field', name: { kind: 'Name', value: 'focus' } },
                { kind: 'Field', name: { kind: 'Name', value: 'rotation' } },
                { kind: 'Field', name: { kind: 'Name', value: 'tipTilt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'anisopl' } },
                { kind: 'Field', name: { kind: 'Name', value: 'flexure' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateGemsGuideLoopMutation, UpdateGemsGuideLoopMutationVariables>;
export const GetGemsInstrumentDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getGemsInstrument' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'gemsInstrument' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'pk' } },
                { kind: 'Field', name: { kind: 'Name', value: 'beamsplitter' } },
                { kind: 'Field', name: { kind: 'Name', value: 'adc' } },
                { kind: 'Field', name: { kind: 'Name', value: 'astrometricMode' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetGemsInstrumentQuery, GetGemsInstrumentQueryVariables>;
export const UpdateGemsInstrumentDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateGemsInstrument' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'pk' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'beamsplitter' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'adc' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'astrometricMode' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateGemsInstrument' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pk' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'pk' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'beamsplitter' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'beamsplitter' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'adc' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'adc' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'astrometricMode' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'astrometricMode' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'pk' } },
                { kind: 'Field', name: { kind: 'Name', value: 'beamsplitter' } },
                { kind: 'Field', name: { kind: 'Name', value: 'adc' } },
                { kind: 'Field', name: { kind: 'Name', value: 'astrometricMode' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateGemsInstrumentMutation, UpdateGemsInstrumentMutationVariables>;
export const GetGuideLoopDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getGuideLoop' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'guideLoop' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'pk' } },
                { kind: 'Field', name: { kind: 'Name', value: 'm2TipTiltEnable' } },
                { kind: 'Field', name: { kind: 'Name', value: 'm2TipTiltSource' } },
                { kind: 'Field', name: { kind: 'Name', value: 'm2FocusEnable' } },
                { kind: 'Field', name: { kind: 'Name', value: 'm2FocusSource' } },
                { kind: 'Field', name: { kind: 'Name', value: 'm2TipTiltFocusLink' } },
                { kind: 'Field', name: { kind: 'Name', value: 'm2ComaEnable' } },
                { kind: 'Field', name: { kind: 'Name', value: 'm1CorrectionsEnable' } },
                { kind: 'Field', name: { kind: 'Name', value: 'm2ComaM1CorrectionsSource' } },
                { kind: 'Field', name: { kind: 'Name', value: 'mountOffload' } },
                { kind: 'Field', name: { kind: 'Name', value: 'daytimeMode' } },
                { kind: 'Field', name: { kind: 'Name', value: 'probeTracking' } },
                { kind: 'Field', name: { kind: 'Name', value: 'lightPath' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetGuideLoopQuery, GetGuideLoopQueryVariables>;
export const UpdateGuideLoopDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateGuideLoop' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'pk' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'm2TipTiltEnable' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'm2TipTiltSource' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'm2FocusEnable' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'm2FocusSource' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'm2TipTiltFocusLink' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'm2ComaEnable' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'm1CorrectionsEnable' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'm2ComaM1CorrectionsSource' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'mountOffload' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'daytimeMode' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'probeTracking' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'lightPath' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateGuideLoop' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pk' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'pk' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'm2TipTiltEnable' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'm2TipTiltEnable' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'm2TipTiltSource' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'm2TipTiltSource' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'm2FocusEnable' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'm2FocusEnable' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'm2FocusSource' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'm2FocusSource' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'm2TipTiltFocusLink' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'm2TipTiltFocusLink' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'm2ComaEnable' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'm2ComaEnable' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'm1CorrectionsEnable' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'm1CorrectionsEnable' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'm2ComaM1CorrectionsSource' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'm2ComaM1CorrectionsSource' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'mountOffload' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'mountOffload' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'daytimeMode' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'daytimeMode' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'probeTracking' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'probeTracking' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'lightPath' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'lightPath' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'pk' } },
                { kind: 'Field', name: { kind: 'Name', value: 'm2TipTiltEnable' } },
                { kind: 'Field', name: { kind: 'Name', value: 'm2TipTiltSource' } },
                { kind: 'Field', name: { kind: 'Name', value: 'm2FocusEnable' } },
                { kind: 'Field', name: { kind: 'Name', value: 'm2FocusSource' } },
                { kind: 'Field', name: { kind: 'Name', value: 'm2TipTiltFocusLink' } },
                { kind: 'Field', name: { kind: 'Name', value: 'm2ComaEnable' } },
                { kind: 'Field', name: { kind: 'Name', value: 'm1CorrectionsEnable' } },
                { kind: 'Field', name: { kind: 'Name', value: 'm2ComaM1CorrectionsSource' } },
                { kind: 'Field', name: { kind: 'Name', value: 'mountOffload' } },
                { kind: 'Field', name: { kind: 'Name', value: 'daytimeMode' } },
                { kind: 'Field', name: { kind: 'Name', value: 'probeTracking' } },
                { kind: 'Field', name: { kind: 'Name', value: 'lightPath' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateGuideLoopMutation, UpdateGuideLoopMutationVariables>;
export const GetDistinctInstrumentsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getDistinctInstruments' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'distinctInstruments' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetDistinctInstrumentsQuery, GetDistinctInstrumentsQueryVariables>;
export const GetDistinctPortsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getDistinctPorts' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'distinctPorts' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'name' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'issPort' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetDistinctPortsQuery, GetDistinctPortsQueryVariables>;
export const GetInstrumentsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getInstruments' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'issPort' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'instruments' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'name' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'issPort' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'issPort' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'pk' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'iaa' } },
                { kind: 'Field', name: { kind: 'Name', value: 'issPort' } },
                { kind: 'Field', name: { kind: 'Name', value: 'focusOffset' } },
                { kind: 'Field', name: { kind: 'Name', value: 'wfs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'originX' } },
                { kind: 'Field', name: { kind: 'Name', value: 'originY' } },
                { kind: 'Field', name: { kind: 'Name', value: 'ao' } },
                { kind: 'Field', name: { kind: 'Name', value: 'extraParams' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetInstrumentsQuery, GetInstrumentsQueryVariables>;
export const GetInstrumentDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getInstrument' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'issPort' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'wfs' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'WfsType' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'instrument' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'name' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'issPort' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'issPort' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'wfs' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'wfs' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'pk' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'iaa' } },
                { kind: 'Field', name: { kind: 'Name', value: 'issPort' } },
                { kind: 'Field', name: { kind: 'Name', value: 'focusOffset' } },
                { kind: 'Field', name: { kind: 'Name', value: 'wfs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'originX' } },
                { kind: 'Field', name: { kind: 'Name', value: 'originY' } },
                { kind: 'Field', name: { kind: 'Name', value: 'ao' } },
                { kind: 'Field', name: { kind: 'Name', value: 'extraParams' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetInstrumentQuery, GetInstrumentQueryVariables>;
export const GetMechanismDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getMechanism' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'mechanism' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'pk' } },
                { kind: 'Field', name: { kind: 'Name', value: 'mcs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'mcsPark' } },
                { kind: 'Field', name: { kind: 'Name', value: 'mcsUnwrap' } },
                { kind: 'Field', name: { kind: 'Name', value: 'scs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'crcs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'crcsPark' } },
                { kind: 'Field', name: { kind: 'Name', value: 'crcsUnwrap' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pwfs1' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pwfs1Park' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pwfs1Unwrap' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pwfs2' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pwfs2Park' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pwfs2Unwrap' } },
                { kind: 'Field', name: { kind: 'Name', value: 'oiwfs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'oiwfsPark' } },
                { kind: 'Field', name: { kind: 'Name', value: 'odgw' } },
                { kind: 'Field', name: { kind: 'Name', value: 'odgwPark' } },
                { kind: 'Field', name: { kind: 'Name', value: 'aowfs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'aowfsPark' } },
                { kind: 'Field', name: { kind: 'Name', value: 'dome' } },
                { kind: 'Field', name: { kind: 'Name', value: 'domePark' } },
                { kind: 'Field', name: { kind: 'Name', value: 'domeMode' } },
                { kind: 'Field', name: { kind: 'Name', value: 'shutters' } },
                { kind: 'Field', name: { kind: 'Name', value: 'shuttersPark' } },
                { kind: 'Field', name: { kind: 'Name', value: 'shutterMode' } },
                { kind: 'Field', name: { kind: 'Name', value: 'shutterAperture' } },
                { kind: 'Field', name: { kind: 'Name', value: 'wVGate' } },
                { kind: 'Field', name: { kind: 'Name', value: 'wVGateClose' } },
                { kind: 'Field', name: { kind: 'Name', value: 'wVGateValue' } },
                { kind: 'Field', name: { kind: 'Name', value: 'eVGate' } },
                { kind: 'Field', name: { kind: 'Name', value: 'eVGateClose' } },
                { kind: 'Field', name: { kind: 'Name', value: 'eVGateValue' } },
                { kind: 'Field', name: { kind: 'Name', value: 'agScienceFoldPark' } },
                { kind: 'Field', name: { kind: 'Name', value: 'agAoFoldPark' } },
                { kind: 'Field', name: { kind: 'Name', value: 'agAcPickoffPark' } },
                { kind: 'Field', name: { kind: 'Name', value: 'agParkAll' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetMechanismQuery, GetMechanismQueryVariables>;
export const UpdateMechanismDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateMechanism' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'pk' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'mcs' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'StatusType' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'mcsPark' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'StatusType' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'mcsUnwrap' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'StatusType' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'scs' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'StatusType' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'crcs' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'StatusType' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'crcsPark' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'StatusType' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'crcsUnwrap' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'StatusType' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'pwfs1' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'StatusType' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'pwfs1Park' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'StatusType' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'pwfs1Unwrap' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'StatusType' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'pwfs2' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'StatusType' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'pwfs2Park' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'StatusType' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'pwfs2Unwrap' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'StatusType' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'oiwfs' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'StatusType' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'oiwfsPark' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'StatusType' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'odgw' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'StatusType' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'odgwPark' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'StatusType' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'aowfs' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'StatusType' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'aowfsPark' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'StatusType' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'dome' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'StatusType' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'domePark' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'StatusType' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'domeMode' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'shutters' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'StatusType' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'shuttersPark' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'StatusType' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'shutterMode' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'shutterAperture' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'wVGate' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'StatusType' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'wVGateClose' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'StatusType' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'wVGateValue' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'eVGate' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'StatusType' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'eVGateClose' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'StatusType' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'eVGateValue' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'agScienceFoldPark' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'StatusType' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'agAoFoldPark' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'StatusType' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'agAcPickoffPark' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'StatusType' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'agParkAll' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'StatusType' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateMechanism' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pk' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'pk' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'mcs' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'mcs' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'mcsPark' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'mcsPark' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'mcsUnwrap' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'mcsUnwrap' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'scs' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'scs' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'crcs' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'crcs' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'crcsPark' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'crcsPark' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'crcsUnwrap' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'crcsUnwrap' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pwfs1' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'pwfs1' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pwfs1Park' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'pwfs1Park' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pwfs1Unwrap' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'pwfs1Unwrap' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pwfs2' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'pwfs2' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pwfs2Park' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'pwfs2Park' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pwfs2Unwrap' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'pwfs2Unwrap' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'oiwfs' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'oiwfs' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'oiwfsPark' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'oiwfsPark' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'odgw' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'odgw' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'odgwPark' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'odgwPark' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'aowfs' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'aowfs' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'aowfsPark' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'aowfsPark' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'dome' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'dome' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'domePark' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'domePark' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'domeMode' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'domeMode' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'shutters' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'shutters' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'shuttersPark' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'shuttersPark' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'shutterMode' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'shutterMode' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'shutterAperture' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'shutterAperture' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'wVGate' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'wVGate' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'wVGateClose' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'wVGateClose' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'wVGateValue' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'wVGateValue' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'eVGate' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'eVGate' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'eVGateClose' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'eVGateClose' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'eVGateValue' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'eVGateValue' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'agScienceFoldPark' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'agScienceFoldPark' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'agAoFoldPark' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'agAoFoldPark' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'agAcPickoffPark' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'agAcPickoffPark' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'agParkAll' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'agParkAll' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'pk' } },
                { kind: 'Field', name: { kind: 'Name', value: 'mcs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'mcsPark' } },
                { kind: 'Field', name: { kind: 'Name', value: 'mcsUnwrap' } },
                { kind: 'Field', name: { kind: 'Name', value: 'scs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'crcs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'crcsPark' } },
                { kind: 'Field', name: { kind: 'Name', value: 'crcsUnwrap' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pwfs1' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pwfs1Park' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pwfs1Unwrap' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pwfs2' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pwfs2Park' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pwfs2Unwrap' } },
                { kind: 'Field', name: { kind: 'Name', value: 'oiwfs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'oiwfsPark' } },
                { kind: 'Field', name: { kind: 'Name', value: 'odgw' } },
                { kind: 'Field', name: { kind: 'Name', value: 'odgwPark' } },
                { kind: 'Field', name: { kind: 'Name', value: 'aowfs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'aowfsPark' } },
                { kind: 'Field', name: { kind: 'Name', value: 'dome' } },
                { kind: 'Field', name: { kind: 'Name', value: 'domePark' } },
                { kind: 'Field', name: { kind: 'Name', value: 'domeMode' } },
                { kind: 'Field', name: { kind: 'Name', value: 'shutters' } },
                { kind: 'Field', name: { kind: 'Name', value: 'shuttersPark' } },
                { kind: 'Field', name: { kind: 'Name', value: 'shutterMode' } },
                { kind: 'Field', name: { kind: 'Name', value: 'shutterAperture' } },
                { kind: 'Field', name: { kind: 'Name', value: 'wVGate' } },
                { kind: 'Field', name: { kind: 'Name', value: 'wVGateClose' } },
                { kind: 'Field', name: { kind: 'Name', value: 'wVGateValue' } },
                { kind: 'Field', name: { kind: 'Name', value: 'eVGate' } },
                { kind: 'Field', name: { kind: 'Name', value: 'eVGateClose' } },
                { kind: 'Field', name: { kind: 'Name', value: 'eVGateValue' } },
                { kind: 'Field', name: { kind: 'Name', value: 'agScienceFoldPark' } },
                { kind: 'Field', name: { kind: 'Name', value: 'agAoFoldPark' } },
                { kind: 'Field', name: { kind: 'Name', value: 'agAcPickoffPark' } },
                { kind: 'Field', name: { kind: 'Name', value: 'agParkAll' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateMechanismMutation, UpdateMechanismMutationVariables>;
export const GetRotatorDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getRotator' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'rotator' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'pk' } },
                { kind: 'Field', name: { kind: 'Name', value: 'angle' } },
                { kind: 'Field', name: { kind: 'Name', value: 'tracking' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetRotatorQuery, GetRotatorQueryVariables>;
export const UpdateRotatorDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateRotator' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'pk' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'angle' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'tracking' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'TrackingType' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateRotator' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pk' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'pk' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'angle' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'angle' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'tracking' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'tracking' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'pk' } },
                { kind: 'Field', name: { kind: 'Name', value: 'angle' } },
                { kind: 'Field', name: { kind: 'Name', value: 'tracking' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateRotatorMutation, UpdateRotatorMutationVariables>;
export const GetSlewFlagsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getSlewFlags' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'slewFlags' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'pk' } },
                { kind: 'Field', name: { kind: 'Name', value: 'zeroChopThrow' } },
                { kind: 'Field', name: { kind: 'Name', value: 'zeroSourceOffset' } },
                { kind: 'Field', name: { kind: 'Name', value: 'zeroSourceDiffTrack' } },
                { kind: 'Field', name: { kind: 'Name', value: 'zeroMountOffset' } },
                { kind: 'Field', name: { kind: 'Name', value: 'zeroMountDiffTrack' } },
                { kind: 'Field', name: { kind: 'Name', value: 'shortcircuitTargetFilter' } },
                { kind: 'Field', name: { kind: 'Name', value: 'shortcircuitMountFilter' } },
                { kind: 'Field', name: { kind: 'Name', value: 'resetPointing' } },
                { kind: 'Field', name: { kind: 'Name', value: 'stopGuide' } },
                { kind: 'Field', name: { kind: 'Name', value: 'zeroGuideOffset' } },
                { kind: 'Field', name: { kind: 'Name', value: 'zeroInstrumentOffset' } },
                { kind: 'Field', name: { kind: 'Name', value: 'autoparkPwfs1' } },
                { kind: 'Field', name: { kind: 'Name', value: 'autoparkPwfs2' } },
                { kind: 'Field', name: { kind: 'Name', value: 'autoparkOiwfs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'autoparkGems' } },
                { kind: 'Field', name: { kind: 'Name', value: 'autoparkAowfs' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetSlewFlagsQuery, GetSlewFlagsQueryVariables>;
export const UpdateSlewFlagsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateSlewFlags' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'pk' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'zeroChopThrow' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'zeroSourceOffset' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'zeroSourceDiffTrack' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'zeroMountOffset' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'zeroMountDiffTrack' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'shortcircuitTargetFilter' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'shortcircuitMountFilter' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'resetPointing' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'stopGuide' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'zeroGuideOffset' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'zeroInstrumentOffset' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'autoparkPwfs1' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'autoparkPwfs2' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'autoparkOiwfs' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'autoparkGems' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'autoparkAowfs' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateSlewFlags' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pk' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'pk' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'zeroChopThrow' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'zeroChopThrow' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'zeroSourceOffset' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'zeroSourceOffset' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'zeroSourceDiffTrack' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'zeroSourceDiffTrack' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'zeroMountOffset' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'zeroMountOffset' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'zeroMountDiffTrack' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'zeroMountDiffTrack' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'shortcircuitTargetFilter' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'shortcircuitTargetFilter' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'shortcircuitMountFilter' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'shortcircuitMountFilter' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'resetPointing' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'resetPointing' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'stopGuide' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'stopGuide' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'zeroGuideOffset' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'zeroGuideOffset' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'zeroInstrumentOffset' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'zeroInstrumentOffset' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'autoparkPwfs1' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'autoparkPwfs1' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'autoparkPwfs2' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'autoparkPwfs2' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'autoparkOiwfs' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'autoparkOiwfs' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'autoparkGems' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'autoparkGems' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'autoparkAowfs' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'autoparkAowfs' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'pk' } },
                { kind: 'Field', name: { kind: 'Name', value: 'zeroChopThrow' } },
                { kind: 'Field', name: { kind: 'Name', value: 'zeroSourceOffset' } },
                { kind: 'Field', name: { kind: 'Name', value: 'zeroSourceDiffTrack' } },
                { kind: 'Field', name: { kind: 'Name', value: 'zeroMountOffset' } },
                { kind: 'Field', name: { kind: 'Name', value: 'zeroMountDiffTrack' } },
                { kind: 'Field', name: { kind: 'Name', value: 'shortcircuitTargetFilter' } },
                { kind: 'Field', name: { kind: 'Name', value: 'shortcircuitMountFilter' } },
                { kind: 'Field', name: { kind: 'Name', value: 'resetPointing' } },
                { kind: 'Field', name: { kind: 'Name', value: 'stopGuide' } },
                { kind: 'Field', name: { kind: 'Name', value: 'zeroGuideOffset' } },
                { kind: 'Field', name: { kind: 'Name', value: 'zeroInstrumentOffset' } },
                { kind: 'Field', name: { kind: 'Name', value: 'autoparkPwfs1' } },
                { kind: 'Field', name: { kind: 'Name', value: 'autoparkPwfs2' } },
                { kind: 'Field', name: { kind: 'Name', value: 'autoparkOiwfs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'autoparkGems' } },
                { kind: 'Field', name: { kind: 'Name', value: 'autoparkAowfs' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateSlewFlagsMutation, UpdateSlewFlagsMutationVariables>;
export const GetTargetsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getTargets' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'TargetType' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'targets' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'type' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'pk' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'ra' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'degrees' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'hms' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'dec' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'degrees' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'dms' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'az' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'degrees' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'dms' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'el' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'degrees' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'dms' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'epoch' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetTargetsQuery, GetTargetsQueryVariables>;
export const UpdateTargetDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateTarget' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'pk' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'coord1' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'coord2' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'epoch' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'TargetType' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateTarget' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pk' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'pk' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'name' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'coord1' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'coord1' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'coord2' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'coord2' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'epoch' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'epoch' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'type' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'pk' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'ra' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'degrees' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'hms' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'dec' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'degrees' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'dms' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'az' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'degrees' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'dms' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'el' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'degrees' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'dms' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'epoch' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateTargetMutation, UpdateTargetMutationVariables>;
export const CreateTargetDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createTarget' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'ra' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'az' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'dec' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'el' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'epoch' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'TargetType' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createTarget' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'name' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'ra' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'ra' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'az' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'az' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'dec' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'dec' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'el' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'el' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'epoch' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'epoch' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'type' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'pk' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'ra' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'degrees' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'hms' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'dec' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'degrees' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'dms' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'az' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'degrees' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'dms' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'el' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'degrees' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'dms' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'epoch' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateTargetMutation, CreateTargetMutationVariables>;
export const RemoveAndCreateBaseTargetsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'removeAndCreateBaseTargets' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'targets' } },
          type: { kind: 'ListType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'TargetInput' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'removeAndCreateBaseTargets' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'targets' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'targets' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'pk' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'ra' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'degrees' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'hms' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'dec' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'degrees' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'dms' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'az' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'degrees' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'dms' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'el' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'degrees' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'dms' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'epoch' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RemoveAndCreateBaseTargetsMutation, RemoveAndCreateBaseTargetsMutationVariables>;
export const RemoveAndCreateWfsTargetsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'removeAndCreateWfsTargets' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'wfs' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'TargetType' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'targets' } },
          type: { kind: 'ListType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'TargetInput' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'removeAndCreateWfsTargets' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'wfs' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'wfs' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'targets' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'targets' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'pk' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'ra' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'degrees' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'hms' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'dec' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'degrees' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'dms' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'az' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'degrees' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'dms' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'el' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'degrees' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'dms' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'epoch' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RemoveAndCreateWfsTargetsMutation, RemoveAndCreateWfsTargetsMutationVariables>;
