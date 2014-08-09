'use strict';

describe('Poems: Config', function () {

    var $rootScope, $state, $injector, poemsApiMock;

    beforeEach(function() {

        module('tascha.poems', function($provide) {
            $provide.value('poemsApi', poemsApiMock = {});
        });

        inject(function(_$rootScope_, _$state_, _$injector_, $templateCache) {
            $rootScope = _$rootScope_;
            $state = _$state_;
            $injector = _$injector_;

            $templateCache.put('views/poems.list.html', '');
            $templateCache.put('views/poem.show.html', '');
        });
    });

    describe('the routing', function() {

        it('should respond to URL', function() {
            expect($state.href('poems')).toEqual('#/poems');
            expect($state.href('poem', { id: 1 })).toEqual('#/poem/1/');
        });

    });

    describe('the resolves', function() {

        it('should resolve poems on poems state', function() {
            var state = 'poems';
            poemsApiMock.getList = jasmine.createSpy('getList').andReturn('getList');

            $state.go(state);
            $rootScope.$apply();

            expect($state.current.name).toBe(state);
            expect($injector.invoke($state.current.resolve.poems)).toBe('getList');
        });

        it('should resolve poem on poem state', function() {
            var state = 'poem';
            poemsApiMock.get = jasmine.createSpy('get').andReturn('get');

            $state.go(state);
            $rootScope.$apply();

            expect($state.current.name).toBe(state);
            expect($injector.invoke($state.current.resolve.poem)).toBe('get');
        });

    });
});