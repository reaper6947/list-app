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
const List = require("./model/listschema");
const { defaultItems,  newListItems } = require("./model/defaultitem");

//connect to database

mongoose.connect(
  process.env.DBURL,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  (err) => {
    console.log("mongodb connected", err);
  }
);

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/list/:listUrl",require("./routes/getlisturl"));
app.post("/delete/list", require("./routes/deletelist"));
app.post("/new/list", require("./routes/postlist"));
app.post("/delete/item", require("./routes/deleteitem"));
app.post("/new/item", require("./routes/postitem"));
app.post("/login",require("./routes/postlogin") );
app.get("/user/:username",require("./routes/gettitle"));
app.get("/exists/:user", require("./routes/userexists"));




const PORT = 3000 || process.env.PORT;
app.listen(PORT, function () {
  console.log("Server started on port " + PORT);
});
