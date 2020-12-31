const bcrypt = require("bcrypt");

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
exports.create_user = async function (req, res, next) {
  const { password } = req.body;
  const hash = await bcrypt.hash(password, 12);
  req.body.password = hash;
  console.log(hash);
  var new_user = new User(req.body);
  new_user.save(function (err, user) {
    if (err) {
      res.send(err);
    }
    res.send(user);
  });
};

exports.login = async function (req, res, next) {
  const { email, password } = req.body;
  const exists = await User.exists({ email });
  if (exists) {
    const user = await User.find({ email });
    const validPassword = bcrypt.compare(password, user.password);
    if (validPassword) {
      res.send("good");
    } else {
      res.send("bad");
    }
  } else {
    res.send("bad");
  }
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
