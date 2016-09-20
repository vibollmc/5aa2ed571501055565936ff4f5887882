var Hotel;
(function (Hotel) {
    "use strict";
    var RoomTypeService = (function () {
        function RoomTypeService($http, $q, apiAddresses) {
            this.$http = $http;
            this.$q = $q;
            this.apiAddresses = apiAddresses;
        }
        RoomTypeService.prototype.loadRoomType = function () {
            return this.$http.get(this.apiAddresses.LOAD_ROOMTYPE).success(function (response) {
                return response;
            })
                .error(function (data, status) {
                return null;
            });
        };
        RoomTypeService.prototype.saveRoomType = function (roomType) {
            return this.$http.post(this.apiAddresses.SAVE_ROOMTYPE, roomType).success(function (response) {
                return true;
            })
                .error(function (data, status) {
                return false;
            });
        };
        RoomTypeService.prototype.deleteRoomType = function (id) {
            return this.$http.post(this.apiAddresses.DELETE_ROOMTYPE, { id: id }).success(function (response) {
                return true;
            })
                .error(function (data, status) {
                return false;
            });
        };
        RoomTypeService.$inject = ["$http", "$q", "ApiAddresses"];
        return RoomTypeService;
    }());
    Hotel.RoomTypeService = RoomTypeService;
})(Hotel || (Hotel = {}));
//# sourceMappingURL=roomtype.service.js.map