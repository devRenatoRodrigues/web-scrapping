import { WebBrowser } from "../driver";
import dotenv from 'dotenv';
import { ILinkedInAuth } from "../interfaces";
import { Page } from "playwright";
dotenv.config();

interface ExtractMethod {
    page: Page;
    infos: object;

}

export default class LinkedInService {
    private _driver: WebBrowser;
    private _page: Page | null;
    constructor() {
        this._driver = new WebBrowser();
        this._page = null;
    }

    async findJobs() {
        try {

            this._page = await this._driver.start();
            await this._page.goto('https://www.linkedin.com/');
            const currentUrl = this._page.url()
            console.log(currentUrl)
            if (!currentUrl.includes('feed')) {
                await this._login(this._page);
            }
            await this._search(this._page, 'Software Engineer');
            await this._selectFilter(this._page, 'Jobs')

        } catch (error: any) {
            throw new Error(`Error on Find Jobs: ${error.message}`);

        } finally {
            // if (this._driver) {
            //     await new CloseUseCase(this._driver).execute()
            // }
            console.log('finally')
        }
    }

    private async _login(page: Page) {
        const auth: ILinkedInAuth = {
            user: process.env.LINKEDIN_USER || '',
            password: process.env.LINKEDIN_PASSWORD || ''
        }
        await page.goto('https://www.linkedin.com/login');
        await page.waitForSelector('input#username');
        await page.fill('input#username', auth.user);
        await page.fill('input#password', auth.password);
        await page.click('button[type="submit"]');
    }

    private async _search(page: Page, search: string) {
        await page.waitForSelector('input[aria-label="Search"]');
        await page.fill('input[aria-label="Search"]', search);
        await page.keyboard.press('Enter');
    }

    private async _selectFilter(page: Page, filter: string) {
        await page.click(`button:has-text("${filter}")`)
    }

    private async _extract(page: Page, { }: Object)

}
