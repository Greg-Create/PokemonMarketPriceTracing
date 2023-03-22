const express = require('express')
const router = express.Router()
const Card = require('../models/Card')



//Get Cards
router.get("/cards", async (req,res) => {

    
        const cards = await Card.find()

        res.json(await cards)
  

})



//Post Cards
router.post("/", async (req,res) => {

        const card = new Card({
            title: req.body.title,
            ebayPrice: req.body.ebayPrice,
            trnsprice: req.body.trnsprice,
            image: req.body.image,
            links: req.body.links,   

        })

        try{
            const savedCard = await card.save()
            res.json(savedCard)
        }catch(err){
            res.json({message: err})
        }

        

    })



//Specfic card

router.get('/:cardId', async (req,res) => {
  
  
  try{  const post = await  Card.findById(req.params.cardId)
  res.json(post)
  }catch(err){
      res.json({message:err})
  }


})



//delete Card
router.delete('/:cardId', async (req,res) => {
    try{
        const removedCard = await Card.remove({_id: req.params.cardId})
        res.json(removedCard)
    }catch(err){
        res.json({message: err})
    }
})


//Update Card


router.patch('/:cardId', async (req,res) => {
    try{
        const updatedCard = await Card.findOneAndUpdate(
        {_id: req.params.cardId}, 
        {$set: {trnsprice: req.body.trnsprice}})
        
        
        res.json(updatedCard)
    }catch(err){
        res.json({message: err})
    }
})


module.exports = router