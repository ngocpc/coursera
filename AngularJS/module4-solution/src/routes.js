(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menuapp/templates/home.template.html'
  })

  // Category list page
  .state('categoryList', {
    url: '/category-list',
    templateUrl: 'src/menuapp/templates/main-categorylist.template.html',
    controller: 'CategoryListController as categoryList',
    resolve: {
      categories: ['MenuDataService', function (MenuDataService) {
                      return MenuDataService.getAllCategories()
                        .then(function (response) {
                          // console.log("This is reponse data", response.data);
                          return response.data;
                        });
                  }]
    }
  })

  // Items
  .state('categoryList.itemList', {
  // .state('itemList', {
    url: '/item-list/{categoryId}',
    templateUrl: 'src/menuapp/templates/itemlist.template.html',
    controller: 'ItemListController as itemList',
    resolve: {
      items: ['$stateParams', 'MenuDataService', 'categories',
                function ($stateParams, MenuDataService, categories) {
                  // console.log("Categories: ", categories[0]);
                  var categoryShortName = categories[$stateParams.categoryId].short_name;
                  // console.log("Fetching data with shortName = ", categoryShortName);
                  return MenuDataService.getItemsForCategory(categoryShortName)
                    .then(function (response) {
                      // console.log("This is response data", response.data.menu_items);
                      return response.data.menu_items;
                    });
              }]
    },
    params: {
      categoryId: null
    }

  });
}

})();
