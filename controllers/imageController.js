var mongoose = require("mongoose"),
  Image = mongoose.model("Image");

exports.get_all_images = function (req, res, next) {
  Image.find({}, function (err, images) {
    if (err) {
      res.send(err);
    }
    res.json(images);
  });
};

exports.upload_image = function (req, res, next) {
  var new_image = new Image(req.body);
  console.log(req.body);
  console.log(new_image);
  new_image.save(function (err, image) {
    if (err) {
      res.send(err);
    }
    res.json(image);
  });
};
