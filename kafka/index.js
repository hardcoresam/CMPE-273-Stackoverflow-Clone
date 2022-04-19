const express = require('express')
const app = express()

const PORT = process.env.PORT || 4000

app.use(express.json())

//routes
app.use('/api/users',require('./routes/userRoutes'))
app.use('/api/questions',require('./routes/questionRoutes'))


app.listen(PORT,(req,res)=>{
    console.log("Kafka middleare ")
})



