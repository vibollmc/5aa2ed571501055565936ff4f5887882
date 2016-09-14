var Main;
(function (Main) {
    'use strict';
    function DirectiveIcheck($timeout) {
        return {
            link: function (scope, element, attrs) {
                return $timeout(function () {
                    if (attrs.ngClick) {
                        $(element).on('ifToggled', function (event) {
                            $(element).click();
                        });
                    }
                    return $(element).iCheck(JSON.parse(attrs.icheck));
                });
            }
        };
    }
    Main.DirectiveIcheck = DirectiveIcheck;
})(Main || (Main = {}));
//# sourceMappingURL=icheck.directive.js.map