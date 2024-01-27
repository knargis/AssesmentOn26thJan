import { Page, expect } from "@playwright/test";

export default class DashboardPage {
    DashboardPage: any;
    constructor(public page: Page) {
    }

    public async verifyHeaderMenu()
    {
        expect(await this.page.locator('[id="header-menu-item-0"]').textContent()).toBe("Product");
        expect(await this.page.locator('[id="header-menu-item-1"]').textContent()).toBe("Solutions");
        expect(await this.page.locator('[id="header-menu-item-2"]').textContent()).toBe("Enterprise");
        expect(await this.page.locator('[id="header-menu-item-3"]').textContent()).toBe("Pricing");
        expect(await this.page.locator('[id="header-menu-item-4"]').textContent()).toBe("Resources");

    }

    public async verifyPricing()
    {
        await this.page.locator('[id="header-menu-item-3"]').click();
        expect(await this.page.locator('[data-testid="pricing-plans-title"]').textContent()).toBe("Pick the perfect plan for your team");
        expect(await this.page.locator('[data-testid="dark-button"] span').first().textContent()).toBe("Get started")
    }
}
