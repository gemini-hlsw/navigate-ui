import { useLazyQuery, useMutation } from '@apollo/client';
import { graphql } from './gen';

const GET_GEMS_GUIDE_LOOP = graphql(`
  query getGemsGuideLoop {
    gemsGuideLoop {
      pk
      aoEnabled
      focus
      rotation
      tipTilt
      anisopl
      flexure
    }
  }
`);

export function useGetGemsGuideLoop() {
  const [queryFunction] = useLazyQuery(GET_GEMS_GUIDE_LOOP, {
    context: { clientName: 'navigateConfigs' },
  });

  return queryFunction;
}

const UPDATE_GEMS_GUIDE_LOOP = graphql(`
  mutation updateGemsGuideLoop(
    $pk: Int!
    $aoEnabled: Boolean
    $focus: Boolean
    $rotation: Boolean
    $tipTilt: Boolean
    $anisopl: Boolean
    $flexure: Boolean
  ) {
    updateGemsGuideLoop(
      pk: $pk
      aoEnabled: $aoEnabled
      focus: $focus
      rotation: $rotation
      tipTilt: $tipTilt
      anisopl: $anisopl
      flexure: $flexure
    ) {
      pk
      aoEnabled
      focus
      rotation
      tipTilt
      anisopl
      flexure
    }
  }
`);

export function useUpdateGemsGuideLoop() {
  const [mutationFunction] = useMutation(UPDATE_GEMS_GUIDE_LOOP, {
    context: { clientName: 'navigateConfigs' },
  });

  return mutationFunction;
}
