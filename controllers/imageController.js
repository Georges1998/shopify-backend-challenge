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
get random 10 images
*/
exports.get_random_ten = function (req, res) {
  Image.aggregate(
    [
      { $match: { purchased: false } },
      { $match: { deleted: false } },
      { $match: { user: { $ne: mongoose.Types.ObjectId(req.params.id) } } },
      { $sample: { size: 10 } },
    ],
    function (err, docs) {
      res.send(docs);
    }
  );
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
get all purchased images for a specific user
@param {UserId}
*/
exports.get_all_purchased_images_by_user_id = async function (req, res, next) {
  await User.findById(req.params.id)
    .populate("purchased")
    .exec((err, im) => {
      res.status(200);
      res.send(im.purchased);
    });
};

/*
@body {Image}
*/
exports.upload_image = async function (req, res, next) {
  const new_image = new Image(req.body);
  await new_image.save(function (err, image) {
    res.send(image);
  });
};

exports.edit_image = async function (req, res, next) {
  if (
    req.body.price > req.body.discount &&
    req.body.price >= 0 &&
    req.body.discount >= 0
  ) {
    const new_image = await Image.findByIdAndUpdate(req.params.id, req.body);
    console.log(new_image);
    await new_image.save();
    res.send({ message: "updated" });
  } else {
    res.send({ message: "something is wrong. Discount is too high" });
  }
};

exports.delet_image = async function (req, res) {
  const image = await Image.findById(req.params.id);
  console.log(image);
  const user = await User.findByIdAndUpdate(image.user, {
    $pull: { images: req.params.id },
  });
  console.log(user);

  image.deleted = true;

  await user.save();
  await image.save();
  res.send({ message: "deleted" });
};
