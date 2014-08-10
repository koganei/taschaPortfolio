'use strict';

describe('Flipbook: Animation', function () {

    var $timeout, $compile, $rootScope, $animate, $document, scope;

    beforeEach(module('tascha.flipbook'));
    beforeEach(module('ngAnimateMock'));

    describe('the flip animation', function () {

        beforeEach(function () {

            inject(function (_$timeout_, _$compile_, _$rootScope_, _$animate_, _$document_) {
                $timeout = _$timeout_;
                $compile = _$compile_;
                $rootScope = _$rootScope_;
                $animate = _$animate_;
                $document = _$document_;
            });

            scope = $rootScope.$new();
        });

        it('should react to adding a class', function () {

            var el = compileTemplate('<div class="flipbook"></div>');

            $animate.addClass(el, 'flipped');
            $rootScope.$digest();

            var data = $animate.queue.shift();
            expect(data.event).toBe('addClass');
            expect(data.args[1]).toBe('flipped');
        });

        function compileTemplate(template) {
            var elTemplate = angular.element(template);
            return $compile(elTemplate)(scope);
        }



    });
});