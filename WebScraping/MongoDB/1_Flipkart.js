const MongoClient = require('mongodb').MongoClient;
const puppeteer = require('puppeteer');

try {
    async function Mongo(arr) {
        const url = 'mongodb://localhost:27017';
        MongoClient.connect(url,function(err,db) {
        if(err) console.log("Error",err)
        const mydb = db.db('MyDataBase1');
        mydb.collection('Temp').insertMany(arr,function (err,res) {
            if(err) console.log("Error",err);
            console.log("Document Inserted");
            db.close();
          });
        })
    }
    async function GrabDetails() {
        const browser = await puppeteer.launch({headless:false});
        const page = await browser.newPage();
        await page.goto('https://www.flipkart.com/');
        await page.waitForTimeout(2000);
        const arr = [];
        
        const closeButton = await page.$x('//*[@class="_2KpZ6l _2doB4z"]');
        await closeButton[0].click();
        searchBar = await page.$x('//*[@class="_3704LK"]');
        await searchBar[0].type('Smart Watches',{delay:100});
        const searchButton = await page.$x('//*[@class="_34RNph"]');
        await searchButton[0].click();
        await page.waitForTimeout(2000);

        const productName = await page.$x('//*[@class="_4rR01T"]');
        const productPrice = await page.$x('//*[@class="_30jeq3 _1_WHN1"]');
        for(let i =0;i<productName.length;i++) {
            arr.push({
                ProductName : await page.evaluate(el => el.textContent,productName[i]),
                ProductPrice : await page.evaluate(el => el.textContent,productPrice[i])
            });
        }
        //console.log(arr);
        Mongo(arr);
        await browser.close();
    }
    GrabDetails();
}
catch(e) {
    console.log("Error",e);
}