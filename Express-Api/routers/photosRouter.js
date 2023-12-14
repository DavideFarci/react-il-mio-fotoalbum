const express = require("express");
const router = express.Router();
const photoController = require("../controllers/photoController");

// INDEX
router.get("/", photoController.index);

// SHOW
router.get("/:id", photoController.show);

// STORE
router.post("/", photoController.store);

// UPDATE
router.put("/", photoController.update);

// DELETE
router.delete("/", photoController.destroy);

module.exports = router;
