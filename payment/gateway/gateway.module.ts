module Gateway {
    'use strict';

    declare var define: any;
    declare var angular: any;
    declare var Main: any;

    export class Module {
        constructor() {
            var modules: string[] = [
                "ui.router",
                "ngCookies"
            ];

            angular.module("gateway", modules)
                .value("ApiAddresses", {
                    GET_OWNER_GATEWAYS: "/Gateway/GetNetworkGateways",
                    GET_DEFAULT_GATEWAY: "/Gateway/GetNetworkDefaultGateway",
                    GET_GATEWAY: "/Gateway/GetGateway",
                    ADD_MERCHANT_ACCOUNT: "/Gateway/AddMerchantAccountId",
                    REMOVE_MERCHANT_ACCOUNT: "/Gateway/RemoveMerchantAccountId",
                    SET_DEFAULT_GATEWAY: "/Gateway/SetDefaultGateway",
                    ADD_GATEWAY: "/Gateway/AddGateway",
                    VALIDATE_NETWORK: "/Gateway/ValidateMerchantAccount"
                })
                .directive('slimscroll', ["$timeout", Main.DirectivePerfectscroll])
                .service("GatewayModel", GatewayModel)
                .service("GatewayAddModel", GatewayAddModel)
                .service("GatewayViewModel", GatewayViewModel)
                .service("GatewayService", GatewayService)
                .controller("GatewayController", GatewayController)
                .controller("GatewayViewController", GatewayViewController)
                .controller("GatewayAddController", GatewayAddController)
                .config(["$stateProvider", ($stateProvider: any) => {
                    $stateProvider
                        .state("gateway", {
                            url: "/index",
                            templateUrl: "/scripts/app/modules/payment/gateway/gateway.view.html",
                            controller: "GatewayController",
                            controllerAs: "gatewayCtrl"
                        })
                        .state("gateway-view", {
                            url: "/gateway-view/{gatewayId}",
                            templateUrl: "/scripts/app/modules/payment/gateway/view/gateway-view.view.html",
                            controller: "GatewayViewController",
                            controllerAs: "viewCtrl"
                        })
                        .state("gateway-add", {
                            url: "/gateway-add",
                            templateUrl: "/scripts/app/modules/payment/gateway/add/gateway-add.view.html",
                            controller: "GatewayAddController",
                            controllerAs: "addCtrl"
                        });
                }]);
        }
    }

    define([
        "angular",
        "angularCookie",
        "angularUIRouter",
        "angularBootstrap",
        "modules/payment/gateway/gateway.controller",
        "modules/payment/gateway/gateway.model",
        "modules/payment/gateway/gateway.service",
        "modules/payment/gateway/add/gateway-add.controller",
        "modules/payment/gateway/add/gateway-add.model",
        "modules/payment/gateway/view/gateway-view.controller",
        "modules/payment/gateway/view/gateway-view.model"
    ], () => {
        return new Module();
    });

}

