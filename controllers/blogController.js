const Blog = require('../models/blog')
// blog_index, blog_details, blog_create_get, blog_create_post, blog_delete

const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
    .then((result) => {
        res.render('blogs/index', {title: 'All Blogs', blogs: result})
    })
    .catch((error) => {
        console.log('there was an error fetching the data from the database')
    })
}

const blog_details = (req, res) => {
    const id = req.params.id
    Blog.findById(id)
    .then((result) => {
        res.render('blogs/details', {blog: result, title: result.title})
    })
    .catch((error) => {
        res.status(404).render('../views/404', {title: 'Blog not found'})
    })
}

const blog_create_get = (req, res) => {
    res.render('blogs/create', {title: 'Create a new Blog'})
}

const blog_create_post = (req, res) => {
    const blog = new Blog(req.body)
    blog.save()
    .then((result) => {
        res.redirect('/blogs')
    })
    .catch((error) => {
        console.log(error)
    })
}

const blog_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then((result) => {
        res.json({redirect: '/blogs'})
    })
    .catch((error) => {
        console.log(error)
    })
}


module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}