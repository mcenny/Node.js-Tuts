const http = require('http');
const fs = require('fs')

const server = http.createServer((req, res) => {
    console.log(req.url, req.method)

    let path = './views/'
    switch(req.url){
        case '/':
            path += 'index.html'
            res.statusCode = 200
            break
        case '/about':
            path += 'about.html'
            res.statusCode = 200
            break
        case '/about-me':
            res.statusCode = 301
            res.setHeader('Location', '/about')
            res.end()
            break
        default:
            path += '404.html'
            res.statusCode = 404
            break
    }


    res.setHeader('content-Type', 'text/html')
    fs.readFile(path, (error, data) => {
        if(error){
            console.log(error)
            res.end()
        } else{
            // you can put the data in the res.end() method if you are only returning one data
            // res.write(data)
            res.end(data)

        }
    })
});


server.listen(3000, 'localhost', () =>{
    console.log('listening for request on localhost port number 3000')
})