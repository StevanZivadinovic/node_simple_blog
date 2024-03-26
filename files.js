const fs = require('fs');

fs.readFile('./docs/blog1.txt',(req, res)=>{
    if(res){
        console.log(res.toString())
    }else{
        console.log(err);
    }
});

// fs.writeFile('./docs/blog1.txt','moj novi text3',(err)=>{
//     if(err){
//         console.log(err)
//     }else{
//         console.log('file is writen');
//     }
// });

// fs.mkdir('./assets',err=>{
//     if(err){
//         console.log(err)
//     }else{
//         console.log('folder is created!')
//     }
// })

// fs.rmdir('./assets',err=>{
//     if(err){
//         console.log(err)
//     }
//     console.log('delete folder');
// })