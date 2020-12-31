module.exports = function (app) {
  var imageController = require("../controllers/imageController");

  app
    .route("/image")
    .get(imageController.get_all_images)
    .post(imageController.upload_image);

  app.route("/image/:id").get(imageController.get_all_images_by_user_id);
};