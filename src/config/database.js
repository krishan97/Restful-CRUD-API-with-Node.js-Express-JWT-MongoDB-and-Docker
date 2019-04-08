module.exports =  (app) =>{
  const { MONGO_URI } = process.env;
  const mongoose = require('mongoose');
  mongoose.set('useCreateIndex', true);
  mongoose.connect(`${MONGO_URI}`, {
    useNewUrlParser: true,
  },  (err) => {
    if (err) {
      throw(err);
    } else {
      require('./../models/index.js')(mongoose);
      require('./../routes/index.js')(app);
    }
  });
};
