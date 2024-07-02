import type { CodegenConfig } from '@graphql-codegen/cli';

const odbToken = process.env.ODB_TOKEN;

if (!odbToken) {
  console.error('ODB_TOKEN is not defined');
  process.exit(1);
}

// Simple mapping of scalar types to their TypeScript representation
// Some of these might be wrong or incomplete, feel free to adjust as needed
const scalars = {
  AtomId: 'string',
  BigDecimal: 'number',
  CallForProposalsId: 'string',
  ChronicleId: 'string',
  DatasetFilename: 'string',
  DatasetId: 'string',
  DatasetReferenceLabel: 'string',
  Date: 'string',
  DateTime: 'string',
  DmsString: 'string',
  EmailAddress: 'string',
  EpochString: 'string',
  ExecutionEventId: 'string',
  Extinction: 'number',
  GroupId: 'string',
  HmsString: 'string',
  IntPercent: 'number',
  Long: 'number',
  NonEmptyString: 'string',
  NonNegBigDecimal: 'number',
  NonNegInt: 'number',
  NonNegLong: 'number',
  NonNegShort: 'number',
  ObsAttachmentId: 'string',
  ObservationId: 'string',
  ObservationReferenceLabel: 'string',
  PosBigDecimal: 'number',
  PosInt: 'number',
  PosLong: 'number',
  PosShort: 'number',
  ProgramId: 'number',
  ProgramReferenceLabel: 'string',
  ProposalReferenceLabel: 'string',
  Semester: 'string',
  SignalToNoise: 'number',
  StepId: 'string',
  TargetId: 'string',
  Timestamp: 'string',
  TransactionId: 'string',
  UserId: 'string',
  UserInvitationId: 'string',
  UserInvitationKey: 'string',
  VisitId: 'string',
};

const sharedConfig = {
  scalars,
  // Generate union types (`'foo' | 'bar'`) for enums instead of non-standard typescript enums
  enumsAsTypes: true,
};

const config: CodegenConfig = {
  generates: {
    './src/gql/odb/gen/': {
      schema: {
        'https://lucuma-postgres-odb-dev.herokuapp.com/odb': {
          headers: {
            Authorization: `Bearer ${odbToken}`,
          },
        },
      },
      config: sharedConfig,
      documents: './src/gql/odb/*.{ts,tsx}',
      preset: 'client',
    },
    './src/gql/server/gen/': {
      schema: 'http://localhost:9070/navigate/graphql',
      documents: './src/gql/server/*.{ts,tsx}',
      config: sharedConfig,
      preset: 'client',
    },
    './src/gql/configs/gen/': {
      schema: 'http://localhost:4000',
      documents: './src/gql/configs/*.{ts,tsx}',
      config: sharedConfig,
      preset: 'client',
    },
  },
  hooks: { afterAllFileWrite: ['prettier --write'] },
};

export default config;
