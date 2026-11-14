import { type Locator, type Page } from '@playwright/test';

export class DashboardPage {
  readonly userName: Locator;
  readonly userRole: Locator;
  readonly logoutButton: Locator;

  constructor(private readonly page: Page) {
    this.userName = page.getByText('John Doe', { exact: true });
    this.userRole = page.getByText('User', { exact: true });
    this.logoutButton = page.getByRole('button', { name: 'Logout' });
  }

  welcomeHeading(fullName: string): Locator {
    return this.page.getByRole('heading', { name: `Welcome, ${fullName}` });
  }
}
