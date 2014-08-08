'use strict';

describe('Service: poemsApi', function () {

  var $injector = angular.injector([ 'tascha2App' ]);

  // load the controller's module
  // beforeEach(module('tascha2App'));

  describe('when I fetch poems', function() {

    it('returns a list of poems', function() {

      var poemsApi = $injector.get( 'poemsApi' );
      var poems = poemsApi.getList();

      CommonExpects.expectsToBePromise(poems);
    });

  });
});
