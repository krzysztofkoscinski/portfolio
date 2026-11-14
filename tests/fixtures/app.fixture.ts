import { test as base, expect } from '@playwright/test';
import { BankingPage } from '../pages/banking.page';
import { DashboardPage } from '../pages/dashboard.page';
import { LoginPage } from '../pages/login.page';
import { RegistrationPage } from '../pages/registration.page';

type AppFixtures = {
  bankingPage: BankingPage;
  dashboardPage: DashboardPage;
  loginPage: LoginPage;
  registrationPage: RegistrationPage;
};

export const test = base.extend<AppFixtures>({
  bankingPage: async ({ page }, use) => {
    await use(new BankingPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },
  registrationPage: async ({ loginPage, page }, use) => {
    await loginPage.openRegistration();
    await use(new RegistrationPage(page));
  },
});

export { expect };
