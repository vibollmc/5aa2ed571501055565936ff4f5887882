module Wallet {
    'use strict';

    declare var define: any;
    declare var angular: any;
    declare var Main: any;

    export class Module {
        constructor() {
            var modules: string[] = [
                "ui.router"
            ];

            angular.module("wallet", modules)
                .value("ApiAddresses", {
                    GET_WALLET_SETTING: "/Wallet/GetWalletSetting",
                    SAVE_WALLET_SETTING: "/Wallet/SaveWalletSetting"
                })
                .service("WalletModel", WalletModel)
                .service("WalletService", WalletService)
                .directive('slimscroll', ["$timeout", Main.DirectivePerfectscroll])
                .directive('icheck', ["$timeout", Main.DirectiveIcheck])
                .directive('decimal', ["$parse", Main.Decimal])
                .controller("WalletController", WalletController)
                .config(["$stateProvider", ($stateProvider: any) => {
                    $stateProvider
                        .state("wallet", {
                            url: "/wallet",
                            templateUrl: "/scripts/app/modules/payment/wallet/wallet.view.html",
                            controller: "WalletController",
                            controllerAs: "walletCtrl"
                        });
                }]);
        }
    }

    define([
        "angular",
        //"angularCookie",
        "angularUIRouter",
        "angularBootstrap",
        //"angularMoney",
        "modules/payment/wallet/wallet.controller",
        "modules/payment/wallet/wallet.model",
        "modules/payment/wallet/wallet.service"
    ], () => {
        return new Module();
    });

}

