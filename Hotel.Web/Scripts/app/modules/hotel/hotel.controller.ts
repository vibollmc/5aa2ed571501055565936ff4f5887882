module Hotel {
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
        }
        public goRoomType() {
            this.$state.transitionTo("roomtype");
        }
    }
}