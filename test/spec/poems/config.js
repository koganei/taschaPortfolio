'use strict';

describe('Config: poems', function () {

    var $rootScope, $state, $injector;

    beforeEach(function() {

        module('tascha2App');

        inject(function(_$rootScope_, _$state_, _$injector_) {
            $rootScope = _$rootScope_;
            $state = _$state_;
            $injector = _$injector_;
        });
    });

    describe('the routing', function() {

        it('should respond to URL', function() {

            var poemsConfig = $injector.get( 'poemsConfig' );

            expect($state.href('poems')).toEqual('#/poems');
            expect($state.href('poem', { id: 1 })).toEqual('#/poem/1/');

        });

    });
});