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

    'tascha.poems'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');
    // $locationProvider.html5Mode(true);
    //
    // Now set up the states
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/home.html'
      });

  })

  .config(function(RestangularProvider) {
    RestangularProvider.setBaseUrl('http://local.com/tascha2/rest/web/app_dev.php/');
    RestangularProvider.setRequestSuffix('.json');

    // add a response intereceptor
    RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
      var extractedData;

      if (operation === 'getList') {
        extractedData = data[what];
      } else {
        extractedData = data[1];
      }

      return extractedData;
    });
  });
