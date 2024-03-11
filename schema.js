const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bookstore')
.then(() => console.log('Connected!'));

const ProductSchema = new mongoose.Schema({
    bookid: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    booktype: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    publishdate: {
        type: Date,
        required: true,
    },
    author: {
        type: String,
        required: true,
    }
}, {timestamps : true})

const ProductModel = mongoose.model('Books',ProductSchema)

module.exports = { ProductModel }

