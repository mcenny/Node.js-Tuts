const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const { render } = require('ejs')
const blogRoutes = require('./routes/blogRoutes')


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
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))


app.get('/all-blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
    .then((result) => {
        res.send(result)
    })
    .catch((error) => {
        console.log('some error in fetching all blogs')
    })
});

app.use('/blogs', blogRoutes)

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
    // // res.sendFile('./views/index.html', {root: __dirname}) 
    // const blogs = [
    //     {title: 'Lorem ipsum dolor sit amet', snippet: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.'},
    //     {title: 'Lui minim labore adipisicing minim', snippet: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.'},
    //     {title: 'Ladipisicing minim sint cillum sint', snippet: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.'}
    // ]
    // res.render('index', {title: 'Home', blogs})
    res.redirect('/blogs');
})

app.get('/about', (req, res)=>{
    // res.sendFile('./views/about.html', {root: __dirname})
    res.render('about', {title: 'About'})
})

app.get('/about-me', (req, res)=>{
    res.redirect('/about')
})

app.use((req, res) => {
    res.status(404).render('404', {title: '404'})
})