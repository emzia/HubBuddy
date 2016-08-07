angular.module('starter.services', [])


.factory('Deployments', function () {
    // Might use a resource here that returns a JSON array

    var Deployments = [{
        id: 0,
        name: 'Technology, Sports, & Board Games',
        lastText: 'Ask for their Wentworth ID!',
        icon: 'img/technology.png'
    }, {
        id: 1,
        name: 'Pool Hall',
        lastText: 'Who\'s going to win the challenge?!',
        icon: 'img/pool.png'
    }, {
        id: 2,
        name: 'Check-In & Return Assets',
        lastText: 'Don\'t forget to return their ID!',
        icon: 'img/pool.png'
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
});
