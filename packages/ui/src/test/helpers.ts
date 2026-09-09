import type { GuideEnableMutation } from '@gql/server/gen/graphql';
import { type Locator, type LocatorSelectors, page, userEvent } from 'vitest/browser';

/**
 * A long expiration JWT token for testing purposes. This JWT is not actually valid and should not be used for anything other than running unit tests.
 *
 * Expires 2045
 */
export const longExpirationJwt =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJpc3MiOiJsdWN1bWEtc3NvIiwic3ViIjoiMjE5OSIsImF1ZCI6Imx1Y3VtYSIsImV4cCI6MjM2ODI2NjA3MCwibmJmIjoxNzM3NTQ2MDYwLCJpYXQiOjE3Mzc1NDYwNjAsImx1Y3VtYS11c2VyIjp7InR5cGUiOiJzZXJ2aWNlIiwiaWQiOiJ1LTAwMCIsIm5hbWUiOiJpbnZhbGlkLXVzZXItZm9yLXRlc3RzIn19.fY4fM7DUSQRmEy';

export const expiredJwt =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJpc3MiOiJsdWN1bWEtc3NvIiwic3ViIjoiMjE5OSIsImF1ZCI6Imx1Y3VtYSIsImV4cCI6MTczNzU0NjA2MSwibmJmIjoxNzM3NTQ2MDYwLCJpYXQiOjE3Mzc1NDYwNjAsImx1Y3VtYS11c2VyIjp7InR5cGUiOiJzZXJ2aWNlIiwiaWQiOiJ1LTAwMCIsIm5hbWUiOiJpbnZhbGlkLXVzZXItZm9yLXRlc3RzIn19.fY4fM7DUSQRmEy';

/**
 * Select an option from a primereact dropdown.
 *
 * Give the dropdown as a locator, or as the placeholder of a dropdown that shows no value.
 */
export async function selectDropdownOption(
  sut: LocatorSelectors,
  dropdown: string | Locator,
  optionLabel: string,
): Promise<void> {
  const dropdownElement =
    typeof dropdown === 'string' ? sut.getByRole('button', { name: dropdown, exact: true }) : dropdown;
  await expect.element(dropdownElement).toBeEnabled();
  // Wait for loading state to finish
  await expect
    .poll(() => dropdownElement.element().querySelector<HTMLElement>('.p-dropdown-trigger-icon'))
    .toBeVisible();
  await userEvent.click(dropdownElement);

  const option = page.getByRole('listbox').getByRole('option', { name: optionLabel, exact: true });
  await expect.element(option).toBeVisible();
  await userEvent.click(option);
}

/**
 * A generic successful OperationOutcome object for use in tests
 */
export const operationOutcome: OperationOutcome = {
  __typename: 'OperationOutcome',
  result: 'SUCCESS',
  msg: null,
};

export type OperationOutcome = GuideEnableMutation['guideEnable'];
