import { Page } from "playwright";
import { ILinkedInAuth } from "../../interfaces";

export class LoginUseCase {
    private auth: ILinkedInAuth;

    constructor() {
        this.auth = {
            user: process.env.LINKEDIN_USER || '',
            password: process.env.LINKEDIN_PASSWORD || ''
        };
    }

    async execute(page: Page) {
        this._console('Starting Login...')
        try {
            await page.goto('https://www.linkedin.com/');
            if (page.url().includes('feed')) {
                this._console('Already Logged In...')
                return;
            }
            await page.waitForSelector('input#username');
            this._console('Filling Login Form...')
            await page.fill('input#username', this.auth.user);
            await page.fill('input#password', this.auth.password);
            await page.click('button[type="submit"]');
        } catch (error: any) {
            throw new Error(`Error on Login: ${error.message}`);
        }
    }

    private _console(message: any) {
        if (process.env.DEBUG === 'true') {
            console.log(message);
        }
    }
}