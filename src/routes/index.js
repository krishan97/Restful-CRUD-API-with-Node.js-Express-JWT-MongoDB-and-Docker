'use strict';

module.exports = (app) => {
  require('./users')(app);
  app.use((req, res) => {
    res.sendStatus(404);
  });
};
