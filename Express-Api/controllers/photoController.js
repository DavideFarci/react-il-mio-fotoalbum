const { log } = require("console");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// INDEX
async function index(req, res, next) {
  const filters = {};
  const page = req.query.page || 1;
  const perPage = 100;
  const { visible, str } = req.query;
  if (str) {
    filters.OR = [
      {
        title: { contains: str },
      },
      {
        description: { contains: str },
      },
    ];
  }
  if (visible) {
    filters.visible = visible === "true";
  }
  const total = prisma.photo.count({ where: filters });
  const data = await prisma.photo.findMany({
    skip: (page - 1) * perPage, // pagina dalla quale contare
    take: perPage, // elementi per pagina
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
    // next(new PrismaExeption("Qualcosa è andato storto, riprova", 500));
    throw new Error("Qualcosa è andato storto...");
  }

  // return res.json(data, total, page, perPage);
  return res.json({
    message: "Lista dei post",
    data: data,
  });
}

// SHOW
function show(req, res) {}

// STORE
async function store(req, res) {
  const photoToCreate = req.body;
  log(photoToCreate);
  const file = req.file;
  if (file) {
    photoToCreate.image = file.filename;
  }
  const newPhoto = await prisma.photo.create({
    data: {
      title: photoToCreate.title,
      image: photoToCreate.image,
      description: photoToCreate.description,
      visible: photoToCreate.visible == "true",
      categories: {
        connect: photoToCreate.categories
          ? photoToCreate.categories.map((categId) => ({ id: +categId }))
          : [],
      },
    },
    include: {
      categories: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  if (!newPhoto) {
    // next(new PrismaExeption("Errore nella creazione del post", 400));
    throw new Error("Errore nella creazione");
  }

  return res.json(newPhoto);
}

// UPDATE
function update(req, res) {}

// DESTROY
function destroy(req, res) {}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
