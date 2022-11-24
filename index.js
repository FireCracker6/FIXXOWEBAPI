const port = process.env.PORT || 5000
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

// middleware
app.use(cors())
app.use(express.urlencoded({ extended : true}))
app.use(bodyParser.json())

const usersController = require('./controllers/usersController')
app.use('/api/users', usersController)

const productsController = require('./controllers/productsController')
app.use('/api/products', productsController)



app.listen(port, () => console.log(`WebAPi is running on http://localhost:${port}`))