'use strict';

angular.module('pouchdbTestResultsApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/index.html'
    }];
    
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
