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
const shortid = require('shortid');
const List = require("./model/listschema");
const { defaultItems, Item } = require("./model/defaultitem");

//connect to database

mongoose.connect(
  process.env.DBURL,
  { useNewUrlParser: true, useUnifiedTopology: true , useFindAndModify: false },
  (err) => {
    console.log("mongodb connected", err);
  }
);


app.get("/", function (req, res) {
  Item.find({}, function (err, foundItems) {
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully savevd default items to DB.");
        }
      });
      res.redirect("/");
    } else {

      res.render("list", { listTitle: "Today", newListItems: foundItems });
    }
  });
});

/*

app.get("/:customListName", function (req, res) {
  const customListName = req.params.customListName ;

  List.findOne({ name: customListName }, function (err, foundList) {
    if (!err) {
      if (!foundList) {
        //Create a new list
        const list = new List({
          name: customListName,
          items: defaultItems,
        });
        list.save();
        res.redirect("/" + customListName);
      } else {
        //Show an existing list

        res.render("list", {
          listTitle: foundList.name,
          newListItems: foundList.items,
          titleId: foundList._id,
        });
      }
    }
  });
});
*/

app.post("/", function (req, res) {
  console.log(req.body);
  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name: itemName,
  });

  if (listName === "Today") {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({ name: listName }, function (err, foundList) {
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName);
    });
  }
});




app.post("/delete", function (req, res) {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;
  console.log(req.body);
  if (listName === "Today") {
    Item.findOneAndDelete(checkedItemId, function (err) {
      if (!err) {
        console.log("Successfully deleted checked item.");
        res.redirect("/");
      }
    });
  } else {
    List.findOneAndUpdate(
      { name: listName },
      { $pull: { items: { _id: checkedItemId } } },
      function (err, foundList) {
        if (!err) {
          res.redirect("/" + listName);
        }
      }
    );
  }
});



app.post("/login", function (req, res) {
  let { username } = req.body;
  console.log(req.body);
  res.render("login");
});


app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/user",(req,res)=> {
  res.render("user");
})






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




app.post("/edit", function (req, res) {
  console.log(req.body);
  res.redirect("/")
});






const PORT = 3000 || process.env.PORT;
app.listen(PORT, function () {
  console.log("Server started on port "+ PORT );
});
