const puppeteer = require('puppeteer');

try {
    async function limitedSelection() {
        const browser = await puppeteer.launch({headless:false});
        const page = await browser.newPage();
        const urls = [
            "https://www.virginmegastore.ae/en/p/723594",
            "https://www.virginmegastore.ae/en/p/199280",
            "https://www.virginmegastore.ae/en/p/631025",
            "https://www.virginmegastore.ae/en/p/723577",
            "https://www.virginmegastore.ae/en/p/457004",
            "https://www.virginmegastore.ae/en/p/766131",
            "https://www.virginmegastore.ae/en/p/790688",
        ];
        const arr = [];
        for(let url = 0;url < urls.length;url++) {
            const arr = [];
            try{
            await page.goto(urls[url], {waitUntil:'load'});
            await page.waitForTimeout(5500);
            await page.waitForXPath('//*[@class="longDesc"]//strong[last()]',{timeout:5000});
            const specs = await page.$x('//strong[contains(text(),"Specifications")]//following-sibling::text()|//*[@class="tab-details"]/ul[1]/li');
            console.log(urls[url]);
            console.log("Specifications");
            for(let i =0;i<specs.length;i++) {
            arr.push(await page.evaluate(el=>el.textContent,specs[i]));
            }
            console.log(arr);
        }
        catch(e) {
            console.log(urls[url]);
            console.log("Specifications Not Found");
        }
    }
    await browser.close();
    }
    limitedSelection();
}
catch(e) {
    console.log("Error",e);
}
//strong[contains(text(),"Specifications")]//following-sibling::text()|//*[@id="details"]/div[1]/ul[1]/li