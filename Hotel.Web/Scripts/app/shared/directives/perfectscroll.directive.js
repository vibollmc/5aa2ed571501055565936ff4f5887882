var Main;
(function (Main) {
    'use strict';
    function DirectivePerfectscroll($timeout) {
        return {
            link: function (scope, element, attrs) {
                return $timeout(function () {
                    return $(element).perfectScrollbar({ useSelectionScroll: true });
                });
            }
        };
    }
    Main.DirectivePerfectscroll = DirectivePerfectscroll;
})(Main || (Main = {}));
