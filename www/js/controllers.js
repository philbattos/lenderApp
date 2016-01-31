angular.module('debenture.controllers', [])

//-------------------------------------------------
//    example controllers
//-------------------------------------------------
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

.controller('MenuCtrl', function($scope) {
  // $scope.lendings = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('LoginCtrl', function($scope, $location, UserLogin, $ionicPopup, $rootScope) {
  // source: http://www.dovetaildigital.io/blog/2015/8/26/rails-and-ionic-make-love-part-two
  $scope.data = {};
  $scope.user = window.localStorage['userName']

  $scope.login = function() {
    var userSession = new UserLogin({ user: $scope.data });
    userSession.$save(
      function(data){
        console.log("logging in " + data.user.email)
        window.localStorage['userId'] = data.user.id;
        window.localStorage['userName'] = data.user.email;
        $location.path('/lend/new');
      },
      function(err){
        // alert(err);
        console.log(err)
        // var error = err["data"]["error"] || err.data.join('. ')
        var confirmPopup = $ionicPopup.alert({
          title: 'There was a problem signing in. Please try again or contact our support team.',
          // template: error
        });
      }
    );
  };
})

.controller('LogoutCtrl', function($scope, $location, UserLogout, $ionicPopup, $rootScope, $ionicHistory, $timeout) {
  $scope.logout = function() {
    var userId = window.localStorage['userId']
    var userSession = new UserLogout({ user: userId });
    userSession.$delete(
      function(data) {
        console.log(data)
        window.localStorage.clear();
        // $ionicHistory.clearCache().then(function() {
        //   $ionicHistory.clearHistory();
        // });
        $timeout(function() {
          $ionicHistory.clearCache();
          $ionicHistory.clearHistory();
        }, 100);
        $location.path('/login')
      },
      function(error) {
        console.log(error)
        var confirmPopup = $ionicPopup.alert({
          title: 'There was a problem signing out. Please try again or contact our support team.',
          // template: error
        })
      }
    );
  };
})

//-------------------------------------------------
//    single TRANSACTION (:show)
//-------------------------------------------------
.controller('TransactionCtrl', function($scope, TransactionFactory, $stateParams) {
  var id = $stateParams.transactionId
  TransactionFactory.getTransaction(id)
    .success(function (data) {
      console.log(data)
      $scope.transaction = data.transaction
    })
    .error(function (error) {
      console.log('There was an error in the TransactionCtrl');
    });
})

//-------------------------------------------------
//    TRANSACTION collections & creation (:index, :create)
//-------------------------------------------------
.controller('TransactionsCtrl', function($scope, TransactionFactory, $ionicModal, $cordovaContacts, $ionicPopup, $ionicLoading) {
  $scope.transaction = {firstname: '', lastname: '', phone: ''}
  $scope.user = window.localStorage['userName']
  openTransactions();

  function openTransactions() {
    TransactionFactory.getOpenTransactions()
      .success(function (data) {
        $scope.openTransactions = data.open_transactions;
      })
      .error(function(data) {
        console.log('There was an error in the TransactionsCtrl');
      });
  }

  $scope.createTransaction = function(transaction) {
    TransactionFactory.createTransaction(transaction)
      .success(function () {
        console.log(transaction);
        // window.location.reload(true);
        var alertPopup = $ionicPopup.alert({
          title: 'Success',
          template: 'A text has been sent to ' + transaction.firstname + ' to confirm the transaction.',
        })
        alertPopup.then(function(res) {
          window.location.reload(true);
        })
      })
      .error(function(transaction) {
        var alertPopup = $ionicPopup.alert({
          title: 'Error',
          template: 'A new transaction could not be created for ' + transaction.email + '. Please try again.'
        })
        alertPopup.then(function(res) {
          window.location.reload(true);
        })
      })
  }

  // move CONTACTS functions to a controller or service?
  $scope.getContactList = function() {
    var options = {
      filter:         '',
      multiple:       true,
      hasPhoneNumber: true, // Android only
      // desiredFields:  [name, phoneNumbers]
    };

    $cordovaContacts.find(options).then(function(result) {
      result = result.filter(function(contact) {
        return contact.phoneNumbers
      });
      $scope.contacts = result.sort(function(a, b) {
        var aName = a.name.formatted || 'zzz'
        var bName = b.name.formatted || 'zzz'
        return aName.localeCompare(bName);
      });
      console.log($scope.contacts.length)
    }, function(error) {
      console.log("ERROR: " + error);
    });
  };

  $scope.selectContact = function(contact) {
    console.log(contact.name.formatted)
    $scope.transaction.firstname = contact.name.givenName;
    $scope.transaction.lastname = contact.name.familyName;
    $scope.transaction.phone = contact.phoneNumbers[0].value;
    $scope.modal.hide();
  };

  $ionicModal.fromTemplateUrl('templates/contacts_modal.html', {
      scope: $scope,
      animation: 'slide-in-right'
    }).then(function(modal) {
      $scope.modal = modal;
    });

})

//-------------------------------------------------
//    USER collections & creation (:index, :create)
//-------------------------------------------------
// TO DO: Move to User Factory
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
          template: 'A new user has been created for ' + user.email
        })
      })
      .error(function(user) {
        var alertPopup = $ionicPopup.alert({
          title: 'Error',
          template: 'A new user could not be created for ' + user.email + '. Please try again.'
        })
      })

  }
});
