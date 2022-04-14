const express = require('express')
const app = express()
const db = require('./models');


db.sequelize.sync().then((req)=>{
app.listen(5000,(req,res)=>{
    console.log("Srever running on port 8585")
});
})
