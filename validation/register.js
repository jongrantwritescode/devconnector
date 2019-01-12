const validator = require("validator");

const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  let min = 2;
  let max = 30;
  if (!validator.isLength(data.name, { min, max })) {
    errors.name = `Name must be between ${min} and ${max} characters`;
  }

  return { errors, isValid: isEmpty(errors) };
};
