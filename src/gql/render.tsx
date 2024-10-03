import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { createStore, Provider, WritableAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { PropsWithChildren, ReactElement } from 'react';
import { ComponentRenderOptions, render } from 'vitest-browser-react';
import { GET_SLEW_FLAGS } from './configs/SlewFlags';

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
  options?: ComponentRenderOptions,
) {
  const store = createStore();
  const renderResult = render(
    <Provider store={store}>
      <HydrateAtoms initialValues={createOptions.initialValues ?? ([] as InferAtomTuples<T>)}>
        <MockedProvider mocks={[...mocks, ...(createOptions.mocks ?? [])]} addTypename={false}>
          {ui}
        </MockedProvider>
      </HydrateAtoms>
    </Provider>,
    options,
  );

  return { ...renderResult, store };
}

const mocks: MockedResponse[] = [
  {
    request: {
      query: GET_SLEW_FLAGS,
      variables: {},
    },
    result: {
      data: {
        slewFlags: {
          pk: 1,
          zeroChopThrow: true,
          zeroSourceOffset: true,
          zeroSourceDiffTrack: true,
          zeroMountOffset: true,
          zeroMountDiffTrack: true,
          shortcircuitTargetFilter: false,
          shortcircuitMountFilter: true,
          resetPointing: true,
          stopGuide: true,
          zeroGuideOffset: false,
          zeroInstrumentOffset: true,
          autoparkPwfs1: false,
          autoparkPwfs2: true,
          autoparkOiwfs: false,
          autoparkGems: true,
          autoparkAowfs: false,
          __typename: 'SlewFlags',
        },
      },
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
