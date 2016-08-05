angular.module('starter.services', [])


.factory('Deployments', function () {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var Deployments = [{
        id: 0,
        name: 'Technology Equipment',
        lastText: 'Chargers, HDMI Cables, VGA Cables...',
        icon: 'img/technology.png'
    }, {
        id: 1,
        name: 'Pool Hall',
        lastText: 'Who\'s going to win the challenge?!',
        icon: 'img/pool.png'
    }, {
        id: 2,
        name: 'Sports',
        lastText: 'Basketball, Soccer, Frisbees...',
        icon: 'img/sports.png'
    }, {
        id: 3,
        name: 'Board Games',
        lastText: 'Checkmate, mate.',
        icon: 'img/boardg.png'
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
