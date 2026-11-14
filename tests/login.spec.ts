import { test, expect } from './fixtures/app.fixture';

test('TC-LOGIN-001: logs in using the test user shortcut', async ({
  page,
  loginPage,
  dashboardPage,
}) => {
  await loginPage.loginAsUser();

  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(dashboardPage.userName).toBeVisible();
  await expect(dashboardPage.userRole).toBeVisible();
  await expect(dashboardPage.logoutButton).toBeVisible();
});

test('TC-LOGIN-002: rejects invalid credentials', async ({ page, loginPage }) => {
  await loginPage.login('invalid.user@example.com', 'WrongPassword123!');

  await expect(loginPage.invalidCredentialsMessage).toBeVisible();
  await expect(page).toHaveURL(/\/login$/);
});

test('TC-LOGIN-003: requires a password', async ({ page, loginPage }) => {
  await loginPage.usernameInput.fill('john.doe');
  await loginPage.loginButton.click();

  await expect(page).toHaveURL(/\/login$/);
  await expect(loginPage.passwordInput).toBeFocused();
});

test('TC-LOGIN-004: requires a username', async ({ page, loginPage }) => {
  await loginPage.loginButton.click();

  await expect(page).toHaveURL(/\/login$/);
  await expect(loginPage.usernameInput).toBeFocused();
});
