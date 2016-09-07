module NewWizard {
    "use strict";

    declare var define: any;
    declare var angular: any;

    export class WizardPaymentModule {
        module: any;
        static $inject = ["ui.router"];
        static ModuleName: string = "Wizard.Payment";

        constructor() {
            var controllerName = "WizardPaymentController";

            var modules: string[] = [
                "ui.router",
                WizardPaymentCardModule.ModuleName,
                WizardPaymentPostpaidModule.ModuleName
            ];

            this.module = angular.module(WizardPaymentModule.ModuleName, modules);
            this.module.service("WizardModel", WizardModel);
            this.module.controller(controllerName, WizardPaymentController);
            this.module.config(["$stateProvider", ($stateProvider: any) => {
                $stateProvider
                    .state("wizard.payment", {
                        url: "/{contextid}/payment",
                        views: {
                            "": {
                                templateUrl: "scripts/app/modules/wizard/payment/payment.view.html",
                                controller: controllerName,
                                controllerAs: "wzPaymentCtrl"
                            },
                            "select-coupon@wizard.payment": {
                                templateUrl: "scripts/app/modules/wizard/payment/coupon.popup.view.html",
                                controller: controllerName,
                                controllerAs: "wzPaymentCtrl"
                            }
                        }
                    });
            }]);
        }
    }

    define([
        "modules/wizard/payment/payment.controller",
        "modules/wizard/payment.card/card.module",
        "modules/wizard/payment.postpaid/postpaid.module",
        "modules/wizard/payment/payment.model"
    ], () => {
        new WizardPaymentModule();
    });
}