const puppeteer = require('puppeteer');
const fs = require('fs');

try {
    async function JioMart() {
        const browser = await puppeteer.launch({headless:false});
        const page = await browser.newPage();
        await page.goto('https://www.jiomart.com/', {waitUntil:'load'});
        await page.hover('#nav_link_2');
        const dropDown = await page.$x('//*[@id="nav_link_61"]');
        await dropDown[0].click();
        await page.waitForTimeout(1500);
        const url = page.url();
        console.log(url);
        const arr = [];

        for(let iterations = 0;iterations < 4 ;iterations++) {
            await page.goto(url, {waitUntil:'load'});
            await page.waitForTimeout(3000);
            const sortOptions = await page.$x('//*[@id="sort_container"]/button ');
            await sortOptions[iterations].click();
            await page.waitForTimeout(1500);

            const title = await page.$x('//*[@id="algolia_hits"]/div/div/ol/li/div/a/span[3]');
            const price = await page.$x('//*[@id="final_price"]');
            
            for(let i = 0;i < title.length;i++) {
                arr.push({
                    ProductTitle : await page.evaluate(el => el.textContent,title[i]),
                    ProductPrice : await page.evaluate(el => el.textContent,price[i]),
                });
            }
        }
        console.log(arr,arr.length);
        await browser.close();
        fs.writeFile("JioMart.csv",JSON.stringify(arr," ",2), (err) => {
            if(err)(console.log("Error"));
            else {console.log("Saved sucessfully!")}
        });
    }
    JioMart();
}
catch(e) {
    console.log('Error');
}