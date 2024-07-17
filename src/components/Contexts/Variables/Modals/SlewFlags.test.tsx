import { canEditAtom } from '@/components/atoms/auth';
import { slewVisibleAtom } from '@/components/atoms/slew';
import { renderWithContext } from '@gql/render';
import { screen, waitFor } from '@testing-library/react';
import { SlewFlags } from './SlewFlags';

describe(SlewFlags.name, () => {
  it('should render', async () => {
    renderWithContext(<SlewFlags />, { initialValues: [[slewVisibleAtom, true]] });

    expect(screen.getAllByRole<HTMLInputElement>('checkbox')).toHaveLength(16);
    await waitFor(async () => (await screen.findByLabelText<HTMLInputElement>('Zero Chop Throw')).disabled);
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
