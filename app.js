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
const { defaultItems, Item, newListItems } = require("./model/defaultitem");

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

app.get("/list/:listUrl", function (req, res) {
  const { listUrl } = req.params;
  List.findOne({ url: listUrl }, function (err, foundList) {
    if (err) {
      console.log(err);
    }
    res.render("list", { data: foundList });
  });
});

app.post("/delete/list", function (req, res) {
  const { listName, listAuthor, listId, listUrl } = req.body;
  List.findOneAndDelete(
    {
      name: listName,
      _id: listId,
      url: listUrl,
      author: listAuthor,
    },

    function (err) {
      if (!err) {
        console.log("deleted list " + listName);
        res.redirect("/user/" + listAuthor);
      } else {
        console.log(err);
      }
    }
  );
});

app.post("/new/list", function (req, res) {
  // console.log(req.body);
  const { newListAuthor, newListName } = req.body;
  List.find({ author: newListAuthor }, function (err, foundList) {
    if (err) {
      throw err;
    }
    if (foundList.length) {
      //Create a new list
      const list = new List({
        url: shortid.generate(),
        author: newListAuthor,
        name: newListName,
        items: newListItems,
      });
      list.save();
      // console.log(list._id);
      console.log("new user list saved by " + newListAuthor);
      res.redirect("/user/" + newListAuthor);
    }
  });
});

app.post("/delete/item", function (req, res) {
  const checkedItemId = req.body.checkbox;
  const { listName, listUrl, listAuthor } = req.body;

  console.log(req.body);
  List.findOneAndUpdate(
    {
      name: listName,
      author: listAuthor,
      url: listUrl,
      $pull: { items: { _id: checkedItemId } },
    },

    function (err, foundList) {
      if (!err) {
        res.redirect("/list/" + listUrl);
      }
    }
  );
});

app.post("/new/item", function (req, res) {
  const { listAuthor, listId, newItem, listName, listUrl } = req.body;
  console.log(req.body);

  List.findOneAndUpdate(
    {
      name: listName,
      url: listUrl,
      author: listAuthor,
    },

    function (err, foundList) {
      console.log(foundList);
      if (!err) {
        
        foundList.items.push({ name: newItem });
        foundList.save();
        console.log("new item saved");
        res.redirect("/list/" + listUrl);
      } else {
        console.log(err);
      }
    }
  );
  res.redirect("/list/" + listUrl);
});


app.get("/login", function (req, res) {
  res.render("login");
});

app.post("/login", function (req, res) {
  const { username } = req.body;
  List.find({ author: username }, function (err, foundList) {
    if (err) {
      throw err;
    }
    if (!foundList.length) {
      //Create a new list
      const list = new List({
        url: shortid.generate(),
        author: username,
        name: "tutorial",
        items: defaultItems,
      });
      list.save();
      // console.log(list._id);
      console.log("tutorial list saved by " + username);
    }
  });
  res.render("login");
});

app.get("/user/:username", (req, res) => {
  const { username } = req.params;
  List.find({ author: username }, "_.id url  author name ", function (
    err,
    foundTitles
  ) {
    if (err) {
      throw err;
    } else if (foundTitles.length) {
      //  console.log(foundTitles)
      res.render("user", {
        titleData: foundTitles,
      });
    }
  });
});

app.get("/exists/:user", function (req, res) {
  // console.log(req.params);
  const { user } = req.params;
  List.exists({ author: user }, function (err, result) {
    if (err) {
      res.json(err);
    } else if (result) {
      // console.log("true");
      res.json(true);
    } else if (!result) {
      //  console.log("false");
      res.json(false);
    }
  });
});

const PORT = 3000 || process.env.PORT;
app.listen(PORT, function () {
  console.log("Server started on port " + PORT);
});
