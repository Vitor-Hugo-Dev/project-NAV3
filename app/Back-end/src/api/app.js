const express = require('express');

const peopleRoutes = require('../routes/peopleRoutes');
const paymentRoutes = require('../routes/paymentRoutes');
const userRoutes = require('../routes/userRoutes');
const errorMiddleware = require('../middlewares/errorMiddleware');
const loginRoutes = require('../routes/loginRoutes');
const app = express();

app.use(express.json());

app.get('/ping', (_req, res) => {
  return res.status(200).json({ message: 'pong' });
});

app.use('/people', peopleRoutes);
app.use('/payment', paymentRoutes);
app.use('/user', userRoutes);
app.use('/login', loginRoutes);

app.use(errorMiddleware);

module.exports = app;
