var Main;
(function (Main) {
    'use strict';
    var ApiService = (function () {
        function ApiService($http, $timeout, $q) {
        }
        ApiService.prototype.login = function () {
            alert('login');
        };
        ApiService.$inject = ["$http", "$timeout", "$q"];
        return ApiService;
    }());
    Main.ApiService = ApiService;
})(Main || (Main = {}));
//# sourceMappingURL=api.service.js.map