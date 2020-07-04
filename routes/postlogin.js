const List = require("../model/listschema");
const shortid = require("shortid");
const { defaultItems,  newListItems } = require("../model/defaultitem");


const func =  function (req, res) {
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
}
 module.exports = func