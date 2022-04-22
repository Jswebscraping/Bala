const puppeteer = require('puppeteer');
const fs = require('fs');

try {
    async function limitedSelection() {
        const browser = await puppeteer.launch({headless:false});
        const page = await browser.newPage();
        const urls = [
            'https://www.deonlinedrogist.nl/roche-posay-cicaplast-wasgel-p-88015.html',
            'https://www.deonlinedrogist.nl/drogist/la-roche-posay-toleriane-bronzing-powder-12gr.htm',
            'https://www.deonlinedrogist.nl/drogist/la-roche-posay-lipikar-cleansing-oil-ap-400ml.htm',
        ];
        const arr = [];
        try {
            for(let url = 0;url < 3;url++) {
                await page.goto(urls[url], {waitUntil:'load'});
                await page.waitForTimeout(5500);
                const load = await page.$x('//*[@id="j-product-description__more"]/div/span[2]');
                await load[0].click();
                await page.waitForTimeout(1500);

                if(url == 0) {
                    const dose = await page.$x('//*[@id="j-product-description__aia"]//b[5] | //*[@id="j-product-description__aia"]/text()[6]');
                    let doses = [];
                    for(let i = 0;i<dose.length;i++) {
                        doses.push(await page.evaluate(el => el.textContent,dose[i]));
                    }
                    arr.push(doses);
                }
                else if(url == 1) {
                    const use = await page.$x('//*[@id="j-product-description__aia"]//div[position() >=10]');
                    let uses = [];
                    for(let i = 0;i<use.length;i++) {
                        uses.push(await page.evaluate(el => el.textContent,use[i]));
                    }
                    arr.push(uses);
                }
                else {
                    const use1 = await page.$x("//*[@id='j-product-description__aia']//div[position() >=26 and position() <= 28]");
                    let uses1 = [];
                    for(let i = 0;i<use1.length;i++) {
                        uses1.push(await page.evaluate(el => el.textContent,use1[i]));
                    }
                    arr.push(uses1);
                }
            }
        }
        catch(e) { console.log("Error Link",e); }
        console.log(arr);
        await browser.close();
    }
    limitedSelection();
}
catch(e) {
    console.log("Error");
}