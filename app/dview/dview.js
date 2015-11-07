var debts = angular.module("debts", ['ngResource', 'ngAnimate', 'ui.bootstrap']);

var cuid = 1;
//var address = "http://83.136.252.107:9000/"
var address = "http://localhost:9000/";
var persons = []
/*
var persons = [
  {name: 'Antonio', debt: 25.55},
  {name: 'Boo-so', debt: -5.76},
  {name: 'Skele-Toni', debt: -14.22},
  {name: 'Tume', debt: 12.42},
  {name: 'Emma', debt: -6.34},
  {name: 'Late', debt: 99.99}
];*/

var contacts = [
  {name: 'Antonio', id: 20},
  {name: 'Boo-so', id: 5},
  {name: 'Emma', id: 17},
  {name: 'Late', id: 1},
  {name: 'Skele-Toni', id: 666777},
  {name: 'Tume', id: 9}
];

var items = [];

debts.factory("userFactory", function($resource) {
  return $resource(address + "api/users/");
});

debts.factory("saldo", function($resource) {
  return $resource(address + "api/users/" + cuid + "/saldo/");
});

debts.factory('userDetail', function( $resource ) {
    return $resource(address + "api/users/:id", {id: '@userID'});
});

debts.controller("DebtPersonController", function ($scope, $timeout, $dialog) {

  $scope.persons = persons;

  // $timeout(function(){
  //   $dialog.dialog({}).open('modalContent.html');
  // }, 3000);

  $scope.greaterThan = function(prop, val){
    return function(item){
      return item[prop] > val;
    };
  };

  $scope.lessThan = function(prop, val){
    return function(item){
      return item[prop] < val;
    };
  };

  var m;

  $scope.openModal = function(size) {
    m = $dialog.dialog({});
    m.open('modal.html');
  };

  // $dialog.dialog({}).open('modalContent.html');

  $scope.$on("viewChangeEvent", function (event, args) {
    m.close();
  });
});

debts.controller("EventController", function ($scope, $rootScope, $http, saldo, userDetail) {
  $scope.items = items;
  $scope.contacts = contacts;
  $scope.selectedContacts = {};

  $scope.addItem = function() {
      var sel = [];
      for (var i = 0; i < $scope.contacts.length; i++) {
        var con = $scope.contacts[i];
        if ($scope.selectedContacts[con.id]) {
          sel.push(con);
        }
      }
      $scope.items.push({name: $scope.itemName, persons: sel, amount: $scope.itemPrice});
      $scope.itemName = "";
      $scope.itemPrice = 0;
      $scope.selectedContacts = {};
  };


  $scope.acceptEvent = function() {
    saldo.query(function(data) {
      angular.forEach(data, function(d){
        userDetail.get({id: d.id}).$promise.then(function(data){
          persons.push({name: data.username, debt:d.saldo })
        });
      });
    });
    $scope.items = [];
    $rootScope.$broadcast("viewChangeEvent", {view: 0 });
  };
});
