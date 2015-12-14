'use strict';

let List = require('../models/list');

let create = function(req, res){
  let newList = new List(req.body);

  newList.save((err, list) => {
    if(err){
      return res.status(401).send(err);
    } else {
      return res.status(200).json(list);
    }
  });
}
//retrieve the lists
let get =function(req, res){
  List.find({}, function(err, lists){
    res.json({ lists: lists });
  })
}
//update lists
let put = function(req, res){
  let listParams = req.body.list;
  List.findOne({ title: listParams.title }, function(err, list){
    list.update({
      title: listParams.newTitle,
      todos: listParams.todos.push(listParams.newTodo)
    }, function(err, list){
      res.send(list);
    });
  });
}
//deletes lists
let destroy = function(req, res){
  let listParams = req.body;
  List.findOne({ _id: req.params.id }, function(err, list){
    if(err){
      return err
    } else {
      list.remove(function(err){
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
