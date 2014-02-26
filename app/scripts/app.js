'use strict';

angular.module('pouchdbTestResultsApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'angularMoment'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/pouch-test-reports/index.html', {
        templateUrl: 'partials/main',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/pouch-test-reports/index.html'
      });
      
    $locationProvider.html5Mode(true);
  });
