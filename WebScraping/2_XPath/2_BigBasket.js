const puppeteer = require('puppeteer');
const fs = require('fs');

try {
    async function BigBasket() {
        const browser = await puppeteer.launch({headless:false});
        const page = await browser.newPage();
        await page.goto('https://www.bigbasket.com/', {waitUntil:'load'});
        await page.focus('#input');
        await page.keyboard.type('beverages');
        const Button = await page.$x('//*[@id="navbar-main"]/div/div[3]/div/div/button');
        await Button[0].click();
        await page.waitForTimeout(2000);
        const url = page.url();
        //console.log(url);

        let iterations =1;
        let arr = [];
        for(let no = 0;no < iterations;no++) {
            const page = await browser.newPage();
            await page.goto(url, {waitUntil:'load'});

            await page.waitForTimeout(5000);
            const searchButton = await page.$x('//*[@id="deck"]/div[5]/div/div/label/span[2]');
            //await page.waitForTimeout(5000);
            iterations = searchButton.length;
            await searchButton[no].click();
            await page.waitForTimeout(5000);

            const brands = await page.$x('//product-template/div/div[4]/div[1]/h6');
            const price = await page.$x('//product-template/div/div[4]/div[3]/div/div[1]/h4/span');
            const info = await page.$x('//product-template/div/div[4]/div[1]/a');
            //const rating = await page.$x('//product-template/div/div[4]/div[1]/div/span[1]/span/span[1]');
            const size = await page.$x('//*[@id="dynamicDirective"]//product-template/div/div[4]/div[2]/div[1]/span');
            
            try {
                for(let i = 0;i < iterations;i++) {
                    arr.push({
                        ProductBrand : await page.evaluate(el=> el.textContent,brands[i]),
                        ProductInfo : await page.evaluate(el=> el.textContent,info[i]),
                        ProductSize : await page.evaluate(el=> el.textContent,size[i]),
                        //ProductRating : await page.evaluate(el=> el.textContent,rating[i]),
                        ProductPrice : await page.evaluate(el=> el.textContent,price[i]),
                    });
                };
            }
            catch(e) {
                console.log("Error Product");
            }
            await page.close();
        }
        console.log(arr,arr.length);
        await browser.close();
        fs.writeFile("BigBasket1.csv",JSON.stringify(arr," ",2), (err) => {
            if(err)(console.log("Error"));
            else {console.log("Saved sucessfully!")}
        });
    }
    BigBasket();
}
catch(e) {
    console.log("Error");
}
