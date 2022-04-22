const puppeteer = require('puppeteer');
const fs = require('fs');
try {
    async function HackerNews() {
        const browser = await puppeteer.launch({headless:false});
        const page = await browser.newPage();
        
        await page.goto("https://news.ycombinator.com/",{waitUntil:'load'});
        await page.waitForSelector("#hnmain > tbody > tr:nth-child(3) > td > table > tbody");
        await page.waitForNetworkIdle({waitUntil:'networkidle2'});
        const arr = [];
        const details = await page.$$('#hnmain > tbody > tr:nth-child(3) > td > table > tbody');
        
        for(const a of details) {
            const websiteName = await a.$$eval('.titlelink', (a) => {
                return a.map(x => x.innerText)});
            const websiteLink = await a.$$eval('.titlelink', (a) => {
                return a.map(x => x.href)});
        
            for(i = 0;i < 10;i++) {
                arr.push({
                    WebsiteName : websiteName[i],
                    WebsiteUrls : websiteLink[i],
                });
            }
            console.log(arr);
    };
        await browser.close();
        fs.writeFile("ScrapedURLS.json",JSON.stringify(arr,'',2),(err) => {
            if(err){console.log(err)}
            else{console.log('Saved Successfully!')};
        });
    };
    HackerNews();
}
catch(e) {
    console.log("error",e);
};