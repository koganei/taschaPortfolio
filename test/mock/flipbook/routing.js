(function() {
    'use strict';

    angular.module('tascha.mock.routing', ['ui.router']).config(function($stateProvider) {
        $stateProvider
            .state('home', {
                url: '/'
            }).state('state1', {
                url: '/state1'
            }).state('state2', {
                url: '/state2'
            }).state('state3', {
                url: '/state3'
            });
    });
})();