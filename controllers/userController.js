var mongoose = require("mongoose"),
  User = mongoose.model("User"),
  Image = mongoose.model("Image");

exports.get_all_users = function (req, res, next) {
  User.find({}, function (err, users) {
    if (err) {
      res.send(err);
    }
    res.json(users);
  });
};

/*
@body {User}
*/
exports.create_user = function (req, res, next) {
  var new_user = new User(req.body);
  new_user.save(function (err, user) {
    if (err) {
      res.send(err);
    }
    res.send(user);
  });
};

exports.add_new_image = async function (req, res, next) {
  const user = await User.findById(req.params.id);
  const image = new Image(req.body);
  image.user = user;
  user.images.push(image);
  await user.save();
  await image.save();
  res.send(user);
};
