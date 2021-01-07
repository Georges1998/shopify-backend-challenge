module.exports = function (app) {
  var userController = require("../controllers/userController");

  app
    .route("/user")
    .get(userController.get_all_users)
    .post(userController.create_user);

  app
    .route("/user/:id")
    .post(userController.add_new_image)
    .get(userController.get_user_by_id);
   
  app.route("/buy/:id/:imageid").post(userController.buy_image);

  app.route("/login").post(userController.login);
  
  app.route("/logout").post(userController.logout);
};
