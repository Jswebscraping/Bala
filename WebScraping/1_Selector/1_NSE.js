const puppeteer = require('puppeteer');
const fs = require('fs')

try {
const scrap = (async() => {
const browser = await puppeteer.launch({headless:false});
const page = await browser.newPage();

await page.goto('https://www.nseindia.com/get-quotes/equity?symbol=SBIN' , {waitUntil:'load'});
await page.waitForSelector(".securityinfo");

const grabDetails = await page.evaluate(() => {
    const title = document.querySelector(".mt-3.py-3 h2");
    
    let arr = [];
    const headers = Array.from(document.querySelectorAll('#securityInfo > thead > tr > th'));
    const values = Array.from(document.querySelectorAll('#securityInfo > tbody > tr > td'));
    
    const header = headers.map(th => th.innerText);
    const value = values.map(tr => tr.innerText);

    arr.push({
        "Title": title.innerText,
        "Headers" : header,
        "Values" : value , 
    });
    return arr;
});

console.log(grabDetails);

browser.close();
fs.writeFile("SecurityInfo.json",JSON.stringify(grabDetails,'',2),(err) => {
    if(err){console.log(err)}
    else{console.log('Saved Successfully!')}
});
});
scrap();
}
catch(e) {
    console.log("error",e);
}
