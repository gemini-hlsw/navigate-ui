import { useLazyQuery } from '@apollo/client';
import { graphql } from './gen';

export const GET_ALL_INFO_QUERY = graphql(`
  query getAllInfo {
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
      obsSubtitle
      obsId
      obsInstrument
    }
    rotator {
      pk
      angle
      tracking
    }
    slewFlags {
      pk
      zeroChopThrow
      zeroSourceOffset
      zeroSourceDiffTrack
      zeroMountOffset
      zeroMountDiffTrack
      shortcircuitTargetFilter
      shortcircuitMountFilter
      resetPointing
      stopGuide
      zeroGuideOffset
      zeroInstrumentOffset
      autoparkPwfs1
      autoparkPwfs2
      autoparkOiwfs
      autoparkGems
      autoparkAowfs
    }
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

export function useGetAllInformation() {
  const [queryFunction] = useLazyQuery(GET_ALL_INFO_QUERY, {
    context: { clientName: 'navigateConfigs' },
  });

  return queryFunction;
}
