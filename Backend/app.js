const express = require('express')
const cors  = require("cors")
const mongoose = require('mongoose')
const  bodyParser = require('body-parser')
const analyser = require('./price_analyser')
const Card = require('./models/Card')
const axios = require("axios")
const puppeteer = require("puppeteer")
const {protect} = require('./MiddleWare/authMidleWare')




require('dotenv/config')

const app = express()


app.use(bodyParser.json())
app.use(cors({origin: true, credentials: true}));




//Import Routes

const cardRoute = require('./routes/cards')
const userRoute = require('./routes/users')

app.use('/all', cardRoute)
app.use('/api', userRoute)


mongoose.connect(
    process.env.DB_CONNECTION,
{useNewUrlParser: true}, 
 () => console.log('connected to database'))


app.listen(3001, ()=> console.log("Running app"))

app.post('/search', async (req,res) => {
   
    let title = req.body.title.trim()
    let search = await Card.find({title: {$regex: new RegExp('^'+title+'.*','i')}}).exec()
    search = search.slice(0,5)


    res.send({title:search })


 
},
app.post('/analyser', async (req,res) => {
    console.log("loading")
    titles = req.body.title
    titles1 = titles.toLowerCase()
    title2 = titles1.replace(/\s+/g, ' ' ).trim()


    

console.log(title2)
     Card.findOne({title: title2}, function(err,example){
        if(err) console.log(err);
        if(example){
            console.log("Already exists")
        }else{
            console.log("New")
            checkExistance(titles)
        }
     
            
            
           
        


        async function checkExistance(title) {
            const number = title.substring(title.indexOf('(')+1, title.indexOf(')'))
            browser = await puppeteer.launch({headless: true});
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
            await console.log("Card exists")
          // const img = await page.waitForSelector(".productCard__img") 
          await page.waitForSelector(".productCard__img")
        const imgsrc =  await page.$eval('img.productCard__img[src]', img => img.src)
            await functiontrue(title, imgsrc)
            return imgsrc

    
     
        }catch(err){
           await console.log("card doesn't exist")
           console.log(err)

    
        
        }

        await browser.close()

    
    }
   
   
        async function functiontrue (title,imgsrc)  {
            var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

var today = mm + '/' + dd + '/' + yyyy;

            x = title.toLowerCase()

           let result= await analyser.analyser(title)
    let payload = {title:x, ebayPrice: {price:result[0], date:today},links: result[1] , image:imgsrc}
   let resp = await axios.post('http://localhost:3001/all/', payload)
    let data = resp.data

    result.push(imgsrc)
    console.log(result)
    await res.send(result) 




        }
    })
        
  
   
    
   
 
        })

)

  

















//code goes here that will update card data every 6 hours.    
 
 
    async function updateData () {
    console.log("starting update")    
    let res = await axios.get('http://localhost:3001/all/cards')
    //const cards = await Card.find()
let cards = res.data

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

var today = mm + '/' + dd + '/' + yyyy;



for (var card of cards) {
    console.log(card.title)
    
   await analyser.analyser(card.title).then( async function res (res) {
     
       card.ebayPrice.push(
        {price: res[0],
        date:today,
        }
        )
        console.log(card.ebayPrice)
        await Card.findOneAndUpdate(
            {title: card.title},
            {
            title: card.title,
            ebayPrice:card.ebayPrice,
            links: res[1]
    
           }, 
           ).then(data => {
            console.log("Data", data);

        }, err => {
            console.log("Error Update in Index1", err);
        }); 
     },
     
  
       
       )
}
console.log("Update Finished")

}

    

setInterval(updateData,2160000)




