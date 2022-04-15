const express = require('express')
const app = express()
const db = require('./models');
const dotenv = require('dotenv')
const passport = require('passport')

dotenv.config();

const PORT = process.env.PORT || 5000

app.use(express.json())

app.use(passport.initialize())

//kafka consumers
require('./kafka/UserConsumer')

db.sequelize.sync().then((req)=>{
app.listen(5000,(req,res)=>{
    console.log("Srever running on port 8585")
});
})
