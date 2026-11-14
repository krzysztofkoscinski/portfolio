import { randomUUID } from 'node:crypto';
import { test, expect } from './fixtures/app.fixture';

test('TC-REG-001: creates an account and opens its dashboard', async ({
  page,
  registrationPage,
  dashboardPage,
}) => {
  const uniqueId = randomUUID();
  const fullName = 'Playwright Test';

  await registrationPage.register({
    fullName,
    username: `playwright-${uniqueId}`,
    email: `playwright-${uniqueId}@example.com`,
    password: 'PlaywrightTest123!',
  });

  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(dashboardPage.welcomeHeading(fullName)).toBeVisible();
  await expect(dashboardPage.logoutButton).toBeVisible();
});

test('TC-REG-002: requires all registration fields', async ({
  page,
  registrationPage,
}) => {
  await registrationPage.createAccountButton.click();
  await expect(registrationPage.fullNameInput).toBeFocused();
  await registrationPage.fullNameInput.fill('Validation Test');

  await registrationPage.createAccountButton.click();
  await expect(registrationPage.usernameInput).toBeFocused();
  await registrationPage.usernameInput.fill('pw-validation-user');

  await registrationPage.createAccountButton.click();
  await expect(registrationPage.emailInput).toBeFocused();
  await registrationPage.emailInput.fill('pw-validation@example.com');

  await registrationPage.createAccountButton.click();
  await expect(registrationPage.passwordInput).toBeFocused();
  await registrationPage.passwordInput.fill('ValidPass123!');

  await registrationPage.createAccountButton.click();
  await expect(registrationPage.confirmPasswordInput).toBeFocused();
  await expect(page).toHaveURL(/\/register$/);
});

test('TC-REG-003: preserves text field boundary values', async ({
  page,
  registrationPage,
}) => {

  const longUsername = 'u'.repeat(256);

  await registrationPage.fullNameInput.fill('A');
  await registrationPage.usernameInput.fill(longUsername);

  await expect(registrationPage.fullNameInput).toHaveValue('A');
  await expect(registrationPage.usernameInput).toHaveValue(longUsername);
  await expect(page).toHaveURL(/\/register$/);
});

test('TC-REG-004: rejects an invalid email format', async ({
  page,
  registrationPage,
}) => {
  await registrationPage.fullNameInput.fill('Email Validation');
  await registrationPage.usernameInput.fill('email-validation-user');
  await registrationPage.emailInput.fill('invalid-email');
  await registrationPage.passwordInput.fill('ValidPass123!');
  await registrationPage.confirmPasswordInput.fill('ValidPass123!');
  await registrationPage.createAccountButton.click();

  await expect(registrationPage.emailInput).toBeFocused();
  await expect(page).toHaveURL(/\/register$/);
});
