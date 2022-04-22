const puppeteer = require('puppeteer');
const fs = require('fs');

try {
    async function grabBooks() {
        const browser = await puppeteer.launch({headless:false});
        const page = await browser.newPage();
        await page.goto('https://en.wikipedia.org/wiki/Zoobooks', {waitUntil:'load'});
        let arr = [];
        const bookNames = await page.$x('(//*[@id="mw-content-text"]/div/ul[1]//li/b)');
        for(let i = 0;i < bookNames.length;i++) {
            arr[i] = await page.evaluate(el=>el.textContent, bookNames[i]);
        }
        console.log(arr);
        await browser.close();
        fs.writeFile("ZooBooks.csv",JSON.stringify(arr," ",2), (err) => {
            if(err)(console.log("Error"));
            else {console.log("Saved sucessfully!")}
        });
    }
    grabBooks();
}
catch(e) {
    console.log("Error");
}
