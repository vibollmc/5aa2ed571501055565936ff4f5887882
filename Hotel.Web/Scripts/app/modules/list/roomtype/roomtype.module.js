var List;
(function (List) {
    "use strict";
    var RoomTypeModule = (function () {
        function RoomTypeModule() {
            this.module = angular.module(RoomTypeModule.moduleName, ["ui.router", "ui.bootstrap"]);
            this.module.service("RoomTypeModel", List.RoomTypeModel);
            this.module.controller("RoomTypeController", List.RoomTypeController);
            this.module.config([
                "$stateProvider", function ($stateProvider) {
                    $stateProvider
                        .state("list.roomtype", {
                        url: "/roomtype",
                        views: {
                            "": {
                                templateUrl: "scripts/app/modules/list/roomtype/roomtype.view.html",
                                controller: "RoomTypeController",
                                controllerAs: "roomTypeCtrl"
                            }
                        }
                    });
                }
            ]);
        }
        RoomTypeModule.$inject = ["ui.router", "ui.bootstrap"];
        RoomTypeModule.moduleName = "List.RoomType";
        return RoomTypeModule;
    }());
    List.RoomTypeModule = RoomTypeModule;
    define([
        "angularBootstrap",
        "modules/list/roomtype/roomtype.controller",
        "modules/list/roomtype/roomtype.model"
    ], function () {
        new RoomTypeModule();
    });
})(List || (List = {}));
