// Ionic Starter App
var fb = new Firebase('https://hubbuddydb.firebaseio.com')
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'firebase'])


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
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

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:
  //HOME TAB
  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeCtrl'
      }
    }
  })

  //DEPLOYMENT TAB
  .state('tab.Deployments', {
      url: '/Deployments',
      views: {
        'tab-Deployments': {
          templateUrl: 'templates/tab-Deployments.html',
          controller: 'DeploymentsCtrl'
        }
      }
    })
    .state('tab.deploy-detail', {
      url: '/Deployments/0',
      views: {
        'tab-Deployments': {
          templateUrl: 'templates/deploy-detail.html',
          controller: 'deployDetailCtrl'
        }
      }
    })
    .state('tab.pool', {
      url: '/Deployments/1',
      views: {
        'tab-Deployments': {
          templateUrl: 'templates/pool.html',
          controller: 'poolCtrl'
        }
      }
    })
    .state('tab.check-in', {
      url: '/Deployments/2',
      views: {
        'tab-Deployments': {
          templateUrl: 'templates/check-in.html',
          controller: 'Check-InCtrl'
        }
      }
    })

  //ROOMCOUNT TAB
  .state('tab.roomcount', {
    url: '/roomcount',
    views: {
      'tab-roomcount': {
        templateUrl: 'templates/tab-roomcount.html',
        controller: 'RoomCountCtrl'
      }
    }
  })

  //RECORDS TAB
  .state('tab.records', {
    url: '/records',
    views: {
      'tab-records': {
        templateUrl: 'templates/tab-records.html',
        controller: 'RecordCtrl'
        }
      }
    })
    .state('tab.deployLog', {
      url: '/records/0',
      views: {
        'tab-records': {
          templateUrl: 'templates/tab-deployLog.html',
          controller: 'deployLogCtrl'
        }
      }
    })
    .state('tab.poolLog', {
      url: '/records/1',
      views: {
        'tab-records': {
          templateUrl: 'templates/tab-poolLog.html',
          controller: 'poolLogCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

});

// function customAlert(title, template) {
//   var alertPop = $ionicPopup.alert({
//     title: title,
//     template: template
//   });
// }
