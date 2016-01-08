angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('UsersCtrl', function($scope, $http, $ionicPopup) {
  var stagingUrl  = 'https://serene-ravine-6822.herokuapp.com/api/users'
  var devUrl      = 'http://localhost:3000/api/users'

  $http.get(stagingUrl)
    .success(function(data) {
      $scope.users = data.users;
    })
    .error(function(data) {
      console.log('server side error occurred');
    })

  $scope.createUser = function(user) {

    var request = {
      method: 'POST',
      url: stagingUrl,
      data: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone
      }
    }

    $http(request)
      .success(function(user) {
        // $scope.users.push({
        //   firstname: user.name,
        //   email: user.email
        // })
        // user.email = ""
        var alertPopup = $ionicPopup.alert({
          title: 'Success',
          template: `A new user has been created for ${user.email}!`
        })
      })
      .error(function(user) {
        var alertPopup = $ionicPopup.alert({
          title: 'Error',
          template: `A new user could not be created for #{user.email}. Please try again.`
        })
      })

  };
})

.controller('TransactionsCtrl', function($scope, $http, $ionicPopup) {
  var stagingUrl  = 'https://serene-ravine-6822.herokuapp.com/api/transactions'
  var devUrl      = 'http://localhost:3000/api/transactions'

  $http.get(stagingUrl)
    .success(function(data) {
      $scope.openTransactions = data.open_transactions;
    })
    .error(function(data) {
      console.log('server side error occurred');
    })

  $scope.createTransaction = function(transaction) {

    var request = {
      method: 'POST',
      url: stagingUrl,
      data: {
        firstname: transaction.firstname,
        lastname: transaction.lastname,
        email: transaction.email,
        phone: transaction.phone,
        amount: transaction.amount,
        terms: transaction.terms
      }
    }

    $http(request)
      .success(function(transaction) {
        console.log(transaction);
        // window.location.reload(true);
        var alertPopup = $ionicPopup.alert({
          title: 'Success',
          template: `A text has been sent to ${transaction.firstname}'s phone to confirm the transaction.`
        })
        alertPopup.then(function(res) {
          window.location.reload(true);
        })
      })
      .error(function(transaction) {
        var alertPopup = $ionicPopup.alert({
          title: 'Error',
          template: `A new transaction could not be created for ${transaction.email}. Please try again.`
        })
        alertPopup.then(function(res) {
          window.location.reload(true);
        })
      })

  };
});
