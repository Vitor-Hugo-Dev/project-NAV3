const routes = require('express').Router();
const validateJWT = require('../middlewares/validateJWT');

const {
  registerPaymentController,
} = require('../controllers/paymentControllers');

routes.post('/:id', validateJWT, registerPaymentController);

module.exports = routes;
