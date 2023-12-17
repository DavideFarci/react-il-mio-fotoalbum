/**
 *  @type {import("express-validator").Schema}
 */
module.exports = {
  title: {
    in: ["body"],
    notEmpty: {
      options: {
        errorMessage: "Il titolo è obbligatorio",
      },
    },
    isString: {
      options: {
        errorMessage: "Il titolo deve essere una stringa",
      },
    },
  },
  description: {
    in: ["body"],
    notEmpty: {
      options: {
        errorMessage: "La descrizione è obbligatorio",
      },
    },
    isString: {
      options: {
        errorMessage: "La descrizione deve essere una stringa",
      },
    },
  },
  visible: {
    in: ["body"],
    isBoolean: true,
    optional: true,
  },
};
