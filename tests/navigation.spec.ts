import { test, expect } from './fixtures/app.fixture';

test('TC-APP-001: visits every banking section and checks its content', async ({
  page,
  loginPage,
  dashboardPage,
  bankingPage,
}) => {
  await loginPage.loginAsUser();

  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(dashboardPage.userName).toBeVisible();
  await expect(dashboardPage.userRole).toBeVisible();
  await expect(bankingPage.heading('Welcome back, John Doe')).toBeVisible();
  await expect(bankingPage.text('Total Balance')).toBeVisible();
  await expect(bankingPage.text('Account Number:')).toBeVisible();
  await expect(bankingPage.heading('Crypto Portfolio')).toBeVisible();
  await expect(bankingPage.heading('Recent Transactions')).toBeVisible();
  await expect(bankingPage.heading('Live Currency Rates')).toBeVisible();

  await bankingPage.navigateTo('Transfer');
  await expect(page).toHaveURL(/\/transfer$/);
  await expect(bankingPage.heading('Transfer Money')).toBeVisible();
  await expect(bankingPage.heading('Transfer Details')).toBeVisible();
  await expect(bankingPage.heading('Transfer Information')).toBeVisible();
  await expect(bankingPage.text('Recipient Account Number')).toBeVisible();
  await expect(bankingPage.text('Amount (USD)')).toBeVisible();

  await bankingPage.navigateTo('History');
  await expect(page).toHaveURL(/\/history$/);
  await expect(bankingPage.heading('Transaction History')).toBeVisible();
  await expect(bankingPage.text('Filters')).toBeVisible();
  await expect(bankingPage.heading(/^All Transactions/)).toBeVisible();

  await bankingPage.navigateTo('Bills Payment');
  await expect(page).toHaveURL(/\/bill-pay$/);
  await expect(bankingPage.heading('Pay Bills')).toBeVisible();
  await expect(bankingPage.heading('New Payment')).toBeVisible();
  await expect(bankingPage.text('Utility Provider *')).toBeVisible();
  await expect(bankingPage.text('Payment Method *')).toBeVisible();
  await expect(bankingPage.heading('Recent Payments')).toBeVisible();

  await bankingPage.navigateTo('Cards');
  await expect(page).toHaveURL(/\/cards$/);
  await expect(bankingPage.heading('Virtual Cards')).toBeVisible();
  await expect(bankingPage.text('No virtual cards found')).toBeVisible();

  await bankingPage.navigateTo('Loans');
  await expect(page).toHaveURL(/\/loans$/);
  await expect(bankingPage.heading('Loan Application')).toBeVisible();
  await expect(bankingPage.heading('Personal Loan')).toBeVisible();
  await expect(bankingPage.heading('Home Loan')).toBeVisible();
  await expect(bankingPage.heading('Your Applications')).toBeVisible();

  await bankingPage.navigateTo('Top Up');
  await expect(page).toHaveURL(/\/top-up$/);
  await expect(bankingPage.heading('Top Up Account')).toBeVisible();
  await expect(bankingPage.text('Min: $10 | Max: $10,000')).toBeVisible();
  await expect(bankingPage.heading('How It Works')).toBeVisible();

  await bankingPage.navigateTo('Settings');
  await expect(page).toHaveURL(/\/settings$/);
  await expect(bankingPage.heading('Settings')).toBeVisible();
  await expect(bankingPage.heading('Personal Information')).toBeVisible();
  await expect(bankingPage.heading('Identity Documents')).toBeVisible();
  await expect(bankingPage.heading('Address')).toBeVisible();
  await expect(bankingPage.textbox('Full Name *')).toBeVisible();
  await expect(bankingPage.textbox('Email *')).toBeVisible();
  await expect(bankingPage.button('Save Changes')).toBeVisible();

  await bankingPage.button('Change Password').click();
  await expect(bankingPage.heading('Change Password')).toBeVisible();
  await expect(bankingPage.textbox('Current Password *')).toBeVisible();
  await expect(bankingPage.textbox('New Password *')).toBeVisible();
  await expect(bankingPage.textbox('Confirm New Password *')).toBeVisible();
  await expect(bankingPage.text('Minimum 6 characters')).toBeVisible();

  await bankingPage.button('Profile & PII').click();
  await bankingPage.navigateTo('Dashboard');
  await dashboardPage.logoutButton.click();
  await expect(page).toHaveURL(/\/login$/);
});
