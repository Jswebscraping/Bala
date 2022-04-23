const puppeteer = require('puppeteer');
const fs = require('fs');

try {
    async function Main() {
        const browser = await puppeteer.launch({headless:false});
        const page = await browser.newPage();
        const keywords = ['Dry puppy food','Baby food','Chocolate icecream'];
        await page.goto('https://www.loblaws.ca/',{waitUntil:'load'});
        await page.waitForTimeout(5000);
        const arr = [];
        
        for(let i =0;i< keywords.length;i++) {
            arr.push([
                keywords[i],
                await GrabDetails(keywords[i],page),
            ]);
        }
        await browser.close();
        fs.writeFile("LobLaws1.json",JSON.stringify(arr,'',2),(err) => {
            if(err){console.log(err)}
            else{console.log('Saved Successfully!')};
        });
        console.log(arr);
    };

    async function GrabDetails(keywords,page) {
        const arr = [];
            const searchBox = await page.$('.search-input__input');
            await searchBox.type(keywords);
            await page.waitForTimeout(2000);
            await page.keyboard.press('Enter');
            await page.waitForTimeout(10000);

            await page.waitForSelector("#site-content > div > div > div > div.product-grid > div.product-grid__results > div.product-grid__results__products > div > ul");
        
            const productName = await page.$$eval('.product-name__item.product-name__item--name', (span) => {
                return span.map(x => x.innerText)});
            const productPrice = await page.$$eval('.selling-price-list__item__price--__value', (span) => {
                return span.map(x => x.innerText)});
            const productCompPrice = await page.$$eval('.comparison-price-list__item__price', (span) => {
                return span.map(x=> x.innerText)});

            let len = Math.max(productName.length,productCompPrice.length,productPrice.length);
            for(i = 0;i < len;i++) {
                arr.push({
                    ProductName : productName[i],
                    ProductPrice : productPrice[i],
                    ProductComparisionPrice : productCompPrice[i],
                });
            };

            await searchBox.focus();
            await page.keyboard.down('Control');
            await page.keyboard.press('A');
            await page.keyboard.up('Control')
            await page.keyboard.press('Backspace');
            await page.waitForTimeout(4000);
            return arr;
    }
    Main();
}
catch(e) {
    console.log("error",e);
};
