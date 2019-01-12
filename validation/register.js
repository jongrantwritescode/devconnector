const isEmpty = require("./is-empty");
const validation = require("./validators");

const cleanData = data => {
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.passwordConfirm = !isEmpty(data.passwordConfirm)
    ? data.passwordConfirm
    : "";

  return data;
};

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data = cleanData(data);

  // Validte user input
  validation.validateUsername(data.name, errors);

  validation.validateEmailPresent(data.email, errors);
  if (isEmpty(errors.email)) {
    validation.validateEmailFormat(data.email, errors);
  }

  validation.validatePasswordPresent(data.password, errors);
  if (isEmpty(errors.password)) {
    validation.validatePasswordFormat(data.password, errors);
  }

  validation.validatePasswordConfirm(
    data.password,
    data.passwordConfirm,
    errors
  );

  return { errors, isValid: isEmpty(errors) };
};
