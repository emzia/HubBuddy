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

.controller('deployDetailCtrl', function($scope, $stateParams, Deployments, $firebase, $ionicPopup) {
  $scope.deploy = Deployments.get($stateParams.deployId); //deployment type: Technology, Pool Hall, etc.
  //var BackHub = monaca.cloud.Collection("Technology");
  //console.log(BackHub);
   // Intialize the "[DEFAULT]" App
  $scope.input = {};

  var asset_name;

  function getAllData() {
      firebase.database().ref('Technology/').on('value', function (snapshot) {
          // console.log(snapshot.val());
      });
  }

  function saveData(date, name, email, ai, asset, witid) {

    var data = {
      date: date,
      name: name,
      email: email,
      ai: ai,
      asset: asset,
      witid: witid
    };

    var key = firebase.database().ref().child('Technology').push().key;
    console.log(key);

    var updates = {};
    updates['Technology/'+key] = data;
    console.log('Updated');
    return firebase.database().ref().update(updates);

    //ENDS HERE

  }

  function customAlert(title, template) {
    var alertPop = $ionicPopup.alert({
      title: title,
      template: template
    });
  }

  $scope.saveData = function () {
    var asset = document.getElementById('asset').innerHTML;
    if(asset == '') {
      customAlert('HubBuddy says: ', 'Try Scan QR Code Again.');
      // alert('Try Scan QR Code Again');
    } else {
      saveData($scope.input.date, $scope.input.name, $scope.input.email, $scope.input.ai, asset, $scope.input.witid);
    }

    firebase.database().ref('Technology/Assets/' + asset_name + '/status').once('value', function(snapshot) {
      if(snapshot.val() == 'IN') {
        firebase.database().ref('Technology/Assets/' + asset_name).update({
          status: 'OUT'
        });
      }
    });

  }

  $scope.getAllData = function () {
     getAllData();
  }

  $scope.scanBarcode = function() {
     window.plugins.barcodeScanner.scan( function(result) {
         if(result.cancelled)
         {
             customAlert('HubBuddy says: ', 'You cancelled the scan... loser');
         }
         else
         {
             $scope.text = result.text;
             asset_name = result.text;
             var asset = document.getElementById('asset');
             firebase.database().ref('Technology/Assets/' + $scope.text + '/name/').once('value', function(snapshot) { //check if this QR code text exists in Assets/
               //TODO: check if result.text exists in this fucking db.
               // Find out how many items are in this db.
               if(snapshot.val() !== null) { //if exists
                 console.log(snapshot.val());
                 asset.innerHTML = $scope.text;
                 customAlert('HubBuddy says: ', 'Asset Identified.');
               } else { //if not
                 asset.innerHTML = '';
                 customAlert('HubBuddy says: ', 'Asset cannot be identified. Try again.');
               }

             });

             // var asset = document.getElementById('asset');
             // asset.innerHTML = result.text;
             // alert('Asset identified.');

         }}, function(error) {
             alert("Scanning failed: " + error);
         }
   );
  }

})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('poolCtrl', function($scope) {

});
