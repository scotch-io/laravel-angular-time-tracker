(function() {

  'use strict';

  angular
    .module('timeTracker')
    .controller('TimeEntry', TimeEntry);

    function TimeEntry(time, $scope) {

      var vm = this;

      vm.timeentries = [];

      vm.totalTime = {};


      // Fetches the time entries from the static JSON file
      // and puts the results on the vm.timeentries array
      time.getTime().then(function(results) {
        vm.timeentries = results;
        updateTotalTime(vm.timeentries);
        console.log(vm.timeentries);
      }, function(error) {
        console.log(error);
      });

      // Updates the values in the total time box by calling the
      // getTotalTime method on the time service
      function updateTotalTime(timeentries) {
        vm.totalTime = time.getTotalTime(timeentries);
      }

      // Submits the time entry that will be called 
      // when we click the "Log Time" button
      vm.logNewTime = function() {
      	// Make sure that the clock-in time isn't after
      	// the clock-out time!
        if(vm.clockOut < vm.clockIn) {
          alert("You can't clock out before you clock in!");
          return;
        }



        time.saveTime({
          "user_id":vm.timeEntryUser.user.id,
          "start_time":vm.clockIn,
          "end_time":vm.clockOut,
          "comment":vm.comment,
          "_token":"Zz7P4adiQMbNbWCvOWeSJj6bVJ74RQQeswgBa77v"
        });

        console.log(vm.timeentries);

        updateTotalTime(vm.timeentries);

        vm.comment = "";
      }

      vm.deleteTimeEntry = function(timeentry) {
        
        var id = timeentry.id;

        time.deleteTime(id);

      }

    }

    

})();