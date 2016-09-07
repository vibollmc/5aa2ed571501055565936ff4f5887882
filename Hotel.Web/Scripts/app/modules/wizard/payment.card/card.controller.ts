module NewWizard {
    "use strict";

    declare var angular: any;

    declare var braintree: any;

    declare var $: any;

    export class WizardPaymentCardController {

        $scope: any;

        $uibModalInstance: any;

        pm: WzPaymentModel;

        vm: IWizardModel;

        clientToken: string;

        gatewayId: string;

        braintreeSetup: any;

        static $inject = ["$scope", "$state", "WizardModel", "WzPaymentModel"];

        constructor($scope: any, $state: any, wizardModel: IWizardModel, paymentModel: WzPaymentModel) {

            this.$scope = $scope;
            this.vm = wizardModel;
            this.pm = paymentModel;

            this.vm.isValidSelectedMethod = false;
            this.vm.selectedPaymentMethod = '';
            this.vm.CompletionProcessList = new Array<CompletionProcessTask>(); 
        }

        public openForm(gatewayId: string): void {
            var _that = this;
            if (this.braintreeSetup != null) {
                this.braintreeSetup.teardown(function () {
                    _that.braintreeSetup = null;                    
                    // braintree.setup can safely be run again!
                });
            }
            this.gatewayId = gatewayId;

            var handleResponseFunc = (response: ResponseModel) => {
                this.clientToken = response.Data;
                braintree.setup(this.clientToken, "dropin", {
                    container: "form-add-payment-method",
                    onReady: function (integration) {
                        _that.braintreeSetup = integration;
                    },
                    onPaymentMethodReceived: function (obj: any) {
                        _that.addPaymentMethod(obj);
                    }
                });
            };

            this.pm.getClientToken(gatewayId, handleResponseFunc);                
        }

        public addPaymentMethod(obj: any): void {
            this.pm.addPaymentMethod(this.vm.contextId, this.gatewayId, obj.nonce);
            angular.element('#modal-add-payment').modal('hide');
        }
    }
}