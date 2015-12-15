'use strict';

let TOKEN;
angular.module('Todo', [])
       .controller('UsersController', UsersController)
       .controller('ListsController', ListsController)
       .controller('AuthController', AuthController)
////////////USERS CONTROLLER////////////////
UsersController.$inject = ['$http'];

function UsersController($http){
  //setting up users controller object
  let self = this;
  self.all = [];
  self.addUser = addUser;
  self.getUser = getUser;
  self.deleteUser = deleteUser;
  self.newUser = {};
  self.test = "usr cntrl cnctd!";

  getUser();

//giving her some functions to play with
  function getUser(){
    $http
      .get('http://localhost:3000/user')
      .then(function(res){
        self.all = res.data.users;
      });
  }

  function addUser(){
    console.log(self.newUser);
    $http
      .post('http://localhost:3000/user', self.newUser)
      .then(function(res){
        getUser();
      });
      self.newUser = {};
  }

  function deleteUser(user){
    $http
      .delete('http://localhost:3000/user/' + user._id)
      .then(function(res){
        let index = self.all.indexOf(user);
        self.all.splice(index, 1);
      });
  }



}

///////////////////LISTS CONTROLLER////////////////////

ListsController.$inject = ['$http'];

function ListsController($http){

  //setting up lists controller object
  let self = this;
  self.all = [];
  self.list = {};
  self.addList = addList;
  self.getList = getList;
  self.deleteList = deleteList;
  self.newList = {};
  self.getOneList = getOneList;
  self.newTodo = "";
  self.addTodo = addTodo;
  self.test = "LISTS CoNeKtIOJN";
  self.toDoArr = [];

  getList();

  //frontend functions for lists
  function getList(){
    $http
      .get('http://localhost:3000/list')
      .then(function(res){
        self.all = res.data.lists;
      });
  }

  function getOneList(list){
    console.log(list._id);
    $http
      .get('http://localhost:3000/list/' + list._id)
      .then(function(res){
        console.log(res.data);
        self.list = res.data;
        self.list.todos = res.data.todos;
        // console.log(self.list.todos);
        // console.log(self.list._id);


      });
  }

  function addTodo(list){
    console.log('self.list._id = ' + self.list._id);
    console.log('self.newTodo = ' + self.newTodo);
    $http
      .put('http://localhost:3000/list/' + self.list._id, { "todo": self.newTodo })
      // .put('http://localhost:3000/list/' + self.list._id)

      .then(function(res){
        // self.toDoArr.push(res.data.list.todos);
        console.log(res.data);
        console.log(res);
        self.getOneList(res.data);
        console.log('update self.list');

      })
  }

  function addList(){
    $http
      .post('http://localhost:3000/list', self.newList)
      .then(function(res){
        // getList();
        console.log(res.data);
        self.getOneList(res.data);
        self.getList();
      });
      // self.list = self.newList;
      // self.list.todos = [];
      // self.getOneList(list);
      self.newList = {};
  }

  function deleteList(list){
    $http
      .delete('http://localhost:3000/list/' + list._id)
      .then(function(res){
        let index = self.all.indexOf(list);
        self.all.splice(index, 1);
      });
  }



}


/////////////AUTHORIZATION CONTROLLER///////////////////////

AuthController.$inject = ['$http'];

function AuthController($http){

  let self = this;
  self.login = login;
  self.token = TOKEN;

  self.welcome = "";

  function login(user){
    $http
    .post("http://localhost:3000/authenticate", { name: user.name, password: user.password }).success(function(data, status){
       if(data.token){
        TOKEN = data.token;
        self.token = data.token;//doesnt work
        console.log(data.token);
//testing connection between the dom and controller in login auth scope
        self.welcome = "welcome " + user.name;


       }
    });

  }

}
