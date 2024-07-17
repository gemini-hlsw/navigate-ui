import { fireEvent, render, RenderResult, screen } from '@testing-library/react';
import { ComponentProps } from 'react';
import { Alarm } from './Alarm';
import { MockedFunction } from 'vitest';
import { GuideAlarm } from '@gql/configs/gen/graphql';
import { GuideQuality } from '@gql/server/gen/graphql';

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

  it('should render', () => {
    expect(screen.getByLabelText('Counts').textContent).toEqual('1000');
    expect(screen.getByLabelText('Subaperture').textContent).toEqual('OK');
  });

  it('should show NOK for no centroid', () => {
    sut.rerender(
      <Alarm
        wfs="PWFS1"
        guideQuality={{ ...guideQuality, centroidDetected: false }}
        alarm={alarm}
        disabled={false}
        onUpdateAlarm={onUpdateAlarm}
      />,
    );
    expect(screen.getByLabelText('Subaperture').textContent).toEqual('NOK');
  });

  it('should call onUpdateAlarm when enabled changes', () => {
    const checkbox = sut.getByRole('checkbox');

    switchEnabled(checkbox);
    expect(onUpdateAlarm).toHaveBeenCalledWith({ wfs: 'PWFS1', enabled: false });
  });

  it('should call onUpdateAlarm when limit changes', () => {
    const inputNumber = screen.getByLabelText('Limit');

    setLimit(inputNumber, 100);
    expect(onUpdateAlarm).toHaveBeenCalledWith({ wfs: 'PWFS1', limit: 100 });
  });

  it('should not set has-alarm if flux is above limit', () => {
    expect(sut.container.querySelector('.has-alarm')).toBeNull();
  });

  it('should set has-alarm if flux is below limit', () => {
    sut.rerender(
      <Alarm
        wfs="PWFS1"
        guideQuality={{ ...guideQuality, flux: 799 }}
        alarm={alarm}
        disabled={false}
        onUpdateAlarm={onUpdateAlarm}
      />,
    );
    expect(sut.container.querySelector('.has-alarm')).not.toBeNull();
  });

  it('should set has-alarm if centroidDetected is false', () => {
    sut.rerender(
      <Alarm
        wfs="PWFS1"
        guideQuality={{ ...guideQuality, centroidDetected: false }}
        alarm={alarm}
        disabled={false}
        onUpdateAlarm={onUpdateAlarm}
      />,
    );
    expect(sut.container.querySelector('.has-alarm')).not.toBeNull();
  });

  it('should not set has-alarm if disabled', () => {
    sut.rerender(
      <Alarm
        wfs="PWFS1"
        guideQuality={{ ...guideQuality, flux: 799 }}
        alarm={{ ...alarm, enabled: false }}
        disabled={false}
        onUpdateAlarm={onUpdateAlarm}
      />,
    );
    expect(sut.container.querySelector('.has-alarm')).toBeNull();
  });
});

function setLimit(el: HTMLElement, value: number) {
  fireEvent.change(el, { target: { value } });
  fireEvent.blur(el);
}

function switchEnabled(el: HTMLElement) {
  fireEvent.click(el);
}
