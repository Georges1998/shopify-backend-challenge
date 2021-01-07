module.exports = function (app) {
  var imageController = require("../controllers/imageController");

  app
    .route("/image")
    .get(imageController.get_all_images)
    .post(imageController.upload_image);

  app
    .route("/image/:id")
    .get(imageController.get_all_images_by_user_id)
    .put(imageController.edit_image)
    .delete(imageController.delet_image);

  app.route("/random/:id").get(imageController.get_random_ten);

  app
    .route("/purchased/:id")
    .get(imageController.get_all_purchased_images_by_user_id);
};
