const express = require("express");
const mysql = require("mysql");
const app = express();
const blogRouterAppMain = require('./../routes/blogsRoutes.js')
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
const generateSessionId = require("./../functions/generateIDForLogedUsers.js");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "blogs",
});

app.post("/signup_zahtev", (req: { body: { title: any; snippet: any; blog_body: any; }; }, res: { send: (arg0: string) => void; }) => {
  const sql =
    "INSERT INTO blogovi (`id`,`title`, `snippet`, `blog_body`) VALUES (?)";
  const ID = generateSessionId();
  const values = [ID, req.body.title, req.body.snippet, req.body.blog_body];

  db.query(sql, [values], (err: any, data: string) => {
    if (err) {
      console.log(err);
      return res.send("Error");
    }
    res.send(data);
  });
});

app.get("/", (req: any, res: { redirect: (arg0: string) => void; }) => {
  res.redirect("/blogs");
});
app.get("/about", (req: any, res: { render: (arg0: string, arg1: { title: string; }) => void; }) => {
  res.render("about", { title: "About" });
});

//middlewares
app.use((req: { db: any; }, res: any, next: () => void) => {
  req.db = db;
  next();
});
app.use(blogRouterAppMain)
app.use((req: any, res: { status: (arg0: number) => { (): any; new(): any; render: { (arg0: string, arg1: { title: string; }): void; new(): any; }; }; }) => {
  res.status(404).render("404", { title: "Page not exist!" });
});
module.exports = app;
