var mongoose = require("mongoose"),
  Image = mongoose.model("Image"),
  User = mongoose.model("User");

exports.get_all_images = function (req, res, next) {
  const { user } = req.query;
  console.log(user);
  Image.find({}, function (err, images) {
    if (err) {
      res.status(400);
      res.send(err);
    }
    res.status(200);
    res.send(images);
  });
};

/*
get all images for a specific user
@param {UserId}
*/
exports.get_all_images_by_user_id = async function (req, res, next) {
  await User.findById(req.params.id)
    .populate("images")
    .exec((err, im) => {
      res.status(200);
      res.send(im.images);
    });
};

/*
@body {Image}
*/
exports.upload_image = function (req, res, next) {
  var new_image = new Image(req.body);
  new_image.save(function (err, image) {
    if (err) {
      res.status(400);
      res.send(err);
    }
    res.status(201);
    res.json(image);
  });
};
