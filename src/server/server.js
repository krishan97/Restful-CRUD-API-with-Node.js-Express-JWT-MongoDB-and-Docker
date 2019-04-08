function start() {
  const express = require('express');
  const app = express();
  const  path = require('path');
  const  bodyParser = require('body-parser');
  const { PORT } = process.env;

  app.all('*', (req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Credentials', true);
    res.set('Access-Control-Allow-Methods', 'POST, GET, PUT,PATCH, DELETE');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if ('OPTIONS' == req.method) return res.status(200).send();
    next();
  });
  const server = require('http').createServer(app);
  require('./../config/database')(app);

  app.use(bodyParser.urlencoded({
    keepExtensions: true,
    extended: true,
  }));

  app.use(bodyParser.json());
  app.use('/public', express.static(path.join(__dirname, '../../', 'public')));
  app.use(bodyParser.json());
  server.listen(PORT);
  // eslint-disable-next-line no-console
  console.log(`RESTful API server started on: ${PORT}`);
}
exports.start = start;
