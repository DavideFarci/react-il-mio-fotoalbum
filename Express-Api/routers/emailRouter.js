const express = require("express");
const router = express.Router();
const emailController = require("../controllers/emailController");

// INDEX
router.get("/", emailController.index);

// SHOW
router.get("/:id", emailController.show);

// STORE
router.post("/", emailController.store);

// DELETE
router.delete("/", emailController.destroy);

module.exports = router;
