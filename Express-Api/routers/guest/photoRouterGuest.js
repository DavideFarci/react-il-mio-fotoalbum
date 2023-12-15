const express = require("express");
const router = express.Router();
const photoController = require("../../controllers/guest/photoControllerGuest");

// INDEX
router.get("/", photoController.index);

// SHOW
router.get("/:id", photoController.show);

module.exports = router;
