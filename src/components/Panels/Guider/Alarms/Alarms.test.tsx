import { MockedResponse } from '@apollo/client/testing';
import { GET_GUIDE_ALARMS, UPDATE_GUIDE_ALARM } from '@gql/configs/GuideAlarm';
import { renderWithContext } from '@gql/render';
import { GUIDE_QUALITY_SUBSCRIPTION } from '@gql/server/GuideQuality';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { Alarms } from './Alarms';

describe(Alarms.name, () => {
  beforeEach(async () => {
    renderWithContext(<Alarms />, { mocks });

    // Wait for the alarms to be loaded
    await waitFor(async () => !(await screen.findAllByLabelText<HTMLInputElement>('Limit'))[0].disabled);
  });

  it('should render 3 alarms', () => {
    expect(screen.queryByText('PWFS1')).not.toBeNull();
    expect(screen.queryByText('PWFS2')).not.toBeNull();
    expect(screen.queryByText('OIWFS')).not.toBeNull();
  });

  it('calls updatAlarm when limit is changed', async () => {
    const limitInput = screen.getAllByLabelText('Limit')[0];

    fireEvent.change(limitInput, { target: { value: '900' } });
    fireEvent.blur(limitInput);

    await waitFor(async () =>
      expect((await screen.findAllByLabelText<HTMLInputElement>('Limit'))[0].value).equals('900'),
    );
  });
});

const mocks: MockedResponse[] = [
  {
    request: {
      query: GET_GUIDE_ALARMS,
      variables: {},
    },
    result: {
      data: {
        guideAlarms: {
          OIWFS: {
            wfs: 'OIWFS',
            limit: 900,
            enabled: true,
          },
          PWFS1: {
            wfs: 'PWFS1',
            limit: 901,
            enabled: false,
          },
          PWFS2: {
            wfs: 'PWFS2',
            limit: 902,
            enabled: false,
          },
        },
      },
    },
  },
  {
    request: {
      query: GUIDE_QUALITY_SUBSCRIPTION,
      variables: {},
    },

    result: {
      data: {
        guidersQualityValues: {
          oiwfs: {
            flux: 901,
            centroidDetected: false,
          },
          pwfs1: {
            flux: 902,
            centroidDetected: false,
          },
          pwfs2: {
            flux: 903,
            centroidDetected: false,
          },
        },
      },
    },
  },
  {
    request: {
      query: UPDATE_GUIDE_ALARM,
      variables: { wfs: 'PWFS1', limit: 900 },
    },
    result: {
      data: {
        updateGuideAlarm: {
          wfs: 'PWFS1',
          limit: 900,
          enabled: true,
        },
      },
    },
  },
];
