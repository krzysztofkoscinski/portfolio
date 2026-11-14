import { test, expect } from './fixtures/app.fixture';

test('TC-DASH-002: opens transaction history from the dashboard', async ({
  page,
  loginPage,
  bankingPage,
}) => {
  await loginPage.loginAsUser();

  await bankingPage.link('View All').click();

  await expect(page).toHaveURL(/\/history$/);
  await expect(bankingPage.heading('Transaction History')).toBeVisible();
});

test('TC-TRANSFER-002: requires a recipient before submitting a transfer', async ({
  page,
  loginPage,
  bankingPage,
}) => {
  await loginPage.loginAsUser();
  await bankingPage.navigateTo('Transfer');

  await bankingPage.button('Transfer Money').click();

  await expect(bankingPage.placeholder('Enter account number or search by name')).toBeFocused();
  await expect(page).toHaveURL(/\/transfer$/);
});

test('TC-HISTORY-002: filters and clears a transaction search', async ({
  page,
  loginPage,
  bankingPage,
}) => {
  await loginPage.loginAsUser();
  await bankingPage.navigateTo('History');

  const searchInput = bankingPage.placeholder('Search by description...');
  await searchInput.fill('no-matching-transaction');
  await expect(bankingPage.text('No transactions found')).toBeVisible();

  await bankingPage.button('Clear Filters').click();

  await expect(searchInput).toHaveValue('');
  await expect(page).toHaveURL(/\/history$/);
});

test('TC-BILL-002: requires a provider before submitting a bill payment', async ({
  page,
  loginPage,
  bankingPage,
}) => {
  await loginPage.loginAsUser();
  await bankingPage.navigateTo('Bills Payment');

  await bankingPage.button('Pay Bill').click();

  await expect(bankingPage.combobox()).toBeFocused();
  await expect(page).toHaveURL(/\/bill-pay$/);
});

test('TC-CARD-002: shows the empty state when the user has no virtual cards', async ({
  loginPage,
  bankingPage,
}) => {
  await loginPage.loginAsUser();
  await bankingPage.navigateTo('Cards');

  await expect(bankingPage.heading('Virtual Cards')).toBeVisible();
  await expect(bankingPage.text('No virtual cards found')).toBeVisible();
});

test('TC-LOAN-002: displays the available loan options', async ({ loginPage, bankingPage }) => {
  await loginPage.loginAsUser();
  await bankingPage.navigateTo('Loans');

  await expect(bankingPage.heading('Select Loan Type')).toBeVisible();
  await expect(bankingPage.heading('Personal Loan')).toBeVisible();
  await expect(bankingPage.text('12% p.a.')).toBeVisible();
  await expect(bankingPage.text('$1,000 - $50,000')).toBeVisible();
  await expect(bankingPage.heading('Home Loan')).toBeVisible();
  await expect(bankingPage.text('5% p.a.')).toBeVisible();
  await expect(bankingPage.text('$50,000 - $1,000,000')).toBeVisible();
});

test('TC-TOPUP-002: quick selection populates the top-up amount', async ({
  loginPage,
  bankingPage,
}) => {
  await loginPage.loginAsUser();
  await bankingPage.navigateTo('Top Up');

  await bankingPage.button('$50').click();

  await expect(bankingPage.placeholder('0.00')).toHaveValue('50');
});

test('TC-SETTINGS-002: opens the change-password form without saving', async ({
  loginPage,
  bankingPage,
}) => {
  await loginPage.loginAsUser();
  await bankingPage.navigateTo('Settings');

  await bankingPage.button('Change Password').click();

  await expect(bankingPage.heading('Change Password')).toBeVisible();
  await expect(bankingPage.textbox('Current Password *')).toBeVisible();
  await expect(bankingPage.textbox('New Password *')).toBeVisible();
  await expect(bankingPage.text('Minimum 6 characters')).toBeVisible();
});
