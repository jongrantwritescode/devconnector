const Validator = require("validator");
const isEmpty = require("./is-empty");

const cleanData = data => {
  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";
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

  testParam(data.school, errors, "school", "School is Required");
  testParam(data.degree, errors, "degree", "Degree is Required");
  testParam(
    data.fieldofstudy,
    errors,
    "fieldofstudy",
    "Field of Study is Required"
  );
  testParam(data.from, errors, "from", "Start Date is Required");

  if (Validator) return { errors, isValid: isEmpty(errors) };
};
