var Hotel;
(function (Hotel) {
    "use strict";
    var RoomTypeModel = (function () {
        function RoomTypeModel($q, roomtypeService) {
            this.roomtypeService = roomtypeService;
            this.idRoomType = null;
            this.$q = $q;
            this.roomType = new Hotel.RoomType();
            this.loadRoomType();
        }
        RoomTypeModel.prototype.loadRoomType = function () {
            this.listRoomType = this.roomtypeService.loadRoomType();
        };
        RoomTypeModel.prototype.saveRoomType = function () {
            return this.roomtypeService.saveRoomType(this.roomType);
        };
        RoomTypeModel.prototype.deleteRoomType = function () {
            return this.roomtypeService.deleteRoomType(this.idRoomType);
        };
        RoomTypeModel.$inject = ["$q", "RoomTypeService"];
        return RoomTypeModel;
    }());
    Hotel.RoomTypeModel = RoomTypeModel;
})(Hotel || (Hotel = {}));
