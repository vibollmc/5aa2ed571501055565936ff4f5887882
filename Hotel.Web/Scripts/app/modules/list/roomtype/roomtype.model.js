var List;
(function (List) {
    var RoomTypeModel = (function () {
        function RoomTypeModel(listService) {
            this.listService = listService;
            this.listRoomType = new Array();
        }
        RoomTypeModel.prototype.loadRoomType = function () {
            this.listRoomType = this.listService.loadRoomType();
        };
        RoomTypeModel.prototype.saveRoomType = function () {
            return this.listService.saveRoomType(this.roomType);
        };
        RoomTypeModel.prototype.deleteRoomType = function () {
            return this.listService.deleteRoomType(this.idRoomType);
        };
        RoomTypeModel.$inject = ["ListService"];
        return RoomTypeModel;
    }());
    List.RoomTypeModel = RoomTypeModel;
})(List || (List = {}));
