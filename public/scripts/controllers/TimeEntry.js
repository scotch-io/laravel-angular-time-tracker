(function() {

  'use strict';

  angular
    .module('timeTracker')
    .controller('TimeEntry', TimeEntry);

    function TimeEntry(time, user, $scope) {

      var vm = this;

      vm.timeentries = [];
      vm.totalTime = {};
      vm.users = [];

      // Initialize the clockIn and clockOut times to the current time.
      vm.clockIn = moment();
      vm.clockOut = moment();

      // Grab all the time entries saved in the database
      getTimeEntries();
      // Get the users from the database so we can select
      // who the time entry belongs to
      getUsers();

      function getUsers() {
        user.getUsers().then(function(result) {
          vm.users = result;
        }, function(error) {
          console.log(error);
        });
      }

      // Fetches the time entries from the static JSON file
      // and puts the results on the vm.timeentries array
      function getTimeEntries() {
        time.getTime().then(function(results) {
          vm.timeentries = results;
          updateTotalTime(vm.timeentries);
          console.log(vm.timeentries);
        }, function(error) {
          console.log(error);
        });
      }

      // Updates the values in the total time box by calling the
      // getTotalTime method on the time service
      function updateTotalTime(timeentries) {
        vm.totalTime = time.getTotalTime(timeentries);
      }

      vm.updateTimeEntry = function(timeentry) {

        var updatedTimeEntry = {
          "id":timeentry.id,
          "user_id":timeentry.user.id,
          "start_time":timeentry.start_time,
          "end_time":timeentry.end_time,
          "comment":timeentry.comment
        }

        time.updateTime(updatedTimeEntry);
        console.log(timeentry);
        getTimeEntries();

        $scope.showEditDialog = false;
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
          "user_id":vm.timeEntryUser.id,
          "start_time":vm.clockIn,
          "end_time":vm.clockOut,
          "comment":vm.comment
        });

        getTimeEntries();

        vm.comment = "";
      }

      vm.deleteTimeEntry = function(timeentry) {
        
        var id = timeentry.id;

        time.deleteTime(id);

        getTimeEntries();

      }
    }    

})();