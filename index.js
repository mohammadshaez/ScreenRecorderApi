const express = require("express");
const app = express();
const loginRouter = require("./routers/user")
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
app.use(cors());
dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((err) => {
    console.log("Connection Failed", err);
  });

app.use(express.json());
app.use("/api", loginRouter)

app.listen(process.env.PORT || 3001, () => {
    console.log("Server is up and running...")
})