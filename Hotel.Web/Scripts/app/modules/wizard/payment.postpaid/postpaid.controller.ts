module NewWizard {
    "use strict";

    export class WizardPaymentPostpaidController {

        $scope: any;

        name: string;

        vm: IWizardModel;

        pm: WzPaymentModel;

        static $inject = ["$scope", "$state", "WizardModel", "WzPaymentModel"];

        constructor($scope: any, $state: any, wizardModel: IWizardModel, paymentModel: WzPaymentModel) {
            this.$scope = $scope;
            this.vm = wizardModel;
            this.pm = paymentModel;

            this.vm.selectedPaymentMethod = '';
            this.vm.isValidSelectedMethod = false;
            this.vm.CompletionProcessList = new Array<CompletionProcessTask>(); 
        }
    }
}