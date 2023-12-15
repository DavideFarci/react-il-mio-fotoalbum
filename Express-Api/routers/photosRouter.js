const express = require("express");
const router = express.Router();
const multer = require("multer");
const { checkSchema } = require("express-validator");
const schemaValidator = require("../middlewares/schemaValidator");
const photoController = require("../controllers/photoController");
const photoCreateUpdate = require("../validations/photoCreateUpdate");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

// INDEX
router.get("/", photoController.index);

// SHOW
router.get("/:id", photoController.show);

// STORE
router.post(
  "/",
  multer({ storage: storage }).single("image"),
  checkSchema(photoCreateUpdate),
  schemaValidator.checkValidity,
  photoController.store
);

// UPDATE
router.put(
  "/:id",
  multer({ storage: storage }).single("image"),
  checkSchema(photoCreateUpdate),
  schemaValidator.checkValidity,
  photoController.update
);

// DELETE
router.delete("/:id", photoController.destroy);

module.exports = router;
