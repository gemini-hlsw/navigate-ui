import { useLazyQuery, useMutation } from '@apollo/client';
import { graphql } from './gen';

const GET_ROTATOR = graphql(`
  query getRotator {
    rotator {
      pk
      angle
      tracking
    }
  }
`);

export function useGetRotator() {
  const [queryFunction] = useLazyQuery(GET_ROTATOR, {
    context: { clientName: 'navigateConfigs' },
  });

  return queryFunction;
}

const UPDATE_ROTATOR = graphql(`
  mutation updateRotator($pk: Int!, $angle: Float, $tracking: TrackingType) {
    updateRotator(pk: $pk, angle: $angle, tracking: $tracking) {
      pk
      angle
      tracking
    }
  }
`);

export function useUpdateRotator() {
  const [mutationFunction] = useMutation(UPDATE_ROTATOR, {
    context: { clientName: 'navigateConfigs' },
  });

  return mutationFunction;
}
