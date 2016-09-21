var Hotel;
(function (Hotel) {
    var HotelController = (function () {
        function HotelController($rootScope, $scope, $state, $log) {
            this.$scope = $scope;
            this.$state = $state;
            this.$rootScope = $rootScope;
            this.$log = $log;
            jQuery('#side-menu').metisMenu();
        }
        HotelController.prototype.goRoomType = function () {
            this.$state.go("roomtype");
        };
        HotelController.prototype.goDashboard = function () {
            this.$state.go("hotel");
        };
        HotelController.$inject = ["$rootScope", "$scope", "$state", "$log"];
        return HotelController;
    }());
    Hotel.HotelController = HotelController;
})(Hotel || (Hotel = {}));
