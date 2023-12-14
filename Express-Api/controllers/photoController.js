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
async function show(req, res) {
  const { id } = req.params;
  const data = await prisma.photo.findFirst({
    where: {
      id: +id,
    },
  });

  if (!data) {
    // next(new PrismaExeption("Il post non è stato trovato", 404));
    throw new Error("Photo non trovata");
  }

  return res.json(data);
}

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
async function update(req, res) {
  const { id } = req.params;
  const file = req.file;
  // const photoToUpdate = req.validateData;
  const photoToUpdate = req.body;

  if (file) {
    photoToUpdate.image = file.filename;
  }

  const photo = await prisma.photo.findUnique({
    where: {
      id: +id,
    },
  });
  if (!photo) {
    next(new PrismaExeption("Photo non trovato"));
  }

  const list = await prisma.photo.findMany();
  if (!list) {
    next(
      new PrismaExeption("Non è stato possibile verificare i duplicati", 500)
    );
  }

  const photoUpdated = await prisma.photo.update({
    where: {
      id: +id,
    },
    data: {
      title: photoToUpdate.title,
      image: photoToUpdate.image,
      description: photoToUpdate.description,
      visible: photoToUpdate.visible == "true",
      categories: {
        connect: photoToUpdate.categories
          ? photoToUpdate.categories.map((categId) => ({ id: +categId }))
          : [],
      },
    },
    include: {
      categories: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!photoUpdated) {
    next(new PrismaExeption("Errore nella modifica della foto", 401));
  }

  res.json({
    message: `La foto ${photoToUpdate.title} è stata modificata:`,
    photoUpdated,
  });
}

// DESTROY
async function destroy(req, res) {
  const { id } = req.params;

  // Recupero la foto da eliminare
  const photo = await prisma.photo.findUnique({
    where: {
      id: +id,
    },
  });

  // Disconnetto le relazioni con la tabella categorie
  await prisma.photo.update({
    where: {
      id: +id,
    },
    data: {
      categories: {
        disconnect: photo.categories?.map((categId) => ({ id: categId })),
      },
    },
  });

  // Elimino definitivamente la foto
  const photoToDestroy = await prisma.post.delete({
    where: {
      id: +id,
    },
  });

  if (!photoToDestroy) {
    // next(new PrismaExeption("Errore nella cancellazione del post", 500));
    throw new Error("Errore nella cancellazione");
  }

  res.json({ message: "Foto eliminata correttamente!" });
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
