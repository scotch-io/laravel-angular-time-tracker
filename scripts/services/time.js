(function() {

  'use strict';

  angular
    .module('timeTracker')
    .factory('time', time);

    function time($resource) {

      // ngResource call to our static data
      var Time = $resource('data/time.json');

      function getTime() {

      	// $promise.then allows us to intercept the results of the 
      	// query so we can add the loggedTime property
        return Time.query().$promise.then(function(results) {
          angular.forEach(results, function(result) {

          	// Add the loggedTime property which calls 
          	// getTimeDiff to give us a duration object
          	result.loggedTime = getTimeDiff(result.start_time, result.end_time);
          });

          return results;
        }, function(error) {
          console.log(error);
        });
      }

      // Use Moment.js to get the duration of the time entry
      function getTimeDiff(start, end) {
        var diff = moment(end).diff(moment(start));
        var duration = moment.duration(diff);

        return {
          duration: duration
        }
      }

      // Adds up the total time for all of our time entries
      function getTotalTime(timeentries) {
        var totalMilliseconds = 0;

        angular.forEach(timeentries, function(key) {
          totalMilliseconds += key.loggedTime.duration._milliseconds;
        });

        // We can access the hours and minutes of the total
        // time directly from Moment's duration calculation
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