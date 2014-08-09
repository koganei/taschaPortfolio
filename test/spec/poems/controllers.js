'use strict';

describe('Poems: Controllers', function () {

    var $scope, ctrl;

    beforeEach(function() {

        module('tascha.poems');
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
                body: 'my body of text',
                saved: false,
                save: function() {
                    this.saved = true;
                }
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

            expect($scope.poem.title).toEqual('my Title');
            expect($scope.poem.body).toEqual('my body of text');
        });

        it('should be able to save a poem', function() {
            expect($scope.poem.title).toEqual('my Title');
            expect($scope.poem.body).toEqual('my body of text');

            $scope.save($scope.poem);

            expect($scope.poem.saved).toBeTrue();
        });

    });
});