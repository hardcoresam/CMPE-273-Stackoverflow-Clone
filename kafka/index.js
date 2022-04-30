const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require('cors')
const PORT = process.env.PORT || 4000;

dotenv.config();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,          //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}))


// use cookie parser to parse request headers
app.use(cookieParser());
let passport = require("passport");
require("./Utils/passport")(passport);

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/post", require("./routes/postRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/chat", require("./routes/messageRoutes"));
app.use("/api/tags", require("./routes/tagRoutes"));

app.listen(PORT, (req, res) => {
  console.log("Kafka middleare ");
});
