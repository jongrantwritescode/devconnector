const isEmpty = require("./is-empty");
const validation = require("./validators");

const cleanData = data => {
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  return data;
};

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data = cleanData(data);
  validation.validateEmailPresent(data.email, errors);
  validation.validatePasswordPresent(data.password, errors);

  return { errors, isValid: isEmpty(errors) };
};
