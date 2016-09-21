var Main;
(function (Main) {
    'use strict';
    var Startup = (function () {
        function Startup(moduleName) {
            this.module = angular.module("HMS", ["ngCookies", "ui.router", "oc.lazyLoad", "ui.bootstrap"])
                .service("ApiService", Main.ApiService)
                .config(['$ocLazyLoadProvider', '$compileProvider', function ($ocLazyLoadProvider, $compileProvider) {
                    $ocLazyLoadProvider.config({
                        jsLoader: requirejs,
                        debug: false
                    });
                    $compileProvider.debugInfoEnabled(false);
                }])
                .run(["$rootScope", "$location", "$cookieStore", "$state", "$ocLazyLoad", "$timeout", "$window",
                function ($rootScope, $location, $cookieStore, $state, $ocLazyLoad, $timeout, $window) {
                    $rootScope.$on("$locationChangeSuccess", function () {
                        $rootScope.actualLocation = $location.path();
                    });
                    $rootScope.$watch(function () { return $location.path(); }, function (newLocation, oldLocation) {
                        if ($rootScope.actualLocation === newLocation) {
                            var url = newLocation.toLowerCase();
                            while (url.indexOf("/") > -1) {
                                url = url.substr(url.indexOf("/") + 1);
                            }
                            if (url !== "")
                                $state.go(url);
                            else
                                $state.go("hotel");
                        }
                    });
                    switch (moduleName) {
                        case "hotel":
                            $ocLazyLoad.load("/scripts/app/modules/hotel/hotel.module.js").then(function () {
                                var url = $location.url().toLowerCase();
                                while (url.indexOf("/") > -1) {
                                    url = url.substr(url.indexOf("/") + 1);
                                }
                                if (url !== "") {
                                    $state.transitionTo(url);
                                }
                                else {
                                    $location.replace();
                                    $state.transitionTo("hotel");
                                }
                            });
                            break;
                    }
                }
            ]);
        }
        Startup.prototype.getModuleName = function () {
            return this.module.name;
        };
        return Startup;
    }());
    Main.Startup = Startup;
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
    ], function () {
        return Startup;
    });
})(Main || (Main = {}));
