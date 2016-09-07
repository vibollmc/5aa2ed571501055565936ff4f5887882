module NewWizard {
    "use strict";

    declare var define: any;
    declare var angular: any;

    export class WizardPaymentPostpaidModule {
        module: any;
        static $inject = ["ui.router"];
        static ModuleName: string = "Wizard.Payment.Postpaid";

        constructor() {
            var controllerName = "WizardPaymentPostpaidController";

            this.module = angular.module(WizardPaymentPostpaidModule.ModuleName, ["ui.router"]);
            this.module.service("WizardModel", WizardModel);
            this.module.controller(controllerName, WizardPaymentPostpaidController);
            this.module.config(["$stateProvider", ($stateProvider: any) => {
                $stateProvider
                    .state("wizard.payment.postpaid", {
                        url: "/postpaid",
                        views:
                        {
                            "postpay": {
                                templateUrl: "scripts/app/modules/wizard/payment.postpaid/postpaid.view.html",
                                controller: controllerName,
                                controllerAs: "wzPmtPostpaidCtrl",
                            }
                        }

                    });
            }]);
        }
    }

    define(["modules/wizard/payment.postpaid/postpaid.controller"], () => {
        new WizardPaymentPostpaidModule();
    });
}