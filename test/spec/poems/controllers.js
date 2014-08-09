'use strict';

describe('Controllers', function () {

    var $scope, ctrl;

    beforeEach(function() {

        module('tascha2App');
    });

    describe('the poems controller', function() {

        beforeEach(function() {

            var mockPoems = [{
                title: 'my Title',
                body: 'my body of text'
            },{
                title: 'my Title 2',
                body: 'my body of text 2'
            }];

            inject(function($rootScope, $controller, $q) {
                $scope = $rootScope.$new();

                ctrl = $controller('poemsController', {
                    $scope: $scope,
                    poems: mockPoems
                });
            });
        });

        it('should contain a list of poems', function() {
            expect($scope.poems).toBeArrayOfObjects();
        });

    });

    describe('the poem controller', function() {

        beforeEach(function() {

            var mockPoem = {
                title: 'my Title',
                body: 'my body of text'
            };

            inject(function($rootScope, $controller, $q) {
                $scope = $rootScope.$new();

                ctrl = $controller('poemController', {
                    $scope: $scope,
                    poem: mockPoem
                });
            });
        });

        it('should contain a list of poems', function() {
            expect($scope.poem).toBeObject();
        });

        it('should be able to save a poem', function() {
            expect($scope.save).toBeFunction();
        });

    });
});