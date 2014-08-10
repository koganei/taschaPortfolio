(function () {
    'use strict';
    var flipBookAnimation = function flipBookAnimation() {

        return {
            addClass: function(element, className, done) {
                console.log('inside addClass');
                element.addClass('flipping');
            }
        };
    };

    angular.module('tascha.flipbook')
        .animation('.flipbook', flipBookAnimation);
})();