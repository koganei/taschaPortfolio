'use strict';

/**
 * @ngdoc overview
 * @name tascha
 * @description
 * # tascha
 *
 * Main module of the application.
 */
angular
    .module('tascha', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'restangular',
        'ui.router',
        'btford.markdown',

        'tascha.poems',
        'tascha.flipbook'
    ])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'views/home.html'
            });

    })

    .config(function (RestangularProvider) {
        RestangularProvider.setBaseUrl('http://local.com/tascha2/rest/web/app_dev.php/');
        RestangularProvider.setRequestSuffix('.json');

        RestangularProvider.addResponseInterceptor(function (data, operation, what) {
            return (operation === 'getList') ? data[what] : data[1];
        });
    });
