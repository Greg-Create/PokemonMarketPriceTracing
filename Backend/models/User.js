const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
email: {type: String, required: true},
password: {type: String, required: true },
list : [{link:String}]
})

module.exports = mongoose.model('users' ,userSchema )