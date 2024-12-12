import { test, expect } from '@playwright/test';
import { DashboardPage } from '../src/pages/DashboardPage';
import { HeroesPage } from '../src/pages/HeroesPage';
import { DetailsPage } from '../src/pages/DetailsPage';
import assert from 'assert';

test('Add a new hero and verify they appear in the hero list', async ({ page }) => {
    test.slow();

    let dashboardPage = new DashboardPage(page);
    await dashboardPage.goToDashboard();
    await dashboardPage.goToHeroesPage();

    let heroesPage = new HeroesPage(page);
    //await heroesPage.expectTitle();
    await heroesPage.addNewHero('Superman', '123');
});

test('Verify searching for a hero works', async ({ page }) => {

    let dashboardPage = new DashboardPage(page);
    dashboardPage.goToDashboard();
    const hero = await dashboardPage.serachForHero('Dynama');
    let detailsPage = new DetailsPage(page);
    const heroDetails = await detailsPage.verifyHeroDetails();
    assert(heroDetails?.includes(hero.toUpperCase()));

});

test('Verify deleting a hero removes them from the list', async ({ page }) => {

    let dashboardPage = new DashboardPage(page);
    dashboardPage.goToDashboard();
    dashboardPage.goToHeroesPage();
    let heroesPage = new HeroesPage(page);
    await heroesPage.deleteHero();


});

test("Verify a hero's name and score can be modified", async ({ page }) => {

    let dashboardPage = new DashboardPage(page);
    dashboardPage.goToDashboard();
    dashboardPage.goToHeroesPage();
    let heroesPage = new HeroesPage(page);
    await heroesPage.editHero();
});

test("Verify that the top heroes list contains either Hurricane or Tornado", async ({ page }) => {

    let dashboardPage = new DashboardPage(page);
    dashboardPage.goToDashboard();
    dashboardPage.verifyTopHeroesListValues(['Hurricane', 'Tornado']);

});

test("Verify adding a new hero with a score of 600 will add them to the Top Heroes display in the dashboard", async ({ page }) => {
    test.slow();

    let dashboardPage = new DashboardPage(page);
    dashboardPage.goToDashboard();
    dashboardPage.goToHeroesPage();
    let heroesPage = new HeroesPage(page);
    await heroesPage.addNewHero('Superman', '600');
    //dashboardPage.goToDashboard();
    dashboardPage.verifyTopHeroesListValues(['Superman']);

});

test.only("Verify the Add hero button is disabled once the list of heroes contains more than 12 heroes", async ({ page }) => {

    let dashboardPage = new DashboardPage(page);
    dashboardPage.goToDashboard();
    dashboardPage.goToHeroesPage();
    let heroesPage = new HeroesPage(page);
    heroesPage.addNewHero('Superman', '200');
    heroesPage.addNewHero('Superman', '333');
    heroesPage.verifyAddHeroHasLimit();

});
