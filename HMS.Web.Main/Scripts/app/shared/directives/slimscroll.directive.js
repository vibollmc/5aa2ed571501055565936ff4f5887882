var Main;
(function (Main) {
    'use strict';
    function DirectiveSlimscroll($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                $timeout(function () {
                    var h = $(".page-headings").outerHeight();
                    $(".fh-breadcrumb").css("height", "calc(100% - " + h + "px)");
                    element.slimscroll(JSON.parse(attrs.slimscroll));
                });
            }
        };
    }
    Main.DirectiveSlimscroll = DirectiveSlimscroll;
})(Main || (Main = {}));
