(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemListController', ItemListController);


ItemListController.$inject = ['items', 'categoryName'];
function ItemListController(items, categoryName) {
  var itemList = this;
  itemList.items = items;
  itemList.categoryName = categoryName;

  console.log("Category name: ", categoryName);
}

})();

// ItemListController.$inject = ['$stateParams', 'MenuDataService', 'categories'];
// function ItemListController($stateParams, MenuDataService, categories) {
//   var itemList = this;
//
//   var categoryShortName = categories[$stateParams.categoryId].short_name;
//   // console.log("Fetching data with shortName = ", categoryShortName);
//
//   itemList.items = MenuDataService.getItemsForCategory(categoryShortName)
//     .then(function (response) {
//       // console.log("This is response data", response.data.menu_items);
//       return response.data.menu_items;
//     });
//
//   console.log("These are items: ", itemList.items[]);
// }
//
// })();
