const fs = require('fs');

const largeReadStream = fs.createReadStream('./docs/blog2.txt');

largeReadStream.on('data',(chunk)=>{
        console.log(chunk.toString())
    
})