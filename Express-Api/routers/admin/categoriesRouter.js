const express = require("express");
const router = express.Router();
const categoryController = require("../../controllers/admin/categoryController");
const authHandler = require("../../middlewares/authHandler");

//INDEX
router.get("/", authHandler, categoryController.index);
// STORE
router.post("/", authHandler, categoryController.store);
// DELETE
router.delete("/:id", authHandler, categoryController.destroy);

module.exports = router;
