import { useMutation, useQuery } from '@apollo/client';
import { graphql } from './gen';
import { isBaseTarget, isOiTarget, isP1Target, isP2Target } from '@gql/util';
import { useMemo } from 'react';
import { Target } from './gen/graphql';

const GET_TARGETS = graphql(`
  query getTargets {
    targets {
      pk
      id
      name
      ra {
        degrees
        hms
      }
      dec {
        degrees
        dms
      }
      az {
        degrees
        dms
      }
      el {
        degrees
        dms
      }
      epoch
      type
      createdAt
    }
  }
`);

export function useTargets() {
  const result = useQuery(GET_TARGETS, {
    context: { clientName: 'navigateConfigs' },
  });

  const filteredData = useMemo(() => {
    const targets: Target[] = result.data?.targets ?? [];
    return {
      baseTargets: targets.filter(isBaseTarget),
      oiTargets: targets.filter(isOiTarget),
      p1Targets: targets.filter(isP1Target),
      p2Targets: targets.filter(isP2Target),
      allTargets: targets,
    };
  }, [result.data]);

  return { ...result, data: filteredData };
}

const UPDATE_TARGET = graphql(`
  mutation updateTarget(
    $pk: Int!
    $id: String
    $name: String
    $coord1: Float
    $coord2: Float
    $epoch: String
    $type: TargetType
  ) {
    updateTarget(pk: $pk, id: $id, name: $name, coord1: $coord1, coord2: $coord2, epoch: $epoch, type: $type) {
      pk
      id
      name
      ra {
        degrees
        hms
      }
      dec {
        degrees
        dms
      }
      az {
        degrees
        dms
      }
      el {
        degrees
        dms
      }
      epoch
      type
      createdAt
    }
  }
`);

export function useUpdateTarget() {
  const [mutationFunction] = useMutation(UPDATE_TARGET, {
    context: { clientName: 'navigateConfigs' },
  });

  return mutationFunction;
}

const CREATE_TARGET = graphql(`
  mutation createTarget(
    $id: String
    $name: String!
    $ra: Float
    $az: Float
    $dec: Float
    $el: Float
    $epoch: String
    $type: TargetType!
  ) {
    createTarget(id: $id, name: $name, ra: $ra, az: $az, dec: $dec, el: $el, epoch: $epoch, type: $type) {
      pk
      id
      name
      ra {
        degrees
        hms
      }
      dec {
        degrees
        dms
      }
      az {
        degrees
        dms
      }
      el {
        degrees
        dms
      }
      epoch
      type
      createdAt
    }
  }
`);

export function useCreateTarget() {
  const [mutationFunction] = useMutation(CREATE_TARGET, {
    context: { clientName: 'navigateConfigs' },
    refetchQueries: [GET_TARGETS],
  });

  return mutationFunction;
}

const REMOVE_AND_CREATE_BASE_TARGETS = graphql(`
  mutation removeAndCreateBaseTargets($targets: [TargetInput!]) {
    removeAndCreateBaseTargets(targets: $targets) {
      pk
      id
      name
      ra {
        degrees
        hms
      }
      dec {
        degrees
        dms
      }
      az {
        degrees
        dms
      }
      el {
        degrees
        dms
      }
      epoch
      type
      createdAt
    }
  }
`);

export function useRemoveAndCreateBaseTargets() {
  const [mutationFunction] = useMutation(REMOVE_AND_CREATE_BASE_TARGETS, {
    context: { clientName: 'navigateConfigs' },
    refetchQueries: [GET_TARGETS],
  });

  return mutationFunction;
}

const REMOVE_AND_CREATE_WFS_TARGETS = graphql(`
  mutation removeAndCreateWfsTargets($wfs: TargetType, $targets: [TargetInput!]) {
    removeAndCreateWfsTargets(wfs: $wfs, targets: $targets) {
      pk
      id
      name
      ra {
        degrees
        hms
      }
      dec {
        degrees
        dms
      }
      az {
        degrees
        dms
      }
      el {
        degrees
        dms
      }
      epoch
      type
      createdAt
    }
  }
`);

export function useRemoveAndCreateWfsTargets() {
  const [mutationFunction] = useMutation(REMOVE_AND_CREATE_WFS_TARGETS, {
    context: { clientName: 'navigateConfigs' },
    refetchQueries: [GET_TARGETS],
  });

  return mutationFunction;
}
