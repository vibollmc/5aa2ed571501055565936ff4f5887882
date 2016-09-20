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
                .service("HotelModel", HotelModel)
                .service("HotelService", HotelService)
                .controller("HotelController", HotelController)
                .config([
                    "$stateProvider", ($stateProvider: any) => {
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
    }

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
    ], () => {
        return new Module();
    });
}