const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const { ProductModel } = require('./schema')

app.set('view engine', 'ejs')

app.use(express.static('public'));


app.get('/', function (req, res) {
    res.render('./Pages/home')
})

app.get('/addbook', function (req, res) {   
    res.render('./Pages/form')
})

app.post('/addbook', async function (req, res) {
    const book = req.body
    const newBook = new ProductModel(book)
    await newBook.save()
    res.render('./Pages/form')
})

app.get('/booklist', async function (req, res) {
    const book = await ProductModel.find()
    res.render('./Pages/books', {book : book})
})

app.get('/delete/:id', async function (req, res) {
    const id = req.params.id 
    var result = await ProductModel.deleteOne({_id : id})
    res.redirect('/booklist')
})

app.get('/edit/:id', async function (req, res) {
    const id = req.params.id 
    var book = await ProductModel.findById(id)
    res.render('./Pages/edit', {book})
})

app.post('/edit/:id', async function (req, res) {
    const id = req.params.id 
    const updatedBook = req.body
    console.log(updatedBook)
    const newBook = await ProductModel.findByIdAndUpdate(id,updatedBook,{new : true})
    res.redirect('/booklist')
})

app.listen(3000, ()=>{
    console.log('post : 3000')
})