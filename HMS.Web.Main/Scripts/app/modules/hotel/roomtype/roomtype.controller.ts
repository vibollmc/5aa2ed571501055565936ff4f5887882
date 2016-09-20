module Hotel {
    "use strict";

    declare var toastr;

    export class RoomTypeController {
        vm: RoomTypeModel;
        isProgressing: boolean;
        $scope: any;
        $state: any;
        $rootScope: any;
        $log: any;
        static $inject = ["$rootScope", "$scope", "$state", "$log", "RoomTypeModel"];

        constructor($rootScope: any, $scope: any, $state: any, $log: any, roomtypeModel: RoomTypeModel) {
            this.vm = roomtypeModel;
            this.isProgressing = false;

            this.$scope = $scope;
            this.$state = $state;
            this.$rootScope = $rootScope;

            this.$log = $log;
            //this.vm.loadRoomType();

            this.vm.roomType = new RoomType();
        }

        public saveRoomType(): void {
            if (this.vm.saveRoomType()) {
                this.reloadRoomType();
                toastr["success"]("Lưu loại phòng thành công.");
                return;
            }
            toastr["error"]("Lỗi lưu dữ liệu!");
        }
        public deleteRoomType(): void {
            if (this.vm.deleteRoomType()) {
                this.reloadRoomType();
                toastr["success"]("Xóa loại phòng thành công.");
                return;
            }
            toastr["error"]("Lỗi xóa dữ liệu!");
        }
        public reloadRoomType(): void {
            this.vm.loadRoomType();
        }
    }
}