const mongoose = require('mongoose')


const cardSchema = mongoose.Schema({
    title: {type :String,},
    ebayPrice: [{price: Number,
                date: {type:Date, default:Date.now}
            }],
    trnsprice: {type :String},
    image: {type: String},
    links: [{
        title: String,
        link: String,
        price: Number
    }],
    date: {type: Date,
        default:Date.now},
})




module.exports = mongoose.model('Pokemon-Cards' ,cardSchema )