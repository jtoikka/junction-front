var debts = angular.module("debts", []);

var persons = [
  {name: 'Antonio', debt: 25.55},
  {name: 'Boo-so', debt: -5.76},
  {name: 'Skele-Toni', debt: -14.22},
  {name: 'Tume', debt: 12.42},
  {name: 'Emma', debt: -6.34},
  {name: 'Late', debt: 99.99}
];

var pending = [
  {person: 'Antonio', tag: '\"Transaction\"', amount: 800.00},
  {person: 'Antonio', tag: 'Protection-fee', amount: 200.00},
  {person: 'Boo-so', tag: 'Pizza!', amount: 5.99},
  {person: 'Antonio', tag: 'Dinner', amount: 77.89}
];

debts.controller("DebtPersonController", function ($scope) {
  $scope.persons = persons;
  $scope.pending = pending;

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
