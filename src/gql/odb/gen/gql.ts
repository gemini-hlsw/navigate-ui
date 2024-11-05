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
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  query getObservations {\n    observations {\n      matches {\n        id\n        existence\n        title\n        subtitle\n        instrument\n        execution {\n          state\n        }\n        program {\n          id\n          existence\n          name\n          proposal {\n            title\n          }\n          pi {\n            user {\n              orcidGivenName\n              orcidFamilyName\n            }\n          }\n          users {\n            user {\n              serviceName\n            }\n          }\n        }\n        targetEnvironment {\n          firstScienceTarget {\n            id\n            existence\n            name\n            sidereal {\n              epoch\n              ra {\n                hms\n                degrees\n              }\n              dec {\n                dms\n                degrees\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetObservationsDocument,
    "\n  query getGuideTargets($observationId: ObservationId!, $observationTime: Timestamp!) {\n    observation(observationId: $observationId) {\n      targetEnvironment {\n        guideEnvironments(observationTime: $observationTime) {\n          guideTargets {\n            probe\n            name\n            sidereal {\n              epoch\n              ra {\n                hms\n                degrees\n              }\n              dec {\n                dms\n                degrees\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetGuideTargetsDocument,
    "\n  query getGuideEnvironment($obsId: ObservationId!) {\n    observation(observationId: $obsId) {\n      targetEnvironment {\n        guideEnvironment {\n          posAngle {\n            hms\n            degrees\n          }\n        }\n      }\n    }\n  }\n": types.GetGuideEnvironmentDocument,
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
export function graphql(source: "\n  query getObservations {\n    observations {\n      matches {\n        id\n        existence\n        title\n        subtitle\n        instrument\n        execution {\n          state\n        }\n        program {\n          id\n          existence\n          name\n          proposal {\n            title\n          }\n          pi {\n            user {\n              orcidGivenName\n              orcidFamilyName\n            }\n          }\n          users {\n            user {\n              serviceName\n            }\n          }\n        }\n        targetEnvironment {\n          firstScienceTarget {\n            id\n            existence\n            name\n            sidereal {\n              epoch\n              ra {\n                hms\n                degrees\n              }\n              dec {\n                dms\n                degrees\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getObservations {\n    observations {\n      matches {\n        id\n        existence\n        title\n        subtitle\n        instrument\n        execution {\n          state\n        }\n        program {\n          id\n          existence\n          name\n          proposal {\n            title\n          }\n          pi {\n            user {\n              orcidGivenName\n              orcidFamilyName\n            }\n          }\n          users {\n            user {\n              serviceName\n            }\n          }\n        }\n        targetEnvironment {\n          firstScienceTarget {\n            id\n            existence\n            name\n            sidereal {\n              epoch\n              ra {\n                hms\n                degrees\n              }\n              dec {\n                dms\n                degrees\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getGuideTargets($observationId: ObservationId!, $observationTime: Timestamp!) {\n    observation(observationId: $observationId) {\n      targetEnvironment {\n        guideEnvironments(observationTime: $observationTime) {\n          guideTargets {\n            probe\n            name\n            sidereal {\n              epoch\n              ra {\n                hms\n                degrees\n              }\n              dec {\n                dms\n                degrees\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getGuideTargets($observationId: ObservationId!, $observationTime: Timestamp!) {\n    observation(observationId: $observationId) {\n      targetEnvironment {\n        guideEnvironments(observationTime: $observationTime) {\n          guideTargets {\n            probe\n            name\n            sidereal {\n              epoch\n              ra {\n                hms\n                degrees\n              }\n              dec {\n                dms\n                degrees\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getGuideEnvironment($obsId: ObservationId!) {\n    observation(observationId: $obsId) {\n      targetEnvironment {\n        guideEnvironment {\n          posAngle {\n            hms\n            degrees\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getGuideEnvironment($obsId: ObservationId!) {\n    observation(observationId: $obsId) {\n      targetEnvironment {\n        guideEnvironment {\n          posAngle {\n            hms\n            degrees\n          }\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;