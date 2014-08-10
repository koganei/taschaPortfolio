(function () {
    'use strict';
    var flipBookDirective = function flipBookDirective($rootScope, $state, $q) {

        var directiveEl,
            bookBlockInstance,
            changeEventStarted = false,
            emptyItem,
            viewItem,
            emptyContainer,
            viewContainer;

        function linker(scope, element, ctrl) {
            directiveEl = element;
            directiveEl.addClass('bb-bookblock');
            bookBlockInstance = directiveEl.bookblock({
                circular: true
            });

            $rootScope.$on('$stateChangeStart', function(event, toState) {
                refreshEmptyAndViewElements();
                emptyContainer.empty().append(viewItem);
                // viewContainer.empty().append(viewItem.html());
            });


            $rootScope.$on('$stateChangeSuccess', function (event, toState) {
                blockingFlipPage(event, toState).then(function() {
                    directiveEl.find('.bb-item:first-of-type').appendTo(directiveEl);
                });

            });
        }

        function controller($scope) {
            $scope.flipPage = flipPage;
        }

        function flipPage() {
            var def = $q.defer();

            directiveEl.bookblock('next');

            var transition = getTransitionEndEvent();
            if(transition) {
                directiveEl[0].addEventListener(transition, function(){
                    def.resolve();
                }, false);
            } else {
                def.resolve();
            }

            return def.promise;
        }

        function blockingFlipPage(event, toState) {
            if (changeEventStarted) {
                return;
            }

            event.preventDefault();
            return flipPage().then(function() {
                changeEventStarted = true;
                $state.go(toState);
            });
        }

        function refreshEmptyAndViewElements() {
            emptyItem = directiveEl.find('.bb-item:first-of-type > *');
            viewItem = directiveEl.find('.bb-item:nth-of-type(2) > *');
            emptyContainer = directiveEl.find('.bb-item:first-of-type');
            viewContainer = directiveEl.find('.bb-item:nth-of-type(2)');
        }

        // FROM: https://gist.github.com/davidcalhoun/702826
        function getTransitionEndEvent() {
            var transition;

            if('ontransitionend' in window) {
                // Firefox
                transition = 'transitionend';
            } else if('onwebkittransitionend' in window) {
                // Chrome/Saf (+ Mobile Saf)/Android
                transition = 'webkitTransitionEnd';
            } else if('onotransitionend' in directiveEl || navigator.appName === 'Opera') {
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