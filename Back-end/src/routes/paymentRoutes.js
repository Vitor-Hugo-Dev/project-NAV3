const routes = require('express').Router();

// const {  } = require('../controllers/');

routes.post('/', (req, res) => {
  res.send('POST people');
});

module.exports = routes;
