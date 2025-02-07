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
type Documents = {
    "\n  query getObservationsByState(\n    $states: [ObservationWorkflowState!]!\n    $instruments: [Instrument!]!\n    $semester: Semester!\n  ) {\n    observationsByWorkflowState(\n      states: $states\n      WHERE: { program: { reference: { instrument: { IN: $instruments }, semester: { EQ: $semester } } } }\n    ) {\n      id\n      existence\n      title\n      subtitle\n      instrument\n      program {\n        id\n        existence\n        name\n        pi {\n          user {\n            profile {\n              givenName\n              familyName\n            }\n          }\n        }\n      }\n      targetEnvironment {\n        firstScienceTarget {\n          id\n          existence\n          name\n          sidereal {\n            epoch\n            ra {\n              hms\n              degrees\n            }\n            dec {\n              dms\n              degrees\n            }\n          }\n        }\n      }\n    }\n  }\n": typeof types.GetObservationsByStateDocument,
    "\n  query getGuideEnvironment($obsId: ObservationId!) {\n    observation(observationId: $obsId) {\n      targetEnvironment {\n        guideEnvironment {\n          posAngle {\n            hms\n            degrees\n          }\n          guideTargets {\n            probe\n            name\n            sidereal {\n              epoch\n              ra {\n                hms\n                degrees\n              }\n              dec {\n                dms\n                degrees\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": typeof types.GetGuideEnvironmentDocument,
    "\n  query getCentralWavelength($obsId: ObservationId!) {\n    observation(observationId: $obsId) {\n      execution {\n        config {\n          gmosNorth {\n            acquisition {\n              nextAtom {\n                steps {\n                  instrumentConfig {\n                    centralWavelength {\n                      nanometers\n                    }\n                  }\n                }\n              }\n            }\n          }\n          gmosSouth {\n            acquisition {\n              nextAtom {\n                steps {\n                  instrumentConfig {\n                    centralWavelength {\n                      nanometers\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": typeof types.GetCentralWavelengthDocument,
};
const documents: Documents = {
    "\n  query getObservationsByState(\n    $states: [ObservationWorkflowState!]!\n    $instruments: [Instrument!]!\n    $semester: Semester!\n  ) {\n    observationsByWorkflowState(\n      states: $states\n      WHERE: { program: { reference: { instrument: { IN: $instruments }, semester: { EQ: $semester } } } }\n    ) {\n      id\n      existence\n      title\n      subtitle\n      instrument\n      program {\n        id\n        existence\n        name\n        pi {\n          user {\n            profile {\n              givenName\n              familyName\n            }\n          }\n        }\n      }\n      targetEnvironment {\n        firstScienceTarget {\n          id\n          existence\n          name\n          sidereal {\n            epoch\n            ra {\n              hms\n              degrees\n            }\n            dec {\n              dms\n              degrees\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetObservationsByStateDocument,
    "\n  query getGuideEnvironment($obsId: ObservationId!) {\n    observation(observationId: $obsId) {\n      targetEnvironment {\n        guideEnvironment {\n          posAngle {\n            hms\n            degrees\n          }\n          guideTargets {\n            probe\n            name\n            sidereal {\n              epoch\n              ra {\n                hms\n                degrees\n              }\n              dec {\n                dms\n                degrees\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetGuideEnvironmentDocument,
    "\n  query getCentralWavelength($obsId: ObservationId!) {\n    observation(observationId: $obsId) {\n      execution {\n        config {\n          gmosNorth {\n            acquisition {\n              nextAtom {\n                steps {\n                  instrumentConfig {\n                    centralWavelength {\n                      nanometers\n                    }\n                  }\n                }\n              }\n            }\n          }\n          gmosSouth {\n            acquisition {\n              nextAtom {\n                steps {\n                  instrumentConfig {\n                    centralWavelength {\n                      nanometers\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetCentralWavelengthDocument,
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
export function graphql(source: "\n  query getObservationsByState(\n    $states: [ObservationWorkflowState!]!\n    $instruments: [Instrument!]!\n    $semester: Semester!\n  ) {\n    observationsByWorkflowState(\n      states: $states\n      WHERE: { program: { reference: { instrument: { IN: $instruments }, semester: { EQ: $semester } } } }\n    ) {\n      id\n      existence\n      title\n      subtitle\n      instrument\n      program {\n        id\n        existence\n        name\n        pi {\n          user {\n            profile {\n              givenName\n              familyName\n            }\n          }\n        }\n      }\n      targetEnvironment {\n        firstScienceTarget {\n          id\n          existence\n          name\n          sidereal {\n            epoch\n            ra {\n              hms\n              degrees\n            }\n            dec {\n              dms\n              degrees\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getObservationsByState(\n    $states: [ObservationWorkflowState!]!\n    $instruments: [Instrument!]!\n    $semester: Semester!\n  ) {\n    observationsByWorkflowState(\n      states: $states\n      WHERE: { program: { reference: { instrument: { IN: $instruments }, semester: { EQ: $semester } } } }\n    ) {\n      id\n      existence\n      title\n      subtitle\n      instrument\n      program {\n        id\n        existence\n        name\n        pi {\n          user {\n            profile {\n              givenName\n              familyName\n            }\n          }\n        }\n      }\n      targetEnvironment {\n        firstScienceTarget {\n          id\n          existence\n          name\n          sidereal {\n            epoch\n            ra {\n              hms\n              degrees\n            }\n            dec {\n              dms\n              degrees\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getGuideEnvironment($obsId: ObservationId!) {\n    observation(observationId: $obsId) {\n      targetEnvironment {\n        guideEnvironment {\n          posAngle {\n            hms\n            degrees\n          }\n          guideTargets {\n            probe\n            name\n            sidereal {\n              epoch\n              ra {\n                hms\n                degrees\n              }\n              dec {\n                dms\n                degrees\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getGuideEnvironment($obsId: ObservationId!) {\n    observation(observationId: $obsId) {\n      targetEnvironment {\n        guideEnvironment {\n          posAngle {\n            hms\n            degrees\n          }\n          guideTargets {\n            probe\n            name\n            sidereal {\n              epoch\n              ra {\n                hms\n                degrees\n              }\n              dec {\n                dms\n                degrees\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getCentralWavelength($obsId: ObservationId!) {\n    observation(observationId: $obsId) {\n      execution {\n        config {\n          gmosNorth {\n            acquisition {\n              nextAtom {\n                steps {\n                  instrumentConfig {\n                    centralWavelength {\n                      nanometers\n                    }\n                  }\n                }\n              }\n            }\n          }\n          gmosSouth {\n            acquisition {\n              nextAtom {\n                steps {\n                  instrumentConfig {\n                    centralWavelength {\n                      nanometers\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getCentralWavelength($obsId: ObservationId!) {\n    observation(observationId: $obsId) {\n      execution {\n        config {\n          gmosNorth {\n            acquisition {\n              nextAtom {\n                steps {\n                  instrumentConfig {\n                    centralWavelength {\n                      nanometers\n                    }\n                  }\n                }\n              }\n            }\n          }\n          gmosSouth {\n            acquisition {\n              nextAtom {\n                steps {\n                  instrumentConfig {\n                    centralWavelength {\n                      nanometers\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;