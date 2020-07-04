const List = require("../model/listschema");

const func = function (req, res) {
    const { listName, listUrl, listAuthor,itemId } = req.body;
   // console.log(req.body);
    List.findOneAndUpdate(
      {
        name: listName,
        url: listUrl,
        author: listAuthor
      },
      {$pull: {  items:{ _id:itemId}}},
      
      function (err) {
        if (!err) {
          console.log("deleted item")
          res.redirect("/list/" + listUrl);
        } else {
          console.log(err)
        }
      }
    );
}
  

module.exports = func