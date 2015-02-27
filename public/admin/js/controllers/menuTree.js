(function() {
  'use strict';
app.controller('MenuTreeController', ['$scope', '$http', '$localStorage', function($scope, $http,$localStorage) {

  var defaultMenu = {
    categories : []
  };
  $scope.menu = angular.copy(defaultMenu);

  $scope.saveLocal = function() {
    if (!$localStorage.menu){
      $localStorage.menu = {};
      $localStorage.lastSave = 0;
    }
    $localStorage.menu[$localStorage.lastSave] = angular.copy($scope.menu);
    $localStorage.lastSave++;
    $localStorage.lastSave %= 60;
  };

  $scope.getLocal = function() {
    var prevMenu = angular.copy($localStorage.menu[$localStorage.lastSave-1]);
    $scope.menu = prevMenu ? prevMenu : angular.copy(defaultMenu);
  };

  $scope.getFromServer = function(){
    $http.get('/admin/place/1/menu').
      success(function(data, status, headers, config) {
        $scope.menu = data ? data : angular.copy(defaultMenu) ;
      }).
      error(function(data, status, headers, config) {
        alert("Your menu was NOT retrieved");
      });
  };

  $scope.upload = function() {
    $http.post('/admin/place/menu', $scope.menu).
      success(function(data, status, headers, config) {
        alert("Your menu was saved");
      }).
      error(function(data, status, headers, config) {
        alert("Your menu was NOT saved");
      });
  };

  $scope.clear = function()
  {
    $scope.menu = angular.copy(defaultMenu);
  };

  $scope.remove = function(scope) {
    scope.remove();
  };

  $scope.toggle = function(scope) {
     scope.toggle();
  };

  $scope.moveLastToTheBegginig = function () {
     var a = $scope.menu.categories.pop();
     $scope.menu.categories.splice(0,0, a);
  };

  $scope.newCategory = function()
  {
      if (!$scope.menu.categories.length == 0){
        $scope.menu.place_id = 1;
      }

      $scope.menu.categories.push({
        name:"Category Name",
        items : []
      });
  };

  $scope.newSubItem = function(scope) {
     var nodeData = scope.$modelValue;
     if (nodeData.items){// then we add an item in a certain category
      nodeData.items.push({
         name : "Item Name",
         price : "0",
         item_options : []
       });
     }
     else if (nodeData.options){// then we add an option in a certain item
      nodeData.options.push({
         name : "Option Name",
         price : "0"
       });
     }
     scope.expand();
   };

   var getRootNodesScope = function() {
     var elem = angular.element('#tree-root');
     return elem.scope();
   };

   $scope.collapseAll = function() {
     var scope = getRootNodesScope();
     scope.collapseAll();
   };

   $scope.expandAll = function() {
     var scope = getRootNodesScope();
     scope.expandAll();
   };


  $scope.info = "Your menu";
  $scope.getFromServer();
}
]);
})();
