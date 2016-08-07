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
  $scope.deploy = Deployments.get($stateParams.deployId); //deployment type: Technology, Pool Hall, etc.
  //var BackHub = monaca.cloud.Collection("Technology");
  //console.log(BackHub);
   // Intialize the "[DEFAULT]" App
  $scope.input = {};
  function getAllData() {
      firebase.database().ref('Technology/').on('value', function (snapshot) {
          // console.log(snapshot.val());
      });
  }

  function saveData(date, name, email, ai, asset) {
    var keyArray = [];

    var data = {
      date: date,
      name: name,
      email: email,
      ai: ai,
      asset: asset
    };

    var key = firebase.database().ref().child('Technology').push().key;
    console.log(key);
    keyArray.push(key);

    var updates = {};
    updates['Technology/'+key] = data;
    console.log('Updated');
    return firebase.database().ref().update(updates);

    //ENDS HERE

  }

  $scope.saveData = function (email) {
      saveData($scope.input.date, $scope.input.name, $scope.input.email, $scope.input.ai, $scope.input.asset);
   }
  $scope.getAllData = function () {
       getAllData();
   }


})

.controller('RecordCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
