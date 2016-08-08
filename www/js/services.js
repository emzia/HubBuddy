angular.module('starter.services', [])


.factory('Deployments', function () {
    // Might use a resource here that returns a JSON array

    var Deployments = [{
        id: 0,
        name: 'Technology, Sports, & Board Games',
        lastText: 'Ask for their Wentworth ID!',
        icon: 'img/deploy.png'
    }, {
        id: 1,
        name: 'Pool Hall',
        lastText: 'Who\'s going to win the challenge?!',
        icon: 'img/pool.png'
    }, {
        id: 2,
        name: 'Check-In & Return Assets',
        lastText: 'Don\'t forget to return their ID!',
        icon: 'img/checkin.png'
    }];



    return {
        all: function () {
            return Deployments;
        },
        remove: function (deploy) {
            Deployments.splice(Deployments.indexOf(deploy), 1);
        },
        get: function (deployId) {
            for (var i = 0; i < Deployments.length; i++) {
                if (Deployments[i].id === parseInt(deployId)) {
                    return Deployments[i];
                }
            }
            return null;
        }
    };
})

.factory('Records', function() {
  var Records = [{
    id: 0,
    name: 'Technology Logs',
    lastText: 'LOGZ',
    icon: 'img/deploy.png'
  }, {
    id: 1,
    name: 'Pool Logs',
    lastText: 'POOL LOGZ',
    icon: 'img/pool.png'
  }];

  return {
    all: function() {
      return Records;
    },
    remove: function(record) {
      Records.splice(Records.indexOf(record), 1);
    },
    get: function(recordId) {
      for(var i = 0; i < Records.length; i++) {
        if(Records[i].id === parseInt(recordId)) {
          return Records[i];
        }
      }
      return null;
    }
  };
});
