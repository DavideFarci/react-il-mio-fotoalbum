const { log } = require("console");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const PrismaError = require("../../exeptions/prismaExeption");

// INDEX
async function index(req, res) {
  const categories = await prisma.category.findMany();
  return res.json(categories);
}

// STORE
async function store(req, res) {
  const data = req.body;

  const newCategory = await prisma.category.create({
    data: {
      name: data.name,
    },
  });

  return res.json(newCategory);
}

// DESTROY
async function destroy(req, res, next) {
  const { id } = req.params;

  // Recupero il messaggio da eliminare
  const category = await prisma.category.findUnique({
    where: {
      id: +id,
    },
  });

  if (!category) {
    next(new PrismaError("Categoria non trovata", 404));
    return;
  }

  // Disconnetto le relazioni con le tabella foto
  await prisma.category.update({
    where: {
      id: +id,
    },
    data: {
      photos: {
        disconnect: category.photos?.map((photoId) => ({ id: photoId })),
      },
    },
  });

  // Elimino la categoria
  const deletedCategory = await prisma.category.delete({
    where: {
      id: +id,
    },
  });

  if (!deletedCategory) {
    next(new PrismaError("Errore nella cancellazione della categoria", 500));
    return;
  }
  res.json({ message: "Categoria eliminata correttamente!" });
}

module.exports = {
  index,
  store,
  destroy,
};
