import { test as base } from '@playwright/test';
import { BoardPage } from '../pages/board';
import { GetStartedPage } from '../pages/get-started';
import { MyBoardsPage } from '../pages/my-boards';

type TrelloFixtures = {
    getStartedPage: GetStartedPage;
    myBoardsPage: MyBoardsPage;
    boardPage: BoardPage;
}

export const test = base.extend<TrelloFixtures>({
    getStartedPage: async ({ page }, use) => {
        await use(new GetStartedPage(page));
    },
    myBoardsPage: async ({ page }, use) => {
        await use(new MyBoardsPage(page));
    },
    boardPage: async ({ page }, use) => {
        await use(new BoardPage(page));
    }
});

export { expect } from '@playwright/test';