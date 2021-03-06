const express = require("express");
const cors = require('cors');

const app = express();
app.use(cors())

const mongoose = require("mongoose");
const dotenv = require("dotenv");
var bodyParser = require('body-parser')
const routes = require('./routes')
dotenv.config();

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to Database");
  }
);

app.use(bodyParser.json())
routes(app);

// function errorResponder(error, req, res, next) { // responding to client
//   if (error.type == 'redirect')
//       res.redirect('/error')
//   else if (error.type == 'time-out') // arbitrary condition check
//       res.status(408).send(error)
//   else
//       next(error) // forwarding exceptional case to fail-safe middleware
// }

const errorResponder = (err, req, res, next) => {
  console.log('inside error handler');
  console.log(err);
  console.log('name',err.name);
  console.log('message',err.message);
  console.log('status',err.status);

  res.header("Content-Type", 'application/json')
  res.status(err.status || 500).send({errors:[{message :err.message}]}) // pretty print
}
app.use(errorResponder)


app.listen(8800, () => {
  console.log("API running on port:", 8800);
});
