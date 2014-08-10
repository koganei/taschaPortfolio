(function () {
    'use strict';

    var titleToUrlStringFilter = function titleToUrlStringFilter() {
        return function (input) {
            input = input.substr(0, 30);
            input = input.replace(/ /g, '-');
            input = input.replace(/[\.,\/#!$%\^&\*;:{}=\_`~()]/g, '');
            input = input.toLowerCase();

            return input;
        };
    };

    angular.module('tascha.poems')
        .filter('titleToUrlString', titleToUrlStringFilter);
})();