const express = require("express");
const mysql = require("mysql");
const app = express();
const blogRouter = require('./routes/blogsRoutes.js')
app.listen(3000);

//register new engine
app.set("view engine", "ejs");

//middlewares
app.use(express.static("public"));
app.use(express.json());
// app.use((req, res, next)=>{
//     console.log('every time this middleware renders');
//     next()//ako ne stavis next() ne cita kod dalje, blokira refresh
// })
const generateSessionId = require("./functions/generateIDForLogedUsers.js");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "blogs",
});

app.post("/signup_zahtev", (req, res) => {
  const sql =
    "INSERT INTO blogovi (`id`,`title`, `snippet`, `blog_body`) VALUES (?)";
  const ID = generateSessionId();
  const values = [ID, req.body.title, req.body.snippet, req.body.blog_body];

  db.query(sql, [values], (err, data) => {
    if (err) {
      console.log(err);
      return res.send("Error");
    }
    res.send(data);
  });
});

app.get("/", (req, res) => {
  res.redirect("/blogs");
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//middlewares
app.use((req, res, next) => {
  req.db = db;
  next();
});
app.use(blogRouter)
app.use((req, res) => {
  res.status(404).render("404", { title: "Page not exist!" });
});
module.exports = app;
