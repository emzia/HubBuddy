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

.controller('deployDetailCtrl', function($scope, $stateParams, Deployments, $firebase, $ionicPopup, $state) {
  $scope.deploy = Deployments.get($stateParams.deployId); //deployment type: Technology, Pool Hall, etc.
  $scope.input = {};
  var asset_name;
  function saveData(date, name, email, ai, asset, witid) {
    var data = {
      date: date,
      name: name,
      email: email,
      ai: ai,
      asset: asset,
      witid: witid
    };
    var updates = {};
    updates['Technology/'+date] = data;
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
    if(asset == '') { //if this QR code's text is not matching any asset on DB
      customAlert('HubBuddy says: ', 'Try Scan QR Code Again.');
      // alert('Try Scan QR Code Again');
    } else if($scope.input.date == undefined || $scope.input.name == undefined || $scope.input.email == undefined || $scope.input.ai == undefined || $scope.input.witid == undefined) {
      customAlert('HubBuddy says: ', 'Fill out all information above.');
    } else {
      saveData($scope.input.date, $scope.input.name, $scope.input.email, $scope.input.ai, asset, $scope.input.witid);
      firebase.database().ref('Technology/Assets/' + asset_name + '/status').once('value', function(snapshot) {
        if(snapshot.val() == 'IN') {
          firebase.database().ref('Technology/Assets/' + asset_name).update({
            status: 'OUT',
            user: $scope.input.name
          });
        }
      });
      customAlert('HubBuddy says: ', 'Information saved on database.');
      $state.go('tab.Deployments');
    }


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
             firebase.database().ref('Technology/Assets/' + $scope.text).once('value', function(snapshot) { //check if this QR code text exists in Assets/
               //TODO: check if result.text exists in this fucking db.
               // Find out how many items are in this db.
               if(snapshot.val().name !== null) { //if exists
                 console.log(snapshot.val().name);
                 asset.innerHTML = $scope.text;
                 customAlert('HubBuddy says: ', 'Asset Identified.');
               } else if(snapshot.val().status == 'OUT') { //if this asset's status is OUT
                 customAlert('HubBuddy says: ', 'Asset is OUT, try other ones.');
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

.controller('RoomCountCtrl', function($scope, $firebase, $ionicPopup, $state, $stateParams) {
  $scope.input = {};
  function saveData(date, mi, r8035, r034) {
    var data = {
      date: date,
      mi: mi,
      r8035: r8035,
      r034: r034
    };

    var updates = {};
    updates['RoomCount/'+ date] = data;
    return firebase.database().ref().update(updates);
    //ENDS HERE
  }
  $scope.saveData = function() {
    console.log('save data');
    if($scope.input.date == undefined || $scope.input.r8035 == undefined || $scope.input.r034 == undefined || $scope.input.mi == undefined) {
      customAlert('HubBuddy says: ', 'Please fill out all information above.');
    } else {
      saveData($scope.input.date,$scope.input.mi,$scope.input.r8035,$scope.input.r034);
      customAlert('HubBuddy says: ', 'Room count data saved to the database.');
      $state.go('tab.Deployments');
    }
  }

  function customAlert(title, template) {
    var alertPop = $ionicPopup.alert({
      title: title,
      template: template
    });
  }

})

.controller('RecordCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('Check-InCtrl', function($scope, $stateParams, $firebase, $state, Deployments, $ionicPopup) {
  $scope.deploy = Deployments.get($stateParams.deployId);
  $scope.input = {};
  //idk
  function addRow(category, asset, checkedby) {
    var table = document.getElementById('check');
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    cell1.innerHTML = asset;
    cell2.innerHTML = checkedby;
    cell3.innerHTML = '<input class="checkin" type="text" id="'+asset+'-ai" placeholder="ex) JP" ng-model="input.ai">';
    cell4.innerHTML = '<input class="checkin" type="datetime-local" id="'+asset+'-date" placeholder="date" ng-model="input.date">';
    // cell5.innerHTML = '<div class="switch"><input class="cmn-toggle cmn-toggle-round" type="checkbox" id="cmn-toggle-1">' +
    //                   '<label for="cmn-toggle-1"></label></div>';
    cell5.innerHTML = '<select name="switch" id="checkin-switch-'+asset+'" data-role="slider" data-mini="true">' +
                      '<option value="out">OUT</option>' +
                      '<option value="in">IN</option>' +
                      '</select>';

    $('#checkin-switch-'+asset).change(function() {
      console.log(this.value); //checkbox's value after changed.
      firebase.database().ref(category + '/Assets/' + asset).once('value', function(snapshot) {
        console.log(snapshot.val().status); //this should be OUT all the time.

        //checking in.
        //TODO: Change status to IN, save AI and date to this table, empty the user
        var assetAi = asset + '-ai';
        var assetDate = asset + '-date';
        firebase.database().ref(category + '/Assets/' + asset).update({
          status: 'IN',
          user: '',
          AI: document.getElementById(assetAi).value,
          checkedinDate: document.getElementById(assetDate).value
        });

        //delete this row.
        $('#checkin-switch-'+asset).closest('tr').remove();

      });
    });

  }

  //get all assets and fill the table
  function createTable(category, asset) {
    //get data from Pool/Assets/ + asset name
    firebase.database().ref(category + '/Assets/' + asset).once('value', function(snapshot) {
      console.log(snapshot.val());
      if(snapshot.val() !== null) {
        var user = snapshot.val().user;
        var name = snapshot.val().name;
        if(snapshot.val().status == 'IN') {
          //don't fill
        } else {
          addRow(category, name, user);
        }
      }
    });
  }

  //manually type asset name to this function.. let's find a way to auto this.
  createTable('Technology', 'AppleA');
  createTable('Technology', 'Basketball');
  createTable('Technology', 'LenovoA');
  createTable('Pool', 'Pool1');
  createTable('Pool', 'Pool2');
  createTable('Pool', 'Pool3');

  // addRow('AppleA', 'Joon');

})

.controller('poolCtrl', function($scope, $firebase, $ionicPopup, $state, $stateParams, Deployments) {
  $scope.deploy = Deployments.get($stateParams.deployId);
  $scope.input = {};
  $scope.poolSticks = [
    {text: '1'},
    {text: '2'},
    {text: '3'}
  ];
  $scope.checkItems = {};

  $scope.print = function() {
    console.log($scope.checkItems);
  }
  var poolkeyArray = [];

  function saveData(date, name, email, ai, witid, pool1, pool2, pool3) {
    //THESE IF STATEMENTS UPDATE STATUSES TO OUT
    if($scope.checkItems['1'] == true) {
      firebase.database().ref('Pool/Assets/Pool1').update({
        status: 'OUT',
        user: name
      });
    }
    if($scope.checkItems['2'] == true) {
      firebase.database().ref('Pool/Assets/Pool2').update({
        status: 'OUT',
        user: name
      });
    }
    if($scope.checkItems['3'] == true) {
      firebase.database().ref('Pool/Assets/Pool3').update({
        status: 'OUT',
        user: name
      });
    }

    var data = {
      date: date,
      name: name,
      email: email,
      ai: ai,
      witid: witid,
      pool1: pool1,
      pool2: pool2,
      pool3: pool3
    };

    var updates = {};
    updates['Pool/'+ date] = data;
    return firebase.database().ref().update(updates);
    //ENDS HERE
  }

  function customAlert(title, template) {
    var alertPop = $ionicPopup.alert({
      title: title,
      template: template
    });
  }


  $scope.saveData = function() {
    if($scope.checkItems['1'] == undefined) {
      $scope.checkItems['1'] = false;
    }
    if($scope.checkItems['2'] == undefined) {
      $scope.checkItems['2'] = false;
    }
    if($scope.checkItems['3'] == undefined) {
      $scope.checkItems['3'] = false;
    }
    // console.log($scope.checkItems['1'], $scope.checkItems['2'], $scope.checkItems['3']);

    firebase.database().ref('Pool/Assets').once('value', function(snapshot) {
      console.log(snapshot.val());
      if((snapshot.val().Pool1.status == 'OUT' && $scope.checkItems['1'] == true) || (snapshot.val().Pool2.status == 'OUT' && $scope.checkItems['2'] == true) || (snapshot.val().Pool3.status == 'OUT' && $scope.checkItems['3'] == true)) {
        customAlert('HubBuddy says: ', 'Selected pool stick(s) is/are out, try other ones');
      } else if($scope.input.date == undefined || $scope.input.name == undefined || $scope.input.email == undefined || $scope.input.ai == undefined || $scope.input.witid == undefined){
        customAlert('HubBuddy says: ', 'Fill out all information needed');
      } else {
        saveData($scope.input.date, $scope.input.name, $scope.input.email, $scope.input.ai, $scope.input.witid, $scope.checkItems['1'], $scope.checkItems['2'], $scope.checkItems['3']);
        customAlert('HubBuddy says: ', 'Pool Hall info saved to database.');
        $state.go('tab.Deployments');
      }

    });

  }
});
