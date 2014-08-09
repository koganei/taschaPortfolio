'use strict';

/**
 * @ngdoc overview
 * @name tascha2App
 * @description
 * # tascha2App
 *
 * Main module of the application.
 */
angular
  .module('tascha2App', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'restangular',
    'ui.router',
    'btford.markdown'
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
      // .. to look for getList operations
      if (operation === 'getList') {
        // .. and handle the data and meta data
        extractedData = data[what];
        //extractedData = data.data.data;
        //extractedData.meta = data.data.meta;
      } else {
        extractedData = data[1];
      }
      return extractedData;
    });
  });
