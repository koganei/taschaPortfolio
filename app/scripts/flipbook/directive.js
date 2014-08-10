(function () {
    'use strict';
    var flipBookDirective = function flipBookDirective() {

        return function(scope, element) {
            element.bookblock();
        };
    };

    angular.module('tascha.flipbook')
        .directive('flipbook', flipBookDirective);
})();