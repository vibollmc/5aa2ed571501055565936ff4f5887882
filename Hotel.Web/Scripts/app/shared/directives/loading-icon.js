var Main;
(function (Main) {
    'use strict';
    function display_loading_icon() {
        $("body .fh-breadcrumb").append('<div class="loading-icon-wrapper"><i class="fa fa-spinner fa-spin"></i></div>');
    }
    Main.display_loading_icon = display_loading_icon;
    function remove_loading_icon() {
        $("body .fh-breadcrumb > .loading-icon-wrapper").remove();
    }
    Main.remove_loading_icon = remove_loading_icon;
})(Main || (Main = {}));
//# sourceMappingURL=loading-icon.js.map