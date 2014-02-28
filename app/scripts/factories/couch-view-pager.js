/**
 * Factory that makes it easier to interact with CouchDB views.  Use it for simple
 * view paging.
 */
angular.module('pouchdbTestResultsApp')
  .factory('CouchViewPager', function ($http) {
    function CouchViewPager(url, params) {
      var self = this;
      self.url = url;
      self.params = params;
      self.pageSize = 10;
      self.results = [];
      self.lastKey = null;
      self.hasMore = true;
    }

    CouchViewPager.prototype.fetchNextPage = function() {
      var self = this;

      var params = angular.extend({}, self.params);
      params.limit = self.pageSize + 1;
      if (self.lastKey) {
        params.startkey = JSON.stringify(self.lastKey);
      }
      $http({
        method: 'GET',
        url: self.url,
        params: params
      }).success(function (result) {
          if (result.rows.length > self.pageSize) {
            self.lastKey = result.rows.pop().key;
          } else {
            self.lastKey = null;
          }
          self.results = self.results.concat(result.rows);
          self.hasMore = !!self.lastKey;
        }).error(function (err) {
          console.log(err);
        });
    }
    return CouchViewPager;
  });
