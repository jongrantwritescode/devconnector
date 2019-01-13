const Validator = require("validator");

const isEmpty = require("./is-empty");

module.exports.validateUsername = (name, errors) => {
  if (Validator.isEmpty(name)) {
    errors.name = "Name is Required";
    return;
  }

  let min = 2;
  let max = 30;
  if (!Validator.isLength(name, { min, max })) {
    errors.name = `Name must be between ${min} and ${max} characters`;
  }
};

module.exports.validateEmailPresent = (email, errors) => {
  if (Validator.isEmpty(email)) {
    errors.email = "Email is Required";
  }
};

module.exports.validateEmailFormat = (email, errors) => {
  if (!Validator.isEmail(email)) {
    errors.email = "Email is Invalid";
  }
};

module.exports.validatePasswordPresent = (password, errors) => {
  if (Validator.isEmpty(password)) {
    errors.password = "Password is Required";
    return;
  }
};

module.exports.validatePasswordFormat = (password, errors) => {
  if (Validator.isEmpty(password)) {
    errors.password = "Password is Required";
  }
};

module.exports.validatePasswordConfirm = (password, passwordConfim, errors) => {
  if (Validator.isEmpty(passwordConfim)) {
    errors.passwordConfirm = "Password Confirmation Required";
    return;
  }

  if (!Validator.equals(password, passwordConfim)) {
    errors.passwordConfirm = "Passwords must match";
  }
};
