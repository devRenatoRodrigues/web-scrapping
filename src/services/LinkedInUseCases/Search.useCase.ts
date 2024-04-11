import { Page } from "playwright";

export class SearchUseCase {
    async execute(page: Page, search: string) {
        this._console('Searching...')
        try {
            await page.waitForSelector('input[aria-label="Search"]');
            await page.fill('input[aria-label="Search"]', search);
            await page.keyboard.press('Enter');
        } catch (error: any) {
            throw new Error(`Error on Search: ${error.message}`);
        }
    }

    private _console(message: any) {
        if (process.env.DEBUG === 'true') {
            console.log(message);
        }
    }
}