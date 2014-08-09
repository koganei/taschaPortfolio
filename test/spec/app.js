'use strict';

describe('App Main', function () {

    var $rootScope, $state, $injector;

    beforeEach(function() {

        module('tascha');

        inject(function(_$rootScope_, _$state_, _$injector_) {
            $rootScope = _$rootScope_;
            $state = _$state_;
            $injector = _$injector_;
        });
    });

    describe('the routing', function() {

        it('should respond to URL', function() {
            expect($state.href('home')).toEqual('#/');
        });

    });

    describe('the restangular interceptor', function() {

        var Restangular, $httpBackend;

        beforeEach(function() {

            inject(function(_Restangular_, _$httpBackend_, $templateCache) {
                Restangular = _Restangular_;
                $httpBackend = _$httpBackend_;

                $templateCache.put('views/home.html', '');
            });
        });

        it('should extract the resource from the resource key in the getList response', function() {
            var result = null;

            var mockItems = Restangular.all('items');
            $httpBackend.whenGET(mockItems.getRestangularUrl() + '.json').respond({ items: [{}, {}, {}] });

            mockItems.getList().then(function(items) {
                result = items;
            });

            $httpBackend.flush();

            expect(result).toBeArrayOfObjects();

        });

        it('should extract the resource from the array in the get response', function() {
            var result = null;

            var mockItem = Restangular.one('items', 1);
            $httpBackend.whenGET(mockItem.getRestangularUrl() + '.json').respond(['items', {}]);

            mockItem.get().then(function(item) {
                result = item;
            });

            $httpBackend.flush();

            expect(result).toBeObject();

        });

    });
});