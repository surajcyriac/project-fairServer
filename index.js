// steps to definr express server
// 1. import .env file contents to process .env
require('dotenv').config()
//  2.importy express
const express = require('express')
// 3. import cors
const cors = require('cors')
const pfServer =express()
const router=require('./routes/router')
// import the connection js file 
require('./database/dbConnection')


pfServer.use(cors())
pfServer.use(express.json())
pfServer.use(router)
// folder globlisation
pfServer.use('/uploads',express.static('./uploads'))



// creating port
const PORT=3000||process.env.PORT
// run server
pfServer.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
    })

pfServer.get('/',(req,res)=>{
    res.status(200).send('<h1 style="color:red;">pf server started at port and waiting for client req </h1>')
})
