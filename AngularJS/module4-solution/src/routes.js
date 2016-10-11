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
    templateUrl: 'src/menuapp/templates/main-itemlist.template.html',
    controller: 'ItemListController as itemList',
    resolve: {
      categoryName: ['$stateParams', 'categories',
                          function ($stateParams, categories) {
                            return categories[$stateParams.categoryId].name;
                          }],
      items: ['$stateParams', 'MenuDataService', 'categories',
                function ($stateParams, MenuDataService, categories) {
                  var categoryShortName = categories[$stateParams.categoryId].short_name;
                  return MenuDataService.getItemsForCategory(categoryShortName)
                    .then(function (response) {
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
