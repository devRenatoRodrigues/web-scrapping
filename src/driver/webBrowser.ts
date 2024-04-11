import { chromium, BrowserContext, Page } from 'playwright';
import fs from 'fs';
import path from 'path';

export class WebBrowser {
    browser: BrowserContext | null;
    page: Page | null;
    constructor() {
        this.browser = null;
        this.page = null;
    }

    async start(): Promise<Page> {
        try {
            const profileDirectory = './temp/chrome-profile';
            const storageStatePath = path.join(profileDirectory, 'storage.json');

            const dir = path.dirname(storageStatePath);

            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }


            if (!fs.existsSync(profileDirectory)) {
                fs.mkdirSync(profileDirectory, { recursive: true });
            }

            // Verifica se o arquivo de estado de armazenamento existe, se não, cria o arquivo
            if (!fs.existsSync(storageStatePath)) {
                fs.writeFileSync(storageStatePath, '{}');
            }

            this.browser = await chromium.launchPersistentContext(profileDirectory, {
                headless: false,
                args: [
                    '--disable-gpu',
                    '--no-sandbox',
                ],
                viewport: { width: 1366, height: 768 }
            });

            console.log('Browser started...');
            this.page = await this.browser.newPage();

            return this.page;
        } catch (error: any) {
            console.error(error)
            throw new Error(error.message);
        }
    }

    async close(): Promise<void> {
        console.log('Closing browser...');
        await this.browser?.close();
    }
}