const express = require("express"),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  cors = require("cors");

require("dotenv").config();

//Midddleware
app.use(cors());
app.use(bodyParser.json());

//import routes
const categoriesRoute = require("./api/routes/categoriesRoute");
const userRoute = require("./api/routes/usersRoute");

app.use("/categories", categoriesRoute);
app.use("/api/user", userRoute);

//connect to db
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, () => {
  console.log("connected to db");
});

app.listen(port, () => {
  console.log("Northwind API server started on: " + port);
});
