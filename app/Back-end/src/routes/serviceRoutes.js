const routes = require('express').Router();
const validateJWT = require('../middlewares/validateJWT');

const {
  createServiceController,
  updateServiceController,
  getAllServicesController,
  deleteServiceController,
} = require('../controllers/serviceControllers');

routes.post('/', validateJWT, createServiceController);
routes.put('/:id', validateJWT, updateServiceController);
routes.get('/', validateJWT, getAllServicesController);
routes.delete('/:id', validateJWT, deleteServiceController);

module.exports = routes;
