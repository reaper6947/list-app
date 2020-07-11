const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const app = express();
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/public/views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
const shortid = require("shortid");

//https auto upgrade
const checkHttps = require("./routes/httpsupgrade")
//app.all('*', checkHttps)


//connect to database
mongoose.connect(
  process.env.DBURL,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  (err) => console.log("mongodb connected",err)
);


app.get("/", (req, res) => {res.render("index")});
app.get("/login", (req, res) => {res.render("login")});
app.get("/list/:listUrl", require("./routes/getlisturl"));
app.get("/user/:username",require("./routes/gettitle"));
app.get("/exists/:user", require("./routes/userexists"));
app.post("/delete/list", require("./routes/deletelist"));
app.post("/new/list", require("./routes/postlist"));
app.post("/delete/item", require("./routes/deleteitem"));
app.post("/new/item", require("./routes/postitem"));
app.post("/login",require("./routes/postlogin") );




const PORT = 3000 || process.env.PORT;
app.listen(PORT, function () {
  console.log("Server started on port " + PORT);
});
