const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blog')


const app = express()
const dbURI = 'mongodb+srv://mcenny:newpassword123@nodetuts.cbzlcha.mongodb.net/node-tuts?retryWrites=true&w=majority'

// mongoose.connect(dbURI, { useNewUrlParser: true,useUnifiedTopology: true})   // to stop deprecated error
mongoose.connect(dbURI)
.then((result) => app.listen(3000))
.catch((error) => console.log('some error here: '))

// register view engine
app.set('view engine', 'ejs')

// middleware & static files
app.use(express.static('public'))
app.use(morgan('dev'))

// mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'New Blog 2',
        snippet: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
        body: 'Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.'
    });

    blog.save()
    .then((result) => {
        res.send(result)
    })
    .catch((error) => console.log('some error in saving the blog post'))
})

app.get('/all-blogs', (req, res) => {
    Blog.find()
    .then((result) => {
        res.send(result)
    })
    .catch((error) => {
        console.log('some error in fetching all blogs')
    })
});

app.get('/single-blog', (req, res) => {
    Blog.findById('63616259ea24195d9f8f7da0')
    .then((result) => {
        res.send(result)
    })
    .catch((error) => {
        console.log('some error occurred while fetching one blog')
    })
})

// routes
app.get('/', (req, res)=>{
    // res.sendFile('./views/index.html', {root: __dirname}) 
    const blogs = [
        {title: 'Lorem ipsum dolor sit amet', snippet: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.'},
        {title: 'Lui minim labore adipisicing minim', snippet: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.'},
        {title: 'Ladipisicing minim sint cillum sint', snippet: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.'}
    ]
    res.render('index', {title: 'Home', blogs})
})

app.get('/blogs', (req, res) => {
    Blog.find()
})

app.get('/about', (req, res)=>{
    // res.sendFile('./views/about.html', {root: __dirname})
    res.render('about', {title: 'About'})
})

app.get('/about-me', (req, res)=>{
    res.redirect('/about')
})

app.get('/blogs/create', (req, res)=>{
    res.render('create', {title: 'Create new blog post'})
})

app.use((req, res) => {
    res.status(404).render('404', {title: '404'})
})