module Hotel {
    declare var jQuery;
    export class HotelController {
        $scope: any;
        $state: any;
        $rootScope: any;
        $log: any;
        static $inject = ["$rootScope", "$scope", "$state", "$log"];
        constructor($rootScope: any, $scope: any, $state: any, $log: any) {
            this.$scope = $scope;
            this.$state = $state;
            this.$rootScope = $rootScope;
            this.$log = $log;

            jQuery('#side-menu').metisMenu();

            this.$rootScope.Title = "Dashboard";
        }
        public goRoomType() {
            this.$rootScope.Title = "Danh mục loại phòng";
            this.$state.go("roomtype");
        }
        public goDashboard() {
            this.$rootScope.Title = "Dashboard";
            this.$state.go("hotel");
        }
    }
}