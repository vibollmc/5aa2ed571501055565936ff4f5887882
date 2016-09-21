var Main;
(function (Main) {
    'use strict';
    var jsonDate = (function () {
        function jsonDate() {
        }
        jsonDate.Factory = function ($filter) {
            return function (input, format) {
                return $filter("date")(parseInt(input ? input.substr(6) : ''), format);
            };
        };
        return jsonDate;
    }());
    Main.jsonDate = jsonDate;
})(Main || (Main = {}));
