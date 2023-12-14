const { log } = require("console");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// INDEX
async function index(req, res) {
  const categories = await prisma.category.findMany();
  return res.json(categories);
}

// STORE
async function store(req, res) {
  const data = req.body;
  log(data);

  const newCategory = await prisma.category.create({
    data: {
      name: data.name,
    },
  });

  return res.json(newCategory);
}

// DESTROY
async function destroy(req, res) {}

module.exports = {
  index,
  store,
  destroy,
};
