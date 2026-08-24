import {test, expect } from './fixtures/trello-test';

test.describe('Trello-like board', () => {
    let boardName: string;
    const listName = 'TO DO';

    test.beforeEach(async ({ request, myBoardsPage }) => {
        const randomNumber = Math.trunc(Math.random() * 1000000);
        boardName = 'Chores ' + `${randomNumber}`;
        await request.post('http://localhost:3000/api/boards', {data: {name: boardName}});
        // load the app
        await myBoardsPage.load();
        // create a new board
        await myBoardsPage.openBoard(boardName);
    });

    test('should display the new board', async ({ boardPage }) => {
        //verify the page appears as expected
        await boardPage.expectNewBoardLoaded(boardName);
    });

    test('should create the first list in a board', async ({ boardPage }) => {
        // create a new list
        await boardPage.addList(listName);
        //verify the list was created
        await expect(boardPage.listName).toHaveValue(listName);
    });

    test('should create a list with multiple cards', async ({ boardPage }) => {
        //add cards to the list
        await boardPage.addList(listName);
        await boardPage.addCardToList(0, 'Buy groceries');
        await boardPage.addCardToList(0, 'Walk the dog');
        await boardPage.addCardToList(0, 'Mow the lawn');
        //verify the three cards appear
        await expect(boardPage.cardTexts).toHaveText(
            ['Buy groceries', 'Walk the dog', 'Mow the lawn']);
    });

    test('should navigate home from a board', async({ boardPage, myBoardsPage }) => {
        //navigate to the home page
        await boardPage.goHome();
        //verify the home page appears as expected
        await myBoardsPage.expectLoaded([boardName]);
    });
})