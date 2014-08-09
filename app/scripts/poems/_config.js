(function() {
    'use strict';

    var poemsConfig = {
        routes: {
            'poems': {
                url: '/poems',
                templateUrl: 'views/poems.list.html',
                resolve: {
                    poems: ['poemsApi', function(poemsApi) {
                        return poemsApi.getList();
                    }]
                },
                controller: 'poemsController'
            },
            'poem': {
                url: '/poem/:id/*title',
                templateUrl: 'views/poem.show.html',
                resolve: {
                    poem: ['poemsApi', '$stateParams', function(poemsApi, $stateParams) {
                        return poemsApi.get($stateParams.id);
                    }]
                },
                controller: 'poemController'
            }
        }
    };

    poemsConfig.attachRoutes = function(provider) {
        for(var r in this.routes) {
           if(this.routes.hasOwnProperty(r)) {
               provider.state(r, this.routes[r]);
           }
        }
    };

    poemsConfig.setConfig = function setPoemsConfigConfig($stateProvider) {
        poemsConfig.attachRoutes($stateProvider);
    };


    angular.module('tascha.poems', ['ui.router', 'restangular'])
        .value('poemsConfig', poemsConfig)
        .config(poemsConfig.setConfig);
})();