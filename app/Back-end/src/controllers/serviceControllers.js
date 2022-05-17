const {
  createServiceService,
  updateServiceService,
  getAllServicesService,
  deleteServiceService,
} = require('../services/serviceServices');
const { success, created, noContent } = require('../utils/statusCode');

module.exports = {
  createServiceController: async (req, res, next) => {
    try {
      const serviceData = req.body;
      const newService = await createServiceService(serviceData);
      return res.status(created).json(newService);
    } catch (err) {
      return next(err);
    }
  },
  updateServiceController: async (req, res, next) => {
    try {
      const sku = req.params.id;
      const serviceData = req.body;
      await updateServiceService(serviceData, sku);
      return res
        .status(success)
        .json({ message: 'Service updated successfully' });
    } catch (err) {
      return next(err);
    }
  },
  getAllServicesController: async (req, res, next) => {
    try {
      const services = await getAllServicesService();
      return res.status(success).json(services);
    } catch (err) {
      return next(err);
    }
  },
  deleteServiceController: async (req, res, next) => {
    try {
      const sku = req.params.id;
      await deleteServiceService(sku);
      return res.status(noContent).end();
    } catch (err) {
      return next(err);
    }
  },
};
