import { ConfigurationType, InstrumentType, RotatorType, SlewFlagsType, TargetType } from '@/types';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { AuthContext } from '@Contexts/Auth/AuthProvider';
import { VariablesContext } from '@Contexts/Variables/VariablesProvider';
import { render, RenderOptions } from '@testing-library/react';
import { ContextType, ReactElement } from 'react';
import { GET_ALL_INFO_QUERY } from './configs/AllConfiguration';

interface CreateOptions {
  mocks?: MockedResponse[];
  authContext?: Partial<ContextType<typeof AuthContext>>;
  context?: Partial<ContextType<typeof VariablesContext>>;
}

/**
 * Render the given element with the apps used context (VariablesContext and AuthContext)
 *
 *  Also sets up ApolloProvider with the given mocks
 */
export function renderWithContext(ui: ReactElement, createOptions: CreateOptions = {}, options?: RenderOptions) {
  const defaultContext: ContextType<typeof VariablesContext> = {
    theme: 'dark',
    toggleTheme: vi.fn(),
    odbVisible: true,
    setOdbVisible: vi.fn(),
    slewVisible: true,
    setSlewVisible: vi.fn(),
    targetEdit: { isVisible: true, target: {} as TargetType, targetIndex: 0 },
    setTargetEdit: vi.fn(),
    importInstrument: false,
    setImportInstrument: vi.fn(),
    configuration: {} as ConfigurationType,
    setConfiguration: vi.fn(),
    loadingGuideTarget: false,
    setLoadingGuideTarget: vi.fn(),
    slewFlags: {} as SlewFlagsType,
    setSlewFlags: vi.fn(),
    baseTargets: [],
    setBaseTargets: vi.fn(),
    oiTargets: [],
    setOiTargets: vi.fn(),
    p1Targets: [],
    setP1Targets: vi.fn(),
    p2Targets: [],
    setP2Targets: vi.fn(),
    instrument: {} as InstrumentType,
    setInstrument: vi.fn(),
    rotator: {} as RotatorType,
    setRotator: vi.fn(),
    odbToken: '',
  };

  const defaultAuthContext: ContextType<typeof AuthContext> = {
    user: undefined,
    signin: vi.fn(),
    signout: vi.fn(),
    isUserLoggedIn: false,
    canEdit: true,
  };

  return render(
    <MockedProvider mocks={[...mocks, ...(createOptions.mocks ?? [])]} addTypename={false}>
      <VariablesContext.Provider value={{ ...defaultContext, ...createOptions.context }}>
        <AuthContext.Provider value={{ ...defaultAuthContext, ...createOptions.authContext }}>
          {ui}
        </AuthContext.Provider>
      </VariablesContext.Provider>
    </MockedProvider>,
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
