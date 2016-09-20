module Hotel {
    "use strict";

    declare var define: any;
    declare var angular: any;

    export class RoomTypeModule {
        static $inject = ["ui.router", "ui.bootstrap"];
        static moduleName = "RoomType";
        constructor() {

            var modules: string[] = ["ui.router", "ui.bootstrap"];

            angular.module(RoomTypeModule.moduleName, modules)
                .value("ApiAddresses", {
                    SAVE_ROOMTYPE: "/List/SaveRoomType",
                    LOAD_ROOMTYPE: "/List/LoadRoomType",
                    DELETE_ROOMTYPE: "/List/DeleteRoomType"
                })
                .service("RoomTypeModel", RoomTypeModel)
                .service("RoomTypeService", RoomTypeService)
                .controller("RoomTypeController", RoomTypeController)
                .config(["$stateProvider", ($stateProvider: any) => {
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
    }

    define([
        "angular",
        "angularBootstrap",
        "modules/hotel/roomtype/roomtype.controller",
        "modules/hotel/roomtype/roomtype.service",
        "modules/hotel/roomtype/roomtype.model"
    ], () => {
        new RoomTypeModule();
    });
}