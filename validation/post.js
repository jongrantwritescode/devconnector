const Validator = require("validator");
const isEmpty = require("./is-empty");

const cleanData = data => {
  data.text = !isEmpty(data.text) ? data.text : "";
  return data;
};

const testParam = (param, errors, errorID, msg) => {
  if (Validator.isEmpty(param)) {
    errors[errorID] = msg;
  }
};

const testLength = (param, errors, errorID, min, max) => {
  if (!Validator.isLength(param, { min, max })) {
    errors[errorID] = `Length must be between ${min} and ${max} characters`;
  }
};

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data = cleanData(data);

  testParam(data.text, errors, "text", "Text is Required");

  if (!errors.text) {
    testLength(data.text, errors, "text", 10, 300);
  }

  if (Validator) return { errors, isValid: isEmpty(errors) };
};
