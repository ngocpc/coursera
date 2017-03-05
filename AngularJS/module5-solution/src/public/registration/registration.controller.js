(function () {

angular.module('public')
.controller('RegistrationController', RegistrationController);

RegistrationController.$inject = ['MenuService', 'UserService'];
function RegistrationController(MenuService, UserService) {
  var reg = this;
  reg.checkMenuNumber = true;
  reg.completed = false;
  // console.log("Short Name:", UserService.getShortName());

  reg.submit = function () {
    var promise = MenuService.getMenuItem(reg.user.shortName);
    promise.then(function (response) {
      reg.checkMenuNumber = true;
      reg.completed = true;
      UserService.setUserInfo(reg.user);
      // console.log("User Info:", UserService.getUserInfo().firstname);
    })
    .catch(function (error) {
      reg.checkMenuNumber = false;
      reg.completed = false;
    });
  };
}

})();
