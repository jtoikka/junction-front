var debts = angular.module("debts", ['ngResource', 'ngAnimate', 'ui.bootstrap']);

var cuid = 1;
var address = "http://83.136.252.107:9000/";
//var address = "http://localhost:9000/";
var persons = [];

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

debts.controller("DebtPersonController", function ($scope, $rootScope, $timeout, $dialog, saldo, userDetail) {

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

  $scope.loadData = function() {
    //console.log("consolelog");
    $rootScope.persons = [];
    saldo.query(function(data) {
      angular.forEach(data, function(d){
        userDetail.get({id: d.id}).$promise.then(function(data){
          //console.log(data);
          $rootScope.persons.push({id:data.id, name: data.username, debt:d.saldo });
          $scope.persons = $rootScope.persons;
        });
      });
    });
  };

  // $dialog.dialog({}).open('modalContent.html');

  $scope.$on("viewChangeEvent", function (event, args) {
    m.close();
    $scope.loadData();
  });
});

debts.controller("EventController", function ($scope, $rootScope, $http) {
  $scope.items = items;
  $scope.persons = $rootScope.persons;
  $scope.selectedContacts = {};

  //$scope.transTargetId = 2;
  //$scope.transAmount = 15;
  $scope.transTag = 'Food';


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

  $scope.sendTransaction = function() {
    //console.log($scope.sample);
    var payer = $scope.receiver.id;
    console.log(payer)
    var receiver = cuid;
    var amount = $scope.transAmount;
    if (amount < 0) {
      amount = -amount;
      var tmp = payer;
      payer = receiver;
      receiver = tmp;
    }
    var formData = {
      'payer'       : payer,
      'receiver'    : receiver,
      'amount'      : amount,
      'tag'         : $scope.transTag
    };

    $.ajax({
      type      : 'POST',
      url       : address + 'api/transactions/',
      data      : formData,
      dataType  : 'json',
      success   : function(data) {
        console.log(data);
      }
    });
    $rootScope.$broadcast("viewChangeEvent", {});
  };

  $scope.acceptEvent = function() {
    $scope.items = [];
    $rootScope.$broadcast("viewChangeEvent", {});
  };
});
