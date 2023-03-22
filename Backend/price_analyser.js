const { xml } = require("cheerio");
const { getChildren } = require("domutils");
const { parse } = require("dotenv");
const { isDate } = require("moment");
const puppeteer = require("puppeteer"); // ^14.1.1
const { scrollPageToBottom,scrollPageToTop  } = require('puppeteer-autoscroll-down')
const axios = require("axios")
const Card = require("./models/Card")

let browser;


 async function  analyser (title)  {
    browser = await puppeteer.launch({headless: true});
    const [page] = await browser.pages();
    const url = 'https://www.ebay.ca/b/Individual-Collectible-Card-Game-Cards/183454/bn_1893526?rt=nc&mag=1&LH_Sold=1&LH_Complete=1'
    await page.goto(url, {waitUntil: "domcontentloaded"});


  
    
    
const search = await page.waitForSelector('#gh-ac')
await search.type( title.replace(/[)].*[[]/, ' ') )
const searchBtn = await page.waitForSelector('#gh-btn')
await searchBtn.evaluate(b => b.click())
await page.waitForSelector('.s-item');

 await page.waitForSelector('[aria-label="Sold Items"]')
await page.click('[aria-label="Sold Items"]')
await page.waitForSelector('[aria-label="Completed Items"]')
await page.click('[aria-label="Completed Items"]')



// const graded = await page.waitForSelector('[aria-label="No"]')
// await graded.evaluate(b => b.click()) 

await page.waitForSelector('.s-item');



let prices = await page.evaluate((title) => {
    list = []
   finalList =[]
    newList = []    

    
    

    const items =  document.querySelectorAll(".s-item")

    const blacklist = ["PSA","psa","CGA", "cga", "Online", "DIGITAL", "CGC","cgc", "bgs", "BGS","and", "grade", "GRADE" ]

    var regExp = /\(([^)]+)\)/
    var x = regExp.exec(title)

    for (const item of  items) {


        list.push(

            {
                title: item.querySelector(".s-item__title").innerText.includes(x[1]),   
                price: item.querySelector(".s-item__price").innerText.replace('C $', ''),
                graded:   blacklist.some(el =>  item.querySelector('.s-item__title').innerText.includes(el)),
                actualPrice: item.querySelector(".s-item__price .STRIKETHROUGH") ? true : false

            }
        )
    }


    const result = list.map(value => ({
        title:value.title,
        price:parseFloat(value.price),
        graded:value.graded,
        actualPrice: value.actualPrice
    }))


      
for (i = 0; i<10; i++){
        
    if(result[i]){
    if(result[i].title){
            if(!result[i].graded){
                if(!result[i].actualPrice){
               
            finalList.push(result[i])
                }
            }
        }
    }
    }

   
   const sum = finalList.reduce((accumulator,object) => {
        return accumulator + +object.price
    }, 0)   
        return  parseFloat(( sum/finalList.length ).toFixed(2))



}, title) 
var array = []


price = await prices
array.push(price) 


linkt = await links(title)
array.push(linkt) 






return  array

 }
 





 async function links (title) {
    browser = await puppeteer.launch({headless: true});
    const [page] = await browser.pages();
    const url = 'https://www.ebay.ca/b/Individual-Collectible-Card-Game-Cards/183454/bn_1893526?rt=nc&mag=1&LH_Sold=1&LH_Complete=1'
    await page.goto(url, {waitUntil: "domcontentloaded"});


  
    
     
const search = await page.waitForSelector('#gh-ac')
await search.type( title.replace(/[)].*[[]/, ' ')  )
const searchBtn = await page.waitForSelector('#gh-btn')
await searchBtn.evaluate(b => b.click())


await page.waitForSelector('.s-item');


let prices = await page.evaluate((title) => {
    list = []
   finalList =[]
    newList = []    

    
    

    const items =  document.querySelectorAll(".s-item")

    const blacklist = ["PSA","psa","CGA", "cga", "Online", "DIGITAL", "CGC","cgc", "bgs", "BGS", "Jumbo", "JUMBO", "jumbo"]

    var regExp = /\(([^)]+)\)/
    var x = regExp.exec(title)

    for (const item of  items) {


        list.push(

            {
                title: item.querySelector(".s-item__title").innerText.includes(x[1]) ? true :false ,  
                atitle: item.querySelector(".s-item__title").innerText,
                price: item.querySelector(".s-item__price").innerText.replace('C $', ''),
                graded:   blacklist.some(el =>  item.querySelector('.s-item__title').innerText.includes(el)),
                actualPrice: item.querySelector(".s-item__price .STRIKETHROUGH") ? true : false,
                link: item.querySelector(".s-item__link").getAttribute("href")

            }
        )
    }


    const result = list.map(value => ({
        atitle:value.atitle,
        title:value.title,
        price:parseFloat(value.price),
        graded:value.graded,
        actualPrice: value.actualPrice,
        link: value.link
    }))

      
for (i = 0; i<6; i++){
        
  if(result[i]){
    if(result[i].title){
            if(!result[i].graded){
                if(!result[i].actualPrice){

              var obj = {title:result[i].atitle, price: result[i].price, link : result[i].link}
  finalList.push(obj)
                }
        }
       }
    }
}



 
    
return(finalList)


} , title)




return( (await prices)) 


}



 
exports.analyser = analyser
