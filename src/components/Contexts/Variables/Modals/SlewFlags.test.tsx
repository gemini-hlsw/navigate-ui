import { canEditAtom } from '@/components/atoms/auth';
import { slewVisibleAtom } from '@/components/atoms/slew';
import { renderWithContext } from '@gql/render';
import { screen } from '@testing-library/react';
import { SlewFlags } from './SlewFlags';

describe(SlewFlags.name, () => {
  it('should render', () => {
    renderWithContext(<SlewFlags />, { initialValues: [[slewVisibleAtom, true]] });

    expect(screen.getAllByRole<HTMLInputElement>('checkbox')).toHaveLength(16);
    expect(screen.getByLabelText<HTMLInputElement>('Zero Chop Throw').disabled).to.be.false;
  });

  it('should disable when canEdit=false', () => {
    renderWithContext(<SlewFlags />, {
      initialValues: [
        [slewVisibleAtom, true],
        [canEditAtom, false],
      ],
    });

    expect(screen.getByLabelText<HTMLInputElement>('Zero Chop Throw').disabled).to.be.true;
  });
});
