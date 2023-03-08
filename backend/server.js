require("dotenv").config();

const PORT = 5000;
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");

//express app
const app = express();

app.use(express.json({ limit: "30mb", extented: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(morgan("dev"));

//middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/", userRoute); //http://localhost:5000/signup
app.use("/admin", adminRoute); //http://localhost:5000/admin/users

//connect to db
const MONGO_URL = "mongodb://localhost:27017/SmartSpace";

mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`${error} did not connect`);
  });
