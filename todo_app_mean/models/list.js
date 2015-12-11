'use strict';

const mongoose = require('mongoose');

let List = new mongoose.Schema({
  title: String,
  todos: []
});


module.exports = mongoose.model('List', List);
