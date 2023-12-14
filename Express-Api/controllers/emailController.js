const { log } = require("console");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
    // next(new PrismaExeption("Il post non è stato trovato", 404));
    throw new Error("Messaggio non trovato");
  }

  return res.json(data);
}

// STORE
async function store(req, res) {
  const data = req.body;

  const newMessage = await prisma.email.create({
    data: {
      complete_name: data.complete_name,
      email: data.email,
      message: data.message,
    },
  });

  return res.json(newMessage);
}

// DESTROY
async function destroy(req, res) {
  const { id } = req.params;

  // Recupero il messaggio da eliminare
  const message = await prisma.email.findUnique({
    where: {
      id: +id,
    },
  });

  if (!message) {
    throw new Error("Messaggio non trovato");
  }

  // Elimino definitivamente il messaggio
  const messageToDestroy = await prisma.email.delete({
    where: {
      id: +id,
    },
  });

  if (!messageToDestroy) {
    // next(new PrismaExeption("Errore nella cancellazione del post", 500));
    throw new Error("Errore nella cancellazione");
  }

  res.json({ message: "Messaggio eliminato correttamente!" });
}

module.exports = {
  index,
  show,
  store,
  destroy,
};
