(function() {
'use strict';


    /**
     * This might look like it's coupling Restangular to the Api, but we're really only implementing an interface
     * with 'get' and 'getList' returning promises for an item or a list of items.
     */
var poemsApi = function poemsApi(Restangular) {

    var service = Restangular.all('poems');

    return service;
};

poemsApi.setConfig = function setPoemsApiConfig(RestangularProvider) {
    // RestangularProvider.addElementTransformer('poems', false, function(poem) {
    // // This will add a method called login that will do a POST to the path login
    // // signature is (name, operation, path, params, headers, elementToPost)

    //     poem.addRestangularMethod('flag', 'post', 'flag');

    //     poem.isSelected = poem.isSelected || false;

    //     return poem;
    // });
};


angular.module('tascha.poems')
.factory('poemsApi', poemsApi)
.config(poemsApi.setConfig);

})();