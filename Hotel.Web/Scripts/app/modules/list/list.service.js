var List;
(function (List) {
    "use strict";
    var ListService = (function () {
        function ListService($http, $log, $timeout, apiAddresses) {
            this.$http = $http;
            this.$log = $log;
            this.apiAddresses = apiAddresses;
        }
        ListService.prototype.loadRoomType = function () {
            var _this = this;
            return this.$http.get(this.apiAddresses.LOAD_ROOMTYPE).success(function (response) {
                return response;
            })
                .error(function (data, status) {
                _this.logError(data, status);
                return null;
            });
        };
        ListService.prototype.saveRoomType = function (roomType) {
            var _this = this;
            return this.$http.post(this.apiAddresses.SAVE_ROOMTYPE, roomType).success(function (response) {
                return true;
            })
                .error(function (data, status) {
                _this.logError(data, status);
                return false;
            });
        };
        ListService.prototype.deleteRoomType = function (id) {
            var _this = this;
            return this.$http.post(this.apiAddresses.DELETE_ROOMTYPE, { id: id }).success(function (response) {
                return true;
            })
                .error(function (data, status) {
                _this.logError(data, status);
                return false;
            });
        };
        ListService.prototype.logError = function (data, status) {
            this.$log.error(data);
        };
        ListService.$inject = ["$http", "$log", "$timeout", "ApiAddresses"];
        return ListService;
    }());
    List.ListService = ListService;
})(List || (List = {}));
