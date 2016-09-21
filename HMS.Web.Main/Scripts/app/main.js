var Main;
(function (Main) {
    'use strict';
    define(["module"], function (module) {
        requirejs.config({
            waitSeconds: 0,
            paths: {
                jquery: "../../Vendor/jquery/dist/jquery.min",
                angular: "../../Vendor/angular/angular.min",
                angularCookie: "../../Vendor/angular-cookies/angular-cookies.min",
                angularUIRouter: "../../Vendor/angular-ui-router/release/angular-ui-router.min",
                angularBootstrap: "../../Vendor/angular-bootstrap/ui-bootstrap-tpls.min",
                ocLazyLoad: "../../Vendor/ocLazyLoad/dist/ocLazyLoad.require.min",
                momentjs: "../../Vendor/moment/min/moment.min",
                'bootstrap-select': "../../Vendor/bootstrap-select/dist/js/bootstrap-select.min",
                'nya-bs-select': "../../Vendor/nya-bootstrap-select/dist/js/nya-bs-select.min",
                toastr: "../../Vendor/toastr/toastr.min",
                metisMenu: "../../Vendor/metisMenu/dist/metisMenu",
                modules: "modules"
            },
            shim: {
                angular: {
                    exports: "angular"
                },
                angularCookie: {
                    deps: ["angular"]
                },
                angularUIRouter: {
                    deps: ["angular"]
                },
                angularBootstrap: {
                    deps: ["angular"]
                },
                'bootstrap-select': {
                    deps: ["jquery"]
                },
                toastr: {
                    deps: ["jquery"]
                },
                metisMenu: {
                    deps: ["jquery"]
                }
            }
        });
        requirejs(["angular", "angularUIRouter"], function (angular, uiRouter) {
            requirejs(["shell/startup"], function (Startup) {
                var app = new Startup(module.config().name);
                angular.element(document).ready(function () {
                    angular.bootstrap(document, [app.getModuleName(), "HMSApp"]);
                });
            });
        });
    });
})(Main || (Main = {}));
