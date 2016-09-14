(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
  $scope.dishes = "";
  $scope.message = "";
  $scope.msgStyle = {};
  $scope.textboxStyle = {};

  $scope.sayMessage = function () {
    var messageToUser = "";
    var userDishes = $scope.dishes;

    if (userDishes.length == 0) {
      messageToUser = "Please enter data first";
      $scope.msgStyle = {color : 'red'};
      $scope.textboxStyle = {'border-color' : 'red'};
    }
    else {
      $scope.msgStyle = {color : 'green'};
      $scope.textboxStyle = {'border-color' : 'green'};
      // var userDishes = userDishes.replace(/\s/g, '');
      var arrayOfDishes = userDishes.split(",");
      // var arrayOfDishes = arrayOfDishes.join('').split('');

      if (arrayOfDishes.length <= 3) {
        messageToUser = "Enjoy!";
      }
      else {
        messageToUser = "Too much!";
      }
    }
    $scope.message = messageToUser;
  };
}
})();
