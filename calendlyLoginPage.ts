import { Page, expect } from "@playwright/test";

export default class CalendlyLoginPage {
    CalendlyLoginPage: any;
    constructor(public page: Page) {
    }

    public async gotoUrl()
    {
        await this.page.goto("https://calendly.com/", {waitUntil: "networkidle"});
        await this.page.waitForNavigation();
        await this.page.waitForTimeout(5000);
        // await this.page.locator('button[aria-label="Close"]').click({force: true});
        try
        {   await this.page.waitForSelector('button[aria-label="Close"]');
            await (await this.page.waitForSelector('button[aria-label="Close"]')).click();
        }
        catch{
            //NA
        }
    }

    public async openAndVerifyloginPage()
    {
       //await this.page.locator('[href="/login"]').first().hover();
        await this.page.locator('nav[data-testid="header"] div [href="/login"]').first().click({delay:2000});
        await expect(await this.page.locator('[data-testid="two-column-hero-title"]').textContent()).toBe('Welcome back to  Calendly ');
    }

    public async verifyInvalidLoginWithWrongEmail(emailId: string)
    {
        await this.page.locator('input[placeholder="Enter your email"]').fill(emailId);
        await this.page.locator('button[data-testid="primary-button"][type = "submit"]').click();
        const errorMessage = await this.page.locator('span[type="error"]').innerText();
        expect(errorMessage).toBe('Please enter a valid email address.');
        
    }


    public async verifyLogin(emailId: string, pwd: string)
    {
        await expect(this.page.locator("div[class*='single-input-fiel'] p")).toBeVisible();
        await this.page.locator('input[placeholder="Enter your email"]').fill(emailId);
        await this.page.locator('button[data-testid="primary-button"][type = "submit"]').click({delay:3000});
        expect(await this.page.locator('h2[as]').first().textContent()).toBe("Welcome back, Knargis92@gmail.com!")
        await this.page.locator("//div[text()='Log in with Google'] /..").click();   
    }

    public async verifyLoginFail()
    {
        const wrongPwd = 'Wrong password. Try again or click Forgot password to reset it.';
         expect(await this.page.locator('[aria-live="polite"] div span').textContent()).toBe(wrongPwd);
    }

    public async verifySuccessLogin()
    {
        expect(await this.page.locator("//h1[text()='Event types']").isVisible()).toBeTruthy();
    }
}