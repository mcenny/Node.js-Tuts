const http = require('http');
const fs = require('fs')

const server = http.createServer((req, res) => {
    console.log(req.url, req.method)

    let path = './views/'
    switch

    res.setHeader('content-Type', 'text/html')
    fs.readFile('./views/index.html', (error, data) => {
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