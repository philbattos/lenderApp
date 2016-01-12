// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('debenture', ['ionic', 'debenture.controllers', 'debenture.services'])
// angular.module('app', ['ngCordova', 'LocalStorageModule']) // added with tutorial

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // login state added with tutorial
    // .state('login', {
    //   url: '/login',
    //   templateUrl: 'templates/login.html',
    //   controller: 'LoginCtrl'
    // })

    // setup an abstract state for the tabs directive
    // .state('tab', {
    //   url: '/tab',
    //   abstract: true,
    //   templateUrl: 'templates/tabs.html'
    // })

    .state('lend', {
      url: '/lend',
      abstract: true,
      // templateUrl: 'templates/tabs.html'
      templateUrl: 'templates/lendings/side-menu.html',
      controller: 'MenuCtrl' // change name of MenuCtrl ?
    })

    // Each tab has its own nav history stack:

    .state('lend.new', {
      url: '/new',
      views: {
        'menuContent': {
          templateUrl: 'templates/lendings/new.html',
          controller: 'TransactionsCtrl'
        }
      }
    })

    .state('lend.history', {
      url: '/:transactionId',
      views: {
        'menuContent': {
          templateUrl: 'templates/transaction.html',
          controller: 'TransactionCtrl'
        }
      }
    })

    // .state('tab.lendings', {
    //   views: {
    //     'lendings-menu': {
    //       templateUrl: 'templates/side-menu.html',
    //       controller: 'MenuCtrl'
    //     }
    //   }
    // })

    // .state('tab.borrow', {
    //   url: '/borrow',
    //   views: {
    //     'tab-borrow': {
    //       templateUrl: 'templates/tab-borrow.html',
    //       controller: 'ChatsCtrl'
    //     }
    //   }
    // })

    // .state('tab.chat-detail', {
    //   url: '/chats/:chatId',
    //   views: {
    //     'tab-chats': {
    //       templateUrl: 'templates/chat-detail.html',
    //       controller: 'ChatDetailCtrl'
    //     }
    //   }
    // })

    // .state('tab.account', {
    //   url: '/account',
    //   views: {
    //     'tab-account': {
    //       templateUrl: 'templates/tab-account.html',
    //       controller: 'AccountCtrl'
    //     }
    //   }
    // })

    // .state('tab.users', {
    //   url: '/users',
    //   views: {
    //     'tab-users': {
    //       templateUrl: 'templates/tab-users.html',
    //       controller: 'UsersCtrl'
    //     }
    //   }
    // });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/lend/new');

});
