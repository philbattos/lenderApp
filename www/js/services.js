angular.module('debenture.services', [])

// http://weblogs.asp.net/dwahlin/using-an-angularjs-factory-to-interact-with-a-restful-service
.factory('TransactionFactory', function($http) {
  var transFactory  = {};
  var stagingUrl    = 'https://serene-ravine-6822.herokuapp.com/api/';
  // var devUrl        = 'http://localhost:3000/api/transactions';

  transFactory.getOpenTransactions = function() {
    return $http.get(stagingUrl + 'transactions')
  }

  transFactory.getOldTransactions = function() {
    return $http.get(stagingUrl + 'old_transactions')
  }

  transFactory.getTransaction = function(id) {
    return $http.get(stagingUrl + 'transactions/' + id)
  }

  transFactory.createTransaction = function(transaction) {
    return $http.post(stagingUrl + 'transactions', transaction)
  }

  return transFactory;
})

.factory('UserLogin', function($resource) {
  var stagingUrl = 'https://serene-ravine-6822.herokuapp.com/users/sign_in.json'
  return $resource(stagingUrl);
})

.factory('UserLogout', function($resource) {
  var stagingUrl = 'https://serene-ravine-6822.herokuapp.com/users/sign_out.json'
  return $resource(stagingUrl);
})

//-------------------------------------------------
//    Example Factory
//-------------------------------------------------
.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
