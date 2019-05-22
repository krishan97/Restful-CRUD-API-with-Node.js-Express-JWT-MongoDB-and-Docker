/**
 * Validation - wires into our custom validator function - http://mongoosejs.com/docs/api.html#schematype_SchemaType-validate
 */
module.exports.len = (max) => {
  return function(v) {
    return v.length <= max;
  };
};
module.exports.validateEmail = (email) => {
  // eslint-disable-next-line no-useless-escape
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  return re.test(email);
};
