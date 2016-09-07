module NewWizard {
    "use strict";

    declare var define: any;
    declare var angular: any;

    export class WizardCompleteModule {
        module: any;
        static $inject = ["ui.router"];
        static ModuleName: string = "Wizard.Complete";

        constructor() {
            var controllerName = "WizardCompleteController";

            this.module = angular.module(WizardCompleteModule.ModuleName, ["ui.router"]);
            this.module.controller(controllerName, WizardCompleteController);
            this.module.config(["$stateProvider", ($stateProvider: any) => {
                $stateProvider
                    .state("wizard.complete", {
                        url: "/complete",
                        templateUrl: "scripts/app/modules/wizard/complete/complete.view.html",
                        controller: controllerName,
                        controllerAs: "wzCompleteCtrl"
                    });
            }]);
        }
    }

    define(["modules/wizard/complete/complete.controller"], () => {
        new WizardCompleteModule();
    });
}