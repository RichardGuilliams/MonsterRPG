const express = require("express");
const itemController = require("../../controllers/data/itemController");
const authController = require("../../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router
  .route(`/`)
  .get(itemController.getAllItems)
  .post(authController.restrictTo("admin"), itemController.createItem);

router
  .route(`/:id`)
  .get(itemController.getItem)
  .delete(authController.restrictTo("admin"), itemController.deleteItem)
  .patch(authController.restrictTo("admin"), itemController.updateItem);

module.exports = router;
