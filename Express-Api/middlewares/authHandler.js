const jsonwebtoken = require("jsonwebtoken");
const AuthError = require("../exeptions/authError");

/**
 *
 * @param {import("express").Request} req
 * @param {*} res
 * @param {*} next
 */

module.exports = (req, res, next) => {
  // Cerco il token nella richiesta
  const bearer = req.headers.authorization;

  // Verifico se è presente e se valido
  if (!bearer || !bearer.startsWith("Bearer ")) {
    throw new AuthError("Token mancante o danneggiato");
  }

  // Se lo è estraggo il token
  const token = bearer.split(" ")[1];

  // Verifico la validità del token (il verify ritorna il payload del token e quindi i dati dell'utente) e salvo i dati dell'utente.
  const user = jsonwebtoken.verify(token, process.env.JWT_SECRET);

  // Passo i dati dell'utente alla richiesta
  req["user"] = user;

  next();
};
