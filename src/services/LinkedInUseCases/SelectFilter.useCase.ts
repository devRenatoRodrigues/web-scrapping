import { Page } from "playwright";

export class SelectFilterUseCase {
    async execute(page: Page, filter: string) {
        this._console(`Selecting ${filter} filter...`)
        try {
            await page.click(`button:has-text("${filter}")`)
        } catch (error: any) {
            throw new Error(`Error on Select Filter: ${error.message}`);
        }
    }
    private _console(message: any) {
        if (process.env.DEBUG === 'true') {
            console.log(message);
        }
    }
}