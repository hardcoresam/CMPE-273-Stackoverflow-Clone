const express = require('express')
const app =express()

const PORT = process.env.PORT || 4000

app.use(express.json())

//routes
app.use('/api/users',require('./routes/user.routes'))


app.listen(PORT,(req,res)=>{
    console.log("Kafka middleare ")
})



