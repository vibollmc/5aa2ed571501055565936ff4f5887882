module Main {
    'use strict';

    declare var define: any;
    declare var angular: any;
    declare var requirejs: any;
	declare var $: any;

    export class Startup {
        module: any;

        constructor(moduleName: string) {
            this.module = angular.module("HMS", ["ngCookies", "ui.router", "oc.lazyLoad", "ui.bootstrap"])
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
                            case "hotel":
                                $ocLazyLoad.load("/scripts/app/modules/hotel/hotel.module.js").then(() => {
                                    $state.transitionTo("hotel");
                                });
                                break;
                        }
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
