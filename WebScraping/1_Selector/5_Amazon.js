const puppeteer = require('puppeteer');
const fs = require('fs');

try {
    async function SearchKeyword() {
        const browser = await puppeteer.launch({headless:false});
        const page = await browser.newPage();
        
        await page.goto("https://www.amazon.in/ref=nav_logo",{waitUntil:'load'}); 
        await page.focus('#twotabsearchtextbox');
        await page.keyboard.type('moisturizer for face');
        await page.click('#nav-search-submit-button');
        await page.waitForNavigation();
        await page.waitForTimeout(10000);
        
        await page.waitForSelector(".s-main-slot.s-result-list.s-search-results.sg-row");
        const arr = [];
        const details = await page.$$('.s-main-slot.s-result-list.s-search-results.sg-row');

        for(const a of details) {
            productURLS = await a.$$eval('.s-line-clamp-4 > a', (a) => {
                return a.map(x => x.href)});

            for(i = 0;i < 80;i++) {
                if(productURLS[i] != null) {
                arr.push(productURLS[i]); };
            };
        };
        await browser.close();
        fs.writeFile("ProductURLS1.csv",JSON.stringify(arr,'',2),(err) => {
            if(err){console.log(err)}
            else{console.log('URL Saved Successfully!')};
        });
        return arr;
    };

    async function grabDetails() {
        const browser = await puppeteer.launch({headless:false});
        const page = await browser.newPage();
        const links = await Promise.resolve(SearchKeyword());
        console.log(links);
        let count = 1;
    
        for(let i = 0;i< links.length;i++) {
            await page.goto(links[i], {waitUntil:'load',visible:false});
            await page.waitForTimeout(5000);
            await page.waitForSelector('#dp',{waitUntil:'networkidle2',timeout:0});
            
            const arr = [];
            const details = await page.$$('#dp');
                    
            for(const a of details) {
                try {
                    const productTitle = await a.$eval('#productTitle', span => span.innerText);
                    const productBrand = await a.$eval('.po-brand > td.a-span9', td => td.innerText);
                    const productRating = await a.$eval('.averageStarRating', span => span.innerText);
                    const productPrice = await a.$eval('.apexPriceToPay > span.a-offscreen', span => span.innerText);
                    const productMrp = await a.$eval('.apexPriceToPay > span.a-offscreen', span => span.innerText);
                    const productImage = await a.$eval('#imgTagWrapperId > img', img => img.src);
                    const productAvailability = await a.$eval('#availability > span', span => span.innerText);
                    const productDetails = await a.$eval('#feature-bullets > ul', li => li.innerText);
                        
                    arr.push({
                        'Product Title'      : productTitle,
                        'Product Brand'      : productBrand,
                        'Product Rating'     : productRating,
                        'Product MRP'        : productMrp,
                        'Product Price'      : productPrice,
                        'Product Image Urls' : productImage,
                        'Product Availabilty': productAvailability,
                        'Product Details'    : productDetails,   
                    });
                } 
                catch(e) {
                    console.log('Link Error');
                };
            }; 
                    
            for(let j = 0;j<arr.length;j++) {
                if(arr[i] != 0) {
                    fs.appendFile("Product_Details1.csv",JSON.stringify(arr,'',2),(err) => {
                        if(err){console.log(err)}
                        else{ console.log('Saved Successfully!',count); count++;};
                    });
                };
            };
        }; 
        await browser.close();
    }; 
    grabDetails();
} 
catch(e) {
    console.log("Error");
}
