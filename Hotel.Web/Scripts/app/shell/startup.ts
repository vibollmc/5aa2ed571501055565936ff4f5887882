module Main {
    'use strict';

    declare var define: any;
    declare var angular: any;
    declare var requirejs: any;
	declare var $: any;

    export class Startup {
        module: any;

        constructor(moduleName: string) {
            this.module = angular.module("RocketUncle", ["ngCookies", "ui.router", "oc.lazyLoad", "ui.bootstrap"])
                .service("ApiService", ApiService)
                .config(['$ocLazyLoadProvider', '$compileProvider', ($ocLazyLoadProvider: any, $compileProvider: any) => {
                    $ocLazyLoadProvider.config({
                        jsLoader: requirejs,
                        debug: false
                    });
                    $compileProvider.debugInfoEnabled(false);
                }])
                .run(["$rootScope", "$location", "$cookieStore", "$state", "$ocLazyLoad", "$timeout", "$window",
                    ($rootScope: any, $location: any, $cookieStore: any, $state: any, $ocLazyLoad: any, $timeout: any, $window: any) => {

                        switch (moduleName) {
                            case "wizard":
                                $ocLazyLoad.load("/scripts/app/modules/wizard/wizard.module.js").then(() => {
                                    $state.transitionTo("wizard");
                                });
                                break;

                            case "event":
                                $ocLazyLoad.load("/scripts/app/modules/EventManagement/event.module.js").then(() => {
                                    var hash = $(location).attr('hash');
                                    $state.transitionTo("event", { hash: hash });
                                });
                                break;

                            case "activity":
                                $ocLazyLoad.load("/scripts/app/modules/activity/activity.module.js").then(() => {
                                    $state.transitionTo("activity");
                                });
                                break;							

                            case "wallet":
                                $ocLazyLoad.load("/scripts/app/modules/payment/wallet/wallet.module.js").then(() => {
                                    $state.transitionTo("wallet");
                                });
                                break;
                            case "paymentmethod":
                                $ocLazyLoad.load("/scripts/app/modules/payment/method/method.module.js").then(() => {
                                    $state.transitionTo("paymentMethod");
                                });
                                break;
                            case "gateway":
                                $ocLazyLoad.load("/scripts/app/modules/payment/gateway/gateway.module.js").then(() => {
                                    $state.transitionTo("gateway");
                                });
                                break;
                            // Network transactions    
                            case "networktransactions":
                                $ocLazyLoad.load("/scripts/app/modules/payment/network/transactions/transactions.module.js").then(() => {
                                    $state.transitionTo("networktransactions", $location.search());
                                });
                                break;

                            case "networkusers":
                                $ocLazyLoad.load("/scripts/app/modules/payment/network/customer/customer.module.js").then(() => {
                                    $state.transitionTo("networkCustomer");
                                });
                                break;
                            // Customer transactions
                            case "transactions":
                                $ocLazyLoad.load("/scripts/app/modules/payment/transactions/transactions.module.js").then(() => {
                                    $state.transitionTo("transactions", $location.search());

                                });
                                break;
                        }

                        $rootScope.$on("$viewContentLoaded", () => {
                            $(".fh-breadcrumb").css("height", "calc(100% - " + $(".page-headings").outerHeight() + "px)");
                        });
                    }
                ]);
        }

        public getModuleName(): string {
            return this.module.name;
        }
    }

    define(["angular",
        "angularCookie",
        "angularUIRouter",
        "angularBootstrap",
        "ocLazyLoad",
        "shared/services/api.service",
        "shared/directives/loading-icon",
        "shared/directives/icheck.directive",
        "shared/directives/perfectscroll.directive", 
        "shared/directives/slimscroll.directive", 
        "shared/directives/decimal.directive"
    ], () => {
        return Startup;
    });
}
