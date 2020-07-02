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


module.exports = { defaultItems , Item };