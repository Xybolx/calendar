const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// define middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
};

// Static directories
app.use(express.static("client/public"));
app.use(express.static("client/src/imgs"));

// Connect to MongoDB
mongoose
  .connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost:27017/calendar",
    { useNewUrlParser: true })
      .then(() => console.log('MongoDB Connected'))
      .catch(err => console.log(err));

// Add routes, both API and user
app.use(routes);

app.listen(PORT, function () {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});