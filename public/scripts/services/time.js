(function() {

  'use strict';

  angular
    .module('timeTracker')
    .factory('time', time);

    function time($resource) {

      // ngResource call to our static data
      var Time = $resource('api/time/:id', {}, {
        update: {
          method: 'PUT'
        }
      });

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

      function saveTime(data) {

        return Time.save(data, function(success) {
          console.log(success);
        }, function(error) {
          console.log(error);
        });
      }

      function updateTime(data) {
        return Time.update({id:data.id}, data, function(success) {
          console.log(success);
        }, function(error) {
          console.log(error);
        });
      }

      function deleteTime(id) {
        return Time.delete({id:id}, function(success) {
          console.log(success);
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

        // After 24 hours, the Moment.js duration object
        // reports the next unit up, which is days.
        // Using the asHours method and rounding down with
        // Math.floor instead gives us the total hours
        return {
          hours: Math.floor(moment.duration(totalMilliseconds).asHours()),
          minutes: moment.duration(totalMilliseconds).minutes()
        }
      }

      return {
        getTime: getTime,
        getTimeDiff: getTimeDiff,
        getTotalTime: getTotalTime,
        saveTime: saveTime,
        updateTime: updateTime,
        deleteTime: deleteTime
      }
    }

})();