'use strict';

describe('Poems: Api Service', function () {

  var $injector = angular.injector([ 'tascha.poems' ]);

  describe('when I fetch poems', function() {

    it('returns a list of poems', function() {

      var poemsApi = $injector.get( 'poemsApi' );
      var poems = poemsApi.getList();

      CommonExpects.expectsToBePromise(poems);
    });

  });
});
