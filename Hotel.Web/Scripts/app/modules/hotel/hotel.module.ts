module Hotel {
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
                .service("HotelModel", HotelModel)
                .service("HotelService", HotelService)
                .controller("HotelController", HotelController)
                .config([
                    "$stateProvider", ($stateProvider: any) => {
                        $stateProvider
                            .state("hotel", {
                                url: "Hotel",
                                templateUrl: "scripts/app/modules/hotel/hotel.view.html",
                                controller: "HotelController",
                                controllerAs: "hotelCtrl"
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
        "modules/hotel/hotel.model",
        "modules/hotel/hotel.controller",
        "modules/hotel/hotel.service",
        "modules/hotel/roomtype/roomtype.module"
    ], () => {
        return new Module();
    });
}