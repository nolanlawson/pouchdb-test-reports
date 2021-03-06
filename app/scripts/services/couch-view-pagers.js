/**
 * Pagers that act as singleton services so there's only one loaded of each at once.
 */
angular.module('pouchdbTestResultsApp')
  .service('recentlyFailedTestsPager', function (CouchViewPager) {
    'use strict';
    var url = 'http://pouchtest.com/couchdb/test_reports/_design/failed_tests/_view/failed_tests';
    var params = {
      descending: true,
      include_docs: true,
      reduce: false
    };

    return new CouchViewPager(url, params);
  })
  .service('testRunsPager', function (CouchViewPager) {
    'use strict';
    var url = 'http://pouchtest.com/couchdb/test_reports/_design/test_runs/_view/test_runs';
    var params = {
      reduce: true,
      group : true
    };

    return new CouchViewPager(url, params);
  })
  .service('mostFailedTestsPager', function (CouchViewPager) {
    'use strict';
    var url = 'http://pouchtest.com/couchdb/test_reports/_design/most_failed_tests/_view/most_failed_tests';
    var params = {
      reduce: true,
      group : true
    };

    return new CouchViewPager(url, params);
  })
  .service('bySessionPager', function (CouchViewPager) {
    'use strict';
    var url = 'http://pouchtest.com/couchdb/test_reports/_design/by_session/_view/by_session';
    var params = {
      include_docs : true
    };

    return new CouchViewPager(url, params);
  })
;
