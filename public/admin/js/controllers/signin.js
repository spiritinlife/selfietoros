'use strict';

/* Controllers */
  // signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state', 'principal', function($scope, $http, $state,principal) {
    $scope.user = {};
    $scope.authError = null;
    $scope.login = function() {
      $scope.authError = null;
        // here, we fake authenticating and give a fake user
        principal.authenticate({
          name: 'Test User',
          roles: ['Admin']
        });
        
        if ($scope.returnToState) $state.go($scope.returnToState.name, $scope.returnToStateParams);
        else $state.go('app.dashboard-v1');
      // Try to login
      $http.post('api/login', {email: $scope.user.email, password: $scope.user.password})
      .then(function(response) {
        if ( !response.data.user ) {
          $scope.authError = 'Email or Password not right';
        }else{
          $state.go('app.dashboard-v1');
        }
      }, function(x) {
        $scope.authError = 'Server Error';
      });
    };
  }
]);