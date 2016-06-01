angular.module('myApp').factory('AuthService', ['$q', '$timeout', '$http',
  function($q, $timeout, $http) {

    // create user variable
    var user = null;

    // return available functions for use in the controllers
    return ({
      isLoggedIn: isLoggedIn,
      getUserStatus: getUserStatus,
    });

    function isLoggedIn() {
      if (user) {
        return true;
      } else {
        return false;
      }
    }

    function getUserStatus() {
      return $http.get('/api/status')
        // handle success
        .success(function(data) {
          if (data.status) {
            user = true;
          } else {
            user = false;
          }
        })
        // handle error
        .error(function(data) {
          user = false;
        });
    }

  }
]);
