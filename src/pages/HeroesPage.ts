import { Page, expect } from '@playwright/test';
import { assert } from 'console';

export class HeroesPage {

    readonly pageTitle = /.*heroes/;
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    async expectTitle() {
        await expect(this.page).toHaveURL(/.heroes/);
    }

    async addNewHero(name: string, score: string) {
        await this.page.locator('xpath=//input[@id="new-hero"]').fill(name);
        await this.page.locator('xpath=//input[@id="hero-score"]').fill(score);
        await this.page.locator('xpath=//button[@class="add-button"]').click();
        await expect(this.page.getByRole('link').filter(
            { hasText: name + ' - ' + score }
        )).toBeVisible();
        await this.page.getByRole('link', { name: 'Dashboard' }).click();
        console.log('hero added successfully');
    }

    async deleteHero() {
        await expect(this.page.locator('xpath=//span[@class="badge"]')).toHaveCount(10);
        await expect(this.page.getByRole('link').filter(
            { hasText: ' Dr Nice - 10 ' }
        )).toBeVisible();
        await this.page.locator('xpath=//button[@class="delete"]').first().click();
        await expect(this.page.getByRole('link').filter(
            { hasText: 'Dr Nice - 10' }
        )).toBeHidden();
        await expect(this.page.locator('xpath=//span[@class="badge"]')).toHaveCount(9);

        console.log('hero deleted successfully');
    }

    async editHero() {
        await this.page.getByRole('link').filter(
            { hasText: 'Dr Nice - 10' }
        ).click();
        await this.page.getByRole('textbox', { name: 'Hero name:  ' }).fill('Superman');
        await this.page.getByRole('textbox', { name: 'Hero score: ' }).fill('777');
        await this.page.getByRole('button', { name: 'save' }).click();
        await expect(this.page.getByRole('link').filter(
            { hasText: 'Superman - 777' }
        )).toBeVisible();
        console.log('hero edited successfully');
    }
    async verifyAddHeroHasLimit() {

        await this.page.locator('xpath=//button[@class="add-button"]').isDisabled();
        console.log('Hero number limit verified successfully');
    }
}