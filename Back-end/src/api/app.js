const express = require('express');

const peopleRoutes = require('../routes/peopleRoutes');
const paymentRoutes = require('../routes/paymentRoutes');
const userRoutes = require('../routes/userRoutes');
const errorMiddleware = require("../middlewares/errorMiddleware");

const app = express();

app.use(express.json());

app.use('/people', peopleRoutes);
app.use('/payment', paymentRoutes);
app.use('/user', userRoutes);

app.use(errorMiddleware);

module.exports = app;
