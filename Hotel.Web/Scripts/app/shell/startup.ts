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

                        $rootScope.$on("$locationChangeSuccess", () => {
                            $rootScope.actualLocation = $location.path();
                        });

                        $rootScope.$watch(() => $location.path(), (newLocation, oldLocation) => {
                            if ($rootScope.actualLocation === newLocation) {

                                var url = newLocation.toLowerCase();
                                while (url.indexOf("/") > -1) {
                                    url = url.substr(url.indexOf("/") + 1);
                                }
                                if (url !== "") $state.go(url);
                                else $state.go("hotel");
                            }
                        });

                        switch (moduleName) {
                            case "hotel":
                                $ocLazyLoad.load("/scripts/app/modules/hotel/hotel.module.js").then(() => {
                                    var url = $location.url().toLowerCase();
                                    while (url.indexOf("/") > -1) {
                                        url = url.substr(url.indexOf("/") + 1);
                                    }
                                    if (url !== "") $state.transitionTo(url);
                                    else $state.transitionTo("hotel");
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
        "metisMenu",
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
