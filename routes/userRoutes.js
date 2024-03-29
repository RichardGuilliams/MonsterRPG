const express = require("express");
const userController = require("./../controllers/userController");
const photoController = require("./../controllers/photoController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

router.use(authController.protect);

router.patch("/updatePassword", authController.updatePassword);
router.get("/getMe", userController.getMe, userController.getUser);
router.patch(
  "/updateMe",
  photoController.uploadPhoto,
  photoController.resizePhoto("user"),
  userController.updateMe
);
router.delete("/deleteMe", userController.deleteMe);

router.use(authController.restrictTo("admin"));

router
  .route(`/`)
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route(`/:id`)
  .get(userController.getUser)
  .delete(userController.deleteUser);

module.exports = router;
