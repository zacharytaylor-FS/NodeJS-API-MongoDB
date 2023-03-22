const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const authorRoutes = require('../api/routes/authors');
const bookRoutes = require('../api/routes/books')
require('dotenv').config();

// * middleware for logging
app.use(morgan('dev'))
// ^ parsing
// ! Bodyparser - most function will be deprecated
app.use(express.urlencoded({
  extended: true
}));

//* middleware that all request are json
app.use(express.json())

//* middleware to handle the CORS policy
app.use((req, res, next) => {
  res.header('Acces-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content-Type, Accept, Authorization');

  //* post put or patch
  if(req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, PATCH, DELETE');
  }
  next();
})

app.get('/', (req, res, next) => {
  res.status(201).json({
    message: 'Service is UP!', 
    method : req.method
  })
});

app.use('/authors', authorRoutes);
app.use('/books', bookRoutes);


// Todo Add middleware to handle errors and bad URLS
app.use((req, res, next) => {
  const error = new Error("NOT FOUND!!");
  error.status = 404
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message,
      status: error.status,
      method: req.method
    }
  })
});

//* Connect to mongoDB
 mongoose.connect(`${process.env.MONGODBURL}`);


// mongoose.connect(process.env.mongoDBURL, (err) => {
//   if(err){
//     console.error("Error:", err.message);
//   }
//   else{
//     console.log("MongoDB connection successful")
//   }
// })
// mongoose.connect(process.env.mongoDBURL, (err) =>{
//   if (err) {
//     console.error("Error: ", err.message);
//   } else {
//     console.log(`MongoDB connection successful`)
//   }
// })

module.exports = app;