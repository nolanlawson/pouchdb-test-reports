'use strict';

angular.module('pouchdbTestResultsApp')
  .controller('MainCtrl', function ($scope, $http) {

    $scope.getShortName = function(str) {
      return str.substring(0, 6);
    };

    $http({
      method: 'GET',
      url: 'http://pouchtest.com/couchdb/test_reports/_design/failed_tests/_view/failed_tests',
      params: {
        descending: true,
        include_docs: true,
        reduce: false
      }}).success(function (failedTests) {
        console.log(failedTests);
        $scope.failedTests = failedTests.rows;
      }).error(function (err) {
        console.log(err);
      });
  });
