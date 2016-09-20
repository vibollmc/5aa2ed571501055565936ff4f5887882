var Hotel;
(function (Hotel) {
    'use strict';
    var Module = (function () {
        function Module() {
            var modules = [
                "ui.router",
                "ngCookies",
                Hotel.RoomTypeModule.moduleName
            ];
            angular.module("List", modules)
                .config(function ($logProvider) {
                $logProvider.debugEnabled(true);
            })
                .service("HotelModel", Hotel.HotelModel)
                .service("HotelService", Hotel.HotelService)
                .controller("HotelController", Hotel.HotelController)
                .config([
                "$stateProvider", function ($stateProvider) {
                    $stateProvider
                        .state("hotel", {
                        url: "hotel",
                        templateUrl: "scripts/app/modules/hotel/hotel.view.html",
                        controller: "HotelController",
                        controllerAs: "hotelCtrl"
                    });
                }
            ]);
        }
        return Module;
    }());
    Hotel.Module = Module;
    define([
        "angular",
        "angularCookie",
        "angularUIRouter",
        "angularBootstrap",
        "toastr",
        "Scripts/app/modules/hotel/data/enums.js",
        "Scripts/app/modules/hotel/data/entityobject.js",
        "modules/hotel/hotel.model",
        "modules/hotel/hotel.controller",
        "modules/hotel/hotel.service",
        "modules/hotel/roomtype/roomtype.module"
    ], function () {
        return new Module();
    });
})(Hotel || (Hotel = {}));
//# sourceMappingURL=hotel.module.js.map