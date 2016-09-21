var Hotel;
(function (Hotel) {
    "use strict";
    var RoomTypeController = (function () {
        function RoomTypeController($rootScope, $scope, $state, $log, roomtypeModel) {
            this.vm = roomtypeModel;
            this.isProgressing = false;
            this.$scope = $scope;
            this.$state = $state;
            this.$rootScope = $rootScope;
            this.$log = $log;
        }
        RoomTypeController.prototype.saveRoomType = function () {
            if (this.vm.saveRoomType()) {
                this.reloadRoomType();
                toastr["success"]("Lưu loại phòng thành công.");
                return;
            }
            toastr["error"]("Lỗi lưu dữ liệu!");
        };
        RoomTypeController.prototype.deleteRoomType = function () {
            if (this.vm.deleteRoomType()) {
                this.reloadRoomType();
                toastr["success"]("Xóa loại phòng thành công.");
                return;
            }
            toastr["error"]("Lỗi xóa dữ liệu!");
        };
        RoomTypeController.prototype.reloadRoomType = function () {
            this.vm.loadRoomType();
        };
        RoomTypeController.$inject = ["$rootScope", "$scope", "$state", "$log", "RoomTypeModel"];
        return RoomTypeController;
    }());
    Hotel.RoomTypeController = RoomTypeController;
})(Hotel || (Hotel = {}));
