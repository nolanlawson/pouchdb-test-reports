'use strict';

angular.module('pouchdbTestResultsApp')
  .controller('MainCtrl', function ($scope, $http, recentlyFailedTestsPager, testRunsPager,
                                    bySessionPager, mostFailedTestsPager, $location) {

    if ($location.hash() && $location.hash().indexOf('testrun') !== -1) {
      // show a session detail view
      var sessionId = $location.hash().split('testrun=')[1];

      $http({
        method: 'GET',
        url: 'http://pouchtest.com/couchdb/test_reports/' + sessionId,
        params: {
        }
      }).success(function (result) {

          var session = result;

          $http({
            method: 'GET',
            url: 'http://pouchtest.com/couchdb/test_reports/_design/test_runs/_view/test_runs',
            params: {
              key: JSON.stringify(session._id)
            }
          }).success(function (res) {

              var sessionDetail = res.rows[0].value;

              bySessionPager.params = angular.extend(bySessionPager.params, {
                startkey : JSON.stringify([session._id]),
                endkey : JSON.stringify([session._id, {}])
              });
              bySessionPager.pageSize = 50;

              bySessionPager.fetchNextPage();

              $scope.session = session;
              $scope.session.numFailed = sessionDetail.numFailed;
              $scope.session.numPassed = sessionDetail.numPassed;
              $scope.bySessionPager = bySessionPager;

            }).error(function (err) {
              console.log(err);
            });

        }).error(function (err) {
          console.log(err);
        });
    }


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
