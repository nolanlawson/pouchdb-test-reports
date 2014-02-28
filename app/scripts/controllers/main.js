'use strict';

angular.module('pouchdbTestResultsApp')
  .controller('MainCtrl', function ($scope, $http, recentlyFailedTestsPager, testRunsPager, mostFailedTestsPager) {

    $scope.recentlyFailedTestsPager = recentlyFailedTestsPager;
    $scope.testRunsPager = testRunsPager;
    $scope.mostFailedTestsPager = mostFailedTestsPager;

    recentlyFailedTestsPager.fetchNextPage();
    testRunsPager.fetchNextPage();
    mostFailedTestsPager.fetchNextPage();

    $scope.getShortCommitName = function (str) {
      return str && str.substring(0, 6);
    };
  });
