(function () {
    'use strict';
    var flipBookDirective = function flipBookDirective($rootScope, $state, $q, $timeout) {

        var directiveEl,
            changeEventStarted = false,
            emptyItem,
            viewItem,
            cloneContainer,
            viewContainer;

        function linker(scope, element, ctrl) {
            directiveEl = element;
            directiveEl.addClass('bb-bookblock');

            directiveEl.bookblock({
                circular: true
            });

            setStateChangesEvents();
        }

        function setStateChangesEvents() {
            $rootScope.$on('$stateChangeStart', function (event, toState) {
                console.log('state change start', changeEventStarted);
                flipPageWhileStoppingEvent('next', 1, event, toState);
            });


            $rootScope.$on('$stateChangeSuccess', function (event, toState) {
                console.log('state change success');
                $timeout(function() {
                    flipPage('next', 0);
                }, 1);

            });
        }

        function controller($scope) {
            $scope.flipPage = flipPage;
        }

        function flipPage(dir, position) {
            console.log('flipping page');
            var def = $q.defer();

            directiveEl.bookblock(dir ? dir : 'next', position);

            var transition = getTransitionEndEvent();
            if (transition) {
                directiveEl[0].addEventListener(transition, function () {
                    $timeout(function () {
                        def.resolve();
                    }, 1000);
                }, false);
            } else {
                def.resolve();
            }

            return def.promise;
        }

        function flipPageWhileStoppingEvent(dir, position, event, toState) {
            if (changeEventStarted) {
                changeEventStarted = false;
                var def = $q.defer();
                def.resolve();
                return def.promise;
            }

            event.preventDefault();
            return flipPage(dir, position).then(function () {
                console.log('change event has started');
                changeEventStarted = true;
                $state.go(toState);
            });
        }

        function refreshEmptyAndViewElements() {
            emptyItem = directiveEl.find('.bb-item:first-of-type > *');
            viewItem = directiveEl.find('.bb-item:nth-of-type(2) > *');
            cloneContainer = directiveEl.find('.bb-item:first-of-type');
            viewContainer = directiveEl.find('.bb-item:nth-of-type(2)');
        }

        // FROM: https://gist.github.com/davidcalhoun/702826
        function getTransitionEndEvent() {
            var transition;

            if ('ontransitionend' in window) {
                // Firefox
                transition = 'transitionend';
            } else if ('onwebkittransitionend' in window) {
                // Chrome/Saf (+ Mobile Saf)/Android
                transition = 'webkitTransitionEnd';
            } else if ('onotransitionend' in directiveEl || navigator.appName === 'Opera') {
                // Opera
                // As of Opera 10.61, there is no "onotransitionend" property added to DOM elements,
                // so it will always use the navigator.appName fallback
                transition = 'oTransitionEnd';
            } else {
                // IE - not implemented (even in IE9) :(
                transition = false;
            }

            return transition;
        }

        return {
            controller: controller,
            link: linker
        };
    };

    var flipBookPageDirective = function flipBookPageDirective() {

        return {
            require: '^flipbook',
            link: function (scope, element) {
                element.addClass('bb-item');
            }
        };
    };

    angular.module('tascha.flipbook')
        .directive('flipbook', flipBookDirective)
        .directive('flipbookPage', flipBookPageDirective);
})();