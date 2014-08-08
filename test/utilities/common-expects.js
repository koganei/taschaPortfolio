var CommonExpects = new (function() {

    this.expectsToBePromise = function(obj) {
        expect(obj).toImplement({
            then: function() {}
        });
    };

})();