const bcrypt = require("bcrypt");

var mongoose = require("mongoose"),
  User = mongoose.model("User"),
  Image = mongoose.model("Image");

exports.get_all_users = function (req, res, next) {
  User.find({}, function (err, users) {
    if (err) {
      res.status(400);
      res.send(err);
    }
    res.status(200);
    res.send(users);
  });
};

exports.get_user_by_id = async function (req, res, next) {
  const user = await User.findById(req.params.id);
  res.send(user);
};
// };

/*
@body {User}
*/
exports.create_user = async function (req, res, next) {
  const { password } = req.body;
  const hash = await bcrypt.hash(password, 12);
  req.body.password = hash;
  var new_user = new User(req.body);
  new_user.save(function (err, user) {
    if (err) {
      res.send(err);
    } else {
      req.session.user_id = user._id;
      res.send(user);
    }
  });
};

exports.login = async function (req, res, next) {
  const { email, password } = req.body;
  const exists = await User.exists({ email });

  if (exists) {
    const user = await User.findOne({ email });
    const valid = await bcrypt.compare(password, user.password);

    if (valid) {
      req.session.user_id = user._id;
      res.send(user);
    } else {
      res.status(401);
      res.send({ message: "unauthorized" });
    }
  } else {
    res.status(401);
    res.send({ message: "unauthorized" });
  }
};

exports.logout = async function (req, res, next) {
  req.session.user_id = null;
  res.send({ message: "loged out" });
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

exports.buy_image = async function (req, res) {
  const user = await User.findById(req.params.id);
  const image = await Image.findById(req.params.imageid);
  console.log(image);

  const imagePrice = image.price;
  if (imagePrice <= user.credit && !image.purchased) {
    // upadte seller credit
    await User.findByIdAndUpdate(image.user, {
      credit: user.credit + imagePrice - image.discount,
    });

    image.purchasedBy = user;
    image.purchased = true;
    user.purchased.push(image);
    user.credit = user.credit - imagePrice + image.discount;

    await user.save();
    await image.save();
    res.send({ message: "You just bought an image!", user: user });
  } else {
    res.send({
      message:
        "Cannot sell or buy this image at the moment: Check your balance",
    });
  }
};
