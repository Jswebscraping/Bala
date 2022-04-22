const puppeteer = require('puppeteer');
const fs = require('fs');
try {
async function Eno() {
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    await page.goto("https://blinkit.com/prn/eno-lemon-digestive-antacid/prid/10841",{waitUntil:'load'});
    await page.waitForSelector("#app > div > div > div:nth-child(5) > div > div > div > div.css-1dbjc4n.r-150rngu.r-eqz5dr.r-16y2uox.r-1wbh5a2.r-11yh6sk.r-1rnoaur.r-1sncvnh > div > div > div > div > div.css-1dbjc4n.r-14lw9ot.r-gkhvb2");

    const details = await page.$$('#app > div > div > div:nth-child(5) > div > div > div > div.css-1dbjc4n.r-150rngu.r-eqz5dr.r-16y2uox.r-1wbh5a2.r-11yh6sk.r-1rnoaur.r-1sncvnh > div > div > div > div > div.css-1dbjc4n.r-14lw9ot.r-gkhvb2');
    const arr = [];
    for(const a of details) {
        const productName = await a.$eval('.r-1vzi8xi', div => div.innerText);
        const price = await a.$eval('.r-1d4mawv', div => div.innerText);
        const productDetails = await a.$eval('.product-details', div => div.innerText);
        arr.push({
            ProductName : productName,
            ProductPrice : price,
            ProductDetails : productDetails,
        });
    };
    console.log(arr);
    await browser.close();
    fs.writeFile("EnoProduct.json",JSON.stringify(arr,'',2),(err) => {
        if(err){console.log(err)}
        else{console.log('Saved Successfully!')}
    });
};
Eno();
}
catch(e) {
    console.log("error",e);
}
