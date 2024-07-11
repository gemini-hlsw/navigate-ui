/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  '\n  mutation changeMountState($enable: Boolean!) {\n    mountFollow(enable: $enable) {\n      result\n      msg\n    }\n  }\n':
    types.ChangeMountStateDocument,
  '\n  mutation mountPark {\n    mountPark {\n      result\n      msg\n    }\n  }\n': types.MountParkDocument,
  '\n  mutation runSlew($slewOptions: SlewOptionsInput!, $config: TcsConfigInput!) {\n    slew(slewOptions: $slewOptions, config: $config) {\n      result\n    }\n  }\n':
    types.RunSlewDocument,
  '\n  mutation setOiwfsTarget(\n    $id: TargetId!\n    $name: NonEmptyString!\n    $ra: HmsString\n    $dec: DmsString\n    $epoch: EpochString\n    $wavelength: PosBigDecimal\n  ) {\n    oiwfsTarget(\n      target: {\n        id: $id\n        name: $name\n        sidereal: { ra: { hms: $ra }, dec: { dms: $dec }, epoch: $epoch }\n        wavelength: { nanometers: $wavelength }\n      }\n    ) {\n      result\n    }\n  }\n':
    types.SetOiwfsTargetDocument,
  '\n  subscription guidersQualityValues {\n    guidersQualityValues {\n      pwfs1 {\n        flux\n        centroidDetected\n      }\n      pwfs2 {\n        flux\n        centroidDetected\n      }\n      oiwfs {\n        flux\n        centroidDetected\n      }\n    }\n  }\n':
    types.GuidersQualityValuesDocument,
  '\n  subscription guideState {\n    guideState {\n      m2Inputs\n      m2Coma\n      m1Input\n      mountOffload\n    }\n  }\n':
    types.GuideStateDocument,
  '\n  mutation guideEnable($config: GuideConfigurationInput!) {\n    guideEnable(config: $config) {\n      result\n      msg\n    }\n  }\n':
    types.GuideEnableDocument,
  '\n  mutation guideDisable {\n    guideDisable {\n      result\n      msg\n    }\n  }\n': types.GuideDisableDocument,
  '\n  subscription logMessage {\n    logMessage {\n      timestamp\n      level\n      thread\n      message\n    }\n  }\n':
    types.LogMessageDocument,
  '\n  mutation oiwfsObserve($period: TimeSpanInput!) {\n    oiwfsObserve(period: $period) {\n      result\n      msg\n    }\n  }\n':
    types.OiwfsObserveDocument,
  '\n  mutation oiwfsStopObserve {\n    oiwfsStopObserve {\n      result\n      msg\n    }\n  }\n':
    types.OiwfsStopObserveDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation changeMountState($enable: Boolean!) {\n    mountFollow(enable: $enable) {\n      result\n      msg\n    }\n  }\n',
): (typeof documents)['\n  mutation changeMountState($enable: Boolean!) {\n    mountFollow(enable: $enable) {\n      result\n      msg\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation mountPark {\n    mountPark {\n      result\n      msg\n    }\n  }\n',
): (typeof documents)['\n  mutation mountPark {\n    mountPark {\n      result\n      msg\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation runSlew($slewOptions: SlewOptionsInput!, $config: TcsConfigInput!) {\n    slew(slewOptions: $slewOptions, config: $config) {\n      result\n    }\n  }\n',
): (typeof documents)['\n  mutation runSlew($slewOptions: SlewOptionsInput!, $config: TcsConfigInput!) {\n    slew(slewOptions: $slewOptions, config: $config) {\n      result\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation setOiwfsTarget(\n    $id: TargetId!\n    $name: NonEmptyString!\n    $ra: HmsString\n    $dec: DmsString\n    $epoch: EpochString\n    $wavelength: PosBigDecimal\n  ) {\n    oiwfsTarget(\n      target: {\n        id: $id\n        name: $name\n        sidereal: { ra: { hms: $ra }, dec: { dms: $dec }, epoch: $epoch }\n        wavelength: { nanometers: $wavelength }\n      }\n    ) {\n      result\n    }\n  }\n',
): (typeof documents)['\n  mutation setOiwfsTarget(\n    $id: TargetId!\n    $name: NonEmptyString!\n    $ra: HmsString\n    $dec: DmsString\n    $epoch: EpochString\n    $wavelength: PosBigDecimal\n  ) {\n    oiwfsTarget(\n      target: {\n        id: $id\n        name: $name\n        sidereal: { ra: { hms: $ra }, dec: { dms: $dec }, epoch: $epoch }\n        wavelength: { nanometers: $wavelength }\n      }\n    ) {\n      result\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  subscription guidersQualityValues {\n    guidersQualityValues {\n      pwfs1 {\n        flux\n        centroidDetected\n      }\n      pwfs2 {\n        flux\n        centroidDetected\n      }\n      oiwfs {\n        flux\n        centroidDetected\n      }\n    }\n  }\n',
): (typeof documents)['\n  subscription guidersQualityValues {\n    guidersQualityValues {\n      pwfs1 {\n        flux\n        centroidDetected\n      }\n      pwfs2 {\n        flux\n        centroidDetected\n      }\n      oiwfs {\n        flux\n        centroidDetected\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  subscription guideState {\n    guideState {\n      m2Inputs\n      m2Coma\n      m1Input\n      mountOffload\n    }\n  }\n',
): (typeof documents)['\n  subscription guideState {\n    guideState {\n      m2Inputs\n      m2Coma\n      m1Input\n      mountOffload\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation guideEnable($config: GuideConfigurationInput!) {\n    guideEnable(config: $config) {\n      result\n      msg\n    }\n  }\n',
): (typeof documents)['\n  mutation guideEnable($config: GuideConfigurationInput!) {\n    guideEnable(config: $config) {\n      result\n      msg\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation guideDisable {\n    guideDisable {\n      result\n      msg\n    }\n  }\n',
): (typeof documents)['\n  mutation guideDisable {\n    guideDisable {\n      result\n      msg\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  subscription logMessage {\n    logMessage {\n      timestamp\n      level\n      thread\n      message\n    }\n  }\n',
): (typeof documents)['\n  subscription logMessage {\n    logMessage {\n      timestamp\n      level\n      thread\n      message\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation oiwfsObserve($period: TimeSpanInput!) {\n    oiwfsObserve(period: $period) {\n      result\n      msg\n    }\n  }\n',
): (typeof documents)['\n  mutation oiwfsObserve($period: TimeSpanInput!) {\n    oiwfsObserve(period: $period) {\n      result\n      msg\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation oiwfsStopObserve {\n    oiwfsStopObserve {\n      result\n      msg\n    }\n  }\n',
): (typeof documents)['\n  mutation oiwfsStopObserve {\n    oiwfsStopObserve {\n      result\n      msg\n    }\n  }\n'];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
