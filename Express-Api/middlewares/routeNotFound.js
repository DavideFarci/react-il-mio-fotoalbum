const PrismaExeption = require("../exeptions/prismaExeption");
const { sendRes } = require("./errorFormatter");

module.exports = function (err, req, res, next) {
  res.status(+err.status ?? 500).json({ message: err.message });
};
