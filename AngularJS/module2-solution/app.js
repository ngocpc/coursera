(function () {
'use strict';
angular.module('ShoppingListCheckOff', [])
.controller('ToBuyShoppingController', ToBuyShoppingController)
.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
function ToBuyShoppingController(ShoppingListCheckOffService) {
  var tobuyList = this;

  tobuyList.Items = ShoppingListCheckOffService.getTobuyItems();

  tobuyList.moveItem = function (itemIndex) {
    ShoppingListCheckOffService.moveItem(itemIndex);
  }
}

AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
  var boughtList = this;

  boughtList.Items = ShoppingListCheckOffService.getBoughtItems();
}


function ShoppingListCheckOffService() {
  var service = this;

  // List of to buy items
  var tobuyItems = [
    {
      name: "Milk",
      quantity: 2
    },
    {
      name: "Donuts",
      quantity: 30
    },
    {
      name: "Cookies",
      quantity: 20
    },
    {
      name: "Chocolate",
      quantity: 5
    },
    {
      name: "Pepto Bismol",
      quantity: 10
    }
  ];

  // List of bought items
  var boughtItems = [];

  // Move item from to buy list to bought llist
  service.moveItem = function (itemIndex) {
    var item = tobuyItems[itemIndex]
    tobuyItems.splice(itemIndex, 1);
    boughtItems.push(item);
  };

  // Return a list of to buy items
  service.getTobuyItems = function () {
    return tobuyItems;
  };
  // Return a list of bought items
  service.getBoughtItems = function () {
    return boughtItems;
  };
}
})();
