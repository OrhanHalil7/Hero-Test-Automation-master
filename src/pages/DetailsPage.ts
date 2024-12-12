import { Page, expect } from '@playwright/test';

export class DetailsPage {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async expectTitle() {
        await expect(this.page).toHaveURL(/.heroes/);
    }

    async verifyHeroDetails() {

        console.log(await this.page.getByRole('heading').filter({ hasText: 'Details' }).textContent());
        return await this.page.getByRole('heading').filter({ hasText: 'Details' }).textContent();
    }


}                   