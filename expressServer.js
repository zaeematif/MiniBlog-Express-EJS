const express = require("express");
const mongoose = require("mongoose");
//custom routes
const blogRoutes = require('./routes/blogRoutes')
const { render } = require("ejs");

//express app
const app = express();

// connect to mongoDb
const dbURI =
  "mongodb+srv://zaeemAtif:Higuysnorway321@blog-app.ytqauao.mongodb.net/blogs-app?retryWrites=true&w=majority&appName=blog-app";
//connect to Database
mongoose
  .connect(dbURI)
  .then((res) => {
    console.log("DB Connected");
    //if db connected, listen to server
    //listen to this server with port number : 4040
    app.listen(4040);
  })
  .catch((err) => console.log(err));

//registor view engine
app.set("view engine", "ejs");

//middleware function
app.use(express.static("public")); // -- make public folder files accessible to cilent request
app.use(express.urlencoded()); //takes the url data & passes that to request object

// //saving data on the DB
// app.get("/add-blog", (req, res) => {
//   //creating a new instance of Blog Model
//   const blog = new Blog({
//     title: "New Blog 2",
//     snippet: "Hey this a paragraph snippet",
//     body: "Lorem ipsum dolor, sit amet consectetur adipisicing elitQuia quibusdam quaerat illo a modi tenetur ut blanditiis, illum quo consectetur recusandae excepturi natus impedit rem, tempora cum fuga quae in.",
//   });

//   blog.save() //mongoDB takes the Blog Model, then saves it into 'blogs' collection
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       res.send(err);
//     });
// });

// //getting all data from DB
// app.get("/all-blog", (req, res) => {
//   Blog.find()
//     .then((result) => res.send(result))
//     .catch((err) => res.send(err));

//   //Blog.findById("id");
// });

//routing with 'GET' method
//home
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

//about
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//redirecting
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

//all blog routes - GET, POST, PUT, DELETE
app.use('/blogs', blogRoutes);

//404 - must be at the end | it's like a catcher
app.use((req, res) => {
  res.status(404).render("404", { title: "Create" });
});
