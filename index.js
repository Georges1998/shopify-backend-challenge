const session = require("express-session");
var cors = require("cors");

var express = require("express"),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require("mongoose"),
  Image = require("./models/image"), //created model loading here
  User = require("./models/user"), //created model loading here
  bodyParser = require("body-parser");

mongoose.Promise = global.Promise;
mongoose.set("useFindAndModify", false);
mongoose
  .connect(process.env.DB_URL || "mongodb://localhost:27017/shopify", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("CONNECTION OPENED");
  })
  .catch((err) => {
    console.log("ERROR: " + err);
  });

app.use(
  cors({
    origin: [
      "https://sharp-hugle-4d2359.netlify.app",
      "http://localhost:4200",
      "http://sharp-hugle-4d2359.netlify.app",
      "https://sharp-hugle-4d2359.netlify.app/",
      "http://sharp-hugle-4d2359.netlify.app/",
    ],
    credentials: true,
  })
);

app.use(
  session({
    secret: "notagoodsecret",
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var routes = require("./routes/imageRoutes");
var routes2 = require("./routes/userRoutes");
routes2(app);
routes(app);

app.listen(port);

console.log("app listening on port " + port);
