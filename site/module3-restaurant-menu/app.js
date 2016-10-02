(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'itemList.html',
    scope: {
      items: '<',
      isNothingFound: '=',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'menu',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var menu = this;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;
  menu.searchTerm = "";
  menu.isNothingFound = false;

  menu.searchMenuItems = function (searchTerm) {
    if (!searchTerm) {
      menu.isNothingFound = true;
      return;
    }

    var promise = MenuSearchService.getMatchedMenuItems();

    promise.then(function (response) {
      var menuItems = response.data.menu_items;
      var foundItems = [];
      var lastItem = 0;
      for (var i = 0; i < menuItems.length; i++) {
        if (menuItems[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
          foundItems[lastItem++] = menuItems[i];
        }
      }
      if (foundItems.length == 0) {
        menu.isNothingFound = true;
        return;
      }

      menu.isNothingFound = false;
      menu.items = foundItems;
    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
    });
  }

  menu.removeItem = function (itemIndex) {
    menu.items.splice(itemIndex, 1);
  };
}

MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService($http, ApiBasePath) {
  var service = this;
  service.getMatchedMenuItems = function () {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });

    return response;
  };
}

})();
