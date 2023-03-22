const axios = require ("axios")
const Card = require ("./models/Card")
const Analyser = require("./price_analyser")
const puppeteer = require("puppeteer")













/* async function postCardData(){
    let payload = {title:"CHARIZARD", ebayPrice:` $47`, trnsprice:"52", image:"Image"}
    let res = await axios.post('http://localhost:3001/all/', payload)
    let data = res.data
    console.log(data)
}


async function updateData () {
    console.log("start")
    
    let res = await axios.get('http://localhost:3001/all/cards')
    //const cards = await Card.find()
let cards = res.data

console.log(res.data)



for (var card of cards) {
    console.log(card.title)
    await Analyser.analyser(card.title).then( async function res (res) {
        console.log(res)
        await Card.findOneAndUpdate(
            {title: card.title},
            {
            title: card.title,
            ebayPrice: res[0],
            links: `${res[1]}`
    
           }, 
           ).then(data => {
            console.log("Data", data);

        }, err => {
            console.log("Error Update in Index1", err);
        }); 
     },
     
  
       
       )
} */

    /* await cards.forEach( async card => {
        console.log(card.title)
         await Analyser.analyser(card.title).then(res => {
            console.log(res)
         })
      let newCard =  await Analyser.analyser(card.title)
       await Card.findOneAndUpdate(
        {title: card.title},
        {
        title: newCard.title,
        ebayPrice: newCard.ebayPrice,
        links: newCard.links

       }, {
        upsert:true
       }
       )  
    })
}*/



//updateData()
//postCardData()


async function checkExistance(title) {
    const number = title.substring(title.indexOf('(')+1, title.indexOf(')'))
    browser = await puppeteer.launch({headless: false});
    const [page] = await browser.pages();
    const url = 'https://hairyt.com/pages/pokemon-advanced-search?q=&game=pokemon&availabilty=true&setNames=&rarities=&types=&pricemin=&pricemax=&page=1&order='
    await page.goto(url, {waitUntil: "domcontentloaded"});
   
   const search = await page.waitForSelector(".searchBar__input")
   await search.type(title)
   const searchBtn = await page.waitForSelector(".m-siteSearch__button")
   await searchBtn.evaluate(b => b.click())
   //const results = await page.waitForSelector(".productCard__card ").then(console.log("Card exists")).catch(console.log("Card does not exist"))


try{
    await page.waitForSelector(".productCard__card ")
    console.log("Card exists")
    await browser.close()
}catch(err){
    console.log("card doesn't exist")
    await browser.close()

}





    /* if(results){


 console.log("Card exists")
   }else{
    console.log("Doesn't Exist")
   } */

}

//checkExistance("Char (XY Evolutions Prerelease) (11/108)")


bob=1

var x  = [bob]

y=2
x.push([y])

console.log(x)