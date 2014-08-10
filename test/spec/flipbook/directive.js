'use strict';

describe('Bookblock: Directive', function () {

    var $scope, directiveEl;

    beforeEach(module('tascha.flipbook'));

    describe('the directive', function() {

        beforeEach(function() {

            inject(function($rootScope, $controller, $q) {
                $scope = $rootScope.$new();
            });

            compileDirective();
        });

        it('should call BookBlock', function() {
            expect(directiveEl.hasClass('bb-vertical')).toEqual(true);
        });

        function compileDirective(tpl) {
            if (!tpl) tpl = '<div flipbook></div>';
            inject(function($compile) {
                directiveEl = $compile(tpl)($scope);
            });

            $scope.$digest();
        }

    });
});