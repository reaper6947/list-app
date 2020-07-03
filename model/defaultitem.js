const mongoose = require("mongoose");

const itemsSchema = {
    name: String,
  };

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Welcome to your watchlist!",
});

const item2 = new Item({
  name: "Hit the + button to add a new item.",
});

const item3 = new Item({
  name: "<-- Hit this to delete an item.",
});

const item4 = new Item({
  name: " Hit the delete items checkbox to delete items.",
});

const defaultItems = [item1, item2, item3, item4];



const info1 = new Item({
  name: "You can share this page link with anybody and they can only view"
});

const info2 = new Item({
  name: "Go to main page to see your account access link(working on it)  "
});

const info3 = new Item({
  name: "Visit the tutorial list for more info "
});




const newListItems = [info1, info2, info3];





module.exports = { defaultItems , Item ,newListItems };