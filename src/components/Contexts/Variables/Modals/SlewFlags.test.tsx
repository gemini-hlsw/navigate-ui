import { canEditAtom } from '@/components/atoms/auth';
import { slewVisibleAtom } from '@/components/atoms/slew';
import { renderWithContext } from '@gql/render';
import { page } from '@vitest/browser/context';
import { SlewFlags } from './SlewFlags';

describe(SlewFlags.name, () => {
  it('should render', async () => {
    renderWithContext(<SlewFlags />, { initialValues: [[slewVisibleAtom, true]] });

    await expect.element(page.getByText('Zero Chop Throw')).toBeEnabled();
    expect(page.getByRole('checkbox').elements()).toHaveLength(16);
  });

  it('should disable when canEdit=false', async () => {
    renderWithContext(<SlewFlags />, {
      initialValues: [
        [slewVisibleAtom, true],
        [canEditAtom, false],
      ],
    });

    await expect.element(page.getByLabelText('Zero Chop Throw')).toBeDisabled();
  });
});
