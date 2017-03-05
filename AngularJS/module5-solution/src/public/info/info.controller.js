(function () {

angular.module('public')
.controller('InfoController', InfoController);

InfoController.$inject = ['UserService', 'MenuService', 'ApiPath'];
function InfoController(UserService, MenuService, ApiPath) {
  var infoCtrl = this;
  infoCtrl.info = UserService.getUserInfo();
  infoCtrl.basePath = ApiPath;

  if (infoCtrl.info) {
    var promise = MenuService.getMenuItem(infoCtrl.info.shortName);
    promise.then(function (response) {
      // console.log(response.data);
      infoCtrl.item = response.data;
    });

    // console.log("User Info:", userInfo.info);
  }

};

})();
