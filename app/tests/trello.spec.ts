import { test, expect } from '@playwright/test';

test.beforeAll(async ({ request }) => {
    // Clear the database
    await request.post('http://localhost:3000/api/reset');
});

test('Create a new board with a list and cards', async ({ page }) => {
    // load the app
    await page.goto('http://localhost:3000/');
    // create a new board
    await page.getByTestId('first-board').click();
    await page.getByTestId('first-board').fill('Chores');
    await page.getByTestId('first-board').press('Enter');
    //verify the page appears as expected
    await expect(page.locator('[name="board-title"]')).toHaveValue('Chores');
    await expect(page.getByPlaceholder('Enter list title...')).toBeVisible();
    await expect(page.getByTestId('list')).not.toBeVisible();
    // create a new list
    await page.getByTestId('add-list-input').click();
    await page.getByTestId('add-list-input').fill('TO DO');
    await page.getByTestId('add-list-input').press('Enter');
    //verify the list was created
    await expect(page.getByTestId('list-name')).toHaveValue('TO DO');
    //add cards to the list
    await page.getByTestId('new-card').click();
    await page.getByTestId('new-card-input').fill('Buy groceries');
    await page.getByRole('button', { name: 'Add card' }).click();
    await page.getByTestId('new-card-input').click();
    await page.getByTestId('new-card-input').fill('Walk the dog');
    await page.getByRole('button', { name: 'Add card' }).click();
    await page.getByTestId('new-card-input').click();
    await page.getByTestId('new-card-input').fill('Mow the lawn');
    await page.getByRole('button', { name: 'Add card' }).click();
    //verify the three cards appear
    await expect(page.getByTestId('card-text')).toHaveText(
        ['Buy groceries', 'Walk the dog', 'Mow the lawn']);
    //navigate to the home page
    await page.getByTestId('home').click();
    //verify the home page appears as expected
    await expect(page.getByText('My Boards')).toBeVisible();
    await expect(page.getByText('Chores')).toBeVisible();
});