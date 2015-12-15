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
let get = function(req, res){
  List.find({}, function(err, lists){
    res.json({ lists: lists });
  })
}
//retrieve one list
let getOne = function(req,res){
  let listParams = req.params;
  List.findOne({ _id: listParams.id }, function(err, data){
    if(err){ throw err};
    console.log(data + ' from line 27 api');
    res.json(data)
  })
}

//update lists
let put = function(req, res){
  // let listParams = req.params;
  // console.log(listParams);
  // console.log('###### req.params.id ####');
  // console.log(req.params.id);
  // console.log('###### req.body ####');
  // console.log(req.body.todo);
  // res.send('success');

  // List.findOne({ _title: listParams.title }, function(err, list){
  List.findOne({ _id: req.params.id }, function(err, list){
    // list.todos.push(req.body.todo);
    // list.update
    var newObject = { };
    newObject.title = list.title;
    newObject.todos = list.todos;
    newObject.todos.push(req.body.todo);
    console.log('#### newObject ####');
    console.log(newObject);

    list.update(newObject, function(err, list) {
      console.log(list);
      res.json(list);
    })
    // list.update({
    //   title: list.title,
    //   // todos: list.todos.push({ todo: req.body.todo})
    // }, function(err, list){
    //   console.log(list);
    //   // res.send(list);
    //   res.json(list);
    // });
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
  destroy: destroy,
  getOne: getOne
}
