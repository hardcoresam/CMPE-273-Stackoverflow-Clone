const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 4000

dotenv.config();
app.use(express.json())

// use cookie parser to parse request headers
app.use(cookieParser());

let passport = require("passport");
require('./Utils/passport')(passport)
// const checkAuth = passport.authenticate("jwt", { session: false });
//routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/questions', require('./routes/questionRoutes'))

app.listen(PORT, (req, res) => {
    console.log("Kafka middleare ")
})

// const checkAuth = () => passport.authenticate("jwt", { session: false })
// module.exports = { checkAuth };
// export default checkAuth