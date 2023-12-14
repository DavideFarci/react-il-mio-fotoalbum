const { log } = require("console");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const PrismaError = require("../exeptions/prismaExeption");

// INDEX
async function index(req, res) {
  const messages = await prisma.email.findMany();
  return res.json(messages);
}

// SHOW
async function show(req, res) {
  const { id } = req.params;
  const data = await prisma.email.findFirst({
    where: {
      id: +id,
    },
  });

  if (!data) {
    next(new PrismaError("Il post non è stato trovato", 404));
  }

  return res.json(data);
}

// STORE
async function store(req, res, next) {
  const data = req.body;

  const newMessage = await prisma.email.create({
    data: {
      complete_name: data.complete_name,
      email: data.email,
      message: data.message,
    },
  });

  if (!newMessage) {
    next(new PrismaError("Dati non corretti", 400));
  }

  return res.json(newMessage);
}

// DESTROY
async function destroy(req, res, next) {
  const { id } = req.params;

  // Recupero il messaggio da eliminare
  const message = await prisma.email.findUnique({
    where: {
      id: +id,
    },
  });

  if (!message) {
    next(new PrismaError("Messaggio non trovato", 404));
  }

  // Elimino definitivamente il messaggio
  const messageToDestroy = await prisma.email.delete({
    where: {
      id: +id,
    },
  });

  if (!messageToDestroy) {
    next(new PrismaError("Errore nella cancellazione del post", 500));
  }

  res.json({ message: "Messaggio eliminato correttamente!" });
}

module.exports = {
  index,
  show,
  store,
  destroy,
};
