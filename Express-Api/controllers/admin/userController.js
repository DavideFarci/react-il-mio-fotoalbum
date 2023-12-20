const { log, error } = require("console");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// const { matchedData } = require("express-validator");
const bcrypt = require("bcrypt");
const jsonwebToken = require("jsonwebtoken");
const authError = require("../../exeptions/authError");

// LOGIN
async function login(req, res, next) {
  // recuperare i dati inseriti dall'utente
  const { email, password } = req.body;
  try {
    //controllare che ci sia un utente con quell'email
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return next(new PrismaExeption("Utente non trovato"));

      // throw new authError("Utente non trovato");
    }
    // controllare che la password sia corretta
    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) {
      // next(new PrismaClient("Password errata"));
      return next(new authError("Password errata"));
    }
    // generare il token JWT
    const token = jsonwebToken.sign(user, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    // Rimuovere la password dai dati dell'utente
    delete user.password;
    // restutuire il token e i dati dell'utente
    res.json({ user, token });
  } catch (error) {
    return next(new authError(error.message));
  }
}

// ME
async function me(req, res, next) {
  // Estraggo l'id dell'utente dalla richiesta
  const { id } = req.user;
  // Verifico se è presente un utente con quelle credenziali
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  // Lancio un errore in caso di mancata corrispondenza
  if (!user) {
    return next(new authError("Utente non trovato"));
  }
  // Elimino la password dalle informazioni dell'utente
  delete user.password;
  // Rispondo con i dati dell'utente
  res.json({ user });
}

module.exports = {
  //   register,
  login,
  me,
};

// REGISTER
// async function register(req, res) {
//   const sanitizedData = matchedData(req);
//   sanitizedData.password = await bcrypt.hash(sanitizedData.password, 10);

//   const newUser = await prisma.user.create({
//     data: {
//       ...sanitizedData,
//     },
//     select: {
//       firstName: true,
//       lastName: true,
//       email: true,
//       role: true,
//     },
//   });

//   const token = jsonwebToken.sign(newUser, process.env.JWT_SECRET, {
//     expiresIn: "1h",
//   });

//   res.json({ newUser, token });
// }
