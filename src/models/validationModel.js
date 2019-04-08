/**
 * Validation - wires into our custom validator function - http://mongoosejs.com/docs/api.html#schematype_SchemaType-validate
 */
module.exports.len = function(max) {
  return function(v) {
    return v.length <= max;
  };
};
module.exports.validateEmail = function(email) {
  // eslint-disable-next-line no-useless-escape
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  return re.test(email);
};
