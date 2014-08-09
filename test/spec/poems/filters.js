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
            expect(result).toEqual('a-regular-string');
        });

    });
});