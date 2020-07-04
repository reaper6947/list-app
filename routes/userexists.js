
const List = require("../model/listschema");


const func =  function (req, res) {
    // console.log(req.params);
    const { user } = req.params;
    List.exists({ author: user }, function (err, result) {
      if (err) {
        res.json(err);
      } else if (result) {
        // console.log("true");
        res.json(true);
      } else if (!result) {
        //  console.log("false");
        res.json(false);
      }
    });
}
  

module.exports = func