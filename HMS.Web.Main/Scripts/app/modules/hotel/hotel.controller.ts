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
        }
        public goRoomType() {
            this.$state.go("roomtype");
        }
        public goDashboard() {
            this.$state.go("hotel");
        }
    }
}