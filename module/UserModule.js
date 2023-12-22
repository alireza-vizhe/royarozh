const mongoose = require("mongoose");

const User = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        min: 4,
        max: 50
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 24
    },
    buys: {
        type: Array,
        default: []
    },
    addres: {
        type: String
    }

})

module.exports = mongoose.model('User', User)