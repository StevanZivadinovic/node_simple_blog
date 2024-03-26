const express = require('express');
const blogRouter = express.Router();



blogRouter.get("/blogs/create", (req, res) => {
    res.render("create", { title: "Create a new blog" });
  });

  blogRouter.get("/blogs", (req, res) => {
    const sql = "SELECT * FROM blogovi";
    req.db.query(sql, (err, data) => {
      if (err) {
        console.log(err);
      }
      const blogs = data;
      res.render("blogs", { title: "All blogs", blogs });
    });
  });
  blogRouter.delete("/delete_blog", (req, res) => {
    const sql = "DELETE FROM blogovi WHERE id = ?";
    const id = req.body.id;
    req.db.query(sql, [id], (err, data) => {
      if (err) {
        return res.status(500).json({ error: "Error deleting blog" });
      }
      res.json({ success: true });
    });
  });
  
  blogRouter.get('/blogs/:id',(req,res)=>{
    const sql = "SELECT * FROM blogovi WHERE id = ?";
    const id = req.params.id;
    req.db.query(sql, [id], (err, data) => {
      if (err) {
        return res.status(500).json({ error: "Error find blog" });
      }
      res.render("single_blog", { title: data.title, blog:data })
    });
  })
  module.exports = blogRouter;