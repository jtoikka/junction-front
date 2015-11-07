// Declare app level module which depends on views, and components
angular.module('routerApp', [
  'ui.router',
  'dview',
  'aview'
]).
config(['$routeProvider', function($stateProvider,  $urlRouterProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});

  $urlRouterProvider.otherwise('dview');
  $.stateProvider

  .state('dview', {
    url: '/dview',
    templateUrl: 'dview/dview.html'
  })

  .state('aview', {
    url: '/aview',
    templateUrl: 'aview/aview.html'
  });
}]);
