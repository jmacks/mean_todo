'use strict';

let User = require('../models/user');

let create = function(req, res){
  let newUser = new User(req.body);
  newUser.save((err, user) => {
    if(err){
      return res.status(401).send(err);
    } else {
      return res.status(200).json(user);
    }
  });
}

let get = function(req, res){
  User.find({}, function(err, users){
    res.json({ users: users });
  })
}
//update user data
let put = function(req, res){
  let userParams = req.body.user;
  User.findOne({ name: userParams.name }, function(err, user){
    user.update({
      name: userParams.newName,
      //below prob needs to change
      lists: userParams.newList
    }, function(err, user){
      res.send(user);
    });
  });
}
//delete users
let destroy = function(req, res){
  let userParams = req.body;
  User.findOne({ _id: req.params.id }, function(err, user){
    if(err){
      return err
    } else {
      user.remove(function(err){
        res.send({ 'record' : 'deleted' })
      })
    }
  });
}

module.exports = {
  create: create,
  get: get,
  put: put,
  destroy: destroy
}
