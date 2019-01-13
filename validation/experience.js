const Validator = require("validator");
const isEmpty = require("./is-empty");

const cleanData = data => {
  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  return data;
};

const testParam = (param, errors, errorID, msg) => {
  if (Validator.isEmpty(param)) {
    errors[errorID] = msg;
  }
};

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data = cleanData(data);

  testParam(data.title, errors, "title", "Title is Required");
  testParam(data.company, errors, "company", "Company is Required");
  testParam(data.from, errors, "from", "Start Date is Required");

  if (Validator) return { errors, isValid: isEmpty(errors) };
};
