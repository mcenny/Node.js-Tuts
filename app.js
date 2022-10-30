const express = require('express')

const app = express()

app.set('view engine', 'ejs')

app.listen(3000)

app.get('/', (req, res)=>{
    // res.sendFile('./views/index.html', {root: __dirname}) 
    res.render('index')
})

app.get('/about', (req, res)=>{
    // res.sendFile('./views/about.html', {root: __dirname})
    res.render('about')
})

app.get('/about-me', (req, res)=>{
    res.redirect('/about')
})

app.get('/blogs/create', (req, res)=>{
    res.render('create')
})

app.use((req, res) => {
    res.status(404).render('404')
})