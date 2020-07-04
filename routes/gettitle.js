const List = require("../model/listschema");


 const func = function (req, res) {
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
 }
  
module.exports = func