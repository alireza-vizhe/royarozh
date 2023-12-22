const mongoose = require("mongoose");

const Post = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 4,
        max: 50
    },
    status: {
        type: String,
        required: true,
        enum: ['private', 'public']
    },
    description: {
        type: String,
        required: true,
        min: 50,
        max: 800
    },
    nameImg: String,
    img: {
        data: Buffer,
        contentType: String,
    },
    price: {
        type: String,
        required: true
    },
    offer: {
        type: String,
    },
    // userD: {
    //     type: String,
    //     required: true
    // },
    visits: {
        type: Number,
        default: 0
    },
    totalStudents: {
        type: Number,
        default: 0
    },
    comments: {
        type: Array,
        default: []
    },
    commenterName: {
        type: Array,
        default: []
    },
    commentedDate:{
        type: Date,
        default: Date.now
    },
    answerComments: {
        type: Array,
        default: []
    },
    likes: {
        type: Number,
        default: 0
    },
    likers: {
        type: Array,
        default: []
    },
    category: {
        type: String,
        required: true
    },
    sells: {
        type: Array,
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Post', Post)