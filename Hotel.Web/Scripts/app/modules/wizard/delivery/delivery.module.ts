module NewWizard {
    "use strict";

    declare var define: any;
    declare var angular: any; 
    
    export class WizardDeliveryModule {
        module: any;
        static $inject = ["ui.router", "ui.bootstrap", "nya.bootstrap.select"];
        static ModuleName: string = "Wizard.Delivery";

        constructor() {
            var controllerName = "WizardDeliveryController";

            this.module = angular.module(WizardDeliveryModule.ModuleName, ["ui.router", "ui.bootstrap", "ionslider.directives", "nya.bootstrap.select", "address.directives"]);
            this.module.service("WizardModel", WizardModel);
            this.module.service("WizardDeliveryModel", WzDeliveryModel);
            this.module.controller(controllerName, WizardDeliveryController);
            this.module.config(["$stateProvider", ($stateProvider: any) => {
                $stateProvider
                    .state("wizard.delivery", {
                        url: "/{contextid}/delivery",
                        views: {
                            "": {
                                templateUrl: "scripts/app/modules/wizard/delivery/delivery.view.html",
                                controller: controllerName,
                                controllerAs: "wzDeliveryCtrl"
                            },
                            "select-address@wizard.delivery": {
                                templateUrl: "scripts/app/modules/wizard/delivery/select-address.view.html",
                                controller: controllerName,
                                controllerAs: "wzDeliveryCtrl"
                            },
                            "select-parcels@wizard.delivery": {
                                templateUrl: "scripts/app/modules/wizard/delivery/select-parcels.view.html",
                                controller: controllerName,
                                controllerAs: "wzDeliveryCtrl"
                            },
                            "select-delivery-picker-time@wizard.delivery": {
                                templateUrl: "scripts/app/modules/wizard/delivery/select-delivery-pickup-time.view.html",
                                controller: controllerName,
                                controllerAs: "wzDeliveryCtrl"
                            },
                            "select-services@wizard.delivery": {
                                templateUrl: "scripts/app/modules/wizard/delivery/select-services.view.html",
                                controller: controllerName,
                                controllerAs: "wzDeliveryCtrl"
                            }

                        }

                    });
            }]);
        }
    }

    define([
        "angularBootstrap",
        "rangeSlider",
        "nya-bs-select",
        "underscore", 
        "modules/wizard/delivery/delivery.controller",
        "modules/wizard/shared/directives/ionslider.directive",
        "modules/wizard/shared/directives/address.directive",
        "modules/wizard/delivery/delivery.model"
    ], () => { 
        new WizardDeliveryModule();
    });
}