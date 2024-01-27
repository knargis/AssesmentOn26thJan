import { expect, test } from "@playwright/test";
import CalendlyLoginPage from "../pages/calendlyLoginPage";
import DashboardPage from "../pages/dashboard.page";

test.describe("Page object test demo", async () => {

test("Login test_01 for invalid login with wrong email", async ({ page, baseURL }, testInfo) => {
    const calendly = new CalendlyLoginPage(page);
    await calendly.gotoUrl();
    await calendly.openAndVerifyloginPage();
    await calendly.verifyInvalidLoginWithWrongEmail('WrongEmail');
})

test("Login test_02 for invalid login with pwd ", async ({ page }) => {
    const calendly = new CalendlyLoginPage(page);
    await calendly.gotoUrl();
    await calendly.openAndVerifyloginPage();
    await calendly.verifyLogin('Knargis92@gmail.com','wrongPwd');
})

test("Login test_03 for valid login with correct email and pwd", async ({ page, baseURL }, testInfo) => {
    const calendly = new CalendlyLoginPage(page);
    await calendly.gotoUrl();
    await calendly.openAndVerifyloginPage();
    await calendly.verifyLogin('Knargis92@gmail.com', "Humerakhan@123");
})

test("Login test_04: verify header menu", async ({ page }) => {
    const calendly = new CalendlyLoginPage(page);
    const dashboardpage = new DashboardPage(page);
    await calendly.gotoUrl();
    await dashboardpage.verifyHeaderMenu();
})

test("Login test_05: verify pricing", async ({ page }) => {
    const calendly = new CalendlyLoginPage(page);
    const dashboardpage = new DashboardPage(page);
    await calendly.gotoUrl();
    await dashboardpage.verifyPricing();
})

})