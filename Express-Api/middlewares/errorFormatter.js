const { log } = require("console");

/**
 *
 * @param {*} err
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

module.exports = function (err, req, res, next) {
  sendRes(err, res);
};

function sendRes(err, res) {
  const status = err.status || 500;

  res.status(status).json({
    message: "Qualcosa è andato storto",
    error: err.message,
    errorInstace: err.name,
  });
}

module.exports.sendRes = sendRes;
