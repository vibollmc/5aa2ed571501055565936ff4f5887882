module NewWizard {
    "use strict";
    export class WizardCompleteController extends StepBaseController {

        $scope: any;

        vm: IWizardModel;

        IsResellingService: boolean;
        ResellingNetwork: NetWorkInfo;

        static $inject = ["$rootScope", "$scope", "$state", "WizardModel"];

        constructor($rootScope: any, $scope: any, $state: any, wizardModel: IWizardModel) {
            super($scope, $state, wizardModel, StepType.Complete);

            wizardModel.stepTitle = "Your delivery has been booked";

            if (wizardModel.SelectedServiceInfo) {
                this.IsResellingService = wizardModel.SelectedServiceInfo.IsResellingService;
                this.ResellingNetwork = wizardModel.SelectedServiceInfo.NetWorkInfo;
            }

            this.vm = wizardModel;
        }

    }
}