'use strict';
//required globally
const express = require('express');
let app = express();

const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');

const routes = require('./routes/todo.js');

//stuff to use
app.use('/', express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use('/scripts', express.static(__dirname + '/node_modules'));
app.use(routes);
//connection to the mongo database
mongoose.connect('mongodb://localhost/todo', function(err){
  if(err){
    console.log('ToDo DATABASE CONNECTION ERROR')
  } else {
    console.log('ToDo DATABASE CONNECTED!!!')
  }
});
const db = mongoose.connection;
//now listen to the server
const server = app.listen(3000, function(){
  console.log('ToDo RUNNING ON PORT 3000 :-x')
});
