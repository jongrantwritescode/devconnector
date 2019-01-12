const Validatior = require("validator");

const isEmpty = require("./is-empty");

module.exports.validateUsername = (name, errors) => {
  if (Validatior.isEmpty(name)) {
    errors.name = "Name is Required";
    return;
  }

  let min = 2;
  let max = 30;
  if (!Validatior.isLength(name, { min, max })) {
    errors.name = `Name must be between ${min} and ${max} characters`;
  }
};

module.exports.validateEmailPresent = (email, errors) => {
  if (Validatior.isEmpty(email)) {
    errors.email = "Email is Required";
  }
};

module.exports.validateEmailFormat = (email, errors) => {
  if (!Validatior.isEmail(email)) {
    errors.email = "Email is Invalid";
  }
};

module.exports.validatePasswordPresent = (password, errors) => {
  if (Validatior.isEmpty(password)) {
    errors.password = "Password is Required";
    return;
  }
};

module.exports.validatePasswordFormat = (password, errors) => {
  if (Validatior.isEmpty(password)) {
    errors.password = "Password is Required";
  }
};

module.exports.validatePasswordConfirm = (password, passwordConfim, errors) => {
  if (Validatior.isEmpty(passwordConfim)) {
    errors.passwordConfirm = "Password Confirmation Required";
    return;
  }

  if (!Validatior.equals(password, passwordConfim)) {
    errors.passwordConfirm = "Passwords must match";
  }
};
