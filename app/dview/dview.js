var debts = angular.module("debts", []);

var persons = [
  {name: 'Antonio', debt: 25.55},
  {name: 'Boo-so', debt: -5.76},
  {name: 'Skele-Toni', debt: -14.22},
  {name: 'Tume', debt: 12.42},
  {name: 'Emma', debt: -6.34},
  {name: 'Late', debt: 99.99}
];

var contacts = [
  {name: 'Antonio'},
  {name: 'Boo-so'},
  {name: 'Emma'},
  {name: 'Late'},
  {name: 'Skele-Toni'},
  {name: 'Tume'}
];

var items = [
  {name: 'Ambronite', persons: ['Antonio', 'Boo-so', 'Tume'], amount: 28.00},
  {name: 'Mad-croc', persons: ['Antonio', 'Tume'], amount: 3.50}
];

debts.controller("DebtPersonController", function ($scope) {
  $scope.persons = persons;

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
});
debts.controller("EventController", function ($scope) {
  $scope.items = items;
  $scope.contacts = contacts;
});
