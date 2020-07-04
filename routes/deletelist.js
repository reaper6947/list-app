const List = require("../model/listschema");


const func = function (req, res) {
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
}
  
module.exports = func;