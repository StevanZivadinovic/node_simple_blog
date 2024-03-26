//this is node js version of server
const http = require("http");
const fs = require("fs");
const lodash = require('lodash');
const server = http.createServer((req, res) => {

    //lodash, koristi se za neke dodatne funkcije kao ova ispod, pogledaj dokumentaciju
  const num=lodash.random(0,20);//daje ranom broj izmenju 0 i 20
    console.log(num)


  res.setHeader("Content-Type", "text/html");
  let path = './views/'
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode=200;
      break;
    case "/about":
        path += "about.html";
        res.statusCode=200;
      break;
      case "/about-me":
        res.statusCode=301;
        res.setHeader('Location','/about');//redirektovanje 
        res.end();
      break;
    default:
      path += "404.html";
      res.statusCode=404;
      break;
  }
  fs.readFile(path, (err, data) => {
   if(err){
    console.log(err);
   }else{
    res.write(data);
    res.end();
   }
  });
});

server.listen(3000, "localhost", () => {
  console.log("listening for request on port 3000");
});
