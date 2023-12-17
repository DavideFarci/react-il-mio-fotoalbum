const express = require("express");
const router = express.Router();
const multer = require("multer");
const { checkSchema } = require("express-validator");
const schemaValidator = require("../../middlewares/schemaValidator");
const photoController = require("../../controllers/admin/photoController");
const photoCreateUpdate = require("../../validations/photoCreateUpdate");
const authHandler = require("../../middlewares/authHandler");
const photoUpdate = require("../../validations/photoUpdate");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

// INDEX
router.get("/", authHandler, photoController.index);

// SHOW
router.get("/:id", authHandler, photoController.show);

// STORE
router.post(
  "/",
  authHandler,
  multer({ storage: storage }).single("image"),
  checkSchema(photoCreateUpdate),
  schemaValidator.checkValidity,
  photoController.store
);

// UPDATE
router.put(
  "/:id",
  authHandler,
  multer({ storage: storage }).single("image"),
  checkSchema(photoUpdate),
  schemaValidator.checkValidity,
  photoController.update
);

// DELETE
router.delete("/:id", authHandler, photoController.destroy);

module.exports = router;
