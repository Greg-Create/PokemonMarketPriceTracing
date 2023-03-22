const puppeteer = require("puppeteer"); // ^14.1.1

const { scrollPageToBottom,scrollPageToTop  } = require('puppeteer-autoscroll-down')
const fs = require('fs')




let browser;
 let  scraper  = async(x) => {
  browser = await puppeteer.launch({headless: true});
  const [page] = await browser.pages();
  const url = `https://store.401games.ca/collections/pokemon-singles?page=${x}&filters=Price_from_to,5-25,In+Stock,True`;
  await page.goto(url, {waitUntil: "domcontentloaded"});        

  results = []
  
   async function prices (){ 
                       
            const el = await page.waitForSelector("#fast-simon-serp-app");

            
            const lastPosition = await scrollPageToBottom(page, {
                size: 500,
                delay: 500
                 })
  
            await page.waitForFunction(({shadowRoot}) =>
            
                shadowRoot.querySelector(".product-card .title"), {}, el);
                const items = await el.evaluate(({shadowRoot}) =>
                [...shadowRoot.querySelectorAll(".product-card")]
                .map(e => ({
                title: e.querySelector(".title")?.textContent,
                price: e.querySelector(".price")?.textContent,
                set: e. querySelector(".vendor")?.textContent
                })),
           
                );                               
              return items         
                }
                return await prices()
            }

pages=2

async function forloop (){
    console.log("start")
    finalList = []
    var pokemon = []
     for (let x=1 ; x<pages; x++)   { 
        const portion = await scraper(x)
        await finalList.push(portion)         
     }
     console.log( await finalList)
     for (let i = 0; i<finalList.length; i++){
        pokemon = await pokemon.concat(finalList[i])
     }
        
     await pokemon.forEach(el => {
         console.log(el)
         analysePrice(el.tit )
        

     
})  


console.log(await pokemon)

}



const analysePrice = async (title,price,set)  => {    
    await console.log(`Title: ${title} , Price: ${price}, Set: ${set}, Number: ${title.split('-')[1]} `)
}








forloop()





