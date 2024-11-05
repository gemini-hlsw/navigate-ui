import { MockedResponse } from '@apollo/client/testing';
import { GET_GUIDE_ALARMS, UPDATE_GUIDE_ALARM } from '@gql/configs/GuideAlarm';
import { renderWithContext } from '@gql/render';
import { GUIDE_QUALITY_SUBSCRIPTION } from '@gql/server/GuideQuality';
import { Alarms, evaluateAlarm } from './Alarms';
import { guideAlarmAtom } from '@/components/atoms/alarm';
import { page, userEvent } from '@vitest/browser/context';

describe(Alarms.name, () => {
  let store: ReturnType<typeof renderWithContext>['store'];
  beforeEach(async () => {
    store = renderWithContext(<Alarms />, { mocks }).store;

    // Wait for the alarms to be loaded
    await expect.element(page.getByText('PWFS1')).toBeEnabled();
  });

  it('should render 3 alarms', async () => {
    await expect.element(page.getByText('PWFS1')).toBeInTheDocument();
    await expect.element(page.getByText('PWFS2')).toBeInTheDocument();
    await expect.element(page.getByText('OIWFS')).toBeInTheDocument();
  });

  it('calls updateAlarm when limit is changed', async () => {
    const limitInput = page.getByTestId('limit-PWFS1');

    await userEvent.fill(limitInput, '900');

    await expect.element(page.getByTestId('limit-PWFS1')).toHaveValue('900');
    expect(store.get(guideAlarmAtom)).true;
  });
});

describe(evaluateAlarm.name, () => {
  it('should be false if no alarm is set', () => {
    expect(evaluateAlarm(undefined, { centroidDetected: false, flux: 900 })).false;
  });

  it('should be false if no guide quality is set', () => {
    expect(evaluateAlarm({ enabled: true, limit: 900, wfs: 'OIWFS' }, undefined)).false;
  });

  it('should be false if the flux is above the limit', () => {
    expect(evaluateAlarm({ enabled: true, limit: 900, wfs: 'OIWFS' }, { centroidDetected: true, flux: 900 })).false;
  });

  it('should be true if no centroid is detected', () => {
    expect(evaluateAlarm({ enabled: true, limit: 900, wfs: 'OIWFS' }, { centroidDetected: false, flux: 900 })).true;
  });

  it('should be true if flux is below the limit', () => {
    expect(evaluateAlarm({ enabled: true, limit: 900, wfs: 'OIWFS' }, { centroidDetected: true, flux: 899 })).true;
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
