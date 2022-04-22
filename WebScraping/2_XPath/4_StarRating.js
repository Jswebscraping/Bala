const puppeteer = require('puppeteer');
const fs = require('fs');

try {
    async function StarRatings() {
        const browser = await puppeteer.launch({headless:false});
        const page = await browser.newPage();
        const urls = [
            'https://www.chemistwarehouse.co.nz/buy/1159/betadine-sore-throat-ready-to-use-120ml',							
            'https://www.chemistwarehouse.co.nz/buy/101750/essie-nail-polish-ballet-slippers-6',
            'https://www.chemistwarehouse.co.nz/buy/83446/dermal-therapy-anti-itch-soothing-cream-85g'
        ];
        const arr = [];

        for(let i = 0;i < urls.length;i++) {
            try {
                await page.goto(urls[i], {waitUntil:'load'});
                await page.waitForTimeout(10000);
                const review = await page.$x('//*[@id="BVRRContainer"]//*[@class="bv-write-review bv-focusable bv-submission-button"]');
                await review[0].hover();

                const starRating = await page.$x('//*[@id="BVRRContainer"]//*[@class="bv-secondary-rating-summary-rating bv-table-cell"]');
                arr.push({
                    ProductURL : urls[i],
                    ProductStarRating : await page.evaluate(el => el.textContent, starRating[0]),
                });
                }
            catch(e) { console.log("This Product Doesn't Have Visible StarRating! "); }
        }
        console.log(arr);
        await browser.close();
        fs.writeFile("StarRatings.csv",JSON.stringify(arr," ",2), (err) => {
            if(err)(console.log("Error"));
            else {console.log("Saved sucessfully!")}
        });
    }
    StarRatings();
}
catch(e) {
    console.log("Error");
}