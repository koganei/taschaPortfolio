(function() {
    'use strict';


    var poemsController = function poemsController($scope, poems) {
        $scope.poems = poems;
    };

    var poemController = function poemsController($scope, poem) {
        $scope.poem = poem;

        $scope.save = function savePoem(p) {
            p.save();
            $scope.editing = false;
        };
    };

    angular.module('tascha.poems')
    .controller('poemsController', poemsController)
    .controller('poemController', poemController);
})();