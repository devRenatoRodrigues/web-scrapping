import { WebBrowser } from "../driver";
import dotenv from 'dotenv';
import { ElementHandle, Page } from "playwright";
import { LoginUseCase, SearchUseCase, SelectFilterUseCase } from "./LinkedInUseCases";
import fs from "fs";
import { ILinkedInJob } from "../interfaces";

dotenv.config();

export default class LinkedInService {
    private _driver: WebBrowser;
    private _page: Page | null;
    constructor() {
        this._driver = new WebBrowser();
        this._page = null;
    }

    async findJobs(quantity: number = 50) {
        const jobs: ILinkedInJob[] = [];
        let pageNumber = 1;
        let pageButtonEl;
        try {
            const loginUseCase = new LoginUseCase();
            const searchUseCase = new SearchUseCase();
            const selectFilterUseCase = new SelectFilterUseCase();

            this._page = await this._driver.start();
            await loginUseCase.execute(this._page);
            await searchUseCase.execute(this._page, 'Software Engineer');
            await selectFilterUseCase.execute(this._page, 'Jobs');
            await this._page.waitForTimeout(10000);
            while (jobs.length < quantity) {
                const ulEl = await this._page.$$('.scaffold-layout__list-container');
                const liEl = await ulEl[0].$$('li.jobs-search-results__list-item');
                const footerEl = await this._page.$('footer.global-footer-compact');
                await this._scrollToBottom(liEl, footerEl!);
                const extract = await this._extractJobs(liEl);
                jobs.push(...extract!);
                pageButtonEl = await this._page.$(`button[aria-label="Page ${pageNumber++}"]`);
                await pageButtonEl?.click();

            }
            this._saveOn(jobs);

        } catch (error: any) {
            throw new Error(`Error on Find Jobs: ${error.message}`);

        } finally {
            this._console('Closing Browser...')
            // await this._driver.close();

        }
    }


    private async _extractJobs(liEl: ElementHandle[]) {
        this._console('Extracting Jobs...')
        let jobs: ILinkedInJob[] = []
        try {
            const baseUrl = 'https://www.linkedin.com';
            for (const el of liEl) {
                const nameLinkElement = await el.$('a.job-card-list__title');
                const job = (await nameLinkElement?.innerText())?.trim() || '';
                const url = baseUrl + await nameLinkElement?.getAttribute('href');
                const createdAt = new Date().toISOString();
                const currentJob: ILinkedInJob = { job, url, createdAt };
                jobs.push(currentJob);
            }
            this._console(`Total Jobs extract: ${jobs.length} - ${jobs[24].job}`);
            return jobs;
        } catch (error) {
            console.log('error', error)
        }
    }

    private async _scrollToBottom(elements: ElementHandle[], footerSelector: ElementHandle) {
        this._console('Scrolling to Bottom...')
        for (let i = 0; i < elements.length; i += 7) {
            await elements[i].scrollIntoViewIfNeeded();
            await this._page!.waitForTimeout(3000);
        }
    }

    private _saveOn(jobs: ILinkedInJob[]) {
        fs.writeFileSync('temp/jobs.json', JSON.stringify(jobs, null, 2));
    }


    private _console(message: string) {
        if (process.env.DEBUG === 'true') {
            console.log(message);
        }
    }

}
