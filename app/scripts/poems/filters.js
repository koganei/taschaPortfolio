'use strict';

angular.module('tascha.poems')
.filter('titleToUrlString', function dashSeparatedFilter() {
    return function(input) {
        input = input.substr(0, 30);
        input = input.replace(/ /g, '-');
        input = input.toLowerCase();  

        return input;
    };
});