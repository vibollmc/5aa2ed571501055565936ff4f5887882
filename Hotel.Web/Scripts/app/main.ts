module Main {
    'use strict';

    declare var define: any;
    declare var requirejs: any;

    define(["module"], (module) => {
        requirejs.config({
            waitSeconds: 0,
            paths: {
                jquery: "../../js/jquery",
                angular: "../../Vendor/angular/angular.min",
                angularCookie: "../../Vendor/angular-cookies/angular-cookies.min",
                angularUIRouter: "../../Vendor/angular-ui-router/release/angular-ui-router.min",
                angularBootstrap: "../../Vendor/angular-bootstrap/ui-bootstrap-tpls.min",
                ocLazyLoad: "../../Vendor/ocLazyLoad/dist/ocLazyLoad.require.min",
                momentjs: "../../Vendor/moment/min/moment.min",
                'bootstrap-select': "../../Vendor/bootstrap-select/dist/js/bootstrap-select.min",
                'nya-bs-select': "../../Vendor/nya-bootstrap-select/dist/js/nya-bs-select.min",
                toastr: "../../Vendor/toastr/toastr.min",
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
                }
            }
        });

        requirejs(["angular", "angularUIRouter"], (angular, uiRouter) => {
            requirejs(["shell/startup"], (Startup) => {

                var app = new Startup(module.config().name);
                angular.element(document).ready(() => {
                    angular.bootstrap(document, [app.getModuleName(), "HMSApp"]);
                });
            });
        });
    });
}
