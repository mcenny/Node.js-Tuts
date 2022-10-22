const fs = require('fs');

const readStream = fs.createReadStream('./Docs/doc-3.txt', {encoding: 'utf-8'});
const writeStream = fs.createWriteStream('./Docs/doc-5.txt', {encoding: 'utf-8'});

// readStream.on('data', (chunk)=>{
//     console.log('\n\n---New Chunk---\n\n')
//     console.log(chunk, ':: chunk of data')

//     writeStream.write(`\n\n\n New Chunk \n\n\n ${chunk}`)
// })

readStream.pipe(writeStream);