'use strict';

describe('Bookblock: Directive', function () {

    var $scope, directiveEl;

    beforeEach(module('tascha.flipbook'));
    beforeEach(module('tascha.mock.routing'));

    describe('the directive', function() {

        beforeEach(function() {

            inject(function($rootScope) {
                $scope = $rootScope.$new();
            });

            compileDirective();
        });

        describe('the initialization', function() {
            it('should initialize BookBlock on the element', function() {
                expect(directiveEl.hasClass('bb-bookblock')).toEqual(true);
                expect(directiveEl.find('.bb-item').length).toBeGreaterThan(0);
            });

            it('should initialize at least one page', function() {
                expect(directiveEl.find('.bb-item').length).toBeGreaterThan(0);
            });
        });

        describe('the animation', function() {

            var $state;

            beforeEach(function() {
                inject(function(_$state_) {
                    $state = _$state_;
                });
            });

            it('should animate on state transition', function() {
                $state.go('state1');
                $scope.$apply();
            });
        });



        function compileDirective(tpl) {
            if (!tpl) tpl = '<div flipbook><div flipbook-page></div></div>';
            inject(function($compile) {
                directiveEl = $compile(tpl)($scope);
            });

            $scope.$digest();
        }

    });
});