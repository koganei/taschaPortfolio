'use strict';

describe('Poems: Filters', function () {

    var $scope, ctrl, $filter;

    beforeEach(function() {
        module('tascha.poems');
    });

    describe('the "titleToUrlString" filter', function() {

        beforeEach(function() {

            inject(function(_$filter_) {
                $filter = _$filter_;
            });
        });

        it('should transform a string to a dash-separated string', function() {
            var string = "a regular string";
            var result = $filter('titleToUrlString')(string);
            var isDashDelimitedString = /^[A-Za-z0-9@\+]+(?:-+[A-Za-z0-9@\+]+)*$/;
            expect(isDashDelimitedString.test(result)).toBeTrue();
        });

        it('should cut off a string of more than 30 characters', function() {
            var string = "a string that is of a particular length";
            var result = $filter('titleToUrlString')(string);
            expect(result.length).toEqual(30);
        });

        it('should strip punctuation', function() {
            var string = "a!@#$%^&*()_+";
            var result = $filter('titleToUrlString')(string);
            expect(result).toEqual('a@+');
        });

        it('should lowercase text', function() {
            var string = "ABCdEF";
            var result = $filter('titleToUrlString')(string);
            expect(result).toEqual('abcdef');
        });

    });
});