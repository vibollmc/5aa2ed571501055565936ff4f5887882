var Hotel;
(function (Hotel) {
    "use strict";
    var RoomTypeModule = (function () {
        function RoomTypeModule() {
            var modules = ["ui.router", "ui.bootstrap"];
            angular.module(RoomTypeModule.moduleName, modules)
                .value("ApiAddresses", {
                SAVE_ROOMTYPE: "/List/SaveRoomType",
                LOAD_ROOMTYPE: "/List/LoadRoomType",
                DELETE_ROOMTYPE: "/List/DeleteRoomType"
            })
                .service("RoomTypeModel", Hotel.RoomTypeModel)
                .service("RoomTypeService", Hotel.RoomTypeService)
                .controller("RoomTypeController", Hotel.RoomTypeController)
                .config(["$stateProvider", function ($stateProvider) {
                    $stateProvider
                        .state("roomtype", {
                        parent: "hotel",
                        url: "/roomtype",
                        templateUrl: "scripts/app/modules/hotel/roomtype/roomtype.view.html",
                        controller: "RoomTypeController",
                        controllerAs: "roomTypeCtrl"
                    });
                }]);
        }
        RoomTypeModule.$inject = ["ui.router", "ui.bootstrap"];
        RoomTypeModule.moduleName = "RoomType";
        return RoomTypeModule;
    }());
    Hotel.RoomTypeModule = RoomTypeModule;
    define([
        "angular",
        "angularBootstrap",
        "modules/hotel/roomtype/roomtype.controller",
        "modules/hotel/roomtype/roomtype.service",
        "modules/hotel/roomtype/roomtype.model"
    ], function () {
        new RoomTypeModule();
    });
})(Hotel || (Hotel = {}));
//# sourceMappingURL=roomtype.module.js.map