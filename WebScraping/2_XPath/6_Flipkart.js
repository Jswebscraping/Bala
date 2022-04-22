const puppeteer = require('puppeteer');
const fs = require('fs');

try {
    async function Flipkart() {
        const browser = await puppeteer.launch({headless:false});
        const page = await browser.newPage();
        await page.goto("https://www.flipkart.com/", {waitUntil:'domcontentloaded'});
        await page.waitForTimeout(4000);
        const button = await page.$x('/html/body/div[2]/div/div/button');
        await button[0].click();
        // Read the file contents 
        const keyword = fs.readFileSync("./InputKeywords.csv",'utf-8');
        const keywords = keyword.split(',\r\n');
        console.log(keywords);

        const arr = [];
        
        for(let i =0;i < 10;i++) {
            const searchBox = await page.$x('//*[@id="container"]//*[@class="_3704LK"]');
            await searchBox[0].type(keywords[i]);
            await page.waitForTimeout(2000);
            const searchButton = await page.$x('//*[@id="container"]//*[@class="L0Z3Pu"]');
            await searchButton[0].click();
            await page.waitForTimeout(4000);

            const productName = await page.$x('//*[@id="container"]//*[@class="_4rR01T" or @class="s1Q9rs" or @class="IRpwTa" or @class="_2WkVRV" or @class="IRpwTa _2-ICcC"]');
            const productPrice = await page.$x('//*[@id="container"]//*[@class="_30jeq3 _1_WHN1"or@class="_30jeq3"]');

            if(productName.length > productPrice.length) {
                arr.push(
                    keywords[i],
                    await TwoTitles(productName,productPrice,page)
                );
                console.log(arr);
            }
            else if(productName.length == productPrice.length) {
                arr.push(
                    keywords[i],
                    await SingleTitle(productName,productPrice,page)
                );
                console.log(arr);
            }
            else{
                console.log("Error! Reselect Xpath and Try")
            }
            await ClearSearch(page);
        }
        await browser.close();
        fs.writeFile("Flipkart.csv",JSON.stringify(arr," ",2), (err) => {
            if(err)(console.log("Error"));
            else {console.log("Saved sucessfully!")}
        });
    }
    //SearchBox Function Used to clear the SearchBox for next Input
    async function ClearSearch(page) {
        const searchBox = await page.$x('//*[@id="container"]//*[@class="_3704LK"]');
        await searchBox[0].focus();
        await page.keyboard.down('Control');
        await page.keyboard.press('A');
        await page.keyboard.up('Control')
        await page.keyboard.press('Backspace');
        await page.waitForTimeout(4000);
    }
    // Used for Single Title Pages
    async function SingleTitle(productName,productPrice,page) {
        const arr = [];
        for(let i = 0;i < productName.length;i++) {
            arr.push({
                ProductName : await page.evaluate(el => el.textContent,productName[i]),
                ProductPrice : await page.evaluate(el => el.textContent,productPrice[i]),
            })
        }
        return arr;
    }
    // Used to Concatenate Two Titles into one and Display Ouput
    async function TwoTitles(productName,productPrice,page) {
        const arr = [];
        let j = 0,k = 0;
        for(let i = 0;i < productName.length;i+=2) {
        j = i+1;
        arr.push({
            ProductName : await page.evaluate(el => el.textContent,productName[i]) + " " + await page.evaluate(el => el.textContent,productName[j]),
            ProductPrice : await page.evaluate(el => el.textContent,productPrice[k]),
        })
        k++;
        }
        return arr;
    }
    Flipkart();
}
catch(e){ 
    console.log("Error");
}