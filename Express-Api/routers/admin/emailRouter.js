const express = require("express");
const router = express.Router();
const emailController = require("../../controllers/admin/emailController");
const authHandler = require("../../middlewares/authHandler");

// INDEX
router.get("/", authHandler, emailController.index);

// SHOW
router.get("/:id", authHandler, emailController.show);

// STORE
router.post("/", emailController.store);

// DELETE
router.delete("/:id", authHandler, emailController.destroy);

module.exports = router;
