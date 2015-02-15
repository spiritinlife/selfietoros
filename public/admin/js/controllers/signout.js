'use strict';

/* Controllers */
  // signin controller
app.controller('SignoutController', ['$scope', '$http', '$state', 'principal', function($scope, $http, $state,principal) {
    $scope.user = {};
    $scope.authError = null;
    $scope.logout = function() {
      $scope.authError = null;
	    // here, we fake authenticating and give a fake user
	    principal.authenticate(null);
	    $state.go('access.signin');

      // Try to logout
      $http.post('api/logout', {email: $scope.user.email, password: $scope.user.password})
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