const express = require("express");
const router = express.Router();
const Blog = require('../models/blog');

//get Request
router.get("/", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 }) // -1 = descending order
    .then((result) => {
      res.render("index", { title: "All Blog", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

//post Request
router.post("/", (req, res) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
});

//get create-blog
router.get("/create", (req, res) => {
    res.render("create", { title: "Create" });
});
  
//get blog-id request
router.get("/:id", (req, res) => {
  //take the param id
  const id = req.params.id;

  Blog.findById(id)
    .then((result) => {
      res.render("details", { title: "Blog Details", blog: result });
    })
    .catch((err) => {
      res.render("404", { title: "Create" });
    });
});

//delete blog-id request
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
});

//export router
module.exports = router;
