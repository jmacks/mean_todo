'use strict';
//requirements
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const user = require('../controllers/users_controller');
const list = require('../controllers/lists_controller');
const todo = require('../controllers/todos_controller');
const auth = require('../controllers/auth_controller');

//the actual routes and their corresponding methods
router.route('/user')
      .get(user.get)
      .post(user.create);

router.route('/user/:id')
      .put(user.put)
      .delete(user.destroy);

router.route('/list')
      .get(list.get)
      .post(list.create);

router.route('/list/:id')
      .put(list.put)
      .delete(list.destroy);

router.route('/todo')
      .post(todo.create)
      .get(todo.get)
      .delete(user.destroy);

router.route('/authenticate')
      .post(auth.post);

module.exports = router;
