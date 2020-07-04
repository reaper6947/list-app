const List = require("../model/listschema");

const func = function (req, res) {
    const { listAuthor, listId, newItem, listName, listUrl } = req.body;
    //console.log(req.body);
  
    List.findOneAndUpdate(
      {
        name: listName,
        url: listUrl,
        author: listAuthor,
        _id: listId,
      },
      { $push: { items: [{ name: newItem }] } },
      function (err, foundList) {
        if (!err) {
          console.log("new item saved");
          res.redirect("/list/" + listUrl);
        } else {
          console.log(err);
        }
      }
    );
}
  
module.exports = func