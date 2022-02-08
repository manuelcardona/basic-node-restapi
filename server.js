require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true})
const db = mongoose.connection
db.on('error',(error)=>console.log(error))
db.once('open',()=>console.log('Connected to database'))

app.use(express.json())
const subscribersRouter = require('./routes/subscribers')
const customerRouter = require('./routes/customers')
app.use('/subscribers',subscribersRouter)
app.use('/customers',customerRouter)

app.listen(3000, ()=>console.log("Server Started"))