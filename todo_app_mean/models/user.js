'use strict';

const mongoose = require('mongoose');
let ListSchema = require('./list.js').schema;

let User = new mongoose.Schema({
  name: String,
  password: String,
  lists: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List'
  }]
});


module.exports = mongoose.model('User', User);
