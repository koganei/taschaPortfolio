'use strict';

describe('Bookblock: Directive', function () {

    var $scope, directiveEl, $rootScope;

    beforeEach(module('tascha.flipbook'));
    beforeEach(module('tascha.mock.routing'));

    describe('the directive', function () {

        beforeEach(function () {

            inject(function (_$rootScope_) {
                $rootScope = _$rootScope_;
                $scope = _$rootScope_.$new();
            });

            compileDirective();
        });

        describe('the initialization', function () {
            it('should initialize BookBlock on the element', function () {
                expect(directiveEl.hasClass('bb-bookblock')).toEqual(true);
                expect(directiveEl.find('.bb-item').length).toBeGreaterThan(0);
            });

            it('should initialize at least one page', function () {
                expect(directiveEl.find('.bb-item').length).toBeGreaterThan(0);
            });
        });

        describe('the animation', function () {

            var $state, $timeout, $injector;

            beforeEach(function () {
                inject(function (_$state_, _$timeout_, _$injector_) {
                    $state = _$state_;
                    $timeout = _$timeout_;
                    $injector = _$injector_;
                });

            });

            it('should complete a state transition', function () {

                var rootScope = $injector.get('$rootScope');
                spyOn(rootScope, '$broadcast').andCallThrough();

                $state.go('state1');
                $scope.$apply();

                expect(rootScope.$broadcast).toHaveBeenCalled();
            });

            it('the initialization should not remove the visibility of the ui-view', function () {
                expect(directiveEl.find('[flipbook-page].view').css('display')).toEqual('block');
            });
        });


        function compileDirective(tpl) {
            if (!tpl) tpl = '<div flipbook><div flipbook-page class="view" ui-view></div><div flipbook-page class="empty"></div></div>';
            inject(function ($compile) {
                directiveEl = $compile(tpl)($scope);
            });

            $scope.$digest();
        }

    });
});