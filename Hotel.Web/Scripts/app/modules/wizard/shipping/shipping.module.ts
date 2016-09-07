module NewWizard {
    "use strict";

    declare var define: any;
    declare var angular: any;

    export class WizardShippingModule {
        module: any;
        static $inject = ["ui.router"];
        static ModuleName: string = "Wizard.Shipping";

        constructor() {
            var controllerName = "WizardShippingController";

            this.module = angular.module(WizardShippingModule.ModuleName, ["ui.router"]);
            this.module.service("WizardModel", WizardModel);
            this.module.controller(controllerName, WizardShippingController);
            this.module.config(["$stateProvider", ($stateProvider: any) => {
                $stateProvider
                    .state("wizard.shipping", {
                        url: "/{contextid}/shipping",
                        templateUrl: "scripts/app/modules/wizard/shipping/shipping.view.html",
                        controller: controllerName,
                        controllerAs: "wzShippingCtrl"
                    });
            }]);
        }
    }

    define(["modules/wizard/shipping/shipping.controller"], () => {
        new WizardShippingModule();
    });
}