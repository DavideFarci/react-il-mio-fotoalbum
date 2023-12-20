const express = require("express");
const router = express.Router();
const userController = require("../../controllers/admin/userController");
const { checkSchema } = require("express-validator");
const schemaValidator = require("../../middlewares/schemaValidator");
const userLogin = require("../../validations/userLogin");
const authHandler = require("../../middlewares/authHandler");

router.post(
  "/login",
  checkSchema(userLogin),
  schemaValidator.checkValidity,
  userController.login
);

router.get("/me", authHandler, userController.me);

module.exports = router;

// router.post(
//   "/register",
//   // Controlla che non ci siano errori nei dati passati
//   checkSchema(userRegister),
//   // Mi da l'errore se è presente. In questo modo non devo gestirli manualmente
//   checkValidity,
//   userController.register
// );
