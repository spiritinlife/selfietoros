(function() {
  'use strict';
app.controller('MenuTreeController', ['$scope', '$http', function($scope, $http) {

  $scope.remove = function(scope) {
    console.log("DWDWDW");
       scope.remove();
  };

  $scope.toggle = function(scope) {
     scope.toggle();
  };

  $scope.moveLastToTheBegginig = function () {
     var a = $scope.categories.pop();
     $scope.categories.splice(0,0, a);
  };

  $scope.newCategory = function()
  {
      $scope.categories.push({
        name:"Category Name",
        items : []
      });
  };

  $scope.newSubItem = function(scope) {
     var nodeData = scope.$modelValue;
     console.log(nodeData);
     if (nodeData.items){// then we add an item in a certain category
      nodeData.items.push({
         name : "Item Name",
         price : "Item Price",
         options : []
       });
     }
     else if (nodeData.options){// then we add an option in a certain item
      nodeData.options.push({
         name : "Option Name",
         price : "Option added price"
       });
     }
     scope.expand();
   };

   var getRootNodesScope = function() {
     var elem = angular.element('#tree-root');
     return elem.scope();
     //return angular.element(document.getElementById("tree-root")).scope();
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
  $scope.categories = [
    {name:"Kafes",items:[
      {name:"Cappuchino1" , price:3 , options :[{name:"Metrios"},{name:"Sketos"}]},
      {name:"Cappuchino2" , price:3 , options :[]},
      {name:"Cappuchino3" , price:3 , options :[]}
      ]
    },
    {name:"Prwino",items:[
      {name:"Omeleta1" , price:5 , options :[]},
      {name:"Omeleta2" , price:5 , options :[]},
      {name:"Omeleta3" , price:5 , options :[]}
      ]
    }
  ];
}
]);
})();
