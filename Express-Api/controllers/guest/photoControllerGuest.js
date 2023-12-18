const { log } = require("console");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const PrismaError = require("../../exeptions/prismaExeption");

/// INDEX
async function index(req, res, next) {
  const filters = {
    visible: true,
  };
  const { searchStr } = req.query;
  const page = req.query.page || 1;
  const perPage = 100;

  if (searchStr) {
    filters.AND = [
      {
        OR: [
          {
            title: { contains: searchStr },
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

  // return res.json({
  //   message: "Lista dei post",
  //   data: data,
  //   total: total,
  //   page: page,
  //   perPage: perPage,
  // });
  return res.json(data);
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
