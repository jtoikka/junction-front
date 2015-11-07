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
  {name: 'Antonio', id: 20},
  {name: 'Boo-so', id: 5},
  {name: 'Emma', id: 17},
  {name: 'Late', id: 1},
  {name: 'Skele-Toni', id: 666777},
  {name: 'Tume', id: 9}
];

var items = [];

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

  $scope.$on("viewChangeEvent", function (event, args) {
   $scope.view = args.view;
  });
});

debts.controller("EventController", function ($scope) {
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
    $scope.$emit("viewChangeEvent", {view: 0 });
    $scope.items = [];
  };
});
