import { type Locator, type Page } from '@playwright/test';

type RegistrationDetails = {
  fullName: string;
  username: string;
  email: string;
  password: string;
};

export class RegistrationPage {
  readonly fullNameInput: Locator;
  readonly usernameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly createAccountButton: Locator;

  constructor(private readonly page: Page) {
    this.fullNameInput = page.getByRole('textbox', { name: 'Enter your full name' });
    this.usernameInput = page.getByRole('textbox', { name: 'Choose a username' });
    this.emailInput = page.getByRole('textbox', { name: 'Enter your email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Create a password' });
    this.confirmPasswordInput = page.getByRole('textbox', {
      name: 'Confirm your password',
    });
    this.createAccountButton = page.getByRole('button', { name: 'Create Account' });
  }

  async register({ fullName, username, email, password }: RegistrationDetails): Promise<void> {
    await this.fullNameInput.fill(fullName);
    await this.usernameInput.fill(username);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(password);
    await this.createAccountButton.click();
  }
}
