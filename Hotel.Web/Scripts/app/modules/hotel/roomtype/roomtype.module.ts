module Hotel {
    "use strict";

    declare var define: any;
    declare var angular: any;

    export class RoomTypeModule {
        module: any;

        static $inject = ["ui.router", "ui.bootstrap"];
        static moduleName = "RoomType";
        constructor() {
            this.module = angular.module(RoomTypeModule.moduleName, ["ui.router", "ui.bootstrap"]);

            this.module.service("RoomTypeModel", RoomTypeModel);
            this.module.controller("RoomTypeController", RoomTypeController);
            this.module.config([
                "$stateProvider", ($stateProvider: any) => {
                    $stateProvider
                        .state("roomtype", {
                            url: "roomtype",
                            views: {
                                "": {
                                    templateUrl: "scripts/app/modules/hotel/roomtype/roomtype.view.html",
                                    controller: "RoomTypeController",
                                    controllerAs: "roomTypeCtrl"
                                }
                            }

                        });
                }
            ]);
        }
    }

    define([
        "angularBootstrap",
        "modules/hotel/roomtype/roomtype.controller",
        "modules/hotel/roomtype/roomtype.model"
    ], () => {
        new RoomTypeModule();
    });
}