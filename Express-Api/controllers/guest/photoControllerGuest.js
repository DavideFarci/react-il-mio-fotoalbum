const { log } = require("console");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const PrismaError = require("../../exeptions/prismaExeption");

/// INDEX
async function index(req, res, next) {
  const filters = {
    visible: true,
  };
  const { str } = req.query;
  const page = req.query.page || 1;
  const perPage = 100;

  if (str) {
    filters.AND = [
      {
        OR: [
          {
            title: { contains: str },
          },
          {
            description: { contains: str },
          },
        ],
      },
    ];
  }

  const total = await prisma.photo.count({ where: filters });
  const data = await prisma.photo.findMany({
    skip: (page - 1) * perPage,
    take: perPage,
    where: filters,
    include: {
      categories: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  if (!data) {
    next(new PrismaError("Qualcosa è andato storto, riprova", 500));
    return;
  }

  return res.json({
    message: "Lista dei post",
    data: data,
    total: total, // Aggiunto il campo total per indicare il numero totale di elementi
    page: page,
    perPage: perPage,
  });
}

// SHOW
async function show(req, res, next) {
  const { id } = req.params;
  const data = await prisma.photo.findFirst({
    where: {
      id: +id,
      visible: true,
    },
  });

  if (!data) {
    next(new PrismaError("Il post non è stato trovato", 404));
    return;
  }

  return res.json(data);
}

module.exports = {
  index,
  show,
};
