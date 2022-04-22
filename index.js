// First Web Scraping Using Puppeteer
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

// The Above Program Is Used To Scrape Data From A Website and Show It In The Console And Write The Contents Into A Text File And JSON File Using Puppeteer Node Library.
// stringify(obj,replacer,space) ---> Converts JavaScript Objects into Strings.
// page.waitForSelector(class or id) ---> Is used to wait for the selector to appear.
// map --->map() creates a new array from calling a function for every array element. map() calls a function once for each element in an array. 
// async() ---> Async functions will always return a value. It makes sure that a promise is returned and if it is not returned then javascript automatically wraps it in a promise which is resolved with its value. 
// Await ---> Await function is used to wait for the promise.
// fs.writeFile ---> To write the contents into a file. It wont run without a if else error passing
// push ---> The push() method adds new items to the end of an array.
// querySelector() ---> The querySelector() method returns the first element that matches a CSS selector.
// querySelectorAll() ---> The querySelectorAll() method returns all elements that matches a CSS selector(s). The querySelectorAll() method returns a NodeList.

