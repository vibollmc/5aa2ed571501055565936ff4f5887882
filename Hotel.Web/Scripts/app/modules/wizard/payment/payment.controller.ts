module NewWizard {
    "use strict"; 

    export class WizardPaymentController extends StepBaseController {

        IsProcessing: boolean;      
         
        IsNotEnoughPostPaidBalance: boolean;      

        $scope: any;

        name: string;

        vm: IWizardModel;

        pm: WzPaymentModel;

        static $inject = ["$scope", "$state", "WizardModel", "WzPaymentModel", "$uibModal"];

        constructor($scope: any, $state: any, wizardModel: IWizardModel, paymentModel: WzPaymentModel, private $uibModal) {
            super($scope, $state, wizardModel, StepType.Payment);
            wizardModel.ctrlIns = this;

            this.IsProcessing = false;
            this.IsNotEnoughPostPaidBalance = false;

            wizardModel.stepTitle = "Payment";
            this.vm = wizardModel;
            this.pm = paymentModel; 
            this.pm.loadPaymentInfo(wizardModel.contextId);
            this.vm.CompletionProcessList = new Array<CompletionProcessTask>(); 
            this.$scope = $scope; 
            this.go("wizard.payment.card"); 
        }

        public checkValidPaymentMethod(): boolean {
            if (this.vm.selectedPaymentMethod) {
                return true;
            }
            else {
                return false;
            }
        }

        public selectedMethod(paymentMethod): void {             
            this.vm.selectedPaymentMethod = paymentMethod.Id;
            this.vm.selectedPaymentMethodType = paymentMethod.PaymentMethodType;
            this.vm.CompletionProcessList = paymentMethod.CompletionProcess;
            if (this.checkValidPaymentMethod()) {                
                this.vm.isValidSelectedMethod = true;
            }

            // Check selected PostpaidAccount balance > selected Service customer price
            if (paymentMethod.PaymentMethodType === 1 && (paymentMethod.Balance.Value < this.vm.SelectedServiceInfo.CustomerPrice)) {
                this.IsNotEnoughPostPaidBalance = false;
            } else {
                this.IsNotEnoughPostPaidBalance = true;  
            }
        }

        public confirmPayment(): void {
            if (this.vm.selectedPaymentMethod) {
                this.IsProcessing = true;
                this.pm.confirmPayment(this.vm, (response: ResponseModel) => {
                    if (response.Code == ResponseType.Success) {
                        this.vm.delivery = <Delivery>response.Data;
                        this.go("wizard.complete");
                    } else {
                        MessageBox.Message(response.Code, response.Message); 
                    }
                });
            }
        }
    }
}