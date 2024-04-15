const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001;

app.use(express.json());

const userRoutes = require('./src/routes/userRoutes'); //importing route
app.use('/users', userRoutes);

const cateRoutes = require('./src/routes/cateRoutes'); //importing route
app.use('/categories', cateRoutes);

const orderRoutes = require('./src/routes/orderRoutes'); //importing route
app.use('/orders', orderRoutes);

const prodRoutes = require('./src/routes/prodRoutes'); //importing route
app.use('/prods', prodRoutes);

const cusRoutes = require('./src/routes/cusRoutes'); //importing route
app.use('/cus', cusRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})