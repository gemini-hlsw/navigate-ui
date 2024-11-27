import type { GuideAlarm } from '@gql/configs/gen/graphql';
import type { GuideQuality } from '@gql/server/gen/graphql';
import type { Locator } from '@vitest/browser/context';
import { page, userEvent } from '@vitest/browser/context';
import type { ComponentProps } from 'react';
import type { MockedFunction } from 'vitest';
import type { RenderResult } from 'vitest-browser-react';
import { render } from 'vitest-browser-react';

import { Alarm } from './Alarm';

describe(Alarm.name, () => {
  let sut: RenderResult;
  let onUpdateAlarm: MockedFunction<ComponentProps<typeof Alarm>['onUpdateAlarm']>;

  const guideQuality: GuideQuality = { centroidDetected: true, flux: 1000 };
  const alarm: GuideAlarm = { wfs: 'PWFS1', enabled: true, limit: 900 };

  beforeEach(() => {
    onUpdateAlarm = vi.fn();
    sut = render(
      <Alarm wfs="PWFS1" guideQuality={guideQuality} alarm={alarm} disabled={false} onUpdateAlarm={onUpdateAlarm} />,
    );
  });

  it('should render', async () => {
    await expect.element(page.getByLabelText('Counts')).toHaveTextContent('1000');
    await expect.element(page.getByLabelText('Subaperture')).toHaveTextContent('OK');
  });

  it('should show NOK for no centroid', async () => {
    sut.rerender(
      <Alarm
        wfs="PWFS1"
        guideQuality={{ ...guideQuality, centroidDetected: false }}
        alarm={alarm}
        disabled={false}
        onUpdateAlarm={onUpdateAlarm}
      />,
    );
    await expect.element(page.getByLabelText('Subaperture')).toHaveTextContent('NOK');
  });

  it('should call onUpdateAlarm when enabled changes', async () => {
    const checkbox = sut.getByRole('checkbox');

    await switchEnabled(checkbox);
    expect(onUpdateAlarm).toHaveBeenCalledWith({ wfs: 'PWFS1', enabled: false });
  });

  it('should call onUpdateAlarm when limit changes', async () => {
    const inputNumber = page.getByLabelText('Limit');

    await setLimit(inputNumber, 100);
    expect(onUpdateAlarm).toHaveBeenCalledWith({ wfs: 'PWFS1', limit: 100 });
  });

  it('should not set has-alarm if flux is above limit', async () => {
    await expect.element(page.getByTestId('no-alarm')).toBeInTheDocument();
  });

  it('should set has-alarm if flux is below limit', async () => {
    sut.rerender(
      <Alarm
        wfs="PWFS1"
        guideQuality={{ ...guideQuality, flux: 799 }}
        alarm={alarm}
        disabled={false}
        onUpdateAlarm={onUpdateAlarm}
      />,
    );
    await expect.element(page.getByTestId('has-alarm')).toBeInTheDocument();
  });

  it('should set has-alarm if centroidDetected is false', async () => {
    sut.rerender(
      <Alarm
        wfs="PWFS1"
        guideQuality={{ ...guideQuality, centroidDetected: false }}
        alarm={alarm}
        disabled={false}
        onUpdateAlarm={onUpdateAlarm}
      />,
    );

    await expect.element(page.getByTestId('has-alarm')).toBeInTheDocument();
  });

  it('should not set has-alarm if disabled', async () => {
    sut.rerender(
      <Alarm
        wfs="PWFS1"
        guideQuality={{ ...guideQuality, flux: 799 }}
        alarm={{ ...alarm, enabled: false }}
        disabled={false}
        onUpdateAlarm={onUpdateAlarm}
      />,
    );
    await expect.element(page.getByTestId('no-alarm')).toBeInTheDocument();
  });
});

async function setLimit(el: Locator, value: number) {
  await userEvent.fill(el, value.toString());
  await userEvent.tab();
}

async function switchEnabled(el: Locator) {
  await userEvent.click(el);
}
