'use strict';
/**
 * Get unique error field name
 */
const getUniqueErrorMessage = function(err) {
  let output;
  try {
    const fieldName = err.errmsg.indexOf('{ :');
    const lastIndex = err.errmsg.indexOf('}');
    // eslint-disable-next-line no-useless-escape
    output = `${(err.errmsg.substring(fieldName, lastIndex).replace(/[&\/\\#,+()$~%'":*?<>{}]/g, '')).trim()  } already exists`;

  } catch (ex) {
    output = 'Unique field already exists';
  }

  return output;
};

/**
 * Get the error message from error object
 */
exports.getErrorMessage = function(err) {
  let message = err.message;
  if (err.code) {
    switch (err.code) {
    case 11000:
    case 11001:
      message = getUniqueErrorMessage(err);
      break;
    default:
      message = 'Something went wrong';
    }
  } else {
    for (const errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  }

  return message;
};
