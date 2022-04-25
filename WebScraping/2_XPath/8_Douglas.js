const puppeteer = require('puppeteer');

try {
    async function limitedSelectionSize() {
        const browser = await puppeteer.launch({headless:false});
        const page = await browser.newPage();
        const urls = [
            "https://www.douglas.de/de/p/3001055676?variant=775012",
            "https://www.douglas.de/de/p/3001024428?variant=801829",
            "https://www.douglas.de/de/p/3001054104?variant=076998",
            "https://www.douglas.de/de/p/5010338006",
            "x",
        ];
        const arr = [];
        for(let url = 0;url < urls.length;url++) {
        try{
            await page.goto(urls[url], {waitUntil:'load'});
            await page.waitForTimeout(5500);
            const specs = await page.$x('//*[@class="product-detail__variant-name"]');
            
            console.log(await page.evaluate(el => el.textContent,specs[0]));
        }
        catch(e) {
            console.log("Size Not Found");
        }
    }
    await browser.close();
    }
    limitedSelectionSize();
}
catch(e) {
    console.log("Error",e);
}