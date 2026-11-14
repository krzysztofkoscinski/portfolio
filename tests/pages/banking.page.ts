import { type Locator, type Page } from '@playwright/test';

const sectionPaths = {
  Dashboard: '/dashboard',
  Transfer: '/transfer',
  History: '/history',
  'Bills Payment': '/bill-pay',
  Cards: '/cards',
  Loans: '/loans',
  'Top Up': '/top-up',
  Settings: '/settings',
} as const;

export type BankingSection = keyof typeof sectionPaths;

export class BankingPage {
  readonly mainContent: Locator;
  private readonly navigation: Locator;

  constructor(private readonly page: Page) {
    this.mainContent = page.getByRole('main');
    this.navigation = page.getByRole('navigation');
  }

  async navigateTo(section: BankingSection): Promise<void> {
    await this.navigation.getByRole('link', { name: section, exact: true }).click();
    await this.page.waitForURL(`**${sectionPaths[section]}`);
  }

  heading(name: string | RegExp): Locator {
    return this.mainContent.getByRole('heading', { name });
  }

  text(name: string): Locator {
    return this.mainContent.getByText(name, { exact: true });
  }

  link(name: string): Locator {
    return this.mainContent.getByRole('link', { name, exact: true });
  }

  textbox(name: string): Locator {
    return this.mainContent.getByRole('textbox', { name, exact: true });
  }

  placeholder(name: string): Locator {
    return this.mainContent.getByPlaceholder(name);
  }

  button(name: string): Locator {
    return this.mainContent.getByRole('button', { name, exact: true });
  }

  combobox(): Locator {
    return this.mainContent.getByRole('combobox');
  }
}
