// (function() {
//   var app = angular.module('usersController', []);

//   app.controller('UsersController',
//     function($scope, $http) {
//       var url = 'https://serene-ravine-6822.herokuapp.com/api/users'
//       $http.get(url)
//         .success(function(users) {
//           $scope.users = users;
//         })
//         .error(function(date) {
//           console.log('server side error occurred');
//         })
//       $http.post(url)
//         console.log(url)
//         console.log('submitting new user')
//     }
//   );
// })();