const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001;
const cors = require('cors');

const corsOptions = {
  origin: 'http://127.0.0.1:5500',
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const userRoutes = require('./src/routes/userRoutes'); //importing route
app.use('/users', userRoutes);

const cateRoutes = require('./src/routes/cateRoutes'); //importing route
app.use('/categories', cateRoutes);

const orderRoutes = require('./src/routes/orderRoutes'); //importing route
app.use('/orders', orderRoutes);

const prodRoutes = require('./src/routes/prodRoutes'); //importing route
app.use('/products', prodRoutes);

const cusRoutes = require('./src/routes/cusRoutes'); //importing route
app.use('/customers', cusRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})