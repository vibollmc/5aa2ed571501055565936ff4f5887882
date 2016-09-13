var List;
(function (List) {
    'use strict';
    var Module = (function () {
        function Module() {
            var modules = [
                "ui.router",
                "ngCookies",
                List.RoomTypeModule.moduleName
            ];
            angular.module("List", modules)
                .config(function ($logProvider) {
                $logProvider.debugEnabled(true);
            })
                .value("ApiAddresses", {
                SAVE_ROOMTYPE: "/List/SaveRoomType",
                LOAD_ROOMTYPE: "/List/LoadRoomType",
                DELETE_ROOMTYPE: "/List/DeleteRoomType"
            })
                .service("ListModel", List.ListModel)
                .service("ListService", List.ListService)
                .controller("ListController", List.ListController)
                .config([
                "$stateProvider", function ($stateProvider) {
                    $stateProvider
                        .state("List", {
                        url: "/list",
                        //templateUrl: "scripts/app/modules/list/list.view.html",
                        controller: "ListController",
                        controllerAs: "listCtrl"
                    });
                }
            ]);
        }
        return Module;
    }());
    List.Module = Module;
    define([
        "angular",
        "angularCookie",
        "angularUIRouter",
        "angularBootstrap",
        "toastr",
        "roomtype/roomtype.module"
    ], function () {
        return new Module();
    });
})(List || (List = {}));
