const fs = require('fs');

fs.mkdir('./assets', (error) => {
    if(error){
        console.log(error)
    }
    console.log('directory created')

})