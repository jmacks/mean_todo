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
  self.addList = addList;
  self.getList = getList;
  self.deleteList = deleteList;
  self.newList = [];
  self.test = "LISTS CoNeKtIOJN";

  getList();

  //frontend functions for lists
  function getList(){
    $http
      .get('http://localhost:3000/list')
      .then(function(res){
        self.all = res.data.lists;
      });
  }

  function addList(){
    $http
      .post('http://localhost:3000/list', self.newList)
      .then(function(res){
        getList();
      });
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
