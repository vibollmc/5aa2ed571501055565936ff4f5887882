module NewWizard {
    "use strict";

    declare var define: any;
    declare var angular: any;

    export class WizardPaymentCardModule {
        module: any;
        static $inject = ["ui.router"];
        static ModuleName: string = "Wizard.Payment.Card";

        constructor() {
            var controllerName = "WizardPaymentCardController";

            this.module = angular.module(WizardPaymentCardModule.ModuleName, ["ui.router"]);
            this.module.service("WzPaymentModel", WzPaymentModel);
            this.module.controller(controllerName, WizardPaymentCardController);
            this.module.config(["$stateProvider", ($stateProvider: any) => {

                $stateProvider
                    .state("wizard.payment.card", {
                        url: "/card",
                        views:
                        {
                            "cards": {
                                templateUrl: "scripts/app/modules/wizard/payment.card/card.view.html",
                                controller: controllerName,
                                controllerAs: "wzPmtCardCtrl"
                            }
                        }

                    });
            }]);
        }
    }

    define([
        "modules/wizard/payment.card/card.controller"], () => {
            new WizardPaymentCardModule();
        });
}