import {test, expect } from './fixtures/trello-test';

test.beforeAll(async ({ request }) => {
    // Clear the database
    await request.post('http://localhost:3000/api/reset');
});

test('Create a new board with a list and cards', async ({ getStartedPage, myBoardsPage, boardPage }) => {
    // load the app
    await getStartedPage.load();
    // create a new board
    await getStartedPage.createFirstBoard('Chores');
    //verify the page appears as expected
    await boardPage.expectNewBoardLoaded('Chores');
    // create a new list
    await boardPage.addList('TO DO');
    //verify the list was created
    await expect(boardPage.listName).toHaveValue('TO DO');
    //add cards to the list
    await boardPage.addCardToList(0, 'Buy groceries');
    await boardPage.addCardToList(0, 'Walk the dog');
    await boardPage.addCardToList(0, 'Mow the lawn');
    //verify the three cards appear
    await expect(boardPage.cardTexts).toHaveText(
        ['Buy groceries', 'Walk the dog', 'Mow the lawn']);
    //navigate to the home page
    await boardPage.goHome();
    //verify the home page appears as expected
    await myBoardsPage.expectLoaded(['Chores']);
});