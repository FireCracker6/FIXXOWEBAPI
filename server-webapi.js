require('dotenv').config()
const port = process.env.WEBAPI_PORT || 9999

const initMongoDB = require('./server-mongodb')
 const express = require('express')
 const app = express()
 const Controller = require("./controllers/productsController")
 const cors = require("cors");
 app.use(cors());
 
// middleware
app.use(express.json())

app.use(express.urlencoded({extended: false}))


// routes

 app.use('/api/products', require("./controllers/productsController")) 
 app.use('/api/authentication', require("./controllers/authenticationController"))


// initalize
initMongoDB()
app.listen(port, () => console.log(`Web API is running at http://localhost:${port}`))
