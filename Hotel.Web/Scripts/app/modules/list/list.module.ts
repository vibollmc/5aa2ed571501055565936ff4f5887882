module List {
    'use strict';

    declare var define: any;
    declare var angular: any;

    export class Module {
        constructor() {
            var modules: string[] = [
                "ui.router",
                "ngCookies",
                RoomTypeModule.moduleName
            ];
            angular.module("List", modules)
                .config(function($logProvider) {
                    $logProvider.debugEnabled(true);
                })
                .value("ApiAddresses", {
                    SAVE_ROOMTYPE: "/List/SaveRoomType",
                    LOAD_ROOMTYPE: "/List/LoadRoomType",
                    DELETE_ROOMTYPE: "/List/DeleteRoomType"
                })
                .service("ListModel", ListModel)
                .service("ListService", ListService)
                .controller("ListController", ListController)
                .config([
                    "$stateProvider", ($stateProvider: any) => {
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
    }

    define([
        "angular",
        "angularCookie",
        "angularUIRouter",
        "angularBootstrap",
        "toastr",
        "roomtype/roomtype.module"
    ], () => {
        return new Module();
    });
}