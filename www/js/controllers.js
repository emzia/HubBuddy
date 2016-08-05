angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope) {})

.controller('DeploymentsCtrl', function($scope, Deployments) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.Deployments = Deployments.all();
  $scope.remove = function(deploy) {
    Deployments.remove(deploy);
  };
  
})

.controller('deployDetailCtrl', function($scope, $stateParams, Deployments, $firebase) {
  $scope.deploy = Deployments.get($stateParams.deployId);
  //var BackHub = monaca.cloud.Collection("Technology");
  //console.log(BackHub);
   // Intialize the "[DEFAULT]" App
  $scope.input = {};
  function getAllData() {
      firebase.database().ref('Technology/').on('value', function (snapshot) {
          console.log(snapshot.val());
      });
  }

  function saveData(name, email) {
      firebase.database().ref('Technology/').push({
          name: name,
          email: email,
      }, function (error) {
          console.log(error);
      });
  }
  
  $scope.saveData = function (email) {
      saveData($scope.input.name, $scope.input.email);
   }
  $scope.getAllData = function () {
       getAllData();
   }
    
  
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
 