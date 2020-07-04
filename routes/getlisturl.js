const List = require("../model/listschema");

const func =  function (req, res) {
    const { listUrl } = req.params;
    List.findOne({ url: listUrl }, function (err, foundList) {
      if (err) {
        console.log(err);
      }
      res.render("list", { data: foundList });
    });
}
  

module.exports = func;