import { TargetType } from '@/types';
import { OperationVariables, QueryHookOptions } from '@apollo/client';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';

/**
 * Options for useQuery hook.
 */
export type OptionsOf<T> =
  T extends TypedDocumentNode<infer TData, infer TVariables>
    ? TVariables extends OperationVariables
      ? Omit<QueryHookOptions<TData, TVariables>, 'context'>
      : never
    : never;

export function isBaseTarget(target: Pick<TargetType, 'type'>) {
  return ['SCIENCE', 'BLINDOFFSET', 'FIXED'].includes(target.type);
}
export function isOiTarget(target: Pick<TargetType, 'type'>) {
  return target.type === 'OIWFS';
}
export function isP1Target(target: Pick<TargetType, 'type'>) {
  return target.type === 'PWFS1';
}
export function isP2Target(target: Pick<TargetType, 'type'>) {
  return target.type === 'PWFS2';
}
