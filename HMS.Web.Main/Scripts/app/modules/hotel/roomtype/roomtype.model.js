var Hotel;
(function (Hotel) {
    "use strict";
    var RoomTypeModel = (function () {
        function RoomTypeModel($q, roomtypeService) {
            this.roomtypeService = roomtypeService;
            this.listRoomType = new Array();
            this.roomType = new Hotel.RoomType();
            this.idRoomType = null;
            this.$q = $q;
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
//# sourceMappingURL=roomtype.model.js.map