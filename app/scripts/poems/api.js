(function () {
    'use strict';


    /**
     * This might look like it's coupling Restangular to the Api, but we're really only implementing an interface
     * with 'get' and 'getList' returning promises for an item or a list of items.
     */
    var poemsApi = function poemsApi(Restangular) {

        var service = Restangular.all('poems');
        return service;
    };


    angular.module('tascha.poems')
        .factory('poemsApi', poemsApi);

})();