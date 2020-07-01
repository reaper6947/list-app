const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  url: String,
  author: String,
  name: String,
  items: [{ name: String }],
});

const List = mongoose.model("List", listSchema);
module.exports = List;