import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, RenderOptions } from '@testing-library/react';
import { Provider, WritableAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { PropsWithChildren, ReactElement } from 'react';
import { GET_ALL_INFO_QUERY } from './configs/AllConfiguration';

interface CreateOptions<T> {
  mocks?: MockedResponse[];
  initialValues?: InferAtomTuples<T>;
}

function HydrateAtoms<T extends AtomTuples>({
  initialValues,
  children,
}: PropsWithChildren<{ initialValues: InferAtomTuples<T> }>) {
  useHydrateAtoms(initialValues);
  return children;
}

/**
 * Render the given UI with the given atoms hydrated, and sets up ApolloProvider with the given mocks
 */
export function renderWithContext<T extends AtomTuples>(
  ui: ReactElement,
  createOptions: CreateOptions<T> = {},
  options?: RenderOptions,
) {
  return render(
    <Provider>
      <HydrateAtoms initialValues={createOptions.initialValues ?? ([] as InferAtomTuples<T>)}>
        <MockedProvider mocks={[...mocks, ...(createOptions.mocks ?? [])]} addTypename={false}>
          {ui}
        </MockedProvider>
      </HydrateAtoms>
    </Provider>,
    options,
  );
}

const mocks: MockedResponse[] = [
  {
    request: {
      query: GET_ALL_INFO_QUERY,
      variables: {},
    },
  },
];

// Some typescript magic here 🧙
// Basically it allows the `initialValues` array to be type-safe with its values
// Copied from an internal Jotai type
type AnyWritableAtom = WritableAtom<unknown, never[], unknown>;

type AtomTuples = (readonly [AnyWritableAtom, unknown])[];

type InferAtomTuples<T> = {
  [K in keyof T]: T[K] extends readonly [infer A, unknown]
    ? // eslint-disable-next-line @typescript-eslint/no-unused-vars
      A extends WritableAtom<unknown, infer Args, infer _Result>
      ? readonly [A, Args[0]]
      : T[K]
    : never;
};
