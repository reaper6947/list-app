const List = require("../model/listschema");
const shortid = require("shortid");
const { defaultItems,  newListItems } = require("../model/defaultitem");




const func = function (req, res) {
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
}
  module.exports = func