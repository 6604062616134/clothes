const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001;

app.use(express.json());

const userRoutes = require('./src/routes/userRoutes'); //importing route
app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})