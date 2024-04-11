import { Page } from "playwright";

export class MyNetworkUseCase {
    async execute(page: Page) {
        this._console('Connecting to People...')
        try {
            page.waitForTimeout(25000)
            await page.goto('https://www.linkedin.com/mynetwork/');
            await page.waitForSelector(".discover-entity-type-card__info-container");
            const seeAllLinks = await page.$$(".discover-entity-type-card__info-container");
            await seeAllLinks[0].click();
            await page.waitForSelector(".pv-top-card-v2-ctas");

            //TODO: filter by profission and click in connect !!
            await page.getByRole('button').filter({ has: page.getByRole('generic', { name: 'Connect' }) }).click();



            // const isConnectButton = await getTopButtons[0].innerText()
            // if (isConnectButton.includes('Connect')) {
            //     this._console('Click on first Button');
            //     await getTopButtons[0].click();
            //     await page.getByText('Send without a note').click();
            // }
            // this._console('Click on third Button');
            // await getTopButtons[2].click();
            // const dropDownButton = await page.$('div.artdeco-dropdown__content-inner');
            // const connectButton = await dropDownButton?.$('//li[aria-label="Connect"]')
            // await connectButton?.click()
            // await getTopButtons[0].click()



            // await page.getByText('Connect').click();
            // await page.getByPlaceholder('Ex: We know each other from…')
            //     .fill('Olá eu sou o Renato, muito prazer, estou me conectando para aumentar minha rede de contatos !!')
            // await page.getByText('Send').click();





        } catch (error: any) {
            throw new Error(`Error on MyNetwork: ${error.message}`);
        }
    }

    private _console(message: any) {
        if (process.env.DEBUG === 'true') {
            console.log(message);
        }
    }
}