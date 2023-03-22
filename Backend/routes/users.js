const express = require('express')
const router = express.Router()
const User = require("../models/User")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

router.post('/register',async (req, res) => {
    console.log(req.body)

    try{
        const hashed = await bcrypt.hashSync('req.body.password', 10) 

        const user = await User.create({
            email: req.body.email,
            password: hashed,
        })

       let jwttoken = await generateToken(user._id)
        res.json({status: 'User Created', user: true, token: jwttoken})
        res.cookie("jwt",jwttoken, {expire: new Date() +9999, httpOnly:true} )
    } catch (err){
         res.json({status: "error"})
    }
})

router.patch('/:userId', async (req,res) => {
    try{
        const updateUser = await User.updateOne(
        {_id: req.params.userId}, 
        {
            list: req.body.list
        })
        
        
        res.json(updatedCard)
    }catch(err){
        res.json({message: err})
    }
})


router.post('/login',async (req, res) => {
    console.log(req.body)

 
        const user = await User.findOne({
           email: req.body.email
        
        })

        if(user&& ( bcrypt.compare(req.body.password, user.password)) ){
            let jwttoken = await generateToken(user._id)
            res.cookie("jwt",jwttoken, {expire: new Date() +9999, httpOnly:true} )

            res.json({status:"Succesful Login", user:true, token:  jwttoken})
        }else{
        return res.json({status:'error', user:false})
     }
})


//Generate Token

const generateToken = (id)  => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = router