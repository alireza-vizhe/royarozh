const mongoose = require("mongoose");

const Order = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        min: 4,
        max: 50
    },
    phone: {
        type: Number,
        required: true,
        // min: 8,
        // max: 24
    },
    products: {
        type: Array,
        // default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('Order', Order)