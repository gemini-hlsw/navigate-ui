import { gql, useLazyQuery, useMutation } from '@apollo/client';

const GET_CONFIGURATION = gql`
  query getConfiguration {
    configuration {
      pk
      site
      selectedTarget
      selectedOiTarget
      selectedP1Target
      selectedP2Target
      oiGuidingType
      p1GuidingType
      p2GuidingType
      obsTitle
      obsId
      obsInstrument
      obsSubtitle
    }
  }
`;

export function useGetConfiguration() {
  const [queryFunction] = useLazyQuery(GET_CONFIGURATION, {
    context: { clientName: 'navigateConfigs' },
  });

  return queryFunction;
}

const UPDATE_CONFIGURATION = gql`
  mutation updateConfiguration(
    $pk: Int!
    $site: SiteType
    $selectedTarget: Int
    $selectedOiTarget: Int
    $selectedP1Target: Int
    $selectedP2Target: Int
    $oiGuidingType: GuidingType
    $p1GuidingType: GuidingType
    $p2GuidingType: GuidingType
    $obsTitle: String
    $obsId: String
    $obsInstrument: String
    $obsSubtitle: String
  ) {
    updateConfiguration(
      pk: $pk
      site: $site
      selectedTarget: $selectedTarget
      selectedOiTarget: $selectedOiTarget
      selectedP1Target: $selectedP1Target
      selectedP2Target: $selectedP2Target
      oiGuidingType: $oiGuidingType
      p1GuidingType: $p1GuidingType
      p2GuidingType: $p2GuidingType
      obsTitle: $obsTitle
      obsId: $obsId
      obsInstrument: $obsInstrument
      obsSubtitle: $obsSubtitle
    ) {
      pk
      site
      selectedTarget
      selectedOiTarget
      selectedP1Target
      selectedP2Target
      oiGuidingType
      p1GuidingType
      p2GuidingType
      obsTitle
      obsId
      obsInstrument
      obsSubtitle
    }
  }
`;

export function useUpdateConfiguration() {
  const [mutationFunction] = useMutation(UPDATE_CONFIGURATION, {
    context: { clientName: 'navigateConfigs' },
  });

  return mutationFunction;
}
