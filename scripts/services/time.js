(function() {

  'use strict';

  angular
    .module('timeTracker')
    .factory('time', time);

    function time($resource) {

      var Time = $resource('data/time.json');

      function getTime() {
        return Time.query().$promise.then(function(results) {
          angular.forEach(results, function(result) {
          	result.loggedTime = getTimeDiff(result.start_time, result.end_time);
          });

          return results;
        });
      }

      function getTimeDiff(start, end) {
        var diff = moment(end).diff(moment(start));
        var duration = moment.duration(diff);

        return {
          duration: duration
        }
      }

      function getTotalTime(timeentries) {
        var totalMilliseconds = 0;

        angular.forEach(timeentries, function(key) {
          totalMilliseconds += key.loggedTime.duration._milliseconds;
        });

        return {
          hours: moment.duration(totalMilliseconds).hours(),
          minutes: moment.duration(totalMilliseconds).minutes()
        }
      }

      return {
        getTime: getTime,
        getTimeDiff: getTimeDiff,
        getTotalTime: getTotalTime
      }
    }

})();