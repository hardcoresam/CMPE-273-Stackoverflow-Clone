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
require('./kafka/QuestionsConsumer')

db.sequelize.sync().then((req)=>{
app.listen(8585,(req,res)=>{
    console.log("Srever running on port 8585")
});
})
