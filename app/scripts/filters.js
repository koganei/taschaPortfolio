'use strict';

angular.module('tascha2App')
.filter('titleForUrl', function titleForUrlFilter() {
    return function(input) {
        input = input.substr(0, 30);
        input = input.replace(/ /g, '-');
        input = input.toLowerCase();  

        return input;
    };
});