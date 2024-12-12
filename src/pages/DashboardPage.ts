import { Browser, Page, chromium, expect } from '@playwright/test';
import { assert } from 'console';


export class DashboardPage {

    private readonly pageTitle = /.*dashboard/;
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }


    async goToDashboard() {
        //const browser = await chromium.launch();
        //const page = await browser.newPage();
        this.page.setDefaultTimeout(10000);
        await this.page.goto('http://localhost:4200/dashboard');
        await this.page.waitForLoadState('networkidle');

        //await expect(this.page).toHaveURL(/.dashboard/);
    }

    async goToHeroesPage() {
        await this.page.getByRole('link', { name: 'Heroes' }).click();

    }

    async serachForHero(heroName: string) {
        await this.page.getByRole('textbox', { name: 'Hero Search' }).fill(heroName);
        await this.page.getByRole('link', { name: heroName }).click();
        return heroName;
    }

    async verifyTopHeroesListValues(topHeroesList: string[]) {
        const inputValues = (await this.page.locator('xpath=//*[@class="heroes-menu"]//a').allTextContents());
        await expect(inputValues).toEqual(expect.arrayContaining(topHeroesList));
        console.log(inputValues);


    }

}



