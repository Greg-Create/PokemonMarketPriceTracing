const puppeteer = require("puppeteer")
require('events').EventEmitter.defaultMaxListeners = 100;
const axios = require("axios");
const { title } = require("process");



//Scraping Hairy Tarantula website for all cards

async function scrape (x) {
browser = await puppeteer.launch({headless: true});
const [page] = await browser.pages();
const url = `https://hairyt.com/pages/pokemon-advanced-search?q=&game=pokemon&availabilty=true&setNames=&rarities=&types=&pricemin=5.00&pricemax=25.00&page=${x}&order=price-descending`;
await page.goto(url, {waitUntil: "domcontentloaded"});



 await page.waitForSelector(".productCard__card ")



 //Selects every card, gets their title, price and image link
 let prices = await page.evaluate(() => {
     let cards =   document.body.querySelectorAll(".productCard__card")
    


     let prices = Object.values(cards).map(x =>{ 
       
       
        price = x.querySelector(".productCard__price").textContent?? null;
        condition= x.querySelector(".productChip").textContent.includes("NM", "LP");
        image = x.querySelector(".productCard__img").getAttribute("src");   
        title = x.querySelector(".productChip").getAttribute("data-producttitle");
        shadow = x.querySelector(".productChip").getAttribute("data-producttitle").includes("Shadowless")? true: false;
        nothing = x.querySelector(".productChip").getAttribute("data-producttitle").includes("(") ? true: false;
        jumbo =  x.querySelector(".productChip").getAttribute("data-producttitle").includes("Jumbo")
     
       
       
        return {
            title: title,
             price:  price,
             condition: condition,
             image: image,
             shadow: shadow,
             nothing: nothing,
             jumbo: jumbo
         }
     })

     


    const secondList = []
//Makes sure all the cards are in near mint condition, no null value, not a jumbo card
     for(i=0; i<prices.length; i++){
         if(prices[i].condition){
            if(!prices[i].shadow){
                if(prices[i].nothing){
                    if(!prices[i].jumbo){
            secondList.push(prices[i])
                    }
                }
            }
         }
     }
     return secondList
 })
 await browser.close()
 return await prices

}
;


pages = 32; // number of pages + 1


//Loops over every page in pagination(changes page number)
async function forloop(){
    console.log("start")
    finalList = []
    var pokemon = []

    for (let x=1 ; x<pages; x++){

        //Calls scrape function
        const portion = await scrape(x)
        //pushes the return value to FinalList
        finalList.push(portion)         
     }
     console.log(finalList)
     console.log("first list ade")
     //Concatinates the seperate arrays in the array into one
     for (let i = 0; i<finalList.length; i++){
         
         pokemon = pokemon.concat(finalList[i])
         
     }
//loops over new list of pokemon cards, calls the analyser function on each card
cards =[]
     for (const pok of pokemon){
        Title = pok.title
        price = pok.price
        image = pok.image
        const indCard = await analyser(Title, price, image)
        postCardData( await indCard)
        //pushes the result into the cards array
        cards.push(indCard)
     } 

     console.log("finished")
     

     
     // console.log( cards)


} 


let browser;

//Analyser function to find market price of individual card
async function  analyser (Title, price, image)  {
    browser = await puppeteer.launch({headless: true});
    const [page] = await browser.pages();
    const url = 'https://www.ebay.ca/b/Individual-Collectible-Card-Game-Cards/183454/bn_1893526'
    await page.goto(url, {waitUntil: "domcontentloaded"});


  

//go to ebay page type, type in the title, add selectors
const search = await page.waitForSelector('#gh-ac')
await search.type(Title.replace(/[)].*[[]/, ' ['))
const searchBtn = await page.waitForSelector('#gh-btn')
await searchBtn.evaluate(b => b.click())
await page.waitForSelector('[aria-label="Sold Items"]')
await page.click('[aria-label="Sold Items"]')
await page.waitForSelector('[aria-label="Completed Items"]')
await page.click('[aria-label="Completed Items"]')



// const graded = await page.waitForSelector('[aria-label="No"]')
// await graded.evaluate(b => b.click()) 

await page.waitForSelector('.s-item');


//get prices evaluation
 let  prices = await page.evaluate((Title) => {
    list = []
   finalList =[]
    newList = []    

    
    

    const items =  document.querySelectorAll(".s-item")


    //blacklist of what keywords not to include in titles
    const blacklist = ["PSA","psa","CGA", "cga", "Online", "DIGITAL", "CGC","cgc", "bgs", "BGS", "and", "hp", "HP"]


    //function that finds the id number on the pokemon card from the title, and checks ebay title to make sure it is present
    var regExp = /\(([^)]+)\)/
    var x = regExp.exec(Title)

    //finds all listings and creates objects of them
    for (const item of  items) {


        list.push(

            {
                title: item.querySelector(".s-item__title").innerText.includes(x[1]) ,   
                price: item.querySelector(".s-item__price").innerText.replace('C $', ''),
                graded:   blacklist.some(el =>  item.querySelector('.s-item__title').innerText.includes(el)),
                actualPrice: item.querySelector(".s-item__price .STRIKETHROUGH") ? true : false,
                contains: item.querySelector(".s-item__title").innerText.split('/').length - 1

            }
        )
    }

//creates array of objects for the listings
    const result =  list.map(value => ({
        title:value.title,
        price:parseFloat(value.price),
        graded:value.graded,
        actualPrice: value.actualPrice,
        contains:value.contains
    }))
    

  


//gets the information of the first 6 listings, for loop that filters down the results to the most accurate ones
for (i = 0; i<6; i++){
    
   
    if(result[i]){
    if(result[i].title){
      
        
            if(!result[i].graded){
                if(!result[i].actualPrice){
                    
                    if(result[i].contains <= 1){
            finalList.push(result[i])
                    
                }
            }
       }
        }
    }
    } 


   //gets the sum of the prices
   const sum =  finalList.reduce((accumulator,object) => {
        return accumulator + +object.price
    }, 0) 
        const finalSum =  (sum/finalList.length).toFixed(2)
       return finalSum
    }, Title) 

//closes browser after some time to make sure all the funcitons are complete
    await new Promise(resolve => setTimeout(resolve, 4000))

   await browser.close()


   //returns the prices
    await new Promise(resolve => setTimeout(resolve, 2000))

        return {
            title: Title,
            ebayPrice: `${ await prices} CAD`,
            trnPrice: price,
            image: image,
        
        }
    
    
    


   



     //with the ten cards chedck all possibilities with await

       


}  

//posts the card data to the databases
async function postCardData(card){
    let payload = {title: card.title, ebayPrice:` $${card.ebayPrice}`, trnsprice:card.trnPrice, image:card.image}
    let res = await axios.post('http://localhost:3001/all/', payload)
    let data = res.data
    console.log(data)
}

//when called, deletes allobjects in databse and reruns the funcitons above, creating a new databse
async function updatePrices(){
    console.log("started")


  const response = await  axios.get("http://localhost:3001/all/cards")
  

    
     cardData = await response.data

     console.log(cardData)



     cardData.forEach(function (card) {
        axios.delete(`http://localhost:3001/all/${card._id}`).then(console.log("Succesfully deleted")).catch((err) => {
            console.error("there has been an error deleting data:", err)
          }) 
     
     } )
;

forloop()

}






//calls ever hour

  function callEveryHour() {
    updatePrices()
    setInterval(updatePrices, 1000 *60 *60*4);
}


// forloop()

callEveryHour()

//Maybe add feature that lists all listings thatt are below market price



