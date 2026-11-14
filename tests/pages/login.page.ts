import { type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly loginAsUserButton: Locator;
  readonly registerLink: Locator;
  readonly invalidCredentialsMessage: Locator;

  constructor(private readonly page: Page) {
    this.usernameInput = page.getByRole('textbox', { name: 'Enter your username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Enter your password' });
    this.loginButton = page.getByRole('button', { name: 'Login', exact: true });
    this.loginAsUserButton = page.getByRole('button', { name: 'Login as User' });
    this.registerLink = page.getByRole('link', { name: 'Register here', exact: true });
    this.invalidCredentialsMessage = page.getByText('Invalid username or password', {
      exact: true,
    });
  }

  async goto(): Promise<void> {
    await this.page.goto('/login');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async loginAsUser(): Promise<void> {
    await this.loginAsUserButton.click();
  }

  async openRegistration(): Promise<void> {
    await this.registerLink.click();
  }
}
